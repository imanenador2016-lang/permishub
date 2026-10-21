'use client'
import { useMemo, useState } from 'react'
import { ArrowRight, Eye, MousePointer2, Play, RotateCcw, ShieldCheck } from 'lucide-react'
import type { RiskExam } from '@/domain/risk-perception'
import type { AppLocale } from '@/i18n/request'
import { riskCopy } from '@/content/risk-perception/copy'
import { playbackSequence } from '@/content/risk-perception/exams'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { RiskPerceptionPlayer } from './RiskPerceptionPlayer'
import { RiskCorrection } from './RiskCorrection'
import { useRiskExam } from './useRiskExam'

export function RiskPerceptionExam({exam,locale}:{exam:RiskExam;locale:AppLocale}) {
  const copy=riskCopy(locale)
  const session=useRiskExam(exam)
  const {state,score}=session
  const [confirmQuit,setConfirmQuit]=useState(false)
  const sequence=useMemo(()=>playbackSequence(session.sequence),[session.sequence])
  const isTest=state.phase==='playing'||state.phase==='transition'
  return <div className="tpr-app">
    <header className={'tpr-heading '+(state.phase!=='idle'?'is-compact':'')}>
      <p className="tpr-eyebrow">{copy.eyebrow}</p>
      <h1>{copy.title}</h1>
      {state.phase==='idle'&&<p className="tpr-lead">{copy.subtitle}</p>}
    </header>
    {exam.status==='demo'&&<aside className="tpr-demo-notice"><span>{copy.demo}</span><p>{state.phase==='idle'?copy.demoNotice:copy.demoShort}</p></aside>}
    {state.phase==='idle'&&<section className="tpr-welcome">
      <div className="tpr-welcome-main"><div className="tpr-demo-visual" aria-hidden="true"><Eye size={56} strokeWidth={1.3}/><span className="tpr-target-mark"/><span className="tpr-road-line"/></div>
        <div><p className="tpr-instructions">{copy.instructions}</p><button className="tpr-button" onClick={session.start}><Play size={19}/>{copy.start}<ArrowRight size={19}/></button>
          {session.previous&&<button className="tpr-text-button tpr-previous" onClick={session.restore}>{copy.previous}<ArrowRight size={16}/></button>}
        </div>
      </div>
      <ol className="tpr-method">
        {[{Icon:Eye,title:copy.step1,body:copy.step1Body},{Icon:MousePointer2,title:copy.step2,body:copy.step2Body},{Icon:ShieldCheck,title:copy.step3,body:copy.step3Body}].map(({Icon,title,body})=><li key={title}><Icon size={24} aria-hidden="true"/><h2>{title}</h2><p>{body}</p></li>)}
      </ol><p className="tpr-local-note">{copy.local}</p>
    </section>}
    {isTest&&<section className="tpr-test" aria-label={copy.title}>
      <div className="tpr-test-toolbar"><p aria-live="polite">{copy.progress(state.sequenceIndex+1,exam.sequences.length)}</p>
        <button className="tpr-text-button" onClick={()=>setConfirmQuit(true)}>{copy.leave}</button></div>
      <ProgressBar value={state.sequenceIndex/exam.sequences.length}/>
      <p className="tpr-tap-instruction">{copy.tap}</p>
      {state.phase==='playing'?<RiskPerceptionPlayer key={state.id+sequence.id} sequence={sequence} risks={session.sequence.risks} locale={locale} mode="test" onClick={session.record} onComplete={session.complete}/>:
        <div className="tpr-transition" role="status"><ArrowRight size={36} aria-hidden="true"/><h2>{copy.next}</h2><p>{copy.progress(state.sequenceIndex+2,exam.sequences.length)}</p></div>}
      {confirmQuit&&<div className="tpr-quit-confirm" role="alert"><strong>{copy.leaveTitle}</strong><p>{copy.leaveBody}</p>
        <button className="tpr-outline-button" onClick={()=>setConfirmQuit(false)}>{copy.stay}</button>
        <button className="tpr-text-button" onClick={()=>{setConfirmQuit(false);session.quit()}}>{copy.quit}</button></div>}
    </section>}
    {state.phase==='result'&&score&&<section className="tpr-result" aria-labelledby="tpr-result-title">
      <p className="tpr-eyebrow">{exam.title[locale]}</p><h2 id="tpr-result-title">{copy.result}</h2>
      <div className="tpr-score" aria-label={score.score+' / 10'}><strong>{score.score}</strong><span>/ 10</span></div>
      <div className="tpr-score-stats"><p><strong>{score.score}</strong>{copy.detected}</p><p><strong>{score.missed}</strong>{copy.missed}</p></div>
      <div className="tpr-click-stats"><p>{score.falseClicks} {copy.falseClicks}</p><p>{score.duplicateClicks} {copy.duplicates}</p><p>{copy.noPenalty}</p></div>
      <div className="tpr-result-actions"><button className="tpr-button" onClick={session.review}>{copy.correction}<ArrowRight size={18}/></button>
        <button className="tpr-outline-button" onClick={session.start}><RotateCcw size={17}/>{copy.restart}</button></div>
      <p className="tpr-local-note" role="status">{session.saved===false?copy.storageUnavailable:session.saved?copy.saved:''}</p>
    </section>}
    {state.phase==='review'&&score&&<RiskCorrection exam={exam} score={score} locale={locale} onBack={session.result}/>}
  </div>
}
