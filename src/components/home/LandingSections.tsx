import { useLocale } from 'next-intl'
import { ArrowUpRight, BookOpen, MapPin, ScanLine } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { landingCopy } from '@/content/landing'

export function PreparationSteps() {
  const copy = landingCopy(useLocale())
  const icons = [ScanLine, BookOpen, MapPin]
  return <section className="landing-shell preparation-section" aria-labelledby="preparation-title">
    <p className="landing-eyebrow">{copy.journeyEyebrow}</p>
    <h2 id="preparation-title" className="landing-title">{copy.journeyTitle}</h2>
    <div className="preparation-steps">{copy.steps.map((step, index) => {
      const Icon = icons[index]
      return <article key={step.title}><div className="step-top"><Icon size={24} aria-hidden="true" /><span>0{index + 1}</span></div><h3>{step.title}</h3><p>{step.body}</p><Link href={step.href} className="landing-text-link">{step.link}<ArrowUpRight size={16} aria-hidden="true" /></Link></article>
    })}</div>
  </section>
}

export function LandingFaq() {
  const copy = landingCopy(useLocale())
  return <section className="landing-shell landing-faq" aria-labelledby="faq-title">
    <div><p className="landing-eyebrow">{copy.faqEyebrow}</p><h2 id="faq-title" className="landing-title">{copy.faqTitle}</h2></div>
    <div>{copy.faqs.map(item => <details key={item.q}><summary>{item.q}<span aria-hidden="true">+</span></summary><p>{item.a}</p></details>)}</div>
  </section>
}

export function LandingFinalCta() {
  const copy = landingCopy(useLocale())
  return <section id="final-cta" className="landing-shell final-section">
    <div className="final-panel"><p className="landing-eyebrow">{copy.finalEyebrow}</p><h2 className="landing-title">{copy.finalTitle}</h2><p>{copy.finalLead}</p><Link href="/test-de-niveau" className="landing-button">{copy.primary}<ArrowUpRight size={20} aria-hidden="true" /></Link><small>{copy.ctaNote}</small></div>
  </section>
}
