import type { Lesson } from '@/domain/content'

/**
 * Leçons complémentaires du thème "voie-publique", couvrant les PDF
 * 2 (bandes de circulation), 3 (cyclistes), 6 (lieux particuliers),
 * 7 (piétons), 8 (conducteurs), 17 (personnes qualifiées), 22 (tram-bus).
 * Même principe que lesson.ts : reformulation originale à partir des faits
 * vérifiés de facts.ts (jamais une copie du PDF).
 */

const LESSON_2: Lesson = {
  slug: 'les-bandes-de-circulation',
  themeSlug: 'voie-publique',
  title: { fr: 'Les bandes de circulation', nl: 'De rijstroken' },
  intro: {
    fr: "Une chaussée divisée en plusieurs bandes a ses propres règles : où rouler, comment dépasser, et que faire quand une bande disparaît devant toi.",
    nl: 'Een rijbaan die in meerdere rijstroken is verdeeld, heeft haar eigen regels: waar rijden, hoe inhalen, en wat doen als een strook plots stopt.',
  },
  objectives: [
    { fr: 'Savoir sur quelle bande rouler et où dépasser', nl: 'Weten op welke strook je rijdt en waar je mag inhalen' },
    { fr: 'Appliquer correctement le principe de la tirette', nl: 'Het ritssluitingsprincipe correct toepassen' },
    { fr: "Connaître les règles de la bande de bus et de la zone d'évitement", nl: 'De regels van de busstrook en de vermijdingszone kennen' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'vp2-c1-bandes',
      title: { fr: 'Rouler et dépasser sur les bandes', nl: 'Rijden en inhalen op de rijstroken' },
      paragraphs: [
        {
          fr: "Quand la chaussée est divisée en bandes par un marquage, la règle de base ne change pas : tu roules à droite. Près des carrefours, des flèches peintes t'indiquent la direction à suivre une fois dans le carrefour — tu peux choisir ta bande avant, mais plus dans le carrefour.",
          nl: 'Wanneer de rijbaan door markering in stroken is verdeeld, blijft de basisregel dezelfde: je rijdt rechts. Bij kruispunten geven geschilderde pijlen de richting aan die je in het kruispunt moet volgen — je kiest je strook ervoor, maar niet meer erin.',
        },
        {
          fr: "Pour dépasser, une ligne discontinue peut être franchie ; une ligne continue jamais, pour quelque raison que ce soit. Si les deux sont peintes côte à côte, c'est celle de ton côté qui compte.",
          nl: 'Om in te halen mag je een onderbroken lijn oversteken; een doorlopende lijn nooit, om welke reden dan ook. Als beide naast elkaar staan, telt de lijn aan jouw kant.',
        },
      ],
      callouts: [
        {
          kind: 'attention',
          text: { fr: 'Une ligne continue reste infranchissable même pour entrer dans une propriété privée.', nl: 'Een doorlopende lijn blijft onoverschrijdbaar, zelfs om een privé-eigendom binnen te rijden.' },
        },
      ],
      factIds: ['vp2-bandes-def', 'vp2-lignes-depassement'],
      miniQuizQuestionIds: ['vp2-q1'],
    },
    {
      id: 'vp2-c2-tirette-bus',
      title: { fr: 'La tirette, la bande de bus, la zone d’évitement', nl: 'De ritssluiting, de busstrook, de vermijdingszone' },
      paragraphs: [
        {
          fr: "Quand une bande se termine et que la circulation est fortement ralentie, le principe de la tirette s'applique : on s'intercale juste avant le rétrécissement, chacun son tour. Ce n'est pas une manœuvre au sens légal, mais un passage obligatoire à tour de rôle.",
          nl: 'Als een strook stopt en het verkeer sterk vertraagt, geldt het ritssluitingsprincipe: je voegt pas net vóór de versmalling in, om beurten. Dit is geen manoeuvre in juridische zin, maar een verplichte beurtelingse doorgang.',
        },
        {
          fr: "La bande de bus et la zone d'évitement (larges hachures diagonales) ne font pas partie de la chaussée : ni circulation, ni arrêt, ni stationnement en voiture, sauf exceptions ponctuelles (changer de direction près d'un carrefour, contourner un obstacle).",
          nl: 'De busstrook en de vermijdingszone (brede diagonale arcering) maken geen deel uit van de rijbaan: geen rijden, stoppen of parkeren met de auto, behalve punctuele uitzonderingen (van richting veranderen bij een kruispunt, een obstakel omzeilen).',
        },
      ],
      factIds: ['vp2-tirette', 'vp2-bande-bus', 'vp2-zone-evitement-travaux'],
      miniQuizQuestionIds: ['vp2-q2'],
    },
  ],
  summary: {
    fr: "Sur une chaussée à bandes : reste à droite, ne dépasse jamais une ligne continue, applique la tirette lettre par lettre en cas de rétrécissement, et laisse la bande de bus et la zone d'évitement aux véhicules qui y ont vraiment droit.",
    nl: 'Op een rijbaan met stroken: blijf rechts, steek nooit een doorlopende lijn over, pas de ritssluiting nauwgezet toe bij een versmalling, en laat de busstrook en de vermijdingszone over aan wie er echt recht op heeft.',
  },
}

