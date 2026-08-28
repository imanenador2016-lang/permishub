import type { SourceReference, VerifiedFact } from '@/domain/source'
import type { Region } from '@/domain/region'

/** Faits extraits des PDF 4, 5, 12, 13, 14, 15, 16, 21 — voir docs/CONTENT_PIPELINE.md. */
function refFrom(sourceId: string, page: number, region: Region = 'BE'): SourceReference {
  return {
    sourceId,
    page,
    region,
    language: 'fr',
    verifiedAt: '2026-08-18',
    verifiedBy: 'Claude (lecture directe du PDF) — relecture humaine à faire',
  }
}

export const CIRCULATION_VITESSE_FACTS: VerifiedFact[] = [
  // --- 4-l'autoroute.pdf ---
  {
    id: 'cv4-def-acces',
    themeSlug: 'circulation-vitesse',
    statement: "Une autoroute commence et finit à ses signaux dédiés ; ni feux ni carrefours à priorité n'y existent. Elle est interdite aux cyclomoteurs, véhicules agricoles, quadricycles sans habitacle et trains de véhicules forains.",
    reference: refFrom('04-autoroute', 1),
  },
  {
    id: 'cv4-vitesse-min-max',
    themeSlug: 'circulation-vitesse',
    statement: "Vitesse maximale sur autoroute : 120 km/h, si les conditions le permettent. Vitesse minimale : 70 km/h quand les conditions le permettent — les véhicules incapables d'atteindre 70 km/h en palier (cyclomoteurs, tracteurs...) ne peuvent pas y circuler.",
    reference: refFrom('04-autoroute', 2),
  },
  {
    id: 'cv4-bande-arret-urgence',
    themeSlug: 'circulation-vitesse',
    statement: "La bande d'arrêt d'urgence est interdite à la circulation, à l'arrêt et au stationnement, sauf panne ou accident. En cas d'arrêt là, le triangle de danger se place à 100 m et le gilet de sécurité doit être enfilé avant de sortir du véhicule.",
    reference: refFrom('04-autoroute', 3),
  },
  {
    id: 'cv4-depasser-droite-interdit',
    themeSlug: 'circulation-vitesse',
    statement: "Sur autoroute, on dépasse uniquement par la gauche et on roule le plus à droite possible. Rester inutilement sur une voie de gauche pousse les autres à dépasser par la droite (interdit) — celui qui bloque commet, lui aussi, une infraction.",
    reference: refFrom('04-autoroute', 6),
  },
  {
    id: 'cv4-interdits',
    themeSlug: 'circulation-vitesse',
    statement: "Sur autoroute, il est interdit de : s'arrêter/stationner sur la chaussée, la bande d'arrêt d'urgence, les accès ou sorties ; circuler sur la berme centrale ; faire marche arrière ou demi-tour ; rouler en sens contraire ; utiliser une attache de fortune pour tracter un véhicule.",
    reference: refFrom('04-autoroute', 8),
  },

  // --- 5-route-pour-automobiles.pdf ---
  {
    id: 'cv5-def',
    themeSlug: 'circulation-vitesse',
    statement: "Contrairement à l'autoroute, une route pour automobiles peut comporter des carrefours et des feux de signalisation. Les mêmes véhicules qu'à l'autoroute (cyclomoteurs, véhicules agricoles, quadricycles sans habitacle, trains forains) en sont exclus.",
    reference: refFrom('05-route-pour-automobiles', 1),
  },
  {
    id: 'cv5-vitesse-berme',
    themeSlug: 'circulation-vitesse',
    statement: "Hors agglomération, sur une route pour automobiles à deux sens séparés par une berme centrale (2 bandes ou plus par sens), la vitesse maximale est de 120 km/h.",
    reference: refFrom('05-route-pour-automobiles', 2),
  },
  {
    id: 'cv5-vitesse-marquage-wallonie',
    themeSlug: 'circulation-vitesse',
    statement: "Hors agglomération, sur une route pour automobiles dont les sens sont séparés uniquement par un marquage (pas de berme), la vitesse maximale est de 90 km/h en Région wallonne.",
    reference: refFrom('05-route-pour-automobiles', 2, 'WALLONIE'),
  },
  {
    id: 'cv5-vitesse-marquage-flandre-bxl',
    themeSlug: 'circulation-vitesse',
    statement: "Dans les mêmes conditions (marquage, pas de berme, hors agglomération), la vitesse maximale est de 70 km/h en Région flamande et à Bruxelles-Capitale.",
    reference: refFrom('05-route-pour-automobiles', 2, 'FLANDRE'),
  },
  {
    id: 'cv5-pas-vitesse-min',
    themeSlug: 'circulation-vitesse',
    statement: "Il n'y a pas de vitesse minimale légale sur une route pour automobiles, mais rouler trop lentement sans raison, en gênant les autres, reste une infraction.",
    reference: refFrom('05-route-pour-automobiles', 2),
  },

  // --- 12-la-vitesse-maximale.pdf (synthèse) ---
  {
    id: 'cv12-trop-lentement-courses',
    themeSlug: 'circulation-vitesse',
    statement: "Conduire trop lentement sans raison, ou freiner brusquement sans nécessité, est aussi une infraction. Les courses ou compétitions de vitesse sur la voie publique sont interdites sauf autorisation spéciale (infraction du 4e degré).",
    reference: refFrom('12-vitesse-maximale', 3),
  },
  {
    id: 'cv12-retrait-immediat',
    themeSlug: 'circulation-vitesse',
    statement: "Un dépassement de plus de 30 km/h sur autoroute/route ordinaire, ou de plus de 20 km/h en agglomération/zone 30/zone résidentielle, expose à un retrait immédiat du permis (décision du Procureur du Roi ou d'un officier de police judiciaire, exécutée par la police).",
    reference: refFrom('12-vitesse-maximale', 4),
  },
  {
    id: 'cv12-decheance-juge',
    themeSlug: 'circulation-vitesse',
    statement: "Un dépassement de plus de 40 km/h sur autoroute/route ordinaire, ou de plus de 30 km/h en agglomération/zone 30/zone résidentielle, expose à une déchéance du droit de conduire (8 jours à 5 ans), prononcée par un juge — pas par la police.",
    reference: refFrom('12-vitesse-maximale', 5),
  },

  // --- 13-la-distance-d'arrêt.pdf ---
  {
    id: 'cv13-distance-securite',
    themeSlug: 'circulation-vitesse',
    statement: "Sur sol sec, la distance de sécurité approximative (en mètres) correspond à la vitesse divisée par deux — vérifiable avec la règle des deux secondes. Sur sol mouillé, il faut ajouter 50 % (environ trois secondes) ; sur neige ou verglas, au moins quatre secondes.",
    reference: refFrom('13-distance-arret', 1),
  },
  {
    id: 'cv13-distance-reaction',
    themeSlug: 'circulation-vitesse',
    statement: "Le temps de réaction (voir le danger → freiner) est d'environ une seconde à jeun, mais grimpe à 2-3 secondes sous alcool et 5-8 secondes sous stupéfiants. La distance parcourue pendant ce temps croît avec la vitesse : environ 14 m à 50 km/h, 25 m à 90 km/h, 33 m à 120 km/h.",
    reference: refFrom('13-distance-arret', 2),
  },
  {
    id: 'cv13-distance-arret-totale',
    themeSlug: 'circulation-vitesse',
    statement: "La distance d'arrêt totale = distance de réaction + distance de freinage. Elle augmente avec la vitesse, et est toujours plus longue sur chaussée mouillée que sur chaussée sèche.",
    reference: refFrom('13-distance-arret', 4),
  },
  {
    id: 'cv13-abs-pneus',
    themeSlug: 'circulation-vitesse',
    statement: "L'ABS n'assure pas forcément une distance de freinage plus courte : il empêche surtout le blocage des roues et garde la voiture dirigeable. La profondeur légale minimale des rainures est de 1,6 mm, mais le risque d'aquaplaning augmente déjà sous les 2 mm.",
    reference: refFrom('13-distance-arret', 5),
  },

  // --- 14-le-croisement.pdf ---
  {
    id: 'cv14-croisement-droite',
    themeSlug: 'circulation-vitesse',
    statement: "Lors d'un croisement (deux véhicules en sens opposé), chacun serre à droite. Il est interdit d'utiliser, pour croiser, l'espace au-delà du bord fictif de la chaussée (réservé à l'arrêt/au stationnement) ou une piste cyclable.",
    reference: refFrom('14-croisement', 75),
  },
  {
    id: 'cv14-distance-croisement',
    themeSlug: 'circulation-vitesse',
    statement: "Le Code exige une distance latérale « suffisante » lors d'un croisement — précisée à 1 m en agglomération et 1,5 m hors agglomération face à un cycliste. Si la chaussée est trop étroite, l'accotement de plain-pied peut être utilisé sans mettre en danger ceux qui s'y trouvent.",
    reference: refFrom('14-croisement', 76),
  },
  {
    id: 'cv14-croiser-tram',
    themeSlug: 'circulation-vitesse',
    statement: "Un tram se croise par la droite en principe, mais par la gauche si le passage à droite est trop étroit, obstrué par un véhicule stationné ou un obstacle — à condition qu'aucun véhicule n'arrive en sens inverse.",
    reference: refFrom('14-croisement', 76),
  },
  {
    id: 'cv14-retrecissement',
    themeSlug: 'circulation-vitesse',
    statement: "Sur un rétrécissement de chaussée sans signaux, celui qui a l'obstacle de son côté cède le passage. Avec signaux, la forme du panneau fait foi : rond rouge et blanc = céder le passage, rectangulaire à flèches = priorité.",
    reference: refFrom('14-croisement', 77),
  },

  // --- 15-dépasser-par-la-gauche.pdf ---
  {
    id: 'cv15-def-depassement',
    themeSlug: 'circulation-vitesse',
    statement: "Un dépassement, au sens légal, ne concerne qu'un véhicule en mouvement. Doubler un véhicule à l'arrêt ou en stationnement, c'est le « contourner » — une notion juridiquement différente.",
    reference: refFrom('15-depasser-par-la-gauche', 1),
  },
  {
    id: 'cv15-avant-depasser',
    themeSlug: 'circulation-vitesse',
    statement: "Avant de dépasser, il faut vérifier dans l'ordre : la vitesse du véhicule devant, la possibilité de le dépasser sans excéder la vitesse autorisée, l'absence de véhicule en sens inverse, l'absence d'un véhicule déjà en train de te dépasser, la place pour se rabattre à droite, et l'absence d'interdiction.",
    reference: refFrom('15-depasser-par-la-gauche', 2),
  },
  {
    id: 'cv15-distance-depassement',
    themeSlug: 'circulation-vitesse',
    statement: "Distance latérale minimale lors d'un dépassement d'un piéton, cycliste ou cyclomotoriste : 1,5 m hors agglomération (chaussée ou piste cyclable), 1 m en agglomération.",
    reference: refFrom('15-depasser-par-la-gauche', 3),
  },
  {
    id: 'cv15-2-cas-droite',
    themeSlug: 'circulation-vitesse',
    statement: "Le dépassement par la droite n'est autorisé que dans deux cas : un véhicule qui a activé son clignotant gauche et s'est déjà déporté pour tourner à gauche, ou un tram (à dépasser systématiquement par la droite, sauf passage trop étroit).",
    reference: refFrom('15-depasser-par-la-gauche', 4),
  },
  {
    id: 'cv15-pas-depassement-legal',
    themeSlug: 'circulation-vitesse',
    statement: "Une file qui avance plus vite qu'une autre en embouteillage n'est pas un dépassement au sens légal. Le choix de bande est permis quand la densité le justifie (4+ bandes à deux sens, sens unique, certains signaux lumineux), ou en agglomération.",
    reference: refFrom('15-depasser-par-la-gauche', 6),
  },

  // --- 16-où-le-dépassement-est-interdit.pdf ---
  {
    id: 'cv16-signaux-interdiction',
    themeSlug: 'circulation-vitesse',
    statement: "Un signal d'interdiction de dépasser reste valable jusqu'au carrefour suivant, ou jusqu'à son signal de fin — sauf panneau additionnel indiquant que l'interdiction ne commence que plus loin (ex. « 200 m »).",
    reference: refFrom('16-depassement-interdit', 3),
  },
  {
    id: 'cv16-lieux-interdits',
    themeSlug: 'circulation-vitesse',
    statement: "Le dépassement (d'un véhicule attelé, à plus de deux roues, ou à moteur à deux roues) est interdit : sur un passage à niveau sans barrières ni feu blanc clignotant, à un carrefour à priorité de droite ou où l'on doit céder le passage, au sommet d'une côte ou dans un virage sans visibilité suffisante, et devant un véhicule qui approche ou s'arrête à un passage pour piétons/cyclistes.",
    reference: refFrom('16-depassement-interdit', 5),
  },
  {
    id: 'cv16-tripler',
    themeSlug: 'circulation-vitesse',
    statement: "« Tripler » (dépasser un véhicule qui en dépasse déjà un autre) est interdit sur une chaussée à double sens, sauf si le véhicule dépassé double lui-même un cyclomoteur ou une moto, ou si la chaussée compte trois bandes ou plus dans le sens suivi.",
    reference: refFrom('16-depassement-interdit', 7),
  },

  // --- 21-tourner-à-droite-ou-à-gauche.pdf (manœuvres) ---
  {
    id: 'cv21-priorite-tourner',
    themeSlug: 'circulation-vitesse',
    statement: "En tournant à gauche, on cède toujours le passage aux véhicules venant en sens inverse — ne pas le faire est une infraction grave. Quand l'un tourne à droite et l'autre à gauche, celui qui tourne à droite est prioritaire.",
    reference: refFrom('21-tourner-a-droite-ou-a-gauche', 1),
  },
  {
    id: 'cv21-ceder-pietons-virage',
    themeSlug: 'circulation-vitesse',
    statement: "Un conducteur qui change de direction doit céder le passage aux piétons et cyclistes qui traversent la chaussée sur laquelle il s'engage, même sans passage prévu à cet endroit.",
    reference: refFrom('21-tourner-a-droite-ou-a-gauche', 2),
  },
  {
    id: 'cv21-position-virage',
    themeSlug: 'circulation-vitesse',
    statement: "Sur une chaussée à double sens, pour tourner à gauche, il faut se placer près de l'axe médian ; pour tourner à droite, le plus à droite possible — sans jamais se présélectionner à l'extrême droite ou sur la bande réservée au sens inverse.",
    reference: refFrom('21-tourner-a-droite-ou-a-gauche', 2),
  },
  {
    id: 'cv21-manoeuvre-def',
    themeSlug: 'circulation-vitesse',
    statement: "Une manœuvre est une action non spécifiquement réglée par le Code (changer de bande, faire demi-tour, reculer, traverser hors carrefour, entrer/sortir d'un stationnement ou d'un terrain adjacent) : elle exige de céder le passage à tous les usagers, sans exception.",
    reference: refFrom('21-tourner-a-droite-ou-a-gauche', 4),
  },
  {
    id: 'cv21-insertion-bande',
    themeSlug: 'circulation-vitesse',
    statement: "Quand une bande de circulation se termine (signalée par un panneau), il faut céder le passage pour s'insérer sur la bande adjacente. En cas de simple rétrécissement non signalé comme fin de bande, celui qui reste à droite garde la priorité.",
    reference: refFrom('21-tourner-a-droite-ou-a-gauche', 6),
  },
]
