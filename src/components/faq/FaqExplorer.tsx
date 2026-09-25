'use client'

import { useMemo, useState } from 'react'
import { isValidElement, type ReactNode } from 'react'
import { FAQ_CATEGORIES } from '@/content/faq'

function textContent(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(textContent).join(' ')
  if (isValidElement<{ children?: ReactNode }>(node)) return textContent(node.props.children)
  return ''
}

export function FaqExplorer() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const normalizedQuery = query.trim().toLocaleLowerCase('fr')
  const categories = useMemo(() => FAQ_CATEGORIES.map((category) => ({
    ...category,
    items: category.items.filter((item) => {
      const matchesCategory = activeCategory === 'all' || activeCategory === category.id
      const searchable = `${item.question} ${item.keywords ?? ''} ${category.title} ${textContent(item.answer)}`.toLocaleLowerCase('fr')
      return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
    }),
  })).filter((category) => category.items.length > 0), [activeCategory, normalizedQuery])
  const total = categories.reduce((sum, category) => sum + category.items.length, 0)

  return <div>
    <div className="mx-auto mb-7 max-w-3xl">
      <label htmlFor="faq-search" className="mb-2 block text-sm font-semibold">Rechercher une réponse</label>
      <div className="flex gap-2">
        <input id="faq-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Ex. validité, permis provisoire, paiement…" className="min-h-12 min-w-0 flex-1 rounded-xl border border-ink/30 bg-white px-4 text-base text-ink shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-forest" />
        {query && <button type="button" onClick={() => setQuery('')} className="min-h-12 rounded-xl border border-ink/30 px-4 text-sm font-semibold hover:bg-creamdim focus-visible:outline focus-visible:outline-2 focus-visible:outline-forest">Effacer</button>}
      </div>
    </div>

    <nav aria-label="Rubriques de la FAQ" className="-mx-4 mb-9 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
      {[{ id: 'all', title: 'Toutes les questions' }, ...FAQ_CATEGORIES.map(({ id, title }) => ({ id, title }))].map((category) => {
        const active = activeCategory === category.id
        return <button key={category.id} type="button" aria-pressed={active} onClick={() => setActiveCategory(category.id)} className={`min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest ${active ? 'border-ink bg-ink text-cream' : 'border-ink/20 bg-white/70 text-ink hover:bg-white'}`}>
          {category.title}
        </button>
      })}
    </nav>

    <p className="mb-4 text-center text-sm text-ink/60" aria-live="polite">{total} {total > 1 ? 'questions' : 'question'}</p>
    {categories.length ? <div className="space-y-10">
      {categories.map((category) => <section key={category.id} aria-labelledby={`faq-${category.id}`}>
        <div className="mb-4 flex items-end justify-between gap-3 border-b-2 border-ink/15 pb-3">
          <h2 id={`faq-${category.id}`} className="font-display text-2xl tracking-tight sm:text-3xl">{category.title}</h2>
          <span className="pb-0.5 text-xs font-semibold tabular-nums text-ink/55">{category.items.length}</span>
        </div>
        <div className="overflow-hidden rounded-2xl border border-ink/20 bg-cream shadow-sm">
          {category.items.map((item, index) => <details key={item.question} className={index ? 'border-t border-ink/15' : undefined}>
            <summary className="group flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-4 px-4 py-4 text-left text-[15px] font-semibold leading-relaxed marker:hidden hover:bg-white/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-forest sm:px-5 sm:text-base [&::-webkit-details-marker]:hidden">
              <span>{item.question}</span>
              <span aria-hidden="true" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ink/35 text-xl font-normal leading-none transition-transform group-open:rotate-45 group-open:bg-yellow">+</span>
            </summary>
            <div className="max-w-3xl px-4 pb-5 text-sm leading-7 text-ink/80 sm:px-5 sm:pb-6 sm:text-[15px] [&_ol]:my-3 [&_p]:my-2 [&_p:first-child]:mt-0 [&_p:last-child]:mb-0">
              {item.answer}
            </div>
          </details>)}
        </div>
      </section>)}
    </div> : <div className="rounded-2xl border border-ink/20 bg-cream px-5 py-10 text-center">
      <p className="font-display text-xl">Aucun résultat pour « {query} »</p>
      <p className="mt-2 text-sm text-ink/65">Essaie un autre mot ou affiche toutes les questions.</p>
      <button type="button" onClick={() => { setQuery(''); setActiveCategory('all') }} className="mt-5 min-h-11 rounded-lg bg-yellow px-5 font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest">Afficher toutes les questions</button>
    </div>}
  </div>
}
