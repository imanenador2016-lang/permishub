/** Optional factual fields for future, useful centre pages. Unknown information stays absent. */
export type ExamCenterSeoContent = {
  slug: string
  name: string
  region?: string
  city?: string
  address?: string
  latitude?: number
  longitude?: number
  organization?: string
  openingHours?: string[]
  telephone?: string
  officialPrice?: { amount: number; currency: 'EUR'; checkedAt?: string }
  indicativeWait?: { value: string; checkedAt: string; source?: string }
  access?: string
  parking?: string
  difficulty?: 'easy' | 'medium' | 'hard'
  difficultyExplanation?: string
  trafficNotes?: string[]
  priorities?: string[]
  cyclists?: string[]
  zone30s?: string[]
  maneuvers?: string[]
  advice?: string[]
  pitfalls?: string[]
  faqs?: Array<{ question: string; answer: string }>
  circuitSlugs?: string[]
  lessonPaths?: string[]
  articlePaths?: string[]
  photo?: { src: string; alt: string }
  verifiedAt?: string
}

/** Optional factual fields for future circuit pages. A Google Maps URL alone is not sufficient page content. */
export type ExamCircuitSeoContent = {
  slug: string
  centerSlug: string
  name: string
  description?: string
  googleMapsUrl?: string
  mapEmbedUrl?: string
  areas?: string[]
  streets?: string[]
  vigilancePoints?: string[]
  pitfalls?: string[]
  images?: Array<{ src: string; alt: string }>
  maneuvers?: string[]
  advice?: string[]
  difficulty?: 'easy' | 'medium' | 'hard'
  updatedAt?: string
}
