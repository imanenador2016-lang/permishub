export type CoachingIntensifSession = {
  id: string
  date: string
  label: string
  time: string
  priceCents: number
  status: 'available' | 'complete' | 'expired'
  remainingSeats: number
}

export const COACHING_INTENSIF_SESSIONS: readonly CoachingIntensifSession[] = [
  { id: 'coaching-intensif-2026-11-01', date: '2026-11-01', label: 'Dimanche 1er novembre', time: '09:00–14:00', priceCents: 7900, status: 'available', remainingSeats: 4 },
] as const
export function getCoachingIntensifSession(id: string) { return COACHING_INTENSIF_SESSIONS.find((session) => session.id === id) }
