import type { Lesson } from '@/domain/content'

const L4: Lesson = {
  slug: 'lautoroute',
  themeSlug: 'circulation-vitesse',
  title: { fr: "L'autoroute", nl: 'De snelweg' },
  intro: {
    fr: "Ni feux ni carrefours, mais des règles bien à elle : vitesse, bande d'arrêt d'urgence, couloir de secours. Voici ce qui change sur autoroute.",
    nl: 'Geen lichten, geen kruispunten, maar wel eigen regels: snelheid, pechstrook, hulpstrook. Dit verandert er op de snelweg.',
  },
  objectives: [
    { fr: 'Connaître les vitesses min et max sur autoroute', nl: 'De min. en max. snelheid op de snelweg kennen' },
    { fr: "Savoir utiliser (ou pas) la bande d'arrêt d'urgence", nl: 'Weten wanneer je de pechstrook wel of niet mag gebruiken' },
    { fr: 'Former un couloir de secours correctement', nl: 'Correct een hulpstrook vormen' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'cv4-c1-vitesse',
      title: { fr: 'Vitesse et dépassement', nl: 'Snelheid en inhalen' },
      paragraphs: [
        {
          fr: "120 km/h maximum, 70 km/h minimum quand les conditions le permettent : sur autoroute, les véhicules trop lents (cyclomoteurs, tracteurs) n'ont simplement pas leur place. Le dépassement se fait uniquement par la gauche — rester sans raison sur une voie de gauche et forcer les autres à te dépasser par la droite est tout aussi fautif que le dépassement par la droite lui-même.",
          nl: '120 km/u maximum, 70 km/u minimum wanneer de omstandigheden het toelaten: op de snelweg hebben te trage voertuigen (bromfietsen, tractoren) gewoon geen plaats. Inhalen gebeurt enkel links — zonder reden op een linkerstrook blijven en anderen dwingen je rechts in te halen, is even fout als zelf rechts inhalen.',
        },
      ],
      factIds: ['cv4-def-acces', 'cv4-vitesse-min-max', 'cv4-depasser-droite-interdit'],
      miniQuizQuestionIds: ['cv4-q1'],
    },
    {
      id: 'cv4-c2-urgence',
      title: { fr: "La bande d'arrêt d'urgence et le couloir de secours", nl: 'De pechstrook en de hulpstrook' },
      paragraphs: [
        {
          fr: "La bande d'arrêt d'urgence n'est ni une voie de circulation ni une place de parking : elle est réservée aux pannes et accidents, triangle à 100 m et gilet enfilé avant de sortir. En cas de file, tous les conducteurs — pas seulement sur autoroute — doivent former un couloir de secours préventivement, avant même que la circulation ne soit complètement arrêtée.",
          nl: 'De pechstrook is geen rijstrook, geen parkeerplaats: ze is voorbehouden voor pech en ongevallen, driehoek op 100 m en veiligheidsvest aan vóór je uitstapt. Bij file moeten alle bestuurders — niet enkel op de snelweg — preventief een hulpstrook vormen, nog vóór het verkeer volledig stilstaat.',
        },
      ],
      factIds: ['cv4-bande-arret-urgence', 'cv4-interdits'],
      miniQuizQuestionIds: ['cv4-q2'],
    },
  ],
  summary: {
    fr: "120 km/h max, 70 min. Dépassement uniquement par la gauche. La bande d'arrêt d'urgence est réservée aux pannes/accidents, et le couloir de secours se forme dès que la circulation ralentit fortement.",
    nl: '120 km/u max, 70 min. Enkel links inhalen. De pechstrook is voorbehouden voor pech/ongevallen, en de hulpstrook wordt gevormd zodra het verkeer sterk vertraagt.',
  },
}

