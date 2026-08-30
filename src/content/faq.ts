import type { LocalizedText } from '@/domain/content'

export interface FaqItem {
  question: LocalizedText
  answer: LocalizedText
}

/**
 * FAQ home — contenu fourni par l'utilisateur (conversation du 2026-08-31),
 * avec quelques réponses corrigées pour rester vraies par rapport au site
 * réel plutôt que de publier une politique qui n'existe pas (voir le
 * résumé donné à l'utilisateur dans cette même conversation pour le détail
 * de chaque correction : pas d'abonnement nulle part sur le site — tous
 * les paiements sont uniques (api/checkout/pack, api/checkout/circuit,
 * api/checkout/circuits-bundle) —, pas de compte/code d'accès obligatoire
 * (checkout invité, accès posé en localStorage après vérification Stripe,
 * voir CircuitUnlockCta.tsx/ExamAccessGate.tsx), et plus d'examen blanc
 * gratuit depuis le 2026-08-30 (voir src/lib/examens-blancs.ts).
 */
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: { fr: "Qu'est-ce que PermisHub ?", nl: 'Wat is PermisHub?' },
    answer: {
      fr: "Une plateforme pour préparer le permis B en Belgique : test de niveau gratuit, résumé condensé, séries d'examens blancs et circuits d'entraînement par centre d'examen.",
      nl: 'Een platform om je rijbewijs B in België voor te bereiden: gratis niveautest, beknopte samenvatting, reeksen proefexamens en trainingscircuits per examencentrum.',
    },
  },
  {
    question: { fr: 'Le test de niveau, c’est vraiment gratuit ?', nl: 'Is de niveautest echt gratis?' },
    answer: {
      fr: 'Oui, le test de niveau (2 minutes) est gratuit et sans engagement.',
      nl: 'Ja, de niveautest (2 minuten) is gratis en vrijblijvend.',
    },
  },
  {
    question: { fr: 'Combien coûte le pack "Résumé sans blabla" ?', nl: 'Hoeveel kost de pack "Samenvatting zonder blabla"?' },
    answer: {
      fr: '9,99 €, paiement unique, accès permanent.',
      nl: '9,99 €, eenmalige betaling, permanente toegang.',
    },
  },
  {
    question: { fr: 'Combien coûte le pack "Examens illimités" ?', nl: 'Hoeveel kost de pack "Onbeperkte examens"?' },
    answer: {
      fr: '19,99 €, paiement unique — accès illimité à vie aux 7 examens blancs, sans abonnement.',
      nl: '19,99 €, eenmalige betaling — onbeperkte, levenslange toegang tot de 7 proefexamens, zonder abonnement.',
    },
  },
  {
    question: { fr: 'Y a-t-il un abonnement ou des frais récurrents ?', nl: 'Is er een abonnement of terugkerende kosten?' },
    answer: {
      fr: "Non. Chaque pack (Résumé, Examens illimités, Circuits) est un paiement unique — jamais d'abonnement ni de renouvellement automatique.",
      nl: 'Nee. Elke pack (Samenvatting, Onbeperkte examens, Circuits) is een eenmalige betaling — nooit een abonnement of automatische verlenging.',
    },
  },
  {
    question: { fr: "Suis-je remboursé si j'échoue à l'examen ?", nl: 'Word ik terugbetaald als ik niet slaag voor het examen?' },
    answer: {
      fr: "Oui — si tu échoues à l'examen après avoir utilisé le pack, tu es remboursé. Les modalités exactes (justificatif à fournir) sont indiquées sur la page de l'offre concernée.",
      nl: 'Ja — als je niet slaagt voor het examen na het gebruik van de pack, word je terugbetaald. De precieze voorwaarden (te bezorgen bewijs) staan op de pagina van de betreffende aanbieding.',
    },
  },
  {
    question: { fr: 'Dois-je créer un compte ?', nl: 'Moet ik een account aanmaken?' },
    answer: {
      fr: "Non, ce n'est pas obligatoire — tu peux payer en tant qu'invité, comme n'importe quel achat en ligne. Ton accès est débloqué automatiquement juste après le paiement, sur cet appareil.",
      nl: 'Nee, dat is niet verplicht — je kan betalen als gast, zoals elke online aankoop. Je toegang wordt automatisch ontgrendeld net na de betaling, op dit toestel.',
    },
  },
  {
    question: { fr: "J'ai perdu l'accès à mon achat, que faire ?", nl: 'Ik ben de toegang tot mijn aankoop kwijt, wat nu?' },
    answer: {
      fr: 'Contacte-nous avec ton reçu de paiement (envoyé par email par Stripe) — on retrouve ton achat et on te redonne accès manuellement.',
      nl: 'Neem contact met ons op met je betalingsbewijs (per e-mail verstuurd door Stripe) — we zoeken je aankoop op en geven je handmatig opnieuw toegang.',
    },
  },
  {
    question: { fr: 'Puis-je utiliser PermisHub sur plusieurs appareils ?', nl: 'Kan ik PermisHub op meerdere toestellen gebruiken?' },
    answer: {
      fr: "Ton accès est confirmé automatiquement dans le navigateur où tu as payé. Si tu changes d'appareil ou de navigateur, contacte-nous avec ton reçu Stripe pour qu'on te redonne accès.",
      nl: 'Je toegang wordt automatisch bevestigd in de browser waarin je hebt betaald. Verander je van toestel of browser, neem dan contact op met je Stripe-betalingsbewijs zodat we je opnieuw toegang geven.',
    },
  },
  {
    question: {
      fr: "Les circuits d'entraînement couvrent-ils mon centre d'examen ?",
      nl: 'Dekken de trainingscircuits mijn examencentrum?',
    },
    answer: {
      fr: 'PermisHub propose des circuits pour plusieurs centres belges (Anderlecht, Schaerbeek pour l’instant), avec itinéraire Google Maps réel et niveau de difficulté — la liste s’élargit chaque mois.',
      nl: 'PermisHub biedt circuits voor verschillende Belgische centra (voorlopig Anderlecht en Schaerbeek), met een echte Google Maps-route en moeilijkheidsgraad — de lijst breidt elke maand uit.',
    },
  },
  {
    question: { fr: 'Le contenu est-il à jour avec la législation belge ?', nl: 'Is de inhoud up-to-date met de Belgische wetgeving?' },
    answer: {
      fr: 'Oui — le contenu suit le programme officiel du SPF Mobilité et est mis à jour régulièrement.',
      nl: 'Ja — de inhoud volgt het officiële programma van de FOD Mobiliteit en wordt regelmatig bijgewerkt.',
    },
  },
]
