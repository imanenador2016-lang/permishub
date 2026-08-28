import type { Lesson } from '@/domain/content'

const L11: Lesson = {
  slug: 'les-feux-et-le-klaxon',
  themeSlug: 'signalisation-priorites',
  title: { fr: 'Les feux et le klaxon', nl: 'De lichten en de claxon' },
  intro: { fr: "Voir et être vu, sans éblouir : quand allumer quoi, et quand le klaxon remplace-t-il un appel de phares.", nl: 'Zien en gezien worden, zonder te verblinden: wanneer wat aan te steken, en wanneer de claxon plaatsmaakt voor een lichtsignaal.' },
  objectives: [
    { fr: 'Savoir quand allumer feux de croisement et de route', nl: 'Weten wanneer dimlicht en grootlicht aan te steken' },
    { fr: 'Utiliser correctement warnings et klaxon', nl: 'Alarmlichten en claxon correct gebruiken' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'sp11-c1-feux',
      title: { fr: 'Quand allumer, quand éteindre', nl: 'Wanneer aan, wanneer uit' },
      paragraphs: [
        {
          fr: "La règle est simple à retenir : dès que tu vois moins bien à 200 m, tes feux s'allument — de nuit comme en plein jour sous la pluie ou le brouillard. Les feux de route, eux, se coupent dès que tu croises, suis de près, ou approches un tram, pour ne jamais éblouir personne.",
          nl: "De regel is eenvoudig te onthouden: zodra je minder ver dan 200 m goed ziet, gaan je lichten aan — 's nachts zowel als overdag bij regen of mist. Het grootlicht schakel je dan weer uit zodra je kruist, dicht volgt, of een tram nadert, om nooit iemand te verblinden.",
        },
      ],
      factIds: ['sp11-feux-quand', 'sp11-feux-route-interdits'],
      miniQuizQuestionIds: ['sp11-q1'],
    },
    {
      id: 'sp11-c2-warnings-klaxon',
      title: { fr: 'Warnings et klaxon : usage strict', nl: 'Alarmlichten en claxon: strikt gebruik' },
      paragraphs: [
        {
          fr: "Les warnings ne servent qu'en cas de panne réelle ou de danger imminent à signaler — jamais pour excuser un stationnement gênant. Le klaxon, lui, avertit d'un danger ou annonce un dépassement hors agglomération ; la nuit, il cède la place à un appel de phares, sauf urgence.",
          nl: "De alarmlichten dienen enkel bij echte pech of om een dreigend gevaar te signaleren — nooit als excuus voor hinderlijk parkeren. De claxon waarschuwt dan weer voor gevaar of kondigt een inhaalmanoeuvre buiten de bebouwde kom aan; 's nachts maakt hij plaats voor een lichtsignaal, behalve bij nood.",
        },
      ],
      factIds: ['sp11-warnings', 'sp11-klaxon'],
      miniQuizQuestionIds: ['sp11-q2'],
    },
  ],
  summary: {
    fr: "Feux allumés dès que la visibilité descend sous 200 m. Warnings réservés aux vraies urgences. Klaxon pour avertir d'un danger — appels de phares la nuit.",
    nl: "Lichten aan zodra het zicht onder 200 m zakt. Alarmlichten voorbehouden voor echte noodgevallen. Claxon om te waarschuwen voor gevaar — lichtsignalen 's nachts.",
  },
}