const L5: Lesson = {
  slug: 'route-pour-automobiles',
  themeSlug: 'circulation-vitesse',
  title: { fr: 'Route pour automobiles', nl: 'De autoweg' },
  intro: {
    fr: "À mi-chemin entre l'autoroute et la route ordinaire : des carrefours et des feux, mais une vitesse qui dépend de l'aménagement et de la région.",
    nl: 'Halverwege tussen snelweg en gewone weg: kruispunten en lichten, maar een snelheid die afhangt van de inrichting en de regio.',
  },
  objectives: [
    { fr: "Distinguer route pour automobiles et autoroute", nl: 'Autoweg en snelweg onderscheiden' },
    { fr: 'Connaître la vitesse max selon l’aménagement et la région', nl: 'De maximumsnelheid per inrichting en regio kennen' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'cv5-c1-def',
      title: { fr: 'Une route qui ressemble à une autoroute, sans en être une', nl: 'Een weg die op een snelweg lijkt, zonder het te zijn' },
      paragraphs: [
        {
          fr: "Une route pour automobiles exclut les mêmes véhicules qu'une autoroute (cyclomoteurs, véhicules agricoles, quadricycles sans habitacle), mais contrairement à elle, tu peux y rencontrer des carrefours et des feux de signalisation.",
          nl: 'Een autoweg sluit dezelfde voertuigen uit als een snelweg (bromfietsen, landbouwvoertuigen, open vierwielers), maar in tegenstelling tot de snelweg kan je er kruispunten en verkeerslichten tegenkomen.',
        },
      ],
      factIds: ['cv5-def'],
      miniQuizQuestionIds: ['cv5-q1'],
    },
    {
      id: 'cv5-c2-vitesse',
      title: { fr: 'Une vitesse qui dépend de deux choses', nl: 'Een snelheid die van twee dingen afhangt' },
      paragraphs: [
        {
          fr: "Hors agglomération, la vitesse maximale dépend de l'aménagement : 120 km/h si les deux sens sont séparés par une berme centrale, moins si seul un marquage les sépare — et là, la région fait la différence.",
          nl: 'Buiten de bebouwde kom hangt de maximumsnelheid af van de inrichting: 120 km/u als beide rijrichtingen door een middenberm gescheiden zijn, minder als enkel markering ze scheidt — en dan maakt de regio het verschil.',
        },
      ],
      table: {
        caption: { fr: 'Route pour automobiles, hors agglomération, sens séparés par marquage seul', nl: 'Autoweg, buiten bebouwde kom, rijrichtingen enkel gescheiden door markering' },
        rows: [
          {
            label: { fr: 'Vitesse maximale', nl: 'Maximumsnelheid' },
            valuesByRegion: {
              WALLONIE: { fr: '90 km/h', nl: '90 km/u' },
              BRUXELLES: { fr: '70 km/h', nl: '70 km/u' },
              FLANDRE: { fr: '70 km/h', nl: '70 km/u' },
            },
          },
        ],
      },
      factIds: ['cv5-vitesse-berme', 'cv5-vitesse-marquage-wallonie', 'cv5-vitesse-marquage-flandre-bxl', 'cv5-pas-vitesse-min'],
      miniQuizQuestionIds: ['cv5-q2'],
    },
  ],
  summary: {
    fr: "Une route pour automobiles peut avoir des carrefours et des feux, contrairement à l'autoroute. Sa vitesse dépend de l'aménagement (berme ou marquage) et, pour le marquage seul, de la région.",
    nl: 'Een autoweg kan kruispunten en lichten hebben, in tegenstelling tot de snelweg. De snelheid hangt af van de inrichting (berm of markering) en, bij enkel markering, van de regio.',
  },
}

