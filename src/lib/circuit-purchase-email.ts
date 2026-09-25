import { getCircuitsByCenter } from '@/content/centers/registry'
import { getCircuitMapsByCenter } from '@/lib/circuit-maps.server'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://permishub.be'

interface SendCircuitPurchaseEmailParams {
  email: string
  centerSlug: string
  centerName: string
}

/**
 * Confirmation par email après le déblocage "tous les circuits d'un centre".
 * Appelée exclusivement par le webhook Stripe : les liens Google Maps restent
 * réservés au message envoyé au courriel confirmé du paiement.
 */
export async function sendCircuitPurchaseEmail({ email, centerSlug, centerName }: SendCircuitPurchaseEmailParams): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) throw new Error('RESEND_API_KEY manquante — impossible d’envoyer la confirmation d’achat circuits.')

  const circuitMaps = new Map((await getCircuitMapsByCenter(centerSlug)).map((link) => [link.circuitId, link.mapsUrl]))
  const circuits = getCircuitsByCenter(centerSlug).filter((c) => circuitMaps.has(c.id))
  const circuitLinks = circuits
    .map(
      (c, i) => `
        <li style="margin:0 0 10px;">
          <a href="${circuitMaps.get(c.id)}" style="color:#1F1A14;font-weight:bold;">Circuit ${i + 1} — Ouvrir sur Google Maps →</a>
        </li>`,
    )
    .join('')

  const html = `
    <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1F1A14;">
      <p style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 8px;">PermisHub</p>
      <h1 style="font-size: 22px; margin: 0 0 4px;">Tes circuits ${centerName} sont débloqués ✓</h1>
      <p style="line-height:1.5;margin:0 0 16px;">
        Accès à vie, tous les circuits actuels et à venir de ce centre — garde cet email, il contient tes liens même si tu changes d'appareil.
      </p>
      <ul style="padding:0;margin:0 0 20px;list-style:none;">
        ${circuitLinks}
      </ul>
      <p style="margin: 24px 0;">
        <a href="${SITE_URL}/fr/circuits/${centerSlug}" style="background:#F5B400;color:#1F1A14;padding:12px 20px;border-radius:6px;text-decoration:none;font-weight:bold;display:inline-block;">
          Voir mes circuits sur PermisHub →
        </a>
      </p>
      <p style="color:#999;font-size:12px;">Un problème d'accès ? Utilise "Restaurer mon accès" sur permishub.be avec cette même adresse email.</p>
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
      subject: `Tes circuits ${centerName} sont débloqués — PermisHub`,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`Échec de l'envoi Resend (${res.status}): ${body}`)
  }
}
