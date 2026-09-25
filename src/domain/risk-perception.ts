import type { LocalizedText } from './content'

export interface RiskBox { x: number; y: number; width: number; height: number }
export interface RiskKeyframe extends RiskBox { time: number }
export interface PerceptionRisk {
  id: string
  calibrated?: boolean
  /** Timestamp in the source footage used during annotation (seconds). */
  sourceTimestamp: number
  label: LocalizedText
  explanation: LocalizedText
  /** All times are absolute seconds in the source video, not clip-relative. */
  activeFrom: number
  activeUntil: number
  hitboxes: RiskKeyframe[]
}
export interface RiskSequence {
  id: string
  videoSrc: string
  startTime: number
  endTime: number
  risks: PerceptionRisk[]
}
export type PlaybackSequence = Omit<RiskSequence, 'risks'>
export interface RiskExam {
  schemaVersion: 1
  id: string
  version: number
  title: LocalizedText
  status: 'demo' | 'published'
  sequences: RiskSequence[]
}
export interface RiskClick {
  id: string
  sequenceId: string
  /** Unrounded HTMLMediaElement.currentTime at pointer release. */
  time: number
  x: number
  y: number
}
export interface RiskAttempt {
  id: string
  examId: string
  examVersion: number
  startedAt: string
  finishedAt: string
  clicks: RiskClick[]
}
export interface EvaluatedClick extends RiskClick {
  outcome: 'hit' | 'duplicate' | 'false'
  riskId?: string
}
export interface RiskScore {
  score: number
  total: 10
  missed: number
  falseClicks: number
  duplicateClicks: number
  clicks: EvaluatedClick[]
  detectedRiskIds: string[]
}
