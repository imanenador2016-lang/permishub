import type { Lesson } from '@/domain/content'

const L9: Lesson = {
  slug: 'masse-maximale-autorisee',
  themeSlug: 'vehicule-technique',
  title: { fr: 'Masse maximale autorisée', nl: 'Maximaal toegelaten massa' },
  intro: { fr: "MMA, MEC : deux sigles à ne jamais confondre, et ce que ton permis B t'autorise vraiment à conduire.", nl: 'MTM, MEM: twee afkortingen die u nooit mag verwarren, en wat uw rijbewijs B écht toelaat te besturen.' },
  objectives: [
    { fr: 'Distinguer MMA et MEC', nl: 'MTM en MEM onderscheiden' },
    { fr: 'Connaître le matériel et les documents obligatoires', nl: 'De verplichte uitrusting en documenten kennen' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'vt9-c1-mma-mec',
      title: { fr: 'MMA : ce que la voiture peut peser au maximum', nl: 'MTM: wat de auto maximaal mag wegen' },
      paragraphs: [
        {
          fr: "La MMA, fixée par le fabricant, est le poids maximal théorique du véhicule chargé. La MEC, elle, est le poids réel mesuré à un instant T — toujours en dessous de la MMA si tu ne surcharges pas. Avec un permis B, la limite à retenir est 3 500 kg de MMA.",
          nl: 'De MTM, bepaald door de fabrikant, is het theoretisch maximumgewicht van het beladen voertuig. De MEM is dan weer het echte gewicht op een bepaald moment — altijd onder de MTM als u niet overlaadt. Met een rijbewijs B is de te onthouden grens 3 500 kg MTM.',
        },
      ],
      factIds: ['vt9-mma-def', 'vt9-mec-def'],
      miniQuizQuestionIds: ['vt9-q1'],
    },
    {
      id: 'vt9-c2-obligatoire',
      title: { fr: 'Ce qui doit toujours être à bord', nl: 'Wat altijd aan boord moet zijn' },
      paragraphs: [
        {
          fr: "Triangle, trousse de secours, extincteur (1 kg, accessible en 10 secondes) et gilet fluorescent dans l'habitacle : ce quatuor ne se discute pas. Côté papiers, sois toujours titulaire ET porteur de ta carte d'identité et de ton permis — une attestation de perte ne suffit pas pour conduire.",
          nl: 'Driehoek, EHBO-kit, brandblusser (1 kg, binnen 10 seconden bereikbaar) en fluohesje in de passagiersruimte: dit kwartet staat niet ter discussie. Voor papieren geldt: wees altijd houder ÉN drager van uw identiteitskaart en rijbewijs — een verlies-attest volstaat niet om te rijden.',
        },
      ],
      factIds: ['vt9-documents-obligatoires'],
      miniQuizQuestionIds: ['vt9-q2'],
    },
  ],
  summary: {
    fr: "MMA = poids maximal théorique (fixé par le fabricant, limite de 3 500 kg avec un permis B). MEC = poids réel mesuré. Triangle, trousse, extincteur et gilet doivent toujours être à bord.",
    nl: 'MTM = theoretisch maximumgewicht (door fabrikant bepaald, grens van 3 500 kg met rijbewijs B). MEM = echt gemeten gewicht. Driehoek, EHBO-kit, brandblusser en hesje moeten altijd aan boord zijn.',
  },
}

