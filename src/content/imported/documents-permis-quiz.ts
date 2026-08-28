import type { Question } from '@/domain/quiz'

/**
 * Questions transcrites depuis `documents-permis/permisssssss.md` (à la
 * racine du Bureau, hors dépôt) — un digest pédagogique de ~30 leçons
 * couvrant les PDF sources officiels du même dossier. Contenu réel et
 * factuel (limitations de vitesse, MMA, taux d'alcoolémie, distances de
 * sécurité, numéro d'urgence...), pas des questions génériques.
 *
 * Statut : distinct du contenu "vérifié" de `content/verified/*` — ce
 * dernier cite une page exacte de PDF par fait (voir docs/CONTENT_PIPELINE.md).
 * Ici, `factIds` est vide : les faits sont réels (transcrits depuis le
 * digest) mais pas encore reliés à une page PDF précise ni à une relecture
 * croisée. Le texte néerlandais est ma traduction, pas une source
 * officielle distincte — à faire valider avant de le présenter comme
 * équivalent au FR (voir principe LocalizedText, docs/ARCHITECTURE.md).
 */
export const DOCUMENTS_PERMIS_QUESTIONS: Question[] = [
  // --- voie-publique (Leçon 1, Leçon 7) ---
  {
    id: 'dp-vp-1',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Le trottoir fait-il partie de la chaussée ?', nl: 'Maakt het voetpad deel uit van de rijbaan?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non', nl: 'Nee' }, correct: true },
    ],
    explanation: {
      fr: 'Les trottoirs et pistes cyclables ne font pas partie de la chaussée, réservée à la circulation des véhicules.',
      nl: 'Voetpaden en fietspaden maken geen deel uit van de rijbaan, die voorbehouden is voor het verkeer van voertuigen.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-vp-2',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: "Où le Code de la route s'applique-t-il principalement ?", nl: 'Waar geldt de wegcode voornamelijk?' },
    options: [
      { id: 'a', text: { fr: 'Sur la voie publique', nl: 'Op de openbare weg' }, correct: true },
      { id: 'b', text: { fr: 'Partout, sans exception', nl: 'Overal, zonder uitzondering' }, correct: false },
    ],
    explanation: {
      fr: 'Le Code de la route s’applique principalement sur la voie publique — mais certaines infractions graves restent sanctionnables même sur un terrain privé ou un parking.',
      nl: 'De wegcode geldt voornamelijk op de openbare weg — maar ernstige overtredingen blijven strafbaar, zelfs op privéterrein of een parking.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-vp-3',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: {
      fr: 'Quelle distance minimale faut-il laisser à un cycliste que vous dépassez, hors agglomération ?',
      nl: 'Welke minimumafstand moet u laten bij het inhalen van een fietser buiten de bebouwde kom?',
    },
    options: [
      { id: 'a', text: { fr: '50 cm', nl: '50 cm' }, correct: false },
      { id: 'b', text: { fr: '1 mètre', nl: '1 meter' }, correct: false },
      { id: 'c', text: { fr: '1,5 mètre', nl: '1,5 meter' }, correct: true },
    ],
    explanation: {
      fr: 'La distance de sécurité minimale pour dépasser un cycliste est de 1,5 mètre hors agglomération (1 mètre en agglomération).',
      nl: 'De minimale veiligheidsafstand om een fietser in te halen is 1,5 meter buiten de bebouwde kom (1 meter binnen de bebouwde kom).',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-vp-4',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Un piéton qui montre clairement son intention de traverser a-t-il la priorité ?', nl: 'Heeft een voetganger die duidelijk zijn intentie toont om over te steken voorrang?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: true },
      { id: 'b', text: { fr: 'Non', nl: 'Nee' }, correct: false },
    ],
    explanation: {
      fr: 'Les piétons ont priorité lorsqu’ils traversent ou lorsqu’ils montrent clairement leur intention de le faire.',
      nl: 'Voetgangers hebben voorrang wanneer ze oversteken of duidelijk hun intentie tonen om dat te doen.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-vp-5',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Peut-on dépasser un véhicule qui vient de s’arrêter devant un passage pour piétons ?', nl: 'Mag u een voertuig inhalen dat net gestopt is voor een voetgangersoversteekplaats?' },
    options: [
      { id: 'a', text: { fr: 'Oui, si la route semble libre', nl: 'Ja, als de weg vrij lijkt' }, correct: false },
      { id: 'b', text: { fr: 'Non, jamais', nl: 'Nee, nooit' }, correct: true },
    ],
    explanation: {
      fr: 'Il est interdit de dépasser un véhicule qui ralentit ou s’arrête devant un passage piéton, même si la route paraît libre.',
      nl: 'Het is verboden een voertuig in te halen dat vertraagt of stopt voor een voetgangersoversteekplaats, ook als de weg vrij lijkt.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-vp-6',
    themeSlug: 'voie-publique',
    region: 'BE',
    prompt: { fr: 'Une personne qui pousse une moto en panne est-elle considérée comme piéton ?', nl: 'Wordt iemand die een defecte motor voortduwt als voetganger beschouwd?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non, elle reste conductrice', nl: 'Nee, die persoon blijft bestuurder' }, correct: true },
    ],
    explanation: {
      fr: 'Contrairement à une personne qui pousse un vélo (assimilée à un piéton), celle qui pousse une moto reste conductrice : casque et permis adapté restent requis.',
      nl: 'In tegenstelling tot iemand die een fiets voortduwt (gelijkgesteld met een voetganger), blijft iemand die een motor voortduwt bestuurder: helm en geldig rijbewijs blijven vereist.',
    },
    factIds: [],
    difficulty: 'difficile',
  },

  // --- circulation-vitesse (Leçon 4, Leçon 6) ---
  {
    id: 'dp-cv-1',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: { fr: 'Quelle est la vitesse maximale normale sur autoroute en Belgique ?', nl: 'Wat is de normale maximumsnelheid op de Belgische snelweg?' },
    options: [
      { id: 'a', text: { fr: '90 km/h', nl: '90 km/u' }, correct: false },
      { id: 'b', text: { fr: '120 km/h', nl: '120 km/u' }, correct: true },
    ],
    explanation: {
      fr: 'La vitesse maximale sur autoroute est de 120 km/h, si la circulation et la météo le permettent et sans limitation signalée.',
      nl: 'De maximumsnelheid op de snelweg is 120 km/u, als het verkeer en het weer het toelaten en zonder aangegeven beperking.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-cv-2',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: { fr: 'Peut-on rouler sur la bande d’arrêt d’urgence sans raison ?', nl: 'Mag u zonder reden op de pechstrook rijden?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non', nl: 'Nee' }, correct: true },
    ],
    explanation: {
      fr: 'La bande d’arrêt d’urgence est réservée aux pannes et accidents : y rouler, s’y arrêter ou s’y stationner sans raison est interdit.',
      nl: 'De pechstrook is voorbehouden voor pech en ongevallen: erop rijden, stoppen of parkeren zonder reden is verboden.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-cv-3',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: { fr: 'Vous devez sortir du véhicule sur l’autoroute : où doit se trouver votre gilet réfléchissant ?', nl: 'U moet uitstappen op de snelweg: waar moet uw veiligheidsvest zich bevinden?' },
    options: [
      { id: 'a', text: { fr: 'Dans le coffre', nl: 'In de koffer' }, correct: false },
      { id: 'b', text: { fr: 'Dans l’habitacle, accessible', nl: 'In het interieur, bereikbaar' }, correct: true },
    ],
    explanation: {
      fr: 'Le gilet réfléchissant doit être accessible depuis l’habitacle — pas rangé dans le coffre — car il doit être mis avant de sortir du véhicule.',
      nl: 'Het veiligheidsvest moet bereikbaar zijn vanuit het interieur — niet opgeborgen in de koffer — want het moet aangetrokken worden vóór u uitstapt.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-cv-4',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: { fr: 'La vitesse maximale en agglomération est-elle la même partout en Belgique ?', nl: 'Is de maximumsnelheid binnen de bebouwde kom overal in België dezelfde?' },
    options: [
      { id: 'a', text: { fr: 'Oui, 50 km/h partout', nl: 'Ja, overal 50 km/u' }, correct: false },
      { id: 'b', text: { fr: 'Non, elle varie selon la région', nl: 'Nee, ze verschilt per gewest' }, correct: true },
    ],
    explanation: {
      fr: 'La vitesse en agglomération est de 50 km/h en Wallonie et en Flandre, mais de 30 km/h à Bruxelles-Capitale, sauf signalisation différente.',
      nl: 'De snelheid binnen de bebouwde kom is 50 km/u in Wallonië en Vlaanderen, maar 30 km/u in het Brussels Hoofdstedelijk Gewest, tenzij anders aangegeven.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-cv-5',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: { fr: 'Quelle est la vitesse maximale dans une zone résidentielle ?', nl: 'Wat is de maximumsnelheid in een woonerf?' },
    options: [
      { id: 'a', text: { fr: '30 km/h', nl: '30 km/u' }, correct: false },
      { id: 'b', text: { fr: '20 km/h — l’allure du pas', nl: '20 km/u — stapvoets' }, correct: true },
    ],
    explanation: {
      fr: 'Dans une zone résidentielle, la vitesse maximale est de 20 km/h : les piétons, dont les enfants, sont prioritaires et peuvent utiliser toute la chaussée.',
      nl: 'In een woonerf is de maximumsnelheid 20 km/u: voetgangers, inclusief kinderen, hebben voorrang en mogen de hele rijbaan gebruiken.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-cv-6',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: { fr: 'Un panneau peut-il imposer une vitesse différente de la limite générale ?', nl: 'Kan een verkeersbord een andere snelheid opleggen dan de algemene limiet?' },
    options: [
      { id: 'a', text: { fr: 'Oui, toujours', nl: 'Ja, altijd' }, correct: true },
      { id: 'b', text: { fr: 'Non, jamais', nl: 'Nee, nooit' }, correct: false },
    ],
    explanation: {
      fr: 'Les limites régionales (90/70/50/30 km/h selon le lieu) s’appliquent sauf indication différente d’un panneau, qui prime toujours.',
      nl: 'De gewestelijke limieten (90/70/50/30 km/u naargelang de plaats) gelden, tenzij een verkeersbord iets anders aangeeft — het bord heeft altijd voorrang.',
    },
    factIds: [],
    difficulty: 'moyen',
  },

  // --- signalisation-priorites (Leçon 16, Leçon 27) ---
  {
    id: 'dp-sp-1',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: { fr: 'Sans panneau ni feu, qui a la priorité à un carrefour ?', nl: 'Zonder verkeersbord of -licht: wie heeft voorrang op een kruispunt?' },
    options: [
      { id: 'a', text: { fr: 'Le véhicule venant de droite', nl: 'Het voertuig komende van rechts' }, correct: true },
      { id: 'b', text: { fr: 'Le véhicule le plus rapide', nl: 'Het snelste voertuig' }, correct: false },
    ],
    explanation: {
      fr: 'Sans signalisation, la priorité de droite s’applique : vous devez laisser passer les véhicules venant de votre droite.',
      nl: 'Zonder signalisatie geldt voorrang van rechts: u moet voertuigen die van rechts komen laten voorgaan.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-sp-2',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: { fr: 'Au panneau STOP, un simple ralentissement suffit-il ?', nl: 'Volstaat vertragen bij een STOP-bord?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non, un arrêt complet est obligatoire', nl: 'Nee, een volledige stop is verplicht' }, correct: true },
    ],
    explanation: {
      fr: 'Le panneau STOP impose un arrêt complet obligatoire, même si la route semble vide — un simple ralentissement ne suffit pas.',
      nl: 'Het STOP-bord verplicht een volledige stilstand, ook als de weg leeg lijkt — gewoon vertragen volstaat niet.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-sp-3',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: { fr: 'En sortant d’un parking ou d’une propriété privée, avez-vous la priorité ?', nl: 'Hebt u voorrang wanneer u een parking of privéterrein verlaat?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non, vous devez céder le passage', nl: 'Nee, u moet voorrang verlenen' }, correct: true },
    ],
    explanation: {
      fr: 'En sortant d’un parking, d’un garage, d’une station-service ou d’un terrain privé, vous devez céder le passage à tous les usagers.',
      nl: 'Bij het verlaten van een parking, garage, tankstation of privéterrein moet u alle weggebruikers laten voorgaan.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-sp-4',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: { fr: 'Un feu vert donne-t-il toujours la priorité absolue ?', nl: 'Geeft een groen licht altijd absolute voorrang?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non', nl: 'Nee' }, correct: true },
    ],
    explanation: {
      fr: 'Même au vert, vous devez rester attentif aux piétons, cyclistes et véhicules prioritaires, et ne jamais entrer dans un carrefour si vous risquez d’y rester bloqué.',
      nl: 'Ook bij groen moet u alert blijven voor voetgangers, fietsers en prioritaire voertuigen, en nooit een kruispunt oprijden als u er vast dreigt te komen zitten.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-sp-5',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: { fr: 'Que signifie un feu orange ?', nl: 'Wat betekent een oranje licht?' },
    options: [
      { id: 'a', text: { fr: 'Accélérer pour passer', nl: 'Versnellen om te passeren' }, correct: false },
      { id: 'b', text: { fr: 'S’arrêter, sauf si le freinage devient dangereux', nl: 'Stoppen, tenzij remmen gevaarlijk wordt' }, correct: true },
    ],
    explanation: {
      fr: 'Le feu orange impose un arrêt, sauf si le freinage devient dangereux — dans ce cas vous pouvez continuer prudemment.',
      nl: 'Oranje licht verplicht te stoppen, tenzij remmen gevaarlijk wordt — in dat geval mag u voorzichtig doorrijden.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-sp-6',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: { fr: 'Les feux de circulation sont en panne : que faites-vous ?', nl: 'De verkeerslichten zijn defect: wat doet u?' },
    options: [
      { id: 'a', text: { fr: 'Vous passez en premier, quoi qu’il arrive', nl: 'U rijdt als eerste, wat er ook gebeurt' }, correct: false },
      { id: 'b', text: { fr: 'Vous appliquez les règles normales de priorité (souvent la priorité de droite)', nl: 'U past de normale voorrangsregels toe (vaak voorrang van rechts)' }, correct: true },
    ],
    explanation: {
      fr: 'En cas de panne des feux, les règles normales de priorité s’appliquent — le plus souvent la priorité de droite.',
      nl: 'Bij een defect aan de verkeerslichten gelden de normale voorrangsregels — meestal voorrang van rechts.',
    },
    factIds: [],
    difficulty: 'moyen',
  },

  // --- stationnement (Leçon 18) ---
  {
    id: 'dp-st-1',
    themeSlug: 'stationnement',
    region: 'BE',
    prompt: { fr: 'Peut-on stationner sur une piste cyclable ?', nl: 'Mag u parkeren op een fietspad?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non', nl: 'Nee' }, correct: true },
    ],
    explanation: {
      fr: 'Le stationnement est interdit sur une piste cyclable, un passage piéton, devant une sortie de garage, dans un carrefour, sur autoroute ou près d’un virage dangereux.',
      nl: 'Parkeren is verboden op een fietspad, een voetgangersoversteekplaats, voor een garage-uitrit, op een kruispunt, op de snelweg of nabij een gevaarlijke bocht.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-st-2',
    themeSlug: 'stationnement',
    region: 'BE',
    prompt: { fr: 'Pendant une manœuvre de stationnement, qui a la priorité ?', nl: 'Tijdens een parkeermanoeuvre: wie heeft voorrang?' },
    options: [
      { id: 'a', text: { fr: 'Le véhicule qui manœuvre', nl: 'Het manoeuvrerende voertuig' }, correct: false },
      { id: 'b', text: { fr: 'Les autres usagers', nl: 'De andere weggebruikers' }, correct: true },
    ],
    explanation: {
      fr: 'Pendant une manœuvre, vous devez céder le passage aux autres usagers et observer attentivement.',
      nl: 'Tijdens een manoeuvre moet u voorrang verlenen aan de andere weggebruikers en goed opletten.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-st-3',
    themeSlug: 'stationnement',
    region: 'BE',
    prompt: { fr: 'Avant d’ouvrir votre portière, que devez-vous faire ?', nl: 'Wat moet u doen voor u uw portier opent?' },
    options: [
      { id: 'a', text: { fr: 'Rien de particulier', nl: 'Niets bijzonders' }, correct: false },
      { id: 'b', text: { fr: 'Regarder derrière vous', nl: 'Achter u kijken' }, correct: true },
    ],
    explanation: {
      fr: 'Un cycliste ou une moto peut arriver rapidement : il faut toujours regarder derrière soi avant d’ouvrir une portière.',
      nl: 'Een fietser of motorrijder kan snel naderen: kijk altijd achterom voor u het portier opent.',
    },
    factIds: [],
    difficulty: 'facile',
  },

  // --- vehicule-technique (Leçon 9, Leçon 33) ---
  {
    id: 'dp-vt-1',
    themeSlug: 'vehicule-technique',
    region: 'BE',
    prompt: { fr: 'Que signifie « MMA » ?', nl: 'Wat betekent "MTM"?' },
    options: [
      { id: 'a', text: { fr: 'Masse Moyenne Autorisée', nl: 'Gemiddelde Toegelaten Massa' }, correct: false },
      { id: 'b', text: { fr: 'Masse Maximale Autorisée', nl: 'Maximaal Toegelaten Massa' }, correct: true },
    ],
    explanation: {
      fr: 'MMA = Masse Maximale Autorisée : le poids maximal qu’un véhicule peut atteindre avec passagers, carburant, bagages et chargement.',
      nl: 'MTM = Maximaal Toegelaten Massa: het maximale gewicht dat een voertuig mag bereiken met inzittenden, brandstof, bagage en lading.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-vt-2',
    themeSlug: 'vehicule-technique',
    region: 'BE',
    prompt: { fr: 'Quelle est la limite de MMA pour conduire avec un permis B ?', nl: 'Wat is de MTM-limiet om te rijden met een rijbewijs B?' },
    options: [
      { id: 'a', text: { fr: '2 tonnes', nl: '2 ton' }, correct: false },
      { id: 'b', text: { fr: '3,5 tonnes', nl: '3,5 ton' }, correct: true },
      { id: 'c', text: { fr: '5 tonnes', nl: '5 ton' }, correct: false },
    ],
    explanation: {
      fr: 'Avec un permis B, vous pouvez conduire un véhicule dont la MMA ne dépasse pas 3,5 tonnes (3 500 kg).',
      nl: 'Met een rijbewijs B mag u een voertuig besturen met een MTM van maximaal 3,5 ton (3.500 kg).',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-vt-3',
    themeSlug: 'vehicule-technique',
    region: 'BE',
    prompt: { fr: 'Une voiture surchargée est-elle plus dangereuse à conduire ?', nl: 'Is een overladen auto gevaarlijker om te besturen?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: true },
      { id: 'b', text: { fr: 'Non', nl: 'Nee' }, correct: false },
    ],
    explanation: {
      fr: 'Une surcharge réduit le freinage et la stabilité du véhicule, et augmente les risques d’accident.',
      nl: 'Overlading vermindert de remkracht en stabiliteit van het voertuig en verhoogt het risico op ongevallen.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-vt-4',
    themeSlug: 'vehicule-technique',
    region: 'BE',
    prompt: { fr: 'Les pneus influencent-ils la distance de freinage ?', nl: 'Beïnvloeden banden de remafstand?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: true },
      { id: 'b', text: { fr: 'Non', nl: 'Nee' }, correct: false },
    ],
    explanation: {
      fr: 'Les pneus sont le seul contact entre le véhicule et la route : leur état influence directement le freinage, la stabilité et les virages.',
      nl: 'Banden zijn het enige contact tussen het voertuig en de weg: hun toestand beïnvloedt rechtstreeks het remmen, de stabiliteit en de bochten.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-vt-5',
    themeSlug: 'vehicule-technique',
    region: 'BE',
    prompt: { fr: 'L’aquaplaning se produit surtout :', nl: 'Aquaplaning gebeurt vooral:' },
    options: [
      { id: 'a', text: { fr: 'Sur route mouillée', nl: 'Op een natte weg' }, correct: true },
      { id: 'b', text: { fr: 'Sur route sèche', nl: 'Op een droge weg' }, correct: false },
    ],
    explanation: {
      fr: 'L’aquaplaning survient quand les pneus perdent le contact avec une route très mouillée et que le véhicule glisse sur l’eau.',
      nl: 'Aquaplaning treedt op wanneer de banden het contact met een zeer natte weg verliezen en het voertuig op het water glijdt.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-vt-6',
    themeSlug: 'vehicule-technique',
    region: 'BE',
    prompt: { fr: 'Que faire en cas d’aquaplaning ?', nl: 'Wat te doen bij aquaplaning?' },
    options: [
      { id: 'a', text: { fr: 'Freiner brutalement', nl: 'Bruusk remmen' }, correct: false },
      { id: 'b', text: { fr: 'Garder le volant droit et relâcher doucement l’accélérateur', nl: 'Het stuur recht houden en het gaspedaal langzaam loslaten' }, correct: true },
    ],
    explanation: {
      fr: 'Il ne faut jamais freiner brutalement en cas d’aquaplaning : il faut garder le volant droit et relâcher doucement l’accélérateur en attendant que les pneus retrouvent l’adhérence.',
      nl: 'Bij aquaplaning mag u nooit bruusk remmen: houd het stuur recht en laat het gaspedaal langzaam los tot de banden opnieuw grip krijgen.',
    },
    factIds: [],
    difficulty: 'difficile',
  },

  // --- securite-comportement (Leçon 14, Leçon 26, Leçon 35) ---
  {
    id: 'dp-sc-1',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: { fr: 'Les rétroviseurs permettent-ils de voir tous les dangers autour du véhicule ?', nl: 'Kunt u met de spiegels alle gevaren rond het voertuig zien?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non — il reste des angles morts', nl: 'Nee — er blijven dode hoeken' }, correct: true },
    ],
    explanation: {
      fr: 'Les angles morts ne sont visibles ni dans les rétroviseurs ni directement devant vous — un contrôle rapide par-dessus l’épaule est nécessaire.',
      nl: 'Dode hoeken zijn niet zichtbaar in de spiegels, noch rechtstreeks voor u — een snelle blik over de schouder is nodig.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-sc-2',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: { fr: 'Quand faut-il vérifier ses angles morts ?', nl: 'Wanneer moet u uw dode hoeken controleren?' },
    options: [
      { id: 'a', text: { fr: 'Seulement sur autoroute', nl: 'Enkel op de snelweg' }, correct: false },
      { id: 'b', text: { fr: 'Avant chaque manœuvre importante', nl: 'Voor elke belangrijke manoeuvre' }, correct: true },
    ],
    explanation: {
      fr: 'Les angles morts doivent être contrôlés avant chaque changement de bande, chaque virage, chaque dépassement et avant de quitter un stationnement ou d’ouvrir une portière.',
      nl: 'Dode hoeken moeten gecontroleerd worden voor elke rijstrookwissel, elke bocht, elke inhaalmanoeuvre en voor u een parkeerplaats verlaat of een portier opent.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-sc-3',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: { fr: 'Quels usagers sont particulièrement difficiles à voir dans les angles morts ?', nl: 'Welke weggebruikers zijn bijzonder moeilijk te zien in de dode hoek?' },
    options: [
      { id: 'a', text: { fr: 'Les camions', nl: 'Vrachtwagens' }, correct: false },
      { id: 'b', text: { fr: 'Les cyclistes et motards', nl: 'Fietsers en motorrijders' }, correct: true },
    ],
    explanation: {
      fr: 'Les cyclistes et motards, plus petits et rapides, sont particulièrement difficiles à repérer dans les angles morts.',
      nl: 'Fietsers en motorrijders, kleiner en sneller, zijn bijzonder moeilijk te zien in de dode hoek.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-sc-4',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: { fr: 'Quelle est la limite légale d’alcool pour un conducteur classique en Belgique ?', nl: 'Wat is de wettelijke alcohollimiet voor een gewone bestuurder in België?' },
    options: [
      { id: 'a', text: { fr: '0,22 mg/l d’air expiré', nl: '0,22 mg/l uitgeademde lucht' }, correct: true },
      { id: 'b', text: { fr: '0,35 mg/l d’air expiré', nl: '0,35 mg/l uitgeademde lucht' }, correct: false },
    ],
    explanation: {
      fr: 'La limite légale est de 0,22 mg/l d’air expiré (≈ 0,5 g/l de sang) ; elle est plus basse (0,09 mg/l) pour les conducteurs professionnels (taxis, bus, poids lourds, transport scolaire).',
      nl: 'De wettelijke limiet is 0,22 mg/l uitgeademde lucht (≈ 0,5 g/l bloed); ze ligt lager (0,09 mg/l) voor beroepschauffeurs (taxi, bus, vrachtwagen, schoolvervoer).',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-sc-5',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: { fr: 'À partir de quel taux le test d’haleine est-il considéré positif (« P ») ?', nl: 'Vanaf welk gehalte wordt de ademtest als positief ("P") beschouwd?' },
    options: [
      { id: 'a', text: { fr: '0,22 mg/l d’air expiré', nl: '0,22 mg/l uitgeademde lucht' }, correct: false },
      { id: 'b', text: { fr: '0,35 mg/l d’air expiré', nl: '0,35 mg/l uitgeademde lucht' }, correct: true },
    ],
    explanation: {
      fr: 'Un résultat « P » (positif) correspond à un taux d’au moins 0,35 mg/l d’air expiré, soit environ 0,8 g/l de sang.',
      nl: 'Een "P"-resultaat (positief) komt overeen met minstens 0,35 mg/l uitgeademde lucht, ofwel ongeveer 0,8 g/l bloed.',
    },
    factIds: [],
    difficulty: 'difficile',
  },
  {
    id: 'dp-sc-6',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: { fr: 'Refuser de passer le test d’alcoolémie est-il sans conséquence ?', nl: 'Is het weigeren van de ademtest zonder gevolg?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non — vous devez attendre avant de reprendre le volant', nl: 'Nee — u moet wachten voor u opnieuw mag rijden' }, correct: true },
    ],
    explanation: {
      // Corrigé le 2026-08-20 : la version précédente ("automatiquement positif")
      // contredisait syntheseB.pdf (voir verified/synthese-b/facts.ts,
      // sb-alcool-table, p.18), qui distingue clairement le refus (12h
      // d'attente) du résultat positif (15 jours). On s'aligne sur la
      // source la plus précise/datée.
      fr: 'Refuser le test entraîne 12 heures d’attente avant de pouvoir reconduire (comme un résultat « alarme »), et une amende possible.',
      nl: 'Weigeren van de test leidt tot 12 uur wachttijd voor u weer mag rijden (zoals bij een "alarm"-resultaat), en een mogelijke boete.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-sc-7',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: { fr: 'Quel est le numéro d’urgence unique en Belgique ?', nl: 'Wat is het uniforme noodnummer in België?' },
    options: [
      { id: 'a', text: { fr: '112', nl: '112' }, correct: true },
      { id: 'b', text: { fr: '911', nl: '911' }, correct: false },
    ],
    explanation: { fr: 'Le 112 est le numéro d’urgence unique en Belgique.', nl: 'Het 112 is het uniforme noodnummer in België.' },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'dp-sc-8',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: { fr: 'Peut-on quitter les lieux d’un accident sans autorisation ?', nl: 'Mag u de plaats van een ongeval verlaten zonder toestemming?' },
    options: [
      { id: 'a', text: { fr: 'Oui', nl: 'Ja' }, correct: false },
      { id: 'b', text: { fr: 'Non', nl: 'Nee' }, correct: true },
    ],
    explanation: {
      fr: 'Quitter les lieux d’un accident sans autorisation est interdit et peut entraîner de lourdes sanctions, voire des poursuites judiciaires.',
      nl: 'De plaats van een ongeval verlaten zonder toestemming is verboden en kan leiden tot zware sancties, of zelfs gerechtelijke vervolging.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'dp-sc-9',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: { fr: 'Après un accident sur autoroute, où devez-vous attendre les secours ?', nl: 'Waar wacht u op hulp na een ongeval op de snelweg?' },
    options: [
      { id: 'a', text: { fr: 'Sur la chaussée', nl: 'Op de rijbaan' }, correct: false },
      { id: 'b', text: { fr: 'Derrière la barrière de sécurité, avec un gilet réfléchissant', nl: 'Achter de vangrail, met een veiligheidsvest aan' }, correct: true },
    ],
    explanation: {
      fr: 'Sur autoroute, il faut quitter le véhicule prudemment, rester derrière les barrières de sécurité et porter un gilet réfléchissant en attendant les secours.',
      nl: 'Op de snelweg moet u voorzichtig uitstappen, achter de vangrail blijven en een veiligheidsvest dragen in afwachting van hulp.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
]
