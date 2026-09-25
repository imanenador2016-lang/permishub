/** Hero presentation only. Destinations and services already exist in the application. */
const fr = {
  eyebrow: 'Ton permis de conduire en Belgique',
  titleFirst: 'De la théorie', titleSecond: 'à la route,', titleAccent: 'on t’accompagne.',
  description: 'L’essentiel pour ta théorie, la perception des risques et les circuits de ton centre. Avance avec les bons repères.',
  benefits: ['L’essentiel, sans blabla', 'À ton rythme', 'Circuits par centre', 'Coaching individuel'],
  primary: 'Commencer ma préparation', secondary: 'Voir comment ça marche',
  startNote: 'Commence par le test de niveau gratuit.',
  proofLabel: 'Leurs mots. Leurs résultats.', proofLink: 'Lire les avis',
  photoAlt: 'Une candidate partage sa réussite à l’examen avec PermisHub',
  photoLabel: 'Une réussite partagée', photoNote: 'Un pas de plus\nvers ton permis.',
  journeyLabel: 'Ta préparation, étape par étape',
  services: [
    { id: 'theory', title: 'Théorie', short: 'Résumé sans blabla', detail: 'Révise l’essentiel', href: '/resume' },
    { id: 'perception', title: 'Perception', short: 'Préparation aux risques', detail: 'Repère les risques', href: '/#packs' },
    { id: 'circuits', title: 'Circuits', short: 'Les itinéraires de ton centre', detail: 'Prends tes repères', href: '/#circuits' },
    { id: 'coaching', title: 'Coaching', short: 'Individuel, via WhatsApp', detail: 'Un accompagnement individuel', href: '/#coaching' },
  ],
  reviewsEyebrow: 'Des résultats concrets', reviewsTitle: 'Ils ont réussi avec',
}
const nl: typeof fr = {
  eyebrow: 'Je rijbewijs voorbereiden in België',
  titleFirst: 'Van de theorie', titleSecond: 'naar de weg,', titleAccent: 'samen vooruit.',
  description: 'De essentie van de theorie, gevaarherkenning en de routes van je centrum. Zet goed voorbereid de volgende stap.',
  benefits: ['De essentie, zonder blabla', 'Op jouw tempo', 'Routes per centrum', 'Individuele coaching'],
  primary: 'Start mijn voorbereiding', secondary: 'Ontdek hoe het werkt',
  startNote: 'Begin met de gratis niveautest.',
  proofLabel: 'Hun woorden. Hun resultaten.', proofLink: 'Lees de ervaringen',
  photoAlt: 'Een kandidaat deelt haar geslaagde examen met PermisHub',
  photoLabel: 'Een gedeeld succes', photoNote: 'Een stap dichter\nbij je rijbewijs.',
  journeyLabel: 'Je voorbereiding, stap voor stap',
  services: [
    { id: 'theory', title: 'Theorie', short: 'Samenvatting zonder blabla', detail: 'Herhaal de essentie', href: '/resume' },
    { id: 'perception', title: 'Perceptie', short: 'Bereid gevaarherkenning voor', detail: 'Herken de risico’s', href: '/#packs' },
    { id: 'circuits', title: 'Circuits', short: 'Routes van je centrum', detail: 'Verken de omgeving', href: '/#circuits' },
    { id: 'coaching', title: 'Coaching', short: 'Individueel, via WhatsApp', detail: 'Individuele begeleiding', href: '/#coaching' },
  ],
  reviewsEyebrow: 'Concrete resultaten', reviewsTitle: 'Zij slaagden met',
}
export function heroCopy(locale: string) { return locale === 'nl' ? nl : fr }

/** Replace only this asset/key pair when a new authentic hero photo is supplied.
 * The current image belongs to reussite5; its quote is reused without alteration. */
export const HERO_CANDIDATE = {
  src: '/testimonials/avis-2.jpg',
  testimonialKey: 'reussite5',
  objectPosition: '45% 28%',
} as const