const L18: Lesson = {
  slug: 'les-signaux-lumineux',
  themeSlug: 'signalisation-priorites',
  title: { fr: 'Les signaux lumineux', nl: 'De verkeerslichten' },
  intro: { fr: "Rouge, orange, vert, flèches : le code couleur des feux cache plus de nuances qu'il n'y paraît.", nl: 'Rood, oranje, groen, pijlen: de kleurcode van de lichten verbergt meer nuances dan het lijkt.' },
  objectives: [
    { fr: 'Interpréter chaque couleur correctement', nl: 'Elke kleur correct interpreteren' },
    { fr: 'Comprendre la flèche verte et les exceptions cyclistes', nl: 'De groene pijl en de fietsuitzonderingen begrijpen' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'sp18-c1-couleurs',
      title: { fr: 'Rouge, vert, orange : ce que chacun impose', nl: 'Rood, groen, oranje: wat elk kleur oplegt' },
      paragraphs: [
        {
          fr: "Un feu vert n'est pas un blanc-seing : il autorise à s'engager, mais seulement si le carrefour est réellement dégagé de l'autre côté. L'orange fixe impose de s'arrêter, sauf impossibilité de le faire en sécurité ; l'orange clignotant, lui, signale des feux en panne et remet en jeu les règles de priorité habituelles.",
          nl: 'Een groen licht is geen vrijgeleide: het staat toe om op te rijden, maar enkel als het kruispunt écht vrij is aan de overkant. Vast oranje verplicht te stoppen, tenzij dit niet meer veilig kan; knipperend oranje signaleert defecte lichten en herstelt de gewone voorrangsregels.',
        },
      ],
      factIds: ['sp18-feu-rouge-vert', 'sp18-feu-orange'],
      miniQuizQuestionIds: ['sp18-q1'],
    },
    {
      id: 'sp18-c2-flèches',
      title: { fr: 'Flèches et cas particuliers pour cyclistes', nl: 'Pijlen en bijzondere gevallen voor fietsers' },
      paragraphs: [
        {
          fr: "Une flèche verte à côté d'un feu rouge n'est pas une vraie priorité : tu peux avancer dans sa direction, mais en cédant le passage à tout le monde. Les panneaux B22 et B23 sous un feu, eux, autorisent spécifiquement les cyclistes et speed pedelecs à franchir un rouge ou un orange, toujours en cédant le passage.",
          nl: 'Een groene pijl naast een rood licht is geen echte voorrang: je mag in die richting rijden, maar met voorrang aan iedereen. De borden B22 en B23 onder een licht laten dan weer specifiek fietsers en speed pedelecs toe om door rood of oranje te rijden, steeds met voorrang aan anderen.',
        },
      ],
      factIds: ['sp18-fleche-verte-rouge', 'sp18-b22-b23'],
      miniQuizQuestionIds: ['sp18-q2'],
    },
  ],
  summary: {
    fr: "Vert = passer si le carrefour est dégagé. Orange fixe = s'arrêter (sauf impossibilité). Flèche verte sur feu rouge = avancer en cédant le passage à tous. B22/B23 = exception cycliste.",
    nl: 'Groen = rijden als het kruispunt vrij is. Vast oranje = stoppen (tenzij onmogelijk). Groene pijl bij rood = rijden met voorrang aan iedereen. B22/B23 = fietsuitzondering.',
  },
}