const LESSON_3: Lesson = {
  slug: 'cyclistes-piste-et-zone-cyclable',
  themeSlug: 'voie-publique',
  title: { fr: 'Cyclistes, piste et zone cyclable', nl: 'Fietsers, fietspad en fietszone' },
  intro: {
    fr: "Pistes cyclables, zones cyclables, groupes de cyclistes : ce que tu dois savoir pour partager la route intelligemment avec les vélos.",
    nl: 'Fietspaden, fietszones, groepen fietsers: wat je moet weten om de weg slim te delen met fietsers.',
  },
  objectives: [
    { fr: 'Distinguer piste cyclable, bande suggérée et zone cyclable', nl: 'Fietspad, gesuggereerde fietsstrook en fietszone onderscheiden' },
    { fr: "Savoir qui doit utiliser la piste cyclable, et quand", nl: 'Weten wie het fietspad moet gebruiken, en wanneer' },
    { fr: 'Connaître les règles de priorité liées aux cyclistes', nl: 'De voorrangsregels met betrekking tot fietsers kennen' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'vp3-c1-piste',
      title: { fr: 'La piste cyclable, pas la chaussée', nl: 'Het fietspad, niet de rijbaan' },
      paragraphs: [
        {
          fr: "Une piste cyclable est une partie de la voie publique à part entière, distincte de la chaussée. Une voiture ne peut ni y circuler ni s'y arrêter ou stationner — seulement la traverser pour changer de direction. Si elle existe, le cycliste est obligé de l'emprunter, sauf si elle est impraticable.",
          nl: 'Een fietspad is een volwaardig onderdeel van de openbare weg, los van de rijbaan. Een auto mag er niet op rijden, stoppen of parkeren — enkel oversteken om van richting te veranderen. Als het fietspad bestaat, moet de fietser het gebruiken, tenzij het onbruikbaar is.',
        },
        {
          fr: "En agglomération, le vélo sur le trottoir est interdit — sauf pour les enfants de moins de 10 ans (bientôt 12). Hors agglomération, tous les cyclistes peuvent utiliser le trottoir ou l'accotement en saillie s'il n'y a pas de piste, en restant à droite.",
          nl: 'In de bebouwde kom is fietsen op het voetpad verboden — behalve voor kinderen jonger dan 10 jaar (binnenkort 12). Buiten de bebouwde kom mogen alle fietsers het voetpad of de verhoogde berm gebruiken als er geen fietspad is, en blijven ze rechts.',
        },
      ],
      examples: [
        {
          fr: "Une trottinette électrique qui roule à 20 km/h est légalement traitée comme un cycliste — elle doit donc, elle aussi, emprunter la piste cyclable si elle existe.",
          nl: 'Een elektrische step die 20 km/u rijdt, wordt wettelijk als fietser behandeld — ook zij moet dus het fietspad gebruiken als het bestaat.',
        },
      ],
      factIds: ['vp3-piste-cyclable-def', 'vp3-cyclistes-trottoir', 'vp3-assimiles-cyclistes'],
      miniQuizQuestionIds: ['vp3-q1'],
    },
    {
      id: 'vp3-c2-passage-fin-piste',
      title: { fr: 'Passage pour cyclistes et fin de piste', nl: 'Fietsoversteek en einde fietspad' },
      paragraphs: [
        {
          fr: "Sur un passage pour cyclistes, la logique est en deux temps : le cycliste cède le passage pour s'y engager, puis a priorité une fois engagé. Impossible de s'y arrêter, d'y stationner, ou de dépasser un véhicule qui ralentit devant.",
          nl: 'Op een fietsoversteek geldt een logica in twee tijden: de fietser geeft eerst voorrang om zich erop te begeven, en heeft daarna voorrang eens hij erop rijdt. Onmogelijk om er te stoppen, te parkeren, of een voertuig in te halen dat ervoor vertraagt.',
        },
        {
          fr: "Symétriquement, quand une piste cyclable s'arrête et que le cycliste doit revenir sur la chaussée, c'est lui qui a la priorité à ce moment précis — les voitures doivent lui céder le passage.",
          nl: 'Omgekeerd, wanneer een fietspad stopt en de fietser terug op de rijbaan moet komen, heeft hij op dat precieze moment voorrang — auto\'s moeten hem voorrang geven.',
        },
      ],
      factIds: ['vp3-passage-cyclistes', 'vp3-bande-suggeree-fin-piste'],
      miniQuizQuestionIds: ['vp3-q2'],
    },
    {
      id: 'vp3-c3-groupe-zone',
      title: { fr: 'Groupes de cyclistes et zone cyclable', nl: 'Groepen fietsers en fietszone' },
      paragraphs: [
        {
          fr: "Un groupe de 15 à 150 cyclotouristes peut rouler à deux de front sur la chaussée, sans utiliser la piste cyclable, encadré par un véhicule d'escorte. Dans une zone cyclable, les cyclistes sont prioritaires et les voitures — de simples « invitées » — ne peuvent pas les dépasser ; la vitesse y est limitée à 30 km/h.",
          nl: 'Een groep van 15 tot 150 fietstoeristen mag naast elkaar op de rijbaan rijden, zonder het fietspad te gebruiken, begeleid door een escortevoertuig. In een fietszone hebben fietsers voorrang en mogen auto\'s — louter "gasten" — hen niet inhalen; de snelheid is er beperkt tot 30 km/u.',
        },
      ],
      factIds: ['vp3-groupe-cyclistes', 'vp3-zone-cyclable'],
      miniQuizQuestionIds: ['vp3-q3'],
    },
  ],
  summary: {
    fr: "La piste cyclable n'est pas la chaussée : les voitures n'y ont pas accès. Le cycliste cède le passage pour s'engager sur un passage cycliste mais y est ensuite prioritaire, et retrouve la priorité en fin de piste. Dans une zone cyclable, c'est le vélo qui donne le rythme.",
    nl: 'Het fietspad is niet de rijbaan: auto\'s hebben er geen toegang. De fietser geeft voorrang om zich op een fietsoversteek te begeven, maar heeft er daarna voorrang, en krijgt opnieuw voorrang aan het einde van het fietspad. In een fietszone bepaalt de fiets het tempo.',
  },
}

