'use client'

import { useEffect, useState } from 'react'
import { useLocale } from 'next-intl'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { heroCopy } from '@/content/hero'

export function MobilePreparationCta() {
  const [visible, setVisible] = useState(false)
  const copy = heroCopy(useLocale())
  useEffect(() => {
    const hero = document.getElementById('hero')
    const final = document.getElementById('final-cta')
    if (!hero || !final) return
    let pastHero = false
    let atEnd = false
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) pastHero = !entry.isIntersecting && entry.boundingClientRect.bottom < 0
        if (entry.target === final) atEnd = entry.isIntersecting
      }
      setVisible(pastHero && !atEnd)
    })
    observer.observe(hero)
    observer.observe(final)
    return () => observer.disconnect()
  }, [])
  return <div className="mobile-preparation-cta" hidden={!visible}><Link href="/test-de-niveau" className="landing-button">{copy.primary}<ArrowUpRight size={19} aria-hidden="true" /></Link></div>
}
