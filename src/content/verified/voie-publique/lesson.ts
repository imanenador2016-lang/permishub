import type { Lesson } from '@/domain/content'

/**
 * Leçon rédigée à partir de src/content/verified/voie-publique/facts.ts
 * (eux-mêmes extraits de 1-la-voie-publique.pdf, avec page exacte par
 * fait — voir facts.ts et docs/CONTENT_PIPELINE.md). Le texte ci-dessous
 * est une reformulation pédagogique originale, pas une copie du PDF.
 *
 * Vitesses régionales (chapitre 5) recoupées le 2026-08-18 avec des sources
 * secondaires concordantes (dont un document officiel de la Région
 * flamande, mow.vlaanderen.be) en plus du PDF — voir le callout
 * "attention" du chapitre pour le détail. Ça reste une vérification de
 * cohérence, pas un contrôle du texte légal primaire : à confirmer
 * définitivement lors de la relecture humaine (docs/CONTENT_PIPELINE.md).
 */
export const VOIE_PUBLIQUE_LESSON: Lesson = {
  slug: 'voie-publique-et-chaussee',
  themeSlug: 'voie-publique',
  title: { fr: 'La voie publique et la chaussée', nl: 'De openbare weg en de rijbaan' },
  intro: {
    fr: "Avant de parler de priorités, de feux ou de dépassement, il faut savoir où tu as le droit de rouler — et avec quelles règles. Cette leçon pose les bases : les 3 types de terrain, ce qu'est vraiment une chaussée, et pourquoi la vitesse max ne dit pas la même chose partout en Belgique.",
    nl: 'Voor je het over voorrang, lichten of inhalen hebt, moet je weten waar je mag rijden — en met welke regels. Deze les legt de basis: de 3 soorten terrein, wat een rijbaan echt is, en waarom de maximumsnelheid niet overal in België hetzelfde zegt.',
  },
  objectives: [
    { fr: "Distinguer voie publique, terrain public et terrain non-public", nl: 'Openbare weg, openbaar terrein en niet-openbaar terrein onderscheiden' },
    { fr: "Savoir où le Code de la route s'applique vraiment", nl: 'Weten waar de wegcode echt van toepassing is' },
    { fr: "Identifier ce qui fait partie de la chaussée — et ce qui n'en fait pas partie", nl: 'Herkennen wat tot de rijbaan behoort — en wat niet' },
    { fr: 'Connaître la vitesse max selon ta région, et l’exception de la voie centrale', nl: 'De maximumsnelheid per regio kennen, en de uitzondering van de middenbaan' },
  ],
  estimatedMinutes: 8,
  chapters: [
    {
      id: 'vp-c1-terrains',
      title: { fr: 'Trois terrains, trois logiques', nl: 'Drie terreinen, drie logica’s' },
      paragraphs: [
        {
          fr: "Tous les endroits où l'on peut rouler ne se valent pas aux yeux du Code de la route. Il y a d'abord la voie publique : rues, routes, autoroutes, ponts, chemins de terre... Tu peux t'y déplacer librement, à pied ou en véhicule, sans avoir à te justifier.",
          nl: 'Niet elke plek waar je kan rijden telt hetzelfde voor de wegcode. Eerst is er de openbare weg: straten, wegen, snelwegen, bruggen, veldwegen... Je mag je er vrij verplaatsen, te voet of met een voertuig, zonder je te moeten verantwoorden.',
        },
        {
          fr: "Ensuite, le terrain public : un parking de supermarché, une station-service. Tu peux y entrer en voiture, mais il te faut une vraie raison — faire le plein, aller acheter du pain. Enfin, le terrain non-public (parking d'usine, piste d'auto-école) : là, une bonne raison ne suffit pas, il te faut aussi la permission d'y être.",
          nl: 'Dan is er het openbaar terrein: de parking van een supermarkt, een tankstation. Je mag er met de auto komen, maar je hebt een echte reden nodig — tanken, brood gaan kopen. Tot slot het niet-openbaar terrein (fabrieksparking, oefenterrein van een rijschool): daar volstaat een goede reden niet, je hebt ook toestemming nodig om er te zijn.',
        },
      ],
      examples: [
        {
          fr: "Tu t'arrêtes sur le parking d'un fast-food juste pour faire demi-tour, sans rien y acheter ? Tu n'as techniquement pas de « bonne raison » d'y être — c'est le genre de nuance que l'examen aime tester.",
          nl: 'Je stopt op de parking van een fastfoodzaak enkel om te keren, zonder iets te kopen? Technisch heb je geen "goede reden" om er te zijn — het soort nuance die het examen graag test.',
        },
      ],
      callouts: [
        {
          kind: 'retenir',
          text: {
            fr: 'Voie publique = libre accès. Terrain public = besoin d’une raison. Terrain non-public = raison + permission.',
            nl: 'Openbare weg = vrije toegang. Openbaar terrein = reden nodig. Niet-openbaar terrein = reden + toestemming.',
          },
        },
      ],
      factIds: ['vp-voie-publique-def', 'vp-terrain-public-def', 'vp-terrain-non-public-def'],
      miniQuizQuestionIds: ['vp-q1'],
    },
    {
      id: 'vp-c2-application',
      title: { fr: 'Le Code ne s’arrête pas à la voie publique', nl: 'De wegcode stopt niet bij de openbare weg' },
      paragraphs: [
        {
          fr: "Le Code de la route s'applique pleinement sur la voie publique : c'est là que les infractions sont verbalisées et que ses règles déterminent qui est responsable en cas d'accident. Mais « je suis sur un parking privé » n'est pas un joker : les comportements dangereux y restent sanctionnables, amende ou poursuite à la clé.",
          nl: 'De wegcode is volledig van toepassing op de openbare weg: daar worden overtredingen beboet en bepalen de regels wie aansprakelijk is bij een ongeval. Maar "ik sta op een privéparking" is geen vrijgeleide: gevaarlijk gedrag blijft er strafbaar, met boete of vervolging.',
        },
        {
          fr: 'Une route avec un panneau « privée » sort carrément du Code de la route — sauf si elle reste accessible à tout le monde. Et petite curiosité : les conducteurs de tram échappent à la majorité du Code, mais pas aux feux de circulation, qu’ils doivent toujours respecter.',
          nl: 'Een weg met het opschrift "privé" valt volledig buiten de wegcode — tenzij hij toch voor iedereen toegankelijk blijft. Bijzonderheid: trambestuurders ontsnappen aan het grootste deel van de wegcode, maar niet aan de verkeerslichten, die ze altijd moeten volgen.',
        },
      ],
      callouts: [
        {
          kind: 'attention',
          text: {
            fr: 'Piège classique : penser qu’on ne risque rien hors de la voie publique. Faux — seules les règles de circulation détaillées ne s’appliquent pas, pas le bon sens ni la loi en général.',
            nl: 'Klassieke valkuil: denken dat je niets riskeert buiten de openbare weg. Fout — enkel de gedetailleerde verkeersregels gelden er niet, niet het gezond verstand of de wet in het algemeen.',
          },
        },
      ],
      factIds: ['vp-code-application', 'vp-voie-privee', 'vp-tram'],
      miniQuizQuestionIds: ['vp-q2'],
    },
    {
      id: 'vp-c3-parties',
      title: { fr: 'La voie publique, plus large qu’il n’y paraît', nl: 'De openbare weg, breder dan je denkt' },
      paragraphs: [
        {
          fr: "Beaucoup pensent que la voie publique s'arrête au bitume. Faux : elle englobe aussi la piste cyclable, les accotements, la bande de stationnement et les trottoirs — jusqu'au fossé, au talus ou à la limite de la propriété privée.",
          nl: 'Velen denken dat de openbare weg stopt bij het asfalt. Fout: ze omvat ook het fietspad, de bermen, de parkeerstrook en de voetpaden — tot aan de gracht, de talud of de grens van de privé-eigendom.',
        },
      ],
      callouts: [
        {
          kind: 'retenir',
          text: {
            fr: 'La chaussée n’est qu’une partie de la voie publique — pas toute la voie publique.',
            nl: 'De rijbaan is maar één onderdeel van de openbare weg — niet de hele openbare weg.',
          },
        },
      ],
      factIds: ['vp-parties-voie-publique'],
      miniQuizQuestionIds: ['vp-q4'],
    },
    {
      id: 'vp-c4-chaussee',
      title: { fr: 'La chaussée : réservée aux véhicules', nl: 'De rijbaan: voorbehouden aan voertuigen' },
      paragraphs: [
        {
          fr: "La chaussée, c'est la partie aménagée pour les véhicules — voitures, motos, bus, camions, tracteurs. Ni les pistes cyclables, ni les accotements, ni les trottoirs n'en font partie. Mais deux exceptions logiques : sans piste cyclable, les cyclistes peuvent y rouler ; sans trottoir ni accotement, les piétons peuvent y marcher, avec prudence.",
          nl: 'De rijbaan is het deel dat is ingericht voor voertuigen — auto\'s, motoren, bussen, vrachtwagens, tractoren. Fietspaden, bermen en voetpaden horen er niet bij. Maar twee logische uitzonderingen: zonder fietspad mogen fietsers er rijden; zonder voetpad of berm mogen voetgangers er, voorzichtig, op lopen.',
        },
        {
          fr: "Sur une autoroute ou une route à plusieurs chaussées bien séparées, impossible de rouler sur la chaussée de gauche par rapport à ton sens de marche. Et cette ligne blanche parfois peinte sur le bord de la route ? Elle ne fait que dessiner la limite de la chaussée, rien de plus. Ta règle de base au quotidien : rouler le plus possible à droite. Sans raison, rouler au milieu ou à gauche, c'est déjà une infraction.",
          nl: 'Op een snelweg of een weg met meerdere duidelijk gescheiden rijbanen kan je niet op de linkerrijbaan rijden ten opzichte van je rijrichting. En die witte lijn die soms aan de rand van de weg staat? Die tekent enkel de grens van de rijbaan, niets meer. Je basisregel: zoveel mogelijk rechts rijden. Zonder reden in het midden of links rijden is al een overtreding.',
        },
      ],
      examples: [
        {
          fr: "Tu roules sur une route de campagne sans piste cyclable et tu croises un cycliste sur la chaussée : c'est normal, il a le droit d'y être.",
          nl: 'Je rijdt op een landweg zonder fietspad en kruist een fietser op de rijbaan: dat is normaal, hij mag er zijn.',
        },
      ],
      factIds: ['vp-chaussee-def', 'vp-chaussees-separees', 'vp-ligne-bord-chaussee', 'vp-circulation-droite'],
      miniQuizQuestionIds: ['vp-q10'],
    },
    {
      id: 'vp-c5-vitesse',
      title: { fr: 'La vitesse max change selon la région', nl: 'De maximumsnelheid verandert per regio' },
      paragraphs: [
        {
          fr: "C'est un des pièges préférés de l'examen : la vitesse maximale sur une route ordinaire (hors agglomération) n'est pas la même partout en Belgique. La Wallonie est restée à 90 km/h, tandis que Bruxelles et la Flandre l'ont abaissée à 70 km/h.",
          nl: 'Dit is een van de favoriete valstrikken van het examen: de maximumsnelheid op een gewone weg (buiten de bebouwde kom) is niet overal in België hetzelfde. Wallonië bleef op 90 km/u, terwijl Brussel en Vlaanderen dit verlaagden naar 70 km/u.',
        },
      ],
      table: {
        caption: { fr: 'Vitesse maximale par région (sauf signalisation contraire)', nl: 'Maximumsnelheid per regio (tenzij anders aangegeven)' },
        rows: [
          {
            label: { fr: 'Route ordinaire, hors agglomération', nl: 'Gewone weg, buiten bebouwde kom' },
            valuesByRegion: {
              WALLONIE: { fr: '90 km/h', nl: '90 km/u' },
              BRUXELLES: { fr: '70 km/h', nl: '70 km/u' },
              FLANDRE: { fr: '70 km/h', nl: '70 km/u' },
            },
          },
          {
            label: { fr: 'Chaussée à voie centrale', nl: 'Middenbaan' },
            valuesByRegion: {
              WALLONIE: { fr: '70 km/h', nl: '70 km/u' },
              BRUXELLES: { fr: '70 km/h', nl: '70 km/u' },
              FLANDRE: { fr: '70 km/h', nl: '70 km/u' },
            },
          },
        ],
      },
      callouts: [
        {
          kind: 'attention',
          text: {
            fr: "Ces valeurs viennent de la source PDF et ont été recoupées avec des sources récentes en ligne (août 2026), pas avec le texte légal officiel complet. La signalisation locale (panneaux) prime toujours sur la règle générale — regarde les panneaux avant de te fier à ce tableau.",
            nl: 'Deze waarden komen uit de bron-PDF en werden vergeleken met recente informatie online (augustus 2026), niet met de volledige officiële wettekst. Plaatselijke signalisatie (borden) heeft altijd voorrang op de algemene regel — kijk naar de borden voor je op deze tabel vertrouwt.',
          },
        },
      ],
      factIds: ['vp-vitesse-wallonie', 'vp-vitesse-flandre', 'vp-vitesse-bruxelles'],
      miniQuizQuestionIds: ['vp-q5', 'vp-q6'],
    },
    {
      id: 'vp-c6-voie-centrale',
      title: { fr: 'La chaussée à voie centrale', nl: 'De rijbaan met middenbaan' },
      paragraphs: [
        {
          fr: "Tu la reconnais à deux bandes blanches discontinues (des paires de petits traits) de chaque côté de la voie centrale. Elle est réservée à la circulation motorisée, et sa vitesse max — tu l'as vu dans le tableau — est de 70 km/h partout en Belgique. Même en Wallonie, où c'est une exception à la règle des 90 km/h.",
          nl: 'Je herkent ze aan twee onderbroken witte lijnen (paren korte streepjes) aan weerszijden van de middenbaan. Ze is voorbehouden voor gemotoriseerd verkeer, en de maximumsnelheid — je zag het in de tabel — is overal in België 70 km/u. Zelfs in Wallonië, waar dit een uitzondering is op de regel van 90 km/u.',
        },
      ],
      callouts: [
        {
          kind: 'retenir',
          text: { fr: 'Voie centrale = toujours 70 km/h, dans les 3 régions — retiens l’exception.', nl: 'Middenbaan = altijd 70 km/u, in de 3 regio’s — onthoud de uitzondering.' },
        },
      ],
      factIds: ['vp-voie-centrale-def', 'vp-voie-centrale-vitesse'],
      miniQuizQuestionIds: ['vp-q11'],
    },
    {
      id: 'vp-c7-bande-laterale',
      title: { fr: 'La bande latérale : pas pour toi (sauf exception)', nl: 'De zijstrook: niet voor jou (tenzij uitzondering)' },
      paragraphs: [
        {
          fr: "De part et d'autre de la voie centrale, la bande latérale ne fait pas partie de la chaussée. En voiture, tu n'as le droit d'y mettre une roue que pour croiser un véhicule en face ou dépasser quelqu'un qui roule dans ton sens — jamais pour t'y installer.",
          nl: 'Aan weerszijden van de middenbaan maakt de zijstrook geen deel uit van de rijbaan. Met de auto mag je er enkel een wiel op zetten om een tegemoetkomend voertuig te kruisen of iemand in dezelfde richting in te halen — nooit om er te blijven rijden.',
        },
        {
          fr: 'Elle est faite pour les cyclistes, speed pedelecs, cyclomoteurs classe A, les attelages non menés et les piétons sans trottoir. Si tu dois t’y engager, garde 1 mètre de distance avec eux en agglomération, 1,5 mètre en dehors — et ne les mets jamais en danger.',
          nl: 'Ze is bedoeld voor fietsers, speed pedelecs, bromfietsen klasse A, niet-geleide dieren en voetgangers zonder voetpad. Als je er toch op moet, hou dan 1 meter afstand in de bebouwde kom, 1,5 meter erbuiten — en breng hen nooit in gevaar.',
        },
      ],
      callouts: [
        {
          kind: 'attention',
          text: {
            fr: 'Ne confonds pas « je peux y mettre une roue pour croiser » et « je peux y rouler ». La bande latérale reste prioritairement aux cyclistes et piétons.',
            nl: 'Verwar niet "ik mag er een wiel opzetten om te kruisen" met "ik mag er rijden". De zijstrook blijft voorrang geven aan fietsers en voetgangers.',
          },
        },
      ],
      factIds: ['vp-bande-laterale-def', 'vp-distance-laterale', 'vp-bande-laterale-usagers'],
      miniQuizQuestionIds: ['vp-q7', 'vp-q8'],
    },
    {
      id: 'vp-c8-animaux',
      title: { fr: 'Un animal sur la route : le bon réflexe', nl: 'Een dier op de weg: de juiste reflex' },
      paragraphs: [
        {
          fr: "Cheval, bétail, animal de trait : dès que tu en approches sur la voie publique, ralentis immédiatement. Si un cheval prend peur et se cabre, arrête complètement ton véhicule et ne bouge plus — le cavalier a besoin de calme, pas d'un moteur qui vrombit, pour reprendre le contrôle.",
          nl: 'Paard, vee, trekdier: zodra je ze nadert op de openbare weg, vertraag onmiddellijk. Als een paard schrikt en steigert, stop je voertuig volledig en beweeg niet meer — de ruiter heeft rust nodig, geen brommende motor, om weer controle te krijgen.',
        },
      ],
      factIds: ['vp-animaux-chaussee'],
      miniQuizQuestionIds: ['vp-q9'],
    },
  ],
  summary: {
    fr: "Voie publique, terrain public, terrain non-public : trois niveaux de liberté différents. Le Code de la route s'applique pleinement sur la voie publique, dont la chaussée n'est qu'une partie. Roule à droite, et retiens que la vitesse max hors agglomération dépend de ta région (90 km/h en Wallonie, 70 km/h à Bruxelles et en Flandre) — sauf sur une chaussée à voie centrale, toujours limitée à 70 km/h. Enfin, la bande latérale est avant tout pour les cyclistes et piétons, et tout animal sur la route mérite ralentissement et calme.",
    nl: 'Openbare weg, openbaar terrein, niet-openbaar terrein: drie verschillende vrijheidsniveaus. De wegcode is volledig van toepassing op de openbare weg, waarvan de rijbaan maar één onderdeel is. Rijd rechts, en onthoud dat de maximumsnelheid buiten de bebouwde kom van je regio afhangt (90 km/u in Wallonië, 70 km/u in Brussel en Vlaanderen) — behalve op een rijbaan met middenbaan, altijd beperkt tot 70 km/u. Tot slot is de zijstrook vooral voor fietsers en voetgangers, en verdient elk dier op de weg vertragen en kalmte.',
  },
}
