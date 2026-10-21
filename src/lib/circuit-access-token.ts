import { createHmac, timingSafeEqual } from 'node:crypto'

export const CIRCUIT_ACCESS_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

function secret() {
  return process.env.NEXTAUTH_SECRET ?? ''
}

function normalizedCenterSlug(centerSlug: string) {
  return centerSlug.toLowerCase().replace(/[^a-z0-9-]/g, '')
}

export function circuitAccessCookieName(centerSlug: string) {
  return `permishub-circuit-access-${normalizedCenterSlug(centerSlug)}`
}

function signature(centerSlug: string, expiresAt: string) {
  return createHmac('sha256', secret())
    .update(`circuits:${normalizedCenterSlug(centerSlug)}:${expiresAt}`)
    .digest('base64url')
}

export function createCircuitAccessToken(centerSlug: string, now = Date.now()) {
  if (!secret()) throw new Error('NEXTAUTH_SECRET is required to sign circuit access')
  const expiresAt = String(Math.floor(now / 1000) + CIRCUIT_ACCESS_MAX_AGE_SECONDS)
  return `v1.${expiresAt}.${signature(centerSlug, expiresAt)}`
}

export function verifyCircuitAccessToken(value: string | undefined, centerSlug: string, now = Date.now()) {
  if (!value || !secret()) return false
  const [version, expiresAt, suppliedSignature, extra] = value.split('.')
  if (version !== 'v1' || !expiresAt || !suppliedSignature || extra) return false
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) <= Math.floor(now / 1000)) return false

  const expected = Buffer.from(signature(centerSlug, expiresAt))
  const supplied = Buffer.from(suppliedSignature)
  return expected.length === supplied.length && timingSafeEqual(expected, supplied)
}

export const circuitAccessCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: CIRCUIT_ACCESS_MAX_AGE_SECONDS,
}