const L12: Lesson = {
  slug: 'la-vitesse-maximale-recapitulatif',
  themeSlug: 'circulation-vitesse',
  title: { fr: 'La vitesse maximale : le récapitulatif', nl: 'De maximumsnelheid: het overzicht' },
  intro: {
    fr: "Une synthèse pour tout relier — et un rappel sérieux sur ce que tu risques vraiment en cas d'excès de vitesse en Belgique.",
    nl: 'Een synthese om alles te verbinden — en een ernstige herinnering aan wat je écht riskeert bij te hoge snelheid in België.',
  },
  objectives: [
    { fr: 'Relier chaque type de voirie à sa vitesse maximale', nl: 'Elk type weg koppelen aan zijn maximumsnelheid' },
    { fr: 'Connaître les seuils de retrait immédiat et de déchéance judiciaire', nl: 'De drempels voor onmiddellijke intrekking en gerechtelijke vervallenverklaring kennen' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'cv12-c1-recap',
      title: { fr: 'Un chiffre par type de voirie', nl: 'Een cijfer per type weg' },
      paragraphs: [
        {
          fr: "Tu as déjà vu chacune de ces valeurs dans les leçons précédentes — les revoir ensemble aide à ne plus les confondre le jour de l'examen. Retiens surtout que la chaussée à voie centrale (70 km/h) est une exception qui casse la logique « région par région ».",
          nl: 'Je hebt elk van deze waarden al gezien in vorige lessen — ze samen herbekijken helpt om ze niet meer te verwarren op examendag. Onthoud vooral dat de rijbaan met middenbaan (70 km/u) een uitzondering is die de "regio per regio"-logica doorbreekt.',
        },
      ],
      table: {
        caption: { fr: 'Vitesse maximale sur route ordinaire, hors agglomération', nl: 'Maximumsnelheid op een gewone weg, buiten bebouwde kom' },
        rows: [
          {
            label: { fr: 'Route ordinaire', nl: 'Gewone weg' },
            valuesByRegion: {
              WALLONIE: { fr: '90 km/h', nl: '90 km/u' },
              BRUXELLES: { fr: '70 km/h', nl: '70 km/u' },
              FLANDRE: { fr: '70 km/h', nl: '70 km/u' },
            },
          },
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
          kind: 'retenir',
          text: {
            fr: 'Zone résidentielle : 20 km/h. Zone 30, zone cyclable, chemin réservé, rue scolaire : 30 km/h. Zone de rencontre : 20 km/h.',
            nl: 'Woonerf: 20 km/u. Zone 30, fietszone, voorbehouden weg, schoolstraat: 30 km/u. Ontmoetingszone: 20 km/u.',
          },
        },
      ],
      factIds: ['cv12-trop-lentement-courses'],
      miniQuizQuestionIds: ['cv12-q1'],
    },
    {
      id: 'cv12-c2-sanctions',
      title: { fr: 'Ce que tu risques vraiment', nl: 'Wat je écht riskeert' },
      paragraphs: [
        {
          fr: "Deux niveaux bien distincts existent. La police peut retirer ton permis sur-le-champ (décision du Procureur du Roi) à partir de +30 km/h sur route ou +20 km/h en agglomération/zone 30. Un juge, lui, peut prononcer une déchéance de 8 jours à 5 ans à partir de +40 km/h sur route ou +30 km/h en agglomération/zone 30 — une décision de justice, pas de police.",
          nl: 'Er bestaan twee duidelijk verschillende niveaus. De politie kan je rijbewijs onmiddellijk intrekken (beslissing van de Procureur des Konings) vanaf +30 km/u op de weg of +20 km/u in de bebouwde kom/zone 30. Een rechter kan een vervallenverklaring van 8 dagen tot 5 jaar uitspreken vanaf +40 km/u op de weg of +30 km/u in de bebouwde kom/zone 30 — een gerechtelijke beslissing, geen politiebeslissing.',
        },
      ],
      callouts: [
        {
          kind: 'attention',
          text: { fr: 'Ne confonds pas « retrait immédiat » (police, sur le moment) et « déchéance » (juge, plus tard au tribunal) — l’examen adore cette nuance.', nl: 'Verwar niet "onmiddellijke intrekking" (politie, ter plaatse) met "vervallenverklaring" (rechter, later voor de rechtbank) — het examen test deze nuance graag.' },
        },
      ],
      factIds: ['cv12-retrait-immediat', 'cv12-decheance-juge'],
      miniQuizQuestionIds: ['cv12-q2'],
    },
  ],
  summary: {
    fr: "Chaque type de voirie a son chiffre — la voie centrale (70 km/h partout) reste l'exception à retenir. Et retiens la différence entre un retrait immédiat décidé par la police (dès +30/+20 km/h) et une déchéance prononcée par un juge (dès +40/+30 km/h).",
    nl: 'Elk type weg heeft zijn cijfer — de middenbaan (overal 70 km/u) blijft de te onthouden uitzondering. En onthoud het verschil tussen een onmiddellijke intrekking door de politie (vanaf +30/+20 km/u) en een vervallenverklaring door een rechter (vanaf +40/+30 km/u).',
  },
}

