export const MODULE_6 = {
  id: 'safety-behaviour',
  number: 'MODULE 6',
  title: 'Sécurité, alcool & accidents',
  description: 'Prévenir la conduite sous influence et adopter les bons réflexes avant, pendant et après un accident.',
  lessons: [
    { id: 'alcool-limites-et-risques', title: 'Alcool : limites & risques', description: 'Connaître les limites belges et comprendre pourquoi aucun verre ne garantit un taux précis.', xp: 20 },
    { id: 'controle-alcoolemie-s-a-p', title: 'Contrôle d’alcoolémie : S, A ou P', description: 'Lire le résultat d’un contrôle et connaître ses conséquences immédiates.', xp: 25 },
    { id: 'refus-recidive-et-antidemarrage', title: 'Refus, récidive & antidémarrage', description: 'Éviter les pièges liés au refus de souffler et aux sanctions aggravées.', xp: 20 },
    { id: 'drogues-medicaments-et-conduite', title: 'Drogues, médicaments & conduite', description: 'Reconnaître les situations où la capacité de conduire est altérée.', xp: 20 },
    { id: 'securiser-un-accident', title: 'Sécuriser un accident', description: 'Protéger la zone sans créer un second accident.', xp: 25 },
    { id: 'constat-police-et-assurance', title: 'Constat, police & assurance', description: 'Savoir quoi faire selon qu’il y a ou non des blessés.', xp: 25 },
    { id: 'porter-secours-et-rester-sur-place', title: 'Porter secours & rester sur place', description: 'Aider sans aggraver les blessures et éviter le délit de fuite.', xp: 25 },
  ],
  finalChallenge: {
    id: 'defi-final-securite-alcool-accidents',
    title: 'Défi final — Sécurité, alcool & accidents',
    description: '15 situations pour évaluer les 7 leçons du module.',
    xp: 50,
  },
} as const

export const MODULE_6_VISUAL_ID_PREFIX = 'M6_'
