export const LEARNING_ACCESS_COOKIE = 'permishub-learning-access'

type LearningAccessPayload = { subscriptionId: string; expiresAt: number }

function secret() {
  return process.env.NEXTAUTH_SECRET ?? ''
}

function toBase64Url(bytes: Uint8Array) {
  let binary = ''
  bytes.forEach((byte) => { binary += String.fromCharCode(byte) })
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/g, '')
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, '+').replace(/_/g, '/')
  const binary = atob(normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '='))
  return Uint8Array.from(binary, (char) => char.charCodeAt(0))
}

async function signingKey() {
  if (!secret()) throw new Error('NEXTAUTH_SECRET is required to sign learning access')
  return crypto.subtle.importKey('raw', new TextEncoder().encode(secret()), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'])
}

export async function signLearningAccess(payload: LearningAccessPayload) {
  const encoded = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)))
  const signature = await crypto.subtle.sign('HMAC', await signingKey(), new TextEncoder().encode(encoded))
  return `${encoded}.${toBase64Url(new Uint8Array(signature))}`
}

export async function verifyLearningAccess(token?: string, allowExpired = false): Promise<LearningAccessPayload | null> {
  if (!token || !secret()) return null
  const [encoded, signature] = token.split('.')
  if (!encoded || !signature) return null
  try {
    const valid = await crypto.subtle.verify('HMAC', await signingKey(), fromBase64Url(signature), new TextEncoder().encode(encoded))
    if (!valid) return null
    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(encoded))) as LearningAccessPayload
    if (!payload.subscriptionId || !Number.isFinite(payload.expiresAt)) return null
    if (!allowExpired && payload.expiresAt <= Date.now()) return null
    return payload
  } catch {
    return null
  }
}
