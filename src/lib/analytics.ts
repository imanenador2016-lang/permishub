/**
 * Envoie un event vers GA4 (gtag.js déjà chargé dans le layout racine, voir
 * NEXT_PUBLIC_GA_MEASUREMENT_ID) — no-op silencieux si le script n'est pas
 * chargé (variable d'env absente, bloqueur de pub, SSR) plutôt que de
 * planter le tunnel pour un simple souci de tracking.
 */
export function trackEvent(name: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined') return
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag
  if (typeof gtag !== 'function') return
  try {
    gtag('event', name, params)
  } catch {
    // Le tracking ne doit jamais faire planter le tunnel.
  }
}