const LESSON_6: Lesson = {
  slug: 'lieux-particuliers',
  themeSlug: 'voie-publique',
  title: { fr: 'Lieux particuliers', nl: 'Bijzondere plaatsen' },
  intro: {
    fr: "Agglomération, zone résidentielle, rue scolaire, chemin réservé... la Belgique multiplie les zones à règles spécifiques. Voici comment les reconnaître et t'y comporter.",
    nl: 'Bebouwde kom, woonerf, schoolstraat, voorbehouden weg... België kent veel zones met eigen regels. Zo herken je ze en gedraag je je er correct.',
  },
  objectives: [
    { fr: 'Connaître la vitesse maximale selon le type de zone', nl: 'De maximumsnelheid per type zone kennen' },
    { fr: "Distinguer zone résidentielle, rue scolaire et chemin réservé", nl: 'Woonerf, schoolstraat en voorbehouden weg onderscheiden' },
    { fr: 'Comprendre les règles du site spécial franchissable (SSF)', nl: 'De regels van de bijzondere overrijdbare bedding (BOB) begrijpen' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'vp6-c1-agglo',
      title: { fr: "L'agglomération, une question de signal", nl: 'De bebouwde kom, een kwestie van verkeersbord' },
      paragraphs: [
        {
          fr: "Une agglomération commence et finit là où le signal le dit — pas au premier ou dernier bâtiment que tu aperçois. Le panneau jaune à bord rouge avec un nom de commune n'a aucune valeur pour le Code de la route : c'est une limite purement administrative.",
          nl: 'Een bebouwde kom begint en eindigt waar het bord het zegt — niet bij het eerste of laatste gebouw dat je ziet. Het gele bord met rode rand en een gemeentenaam heeft geen enkele waarde voor de wegcode: het is een zuiver administratieve grens.',
        },
      ],
      table: {
        caption: { fr: 'Vitesse maximale en agglomération, par région', nl: 'Maximumsnelheid in de bebouwde kom, per regio' },
        rows: [
          {
            label: { fr: 'En agglomération', nl: 'In de bebouwde kom' },
            valuesByRegion: {
              WALLONIE: { fr: '50 km/h', nl: '50 km/u' },
              BRUXELLES: { fr: '30 km/h', nl: '30 km/u' },
              FLANDRE: { fr: '50 km/h', nl: '50 km/u' },
            },
          },
        ],
      },
      callouts: [
        {
          kind: 'attention',
          text: { fr: 'Dépasser de plus de 20 km/h la vitesse autorisée en agglomération peut entraîner un retrait immédiat du permis.', nl: 'Meer dan 20 km/u sneller rijden dan toegelaten in de bebouwde kom kan leiden tot onmiddellijke intrekking van het rijbewijs.' },
        },
      ],
      factIds: ['vp6-agglo-vitesse', 'vp6-agglo-vitesse-bruxelles'],
      miniQuizQuestionIds: ['vp6-q1'],
    },
    {
      id: 'vp6-c2-zones',
      title: { fr: 'Zone résidentielle et rue réservée au jeu', nl: 'Woonerf en speelstraat' },
      paragraphs: [
        {
          fr: "Dans une zone résidentielle, les piétons — mais pas les cyclistes — peuvent occuper toute la largeur de la rue, les enfants peuvent y jouer, et la vitesse est plafonnée à 20 km/h. Une rue réservée au jeu va plus loin : elle est quasi fermée à la circulation, réservée aux riverains, aux véhicules autorisés et aux cyclistes, à l'allure du pas.",
          nl: 'In een woonerf mogen voetgangers — maar geen fietsers — de hele breedte van de straat gebruiken, mogen kinderen er spelen, en is de snelheid beperkt tot 20 km/u. Een speelstraat gaat verder: ze is bijna gesloten voor verkeer, voorbehouden aan bewoners, toegelaten voertuigen en fietsers, aan stapvoets.',
        },
      ],
      factIds: ['vp6-zone-residentielle', 'vp6-rue-jeu-zone'],
      miniQuizQuestionIds: ['vp6-q2'],
    },
    {
      id: 'vp6-c3-ecole-ssf',
      title: { fr: 'Abords d’école, rue scolaire, SSF', nl: 'Schoolomgeving, schoolstraat, BOB' },
      paragraphs: [
        {
          fr: "Les « abords d'école » nécessitent la présence des deux signaux ensemble : « présence possible d'enfants » ET « zone 30 ». La rue scolaire, elle, ferme carrément l'accès aux voitures à certaines heures — seuls les riverains peuvent en sortir, jamais y entrer pendant ces heures.",
          nl: 'De "schoolomgeving" vereist de aanwezigheid van beide borden samen: "mogelijke aanwezigheid van kinderen" ÉN "zone 30". De schoolstraat sluit dan weer volledig af voor auto\'s op bepaalde uren — enkel bewoners mogen ze verlaten, nooit binnenrijden tijdens die uren.',
        },
        {
          fr: "Le site spécial franchissable (SSF), réservé aux trams et bus, ne fait pas partie de la chaussée : une voiture ne peut y circuler que pour contourner un obstacle, traverser un carrefour, ou accéder à une propriété.",
          nl: 'De bijzondere overrijdbare bedding (BOB), voorbehouden aan trams en bussen, maakt geen deel uit van de rijbaan: een auto mag er enkel op rijden om een obstakel te omzeilen, een kruispunt over te steken, of een eigendom te bereiken.',
        },
      ],
      factIds: ['vp6-abords-ecole-scolaire', 'vp6-chemin-reserve-ssf'],
      miniQuizQuestionIds: ['vp6-q3'],
    },
  ],
  summary: {
    fr: "Chaque zone a sa propre vitesse : 50 km/h en agglomération (30 à Bruxelles), 20 dans une zone résidentielle, 30 dans une zone cyclable ou un chemin réservé. Les abords d'école exigent deux signaux, la rue scolaire ferme carrément l'accès, et le SSF reste réservé aux trams et bus.",
    nl: 'Elke zone heeft haar eigen snelheid: 50 km/u in de bebouwde kom (30 in Brussel), 20 in een woonerf, 30 in een fietszone of voorbehouden weg. De schoolomgeving vereist twee borden, de schoolstraat sluit de toegang gewoon af, en de BOB blijft voorbehouden aan trams en bussen.',
  },
}

