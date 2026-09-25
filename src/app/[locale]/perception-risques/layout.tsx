import type { Metadata } from 'next'

// Les écrans de test et d’édition TPR sont des outils, pas des pages éditoriales.
export const metadata: Metadata = {
  robots: { index: false, follow: true, googleBot: { index: false, follow: true } },
}

export default function RiskPerceptionLayout({ children }: { children: React.ReactNode }) {
  return children
}
