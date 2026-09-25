import { test } from 'node:test'
import assert from 'node:assert/strict'
import { containedVideoRect, normalizeVideoPoint } from '../src/lib/risk-perception/coordinates'
import { hitboxAt } from '../src/lib/risk-perception/hitboxes'
import { scoreExam } from '../src/lib/risk-perception/scoring'
import { validateExam } from '../src/lib/risk-perception/validation'
import { RISK_EXAMS, playbackSequence } from '../src/content/risk-perception/exams'
import { initialSession, sessionReducer } from '../src/lib/risk-perception/session'
import { latestAttempt, saveAttempt } from '../src/lib/risk-perception/storage'
import type { RiskClick } from '../src/domain/risk-perception'

const exam=RISK_EXAMS[0]
const risk=exam.sequences[0].risks[0]
function click(time=63.5,x=.6,y=.47,id='c1'):RiskClick{return {id,sequenceId:'demo-1',time,x,y}}

test('inside moving box at active time validates exactly one risk',()=>{
  const score=scoreExam(exam,[click()])
  assert.equal(score.score,1);assert.equal(score.missed,9);assert.equal(score.falseClicks,0)
})
test('correct position before active window is false',()=>assert.equal(scoreExam(exam,[click(61.9)]).score,0))
test('correct position after active window is false',()=>assert.equal(scoreExam(exam,[click(65.1)]).score,0))
test('wrong position during window is false and unpenalized',()=>{
  const score=scoreExam(exam,[click(63.5,.05,.05,'outside'),click()])
  assert.equal(score.score,1);assert.equal(score.falseClicks,1)
})
test('inclusive temporal and spatial edges',()=>{
  const box=hitboxAt(risk,62)!
  assert.equal(scoreExam(exam,[click(62,box.x,box.y)]).score,1)
  const last=hitboxAt(risk,65)!
  assert.equal(scoreExam(exam,[click(65,last.x+last.width,last.y+last.height)]).score,1)
})
test('duplicate clicks on one risk award a maximum of one point',()=>{
  const score=scoreExam(exam,[click(),click(64,.6,.47,'c2'),click(64.2,.6,.47,'c3')])
  assert.equal(score.score,1);assert.equal(score.duplicateClicks,2);assert.equal(score.falseClicks,0)
})
test('an event ID accidentally delivered twice is deduplicated',()=>{
  assert.equal(scoreExam(exam,[click(),click()]).clicks.length,1)
})
test('one click cannot validate two overlapping risks; repeats cannot farm the overlap',()=>{
  const overlapping=structuredClone(exam)
  const sequence=overlapping.sequences[1]
  sequence.risks[1]={...structuredClone(sequence.risks[0]),id:'d3'}
  const clicks=[{...click(102,.35,.5),sequenceId:sequence.id},{...click(102.1,.35,.5,'c2'),sequenceId:sequence.id}]
  const score=scoreExam(overlapping,clicks)
  assert.equal(score.score,1);assert.deepEqual(score.detectedRiskIds,['d2']);assert.equal(score.duplicateClicks,1)
})
test('linear keyframe interpolation moves and resizes the box',()=>{
  const box=hitboxAt(risk,63.5)!
  assert.ok(Math.abs(box.x-.52)<1e-9);assert.ok(Math.abs(box.y-.365)<1e-9)
  assert.ok(Math.abs(box.width-.18)<1e-9);assert.ok(Math.abs(box.height-.23)<1e-9)
  assert.equal(hitboxAt(risk,61),null);assert.equal(hitboxAt(risk,NaN),null)
})
test('single keyframe can represent a static risk',()=>{
  const single={...risk,hitboxes:[risk.hitboxes[0]]}
  assert.deepEqual(hitboxAt(single,64),risk.hitboxes[0])
})
test('all ten detected risks produce exactly 10/10',()=>{
  const clicks=exam.sequences.flatMap(sequence=>sequence.risks.map(r=>{
    const time=(r.activeFrom+r.activeUntil)/2
    const box=hitboxAt(r,time)!
    return {id:r.id,sequenceId:sequence.id,time,x:box.x+box.width/2,y:box.y+box.height/2}
  }))
  assert.equal(scoreExam(exam,clicks).score,10);assert.equal(scoreExam(exam,[]).score,0)
})
test('invalid coordinates, wrong sequence and non-finite time never score',()=>{
  for(const c of [click(NaN),click(63.5,Infinity),click(63.5,NaN),{...click(),sequenceId:'missing'}]){
    assert.equal(scoreExam(exam,[c]).score,0);assert.equal(scoreExam(exam,[c]).falseClicks,1)
  }
})
test('coordinates account for letterbox bars and viewport offsets',()=>{
  const rect=containedVideoRect({left:20,top:50,width:400,height:400},1920,1080)!
  assert.deepEqual(rect,{left:20,top:137.5,width:400,height:225})
  assert.equal(normalizeVideoPoint(200,70,rect),null)
  assert.deepEqual(normalizeVideoPoint(220,250,rect),{x:.5,y:.5})
})
test('portrait, landscape, resize and non-16:9 videos keep normalized coordinates',()=>{
  for(const [width,height] of [[335,190],[390,844],[844,390],[1024,768]]){
    const rect=containedVideoRect({left:33,top:100,width,height},640,480)!
    const point=normalizeVideoPoint(rect.left+rect.width*.72,rect.top+rect.height*.41,rect)!
    assert.ok(Math.abs(point.x-.72)<1e-10);assert.ok(Math.abs(point.y-.41)<1e-10)
  }
  assert.equal(containedVideoRect({left:0,top:0,width:0,height:100},1920,1080),null)
  assert.equal(containedVideoRect({left:0,top:0,width:100,height:100},0,0),null)
})
test('invalid authored data fails validation before a test starts',()=>{
  for(const mutate of [
    (x:typeof exam)=>x.sequences[0].risks.pop(),
    (x:typeof exam)=>{x.sequences[0].risks[0].hitboxes[0].x=.99},
    (x:typeof exam)=>{x.sequences[0].risks[0].hitboxes.reverse()},
    (x:typeof exam)=>{x.sequences[0].risks[0].activeUntil=1000},
    (x:typeof exam)=>{x.sequences[0].id=x.sequences[1].id},
    (x:typeof exam)=>{x.sequences[0].risks[0].id=x.sequences[1].risks[0].id},
  ]){
    const invalid=structuredClone(exam);mutate(invalid);assert.throws(()=>validateExam(invalid))
  }
})
test('playback projection contains no solutions or per-clip counts',()=>{
  assert.deepEqual(Object.keys(playbackSequence(exam.sequences[0])).sort(),['endTime','id','startTime','videoSrc'])
})
test('session completes once, transitions, ignores stale events and resets on restart',()=>{
  let state=sessionReducer(initialSession,{type:'start',id:'attempt',at:'start'})
  state=sessionReducer(state,{type:'click',click:click(),sequenceId:'demo-1',index:0})
  state=sessionReducer(state,{type:'ended',index:0,sequenceCount:5,at:'end'})
  assert.equal(state.phase,'transition')
  assert.equal(sessionReducer(state,{type:'ended',index:0,sequenceCount:5,at:'end'}),state)
  state=sessionReducer(state,{type:'next'})
  assert.equal(state.sequenceIndex,1)
  assert.equal(sessionReducer(state,{type:'click',click:click(),sequenceId:'demo-1',index:0}),state)
  for(let index=1;index<5;index++){
    state=sessionReducer(state,{type:'ended',index,sequenceCount:5,at:'finished'})
    if(index<4)state=sessionReducer(state,{type:'next'})
  }
  assert.equal(state.phase,'result');assert.equal(state.finishedAt,'finished');assert.equal(state.clicks.length,1)
  state=sessionReducer(state,{type:'start',id:'again',at:'new'})
  assert.equal(state.clicks.length,0);assert.equal(state.sequenceIndex,0)
})
test('local persistence is bounded, versioned and tolerates corruption / blocked storage',()=>{
  const memory=new Map<string,string>()
  Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{
    getItem:(k:string)=>memory.get(k)??null,setItem:(k:string,v:string)=>memory.set(k,v)
  }})
  for(let i=0;i<7;i++)saveAttempt({id:String(i),examId:exam.id,examVersion:exam.version,startedAt:'start',finishedAt:'finish',clicks:[click()]})
  assert.equal(latestAttempt(exam)?.id,'6')
  assert.equal(JSON.parse([...memory.values()][0]).length,5)
  assert.equal(latestAttempt({...exam,version:2}),undefined)
  memory.set('permishub.tpr.attempts.v1','invalid JSON');assert.equal(latestAttempt(exam),undefined)
  Object.defineProperty(globalThis,'localStorage',{configurable:true,get(){throw new Error('blocked')}})
  assert.equal(latestAttempt(exam),undefined)
  assert.equal(saveAttempt({id:'a',examId:exam.id,examVersion:1,startedAt:'s',finishedAt:'f',clicks:[]}),false)
  Reflect.deleteProperty(globalThis,'localStorage')
})