const L13: Lesson = {
  slug: 'la-distance-darret',
  themeSlug: 'circulation-vitesse',
  title: { fr: "La distance d'arrêt", nl: 'De stopafstand' },
  intro: {
    fr: "Réaction + freinage = distance d'arrêt. Comprendre ces deux temps te permet d'anticiper au lieu de subir.",
    nl: 'Reactie + remmen = stopafstand. Deze twee fases begrijpen laat je anticiperen in plaats van ondergaan.',
  },
  objectives: [
    { fr: 'Calculer une distance de sécurité approximative', nl: 'Een benaderende veiligheidsafstand berekenen' },
    { fr: 'Comprendre ce qui allonge le temps de réaction', nl: 'Begrijpen wat de reactietijd verlengt' },
    { fr: "Distinguer distance de réaction, de freinage et d'arrêt", nl: 'Reactieafstand, remafstand en stopafstand onderscheiden' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'cv13-c1-securite',
      title: { fr: 'La distance de sécurité', nl: 'De veiligheidsafstand' },
      paragraphs: [
        {
          fr: "Le truc à retenir : ta vitesse divisée par deux, en mètres, sur sol sec. À 120 km/h, ça fait 60 m. La règle des deux secondes revient au même résultat sans calcul : choisis un repère fixe, et si le véhicule devant y passe, compte « un crocodile, deux crocodiles » avant d'y arriver toi-même.",
          nl: 'Het te onthouden trucje: je snelheid gedeeld door twee, in meter, op droog wegdek. Bij 120 km/u is dat 60 m. De twee-secondenregel geeft hetzelfde resultaat zonder rekenwerk: kies een vast punt, en als het voertuig voor je er passeert, tel dan "één krokodil, twee krokodillen" voor je er zelf aankomt.',
        },
      ],
      callouts: [
        {
          kind: 'retenir',
          text: { fr: 'Sol mouillé : +50 % (≈ 3 secondes). Neige ou verglas : au moins 4 secondes.', nl: 'Nat wegdek: +50% (≈ 3 seconden). Sneeuw of ijzel: minstens 4 seconden.' },
        },
      ],
      factIds: ['cv13-distance-securite'],
      miniQuizQuestionIds: ['cv13-q1'],
    },
    {
      id: 'cv13-c2-reaction-freinage',
      title: { fr: 'Réaction, freinage, arrêt : trois distances', nl: 'Reactie, remmen, stoppen: drie afstanden' },
      paragraphs: [
        {
          fr: "Avant même de freiner, ton cerveau a besoin d'environ une seconde pour réagir — deux à trois sous alcool, cinq à huit sous stupéfiants. Cette seule seconde te fait déjà parcourir 33 m à 120 km/h. Vient ensuite la distance de freinage à proprement parler, qui dépend de ta vitesse, de l'état de la route et de tes pneus. La somme des deux, c'est la distance d'arrêt totale.",
          nl: 'Nog vóór je remt, heeft je hersenen ongeveer één seconde nodig om te reageren — twee tot drie onder invloed van alcohol, vijf tot acht onder drugs. Alleen al die ene seconde doet je 33 m afleggen bij 120 km/u. Dan komt de eigenlijke remafstand, die afhangt van je snelheid, de staat van de weg en je banden. De som van beide is de totale stopafstand.',
        },
        {
          fr: "L'ABS ne raccourcit pas forcément cette distance : il t'évite surtout de perdre le contrôle directionnel. Et le minimum légal des pneus (1,6 mm) n'est déjà plus une garantie de sécurité réelle — l'aquaplaning guette dès 2 mm.",
          nl: 'ABS verkort die afstand niet noodzakelijk: het voorkomt vooral dat je de controle over de richting verliest. En het wettelijke minimum van de banden (1,6 mm) is al geen echte veiligheidsgarantie meer — aquaplaning loert al vanaf 2 mm.',
        },
      ],
      factIds: ['cv13-distance-reaction', 'cv13-distance-arret-totale', 'cv13-abs-pneus'],
      miniQuizQuestionIds: ['cv13-q2', 'cv13-q3'],
    },
  ],
  summary: {
    fr: "Distance de sécurité ≈ vitesse ÷ 2 sur sol sec (règle des 2 secondes). Distance d'arrêt = réaction + freinage, toujours plus longue à vitesse élevée, sous influence, ou sur sol mouillé.",
    nl: 'Veiligheidsafstand ≈ snelheid ÷ 2 op droog wegdek (2-secondenregel). Stopafstand = reactie + remmen, altijd langer bij hoge snelheid, onder invloed, of op nat wegdek.',
  },
}