const L10: Lesson = {
  slug: 'chargement-de-vehicules',
  themeSlug: 'vehicule-technique',
  title: { fr: 'Chargement de véhicules', nl: 'Lading van voertuigen' },
  intro: { fr: "Un chargement mal calculé se voit vite à l'examen : dimensions, remorque, tout ce qui peut déborder — et de combien.", nl: 'Een verkeerd berekende lading valt snel op tijdens het examen: afmetingen, aanhangwagen, alles wat mag uitsteken — en hoeveel.' },
  objectives: [
    { fr: 'Connaître les limites de hauteur, largeur et longueur', nl: 'De limieten van hoogte, breedte en lengte kennen' },
    { fr: 'Savoir qui peut tracter une remorque, et laquelle', nl: 'Weten wie een aanhangwagen mag trekken, en welke' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'vt10-c1-dimensions',
      title: { fr: 'Les limites à ne pas dépasser', nl: 'De grenzen om niet te overschrijden' },
      paragraphs: [
        {
          fr: "Un chargement ne doit jamais compromettre la stabilité, la visibilité ou la sécurité des autres. Concrètement : 4 m de haut maximum, 2,55 m de large, jamais de dépassement à l'avant, et 1 m maximum à l'arrière (3 m pour une charge indivisible signalée).",
          nl: 'Een lading mag nooit de stabiliteit, het zicht of de veiligheid van anderen in gevaar brengen. Concreet: maximaal 4 m hoog, 2,55 m breed, nooit uitstekend vooraan, en maximaal 1 m achteraan (3 m voor een gesignaleerde ondeelbare lading).',
        },
      ],
      factIds: ['vt10-regles-generales', 'vt10-longueur'],
      miniQuizQuestionIds: ['vt10-q1'],
    },
    {
      id: 'vt10-c2-remorque',
      title: { fr: 'Tracter une remorque', nl: 'Een aanhangwagen trekken' },
      paragraphs: [
        {
          fr: "Avec un permis provisoire, aucune remorque. Avec un permis définitif, 750 kg de MMA sans condition supplémentaire — au-delà, seulement si la MMA totale (voiture + remorque) ne dépasse pas 3 500 kg.",
          nl: 'Met een voorlopig rijbewijs: geen aanhangwagen. Met een definitief rijbewijs: 750 kg MTM zonder bijkomende voorwaarde — daarboven, enkel als de totale MTM (auto + aanhangwagen) niet meer dan 3 500 kg bedraagt.',
        },
      ],
      factIds: ['vt10-remorque'],
      miniQuizQuestionIds: ['vt10-q2'],
    },
  ],
  summary: {
    fr: "4 m de haut, 2,55 m de large, jamais de dépassement à l'avant, 1 m max à l'arrière. Remorque : impossible avec un permis provisoire, 750 kg avec un permis définitif (plus si le total reste sous 3 500 kg).",
    nl: '4 m hoog, 2,55 m breed, nooit uitstekend vooraan, max. 1 m achteraan. Aanhangwagen: onmogelijk met voorlopig rijbewijs, 750 kg met definitief rijbewijs (meer als het totaal onder 3 500 kg blijft).',
  },
}

