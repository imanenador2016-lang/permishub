import type { Question } from '@/domain/quiz'

/**
 * Questions "Teste ton niveau" avec photo â€” remplace le pool gÃ©nÃ©rÃ© par
 * thÃ¨me (2 questions/thÃ¨me piochÃ©es dans content/verified/*) Ã  la demande
 * de l'utilisateur, qui a fourni ces 11 questions avec photo et rÃ©ponse
 * dans test-evaluation-.docx (voir conversation du 2026-08-28). Deux
 * questions du document n'avaient pas de rÃ©ponse marquÃ©e â€” l'utilisateur
 * les a confirmÃ©es explicitement (voir conversation), pas de rÃ©ponse
 * devinÃ©e.
 *
 * MÃªme statut que `content/imported/documents-permis-quiz.ts` : contenu
 * rÃ©el (question + bonne rÃ©ponse fournies par l'utilisateur), mais
 * `factIds` vide â€” pas encore reliÃ© Ã  une page PDF prÃ©cise ni relu en
 * croisÃ© (voir docs/CONTENT_PIPELINE.md). Les explications se limitent Ã 
 * reformuler la rÃ©ponse dÃ©jÃ  donnÃ©e, sans ajouter de fait non vÃ©rifiÃ©. Le
 * texte nÃ©erlandais est ma traduction, pas une source officielle distincte.
 *
 * Photos traitÃ©es depuis test-evaluation-.docx â€” voir
 * scripts/process-test-de-niveau-images.mjs, public/test-de-niveau/.
 */