const L14: Lesson = {
  slug: 'le-croisement',
  themeSlug: 'circulation-vitesse',
  title: { fr: 'Le croisement', nl: 'Het kruisen' },
  intro: {
    fr: "Deux véhicules en sens opposé, une chaussée parfois étroite : voici les règles pour se croiser sans accroc.",
    nl: 'Twee voertuigen in tegengestelde richting, soms een smalle rijbaan: dit zijn de regels om zonder problemen te kruisen.',
  },
  objectives: [
    { fr: 'Savoir où tu peux et ne peux pas te croiser', nl: 'Weten waar je wel en niet mag kruisen' },
    { fr: "Connaître la priorité sur un rétrécissement", nl: 'De voorrang bij een versmalling kennen' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'cv14-c1-droite',
      title: { fr: 'Toujours par la droite', nl: 'Altijd rechts' },
      paragraphs: [
        {
          fr: "Croiser un autre véhicule se fait toujours par la droite, avec une distance latérale suffisante — précisée à 1 m en agglomération et 1,5 m hors agglomération face à un cycliste. Interdit d'utiliser, pour te croiser, l'espace au-delà du bord fictif de la chaussée ou une piste cyclable.",
          nl: 'Een ander voertuig kruisen gebeurt altijd rechts, met voldoende zijdelingse afstand — bepaald op 1 m in de bebouwde kom en 1,5 m erbuiten tegenover een fietser. Verboden om, om te kruisen, de ruimte voorbij de fictieve rand van de rijbaan of een fietspad te gebruiken.',
        },
      ],
      examples: [
        {
          fr: "Croiser un tram se fait aussi par la droite en principe — mais tu peux passer par la gauche si le passage à droite est bloqué par un obstacle ou un véhicule stationné, à condition que la voie soit vraiment libre en face.",
          nl: 'Een tram kruisen gebeurt in principe ook rechts — maar je mag links passeren als de doorgang rechts geblokkeerd is door een obstakel of geparkeerd voertuig, op voorwaarde dat de weg echt vrij is aan de overkant.',
        },
      ],
      factIds: ['cv14-croisement-droite', 'cv14-distance-croisement', 'cv14-croiser-tram'],
      miniQuizQuestionIds: ['cv14-q1'],
    },
    {
      id: 'cv14-c2-retrecissement',
      title: { fr: 'Qui passe en premier sur un rétrécissement', nl: 'Wie mag eerst bij een versmalling' },
      paragraphs: [
        {
          fr: "Sans signal, la règle est simple : celui qui a l'obstacle de son côté cède le passage. Avec un signal, sa forme parle : un rond rouge et blanc t'ordonne de céder, un panneau rectangulaire à flèches te donne la priorité.",
          nl: 'Zonder bord is de regel eenvoudig: wie het obstakel aan zijn kant heeft, verleent voorrang. Met een bord spreekt de vorm: een rode en witte cirkel beveelt je voorrang te verlenen, een rechthoekig bord met pijlen geeft je voorrang.',
        },
      ],
      factIds: ['cv14-retrecissement'],
      miniQuizQuestionIds: ['cv14-q2'],
    },
  ],
  summary: {
    fr: "On se croise par la droite, avec une distance latérale suffisante. Sur un rétrécissement, sans signal, celui qui a l'obstacle cède le passage ; avec signal, la forme du panneau tranche.",
    nl: 'Je kruist rechts, met voldoende zijdelingse afstand. Bij een versmalling verleent, zonder bord, wie het obstakel heeft voorrang; met bord beslist de vorm van het bord.',
  },
}

