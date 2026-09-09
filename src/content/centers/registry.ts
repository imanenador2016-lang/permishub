import type { ExamCenter, PracticeCircuit } from '@/domain/centers'

/**
 * Catalogue des centres d'examen pris en charge. Liste volontairement
 * limitée à 2 centres actifs pour le MVP (les autres sont `comingSoon`) —
 * facile à étendre : il suffit d'ajouter une entrée ici et ses circuits
 * ci-dessous, aucune page ne dépend d'une liste figée.
 */

/**
 * Prix du déblocage "tous les circuits" d'un centre — un seul paiement,
 * accès illimité à tous les circuits actuels ET à venir de ce centre
 * (remplace l'ancien prix par circuit à 24,99 €, voir conversation du
 * 2026-08-30 ; passé de 9,99 € à 17,99 € le 2026-09-08). Jamais
 * d'abonnement — voir api/checkout/circuits-bundle et CircuitOfferModal.tsx.
 * Le texte "circuitPriceLabel" (messages/fr.json, nl.json) répète ce prix
 * en dur pour l'affichage — à garder synchronisé si ce prix rechange.
 */
export const CIRCUITS_BUNDLE_PRICE_CENTS = 1799
export const EXAM_CENTERS: ExamCenter[] = [
  // lat/lng = adresse réelle du centre d'examen GOCA (Rue du Labeur, 1070 Anderlecht),
  // confirmée via le point de départ du parcours 1 fourni par le client le 2026-08-29
  // (remplace l'ancienne approximation centre-ville).
  { id: 'anderlecht', slug: 'anderlecht', name: 'Anderlecht', region: 'BRUXELLES', priceCents: 2499, lat: 50.8201738, lng: 4.3100693 },
  { id: 'schaerbeek', slug: 'schaerbeek', name: 'Schaerbeek', region: 'BRUXELLES', priceCents: 2499, lat: 50.8676, lng: 4.3737 },
  // Louvain-la-Neuve et Couillet activés le 2026-09-08 — vrais tracés (4
  // circuits chacun) + photo fournis par le client, voir conversation.
  // lat/lng restent l'approximation centre-ville d'origine (voir
  // Anderlecht ci-dessus pour l'exemple d'une adresse confirmée via le
  // point de départ réel d'un circuit) — à affiner si besoin plus tard.
  { id: 'louvain-la-neuve', slug: 'louvain-la-neuve', name: 'Louvain-la-Neuve', region: 'WALLONIE', priceCents: 2499, lat: 50.6681, lng: 4.6118 },
  { id: 'couillet', slug: 'couillet', name: 'Couillet', region: 'WALLONIE', priceCents: 2499, lat: 50.4028, lng: 4.4696 },
  // Verrouillés "Bientôt" le 2026-08-29 à la demande du client — pas encore
  // de vrai tracé pour ceux-ci, voir conversation du 2026-08-29.
  { id: 'mariembourg', slug: 'mariembourg', name: 'Mariembourg', region: 'WALLONIE', priceCents: 2499, lat: 50.0965, lng: 4.5211, comingSoon: true },
  { id: 'braine-le-comte', slug: 'braine-le-comte', name: 'Braine-le-Comte', region: 'WALLONIE', priceCents: 2499, lat: 50.6094, lng: 4.1447, comingSoon: true },
  { id: 'cuesmes', slug: 'cuesmes', name: 'Cuesmes', region: 'WALLONIE', priceCents: 2499, lat: 50.44, lng: 3.9333, comingSoon: true },
  { id: 'lobbes', slug: 'lobbes', name: 'Lobbes', region: 'WALLONIE', priceCents: 2499, lat: 50.3486, lng: 4.2664, comingSoon: true },
]

/**
 * Emplacements de contenu pour les circuits d'entraînement. Le tracé réel
 * (Google Maps, manœuvres précises testées à cet examen) n'a pas encore été
 * préparé/vérifié — ces entrées permettent de construire et tester
 * l'interface (aperçu verrouillé, page centre, déblocage) sans jamais
 * prétendre représenter le tracé officiel tant qu'il n'est pas vérifié.
 */
