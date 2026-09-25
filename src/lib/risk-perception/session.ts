import type { RiskClick } from '@/domain/risk-perception'
export interface RiskSession {
  phase: 'idle' | 'playing' | 'transition' | 'result' | 'review'
  sequenceIndex: number
  clicks: RiskClick[]
  id: string
  startedAt: string
  finishedAt: string
}
export const initialSession: RiskSession = { phase:'idle',sequenceIndex:0,clicks:[],id:'',startedAt:'',finishedAt:'' }
export type SessionAction =
  | { type:'start'; id:string; at:string }
  | { type:'click'; click:RiskClick; sequenceId:string; index:number }
  | { type:'ended'; index:number; sequenceCount:number; at:string }
  | { type:'next' } | { type:'quit' } | { type:'review' } | { type:'result' }
  | { type:'restore'; session:RiskSession }
export function sessionReducer(state:RiskSession, action:SessionAction):RiskSession {
  switch(action.type) {
    case 'start': return {...initialSession,phase:'playing',id:action.id,startedAt:action.at}
    case 'click': return state.phase==='playing' && state.sequenceIndex===action.index && action.click.sequenceId===action.sequenceId
      ? {...state,clicks:[...state.clicks,action.click]} : state
    case 'ended':
      if(state.phase!=='playing'||state.sequenceIndex!==action.index) return state
      return {...state,phase:action.index===action.sequenceCount-1?'result':'transition',finishedAt:action.index===action.sequenceCount-1?action.at:''}
    case 'next': return state.phase==='transition'?{...state,phase:'playing',sequenceIndex:state.sequenceIndex+1}:state
    case 'quit': return initialSession
    case 'review': return state.phase==='result'?{...state,phase:'review'}:state
    case 'result': return state.phase==='review'?{...state,phase:'result'}:state
    case 'restore': return {...action.session,phase:'result'}
  }
}
