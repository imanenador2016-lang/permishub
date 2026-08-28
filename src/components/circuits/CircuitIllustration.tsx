/**
 * Mini-scènes "ligne claire" du carrousel circuits — portées depuis
 * apercu-circuits-swipe.html. Pas la vraie carte Google Maps ici (réservée
 * à la page de détail /circuits/[ville]) : juste un aperçu léger et
 * cohérent visuellement, avec le tracé pointillé + le point annoté
 * (technique d'annotation, voir components/annotation/).
 */
export function CircuitIllustrationAnderlecht() {
  return (
    <svg viewBox="0 0 300 150" width="100%" height="100%" style={{ display: 'block' }} role="img" aria-label="Aperçu du quartier — Anderlecht">
      <rect width="300" height="150" fill="#AFCFDA" />
      <rect y="90" width="300" height="60" fill="#EDE3CC" />
      <g stroke="#1F1A14" strokeWidth="4">
        <rect x="20" y="40" width="50" height="50" fill="#C1432E" />
        <polygon points="20,40 45,20 70,40" fill="#1F1A14" />
        <rect x="220" y="35" width="55" height="55" fill="#F5B400" />
        <polygon points="220,35 247,15 275,35" fill="#1F1A14" />
      </g>
      <path d="M30,120 Q100,70 150,110 T270,100" fill="none" stroke="#C1432E" strokeWidth="4" strokeDasharray="8 6" />
      <circle cx="150" cy="110" r="14" fill="none" stroke="#C1432E" strokeWidth="3" strokeDasharray="4 4" />
      <circle cx="150" cy="110" r="4" fill="#C1432E" />
    </svg>
  )
}

const GENERIC_ACCENTS = ['#F5B400', '#2B5E44', '#C1432E'] as const

/**
 * Scène générique réutilisée pour les centres sans illustration dédiée —
 * même grammaire visuelle (façade, tracé pointillé, point annoté), teinte
 * de façade qui tourne pour distinguer les cartes au premier coup d'œil.
 */
export function CircuitIllustrationGeneric({ seed = 0 }: { seed?: number }) {
  const accent = GENERIC_ACCENTS[seed % GENERIC_ACCENTS.length]
  return (
    <svg viewBox="0 0 300 150" width="100%" height="100%" style={{ display: 'block' }} role="img" aria-label="Aperçu du quartier">
      <rect width="300" height="150" fill="#AFCFDA" />
      <rect y="90" width="300" height="60" fill="#EDE3CC" />
      <g stroke="#1F1A14" strokeWidth="4">
        <rect x="120" y="42" width="60" height="48" fill={accent} />
        <polygon points="120,42 150,20 180,42" fill="#1F1A14" />
        <rect x="140" y="58" width="20" height="26" fill="#F7F1E4" />
      </g>
      <path d="M20,115 Q90,90 150,105 T280,95" fill="none" stroke="#C1432E" strokeWidth="4" strokeDasharray="8 6" />
      <circle cx="150" cy="105" r="14" fill="none" stroke="#C1432E" strokeWidth="3" strokeDasharray="4 4" />
      <circle cx="150" cy="105" r="4" fill="#C1432E" />
    </svg>
  )
}

export function CircuitIllustrationSchaerbeek() {
  return (
    <svg viewBox="0 0 300 150" width="100%" height="100%" style={{ display: 'block' }} role="img" aria-label="Aperçu du quartier — Schaerbeek">
      <rect width="300" height="150" fill="#AFCFDA" />
      <rect y="90" width="300" height="60" fill="#EDE3CC" />
      <g stroke="#1F1A14" strokeWidth="4">
        <rect x="35" y="45" width="50" height="45" fill="#2B5E44" />
        <polygon points="35,45 60,25 85,45" fill="#1F1A14" />
        <rect x="200" y="40" width="55" height="50" fill="#C1432E" />
        <polygon points="200,40 227,20 255,40" fill="#1F1A14" />
      </g>
      <path d="M20,105 Q90,130 140,95 T280,115" fill="none" stroke="#C1432E" strokeWidth="4" strokeDasharray="8 6" />
      <circle cx="140" cy="95" r="14" fill="none" stroke="#C1432E" strokeWidth="3" strokeDasharray="4 4" />
      <circle cx="140" cy="95" r="4" fill="#C1432E" />
    </svg>
  )
}