const L19: Lesson = {
  slug: 'les-signaux-relatifs-a-la-priorite',
  themeSlug: 'signalisation-priorites',
  title: { fr: 'Les signaux relatifs à la priorité', nl: 'De voorrangsborden' },
  intro: { fr: "Losange jaune, triangle sur pointe, STOP, rond-point : quatre familles de signaux, quatre logiques de priorité différentes.", nl: 'Gele ruit, driehoek op de punt, STOP, rotonde: vier soorten borden, vier verschillende voorrangslogica\'s.' },
  objectives: [
    { fr: 'Reconnaître une voie prioritaire et sa fin', nl: 'Een voorrangsweg en het einde ervan herkennen' },
    { fr: 'Distinguer cédez le passage, STOP et rond-point', nl: 'Voorrang verlenen, STOP en rotonde onderscheiden' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'sp19-c1-voie-prioritaire',
      title: { fr: 'La voie prioritaire', nl: 'De voorrangsweg' },
      paragraphs: [
        {
          fr: "Le losange jaune t'annonce que tu es prioritaire à tous les carrefours suivants — jusqu'à ce qu'un signal de fin te prévienne que tu vas bientôt devoir céder le passage. Sur une voie prioritaire, tu peux même dépasser par la gauche dans un carrefour si c'est sûr.",
          nl: 'De gele ruit vertelt je dat je voorrang hebt op alle volgende kruispunten — tot een einde-bord je waarschuwt dat je binnenkort voorrang zal moeten verlenen. Op een voorrangsweg mag je zelfs links inhalen in een kruispunt als het veilig kan.',
        },
      ],
      factIds: ['sp19-voie-prioritaire'],
      miniQuizQuestionIds: ['sp19-q1'],
    },
    {
      id: 'sp19-c2-stop-rondpoint',
      title: { fr: 'Céder le passage, STOP, rond-point', nl: 'Voorrang verlenen, STOP, rotonde' },
      paragraphs: [
        {
          fr: "Le triangle sur pointe t'oblige à céder le passage aux conducteurs de la voie que tu traverses, en t'arrêtant seulement si c'est nécessaire. Le STOP, lui, exige un arrêt total — même si la voie a l'air complètement libre. Dans un rond-point, la priorité va à ceux qui y sont déjà engagés, en venant de ta gauche.",
          nl: 'De driehoek op de punt verplicht je voorrang te verlenen aan bestuurders van de weg die je oversteekt, en enkel te stoppen als het nodig is. De STOP vereist dan weer een volledige stop — zelfs als de weg er helemaal vrij uitziet. In een rotonde gaat de voorrang naar wie er al op rijdt, komend van jouw linkerkant.',
        },
      ],
      factIds: ['sp19-triangle-stop', 'sp19-rond-point'],
      miniQuizQuestionIds: ['sp19-q2'],
    },
  ],
  summary: {
    fr: "Losange jaune = tu es prioritaire jusqu'au signal de fin. Triangle sur pointe = céder le passage, arrêt si nécessaire. STOP = arrêt obligatoire, toujours. Rond-point = priorité à qui y roule déjà.",
    nl: 'Gele ruit = jij hebt voorrang tot het einde-bord. Driehoek op de punt = voorrang verlenen, stoppen indien nodig. STOP = altijd verplicht stoppen. Rotonde = voorrang aan wie er al op rijdt.',
  },
}

const L20: Lesson = {
  slug: 'la-priorite-de-droite',
  themeSlug: 'signalisation-priorites',
  title: { fr: 'La priorité de droite', nl: 'De voorrang van rechts' },
  intro: { fr: "La règle par défaut de tous les carrefours belges, et ses exceptions bien réelles à connaître par cœur.", nl: 'De standaardregel van alle Belgische kruispunten, en de echte uitzonderingen die je uit het hoofd moet kennen.' },
  objectives: [
    { fr: "Appliquer la priorité de droite dans les cas simples", nl: 'De voorrang van rechts toepassen in eenvoudige gevallen' },
    { fr: "Connaître les exceptions où elle ne s'applique pas", nl: 'De uitzonderingen kennen waar ze niet geldt' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'sp20-c1-regle',
      title: { fr: 'La règle de base', nl: 'De basisregel' },
      paragraphs: [
        {
          fr: "Sans agent, feux ni panneaux, c'est toujours celui qui vient de droite qui passe en premier — qu'il continue tout droit, tourne à gauche ou à droite. Et même s'il ralentit ou s'arrête, il garde sa priorité : ce n'est pas à toi de t'engager en premier.",
          nl: 'Zonder agent, lichten of borden mag altijd wie van rechts komt eerst — of hij nu rechtdoor rijdt, links of rechts afslaat. En zelfs als hij vertraagt of stopt, behoudt hij zijn voorrang: het is niet aan jou om eerst te vertrekken.',
        },
      ],
      factIds: ['sp20-regle-generale'],
      miniQuizQuestionIds: ['sp20-q1'],
    },
    {
      id: 'sp20-c2-exceptions',
      title: { fr: "Les exceptions à connaître", nl: 'De uitzonderingen om te kennen' },
      paragraphs: [
        {
          fr: "La priorité de droite s'efface dans un rond-point (priorité au rond-point), face à un sentier ou chemin de terre, en quittant un accès privé ou une place de parking (le sortant cède toujours), ou si celui qui vient de droite roule en sens interdit. Un tram, lui, ignore complètement cette règle : il est toujours prioritaire.",
          nl: 'De voorrang van rechts vervalt in een rotonde (voorrang aan de rotonde), tegenover een pad of veldweg, bij het verlaten van een privé-oprit of parkeerplaats (wie vertrekt geeft altijd voorrang), of als wie van rechts komt in verboden richting rijdt. Een tram negeert deze regel volledig: hij heeft altijd voorrang.',
        },
      ],
      callouts: [
        {
          kind: 'attention',
          text: { fr: 'Quitter un stationnement ou un accès privé est une manœuvre : tu cèdes toujours le passage, même à quelqu’un venant de gauche.', nl: 'Een parkeerplaats of privéoprit verlaten is een manoeuvre: je verleent altijd voorrang, zelfs aan wie van links komt.' },
        },
      ],
      factIds: ['sp20-exceptions', 'sp20-tram-priorite'],
      miniQuizQuestionIds: ['sp20-q2'],
    },
  ],
  summary: {
    fr: "Par défaut : priorité à droite, même si ce conducteur ralentit. Exceptions : rond-point, sentier/chemin de terre, sortie d'accès privé ou de stationnement, sens interdit — et le tram, toujours prioritaire.",
    nl: 'Standaard: voorrang van rechts, ook als die bestuurder vertraagt. Uitzonderingen: rotonde, pad/veldweg, uitrit van privéoprit of parkeerplaats, verboden richting — en de tram, altijd voorrang.',
  },
}

