/**
 * Scène "ligne claire" du hero — portée depuis reference-design-hero.html
 * (rue belge : façade brique, maison à pignon, façade jaune, tram, panneau
 * de priorité annoté). Aplats francs, contours noirs uniformes, zéro
 * dégradé — ne pas ajouter de flou/ombre douce ici.
 */
export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 600 460"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      style={{ display: 'block' }}
      role="img"
      aria-label="Rue belge, style ligne claire"
    >
      <rect x="0" y="0" width="600" height="460" fill="#AFCFDA" />
      <rect x="0" y="230" width="600" height="230" fill="#EDE3CC" />
      <g stroke="#1F1A14" strokeWidth="6" strokeLinejoin="round">
        <rect x="30" y="120" width="110" height="120" fill="#C1432E" />
        <polygon points="30,120 85,75 140,120" fill="#1F1A14" />
        <rect x="55" y="160" width="24" height="24" fill="#F5B400" />
        <rect x="95" y="160" width="24" height="24" fill="#F5B400" />
        <rect x="70" y="200" width="30" height="40" fill="#F7F1E4" />
        <rect x="150" y="100" width="120" height="140" fill="#E8DCC4" />
        <polygon points="150,100 210,55 270,100" fill="#2B5E44" />
        <rect x="178" y="140" width="26" height="26" fill="#AFCFDA" />
        <rect x="222" y="140" width="26" height="26" fill="#AFCFDA" />
        <rect x="195" y="185" width="32" height="55" fill="#1F1A14" fillOpacity="0.85" />
        <rect x="440" y="110" width="115" height="130" fill="#F5B400" />
        <polygon points="440,110 497,68 555,110" fill="#1F1A14" />
        <rect x="465" y="150" width="24" height="24" fill="#F7F1E4" />
        <rect x="505" y="150" width="24" height="24" fill="#F7F1E4" />
        <rect x="482" y="190" width="30" height="50" fill="#C1432E" />
      </g>
      <ellipse cx="300" cy="345" rx="200" ry="90" fill="#E8DCC4" stroke="#1F1A14" strokeWidth="6" />
      <ellipse cx="300" cy="345" rx="95" ry="42" fill="#2B5E44" stroke="#1F1A14" strokeWidth="6" />
      <line x1="0" y1="270" x2="600" y2="270" stroke="#1F1A14" strokeWidth="4" />
      <line x1="0" y1="282" x2="600" y2="282" stroke="#1F1A14" strokeWidth="4" />
      <g stroke="#1F1A14" strokeWidth="5" strokeLinejoin="round">
        <line x1="90" y1="300" x2="90" y2="255" strokeWidth="6" />
        <rect x="72" y="228" width="36" height="36" fill="#F5B400" transform="rotate(45 90 246)" />
      </g>
      {/* Technique d'annotation : cercle pointillé brick marquant le panneau — voir PinnedCard/AnnotationRing */}
      <circle cx="90" cy="246" r="42" fill="none" stroke="#C1432E" strokeWidth="4" strokeDasharray="6 6" />
      <g stroke="#1F1A14" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round">
        <path
          d="M170 400 L170 378 Q170 368 180 366 L232 364 Q250 342 280 342 L322 342 Q340 342 352 362 L388 366 Q400 368 400 382 L400 400 Z"
          fill="#F5B400"
        />
        <path d="M242 362 L266 346 L308 346 L328 362 Z" fill="#AFCFDA" />
        <line x1="286" y1="346" x2="286" y2="362" />
        <line x1="170" y1="392" x2="400" y2="392" strokeWidth="3" />
        <circle cx="212" cy="402" r="20" fill="#1F1A14" />
        <circle cx="212" cy="402" r="8" fill="#F7F1E4" />
        <circle cx="362" cy="402" r="20" fill="#1F1A14" />
        <circle cx="362" cy="402" r="8" fill="#F7F1E4" />
        <rect x="176" y="380" width="14" height="7" fill="#C1432E" />
        <rect x="384" y="380" width="14" height="7" fill="#C1432E" />
      </g>
    </svg>
  )
}
