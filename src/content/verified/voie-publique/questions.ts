import type { Question } from '@/domain/quiz'

export const VOIE_PUBLIQUE_QUESTIONS: Question[] = [
  {
    id: 'vp-q1',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: {
      fr: 'Vous voulez entrer avec votre véhicule sur le parking (privé) d’un site industriel. Que faut-il ?',
      nl: 'U wilt met uw voertuig de (private) parking van een industrieterrein oprijden. Wat is er nodig?',
    },
    options: [
      { id: 'a', text: { fr: 'Rien de particulier, comme sur la voie publique', nl: 'Niets bijzonders, zoals op de openbare weg' }, correct: false },
      { id: 'b', text: { fr: 'Une bonne raison de s’y rendre', nl: 'Een goede reden om er te komen' }, correct: false },
      { id: 'c', text: { fr: 'Une bonne raison ET la permission d’y entrer', nl: 'Een goede reden ÉN toestemming om er te komen' }, correct: true },
    ],
    explanation: {
      fr: "Un terrain non-public (comme un parking industriel) n'est accessible qu'avec une bonne raison ET la permission de le faire.",
      nl: 'Een niet-openbaar terrein (zoals een industrieparking) is enkel toegankelijk met een goede reden ÉN toestemming.',
    },
    factIds: ['vp-terrain-non-public-def'],
    difficulty: 'facile',
  },
  {
    id: 'vp-q2',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: {
      fr: 'Vous roulez dangereusement sur le parking d’un supermarché (terrain public). Risquez-vous une sanction ?',
      nl: 'U rijdt gevaarlijk op de parking van een supermarkt (openbaar terrein). Riskeert u een sanctie?',
    },
    options: [
      { id: 'a', text: { fr: 'Non, le Code de la route ne s’applique que sur la voie publique', nl: 'Nee, de wegcode geldt enkel op de openbare weg' }, correct: false },
      { id: 'b', text: { fr: 'Oui, les infractions graves y restent sanctionnables', nl: 'Ja, ernstige overtredingen blijven er strafbaar' }, correct: true },
      { id: 'c', text: { fr: 'Seulement si un agent de police est présent sur place', nl: 'Enkel als er een politieagent ter plaatse aanwezig is' }, correct: false },
    ],
    explanation: {
      fr: "Même hors voie publique, les infractions graves commises sur un terrain public ou non-public restent sanctionnables (amende, poursuite).",
      nl: 'Ook buiten de openbare weg blijven ernstige overtredingen op een openbaar of niet-openbaar terrein strafbaar (boete, vervolging).',
    },
    factIds: ['vp-code-application'],
    difficulty: 'moyen',
  },
  {
    id: 'vp-q3',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Un conducteur de tram doit-il respecter les feux de circulation ?', nl: 'Moet een trambestuurder de verkeerslichten volgen?' },
    options: [
      { id: 'a', text: { fr: 'Non, jamais', nl: 'Nee, nooit' }, correct: false },
      { id: 'b', text: { fr: 'Oui, toujours', nl: 'Ja, altijd' }, correct: true },
      { id: 'c', text: { fr: 'Seulement en agglomération', nl: 'Enkel in de bebouwde kom' }, correct: false },
    ],
    explanation: {
      fr: "Les conducteurs de tram sont dispensés de l'essentiel du Code de la route, mais doivent toujours respecter les feux de circulation (et les injonctions des agents qualifiés).",
      nl: 'Trambestuurders zijn vrijgesteld van het grootste deel van de wegcode, maar moeten steeds de verkeerslichten volgen (en de bevelen van bevoegde agenten).',
    },
    factIds: ['vp-tram'],
    difficulty: 'moyen',
  },
  {
    id: 'vp-q4',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'La voie publique se limite-t-elle à la partie revêtue de la chaussée ?', nl: 'Beperkt de openbare weg zich tot het verharde deel van de rijbaan?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non, elle inclut aussi pistes cyclables, accotements, trottoirs, etc.', nl: 'Nee, ze omvat ook fietspaden, bermen, voetpaden, enz.' }, correct: true },
    ],
    explanation: {
      fr: "C'est une erreur fréquente : la voie publique va bien au-delà de la chaussée revêtue, jusqu'au fossé, au talus ou à la limite d'une propriété privée.",
      nl: 'Dat is een veelvoorkomende vergissing: de openbare weg gaat veel verder dan de verharde rijbaan, tot aan de gracht, de talud of de grens van een privé-eigendom.',
    },
    factIds: ['vp-parties-voie-publique'],
    difficulty: 'facile',
  },
  {
    id: 'vp-q5',
    themeSlug: 'voie-publique',
    region: 'WALLONIE',
    prompt: { fr: 'Quelle est la vitesse maximale sur une route ordinaire en Région wallonne ?', nl: 'Wat is de maximumsnelheid op een gewone weg in het Waals Gewest?' },
    options: [
      { id: 'a', text: { fr: '70 km/h', nl: '70 km/u' }, correct: false },
      { id: 'b', text: { fr: '90 km/h', nl: '90 km/u' }, correct: true },
      { id: 'c', text: { fr: '120 km/h', nl: '120 km/u' }, correct: false },
    ],
    explanation: {
      fr: '90 km/h en Région wallonne, sauf sur une chaussée à voie centrale où la limite descend à 70 km/h.',
      nl: '90 km/u in het Waals Gewest, behalve op een rijbaan met middenbaan, waar de limiet 70 km/u is.',
    },
    factIds: ['vp-vitesse-wallonie'],
    difficulty: 'facile',
  },
  {
    id: 'vp-q6',
    themeSlug: 'voie-publique',
    region: 'BRUXELLES',
    prompt: { fr: 'Quelle est la vitesse maximale sur une route ordinaire à Bruxelles ?', nl: 'Wat is de maximumsnelheid op een gewone weg in Brussel?' },
    options: [
      { id: 'a', text: { fr: '70 km/h', nl: '70 km/u' }, correct: true },
      { id: 'b', text: { fr: '90 km/h', nl: '90 km/u' }, correct: false },
      { id: 'c', text: { fr: '50 km/h', nl: '50 km/u' }, correct: false },
    ],
    explanation: {
      fr: 'À Bruxelles-Capitale comme en Région flamande, la vitesse maximale sur route ordinaire est de 70 km/h (contre 90 km/h en Wallonie).',
      nl: 'In Brussel-Hoofdstad, net als in het Vlaams Gewest, is de maximumsnelheid op een gewone weg 70 km/u (tegenover 90 km/u in Wallonië).',
    },
    factIds: ['vp-vitesse-bruxelles'],
    difficulty: 'facile',
  },
  {
    id: 'vp-q7',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: {
      fr: 'Sur une chaussée à voie centrale, à quoi sert la bande latérale pour un automobiliste ?',
      nl: 'Op een rijbaan met middenbaan, waarvoor dient de zijstrook voor een automobilist?',
    },
    options: [
      { id: 'a', text: { fr: 'À y circuler librement si la voie centrale est encombrée', nl: 'Om er vrij te rijden als de middenbaan druk is' }, correct: false },
      { id: 'b', text: { fr: 'Uniquement pour croiser un véhicule ou dépasser, sans gêner cyclistes/piétons', nl: 'Enkel om te kruisen of in te halen, zonder fietsers/voetgangers te hinderen' }, correct: true },
      { id: 'c', text: { fr: 'À s’y arrêter pour stationner', nl: 'Om er te parkeren' }, correct: false },
    ],
    explanation: {
      fr: "La bande latérale ne fait pas partie de la chaussée : un véhicule ne peut y circuler que pour croiser ou dépasser, sans jamais gêner ni mettre en danger les cyclistes ou piétons.",
      nl: 'De zijstrook maakt geen deel uit van de rijbaan: een voertuig mag er enkel rijden om te kruisen of in te halen, zonder ooit fietsers of voetgangers te hinderen of in gevaar te brengen.',
    },
    factIds: ['vp-bande-laterale-def'],
    difficulty: 'difficile',
  },
  {
    id: 'vp-q8',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: {
      fr: 'Quelle distance latérale minimale devez-vous garder avec un cycliste sur une bande latérale, hors agglomération ?',
      nl: 'Welke minimale zijdelingse afstand moet u houden van een fietser op een zijstrook, buiten de bebouwde kom?',
    },
    options: [
      { id: 'a', text: { fr: '1 mètre', nl: '1 meter' }, correct: false },
      { id: 'b', text: { fr: '1,5 mètre', nl: '1,5 meter' }, correct: true },
      { id: 'c', text: { fr: '3 mètres', nl: '3 meter' }, correct: false },
    ],
    explanation: {
      fr: '1 mètre en agglomération, 1,5 mètre hors agglomération.',
      nl: '1 meter in de bebouwde kom, 1,5 meter buiten de bebouwde kom.',
    },
    factIds: ['vp-distance-laterale'],
    difficulty: 'moyen',
  },
  {
    id: 'vp-q10',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: {
      fr: "Il n'y a pas de piste cyclable sur cette route. Un cycliste peut-il rouler sur la chaussée ?",
      nl: 'Er is geen fietspad op deze weg. Mag een fietser op de rijbaan rijden?',
    },
    options: [
      { id: 'a', text: { fr: 'Non, jamais', nl: 'Nee, nooit' }, correct: false },
      { id: 'b', text: { fr: 'Oui, dans ce cas c’est autorisé', nl: 'Ja, in dat geval is het toegelaten' }, correct: true },
      { id: 'c', text: { fr: 'Seulement la nuit', nl: 'Enkel ’s nachts' }, correct: false },
    ],
    explanation: {
      fr: "En l'absence de piste cyclable, les cyclistes (et cyclomoteurs à deux roues) sont autorisés à circuler sur la chaussée.",
      nl: 'Bij ontstentenis van een fietspad mogen fietsers (en tweewielige bromfietsen) op de rijbaan rijden.',
    },
    factIds: ['vp-chaussee-def'],
    difficulty: 'facile',
  },
  {
    id: 'vp-q11',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: {
      fr: 'Sur une chaussée à voie centrale, quelle est la vitesse maximale — quelle que soit la région ?',
      nl: 'Wat is de maximumsnelheid op een rijbaan met middenbaan — in welke regio dan ook?',
    },
    options: [
      { id: 'a', text: { fr: '90 km/h', nl: '90 km/u' }, correct: false },
      { id: 'b', text: { fr: '70 km/h', nl: '70 km/u' }, correct: true },
      { id: 'c', text: { fr: '50 km/h', nl: '50 km/u' }, correct: false },
    ],
    explanation: {
      fr: "70 km/h, uniformément en Wallonie, à Bruxelles et en Flandre — c'est une exception notable à la règle des 90 km/h wallonne.",
      nl: '70 km/u, gelijk in Wallonië, Brussel en Vlaanderen — een opvallende uitzondering op de Waalse regel van 90 km/u.',
    },
    factIds: ['vp-voie-centrale-vitesse'],
    difficulty: 'moyen',
  },
  {
    id: 'vp-q9',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Un cheval monté se cabre devant votre voiture. Que devez-vous faire ?', nl: 'Een bereden paard steigert voor uw auto. Wat moet u doen?' },
    options: [
      { id: 'a', text: { fr: 'Klaxonner pour l’éloigner', nl: 'Toeteren om het weg te jagen' }, correct: false },
      { id: 'b', text: { fr: 'Accélérer pour dégager rapidement', nl: 'Versnellen om snel weg te zijn' }, correct: false },
      { id: 'c', text: { fr: 'Arrêter le véhicule et éviter tout mouvement brusque', nl: 'Het voertuig stoppen en elke plotse beweging vermijden' }, correct: true },
    ],
    explanation: {
      fr: "Il faut arrêter son véhicule et éviter tout mouvement brusque, pour laisser le cavalier reprendre le contrôle de la situation.",
      nl: 'U moet uw voertuig stoppen en elke plotse beweging vermijden, zodat de ruiter de situatie terug onder controle kan krijgen.',
    },
    factIds: ['vp-animaux-chaussee'],
    difficulty: 'facile',
  },

  // --- Leçon 2 : bandes de circulation ---
  {
    id: 'vp2-q1',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Pouvez-vous franchir une ligne continue pour entrer dans une propriété privée ?', nl: 'Mag u een doorlopende lijn oversteken om een privé-eigendom binnen te rijden?' },
    options: [
      { id: 'a', text: { fr: 'Oui, dans ce cas précis', nl: 'Ja, in dit specifieke geval' }, correct: false },
      { id: 'b', text: { fr: 'Non, jamais, pour aucune raison', nl: 'Nee, nooit, om geen enkele reden' }, correct: true },
    ],
    explanation: {
      fr: "Une ligne continue est infranchissable, quelle que soit la raison — y compris pour rejoindre une propriété privée.",
      nl: 'Een doorlopende lijn is onoverschrijdbaar, om welke reden dan ook — ook om een privé-eigendom te bereiken.',
    },
    factIds: ['vp2-lignes-depassement'],
    difficulty: 'moyen',
  },
  {
    id: 'vp2-q2',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Pouvez-vous vous arrêter sur une bande de bus pour déposer un passager ?', nl: 'Mag u op een busstrook stoppen om een passagier af te zetten?' },
    options: [
      { id: 'a', text: { fr: 'Oui, toujours', nl: 'Ja, altijd' }, correct: false },
      { id: 'b', text: { fr: 'Non, sauf exceptions ponctuelles (carrefour, obstacle)', nl: 'Nee, behalve in punctuele uitzonderingen (kruispunt, obstakel)' }, correct: true },
    ],
    explanation: {
      fr: "La bande de bus ne fait pas partie de la chaussée : interdit d'y circuler ou s'y arrêter, sauf pour changer de direction près d'un carrefour ou contourner un obstacle.",
      nl: 'De busstrook maakt geen deel uit van de rijbaan: verboden om erop te rijden of te stoppen, behalve om van richting te veranderen bij een kruispunt of een obstakel te omzeilen.',
    },
    factIds: ['vp2-bande-bus'],
    difficulty: 'moyen',
  },

  // --- Leçon 3 : cyclistes ---
  {
    id: 'vp3-q1',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'En agglomération, un enfant de 8 ans peut-il rouler à vélo sur le trottoir ?', nl: 'Mag een kind van 8 jaar in de bebouwde kom op het voetpad fietsen?' },
    options: [
      { id: 'a', text: { fr: 'Non, jamais', nl: 'Nee, nooit' }, correct: false },
      { id: 'b', text: { fr: 'Oui, les enfants de moins de 10 ans y sont autorisés', nl: 'Ja, kinderen jonger dan 10 jaar mogen dit' }, correct: true },
    ],
    explanation: {
      fr: "En agglomération, le vélo sur le trottoir est interdit sauf pour les enfants de moins de 10 ans (moins de 12 ans à partir de juin 2027).",
      nl: 'In de bebouwde kom is fietsen op het voetpad verboden, behalve voor kinderen jonger dan 10 jaar (jonger dan 12 vanaf juni 2027).',
    },
    factIds: ['vp3-cyclistes-trottoir'],
    difficulty: 'facile',
  },
  {
    id: 'vp3-q2',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Un cycliste veut s’engager sur un passage pour cyclistes. Que doit-il faire d’abord ?', nl: 'Een fietser wil een fietsoversteek oprijden. Wat moet hij eerst doen?' },
    options: [
      { id: 'a', text: { fr: 'S’engager directement, il est prioritaire', nl: 'Direct oprijden, hij heeft voorrang' }, correct: false },
      { id: 'b', text: { fr: 'Céder le passage aux véhicules sur la chaussée', nl: 'Voorrang verlenen aan voertuigen op de rijbaan' }, correct: true },
    ],
    explanation: {
      fr: "Le cycliste cède le passage pour s'engager sur le passage cycliste, mais devient prioritaire une fois qu'il y est engagé.",
      nl: 'De fietser geeft voorrang om zich op de fietsoversteek te begeven, maar krijgt voorrang zodra hij erop rijdt.',
    },
    factIds: ['vp3-passage-cyclistes'],
    difficulty: 'moyen',
  },
  {
    id: 'vp3-q3',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Dans une zone cyclable, une voiture peut-elle dépasser un cycliste ?', nl: 'Mag een auto in een fietszone een fietser inhalen?' },
    options: [
      { id: 'a', text: { fr: 'Oui, en gardant ses distances', nl: 'Ja, met voldoende afstand' }, correct: false },
      { id: 'b', text: { fr: 'Non, c’est interdit', nl: 'Nee, dat is verboden' }, correct: true },
    ],
    explanation: {
      fr: "Dans une zone cyclable, les véhicules motorisés ne peuvent pas dépasser un cycliste ou un engin assimilé.",
      nl: 'In een fietszone mogen gemotoriseerde voertuigen geen fietser of gelijkgesteld voertuig inhalen.',
    },
    factIds: ['vp3-zone-cyclable'],
    difficulty: 'facile',
  },

  // --- Leçon 6 : lieux particuliers ---
  {
    id: 'vp6-q1',
    themeSlug: 'voie-publique',
    region: 'BRUXELLES',
    prompt: { fr: 'Quelle est la vitesse maximale en agglomération à Bruxelles ?', nl: 'Wat is de maximumsnelheid in de bebouwde kom in Brussel?' },
    options: [
      { id: 'a', text: { fr: '50 km/h', nl: '50 km/u' }, correct: false },
      { id: 'b', text: { fr: '30 km/h', nl: '30 km/u' }, correct: true },
    ],
    explanation: {
      fr: "En Région de Bruxelles-Capitale, la vitesse maximale en agglomération est de 30 km/h, contre 50 km/h en Wallonie et en Flandre.",
      nl: 'In het Brussels Hoofdstedelijk Gewest is de maximumsnelheid in de bebouwde kom 30 km/u, tegenover 50 km/u in Wallonië en Vlaanderen.',
    },
    factIds: ['vp6-agglo-vitesse-bruxelles'],
    difficulty: 'facile',
  },
  {
    id: 'vp6-q2',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Dans une zone résidentielle, les cyclistes peuvent-ils occuper toute la largeur de la rue comme les piétons ?', nl: 'Mogen fietsers in een woonerf, net als voetgangers, de hele breedte van de straat gebruiken?' },
    options: [
      { id: 'a', text: { fr: 'Oui, comme les piétons', nl: 'Ja, net als voetgangers' }, correct: false },
      { id: 'b', text: { fr: 'Non, ce droit est réservé aux piétons', nl: 'Nee, dat recht is voorbehouden aan voetgangers' }, correct: true },
    ],
    explanation: {
      fr: "Dans une zone résidentielle, seuls les piétons peuvent utiliser toute la largeur de la voirie — pas les cyclistes.",
      nl: 'In een woonerf mogen enkel voetgangers de volledige breedte van de straat gebruiken — fietsers niet.',
    },
    factIds: ['vp6-zone-residentielle'],
    difficulty: 'moyen',
  },
  {
    id: 'vp6-q3',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Un seul signal « zone 30 » suffit-il pour délimiter les abords d’une école ?', nl: 'Volstaat één bord "zone 30" om een schoolomgeving af te bakenen?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non, il faut aussi le signal « présence possible d’enfants »', nl: 'Nee, ook het bord "mogelijke aanwezigheid van kinderen" is nodig' }, correct: true },
    ],
    explanation: {
      fr: "Les abords d'école exigent la présence conjointe des deux signaux : « présence possible d'enfants » et « zone 30 ».",
      nl: 'De schoolomgeving vereist de gezamenlijke aanwezigheid van beide borden: "mogelijke aanwezigheid van kinderen" en "zone 30".',
    },
    factIds: ['vp6-abords-ecole-scolaire'],
    difficulty: 'difficile',
  },

  // --- Leçon 7 : piétons ---
  {
    id: 'vp7-q1',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Une personne pousse sa moto en panne sur le trottoir. Est-ce autorisé ?', nl: 'Iemand duwt zijn defecte motor op het voetpad. Is dat toegelaten?' },
    options: [
      { id: 'a', text: { fr: 'Oui, comme pour un vélo', nl: 'Ja, net als bij een fiets' }, correct: false },
      { id: 'b', text: { fr: 'Non, en poussant une moto elle est conductrice et doit être sur la chaussée', nl: 'Nee, door de motor te duwen is ze bestuurder en moet ze op de rijbaan zijn' }, correct: true },
    ],
    explanation: {
      fr: "Contrairement à celui qui pousse un vélo (resté piéton), celui qui pousse une moto devient conducteur et doit se trouver sur la chaussée, casque compris.",
      nl: 'In tegenstelling tot wie een fiets duwt (blijft voetganger), wordt wie een motor duwt bestuurder en moet hij zich op de rijbaan bevinden, helm inbegrepen.',
    },
    factIds: ['vp7-usagers-pietons-def'],
    difficulty: 'moyen',
  },
  {
    id: 'vp7-q2',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Il n’y a pas de passage pour piétons à proximité. Qui doit céder le passage ?', nl: 'Er is geen oversteekplaats in de buurt. Wie moet voorrang verlenen?' },
    options: [
      { id: 'a', text: { fr: 'Le conducteur', nl: 'De bestuurder' }, correct: false },
      { id: 'b', text: { fr: 'Le piéton qui traverse', nl: 'De overstekende voetganger' }, correct: true },
    ],
    explanation: {
      fr: "Sans passage pour piétons à proximité, c'est le piéton qui doit céder le passage et traverser rapidement, perpendiculairement à la chaussée.",
      nl: 'Zonder oversteekplaats in de buurt moet de voetganger voorrang verlenen en snel, loodrecht op de rijbaan, oversteken.',
    },
    factIds: ['vp7-passage-pietons-priorite'],
    difficulty: 'moyen',
  },

  // --- Leçon 8 : conducteurs de véhicules ---
  {
    id: 'vp8-q1',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Un cavalier à cheval sur la voie publique est-il un conducteur ?', nl: 'Is een ruiter te paard op de openbare weg een bestuurder?' },
    options: [
      { id: 'a', text: { fr: 'Non, un cheval n’est pas un véhicule', nl: 'Nee, een paard is geen voertuig' }, correct: false },
      { id: 'b', text: { fr: 'Oui, mener une monture fait de lui un conducteur', nl: 'Ja, een rijdier leiden maakt hem een bestuurder' }, correct: true },
    ],
    explanation: {
      fr: "Un conducteur est aussi celui qui mène ou surveille une monture, un animal de trait ou de charge sur la voie publique — un cavalier est donc un conducteur.",
      nl: 'Een bestuurder is ook wie een rijdier, trek- of lastdier op de openbare weg leidt of begeleidt — een ruiter is dus een bestuurder.',
    },
    factIds: ['vp8-conducteur-def'],
    difficulty: 'facile',
  },
  {
    id: 'vp8-q2',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Une règle dit « céder le passage aux conducteurs ». Concerne-t-elle les piétons ?', nl: 'Een regel zegt "voorrang verlenen aan bestuurders". Betreft dit ook voetgangers?' },
    options: [
      { id: 'a', text: { fr: 'Oui, « conducteurs » inclut tout le monde', nl: 'Ja, "bestuurders" omvat iedereen' }, correct: false },
      { id: 'b', text: { fr: 'Non, « conducteurs » exclut les piétons', nl: 'Nee, "bestuurders" sluit voetgangers uit' }, correct: true },
    ],
    explanation: {
      fr: "« Conducteurs » exclut toujours les piétons. Seul le mot « usagers » désigne piétons et conducteurs ensemble.",
      nl: '"Bestuurders" sluit voetgangers altijd uit. Enkel het woord "weggebruikers" duidt voetgangers en bestuurders samen aan.',
    },
    factIds: ['vp8-conducteur-def'],
    difficulty: 'difficile',
  },

  // --- Leçon 17 : personnes qualifiées ---
  {
    id: 'vp17-q1',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Un agent tend le bras droit horizontalement dans votre direction (vous approchez de son côté). Pouvez-vous continuer ?', nl: 'Een agent strekt zijn rechterarm horizontaal in uw richting uit (u nadert van zijn kant). Mag u doorrijden?' },
    options: [
      { id: 'a', text: { fr: 'Non, je dois m’arrêter', nl: 'Nee, ik moet stoppen' }, correct: false },
      { id: 'b', text: { fr: 'Oui, ceux qui approchent de son côté peuvent s’engager', nl: 'Ja, wie van zijn kant nadert mag oprijden' }, correct: true },
    ],
    explanation: {
      fr: "Bras tendu horizontalement : seuls ceux qui font face au ventre ou au dos de l'agent doivent s'arrêter ; ceux qui arrivent de son côté peuvent continuer.",
      nl: 'Horizontaal uitgestrekte arm: enkel wie de buik of rug van de agent voor zich heeft, moet stoppen; wie van zijn kant komt, mag doorrijden.',
    },
    factIds: ['vp17-bras-agent'],
    difficulty: 'moyen',
  },
  {
    id: 'vp17-q2',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Un capitaine de route peut-il vous dresser un procès-verbal ?', nl: 'Mag een wegkapitein u een proces-verbaal opstellen?' },
    options: [
      { id: 'a', text: { fr: 'Oui, il en a le pouvoir', nl: 'Ja, hij heeft die bevoegdheid' }, correct: false },
      { id: 'b', text: { fr: 'Non, il n’est pas un agent qualifié', nl: 'Nee, hij is geen bevoegde agent' }, correct: true },
    ],
    explanation: {
      fr: "Un capitaine de route peut donner des indications, mais n'est pas un agent qualifié : il ne peut ni donner d'injonction officielle ni dresser de procès-verbal.",
      nl: 'Een wegkapitein mag aanwijzingen geven, maar is geen bevoegde agent: hij mag geen officieel bevel geven, noch een proces-verbaal opstellen.',
    },
    factIds: ['vp17-personnes-autorisees'],
    difficulty: 'moyen',
  },

  // --- Leçon 22 : tram-bus ---
  {
    id: 'vp22-q1',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Les feux rouges d’un passage à niveau clignotent. Pouvez-vous traverser ?', nl: 'De rode lichten van een overweg knipperen. Mag u oversteken?' },
    options: [
      { id: 'a', text: { fr: 'Oui, si aucun train n’est visible', nl: 'Ja, als er geen trein zichtbaar is' }, correct: false },
      { id: 'b', text: { fr: 'Non, c’est formellement interdit', nl: 'Nee, dat is formeel verboden' }, correct: true },
    ],
    explanation: {
      fr: "Des feux rouges clignotants interdisent formellement de s'engager sur un passage à niveau, qu'un train soit visible ou non.",
      nl: 'Knipperende rode lichten verbieden formeel het oprijden van een overweg, ongeacht of er een trein zichtbaar is.',
    },
    factIds: ['vp22-passage-a-niveau'],
    difficulty: 'facile',
  },
  {
    id: 'vp22-q2',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Pouvez-vous circuler tranquillement sur un site spécial franchissable pour gagner du temps ?', nl: 'Mag u rustig op een bijzondere overrijdbare bedding rijden om tijd te winnen?' },
    options: [
      { id: 'a', text: { fr: 'Oui, s’il n’y a pas de tram', nl: 'Ja, als er geen tram is' }, correct: false },
      { id: 'b', text: { fr: 'Non, seulement pour un obstacle, un carrefour ou un accès', nl: 'Nee, enkel voor een obstakel, een kruispunt of een toegang' }, correct: true },
    ],
    explanation: {
      fr: "Le SSF ne fait pas partie de la chaussée : une voiture ne peut y circuler que pour contourner un obstacle, traverser un carrefour, ou accéder à une propriété — jamais pour y rouler normalement.",
      nl: 'De BOB maakt geen deel uit van de rijbaan: een auto mag er enkel op rijden om een obstakel te omzeilen, een kruispunt over te steken, of een eigendom te bereiken — nooit om er gewoon te rijden.',
    },
    factIds: ['vp22-ssf-tram-bus'],
    difficulty: 'moyen',
  },
  {
    id: 'vp22-q3',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'En agglomération, un bus quitte son arrêt en mettant son clignotant gauche. Que devez-vous faire ?', nl: 'In de bebouwde kom vertrekt een bus van zijn halte met linkerknipperlicht. Wat moet u doen?' },
    options: [
      { id: 'a', text: { fr: 'Rien de particulier, je garde ma trajectoire', nl: 'Niets bijzonders, ik houd mijn koers aan' }, correct: false },
      { id: 'b', text: { fr: 'Lui céder le passage', nl: 'Hem voorrang verlenen' }, correct: true },
    ],
    explanation: {
      fr: "En agglomération, il faut céder le passage à un autobus qui quitte son arrêt dès qu'il actionne son clignotant gauche.",
      nl: 'In de bebouwde kom moet u voorrang verlenen aan een bus die zijn halte verlaat zodra hij links knippert.',
    },
    factIds: ['vp22-priorite-bus-agglo'],
    difficulty: 'moyen',
  },
]