const L23: Lesson = {
  slug: 'sens-interdits',
  themeSlug: 'signalisation-priorites',
  title: { fr: 'Sens interdits', nl: 'Verboden richtingen' },
  intro: { fr: "Un simple disque rouge peut cacher plusieurs règles différentes selon ce qu'il exclut vraiment.", nl: 'Een eenvoudige rode cirkel kan verschillende regels verbergen, afhankelijk van wat ze precies uitsluit.' },
  objectives: [
    { fr: 'Distinguer sens interdit à sens unique', nl: 'Verboden richting van eenrichtingsverkeer onderscheiden' },
    { fr: 'Comprendre les exceptions "circulation locale"', nl: 'De uitzonderingen "plaatselijk verkeer" begrijpen' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'sp23-c1-simple',
      title: { fr: 'Sens interdit, pas sens unique', nl: 'Verboden richting, geen eenrichtingsverkeer' },
      paragraphs: [
        {
          fr: "Un disque rouge à barre blanche interdit à tout le monde — cyclistes compris — de le franchir dans ce sens précis. Ne le confonds pas avec le signal bleu de sens unique, qui indique simplement dans quel sens roulent les autres.",
          nl: 'Een rode cirkel met witte balk verbiedt iedereen — ook fietsers — om ze in die specifieke richting over te steken. Verwar dit niet met het blauwe bord voor eenrichtingsverkeer, dat gewoon aangeeft in welke richting anderen rijden.',
        },
      ],
      factIds: ['sp23-sens-interdit-simple'],
      miniQuizQuestionIds: ['sp23-q1'],
    },
    {
      id: 'sp23-c2-double-exceptions',
      title: { fr: 'Interdit dans les deux sens, et ses exceptions', nl: 'Verboden in beide richtingen, en de uitzonderingen' },
      paragraphs: [
        {
          fr: "Sans flèche, ce même signal ferme la rue dans les deux sens. Le panneau « excepté circulation locale » y laisse entrer riverains, visiteurs et livreurs — mais jamais un candidat lors de son examen pratique, quelle que soit la raison.",
          nl: 'Zonder pijl sluit hetzelfde bord de straat in beide richtingen af. Het bord "uitgezonderd plaatselijk verkeer" laat er bewoners, bezoekers en leveranciers toe — maar nooit een kandidaat tijdens zijn praktijkexamen, om welke reden dan ook.',
        },
      ],
      factIds: ['sp23-sens-interdit-double', 'sp23-mec-demi-tour'],
      miniQuizQuestionIds: ['sp23-q2'],
    },
  ],
  summary: {
    fr: "Le sens interdit s'applique à tous, cyclistes compris. « Excepté circulation locale » n'autorise jamais un candidat à l'examen pratique. Un panneau anti-demi-tour n'interdit pas de tourner à gauche.",
    nl: 'Verboden richting geldt voor iedereen, ook fietsers. "Uitgezonderd plaatselijk verkeer" laat een examenkandidaat nooit toe. Een keerverbod verbiedt niet om links af te slaan.',
  },
}