const L15: Lesson = {
  slug: 'depasser-par-la-gauche',
  themeSlug: 'circulation-vitesse',
  title: { fr: 'Dépasser par la gauche', nl: 'Links inhalen' },
  intro: {
    fr: "Le dépassement est l'une des manœuvres les plus risquées de la conduite. Une méthode claire, étape par étape, réduit vraiment le danger.",
    nl: 'Inhalen is een van de risicovolste manoeuvres bij het rijden. Een duidelijke, stapsgewijze methode vermindert het gevaar echt.',
  },
  objectives: [
    { fr: 'Vérifier les 6 conditions avant de dépasser', nl: 'De 6 voorwaarden controleren vóór het inhalen' },
    { fr: "Connaître les deux seuls cas de dépassement par la droite", nl: 'De enige twee gevallen van rechts inhalen kennen' },
    { fr: 'Respecter les distances latérales de dépassement', nl: 'De zijdelingse afstanden bij het inhalen respecteren' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'cv15-c1-verifications',
      title: { fr: 'Avant de dépasser : la checklist', nl: 'Vóór het inhalen: de checklist' },
      paragraphs: [
        {
          fr: "Dépasser ne concerne qu'un véhicule en mouvement — doubler une voiture à l'arrêt, c'est simplement la contourner. Avant de te lancer : vitesse du véhicule devant, marge pour le dépasser sans excès, absence de véhicule en face, personne qui te dépasse déjà, place pour te rabattre, et aucune interdiction en vigueur. Dans cet ordre.",
          nl: 'Inhalen betreft enkel een rijdend voertuig — een stilstaande auto voorbijrijden is gewoon omzeilen. Voor je begint: snelheid van het voertuig voor je, marge om zonder snelheidsovertreding in te halen, geen tegenligger, niemand die je al inhaalt, plaats om terug in te voegen, en geen geldend verbod. In die volgorde.',
        },
      ],
      factIds: ['cv15-def-depassement', 'cv15-avant-depasser'],
      miniQuizQuestionIds: ['cv15-q1'],
    },
    {
      id: 'cv15-c2-distances-droite',
      title: { fr: 'Distances et les deux exceptions à droite', nl: 'Afstanden en de twee uitzonderingen rechts' },
      paragraphs: [
        {
          fr: "Face à un cycliste ou un piéton, garde 1,5 m hors agglomération, 1 m en agglomération. Le clignotant gauche ne sert qu'au déplacement latéral, pas à toute la durée du dépassement. Dépasser par la droite n'est permis que dans deux cas : un véhicule déjà déporté à gauche pour tourner, ou un tram.",
          nl: 'Tegenover een fietser of voetganger houd je 1,5 m buiten de bebouwde kom, 1 m erbinnen. Het linkerknipperlicht dient enkel voor de zijdelingse verplaatsing, niet voor de hele inhaalmanoeuvre. Rechts inhalen mag enkel in twee gevallen: een voertuig dat al naar links is uitgeweken om te draaien, of een tram.',
        },
      ],
      callouts: [
        {
          kind: 'attention',
          text: { fr: 'Une file qui avance plus vite qu’une autre en embouteillage n’est pas légalement un dépassement.', nl: 'Een file die sneller opschiet dan een andere in een file is wettelijk geen inhaalmanoeuvre.' },
        },
      ],
      factIds: ['cv15-distance-depassement', 'cv15-2-cas-droite', 'cv15-pas-depassement-legal'],
      miniQuizQuestionIds: ['cv15-q2'],
    },
  ],
  summary: {
    fr: "Vérifie les 6 conditions dans l'ordre avant de dépasser. Garde 1 à 1,5 m de distance latérale. Le dépassement par la droite reste l'exception, réservée à deux situations précises.",
    nl: 'Controleer de 6 voorwaarden in volgorde vóór je inhaalt. Houd 1 tot 1,5 m zijdelingse afstand. Rechts inhalen blijft de uitzondering, voorbehouden voor twee specifieke situaties.',
  },
}

