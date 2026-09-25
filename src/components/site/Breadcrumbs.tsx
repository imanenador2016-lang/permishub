import { Link } from '@/i18n/navigation'
import { breadcrumbJsonLd, SITE_URL } from '@/lib/seo'
import type { AppLocale } from '@/i18n/request'

export type BreadcrumbItem = { label: string; href?: string }

export function Breadcrumbs({ items, locale }: { items: BreadcrumbItem[]; locale: AppLocale }) {
  const schema = breadcrumbJsonLd(items.map((item) => ({
    name: item.label,
    url: `${SITE_URL}/${locale}${item.href && item.href !== '/' ? `/${item.href.replace(/^\/+|\/+$/g, '')}` : ''}`,
  })))

  return <>
    <nav aria-label={locale === 'fr' ? 'Fil d’Ariane' : 'Broodkruimelpad'} className="mb-5 text-sm text-ink/70">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => <li key={`${item.label}-${index}`} className="flex items-center gap-2">
          {index > 0 && <span aria-hidden="true">›</span>}
          {item.href && index < items.length - 1 ? <Link className="underline decoration-1 underline-offset-2 hover:text-brick" href={item.href as never}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </li>)}
      </ol>
    </nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </>
}
