import type { Question } from '@/domain/quiz'

/**
 * Questions "Teste ton niveau" avec photo — remplace le pool généré par
 * thème (2 questions/thème piochées dans content/verified/*) à la demande
 * de l'utilisateur, qui a fourni ces 11 questions avec photo et réponse
 * dans test-evaluation-.docx (voir conversation du 2026-08-28). Deux
 * questions du document n'avaient pas de réponse marquée — l'utilisateur
 * les a confirmées explicitement (voir conversation), pas de réponse
 * devinée.
 *
 * Même statut que `content/imported/documents-permis-quiz.ts` : contenu
 * réel (question + bonne réponse fournies par l'utilisateur), mais
 * `factIds` vide — pas encore relié à une page PDF précise ni relu en
 * croisé (voir docs/CONTENT_PIPELINE.md). Les explications se limitent à
 * reformuler la réponse déjà donnée, sans ajouter de fait non vérifié. Le
 * texte néerlandais est ma traduction, pas une source officielle distincte.
 *
 * Photos traitées depuis test-evaluation-.docx — voir
 * scripts/process-test-de-niveau-images.mjs, public/test-de-niveau/.
 */
export const TEST_DE_NIVEAU_PHOTO_QUESTIONS: Question[] = [
  {
    id: 'tdn-1',
    themeSlug: 'signalisation-priorites',
    region: 'BE',
    prompt: {
      fr: 'Qui peut s’engager en premier dans ce carrefour ?',
      nl: 'Wie mag als eerste dit kruispunt oprijden?',
    },
    imageUrl: '/test-de-niveau/q01.jpg',
    options: [
      { id: 'a', text: { fr: 'Voiture A.', nl: 'Auto A.' }, correct: false },
      { id: 'b', text: { fr: 'Voiture B.', nl: 'Auto B.' }, correct: false },
      { id: 'c', text: { fr: 'Voiture C.', nl: 'Auto C.' }, correct: true },
    ],
    explanation: {
      fr: 'C’est la voiture C qui peut s’engager en premier dans ce carrefour.',
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
      fr: 'À cet endroit, la voiture bleue peut...',
      nl: 'Op deze plaats mag de blauwe auto...',
    },
    imageUrl: '/test-de-niveau/q02.jpg',
    options: [
      { id: 'a', text: { fr: 'Seulement s’arrêter.', nl: 'Enkel stilstaan.' }, correct: true },
      { id: 'b', text: { fr: 'S’arrêter et stationner.', nl: 'Stilstaan en parkeren.' }, correct: false },
      { id: 'c', text: { fr: 'Ni stationner ni s’arrêter.', nl: 'Noch parkeren, noch stilstaan.' }, correct: false },
    ],
    explanation: {
      fr: 'À cet endroit, la voiture bleue peut seulement s’arrêter — pas y stationner.',
      nl: 'Op deze plaats mag de blauwe auto enkel stilstaan — niet parkeren.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
  {
    id: 'tdn-3',
    themeSlug: 'circulation-vitesse',
    region: 'BE',
    prompt: {
      fr: 'Vous avez le permis de conduire provisoire B. Pouvez-vous dépasser un camion au-delà de ces signaux routiers ?',
      nl: 'U heeft een voorlopig rijbewijs B. Mag u een vrachtwagen voorbij deze verkeersborden inhalen?',
    },
    imageUrl: '/test-de-niveau/q03.jpg',
    options: [
      { id: 'a', text: { fr: 'Oui.', nl: 'Ja.' }, correct: true },
      { id: 'b', text: { fr: 'Non.', nl: 'Nee.' }, correct: false },
    ],
    explanation: {
      fr: 'Avec un permis provisoire B, vous pouvez dépasser un camion à cet endroit.',
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
      fr: 'Pouvez-vous dépasser par la gauche avec une voiture un cycliste dans une rue cyclable ?',
      nl: 'Mag u met een auto een fietser links inhalen in een fietsstraat?',
    },
    imageUrl: '/test-de-niveau/q04.jpg',
    options: [
      { id: 'a', text: { fr: 'Oui.', nl: 'Ja.' }, correct: false },
      { id: 'b', text: { fr: 'Oui, si vous pouvez obtenir 1 mètre d’écart en toute sécurité.', nl: 'Ja, als u veilig 1 meter afstand kan houden.' }, correct: false },
      { id: 'c', text: { fr: 'Non.', nl: 'Nee.' }, correct: true },
    ],
    explanation: {
      fr: 'Dans une rue cyclable, une voiture ne peut pas dépasser un cycliste.',
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
      fr: 'À quelle catégorie appartient ce signal ?',
      nl: 'Tot welke categorie behoort dit verkeersbord?',
    },
    imageUrl: '/test-de-niveau/q05.jpg',
    options: [
      { id: 'a', text: { fr: 'Signal d’obligation.', nl: 'Gebodsbord.' }, correct: false },
      { id: 'b', text: { fr: 'Signal d’interdiction.', nl: 'Verbodsbord.' }, correct: true },
      { id: 'c', text: { fr: 'Signal de danger.', nl: 'Gevaarsbord.' }, correct: false },
    ],
    explanation: {
      fr: 'Ce signal est un signal d’interdiction.',
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
      fr: 'Quand le feu arrière de brouillard doit-il être allumé ?',
      nl: 'Wanneer moet het achterste mistlicht branden?',
    },
    imageUrl: '/test-de-niveau/q06.jpg',
    options: [
      { id: 'a', text: { fr: 'Toujours en cas de brouillard.', nl: 'Altijd bij mist.' }, correct: false },
      { id: 'b', text: { fr: 'Lorsque la visibilité est inférieure à 100 mètres.', nl: 'Wanneer het zicht minder dan 100 meter bedraagt.' }, correct: true },
      { id: 'c', text: { fr: 'Lorsque la visibilité est inférieure à 50 mètres.', nl: 'Wanneer het zicht minder dan 50 meter bedraagt.' }, correct: false },
    ],
    explanation: {
      fr: 'Le feu arrière de brouillard doit être allumé lorsque la visibilité est inférieure à 100 mètres.',
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
      { id: 'a', text: { fr: '... peut tourner à gauche ou à droite.', nl: '... mag links of rechts afslaan.' }, correct: false },
      { id: 'b', text: { fr: '... doit tourner à droite.', nl: '... moet rechts afslaan.' }, correct: true },
    ],
    explanation: {
      fr: 'Cette voiture doit tourner à droite.',
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
      fr: 'Vous devez vous arrêter, parce que vous conduisiez dans une agglomération en Flandre à 77 km/h. Quelles sont les conséquences ?',
      nl: 'U moet stoppen, want u reed in Vlaanderen aan 77 km/u in de bebouwde kom. Wat zijn de gevolgen?',
    },
    imageUrl: '/test-de-niveau/q08.jpg',
    options: [
      { id: 'a', text: { fr: 'Vous devez payer une amende à la police.', nl: 'U moet een boete betalen aan de politie.' }, correct: false },
      { id: 'b', text: { fr: 'Votre permis de conduire peut être retiré sur-le-champ.', nl: 'Uw rijbewijs kan onmiddellijk worden ingetrokken.' }, correct: true },
      { id: 'c', text: { fr: 'Vous devez apparaître dans les 14 jours devant le juge.', nl: 'U moet binnen de 14 dagen voor de rechter verschijnen.' }, correct: false },
    ],
    explanation: {
      fr: 'Dans ce cas, votre permis de conduire peut être retiré sur-le-champ.',
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
      fr: 'Jusqu’à quelle distance une charge indivisible peut-elle dépasser à l’avant de la voiture sans signalisation ?',
      nl: 'Tot op welke afstand mag een ondeelbare lading vooraan de auto uitsteken zonder signalisatie?',
    },
    imageUrl: '/test-de-niveau/q09.jpg',
    options: [
      { id: 'a', text: { fr: '1 mètre.', nl: '1 meter.' }, correct: false },
      { id: 'b', text: { fr: '0,5 mètre.', nl: '0,5 meter.' }, correct: false },
      { id: 'c', text: { fr: 'Pas du tout.', nl: 'Helemaal niet.' }, correct: true },
    ],
    explanation: {
      fr: 'À l’avant de la voiture, une charge indivisible ne peut pas dépasser du tout sans signalisation.',
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
      fr: 'Sur une route ordinaire où la vitesse est limitée à 90 km/h, vous roulez à 120 km/h. Quelles sont les conséquences ?',
      nl: 'Op een gewone weg met een snelheidslimiet van 90 km/u rijdt u 120 km/u. Wat zijn de gevolgen?',
    },
    imageUrl: '/test-de-niveau/q10.jpg',
    options: [
      { id: 'a', text: { fr: 'Vous recevrez une amende.', nl: 'U krijgt een boete.' }, correct: true },
      { id: 'b', text: { fr: 'Votre permis sera temporairement retiré.', nl: 'Uw rijbewijs wordt tijdelijk ingetrokken.' }, correct: false },
      { id: 'c', text: { fr: 'Vous devrez repasser votre examen théorique et pratique.', nl: 'U moet uw theorie- en praktijkexamen opnieuw afleggen.' }, correct: false },
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
      fr: 'Le résultat d’un test de l’haleine est de 0,5 ‰. Quelle est la conséquence ?',
      nl: 'Het resultaat van een ademtest is 0,5 ‰. Wat is het gevolg?',
    },
    imageUrl: '/test-de-niveau/q11.jpg',
    options: [
      { id: 'a', text: { fr: 'Vous pouvez poursuivre votre route.', nl: 'U mag uw weg verderzetten.' }, correct: false },
      { id: 'b', text: { fr: 'Vous recevez une interdiction immédiate de conduire pendant 3 heures.', nl: 'U krijgt een onmiddellijk rijverbod van 3 uur.' }, correct: false },
      { id: 'c', text: { fr: 'Vous recevez une interdiction immédiate de conduire pendant 12 heures.', nl: 'U krijgt een onmiddellijk rijverbod van 12 uur.' }, correct: true },
    ],
    explanation: {
      fr: 'Un résultat de 0,5 ‰ entraîne une interdiction immédiate de conduire de 12 heures.',
      nl: 'Een resultaat van 0,5 ‰ leidt tot een onmiddellijk rijverbod van 12 uur.',
    },
    factIds: [],
    difficulty: 'moyen',
  },
]
