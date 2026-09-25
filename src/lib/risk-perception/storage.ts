import type { RiskAttempt, RiskClick, RiskExam } from '@/domain/risk-perception'
const KEY = 'permishub.tpr.attempts.v1'
function validClick(value: unknown): value is RiskClick {
  if (!value || typeof value !== 'object') return false
  const c = value as RiskClick
  return typeof c.id === 'string' && typeof c.sequenceId === 'string' &&
    Number.isFinite(c.time) && Number.isFinite(c.x) && Number.isFinite(c.y) &&
    c.x >= 0 && c.x <= 1 && c.y >= 0 && c.y <= 1
}
function readAttempts(): RiskAttempt[] {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    if (!Array.isArray(parsed)) return []
    return parsed.filter((a): a is RiskAttempt => !!a && typeof a.id === 'string' &&
      typeof a.examId === 'string' && Number.isInteger(a.examVersion) &&
      typeof a.startedAt === 'string' && typeof a.finishedAt === 'string' &&
      Array.isArray(a.clicks) && a.clicks.every(validClick)).slice(0,5)
  } catch { return [] }
}
export function latestAttempt(exam: RiskExam): RiskAttempt | undefined {
  return readAttempts().find(a => a.examId === exam.id && a.examVersion === exam.version)
}
export function saveAttempt(attempt: RiskAttempt): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify([attempt, ...readAttempts().filter(a => a.id !== attempt.id)].slice(0,5)))
    return true
  } catch { return false }
}
