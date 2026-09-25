'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { Play, RotateCcw, VolumeX } from 'lucide-react'
import type { EvaluatedClick, PerceptionRisk, PlaybackSequence, RiskClick } from '@/domain/risk-perception'
import type { AppLocale } from '@/i18n/request'
import { containedVideoRect, normalizeVideoPoint, type Rect } from '@/lib/risk-perception/coordinates'
import { hitboxAt } from '@/lib/risk-perception/hitboxes'
import { riskCopy } from '@/content/risk-perception/copy'

interface Props {
  sequence: PlaybackSequence
  locale: AppLocale
  mode: 'test' | 'review'
  onClick?: (click: RiskClick) => void
  onComplete?: () => void
  /** Only passed in correction, never during the test. */
  risks?: PerceptionRisk[]
  reviewClicks?: EvaluatedClick[]
  reviewSeek?: { time: number; nonce: number }
}
interface Gesture { id:number; x:number; y:number; at:number; moved:boolean }

export function RiskPerceptionPlayer({ sequence, locale, mode, onClick, onComplete, risks=[], reviewClicks=[], reviewSeek }:Props) {
  const copy=riskCopy(locale)
  const videoRef=useRef<HTMLVideoElement>(null)
  const frameRef=useRef<HTMLDivElement>(null)
  const gesture=useRef<Gesture|null>(null)
  const finished=useRef(false)
  const lastAllowed=useRef(sequence.startTime)
  const internalSeek=useRef(false)
  const completeRef=useRef(onComplete)
  completeRef.current=onComplete
  const [loading,setLoading]=useState(true)
  const [needsPlay,setNeedsPlay]=useState(false)
  const [error,setError]=useState(false)
  const [ratio,setRatio]=useState(16/9)
  const [plane,setPlane]=useState<Rect|null>(null)
  const [time,setTime]=useState(sequence.startTime)
  const [ripple,setRipple]=useState<{x:number;y:number;id:number;hit:boolean}|null>(null)
  const [cursor,setCursor]=useState<{x:number;y:number}|null>(null)
  const [debug,setDebug]=useState(false)
  const [debugClick,setDebugClick]=useState<{x:number;y:number;time:number;hit:string|null}|null>(null)
  const rippleTimer=useRef<ReturnType<typeof setTimeout>>()

  const measure=useCallback(()=>{
    const video=videoRef.current, frame=frameRef.current
    if(!video||!frame)return
    const rect=containedVideoRect(video.getBoundingClientRect(),video.videoWidth,video.videoHeight)
    const host=frame.getBoundingClientRect()
    setPlane(rect?{...rect,left:rect.left-host.left,top:rect.top-host.top}:null)
  },[])
  useEffect(()=>{
    setDebug(typeof window!=='undefined' && new URLSearchParams(window.location.search).get('debugTPR')==='1')
  },[])
  useEffect(()=>{
    const frame=frameRef.current
    if(!frame)return
    const observer=new ResizeObserver(measure)
    observer.observe(frame)
    window.addEventListener('resize',measure)
    return ()=>{observer.disconnect();window.removeEventListener('resize',measure)}
  },[measure])
  useEffect(()=>()=>{clearTimeout(rippleTimer.current)},[])

  useEffect(()=>{
    const video=videoRef.current
    if(!video)return
    let alive=true
    let raf=0
    let initialized=false
    finished.current=false
    lastAllowed.current=sequence.startTime
    internalSeek.current=true
    setLoading(true);setError(false);setNeedsPlay(false);setTime(sequence.startTime)
    function play() {
      if(!alive||document.hidden)return
      void video!.play().catch(()=>{if(alive){setLoading(false);setNeedsPlay(true)}})
    }
    function initialize() {
      if(initialized)return
      initialized=true
      if(!Number.isFinite(video!.duration)||video!.duration+0.05<sequence.endTime){
        setError(true);setLoading(false);return
      }
      setRatio(video!.videoWidth/video!.videoHeight)
      measure()
      video!.currentTime=sequence.startTime
      play()
    }
    function finish() {
      if(finished.current)return
      finished.current=true
      video!.pause()
      if(mode==='test')completeRef.current?.()
      else setNeedsPlay(true)
    }
    function tick() {
      if(!alive)return
      if(!video!.seeking){
        setTime(video!.currentTime)
        if(mode!=='review'&&!finished.current&&!video!.paused)lastAllowed.current=video!.currentTime
        if(initialized&&!video!.paused&&video!.currentTime>=sequence.endTime)finish()
      }
      raf=requestAnimationFrame(tick)
    }
    function seeking() {
      if(mode==='test'&&!internalSeek.current&&Math.abs(video!.currentTime-lastAllowed.current)>.3) {
        internalSeek.current=true
        video!.currentTime=lastAllowed.current
      }
    }
    function seeked(){internalSeek.current=false}
    function playing(){if(alive){setLoading(false);setNeedsPlay(false)}}
    function paused(){if(alive&&!finished.current&&!error)setNeedsPlay(true)}
    function failed(){if(alive){setError(true);setLoading(false)}}
    function visibility(){if(document.hidden&&mode==='test')video!.pause()}
    function rate(){if(mode==='test'&&video!.playbackRate!==1)video!.playbackRate=1}
    function ended(){if(video!.currentTime+.1>=sequence.endTime)finish();else failed()}
    video.addEventListener('loadedmetadata',initialize)
    video.addEventListener('seeking',seeking)
    video.addEventListener('seeked',seeked)
    video.addEventListener('playing',playing)
    video.addEventListener('pause',paused)
    video.addEventListener('error',failed)
    video.addEventListener('ended',ended)
    video.addEventListener('ratechange',rate)
    document.addEventListener('visibilitychange',visibility)
    if(video.readyState>=1)initialize()
    raf=requestAnimationFrame(tick)
    return ()=>{
      alive=false;cancelAnimationFrame(raf)
      video.removeEventListener('loadedmetadata',initialize)
      video.removeEventListener('seeking',seeking)
      video.removeEventListener('seeked',seeked)
      video.removeEventListener('playing',playing)
      video.removeEventListener('pause',paused)
      video.removeEventListener('error',failed)
      video.removeEventListener('ended',ended)
      video.removeEventListener('ratechange',rate)
      document.removeEventListener('visibilitychange',visibility)
      video.pause()
    }
    // The error state must not restart an active sequence.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[sequence.id,sequence.videoSrc,sequence.startTime,sequence.endTime,mode,measure])

  useEffect(()=>{
    if(mode!=='review'||!reviewSeek)return
    const video=videoRef.current
    if(!video)return
    const seek=()=>{
      finished.current=false
      video.currentTime=Math.max(sequence.startTime,Math.min(reviewSeek.time,sequence.endTime-.05))
      void video.play().catch(()=>setNeedsPlay(true))
    }
    if(video.readyState>=1)seek()
    else video.addEventListener('loadedmetadata',seek,{once:true})
    return ()=>video.removeEventListener('loadedmetadata',seek)
  },[mode,reviewSeek,sequence.startTime,sequence.endTime])

  function record(point:{x:number;y:number}) {
    const video=videoRef.current
    if(mode!=='test'||!video||video.paused||video.seeking||video.readyState<2||finished.current||
        video.currentTime<sequence.startTime||video.currentTime>=sequence.endTime||document.hidden)return
    const clickTime=video.currentTime
    const hit=debug ? risks.find(r=>{const box=hitboxAt(r,clickTime);return box&&point.x>=box.x&&point.x<=box.x+box.width&&point.y>=box.y&&point.y<=box.y+box.height})?.id ?? null : null
    if(debug){
      setDebugClick({x:point.x,y:point.y,time:clickTime,hit})
      console.debug('[TPR]', { currentTime: clickTime, sourceStartTime: sequence.startTime, sourceCurrentTime: clickTime, x: point.x, y: point.y, hit })
    }
    onClick?.({id:crypto.randomUUID(),sequenceId:sequence.id,time:clickTime,...point})
    setRipple({...point,id:performance.now(),hit:!!hit})
    clearTimeout(rippleTimer.current)
    rippleTimer.current=setTimeout(()=>setRipple(null),330)
  }
  function pointerDown(event:PointerEvent<HTMLDivElement>) {
    if(!event.isPrimary||event.button!==0){gesture.current=null;return}
    gesture.current={id:event.pointerId,x:event.clientX,y:event.clientY,at:performance.now(),moved:false}
    setCursor(null)
  }
  function pointerMove(event:PointerEvent<HTMLDivElement>) {
    const current=gesture.current
    if(current?.id===event.pointerId&&Math.hypot(event.clientX-current.x,event.clientY-current.y)>10)current.moved=true
  }
  function pointerUp(event:PointerEvent<HTMLDivElement>) {
    const current=gesture.current;gesture.current=null
    const video=videoRef.current
    if(!current||current.id!==event.pointerId||current.moved||performance.now()-current.at>650||!video)return
    const point=normalizeVideoPoint(event.clientX,event.clientY,containedVideoRect(video.getBoundingClientRect(),video.videoWidth,video.videoHeight))
    if(point)record(point)
  }
  function keyDown(event:KeyboardEvent<HTMLDivElement>) {
    if(mode!=='test'||event.target!==event.currentTarget)return
    const movements:Record<string,[number,number]>={ArrowLeft:[-.04,0],ArrowRight:[.04,0],ArrowUp:[0,-.04],ArrowDown:[0,.04]}
    if(movements[event.key]){
      event.preventDefault()
      const [dx,dy]=movements[event.key]
      setCursor(current=>({x:Math.max(0,Math.min(1,(current?.x??.5)+dx)),y:Math.max(0,Math.min(1,(current?.y??.5)+dy))}))
    } else if(event.key==='Enter'||event.key===' '){
      event.preventDefault();record(cursor??{x:.5,y:.5})
    }
  }
  function resume() {
    const video=videoRef.current
    if(!video)return
    if(mode==='review'&&finished.current){finished.current=false;video.currentTime=sequence.startTime}
    void video.play().catch(()=>setNeedsPlay(true))
  }
  function retry(){
    const video=videoRef.current
    if(!video)return
    setError(false);setLoading(true)
    const resumeAt=lastAllowed.current
    video.addEventListener('loadedmetadata',()=>{
      internalSeek.current=true;video.currentTime=resumeAt;resume()
    },{once:true})
    video.load()
  }
  const overlayStyle=plane?{left:plane.left,top:plane.top,width:plane.width,height:plane.height}:undefined

  return <div className="tpr-player">
    <div ref={frameRef} className="tpr-video-frame" style={{aspectRatio:ratio}}
      role={mode==='test'?'application':undefined} tabIndex={mode==='test'?0:undefined}
      aria-label={mode==='test'?copy.testVideo:copy.reviewVideo} aria-describedby={mode==='test'?'tpr-keyboard-help':undefined}
      onPointerDown={mode==='test'?pointerDown:undefined} onPointerMove={mode==='test'?pointerMove:undefined}
      onPointerUp={mode==='test'?pointerUp:undefined} onPointerCancel={()=>{gesture.current=null}}
      onKeyDown={keyDown} onContextMenu={mode==='test'?event=>event.preventDefault():undefined}>
      <video ref={videoRef} src={sequence.videoSrc} playsInline muted autoPlay preload="auto"
        controls={mode==='review'} controlsList="nodownload noremoteplayback" disablePictureInPicture disableRemotePlayback
        aria-label={mode==='test'?copy.testVideo:copy.reviewVideo}>{copy.unsupported}</video>
      {plane&&<div className="tpr-video-plane" style={overlayStyle} aria-hidden="true">
        {ripple&&<span key={ripple.id} className={'tpr-click-ripple '+(ripple.hit?'is-hit':'is-miss')} style={{left:ripple.x*100+'%',top:ripple.y*100+'%'}} />}
        {cursor&&mode==='test'&&<span className="tpr-keyboard-cursor" style={{left:cursor.x*100+'%',top:cursor.y*100+'%'}}>+</span>}
        {(mode==='review'||debug)&&risks.filter(risk=>risk.calibrated).map(risk=>{
          const box=hitboxAt(risk,time)
          return box?<div key={risk.id} className="tpr-hitbox" style={{left:box.x*100+'%',top:box.y*100+'%',width:box.width*100+'%',height:box.height*100+'%'}}><b>{debug&&risk.label[locale]}</b></div>:null
        })}
        {mode==='review'&&reviewClicks.filter(click=>Math.abs(click.time-time)<.4).map(click=><span key={click.id} className={'tpr-review-click '+click.outcome} style={{left:click.x*100+'%',top:click.y*100+'%'}}>×</span>)}
      </div>}
      {debug&&<div className="tpr-debug-panel">DEBUG · t={time.toFixed(2)} s{debugClick&&<> · clic ({debugClick.x.toFixed(3)}, {debugClick.y.toFixed(3)}) · {debugClick.hit??'aucune hitbox'}</>}</div>}
      {(error||loading||needsPlay)&&<div className="tpr-video-status" onPointerDown={event=>event.stopPropagation()} onPointerUp={event=>event.stopPropagation()}>
        {error?<><p role="alert">{copy.videoError}</p><button className="tpr-button" onClick={retry}><RotateCcw size={18}/>{copy.retry}</button></>:
          needsPlay?<button className="tpr-button" onClick={resume}><Play size={19}/>{copy.resume}</button>:<p role="status">{copy.loading}</p>}
      </div>}
    </div>
    <div className="tpr-player-note"><span><VolumeX size={16} aria-hidden="true"/>{copy.soundless}</span>{mode==='test'&&<span>{copy.noFeedback}</span>}</div>
    {mode==='test'&&<p id="tpr-keyboard-help" className="tpr-keyboard-help">{copy.cursor}</p>}
  </div>
}

