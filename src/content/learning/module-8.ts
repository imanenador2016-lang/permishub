export const MODULE_8 = {
  id: 'vulnerable-users-passengers',
  number: 'MODULE 8',
  title: 'Usagers vulnérables & passagers',
  description: 'Protéger les piétons, cyclistes, enfants et passagers dans les situations où une erreur peut avoir de lourdes conséquences.',
  lessons: [
    { id: 'pieton-ou-conducteur', title: 'Piéton ou conducteur ?', description: 'Identifier le statut de chaque usager avant d’appliquer une règle.', xp: 20 },
    { id: 'pietons-passages-et-traversee', title: 'Piétons : passages & traversée', description: 'Anticiper, céder le passage et garder une visibilité suffisante.', xp: 25 },
    { id: 'cyclistes-pistes-et-passages', title: 'Cyclistes : pistes & passages', description: 'Distinguer piste, passage cycliste, passage piéton et zone cyclable.', xp: 25 },
    { id: 'enfants-ecoles-et-usagers-fragiles', title: 'Enfants, écoles & usagers fragiles', description: 'Redoubler de prudence face aux usagers les moins prévisibles.', xp: 25 },
    { id: 'ceinture-places-et-passagers', title: 'Ceinture, places & passagers', description: 'Installer chaque occupant correctement et connaître les exceptions.', xp: 20 },
    { id: 'enfants-et-dispositifs-de-retenue', title: 'Enfants & dispositifs de retenue', description: 'Choisir la protection adaptée à la taille et neutraliser les risques.', xp: 25 },
    { id: 'angles-morts-et-partage-de-la-route', title: 'Angles morts & partage de la route', description: 'Contrôler ce que les rétroviseurs ne montrent pas et protéger les deux-roues.', xp: 25 },
  ],
  finalChallenge: {
    id: 'defi-final-usagers-vulnerables-passagers',
    title: 'Défi final — Usagers vulnérables & passagers',
    description: '15 situations pour évaluer les 7 leçons du module.',
    xp: 50,
  },
} as const

export const MODULE_8_VISUAL_ID_PREFIX = 'M8_'