const LESSON_7: Lesson = {
  slug: 'les-pietons',
  themeSlug: 'voie-publique',
  title: { fr: 'Les piétons', nl: 'De voetgangers' },
  intro: {
    fr: "Qui est vraiment un piéton, où et comment traverser, quelle priorité leur accorder : la base du respect mutuel entre conducteurs et piétons.",
    nl: 'Wie is echt een voetganger, waar en hoe oversteken, welke voorrang hen geven: de basis van wederzijds respect tussen bestuurders en voetgangers.',
  },
  objectives: [
    { fr: 'Savoir qui est légalement considéré comme piéton', nl: 'Weten wie wettelijk als voetganger geldt' },
    { fr: "Connaître la priorité des piétons sur et hors passage", nl: 'De voorrang van voetgangers op en naast een oversteekplaats kennen' },
    { fr: "Réagir correctement à un transport scolaire", nl: 'Correct reageren op schoolvervoer' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'vp7-c1-def',
      title: { fr: 'Qui est un piéton ?', nl: 'Wie is een voetganger?' },
      paragraphs: [
        {
          fr: "La règle est plus subtile qu'il n'y paraît : celui qui pousse un vélo ou un cyclomoteur reste un piéton, mais celui qui pousse une moto ou une voiture devient conducteur — avec les obligations qui vont avec (casque compris pour la moto).",
          nl: 'De regel is subtieler dan ze lijkt: wie een fiets of bromfiets duwt, blijft een voetganger, maar wie een motor of auto duwt, wordt bestuurder — met de bijhorende verplichtingen (helm inbegrepen voor de motor).',
        },
      ],
      examples: [
        {
          fr: "Une personne qui traverse en tenant son vélo à la main est un piéton et bénéficie de la priorité piétonne. Si elle traverse en pédalant, elle devient cycliste et doit, elle, céder le passage.",
          nl: 'Iemand die oversteekt terwijl hij zijn fiets vasthoudt, is een voetganger en geniet voorrang als voetganger. Als hij fietsend oversteekt, wordt hij fietser en moet hij zelf voorrang verlenen.',
        },
      ],
      factIds: ['vp7-usagers-pietons-def'],
      miniQuizQuestionIds: ['vp7-q1'],
    },
    {
      id: 'vp7-c2-priorite',
      title: { fr: 'La priorité sur et hors passage', nl: 'Voorrang op en naast de oversteekplaats' },
      paragraphs: [
        {
          fr: "Sur un passage pour piétons — ou à moins de 20 m d'un passage disponible — le piéton a toujours la priorité, même s'il n'a pas encore mis le pied sur la chaussée mais s'apprête à le faire. Sans passage à proximité, c'est l'inverse : le piéton doit céder le passage et traverser vite et perpendiculairement.",
          nl: 'Op een oversteekplaats — of binnen 20 m van een beschikbare oversteekplaats — heeft de voetganger altijd voorrang, zelfs als hij nog niet op de rijbaan staat maar op het punt staat dit te doen. Zonder oversteekplaats in de buurt geldt het omgekeerde: de voetganger moet voorrang verlenen en snel en loodrecht oversteken.',
        },
      ],
      callouts: [
        {
          kind: 'retenir',
          text: { fr: 'Redouble toujours de prudence face à des enfants, des personnes âgées ou à mobilité réduite — sur ou hors passage.', nl: 'Wees altijd extra voorzichtig bij kinderen, ouderen of personen met beperkte mobiliteit — op of naast de oversteekplaats.' },
        },
      ],
      factIds: ['vp7-passage-pietons-priorite', 'vp7-arret-passage-pietons'],
      miniQuizQuestionIds: ['vp7-q2'],
    },
  ],
  summary: {
    fr: "Un piéton qui pousse un vélo reste piéton, qui pousse une moto devient conducteur. Sur un passage, le piéton a toujours priorité. Redouble de prudence près d'un transport scolaire aux feux allumés.",
    nl: 'Een voetganger die een fiets duwt, blijft voetganger; wie een motor duwt, wordt bestuurder. Op een oversteekplaats heeft de voetganger altijd voorrang. Wees extra voorzichtig bij schoolvervoer met knipperende lichten.',
  },
}