const L24: Lesson = {
  slug: 'direction-obligatoire',
  themeSlug: 'signalisation-priorites',
  title: { fr: 'Direction obligatoire', nl: 'Verplichte rijrichting' },
  intro: { fr: "Un rond bleu à flèche ne dit pas toujours la même chose : indication ou obligation, la nuance compte.", nl: 'Een blauwe cirkel met pijl zegt niet altijd hetzelfde: aanwijzing of verplichting, de nuance telt.' },
  objectives: [
    { fr: 'Distinguer signal d’indication et signal d’obligation', nl: 'Aanwijzingsbord en gebodsbord onderscheiden' },
    { fr: 'Savoir contourner un îlot directionnel', nl: 'Weten hoe een verkeerseiland te omzeilen' },
  ],
  estimatedMinutes: 4,
  chapters: [
    {
      id: 'sp24-c1-obligation',
      title: { fr: 'Indication ou obligation ?', nl: 'Aanwijzing of verplichting?' },
      paragraphs: [
        {
          fr: "Deux panneaux presque identiques, deux significations bien différentes : le signal d'indication (flèche sur fond rectangulaire ou rond simple) t'informe qu'une voie est à sens unique ; le signal d'obligation (rond bleu à flèche) t'impose vraiment de suivre cette direction — sauf exemption explicite pour les cyclistes.",
          nl: 'Twee bijna identieke borden, twee heel verschillende betekenissen: het aanwijzingsbord (pijl op rechthoekige achtergrond of eenvoudige cirkel) informeert je dat een weg eenrichtingsverkeer heeft; het gebodsbord (blauwe cirkel met pijl) verplicht je écht die richting te volgen — tenzij uitdrukkelijke vrijstelling voor fietsers.',
        },
      ],
      factIds: ['sp24-obligation-vs-indication'],
      miniQuizQuestionIds: ['sp24-q1'],
    },
    {
      id: 'sp24-c2-ilot',
      title: { fr: 'L’îlot directionnel', nl: 'Het verkeerseiland' },
      paragraphs: [
        {
          fr: "Un îlot directionnel — peint ou construit — se contourne toujours par la droite. Impossible d'y circuler, de s'y arrêter ou d'y stationner, qu'il soit matérialisé par de la peinture ou du béton.",
          nl: 'Een verkeerseiland — geschilderd of aangelegd — omzeil je altijd langs rechts. Onmogelijk om erop te rijden, te stoppen of te parkeren, of het nu met verf of beton is aangeduid.',
        },
      ],
      factIds: ['sp24-ilot'],
      miniQuizQuestionIds: ['sp24-q2'],
    },
  ],
  summary: {
    fr: "Un signal d'indication informe (sens unique) ; un signal d'obligation impose une direction. Un îlot directionnel se contourne toujours par la droite, sans jamais y circuler.",
    nl: 'Een aanwijzingsbord informeert (eenrichtingsverkeer); een gebodsbord legt een richting op. Een verkeerseiland omzeil je altijd langs rechts, zonder er ooit op te rijden.',
  },
}

export const SIGNALISATION_PRIORITES_LESSONS: Lesson[] = [L11, L18, L19, L20, L23, L24]
