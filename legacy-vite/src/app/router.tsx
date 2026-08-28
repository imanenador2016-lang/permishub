import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from '@/components/layout/AppLayout'
import { Home } from '@/pages/Home'
import { Onboarding } from '@/pages/Onboarding'
import { ThemeList } from '@/pages/learn/ThemeList'
import { ThemeDetail } from '@/pages/learn/ThemeDetail'
import { LessonView } from '@/pages/learn/LessonView'
import { PracticeHome } from '@/pages/practice/PracticeHome'
import { PracticeSession } from '@/pages/practice/PracticeSession'
import { ExamList } from '@/pages/exam/ExamList'
import { ExamRunner } from '@/pages/exam/ExamRunner'
import { Progress } from '@/pages/Progress'
import { Account } from '@/pages/Account'
import { CentersIndex } from '@/pages/centers/CentersIndex'
import { CenterDetail } from '@/pages/centers/CenterDetail'
import { CenterCheckout } from '@/pages/centers/CenterCheckout'
import { NotFound } from '@/pages/NotFound'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'bienvenue', element: <Onboarding /> },
      { path: 'apprendre', element: <ThemeList /> },
      { path: 'apprendre/:themeSlug', element: <ThemeDetail /> },
      { path: 'apprendre/:themeSlug/:lessonSlug', element: <LessonView /> },
      { path: 'questions', element: <PracticeHome /> },
      { path: 'questions/:themeSlug', element: <PracticeSession /> },
      { path: 'examens', element: <ExamList /> },
      { path: 'examens/:blueprintId', element: <ExamRunner /> },
      { path: 'progression', element: <Progress /> },
      { path: 'compte', element: <Account /> },
      { path: 'circuits', element: <CentersIndex /> },
      { path: 'circuits/:centerSlug', element: <CenterDetail /> },
      { path: 'circuits/:centerSlug/paiement', element: <CenterCheckout /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
