import type { SourceReference, VerifiedFact } from '@/domain/source'
import type { Region } from '@/domain/region'

/**
 * Faits extraits de 1-la-voie-publique.pdf ("Leçon 1 - 2026",
 * permisdeconduire-online.be). Première passe par lecture directe du PDF —
 * chaque fait cite sa page exacte. À faire relire par un humain avant
 * publication définitive (docs/CONTENT_PIPELINE.md, étape 6) : `verifiedBy`
 * le précise explicitement plutôt que de prétendre à une vérification
 * humaine qui n'a pas encore eu lieu.
 */
function ref(page: number, region: Region = 'BE'): SourceReference {
  return refFrom('01-voie-publique', page, region)
}

/** Comme `ref`, mais pour un autre document source du même thème (plusieurs PDF nourrissent "voie-publique"). */
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

export const VOIE_PUBLIQUE_FACTS: VerifiedFact[] = [
  {
    id: 'vp-voie-publique-def',
    themeSlug: 'voie-publique',
    statement:
      "Une voie publique (route, pont, tunnel, sentier, chemin de terre, place, autoroute) est un lieu où l'on peut se rendre à pied ou en véhicule sans aucune justification.",
    reference: ref(1),
  },
  {
    id: 'vp-terrain-public-def',
    themeSlug: 'voie-publique',
    statement:
      "Un terrain public (parking de restaurant, station-service) est accessible en véhicule à condition d'avoir une bonne raison de s'y rendre.",
    reference: ref(1),
  },
  {
    id: 'vp-terrain-non-public-def',
    themeSlug: 'voie-publique',
    statement:
      "Un terrain non-public (terrain de manœuvres d'une auto-école, parking industriel) n'est accessible en véhicule qu'avec une bonne raison ET la permission de s'y rendre.",
    reference: ref(1),
  },
  {
    id: 'vp-code-application',
    themeSlug: 'voie-publique',
    statement:
      "Le Code de la route ne s'applique pleinement que sur la voie publique (infractions verbalisées, responsabilité civile en cas d'accident). Sur un terrain public ou non-public, les infractions graves restent sanctionnables (amende, poursuite).",
    reference: ref(2),
  },
  {
    id: 'vp-voie-privee',
    themeSlug: 'voie-publique',
    statement:
      "Une route signalée « privée » ne fait pas partie de la voie publique : le Code de la route ne s'y applique pas, sauf s'il s'agit d'un chemin privé accessible à tous.",
    reference: ref(2),
  },
  {
    id: 'vp-tram',
    themeSlug: 'voie-publique',
    statement:
      "Les conducteurs de tram ne doivent pas respecter l'ensemble du Code de la route, à l'exception des injonctions des agents qualifiés et des feux de circulation, qu'ils doivent toujours suivre.",
    reference: ref(2),
  },
  {
    id: 'vp-parties-voie-publique',
    themeSlug: 'voie-publique',
    statement:
      "La voie publique ne se limite pas à la chaussée revêtue : elle inclut aussi la piste cyclable, les accotements, la bande de stationnement et les trottoirs, jusqu'au fossé, au talus ou à la limite d'une propriété privée.",
    reference: ref(3),
  },
  {
    id: 'vp-chaussee-def',
    themeSlug: 'voie-publique',
    statement:
      "La chaussée est la partie de la voie publique aménagée pour la circulation des véhicules (voitures, motos, autobus, camions, tracteurs). Pistes cyclables, accotements et trottoirs n'en font pas partie. Les cyclistes/cyclomoteurs à deux roues peuvent l'utiliser en l'absence de piste cyclable ; les piétons peuvent y marcher, avec prudence, en l'absence de trottoir et d'accotement.",
    reference: ref(3),
  },
  {
    id: 'vp-chaussees-separees',
    themeSlug: 'voie-publique',
    statement:
      "Quand une voie publique comporte deux ou trois chaussées nettement séparées (ex. autoroute), il est interdit d'emprunter la chaussée de gauche par rapport à son sens de marche, sauf réglementation locale contraire.",
    reference: ref(3),
  },
  {
    id: 'vp-ligne-bord-chaussee',
    themeSlug: 'voie-publique',
    statement:
      "La ligne blanche parfois tracée sur le bord de la chaussée indique uniquement son bord fictif ; elle n'a aucune autre signification.",
    reference: ref(4),
  },
  {
    id: 'vp-circulation-droite',
    themeSlug: 'voie-publique',
    statement:
      "Les conducteurs doivent rouler autant que possible sur le côté droit de la chaussée ; rouler sans raison au milieu ou à gauche constitue une infraction.",
    reference: ref(4),
  },
  {
    id: 'vp-vitesse-wallonie',
    themeSlug: 'voie-publique',
    statement:
      'Vitesse maximale sur route ordinaire en Région wallonne : 90 km/h (sauf sur une chaussée à voie centrale, où elle est limitée à 70 km/h).',
    reference: ref(4, 'WALLONIE'),
  },
  {
    id: 'vp-vitesse-flandre',
    themeSlug: 'voie-publique',
    statement: 'Vitesse maximale sur route ordinaire en Région flamande : 70 km/h.',
    reference: ref(4, 'FLANDRE'),
  },
  {
    id: 'vp-vitesse-bruxelles',
    themeSlug: 'voie-publique',
    statement: 'Vitesse maximale sur route ordinaire en Région de Bruxelles-Capitale : 70 km/h.',
    reference: ref(4, 'BRUXELLES'),
  },
  {
    id: 'vp-voie-centrale-def',
    themeSlug: 'voie-publique',
    statement:
      "Une chaussée à voie centrale est une chaussée centrale destinée à la circulation motorisée, reconnaissable à deux bandes blanches discontinues parallèles (paires de lignes courtes) de chaque côté de la voie.",
    reference: ref(5),
  },
  {
    id: 'vp-voie-centrale-vitesse',
    themeSlug: 'voie-publique',
    statement: 'Sur une chaussée à voie centrale, la vitesse maximale est de 70 km/h, uniformément en Flandre, à Bruxelles et en Wallonie.',
    reference: ref(5),
  },
  {
    id: 'vp-bande-laterale-def',
    themeSlug: 'voie-publique',
    statement:
      "La bande latérale (à côté d'une voie centrale) ne fait pas partie de la chaussée. Un véhicule ne peut y circuler que pour croiser un véhicule venant en sens inverse ou dépasser un conducteur circulant dans le même sens, sans jamais gêner ni mettre en danger les cyclistes ou piétons qui s'y trouvent.",
    reference: ref(5),
  },
  {
    id: 'vp-distance-laterale',
    themeSlug: 'voie-publique',
    statement: 'Distance latérale minimale à conserver avec les cyclistes/piétons sur une bande latérale : 1 mètre en agglomération, 1,5 mètre hors agglomération.',
    reference: ref(6),
  },
  {
    id: 'vp-bande-laterale-usagers',
    themeSlug: 'voie-publique',
    statement:
      "Sont autorisés à circuler sur une bande latérale : cyclistes, speed pedelecs et cyclomoteurs à deux roues classe A, conducteurs d'animaux de trait non attelés ou de bétail, et piétons en l'absence de trottoir.",
    reference: ref(6),
  },
  {
    id: 'vp-animaux-chaussee',
    themeSlug: 'voie-publique',
    statement:
      "Tout conducteur doit ralentir immédiatement en approchant d'animaux de trait, de charge, de selle ou de bétail sur la voie publique. Si un cheval prend peur et se cabre, le conducteur doit arrêter son véhicule et éviter tout mouvement brusque, pour laisser le cavalier reprendre le contrôle.",
    reference: ref(6),
  },

  // --- 2-les-bandes-de-circulation.pdf ---
  {
    id: 'vp2-bandes-def',
    themeSlug: 'voie-publique',
    statement: "Une chaussée peut être subdivisée en bandes de circulation par un marquage (lignes blanches continues ou discontinues). En conditions normales, il faut rouler sur la bande de droite ; rouler à gauche sans raison est une infraction. Près des carrefours, des flèches peintes indiquent la direction à suivre : on choisit sa bande avant le carrefour, mais dans le carrefour on suit la flèche.",
    reference: refFrom('02-bandes-de-circulation', 7),
  },
  {
    id: 'vp2-lignes-depassement',
    themeSlug: 'voie-publique',
    statement: "Une ligne discontinue peut être franchie pour dépasser par la gauche, jamais pour une autre raison. Une ligne continue ne peut jamais être franchie pour dépasser, ni pour rien d'autre. Si une continue et une discontinue sont peintes côte à côte, on suit celle de son propre côté de la chaussée.",
    reference: refFrom('02-bandes-de-circulation', 8),
  },
  {
    id: 'vp2-tirette',
    themeSlug: 'voie-publique',
    statement: "Le principe de la tirette est obligatoire en cas de circulation fortement ralentie à un rétrécissement de bandes : les conducteurs sur la bande qui se termine s'intercalent uniquement juste devant le rétrécissement, et ceux sur la bande libre cèdent le passage à tour de rôle. Ce n'est pas une manœuvre au sens légal.",
    reference: refFrom('02-bandes-de-circulation', 10),
  },
  {
    id: 'vp2-bande-bus',
    themeSlug: 'voie-publique',
    statement: "La bande de bus (lignes blanches discontinues larges + signal F17) ne fait pas partie de la chaussée : interdit d'y circuler, s'y arrêter ou y stationner en voiture, sauf à proximité immédiate d'un carrefour pour changer de direction, pour la traverser, ou pour contourner un obstacle.",
    reference: refFrom('02-bandes-de-circulation', 10),
  },
  {
    id: 'vp2-zone-evitement-travaux',
    themeSlug: 'voie-publique',
    statement: "Une zone d'évitement (larges lignes diagonales peintes au sol) est interdite à la circulation, à l'arrêt et au stationnement. Lors de travaux, des lignes provisoires orange remplacent les lignes blanches et priment sur elles.",
    reference: refFrom('02-bandes-de-circulation', 11),
  },

  // --- 3-les-cyclistes.pdf (piste cyclable, zone cyclable) ---
  {
    id: 'vp3-piste-cyclable-def',
    themeSlug: 'voie-publique',
    statement: "Une piste cyclable est une partie de la voie publique (pas de la chaussée) réservée aux bicyclettes et cyclomoteurs classe A, signalée par un panneau (D7, D9) ou par deux lignes discontinues parallèles trop étroites pour des véhicules automobiles. Une voiture ne peut ni y circuler ni s'y arrêter/stationner — seulement la traverser.",
    reference: refFrom('03-cyclistes', 1),
  },
  {
    id: 'vp3-cyclistes-trottoir',
    themeSlug: 'voie-publique',
    statement: "S'il y a une piste cyclable, le cycliste doit l'emprunter (sauf si impraticable). En agglomération, rouler à vélo sur le trottoir est interdit, sauf pour les enfants de moins de 10 ans (moins de 12 ans à partir du 1er juin 2027). Hors agglomération, tous les cyclistes peuvent utiliser le trottoir ou l'accotement en saillie s'il n'y a pas de piste cyclable, en roulant à droite.",
    reference: refFrom('03-cyclistes', 2),
  },
  {
    id: 'vp3-assimiles-cyclistes',
    themeSlug: 'voie-publique',
    statement: "Un engin de déplacement non motorisé (rollers, trottinette, skateboard...) plus rapide que l'allure du pas est assimilé à un cycliste. Un engin de déplacement motorisé (max 25 km/h : trottinette électrique, fauteuil roulant électrique, gyropode...) l'est également.",
    reference: refFrom('03-cyclistes', 3),
  },
  {
    id: 'vp3-passage-cyclistes',
    themeSlug: 'voie-publique',
    statement: "Sur un passage pour cyclistes, ceux qui veulent l'emprunter cèdent d'abord le passage aux véhicules sur la chaussée, mais ont priorité une fois engagés. Interdit de s'y arrêter/stationner ou à moins de 5 m avant, et interdit de dépasser un véhicule qui ralentit ou s'arrête devant.",
    reference: refFrom('03-cyclistes', 4),
  },
  {
    id: 'vp3-bande-suggeree-fin-piste',
    themeSlug: 'voie-publique',
    statement: "Une bande cyclable suggérée (peinture colorée, sans lignes discontinues ni signal) fait partie de la chaussée : une voiture peut y circuler, s'y arrêter et y stationner. À l'inverse, quand un cycliste reprend la chaussée en fin de piste cyclable, il a la priorité et les conducteurs doivent lui céder le passage.",
    reference: refFrom('03-cyclistes', 5),
  },
  {
    id: 'vp3-groupe-cyclistes',
    themeSlug: 'voie-publique',
    statement: "Un groupe de cyclotouristes de 15 à 150 participants n'est pas tenu d'emprunter les pistes cyclables et peut rouler à deux de front sur la bande de droite, encadré par un ou des véhicules d'escorte (et, au-delà de 50 participants, deux capitaines de route).",
    reference: refFrom('03-cyclistes', 7),
  },
  {
    id: 'vp3-zone-cyclable',
    themeSlug: 'voie-publique',
    statement: "Dans une zone cyclable, les cyclistes sont les usagers prioritaires mais les véhicules motorisés y sont admis comme « invités » ; la vitesse maximale est de 30 km/h et il est interdit d'y dépasser un cycliste ou un engin assimilé.",
    reference: refFrom('03-cyclistes', 8),
  },

  // --- 6-lieux-particuliers.pdf ---
  {
    id: 'vp6-agglo-vitesse',
    themeSlug: 'voie-publique',
    statement: "Une agglomération est délimitée par un signal de début/fin (le panneau jaune à bord rouge n'est qu'une limite communale, sans effet sur le Code). La vitesse maximale y est de 50 km/h.",
    reference: refFrom('06-lieux-particuliers', 1),
  },
  {
    id: 'vp6-agglo-vitesse-bruxelles',
    themeSlug: 'voie-publique',
    statement: "En Région de Bruxelles-Capitale, la vitesse maximale en agglomération est de 30 km/h (contre 50 km/h en Wallonie et en Flandre).",
    reference: refFrom('06-lieux-particuliers', 1, 'BRUXELLES'),
  },
  {
    id: 'vp6-zone-residentielle',
    themeSlug: 'voie-publique',
    statement: "Dans une zone résidentielle, les piétons (pas les cyclistes) peuvent utiliser toute la largeur de la voirie et les enfants peuvent y jouer ; la vitesse maximale est de 20 km/h et on ne peut stationner qu'aux emplacements prévus.",
    reference: refFrom('06-lieux-particuliers', 3),
  },
  {
    id: 'vp6-rue-jeu-zone',
    themeSlug: 'voie-publique',
    statement: "Une rue réservée au jeu est fermée à la circulation générale (accès limité aux riverains, véhicules prioritaires et autorisés, et cyclistes), à l'allure du pas. Une zone (générale) reste en vigueur jour et nuit dès son signal de début ; un panneau électronique de zone n'est actif que lorsqu'il est illuminé.",
    reference: refFrom('06-lieux-particuliers', 4),
  },
  {
    id: 'vp6-abords-ecole-scolaire',
    themeSlug: 'voie-publique',
    statement: "Les « abords d'école » exigent la présence des deux signaux (« présence possible d'enfants » + « zone 30 »). Une rue scolaire est réservée aux piétons/cyclistes/speed pedelecs à certaines heures ; les conducteurs autorisés y roulent à l'allure du pas et cèdent le passage.",
    reference: refFrom('06-lieux-particuliers', 5),
  },
  {
    id: 'vp6-chemin-reserve-ssf',
    themeSlug: 'voie-publique',
    statement: "Un chemin réservé n'est accessible qu'aux usagers indiqués sur son panneau (vitesse max 30 km/h). Le site spécial franchissable (SSF, pour trams/bus) ne fait pas partie de la chaussée : interdit d'y circuler, stationner ou s'arrêter, sauf pour un obstacle, un carrefour, un accès de propriété/parking, ou le covoiturage (2-3 personnes).",
    reference: refFrom('06-lieux-particuliers', 6),
  },

  // --- 7-les-piétons.pdf ---
  {
    id: 'vp7-usagers-pietons-def',
    themeSlug: 'voie-publique',
    statement: "Les usagers de la route sont les piétons et les conducteurs (de véhicules ou d'animaux) — un animal ou un objet seul n'est pas un usager. Un piéton marche sur le trottoir/sentier/accotement, sinon la piste cyclable de préférence, sinon la chaussée. Pousser un vélo ou un cyclomoteur = piéton ; pousser une moto ou une voiture = conducteur.",
    reference: refFrom('07-pietons', 1),
  },
  {
    id: 'vp7-passage-pietons-priorite',
    themeSlug: 'voie-publique',
    statement: "S'il y a un passage pour piétons à moins de 20 m, les piétons doivent l'emprunter. Ceux qui s'y trouvent ou ont l'intention de l'emprunter ont toujours la priorité ; il est interdit de dépasser un véhicule qui ralentit ou s'arrête devant un tel passage.",
    reference: refFrom('07-pietons', 2),
  },
  {
    id: 'vp7-arret-passage-pietons',
    themeSlug: 'voie-publique',
    statement: "Interdit de s'arrêter ou stationner sur un passage pour piétons, ou sur la chaussée à moins de 5 m avant celui-ci ; c'est autorisé au-delà. Sans passage pour piétons, celui qui traverse doit céder le passage et traverser perpendiculairement sans s'attarder — le conducteur redouble toujours de prudence face aux enfants, personnes âgées ou handicapées.",
    reference: refFrom('07-pietons', 3),
  },
  {
    id: 'vp7-transport-scolaire',
    themeSlug: 'voie-publique',
    statement: "Un véhicule de transport scolaire porte un panneau jaune à l'avant et à l'arrière. Quand il allume ses indicateurs de direction (enfants qui montent/descendent), les conducteurs qui approchent doivent réduire fortement leur vitesse et s'arrêter si nécessaire.",
    reference: refFrom('07-pietons', 5),
  },

  // --- 8-les-conducteurs-de-véhicules.pdf ---
  {
    id: 'vp8-conducteur-def',
    themeSlug: 'voie-publique',
    statement: "Un conducteur est une personne qui conduit un véhicule (avec ou sans moteur), ou qui mène/surveille des animaux de trait, de charge ou une monture sur la voie publique. « Usagers » désigne piétons + conducteurs ensemble ; « conducteurs » seul exclut les piétons — une distinction clé pour lire correctement les règles de priorité.",
    reference: refFrom('08-conducteurs-de-vehicules', 1),
  },
  {
    id: 'vp8-permis-b-vehicules',
    themeSlug: 'voie-publique',
    statement: "Avec un permis B (provisoire ou définitif), on peut conduire les véhicules dont la masse maximale autorisée n'excède pas 3,5 tonnes : voiture, voiture mixte, minibus, camionnette.",
    reference: refFrom('08-conducteurs-de-vehicules', 4),
  },

  // --- 17-injonctions de personnes qualifiées.pdf ---
  {
    id: 'vp17-bras-agent',
    themeSlug: 'voie-publique',
    statement: "Un agent qualifié qui lève un bras verticalement ordonne l'arrêt à tous les usagers (ceux déjà engagés dans le carrefour l'évacuent). Un ou deux bras tendus horizontalement : arrêt pour ceux venant du ventre/dos de l'agent, passage libre pour ceux venant de son côté.",
    reference: refFrom('17-personnes-qualifiees', 1),
  },
  {
    id: 'vp17-torche-sifflet',
    themeSlug: 'voie-publique',
    statement: "Une torche rouge balancée transversalement signifie arrêt ; un mouvement vertical du bras signifie ralentir, un mouvement rotatif signifie accélérer. Le sifflet n'est pas une injonction en soi, il ne fait qu'attirer l'attention avant qu'une injonction ne soit donnée — verbalement aussi, le cas échéant.",
    reference: refFrom('17-personnes-qualifiees', 2),
  },
  {
    id: 'vp17-personnes-autorisees',
    themeSlug: 'voie-publique',
    statement: "Surveillants habilités, capitaines de route, signaleurs ou chefs de groupe peuvent donner des indications à respecter, mais ne sont pas des agents qualifiés (pas d'injonction, pas de procès-verbal). Dans un carrefour sans feux, une personne autorisée identifiable (brassard au drapeau belge) et brandissant un signal C3 peut arrêter la circulation.",
    reference: refFrom('17-personnes-qualifiees', 3),
  },
  {
    id: 'vp17-vehicules-prioritaires',
    themeSlug: 'voie-publique',
    statement: "Un véhicule prioritaire (feu bleu clignotant + avertisseur sonore spécial) impose de dégager la chaussée, de céder le passage et, si nécessaire, de ralentir ou s'arrêter — mais seulement si le feu bleu ET la sirène sont actifs ensemble ; le feu bleu seul n'impose rien de particulier.",
    reference: refFrom('17-personnes-qualifiees', 4),
  },
  {
    id: 'vp17-ordre-hierarchique',
    themeSlug: 'voie-publique',
    statement: "Ordre de priorité des règles : 1) injonctions des agents qualifiés, 2) signaux lumineux, 3) signaux routiers, 4) règles générales de circulation. Même un véhicule prioritaire toutes sirènes hurlantes doit s'arrêter si un agent l'ordonne.",
    reference: refFrom('17-personnes-qualifiees', 4),
  },

  // --- 22-tram-bus.pdf ---
  {
    id: 'vp22-passage-a-niveau',
    themeSlug: 'voie-publique',
    statement: "À un passage à niveau, un feu blanc lunaire clignotant autorise à traverser ; des feux rouges clignotants et/ou un signal sonore l'interdisent formellement. S'engager pendant que les barrières sont en mouvement est une infraction grave pouvant entraîner un retrait immédiat du permis.",
    reference: refFrom('22-tram-bus', 2),
  },
  {
    id: 'vp22-ssf-tram-bus',
    themeSlug: 'voie-publique',
    statement: "Le site spécial franchissable (SSF) pour trams/bus ne fait pas partie de la chaussée : interdit d'y circuler, stationner ou s'arrêter en voiture, sauf pour contourner un obstacle, traverser dans un carrefour, ou accéder à/quitter une propriété ou un parking. Sur certaines autoroutes, une ancienne bande d'arrêt d'urgence a été convertie en SSF avec sa propre vitesse maximale.",
    reference: refFrom('22-tram-bus', 3),
  },
  {
    id: 'vp22-tram-priorite',
    themeSlug: 'voie-publique',
    statement: "Le tram n'est pas soumis aux règles générales de circulation et a toujours la priorité ; son conducteur ne doit respecter que les injonctions des agents qualifiés et les signaux lumineux.",
    reference: refFrom('22-tram-bus', 5),
  },
  {
    id: 'vp22-bande-arret-bus',
    themeSlug: 'voie-publique',
    statement: "La bande bus (ligne discontinue) est interdite aux voitures sauf près d'un carrefour pour changer de direction ou pour contourner un obstacle. On peut circuler sur un arrêt de bus et s'y arrêter pour (dé)embarquer, mais pas y attendre le bus (assimilé à un stationnement) ; sans marquage, interdit de stationner à moins de 15 m de part et d'autre du poteau.",
    reference: refFrom('22-tram-bus', 6),
  },
  {
    id: 'vp22-priorite-bus-agglo',
    themeSlug: 'voie-publique',
    statement: "En agglomération, il faut céder le passage à un autobus qui quitte son arrêt dès qu'il actionne son clignotant gauche (sauf autocars et bus scolaires) ; hors agglomération, cette obligation ne s'applique pas.",
    reference: refFrom('22-tram-bus', 7),
  },
]
