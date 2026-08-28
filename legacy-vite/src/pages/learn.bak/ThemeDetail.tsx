import { Link, Navigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { DemoBanner } from '@/components/DemoBanner'
import { getTheme, getLessonsByTheme, isDemoTheme } from '@/content/repository'

export function ThemeDetail() {
  const { themeSlug } = useParams<{ themeSlug: string }>()
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'

  const theme = themeSlug ? getTheme(themeSlug) : undefined
  if (!theme || !themeSlug) return <Navigate to="/apprendre" replace />

  const lessons = getLessonsByTheme(themeSlug)

  return (
    <Container className="py-14">
      <Link to="/apprendre" className="text-sm font-medium text-brand-700 hover:underline">
        ← {t('learn.title')}
      </Link>

      <div className="mt-4 flex items-center gap-3">
        <h1 className="font-display text-3xl font-semibold text-ink-950">{theme.title[lang]}</h1>
        {isDemoTheme(theme.slug) && <Badge tone="warning">{t('common.demoBadge')}</Badge>}
      </div>
      <p className="mt-2 max-w-2xl text-ink-500">{theme.description[lang]}</p>

      {isDemoTheme(theme.slug) && <div className="mt-6">
        <DemoBanner />
      </div>}

      <div className="mt-8 flex flex-col gap-3">
        {lessons.map((lesson) => (
          <Link key={lesson.slug} to={`/apprendre/${theme.slug}/${lesson.slug}`}>
            <Card interactive className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-ink-950">{lesson.title[lang]}</h3>
                <p className="mt-1 text-sm text-ink-500">
                  {lesson.estimatedMinutes} {t('common.minutes')}
                </p>
              </div>
              <Icon name="ChevronRight" className="text-ink-400" />
            </Card>
          </Link>
        ))}
        {lessons.length === 0 && <p className="text-sm text-ink-500">{t('practice.empty')}</p>}
      </div>

      <div className="mt-8">
        <Link to={`/questions/${theme.slug}`}>
          <Card interactive className="flex items-center justify-between bg-brand-800 text-ivory-50">
            <div>
              <h3 className="text-base font-semibold text-ivory-50">{t('practice.title')}</h3>
              <p className="mt-1 text-sm text-brand-200">{t('practice.subtitle')}</p>
            </div>
            <Icon name="ArrowRight" />
          </Card>
        </Link>
      </div>
    </Container>
  )
}