const LESSON_8: Lesson = {
  slug: 'les-conducteurs-de-vehicules',
  themeSlug: 'voie-publique',
  title: { fr: 'Les conducteurs de véhicules', nl: 'De bestuurders van voertuigen' },
  intro: {
    fr: "Une distinction discrète mais essentielle dans tout le Code : la différence entre « usagers » et « conducteurs ».",
    nl: 'Een discreet maar essentieel onderscheid doorheen de hele wegcode: het verschil tussen "weggebruikers" en "bestuurders".',
  },
  objectives: [
    { fr: 'Savoir qui est légalement un conducteur', nl: 'Weten wie wettelijk een bestuurder is' },
    { fr: "Comprendre la différence entre « usagers » et « conducteurs »", nl: 'Het verschil begrijpen tussen "weggebruikers" en "bestuurders"' },
  ],
  estimatedMinutes: 4,
  chapters: [
    {
      id: 'vp8-c1-def',
      title: { fr: 'Qui est un conducteur ?', nl: 'Wie is een bestuurder?' },
      paragraphs: [
        {
          fr: "Un conducteur, c'est toute personne qui conduit un véhicule — avec ou sans moteur — mais aussi celui qui mène ou surveille des animaux de trait, de charge ou une monture sur la voie publique. Un cavalier est donc un conducteur, tout comme le fermier qui accompagne ses vaches sur la route.",
          nl: 'Een bestuurder is elke persoon die een voertuig bestuurt — met of zonder motor — maar ook wie trek- of lastdieren of een rijdier op de openbare weg leidt of begeleidt. Een ruiter is dus een bestuurder, net als de boer die zijn koeien over de weg begeleidt.',
        },
      ],
      factIds: ['vp8-conducteur-def'],
      miniQuizQuestionIds: ['vp8-q1'],
    },
    {
      id: 'vp8-c2-vocabulaire',
      title: { fr: 'Un vocabulaire à connaître par cœur', nl: 'Een woordenschat die je uit het hoofd moet kennen' },
      paragraphs: [
        {
          fr: "Dans la suite du cours, « usagers » désignera toujours piétons + conducteurs ensemble, tandis que « conducteurs » seul exclura les piétons. Une phrase comme « céder le passage aux conducteurs » ne concerne donc jamais les piétons — mais « céder le passage aux usagers » les inclut.",
          nl: 'Verderop in de cursus duidt "weggebruikers" altijd voetgangers + bestuurders samen aan, terwijl "bestuurders" alleen de voetgangers uitsluit. Een zin als "voorrang verlenen aan bestuurders" betreft dus nooit voetgangers — maar "voorrang verlenen aan weggebruikers" omvat hen wel.',
        },
      ],
      callouts: [
        {
          kind: 'attention',
          text: { fr: "Ce vocabulaire piège souvent à l'examen — relis toujours si la règle parle d'« usagers » ou de « conducteurs ».", nl: 'Deze woordenschat is een veelvoorkomende valstrik op het examen — lees altijd goed of de regel het over "weggebruikers" of "bestuurders" heeft.' },
        },
      ],
      factIds: ['vp8-permis-b-vehicules'],
      miniQuizQuestionIds: ['vp8-q2'],
    },
  ],
  summary: {
    fr: "Un conducteur, c'est celui qui conduit un véhicule OU qui mène un animal sur la voie publique. « Usagers » = piétons + conducteurs ; « conducteurs » seul exclut les piétons — cette nuance change le sens de nombreuses règles.",
    nl: 'Een bestuurder is wie een voertuig bestuurt OF een dier op de openbare weg leidt. "Weggebruikers" = voetgangers + bestuurders; "bestuurders" alleen sluit voetgangers uit — deze nuance verandert de betekenis van veel regels.',
  },
}

