export const COACHING_INTENSIF_SESSIONS = [
  { id: 'coaching-intensif-2026-09-26', date: '2026-09-26', label: 'Samedi 26 septembre', time: '09:00–14:00', priceCents: 7900 },
  { id: 'coaching-intensif-2026-09-27', date: '2026-09-27', label: 'Dimanche 27 septembre', time: '09:00–14:00', priceCents: 7900 },
] as const
export function getCoachingIntensifSession(id: string) { return COACHING_INTENSIF_SESSIONS.find((session) => session.id === id) }
