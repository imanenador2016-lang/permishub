type VisualReference = { visualId?: string }

export type LessonStep =
  | (VisualReference & { type: 'scenario'; title: string; body: string; question: string; options: string[]; correct: number; explanation: string })
  | (VisualReference & { type: 'hierarchy'; title: string; body: string; items: string[]; memory: string })
  | (VisualReference & { type: 'text'; title: string; body: string; callout?: string })
  | (VisualReference & { type: 'compare'; title: string; body: string; items: { label: string; result: string }[] })
  | (VisualReference & { type: 'quiz'; title: string; question: string; options: string[]; correct: number; explanation: string })
  | (VisualReference & { type: 'summary'; title: string; items: string[] })

export interface LearningLesson {
  id: string
  moduleId: string
  title: string
  description: string
  xp: number
  steps: LessonStep[]
  quiz: (VisualReference & { question: string; options: string[]; correct: number; explanation: string })[]
  resultMessages?: { perfect: string; good: string; low: string }
  nextLessonLabel?: string
  trainingPlaceholderLabel?: string
  inlineQuizOnly?: boolean
}
