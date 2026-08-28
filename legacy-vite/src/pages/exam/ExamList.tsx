import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Icon } from '@/components/ui/Icon'
import { getExamBlueprints } from '@/content/repository'

export function ExamList() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language === 'nl' ? 'nl' : 'fr'
  const blueprints = getExamBlueprints()

  return (
    <Container className="py-14">
      <h1 className="font-display text-3xl font-semibold text-ink-950">{t('exam.title')}</h1>

      <div className="mt-8 flex flex-col gap-4">
        {blueprints.map((bp) => (
          <Card key={bp.id} className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-ink-950">{bp.title[lang]}</h3>
                <Badge tone="warning">{t('common.demoBadge')}</Badge>
              </div>
              <p className="mt-1.5 flex items-center gap-4 text-sm text-ink-500">
                <span className="flex items-center gap-1">
                  <Icon name="ListChecks" size={14} /> {bp.questionCount} {t('exam.questionCount')}
                </span>
                <span className="flex items-center gap-1">
                  <Icon name="Timer" size={14} /> {bp.durationMinutes} {t('common.minutes')}
                </span>
              </p>
            </div>
            <Link to={`/examens/${bp.id}`}>
              <Button>{t('exam.start')}</Button>
            </Link>
          </Card>
        ))}
      </div>
    </Container>
  )
}