const LESSON_17: Lesson = {
  slug: 'injonctions-de-personnes-qualifiees',
  themeSlug: 'voie-publique',
  title: { fr: 'Injonctions de personnes qualifiées', nl: 'Bevelen van bevoegde personen' },
  intro: {
    fr: "Bras levés, torche rouge, sifflet, feu bleu... apprends à lire le langage gestuel de la route et à savoir qui a vraiment le pouvoir de t'arrêter.",
    nl: 'Opgeheven armen, rode zaklamp, fluitsignaal, blauw licht... leer de gebarentaal van de weg lezen en weet wie écht het gezag heeft om je te doen stoppen.',
  },
  objectives: [
    { fr: "Interpréter les gestes d'un agent qualifié", nl: 'De gebaren van een bevoegde agent interpreteren' },
    { fr: 'Distinguer agents qualifiés et personnes simplement autorisées', nl: 'Bevoegde agenten en louter gemachtigde personen onderscheiden' },
    { fr: "Connaître l'ordre hiérarchique des règles de circulation", nl: 'De hiërarchische volgorde van de verkeersregels kennen' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'vp17-c1-gestes',
      title: { fr: "Les gestes de l'agent", nl: 'De gebaren van de agent' },
      paragraphs: [
        {
          fr: "Bras levé verticalement : tout le monde s'arrête. Bras tendu(s) horizontalement : ceux qui font face au ventre ou au dos de l'agent s'arrêtent, ceux qui arrivent de son côté peuvent passer. Une torche rouge balancée équivaut à un arrêt ; le sifflet, lui, ne fait qu'attirer l'attention avant une injonction.",
          nl: 'Verticaal opgeheven arm: iedereen stopt. Horizontaal uitgestrekte arm(en): wie de buik of rug van de agent voor zich heeft, stopt; wie van zijn kant komt, mag doorrijden. Een heen-en-weer bewegende rode zaklamp betekent stoppen; het fluitsignaal trekt enkel de aandacht vóór een bevel.',
        },
      ],
      factIds: ['vp17-bras-agent', 'vp17-torche-sifflet'],
      miniQuizQuestionIds: ['vp17-q1'],
    },
    {
      id: 'vp17-c2-hierarchie',
      title: { fr: 'Qui a vraiment autorité, et dans quel ordre', nl: 'Wie heeft echt gezag, en in welke volgorde' },
      paragraphs: [
        {
          fr: "Un capitaine de route ou un signaleur peut donner des indications, mais n'est pas un agent qualifié : pas d'injonction officielle, pas de procès-verbal. Face à un vrai agent, l'ordre est strict : ses injonctions passent avant les feux, qui passent avant les panneaux, qui passent avant les règles générales.",
          nl: 'Een wegkapitein of seingever mag aanwijzingen geven, maar is geen bevoegde agent: geen officieel bevel, geen proces-verbaal. Tegenover een echte agent geldt een strikte volgorde: zijn bevelen gaan vóór de lichten, die vóór de borden gaan, die vóór de algemene regels gaan.',
        },
      ],
      examples: [
        {
          fr: "Une ambulance sirène hurlante doit quand même s'arrêter si un agent le lui ordonne : les injonctions priment sur tout, même sur un véhicule prioritaire.",
          nl: 'Een ambulance met loeiende sirene moet toch stoppen als een agent het beveelt: bevelen gaan boven alles, zelfs boven een prioritair voertuig.',
        },
      ],
      factIds: ['vp17-personnes-autorisees', 'vp17-vehicules-prioritaires', 'vp17-ordre-hierarchique'],
      miniQuizQuestionIds: ['vp17-q2'],
    },
  ],
  summary: {
    fr: "Bras vertical = tout le monde stoppe ; bras horizontal = stop pour ceux qui font face à l'agent. Les injonctions d'un agent qualifié priment toujours sur les feux, panneaux et règles générales — même face à un véhicule prioritaire toutes sirènes dehors.",
    nl: 'Verticale arm = iedereen stopt; horizontale arm = stop voor wie de agent recht voor zich heeft. Bevelen van een bevoegde agent gaan altijd boven lichten, borden en algemene regels — zelfs tegenover een prioritair voertuig met loeiende sirene.',
  },
}