export const PRACTICE_CIRCUITS: PracticeCircuit[] = [
  {
    id: 'anderlecht-1',
    centerSlug: 'anderlecht',
    title: { fr: 'Circuit d’entraînement 1', nl: 'Trainingscircuit 1' },
    description: {
      fr: 'Itinéraire à parcourir en voiture autour du centre, avec les manœuvres typiquement testées à l’examen pratique (créneau, rond-point, priorité de droite).',
      nl: 'Route om met de auto rond het centrum te rijden, met de manoeuvres die typisch getest worden bij het praktijkexamen (parkeren, rotonde, voorrang van rechts).',
    },
    // Vrai tracé fourni par le client le 2026-08-29 : Centre d'examen
    // Anderlecht (Rue du Labeur) → Bd International → Rue du Sillon → Rue
    // Dr Huet → Av. Nellie Melba → Rue Claude Debussy → Av. Guillaume
    // Stassart → Bd Théo Lambert → Bd Maurice Carême → Rue du Charroi.
    mapsUrl: 'https://maps.app.goo.gl/KH3mQf9WqmVmYxd97',
    durationMinutes: 30,
    // Circuit "vitrine" affiché sur le carrousel de la home (brief v2). Prix
    // réel confirmé (24,99€). distanceKm/attentionPointsCount/difficulty
    // restent les valeurs d'exemple du mockup de référence (pas encore
    // remplacées par une vraie mesure malgré le tracé désormais réel — à
    // confirmer avec le client) — voir domain/centers.ts CircuitDifficulty.
    priceCents: 2499,
    distanceKm: 4.2,
    attentionPointsCount: 5,
    difficulty: 'difficile',
  },
  {
    id: 'anderlecht-2',
    centerSlug: 'anderlecht',
    title: { fr: 'Circuit d’entraînement 2', nl: 'Trainingscircuit 2' },
    description: {
      fr: 'Deuxième itinéraire, avec un enchaînement de carrefours et de changements de bande différent du premier circuit.',
      nl: 'Tweede route, met een andere opeenvolging van kruispunten en rijstrookwissels dan het eerste circuit.',
    },
    // Vrai tracé fourni par le client le 2026-08-29 — voir note sur anderlecht-1.
    mapsUrl: 'https://maps.app.goo.gl/XjELyouuBK1F3Aud9',
    durationMinutes: 30,
  },
  {
    id: 'anderlecht-3',
    centerSlug: 'anderlecht',
    title: { fr: 'Circuit d’entraînement 3', nl: 'Trainingscircuit 3' },
    description: {
      fr: 'Troisième itinéraire, pour varier les conditions de circulation rencontrées avant le jour J.',
      nl: 'Derde route, om de verkeersomstandigheden vóór de grote dag te variëren.',
    },
    // Vrai tracé fourni par le client le 2026-08-29 — voir note sur anderlecht-1.
    mapsUrl: 'https://maps.app.goo.gl/cxrhoee2AB2vctq56',
    durationMinutes: 30,
  },
  {
    id: 'anderlecht-4',
    centerSlug: 'anderlecht',
    title: { fr: 'Circuit d’entraînement 4', nl: 'Trainingscircuit 4' },
    description: {
      fr: 'Quatrième itinéraire, pour varier encore les conditions de circulation rencontrées avant le jour J.',
      nl: 'Vierde route, om de verkeersomstandigheden vóór de grote dag verder te variëren.',
    },
    // Vrai tracé fourni par le client le 2026-08-29 — voir note sur anderlecht-1.
    mapsUrl: 'https://maps.app.goo.gl/CrVtteMgvbt4vJHs7',
    durationMinutes: 30,
  },
  {
    id: 'schaerbeek-1',
    centerSlug: 'schaerbeek',
    title: { fr: 'Circuit d’entraînement 1', nl: 'Trainingscircuit 1' },
    description: {
      fr: 'Itinéraire à parcourir en voiture autour du centre, avec les manœuvres typiquement testées à l’examen pratique.',
      nl: 'Route om met de auto rond het centrum te rijden, met de manoeuvres die typisch getest worden bij het praktijkexamen.',
    },
    // Vrai tracé fourni par le client le 2026-08-29 — voir note sur anderlecht-1.
    mapsUrl: 'https://maps.app.goo.gl/esT5LVveGjwS1fyp8',
    durationMinutes: 30,
    // Circuit "vitrine" affiché sur le carrousel de la home — voir note sur anderlecht-1.
    priceCents: 2499,
    distanceKm: 3.6,
    attentionPointsCount: 3,
    difficulty: 'moyen',
  },
  {
    id: 'schaerbeek-2',
    centerSlug: 'schaerbeek',
    title: { fr: 'Circuit d’entraînement 2', nl: 'Trainingscircuit 2' },
    description: {
      fr: 'Deuxième itinéraire, avec un enchaînement de carrefours différent du premier circuit.',
      nl: 'Tweede route, met een andere opeenvolging van kruispunten dan het eerste circuit.',
    },
    // Vrai tracé fourni par le client le 2026-08-29 — voir note sur anderlecht-1.
    mapsUrl: 'https://maps.app.goo.gl/ksBSgHgB7rurF5JD9',
    durationMinutes: 30,
  },
  {
    id: 'schaerbeek-3',
    centerSlug: 'schaerbeek',
    title: { fr: 'Circuit d’entraînement 3', nl: 'Trainingscircuit 3' },
    description: {
      fr: 'Troisième itinéraire, pour varier les conditions de circulation rencontrées avant le jour J.',
      nl: 'Derde route, om de verkeersomstandigheden vóór de grote dag te variëren.',
    },
    // Vrai tracé fourni par le client le 2026-08-29 — voir note sur anderlecht-1.
    mapsUrl: 'https://maps.app.goo.gl/uqHTa9QMZ9aQ7V6d9',
    durationMinutes: 30,
  },
  {
    id: 'schaerbeek-4',
    centerSlug: 'schaerbeek',
    title: { fr: 'Circuit d’entraînement 4', nl: 'Trainingscircuit 4' },
    description: {
      fr: 'Quatrième itinéraire, pour varier encore les conditions de circulation rencontrées avant le jour J.',
      nl: 'Vierde route, om de verkeersomstandigheden vóór de grote dag verder te variëren.',
    },
    // Vrai tracé fourni par le client le 2026-08-29 — voir note sur anderlecht-1.
    mapsUrl: 'https://maps.app.goo.gl/KKMXpEpMEm15gjjq8',
    durationMinutes: 30,
  },

  // --- Centres wallons ajoutés le 2026-08-21 (difficulté donnée par le
  // client ; distance/points d'attention = valeurs d'exemple en attendant
  // une méthode de calcul réelle, voir note sur anderlecht-1). ---
  {
    id: 'louvain-la-neuve-1',
    centerSlug: 'louvain-la-neuve',
    title: { fr: 'Circuit d’entraînement 1', nl: 'Trainingscircuit 1' },
    description: {
      fr: 'Itinéraire à parcourir en voiture autour du centre, avec les manœuvres typiquement testées à l’examen pratique.',
      nl: 'Route om met de auto rond het centrum te rijden, met de manoeuvres die typisch getest worden bij het praktijkexamen.',
    },
    // Vrai tracé fourni par le client le 2026-09-08 — Louvain-la-Neuve reste
    // `comingSoon: true` tant que les autres circuits n'ont pas aussi leur
    // vrai tracé (voir note sur couillet-1).
    mapsUrl: 'https://maps.app.goo.gl/6HC7qKgEAhQnHoHd7',
    durationMinutes: 30,
    priceCents: 2499,
    distanceKm: 3.8,
    attentionPointsCount: 4,
    difficulty: 'moyen',
  },
  {
    id: 'louvain-la-neuve-2',
    centerSlug: 'louvain-la-neuve',
    title: { fr: 'Circuit d’entraînement 2', nl: 'Trainingscircuit 2' },
    description: {
      fr: 'Deuxième itinéraire, avec un enchaînement de carrefours et de changements de bande différent du premier circuit.',
      nl: 'Tweede route, met een andere opeenvolging van kruispunten en rijstrookwissels dan het eerste circuit.',
    },
    // Vrai tracé fourni par le client le 2026-09-08 — voir note sur louvain-la-neuve-1.
    mapsUrl: 'https://maps.app.goo.gl/XvmS3FGYGYHuqeW69',
    durationMinutes: 30,
  },
  {
    id: 'louvain-la-neuve-3',
    centerSlug: 'louvain-la-neuve',
    title: { fr: 'Circuit d’entraînement 3', nl: 'Trainingscircuit 3' },
    description: {
      fr: 'Troisième itinéraire, pour varier les conditions de circulation rencontrées avant le jour J.',
      nl: 'Derde route, om de verkeersomstandigheden vóór de grote dag te variëren.',
    },
    // Vrai tracé fourni par le client le 2026-09-08 — voir note sur louvain-la-neuve-1.
    mapsUrl: 'https://maps.app.goo.gl/HbdaxTLzLE3646kS8',
    durationMinutes: 30,
  },
  {
    id: 'louvain-la-neuve-4',
    centerSlug: 'louvain-la-neuve',
    title: { fr: 'Circuit d’entraînement 4', nl: 'Trainingscircuit 4' },
    description: {
      fr: 'Quatrième itinéraire, pour varier encore les conditions de circulation rencontrées avant le jour J.',
      nl: 'Vierde route, om de verkeersomstandigheden vóór de grote dag verder te variëren.',
    },
    // Vrai tracé fourni par le client le 2026-09-08 — voir note sur louvain-la-neuve-1.
    mapsUrl: 'https://maps.app.goo.gl/8VcTU3aGkbcrSEvw8',
    durationMinutes: 30,
  },
  {
    id: 'couillet-1',
    centerSlug: 'couillet',
    title: { fr: 'Circuit d’entraînement 1', nl: 'Trainingscircuit 1' },
    description: {
      fr: 'Itinéraire à parcourir en voiture autour du centre — plusieurs pièges classiques signalés autour de ce centre, à surveiller particulièrement.',
      nl: 'Route om met de auto rond het centrum te rijden — verschillende klassieke valkuilen rond dit centrum, extra aandacht vereist.',
    },
    // Vrai tracé fourni par le client le 2026-09-08 — Couillet reste
    // `comingSoon: true` (voir EXAM_CENTERS ci-dessus) tant que les autres
    // circuits de ce centre n'ont pas aussi leur vrai tracé.
    mapsUrl: 'https://maps.app.goo.gl/bGhRkbWzofXcUJd68',
    durationMinutes: 30,
    priceCents: 2499,
    distanceKm: 4.6,
    attentionPointsCount: 6,
    difficulty: 'difficile',
  },
  {
    id: 'couillet-2',
    centerSlug: 'couillet',
    title: { fr: 'Circuit d’entraînement 2', nl: 'Trainingscircuit 2' },
    description: {
      fr: 'Deuxième itinéraire, avec un enchaînement de carrefours et de changements de bande différent du premier circuit.',
      nl: 'Tweede route, met een andere opeenvolging van kruispunten en rijstrookwissels dan het eerste circuit.',
    },
    // Vrai tracé fourni par le client le 2026-09-08 — voir note sur couillet-1.
    mapsUrl: 'https://maps.app.goo.gl/FTGfgVzZYNWi1re48',
    durationMinutes: 30,
  },
  {
    id: 'couillet-3',
    centerSlug: 'couillet',
    title: { fr: 'Circuit d’entraînement 3', nl: 'Trainingscircuit 3' },
    description: {
      fr: 'Troisième itinéraire, pour varier les conditions de circulation rencontrées avant le jour J.',
      nl: 'Derde route, om de verkeersomstandigheden vóór de grote dag te variëren.',
    },
    // Vrai tracé fourni par le client le 2026-09-08 — voir note sur couillet-1.
    mapsUrl: 'https://maps.app.goo.gl/oRyZtsxLRzgommvd9',
    durationMinutes: 30,
  },
  {
    id: 'couillet-4',
    centerSlug: 'couillet',
    title: { fr: 'Circuit d’entraînement 4', nl: 'Trainingscircuit 4' },
    description: {
      fr: 'Quatrième itinéraire, pour varier encore les conditions de circulation rencontrées avant le jour J.',
      nl: 'Vierde route, om de verkeersomstandigheden vóór de grote dag verder te variëren.',
    },
    // Vrai tracé fourni par le client le 2026-09-08 — voir note sur couillet-1.
    mapsUrl: 'https://maps.app.goo.gl/2VBqFyWGJcBB93iD9',
    durationMinutes: 30,
  },
  {
    id: 'mariembourg-1',
    centerSlug: 'mariembourg',
    title: { fr: 'Circuit d’entraînement 1', nl: 'Trainingscircuit 1' },
    description: {
      fr: 'Itinéraire à parcourir en voiture autour du centre, avec les manœuvres typiquement testées à l’examen pratique.',
      nl: 'Route om met de auto rond het centrum te rijden, met de manoeuvres die typisch getest worden bij het praktijkexamen.',
    },
    durationMinutes: 30,
    priceCents: 2499,
    distanceKm: 3.5,
    attentionPointsCount: 4,
    difficulty: 'moyen',
  },
  {
    id: 'braine-le-comte-1',
    centerSlug: 'braine-le-comte',
    title: { fr: 'Circuit d’entraînement 1', nl: 'Trainingscircuit 1' },
    description: {
      fr: 'Itinéraire à parcourir en voiture autour du centre, avec les manœuvres typiquement testées à l’examen pratique.',
      nl: 'Route om met de auto rond het centrum te rijden, met de manoeuvres die typisch getest worden bij het praktijkexamen.',
    },
    durationMinutes: 30,
    priceCents: 2499,
    distanceKm: 3.7,
    attentionPointsCount: 4,
    difficulty: 'moyen',
  },
  {
    id: 'cuesmes-1',
    centerSlug: 'cuesmes',
    title: { fr: 'Circuit d’entraînement 1', nl: 'Trainingscircuit 1' },
    description: {
      fr: 'Itinéraire à parcourir en voiture autour du centre, avec les manœuvres typiquement testées à l’examen pratique.',
      nl: 'Route om met de auto rond het centrum te rijden, met de manoeuvres die typisch getest worden bij het praktijkexamen.',
    },
    durationMinutes: 30,
    priceCents: 2499,
    distanceKm: 2.8,
    attentionPointsCount: 2,
    difficulty: 'facile',
  },
  {
    id: 'lobbes-1',
    centerSlug: 'lobbes',
    title: { fr: 'Circuit d’entraînement 1', nl: 'Trainingscircuit 1' },
    description: {
      fr: 'Itinéraire à parcourir en voiture autour du centre, avec les manœuvres typiquement testées à l’examen pratique.',
      nl: 'Route om met de auto rond het centrum te rijden, met de manoeuvres die typisch getest worden bij het praktijkexamen.',
    },
    durationMinutes: 30,
    priceCents: 2499,
    distanceKm: 2.6,
    attentionPointsCount: 2,
    difficulty: 'facile',
  },
]

export function getCenters(): ExamCenter[] {
  return EXAM_CENTERS
}

export function getCenter(slug: string): ExamCenter | undefined {
  return EXAM_CENTERS.find((c) => c.slug === slug)
}

export function getCircuitsByCenter(centerSlug: string): PracticeCircuit[] {
  return PRACTICE_CIRCUITS.filter((c) => c.centerSlug === centerSlug)
}

/** Le circuit mis en avant sur la carte du carrousel home (premier circuit du centre). */
export function getFeaturedCircuit(centerSlug: string): PracticeCircuit | undefined {
  return getCircuitsByCenter(centerSlug)[0]
}

/** Retrouve un circuit par son id (ex. depuis le metadata circuitId d'une session Stripe). */
export function getCircuitById(id: string): PracticeCircuit | undefined {
  return PRACTICE_CIRCUITS.find((c) => c.id === id)
}
