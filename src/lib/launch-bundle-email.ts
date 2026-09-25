import { getCenters, getCircuitsByCenter } from '@/content/centers/registry'
import { getCircuitMapsByCenter } from '@/lib/circuit-maps.server'
import { RESUME_PDF_URL, PERCEPTION_RISQUE_PDF_URL, LAUNCH_BUNDLE_WHATSAPP_NUMBER } from '@/content/pricing-config'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://permishub.be'

/**
 * Confirmation par email du "Pack complet" : l'accès reste disponible même
 * après un changement d'appareil. L'email est envoyé par le webhook Stripe.
 */
export async function sendLaunchBundleEmail({ email }: { email: string }): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY manquante — impossible d’envoyer la confirmation du pack complet.')

  const activeCenters = getCenters().filter((c) => !c.comingSoon)
  const centersHtml = (
    await Promise.all(
      activeCenters.map(async (center) => {
        const circuitMaps = new Map((await getCircuitMapsByCenter(center.slug)).map((link) => [link.circuitId, link.mapsUrl]))
        const circuits = getCircuitsByCenter(center.slug).filter((c) => circuitMaps.has(c.id))
        const links = circuits
          .map((c, i) => `<li style="margin:0 0 6px;"><a href="${circuitMaps.get(c.id)}" style="color:#1F1A14;font-weight:bold;">Circuit ${i + 1} →</a></li>`)
          .join('')
        return `
          <p style="margin:16px 0 6px;font-weight:bold;">${center.name}</p>
          <ul style="padding:0;margin:0;list-style:none;">${links}</ul>`
      }),
    )
  ).join('')

  const waMessage = encodeURIComponent(
    'Bonjour, je viens d’acheter le Pack complet PermisHub (offre de lancement) — je souhaite rejoindre le groupe WhatsApp de coaching.',
  )
  const waHref = `https://wa.me/${LAUNCH_BUNDLE_WHATSAPP_NUMBER}?text=${waMessage}`

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1F1A14;">
      <p style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 8px;">PermisHub</p>
      <h1 style="font-size: 22px; margin: 0 0 4px;">Ton Pack complet est débloqué ✓</h1>
      <p style="line-height:1.5;margin:0 0 20px;">Garde cet email — tout ton accès y est, même si tu changes d'appareil.</p>

      <p style="margin:0 0 6px;font-weight:bold;">📘 Résumé sans blabla</p>
      <p style="margin:0 0 16px;"><a href="${SITE_URL}${RESUME_PDF_URL}" style="color:#1F1A14;font-weight:bold;">Ouvrir le PDF →</a></p>

      <p style="margin:0 0 6px;font-weight:bold;">⚠️ Perception des risques</p>
      <p style="margin:0 0 16px;"><a href="${SITE_URL}${PERCEPTION_RISQUE_PDF_URL}" style="color:#1F1A14;font-weight:bold;">Ouvrir le PDF →</a></p>

      <p style="margin:0 0 6px;font-weight:bold;">🚗 Tous les circuits d'entraînement</p>
      ${centersHtml}

      <p style="margin:24px 0 6px;font-weight:bold;">💬 Groupe WhatsApp (coaching hebdo + conseils quotidiens)</p>
      <p style="margin:0 0 24px;">
        <a href="${waHref}" style="background:#F5B400;color:#1F1A14;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
          Rejoindre le groupe →
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
      subject: 'Ton Pack complet est débloqué — PermisHub',
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Échec de l'envoi Resend (${res.status}): ${body}`)
  }
}