export const TEST_DE_NIVEAU_PHOTO_QUESTIONS: Question[] = [
  {
    id: 'tdn-1',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: {
      fr: 'Qui peut sâ€™engager en premier dans ce carrefour ?',
      nl: 'Wie mag als eerste dit kruispunt oprijden?',
    },
    imageUrl: '/test-de-niveau/q01.jpg',
    options: [
      { id: 'a', text: { fr: 'Voiture A.', nl: 'Auto A.' }, correct: false },
      { id: 'b', text: { fr: 'Voiture B.', nl: 'Auto B.' }, correct: false },
      { id: 'c', text: { fr: 'Voiture C.', nl: 'Auto C.' }, correct: true },
    ],
    explanation: {
      fr: 'Câ€™est la voiture C qui peut sâ€™engager en premier dans ce carrefour.',
      nl: 'Auto C mag als eerste dit kruispunt oprijden.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'tdn-2',
    themeSlug: 'stationnement',
    region: 'BE',
    prompt: {
      fr: 'Ã€ cet endroit, la voiture bleue peut...',
      nl: 'Op deze plaats mag de blauwe auto...',
    },
    imageUrl: '/test-de-niveau/q02.jpg',
    options: [
      { id: 'a', text: { fr: 'Seulement sâ€™arrÃªter.', nl: 'Enkel stilstaan.' }, correct: true },
      { id: 'b', text: { fr: 'Sâ€™arrÃªter et stationner.', nl: 'Stilstaan en parkeren.' }, correct: false },
      { id: 'c', text: { fr: 'Ni stationner ni sâ€™arrÃªter.', nl: 'Noch parkeren, noch stilstaan.' }, correct: false },
    ],
    explanation: {
      fr: 'Ã€ cet endroit, la voiture bleue peut seulement sâ€™arrÃªter â€” pas y stationner.',
      nl: 'Op deze plaats mag de blauwe auto enkel stilstaan â€” niet parkeren.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'tdn-3',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: {
      fr: 'Vous avez le permis de conduire provisoire B. Pouvez-vous dÃ©passer un camion au-delÃ  de ces signaux routiers ?',
      nl: 'U heeft een voorlopig rijbewijs B. Mag u een vrachtwagen voorbij deze verkeersborden inhalen?',
    },
    imageUrl: '/test-de-niveau/q03.jpg',
    options: [
      { id: 'a', text: { fr: 'Oui.', nl: 'Ja.' }, correct: true },
      { id: 'b', text: { fr: 'Non.', nl: 'Nee.' }, correct: false },
    ],
    explanation: {
      fr: 'Avec un permis provisoire B, vous pouvez dÃ©passer un camion Ã  cet endroit.',
      nl: 'Met een voorlopig rijbewijs B mag u hier een vrachtwagen inhalen.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'tdn-4',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: {
      fr: 'Pouvez-vous dÃ©passer par la gauche avec une voiture un cycliste dans une rue cyclable ?',
      nl: 'Mag u met een auto een fietser links inhalen in een fietsstraat?',
    },
    imageUrl: '/test-de-niveau/q04.jpg',
    options: [
      { id: 'a', text: { fr: 'Oui.', nl: 'Ja.' }, correct: false },
      { id: 'b', text: { fr: 'Oui, si vous pouvez obtenir 1 mÃ¨tre dâ€™Ã©cart en toute sÃ©curitÃ©.', nl: 'Ja, als u veilig 1 meter afstand kan houden.' }, correct: false },
      { id: 'c', text: { fr: 'Non.', nl: 'Nee.' }, correct: true },
    ],
    explanation: {
      fr: 'Dans une rue cyclable, une voiture ne peut pas dÃ©passer un cycliste.',
      nl: 'In een fietsstraat mag een auto een fietser niet inhalen.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'tdn-5',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: {
      fr: 'Ã€ quelle catÃ©gorie appartient ce signal ?',
      nl: 'Tot welke categorie behoort dit verkeersbord?',
    },
    imageUrl: '/test-de-niveau/q05.jpg',
    options: [
      { id: 'a', text: { fr: 'Signal dâ€™obligation.', nl: 'Gebodsbord.' }, correct: false },
      { id: 'b', text: { fr: 'Signal dâ€™interdiction.', nl: 'Verbodsbord.' }, correct: true },
      { id: 'c', text: { fr: 'Signal de danger.', nl: 'Gevaarsbord.' }, correct: false },
    ],
    explanation: {
      fr: 'Ce signal est un signal dâ€™interdiction.',
      nl: 'Dit is een verbodsbord.',
    },
    factIds: [],
    difficulty: 'facile',
  },
  {
    id: 'tdn-6',
    themeSlug: 'vehicule-technique',
    region: 'BE',
    prompt: {
      fr: 'Quand le feu arriÃ¨re de brouillard doit-il Ãªtre allumÃ© ?',
      nl: 'Wanneer moet het achterste mistlicht branden?',
    },
    imageUrl: '/test-de-niveau/q06.jpg',
    options: [
      { id: 'a', text: { fr: 'Toujours en cas de brouillard.', nl: 'Altijd bij mist.' }, correct: false },
      { id: 'b', text: { fr: 'Lorsque la visibilitÃ© est infÃ©rieure Ã  100 mÃ¨tres.', nl: 'Wanneer het zicht minder dan 100 meter bedraagt.' }, correct: true },
      { id: 'c', text: { fr: 'Lorsque la visibilitÃ© est infÃ©rieure Ã  50 mÃ¨tres.', nl: 'Wanneer het zicht minder dan 50 meter bedraagt.' }, correct: false },
    ],
    explanation: {
      fr: 'Le feu arriÃ¨re de brouillard doit Ãªtre allumÃ© lorsque la visibilitÃ© est infÃ©rieure Ã  100 mÃ¨tres.',
      nl: 'Het achterste mistlicht moet branden wanneer het zicht minder dan 100 meter bedraagt.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'tdn-7',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: {
      fr: 'Cette voiture...',
      nl: 'Deze auto...',
    },
    imageUrl: '/test-de-niveau/q07.jpg',
    options: [
      { id: 'a', text: { fr: '... peut tourner Ã  gauche ou Ã  droite.', nl: '... mag links of rechts afslaan.' }, correct: false },
      { id: 'b', text: { fr: '... doit tourner Ã  droite.', nl: '... moet rechts afslaan.' }, correct: true },
    ],
    explanation: {
      fr: 'Cette voiture doit tourner Ã  droite.',
      nl: 'Deze auto moet rechts afslaan.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'tdn-8',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: {
      fr: 'Vous devez vous arrÃªter, parce que vous conduisiez dans une agglomÃ©ration en Flandre Ã  77 km/h. Quelles sont les consÃ©quences ?',
      nl: 'U moet stoppen, want u reed in Vlaanderen aan 77 km/u in de bebouwde kom. Wat zijn de gevolgen?',
    },
    imageUrl: '/test-de-niveau/q08.jpg',
    options: [
      { id: 'a', text: { fr: 'Vous devez payer une amende Ã  la police.', nl: 'U moet een boete betalen aan de politie.' }, correct: false },
      { id: 'b', text: { fr: 'Votre permis de conduire peut Ãªtre retirÃ© sur-le-champ.', nl: 'Uw rijbewijs kan onmiddellijk worden ingetrokken.' }, correct: true },
      { id: 'c', text: { fr: 'Vous devez apparaÃ®tre dans les 14 jours devant le juge.', nl: 'U moet binnen de 14 dagen voor de rechter verschijnen.' }, correct: false },
    ],
    explanation: {
      fr: 'Dans ce cas, votre permis de conduire peut Ãªtre retirÃ© sur-le-champ.',
      nl: 'In dit geval kan uw rijbewijs onmiddellijk worden ingetrokken.',
    },
    factIds: [],
    difficulty: 'difficile',
  },
  {
    id: 'tdn-9',
    themeSlug: 'vehicule-technique',
    region: 'BE',
    prompt: {
      fr: 'Jusquâ€™Ã  quelle distance une charge indivisible peut-elle dÃ©passer Ã  lâ€™avant de la voiture sans signalisation ?',
      nl: 'Tot op welke afstand mag een ondeelbare lading vooraan de auto uitsteken zonder signalisatie?',
    },
    imageUrl: '/test-de-niveau/q09.jpg',
    options: [
      { id: 'a', text: { fr: '1 mÃ¨tre.', nl: '1 meter.' }, correct: false },
      { id: 'b', text: { fr: '0,5 mÃ¨tre.', nl: '0,5 meter.' }, correct: false },
      { id: 'c', text: { fr: 'Pas du tout.', nl: 'Helemaal niet.' }, correct: true },
    ],
    explanation: {
      fr: 'Ã€ lâ€™avant de la voiture, une charge indivisible ne peut pas dÃ©passer du tout sans signalisation.',
      nl: 'Vooraan de auto mag een ondeelbare lading helemaal niet uitsteken zonder signalisatie.',
    },
    factIds: [],
    difficulty: 'difficile',
  },
  {
    id: 'tdn-10',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: {
      fr: 'Sur une route ordinaire oÃ¹ la vitesse est limitÃ©e Ã  90 km/h, vous roulez Ã  120 km/h. Quelles sont les consÃ©quences ?',
      nl: 'Op een gewone weg met een snelheidslimiet van 90 km/u rijdt u 120 km/u. Wat zijn de gevolgen?',
    },
    imageUrl: '/test-de-niveau/q10.jpg',
    options: [
      { id: 'a', text: { fr: 'Vous recevrez une amende.', nl: 'U krijgt een boete.' }, correct: true },
      { id: 'b', text: { fr: 'Votre permis sera temporairement retirÃ©.', nl: 'Uw rijbewijs wordt tijdelijk ingetrokken.' }, correct: false },
      { id: 'c', text: { fr: 'Vous devrez repasser votre examen thÃ©orique et pratique.', nl: 'U moet uw theorie- en praktijkexamen opnieuw afleggen.' }, correct: false },
    ],
    explanation: {
      fr: 'Dans ce cas, vous recevrez une amende.',
      nl: 'In dit geval krijgt u een boete.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'tdn-11',
    themeSlug: 'securite-comportement',
    region: 'BE',
    prompt: {
      fr: 'Le rÃ©sultat dâ€™un test de lâ€™haleine est de 0,5 â€°. Quelle est la consÃ©quence ?',
      nl: 'Het resultaat van een ademtest is 0,5 â€°. Wat is het gevolg?',
    },
    imageUrl: '/test-de-niveau/q11.jpg',
    options: [
      { id: 'a', text: { fr: 'Vous pouvez poursuivre votre route.', nl: 'U mag uw weg verderzetten.' }, correct: false },
      { id: 'b', text: { fr: 'Vous recevez une interdiction immÃ©diate de conduire pendant 3 heures.', nl: 'U krijgt een onmiddellijk rijverbod van 3 uur.' }, correct: false },
      { id: 'c', text: { fr: 'Vous recevez une interdiction immÃ©diate de conduire pendant 12 heures.', nl: 'U krijgt een onmiddellijk rijverbod van 12 uur.' }, correct: true },
    ],
    explanation: {
      fr: 'Un rÃ©sultat de 0,5 â€° entraÃ®ne une interdiction immÃ©diate de conduire de 12 heures.',
      nl: 'Een resultaat van 0,5 â€° leidt tot een onmiddellijk rijverbod van 12 uur.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
]

