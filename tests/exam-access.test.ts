import assert from 'node:assert/strict'
import test from 'node:test'
import { createExamAccessToken, verifyExamAccessToken } from '../src/lib/exam-access-token'

test('exam access token accepts an authentic unexpired token', () => {
  process.env.NEXTAUTH_SECRET = 'test-secret'
  const now = Date.UTC(2026, 9, 3)
  assert.equal(verifyExamAccessToken(createExamAccessToken(now), now), true)
})

test('exam access token rejects tampering and expiration', () => {
  process.env.NEXTAUTH_SECRET = 'test-secret'
  const now = Date.UTC(2026, 9, 3)
  const token = createExamAccessToken(now)
  assert.equal(verifyExamAccessToken(`${token}x`, now), false)
  assert.equal(verifyExamAccessToken(token, now + 366 * 24 * 60 * 60 * 1000), false)
})
