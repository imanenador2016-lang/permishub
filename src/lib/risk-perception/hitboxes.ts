import type { PerceptionRisk, RiskBox } from '@/domain/risk-perception'

/** Keyframes must be chronologically ordered; validateExam enforces this at ingestion. */
export function hitboxAt(risk: PerceptionRisk, time: number): RiskBox | null {
  if (!Number.isFinite(time) || time < risk.activeFrom || time > risk.activeUntil || !risk.hitboxes.length) return null
  const frames = risk.hitboxes
  if (time <= frames[0].time) return frames[0]
  const last = frames[frames.length - 1]
  if (time >= last.time) return last
  const right = frames.findIndex(frame => frame.time >= time)
  const a = frames[right - 1]
  const b = frames[right]
  const ratio = (time - a.time) / (b.time - a.time)
  return {
    x: a.x + (b.x - a.x) * ratio, y: a.y + (b.y - a.y) * ratio,
    width: a.width + (b.width - a.width) * ratio, height: a.height + (b.height - a.height) * ratio,
  }
}
export function containsPoint(box: RiskBox, x: number, y: number): boolean {
  return Number.isFinite(x) && Number.isFinite(y) && x >= box.x && x <= box.x + box.width && y >= box.y && y <= box.y + box.height
}
