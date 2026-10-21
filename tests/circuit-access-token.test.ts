import assert from 'node:assert/strict'
import test from 'node:test'
import {
  circuitAccessCookieName,
  createCircuitAccessToken,
  verifyCircuitAccessToken,
} from '../src/lib/circuit-access-token'

test('circuit access token accepts the purchased center only', () => {
  process.env.NEXTAUTH_SECRET = 'test-secret'
  const now = Date.UTC(2026, 9, 13)
  const token = createCircuitAccessToken('wandre', now)

  assert.equal(verifyCircuitAccessToken(token, 'wandre', now), true)
  assert.equal(verifyCircuitAccessToken(token, 'namur', now), false)
})

test('circuit access token rejects tampering and expiration', () => {
  process.env.NEXTAUTH_SECRET = 'test-secret'
  const now = Date.UTC(2026, 9, 13)
  const token = createCircuitAccessToken('anderlecht', now)

  assert.equal(verifyCircuitAccessToken(`${token}x`, 'anderlecht', now), false)
  assert.equal(verifyCircuitAccessToken(token, 'anderlecht', now + 366 * 24 * 60 * 60 * 1000), false)
})

test('circuit access cookie name is scoped to the center', () => {
  assert.equal(circuitAccessCookieName('Louvain-la-Neuve'), 'permishub-circuit-access-louvain-la-neuve')
})
