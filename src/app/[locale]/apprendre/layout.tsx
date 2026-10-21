import type { ReactNode } from 'react'
import { LearningAudioController } from '@/components/learning/LearningAudioController'

export default function LearningLayout({ children }: { children: ReactNode }) {
  return <>{children}<LearningAudioController /></>
}