const L31: Lesson = {
  slug: 'la-technique',
  themeSlug: 'vehicule-technique',
  title: { fr: 'La technique', nl: 'De techniek' },
  intro: { fr: "Pneus, freins, dérapages, écrans : les bases techniques qui font la différence entre un bon et un mauvais conducteur.", nl: 'Banden, remmen, slippen, schermen: de technische basis die het verschil maakt tussen een goede en een slechte bestuurder.' },
  objectives: [
    { fr: 'Connaître les règles légales sur les pneus', nl: 'De wettelijke regels over banden kennen' },
    { fr: 'Réagir correctement à un dérapage', nl: 'Correct reageren op een slip' },
    { fr: 'Connaître les règles sur les appareils électroniques', nl: 'De regels over elektronische toestellen kennen' },
  ],
  estimatedMinutes: 7,
  chapters: [
    {
      id: 'vt31-c1-pneus',
      title: { fr: 'Les pneus, ton seul contact avec la route', nl: 'De banden, uw enige contact met de weg' },
      paragraphs: [
        {
          fr: "Le minimum légal (1,6 mm) n'est pas un gage de sécurité réelle : l'aquaplaning menace déjà sous les 2 mm. Recreuser ou rechaper un pneu usé est interdit. Sous 7°C, passe aux pneus hiver ; les pneus cloutés, eux, ne sont tolérés que du 1er novembre au 31 mars, à vitesse réduite.",
          nl: 'Het wettelijke minimum (1,6 mm) is geen garantie voor echte veiligheid: aquaplaning dreigt al onder de 2 mm. Een versleten band opnieuw insnijden of vernieuwen is verboden. Onder 7°C schakel je over naar winterbanden; spijkerbanden worden dan weer enkel getolereerd van 1 november tot 31 maart, aan verminderde snelheid.',
        },
      ],
      table: {
        caption: { fr: "Symétrie des pneus d'un même essieu", nl: 'Symmetrie van banden op eenzelfde as' },
        rows: [
          {
            label: { fr: 'Exigence principale', nl: 'Hoofdvereiste' },
            valuesByRegion: {
              WALLONIE: { fr: 'Mêmes caractéristiques et dimensions', nl: 'Zelfde kenmerken en afmetingen' },
              FLANDRE: { fr: 'Même structure et dimension (depuis déc. 2024)', nl: 'Zelfde structuur en afmeting (sinds dec. 2024)' },
              BRUXELLES: { fr: 'Voir Bruxelles Environnement / autocontrole.be', nl: 'Zie Leefmilieu Brussel / autocontrole.be' },
            },
          },
        ],
      },
      callouts: [
        {
          kind: 'attention',
          text: { fr: 'La règle des pneus diffère selon la région du contrôle technique — vérifie toujours celle qui te concerne.', nl: 'De bandenregel verschilt per regio van de technische keuring — controleer altijd degene die op u van toepassing is.' },
        },
      ],
      factIds: ['vt31-pneus-legal', 'vt31-pneus-hiver-cloutes', 'vt31-pneus-symetrie-wallonie', 'vt31-pneus-symetrie-flandre'],
      miniQuizQuestionIds: ['vt31-q1'],
    },
    {
      id: 'vt31-c2-derapage',
      title: { fr: 'Le bon réflexe en cas de dérapage', nl: 'De juiste reflex bij een slip' },
      paragraphs: [
        {
          fr: "Instinct trompeur : freiner fort n'est presque jamais la solution. Si l'arrière décroche, contre-braque dans le sens du dérapage, débraye, lâche l'accélérateur. En cas d'aquaplaning, dirige simplement le volant où tu veux aller, sans freiner. L'ABS, lui, ne raccourcit pas forcément la distance de freinage : il t'évite surtout de perdre la maîtrise directionnelle.",
          nl: 'Misleidend instinct: hard remmen is bijna nooit de oplossing. Als de achterkant wegglijdt, stuur je tegen in de richting van de slip, koppel je uit, laat je het gaspedaal los. Bij aquaplaning stuur je gewoon naar waar u wilt gaan, zonder te remmen. ABS verkort dan weer niet noodzakelijk de remafstand: het voorkomt vooral controleverlies over de richting.',
        },
      ],
      factIds: ['vt31-freins-derapage'],
      miniQuizQuestionIds: ['vt31-q2'],
    },
    {
      id: 'vt31-c3-ecrans',
      title: { fr: 'Le smartphone au volant', nl: 'De smartphone achter het stuur' },
      paragraphs: [
        {
          fr: "Tenir ou manipuler un appareil à écran en conduisant est interdit, sauf s'il est fixé dans un support et utilisé comme GPS. Et attention au piège classique : être arrêté à un feu rouge ou dans un embouteillage ne compte PAS comme « être à l'arrêt » pour cette règle.",
          nl: 'Een scherm vasthouden of bedienen tijdens het rijden is verboden, tenzij het vastzit in een houder en als GPS gebruikt wordt. En let op de klassieke valstrik: stilstaan aan een rood licht of in een file telt NIET als "stilstaan" voor deze regel.',
        },
      ],
      factIds: ['vt31-appareils-electroniques'],
      miniQuizQuestionIds: ['vt31-q3'],
    },
  ],
  summary: {
    fr: "Pneus : 1,6 mm minimum légal, mais l'aquaplaning guette dès 2 mm. En dérapage arrière : contre-braquer, débrayer, ne pas freiner fort. Smartphone : uniquement fixé dans un support, et jamais à un feu rouge.",
    nl: 'Banden: 1,6 mm wettelijk minimum, maar aquaplaning dreigt al vanaf 2 mm. Bij slip achteraan: tegensturen, uitkoppelen, niet hard remmen. Smartphone: enkel vastgezet in een houder, en nooit aan een rood licht.',
  },
}

