import { createHmac, timingSafeEqual } from 'node:crypto'

export const EXAM_ACCESS_COOKIE = 'permishub-exam-access'
export const EXAM_ACCESS_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

function secret() {
  return process.env.NEXTAUTH_SECRET ?? ''
}

function signature(expiresAt: string) {
  return createHmac('sha256', secret()).update(`examens:${expiresAt}`).digest('base64url')
}

export function createExamAccessToken(now = Date.now()) {
  if (!secret()) throw new Error('NEXTAUTH_SECRET is required to sign exam access')
  const expiresAt = String(Math.floor(now / 1000) + EXAM_ACCESS_MAX_AGE_SECONDS)
  return `v1.${expiresAt}.${signature(expiresAt)}`
}

export function verifyExamAccessToken(value: string | undefined, now = Date.now()) {
  if (!value || !secret()) return false
  const [version, expiresAt, suppliedSignature, extra] = value.split('.')
  if (version !== 'v1' || !expiresAt || !suppliedSignature || extra) return false
  if (!/^\d+$/.test(expiresAt) || Number(expiresAt) <= Math.floor(now / 1000)) return false

  const expected = Buffer.from(signature(expiresAt))
  const supplied = Buffer.from(suppliedSignature)
  return expected.length === supplied.length && timingSafeEqual(expected, supplied)
}

export const examAccessCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: EXAM_ACCESS_MAX_AGE_SECONDS,
}
