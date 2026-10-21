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
  { id: 'coaching-intensif-2026-10-18', date: '2026-10-18', label: 'Dimanche 18 octobre', time: '09:00–14:00', priceCents: 7900, status: 'available', remainingSeats: 2 },
] as const
export function getCoachingIntensifSession(id: string) { return COACHING_INTENSIF_SESSIONS.find((session) => session.id === id) }
