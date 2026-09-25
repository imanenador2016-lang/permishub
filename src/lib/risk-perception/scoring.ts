import type { RiskClick, RiskExam, RiskScore, EvaluatedClick } from '@/domain/risk-perception'
import { containsPoint, hitboxAt } from './hitboxes'
import { validateExam } from './validation'

/** One click -> nearest matching risk centre (ID resolves ties). A repeated target
 * remains a duplicate, even when another overlapping risk is not yet detected. */
export function scoreExam(exam: RiskExam, clicks: RiskClick[]): RiskScore {
  validateExam(exam)
  const detected = new Set<string>()
  const seenClicks = new Set<string>()
  const evaluated: EvaluatedClick[] = []
  const ordered = [...clicks].sort((a,b) => a.time - b.time)
  for (const click of ordered) {
    if (seenClicks.has(click.id)) continue
    seenClicks.add(click.id)
    const sequence = exam.sequences.find(s => s.id === click.sequenceId)
    const valid = sequence && Number.isFinite(click.time) && click.time >= sequence.startTime &&
      click.time <= sequence.endTime && click.x >= 0 && click.x <= 1 && click.y >= 0 && click.y <= 1
    const candidates = valid ? sequence.risks.flatMap(risk => {
      const box = hitboxAt(risk, click.time)
      return box && containsPoint(box, click.x, click.y) ? [{
        id: risk.id, distance: (click.x - box.x - box.width / 2) ** 2 + (click.y - box.y - box.height / 2) ** 2,
      }] : []
    }).sort((a,b) => a.distance - b.distance || a.id.localeCompare(b.id)) : []
    const match = candidates[0]
    if (!match) evaluated.push({ ...click, outcome: 'false' })
    else {
      evaluated.push({ ...click, outcome: detected.has(match.id) ? 'duplicate' : 'hit', riskId: match.id })
      detected.add(match.id)
    }
  }
  return {
    score: detected.size, total: 10, missed: 10 - detected.size,
    falseClicks: evaluated.filter(c => c.outcome === 'false').length,
    duplicateClicks: evaluated.filter(c => c.outcome === 'duplicate').length,
    detectedRiskIds: [...detected], clicks: evaluated,
  }
}