const LESSON_22: Lesson = {
  slug: 'tram-et-bus',
  themeSlug: 'voie-publique',
  title: { fr: 'Tram et bus', nl: 'Tram en bus' },
  intro: {
    fr: "Passages à niveau, sites réservés, bandes bus : les transports en commun ont leurs propres espaces et leurs propres priorités sur la voie publique.",
    nl: 'Overwegen, voorbehouden beddingen, busstroken: het openbaar vervoer heeft zijn eigen ruimtes en eigen voorrang op de openbare weg.',
  },
  objectives: [
    { fr: 'Réagir correctement à un passage à niveau', nl: 'Correct reageren op een overweg' },
    { fr: 'Comprendre les règles du site spécial franchissable', nl: 'De regels van de bijzondere overrijdbare bedding begrijpen' },
    { fr: 'Connaître la priorité absolue du tram et celle du bus qui redémarre', nl: 'De absolute voorrang van de tram en die van de vertrekkende bus kennen' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'vp22-c1-niveau',
      title: { fr: 'Le passage à niveau', nl: 'De overweg' },
      paragraphs: [
        {
          fr: "Un feu blanc lunaire clignotant t'autorise à traverser un passage à niveau ; des feux rouges clignotants ou un signal sonore l'interdisent formellement. S'engager pendant que les barrières bougent encore est une infraction grave — un train ne dévie jamais sa trajectoire et ne s'arrête pas en quelques mètres.",
          nl: 'Een knipperend wit maanlicht geeft je toestemming om een overweg over te steken; knipperende rode lichten of een geluidssignaal verbieden het formeel. Oprijden terwijl de slagbomen nog bewegen is een zware overtreding — een trein wijkt nooit af van zijn baan en stopt niet op enkele meters.',
        },
      ],
      factIds: ['vp22-passage-a-niveau'],
      miniQuizQuestionIds: ['vp22-q1'],
    },
    {
      id: 'vp22-c2-ssf',
      title: { fr: 'Le site spécial franchissable', nl: 'De bijzondere overrijdbare bedding' },
      paragraphs: [
        {
          fr: "Le SSF, réservé aux trams et à certains bus, ne fait pas partie de la chaussée. Une voiture ne peut y circuler que pour contourner un obstacle, traverser un carrefour ou accéder à une propriété — jamais pour y rouler tranquillement.",
          nl: 'De BOB, voorbehouden aan trams en bepaalde bussen, maakt geen deel uit van de rijbaan. Een auto mag er enkel op rijden om een obstakel te omzeilen, een kruispunt over te steken of een eigendom te bereiken — nooit om er gewoon te rijden.',
        },
      ],
      factIds: ['vp22-ssf-tram-bus'],
      miniQuizQuestionIds: ['vp22-q2'],
    },
    {
      id: 'vp22-c3-priorites',
      title: { fr: 'Priorité du tram et du bus', nl: 'Voorrang van tram en bus' },
      paragraphs: [
        {
          fr: "Le tram échappe aux règles générales de circulation : il a toujours la priorité, et ne doit respecter que les agents et les feux. La bande bus lui est réservée (interdite aux voitures, sauf exceptions ponctuelles), et en agglomération, tu dois céder le passage à un bus qui quitte son arrêt dès qu'il met son clignotant gauche.",
          nl: 'De tram ontsnapt aan de algemene verkeersregels: hij heeft altijd voorrang en moet enkel agenten en lichten respecteren. De busstrook is aan hem voorbehouden (verboden voor auto\'s, op punctuele uitzonderingen na), en in de bebouwde kom moet je voorrang geven aan een bus die zijn halte verlaat zodra hij links knippert.',
        },
      ],
      factIds: ['vp22-tram-priorite', 'vp22-bande-arret-bus', 'vp22-priorite-bus-agglo'],
      miniQuizQuestionIds: ['vp22-q3'],
    },
  ],
  summary: {
    fr: "Feu blanc lunaire = passage autorisé, feux rouges/signal sonore = arrêt obligatoire. Le SSF n'est pas pour les voitures. Le tram a toujours priorité, et en agglomération, cède le passage au bus qui redémarre.",
    nl: 'Wit knipperend maanlicht = doorgang toegelaten, rode lichten/geluidssignaal = verplicht stoppen. De BOB is niet voor auto\'s. De tram heeft altijd voorrang, en in de bebouwde kom geef je voorrang aan de vertrekkende bus.',
  },
}

export const VOIE_PUBLIQUE_LESSONS_MORE: Lesson[] = [LESSON_2, LESSON_3, LESSON_6, LESSON_7, LESSON_8, LESSON_17, LESSON_22]
