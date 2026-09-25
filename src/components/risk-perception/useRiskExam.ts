'use client'
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import type { RiskAttempt, RiskClick, RiskExam } from '@/domain/risk-perception'
import { sessionReducer, initialSession } from '@/lib/risk-perception/session'
import { scoreExam } from '@/lib/risk-perception/scoring'
import { latestAttempt, saveAttempt } from '@/lib/risk-perception/storage'

export function useRiskExam(exam: RiskExam) {
  const [state, dispatch] = useReducer(sessionReducer,initialSession)
  const [previous,setPrevious] = useState<RiskAttempt>()
  const [saved,setSaved] = useState<boolean | null>(null)
  const sequence = exam.sequences[state.sequenceIndex]
  useEffect(()=>{setPrevious(latestAttempt(exam))},[exam])
  useEffect(()=>{
    if(state.phase!=='transition')return
    const timer=window.setTimeout(()=>dispatch({type:'next'}),1500)
    return ()=>window.clearTimeout(timer)
  },[state.phase])
  useEffect(()=>{
    if(state.phase!=='result') return
    const attempt:RiskAttempt={id:state.id,examId:exam.id,examVersion:exam.version,startedAt:state.startedAt,finishedAt:state.finishedAt,clicks:state.clicks}
    setSaved(saveAttempt(attempt))
    setPrevious(attempt)
  },[state.phase,state.id,state.startedAt,state.finishedAt,state.clicks,exam])
  const start=()=>{setSaved(null);dispatch({type:'start',id:crypto.randomUUID(),at:new Date().toISOString()})}
  const record=useCallback((click:RiskClick)=>dispatch({type:'click',click,sequenceId:sequence.id,index:state.sequenceIndex}),[sequence.id,state.sequenceIndex])
  const complete=useCallback(()=>dispatch({type:'ended',index:state.sequenceIndex,sequenceCount:exam.sequences.length,at:new Date().toISOString()}),[state.sequenceIndex,exam.sequences.length])
  const score=useMemo(()=>state.phase==='result'||state.phase==='review'?scoreExam(exam,state.clicks):null,[exam,state.phase,state.clicks])
  function restore() {
    if(previous)dispatch({type:'restore',session:{...initialSession,phase:'result',id:previous.id,startedAt:previous.startedAt,finishedAt:previous.finishedAt,clicks:previous.clicks}})
  }
  return {state,sequence,score,previous,saved,start,record,complete,restore,
    quit:()=>dispatch({type:'quit'}),review:()=>dispatch({type:'review'}),result:()=>dispatch({type:'result'})}
}
