'use client'
import { useMemo, useState } from 'react'
import { Check, RotateCcw, ArrowLeft, MousePointer2 } from 'lucide-react'
import type { RiskExam, RiskScore } from '@/domain/risk-perception'
import type { AppLocale } from '@/i18n/request'
import { playbackSequence } from '@/content/risk-perception/exams'
import { riskCopy } from '@/content/risk-perception/copy'
import { RiskPerceptionPlayer } from './RiskPerceptionPlayer'

export function RiskCorrection({exam,score,locale,onBack}:{exam:RiskExam;score:RiskScore;locale:AppLocale;onBack:()=>void}) {
  const copy=riskCopy(locale)
  const [index,setIndex]=useState(0)
  const [seek,setSeek]=useState<{time:number;nonce:number}>()
  const sequence=exam.sequences[index]
  const playback=useMemo(()=>playbackSequence(sequence),[sequence])
  const clicks=score.clicks.filter(c=>c.sequenceId===sequence.id)
  function replay(time:number){setSeek({time:Math.max(sequence.startTime,time-2),nonce:performance.now()})}
  return <section aria-labelledby="tpr-review-title">
    <button className="tpr-text-button" onClick={onBack}><ArrowLeft size={17}/>{copy.backResult}</button>
    <h2 id="tpr-review-title">{copy.reviewTitle}</h2><p className="tpr-lead">{copy.reviewLead}</p>
    <nav className="tpr-sequence-tabs" aria-label={copy.correction}>
      {exam.sequences.map((s,i)=><button key={s.id} aria-current={i===index?'step':undefined} onClick={()=>{setIndex(i);setSeek(undefined)}}>{copy.reviewSequence(i+1)}</button>)}
    </nav>
    <RiskPerceptionPlayer key={sequence.id} sequence={playback} locale={locale} mode="review" risks={sequence.risks} reviewClicks={clicks} reviewSeek={seek}/>
    <div className="tpr-risk-list">{sequence.risks.map(risk=>{
      const detected=score.detectedRiskIds.includes(risk.id)
      const riskClicks=clicks.filter(c=>c.riskId===risk.id)
      const timing=riskClicks[0]
        ? (riskClicks[0].outcome==='hit' ? 'correct' : (riskClicks[0].time<risk.activeFrom ? 'trop tôt' : riskClicks[0].time>risk.activeUntil ? 'trop tard' : 'hors zone'))
        : 'non détecté'
      return <article className={'tpr-risk '+(detected?'is-found':'is-missed')} key={risk.id}>
        <div><span className="tpr-risk-status">{detected?<Check size={16}/>:<MousePointer2 size={16}/>} {detected?copy.found:copy.missedOne}</span>
          <h3>{risk.label[locale]}</h3><p>{risk.explanation[locale]}</p>
          <p className="tpr-time">Moment : {risk.sourceTimestamp.toFixed(1)} s · fenêtre : {risk.activeFrom.toFixed(1)}–{risk.activeUntil.toFixed(1)} s</p>
          <p className="tpr-time">Clic : {riskClicks[0] ? `${riskClicks[0].time.toFixed(2)} s · X ${riskClicks[0].x.toFixed(3)} · Y ${riskClicks[0].y.toFixed(3)}` : 'aucun'} · {timing}</p>
        </div>
        <button className="tpr-outline-button" onClick={()=>replay(risk.activeFrom)}><RotateCcw size={17}/>{copy.replay}</button>
      </article>
    })}</div>
    <details className="tpr-click-log"><summary>{copy.clickHistory} ({clicks.length})</summary>
      {clicks.length===0?<p>{copy.noClicks}</p>:<ol>{clicks.map(click=><li key={click.id}>
        <span><strong>{click.outcome==='hit'?copy.correctClick:click.outcome==='duplicate'?copy.duplicateClick:copy.falseClick}</strong>
          <span>{(click.time-sequence.startTime).toFixed(2)} s · X {click.x.toFixed(3)} · Y {click.y.toFixed(3)}</span>
        </span><button className="tpr-text-button" onClick={()=>replay(click.time)}>{copy.replayClick}</button>
      </li>)}</ol>}
    </details>
  </section>
}
