/**
 * Rate limiting basique en mémoire — suffisant pour un formulaire de lead
 * (voir conversation du 2026-09-08). Pas de store partagé entre instances
 * serverless : chaque instance Netlify Function a sa propre mémoire, donc
 * la vraie limite globale peut être un peu plus haute que le chiffre
 * annoncé si plusieurs instances tournent en parallèle — acceptable pour
 * ce niveau de protection (anti-spam basique, pas une vraie défense DDoS).
 */
const hits = new Map<string, { count: number; windowStart: number }>()

export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const entry = hits.get(key)

  if (!entry || now - entry.windowStart > windowMs) {
    hits.set(key, { count: 1, windowStart: now })
    return false
  }

  entry.count += 1
  return entry.count > limit
}