const L16: Lesson = {
  slug: 'ou-le-depassement-est-interdit',
  themeSlug: 'circulation-vitesse',
  title: { fr: 'Où le dépassement est interdit', nl: 'Waar inhalen verboden is' },
  intro: {
    fr: "Passages à niveau, carrefours, virages sans visibilité : certains endroits interdisent le dépassement, avec ou sans panneau.",
    nl: 'Overwegen, kruispunten, bochten zonder zicht: sommige plaatsen verbieden inhalen, met of zonder bord.',
  },
  objectives: [
    { fr: "Reconnaître les signaux d'interdiction de dépasser", nl: 'De inhaalverbodsborden herkennen' },
    { fr: 'Connaître les lieux où dépasser est interdit sans signal', nl: 'De plaatsen kennen waar inhalen verboden is zonder bord' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'cv16-c1-signaux',
      title: { fr: 'Les panneaux d’interdiction', nl: 'De verbodsborden' },
      paragraphs: [
        {
          fr: "Un signal d'interdiction de dépasser reste valable jusqu'au carrefour suivant ou jusqu'à son signal de fin. Un panneau additionnel avec une distance (« 200 m ») retarde simplement le début de l'interdiction — pas sa fin.",
          nl: 'Een inhaalverbodsbord blijft geldig tot het volgende kruispunt of tot het bijhorende einde-bord. Een onderbord met een afstand ("200 m") vertraagt gewoon het begin van het verbod — niet het einde.',
        },
      ],
      factIds: ['cv16-signaux-interdiction'],
      miniQuizQuestionIds: ['cv16-q1'],
    },
    {
      id: 'cv16-c2-lieux',
      title: { fr: 'Les lieux interdits sans même un panneau', nl: 'Verboden plaatsen, zelfs zonder bord' },
      paragraphs: [
        {
          fr: "Même sans aucun signal, dépasser reste interdit à un passage à niveau sans barrières ni feu blanc clignotant, à un carrefour où tu dois céder le passage, au sommet d'une côte ou dans un virage sans visibilité, et devant un véhicule qui approche ou s'arrête à un passage pour piétons ou cyclistes.",
          nl: 'Ook zonder enig bord blijft inhalen verboden bij een overweg zonder slagbomen of knipperend wit licht, bij een kruispunt waar je voorrang moet verlenen, op de top van een helling of in een bocht zonder zicht, en voor een voertuig dat een oversteekplaats voor voetgangers of fietsers nadert of er stopt.',
        },
        {
          fr: "« Tripler » (dépasser un véhicule qui en dépasse déjà un autre) est interdit sur une chaussée à double sens, sauf si celui que tu dépasses double lui-même un cyclomoteur ou une moto, ou si la chaussée a trois bandes ou plus dans ton sens.",
          nl: '"Drievoudig inhalen" (een voertuig inhalen dat er zelf al een ander inhaalt) is verboden op een tweerichtingsweg, tenzij wie je inhaalt zelf een bromfiets of motor inhaalt, of als de rijbaan drie of meer stroken in jouw richting heeft.',
        },
      ],
      factIds: ['cv16-lieux-interdits', 'cv16-tripler'],
      miniQuizQuestionIds: ['cv16-q2'],
    },
  ],
  summary: {
    fr: "Un signal d'interdiction s'applique jusqu'au carrefour suivant. Même sans panneau, dépasser reste interdit aux passages à niveau, carrefours prioritaires, sommets de côte, virages sans visibilité et passages piétons/cyclistes.",
    nl: 'Een verbodsbord geldt tot het volgende kruispunt. Ook zonder bord blijft inhalen verboden bij overwegen, voorrangskruispunten, heuveltoppen, bochten zonder zicht en voetgangers-/fietsoversteken.',
  },
}