const L30: Lesson = {
  slug: 'consommation-du-carburant',
  themeSlug: 'vehicule-technique',
  title: { fr: 'Consommation du carburant', nl: 'Brandstofverbruik' },
  intro: { fr: "Conduire moins cher et plus propre, sans changer de voiture — juste en changeant quelques habitudes.", nl: 'Goedkoper en properder rijden, zonder van auto te veranderen — gewoon door enkele gewoontes aan te passen.' },
  objectives: [
    { fr: 'Identifier ce qui augmente la consommation', nl: 'Herkennen wat het verbruik verhoogt' },
    { fr: 'Connaître les règles liées aux zones de basses émissions', nl: 'De regels rond lage-emissiezones kennen' },
  ],
  estimatedMinutes: 4,
  chapters: [
    {
      id: 'vt30-c1-consommation',
      title: { fr: 'Ce qui fait grimper la consommation', nl: 'Wat het verbruik doet stijgen' },
      paragraphs: [
        {
          fr: "Un coffre encombré inutilement, une galerie de toit vide, des vitres entrouvertes à 120 km/h : autant de petites habitudes qui coûtent cher au réservoir. Et le geste le plus simple reste le bon régime moteur — vers 2 000-2 500 tours en essence, 1 500-2 000 en diesel pour passer la vitesse.",
          nl: 'Een onnodig volle koffer, een lege dakdrager, ramen op een kier bij 120 km/u: allemaal kleine gewoontes die de tank duur te staan komen. En het eenvoudigste gebaar blijft het juiste motortoerental — rond 2000-2500 toeren bij benzine, 1500-2000 bij diesel om te schakelen.',
        },
      ],
      factIds: ['vt30-poids-vitres'],
      miniQuizQuestionIds: ['vt30-q1'],
    },
    {
      id: 'vt30-c2-emissions',
      title: { fr: 'Moteur coupé, zones à faibles émissions', nl: 'Motor uit, lage-emissiezones' },
      paragraphs: [
        {
          fr: "Le Code impose de couper le moteur en cas d'immobilisation prolongée. Et certaines villes belges (Anvers, Bruxelles, Gand notamment) imposent leurs propres zones de basses émissions, avec des conditions d'accès différentes d'une ville à l'autre.",
          nl: 'De wegcode verplicht de motor uit te zetten bij langdurige immobilisatie. En sommige Belgische steden (Antwerpen, Brussel, Gent onder andere) leggen hun eigen lage-emissiezones op, met van stad tot stad verschillende toegangsvoorwaarden.',
        },
      ],
      factIds: ['vt30-couper-moteur-emissions'],
      miniQuizQuestionIds: ['vt30-q2'],
    },
  ],
  summary: {
    fr: "Allège ta voiture, retire ta galerie de toit vide, ferme les vitres à haute vitesse, coupe le moteur à l'arrêt prolongé — et vérifie les conditions d'accès avant d'entrer dans une zone de basses émissions.",
    nl: 'Maak uw auto lichter, verwijder een lege dakdrager, sluit de ramen bij hoge snelheid, zet de motor uit bij langdurige stilstand — en controleer de toegangsvoorwaarden voor u een lage-emissiezone binnenrijdt.',
  },
}

export const VEHICULE_TECHNIQUE_LESSONS: Lesson[] = [L9, L10, L31, L30]
