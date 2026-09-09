import { RESUME_HOOK_MESSAGES } from '@/content/resume-hook-messages'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://permishub.be'

interface SendTestResultEmailParams {
  email: string
  locale: 'fr' | 'nl'
  score10: number
  weakThemeLabels: string[]
}

/**
 * Envoie le résultat du test de niveau par email — voir TestDeNiveau.tsx.
 * Le site promettait "on t'envoie ton résultat détaillé" (quizFunnel.emailSubtitle,
 * noSpamNote) mais rien n'envoyait jamais cet email : /api/lead n'écrit que
 * dans le Google Sheet, au moment de la capture d'email, avant même que le
 * test soit passé — voir conversation du 2026-09-09 (signalé par
 * l'utilisatrice : "j'ai pas reçu un mail avec résultat").
 *
 * Reprend le même copywriting CRO que l'écran de résultat à l'écran
 * (RESUME_HOOK_MESSAGES) pour rester cohérent entre ce que le visiteur voit
 * et ce qu'il reçoit — même pattern d'envoi direct via l'API Resend que
 * lib/auth.ts (lien magique de "Restaurer mon accès").
 */
export async function sendTestResultEmail({ email, locale, score10, weakThemeLabels }: SendTestResultEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY manquante — impossible d’envoyer le résultat par email.')

  const clamped = Math.max(0, Math.min(10, Math.round(score10)))
  const msg = RESUME_HOOK_MESSAGES[clamped]
  const ctaPath = msg.primaryOffer === 'resume' ? 'resume' : 'examen-blanc'
  const ctaHref = `${SITE_URL}/${locale}/${ctaPath}`

  const subject = locale === 'nl' ? `Jouw resultaat: ${clamped} / 10 — PermisHub` : `Ton résultat : ${clamped} / 10 — PermisHub`

  const weakLine =
    weakThemeLabels.length > 0
      ? locale === 'nl'
        ? `<p style="margin:0 0 16px;">Zwakke punten: <strong>${weakThemeLabels.join(', ')}</strong></p>`
        : `<p style="margin:0 0 16px;">Points faibles repérés : <strong>${weakThemeLabels.join(', ')}</strong></p>`
      : ''

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1F1A14;">
      <p style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 8px;">PermisHub</p>
      <h1 style="font-size: 32px; margin: 0 0 4px;">${clamped} <span style="font-size:16px;color:#999;">/ 10</span></h1>
      <p style="font-size:17px;font-weight:bold;margin:0 0 12px;">${msg.accroche[locale]}</p>
      <p style="line-height:1.5;margin:0 0 16px;">${msg.message[locale]}</p>
      ${weakLine}
      <p style="margin: 24px 0;">
        <a href="${ctaHref}" style="background:#F5B400;color:#1F1A14;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
          ${msg.ctaLabel[locale]} →
        </a>
      </p>
      <p style="color:#999;font-size:12px;">PermisHub — Belgique</p>
    </div>
  `

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? 'PermisHub <onboarding@resend.dev>',
      to: email,
      subject,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Échec de l'envoi Resend (${res.status}): ${body}`)
  }
}