const L21: Lesson = {
  slug: 'tourner-et-les-manoeuvres',
  themeSlug: 'circulation-vitesse',
  title: { fr: 'Tourner à gauche ou à droite, et les manœuvres', nl: 'Links of rechts afslaan, en de manoeuvres' },
  intro: {
    fr: "Changer de direction, c'est presque toujours céder le passage à quelqu'un. Voici qui, et comment bien te positionner.",
    nl: 'Van richting veranderen betekent bijna altijd voorrang verlenen aan iemand. Aan wie, en hoe positioneer je je correct.',
  },
  objectives: [
    { fr: 'Savoir qui a priorité en tournant', nl: 'Weten wie voorrang heeft bij het afslaan' },
    { fr: 'Te positionner correctement pour tourner', nl: 'Je correct positioneren om af te slaan' },
    { fr: "Reconnaître une manœuvre et céder le passage qu'elle exige", nl: 'Een manoeuvre herkennen en de vereiste voorrang verlenen' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'cv21-c1-priorite',
      title: { fr: 'Tourner à gauche : la priorité au sens inverse', nl: 'Links afslaan: voorrang aan de tegenligger' },
      paragraphs: [
        {
          fr: "Tourner à gauche impose toujours de céder le passage à qui vient en face — c'est une infraction grave de l'oublier. Face à un conducteur qui tourne à droite, c'est même lui qui a priorité sur toi. Et n'oublie jamais les piétons et cyclistes qui traversent la rue où tu t'engages, même sans passage prévu.",
          nl: 'Links afslaan verplicht je altijd voorrang te verlenen aan de tegenligger — dit vergeten is een zware overtreding. Tegenover een bestuurder die rechts afslaat, heeft die zelfs voorrang op jou. En vergeet nooit de voetgangers en fietsers die de straat oversteken waarop je je begeeft, zelfs zonder voorziene oversteekplaats.',
        },
      ],
      factIds: ['cv21-priorite-tourner', 'cv21-ceder-pietons-virage'],
      miniQuizQuestionIds: ['cv21-q1'],
    },
    {
      id: 'cv21-c2-position-manoeuvre',
      title: { fr: 'Bien se positionner, et savoir reconnaître une manœuvre', nl: 'Correct positioneren, en een manoeuvre herkennen' },
      paragraphs: [
        {
          fr: "Pour tourner à gauche sur une chaussée à double sens, approche-toi de l'axe médian ; pour tourner à droite, reste le plus à droite possible, sans jamais te présélectionner à l'extrême droite ou sur la bande inverse.",
          nl: 'Om links af te slaan op een tweerichtingsweg, nader je de middenas; om rechts af te slaan, blijf je zoveel mogelijk rechts, zonder je ooit uiterst rechts of op de tegengestelde strook voor te sorteren.',
        },
        {
          fr: "Changer de bande, faire demi-tour, reculer, entrer ou sortir d'un stationnement : tout ça, ce sont des manœuvres — des actions non réglées spécifiquement par le Code, qui t'obligent à céder le passage à absolument tous les usagers.",
          nl: 'Van strook veranderen, keren, achteruitrijden, een parkeerplaats in- of uitrijden: dat zijn allemaal manoeuvres — acties die niet specifiek door de wegcode geregeld zijn, en die je verplichten voorrang te verlenen aan werkelijk alle weggebruikers.',
        },
      ],
      factIds: ['cv21-position-virage', 'cv21-manoeuvre-def', 'cv21-insertion-bande'],
      miniQuizQuestionIds: ['cv21-q2'],
    },
  ],
  summary: {
    fr: "Qui tourne à gauche cède toujours le passage au sens inverse. Positionne-toi près de l'axe pour tourner à gauche, à droite pour tourner à droite. Toute manœuvre (changer de bande, reculer, demi-tour...) exige de céder le passage à tous.",
    nl: 'Wie links afslaat, verleent altijd voorrang aan de tegenligger. Positioneer je bij de as om links af te slaan, rechts om rechts af te slaan. Elke manoeuvre (van strook veranderen, achteruitrijden, keren...) vereist voorrang aan iedereen.',
  },
}

export const CIRCULATION_VITESSE_LESSONS: Lesson[] = [L4, L5, L12, L13, L14, L15, L16, L21]
