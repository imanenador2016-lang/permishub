import type { RiskExam } from '@/domain/risk-perception'

/** Shared import boundary for today's TS content and a future JSON/admin repository. */
export function validateExam(exam: RiskExam): void {
  const fail = (message: string): never => { throw new Error('Invalid TPR exam: ' + message) }
  if (exam.schemaVersion !== 1 || !exam.id || !Number.isInteger(exam.version) || exam.version < 1) fail('identity/version')
  if (!['demo', 'published'].includes(exam.status) || !exam.title.fr || !exam.title.nl) fail('status/title')
  if (!exam.sequences.length) fail('empty exam')
  const sequences = new Set<string>()
  const risks = new Set<string>()
  for (const sequence of exam.sequences) {
    if (!sequence.id || sequences.has(sequence.id)) fail('duplicate sequence ID')
    sequences.add(sequence.id)
    if (!sequence.videoSrc || !Number.isFinite(sequence.startTime) || !Number.isFinite(sequence.endTime) ||
        sequence.startTime < 0 || sequence.endTime <= sequence.startTime) fail('clip bounds')
    if (sequence.risks.length < 1 || sequence.risks.length > 3) fail('a sequence needs 1–3 risks')
    for (const risk of sequence.risks) {
      if (!risk.id || risks.has(risk.id)) fail('duplicate risk ID')
      risks.add(risk.id)
      if (!risk.label.fr || !risk.label.nl || !risk.explanation.fr || !risk.explanation.nl) fail('missing risk copy')
      if (!Number.isFinite(risk.activeFrom) || !Number.isFinite(risk.activeUntil) ||
          risk.activeFrom < sequence.startTime || risk.activeUntil > sequence.endTime ||
          risk.activeFrom >= risk.activeUntil) fail('active window')
      if (!risk.calibrated) continue
      if (!risk.hitboxes.length) fail('no keyframes')
      let previous = -Infinity
      for (const box of risk.hitboxes) {
        if (![box.time, box.x, box.y, box.width, box.height].every(Number.isFinite) ||
            box.time <= previous || box.time < sequence.startTime || box.time > sequence.endTime) fail('keyframe time/order')
        if (box.x < 0 || box.y < 0 || box.width <= 0 || box.height <= 0 ||
            box.x + box.width > 1 || box.y + box.height > 1) fail('normalized keyframe bounds')
        previous = box.time
      }
      if (risk.hitboxes.length > 1 &&
          (risk.hitboxes[0].time > risk.activeFrom || risk.hitboxes[risk.hitboxes.length - 1].time < risk.activeUntil)) fail('keyframes must cover the active window')
    }
  }
  if (risks.size !== 10) fail('exactly 10 risks required')
}
