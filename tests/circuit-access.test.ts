import assert from 'node:assert/strict'
import test from 'node:test'
import { LAUNCH_BUNDLE_OFFER } from '@/content/pricing-config'
import { hasCircuitCenterEntitlement } from '@/domain/circuit-access'

test('a buyer of the center bundle gets access to that center', () => {
  assert.equal(hasCircuitCenterEntitlement('anderlecht', ['circuits-bundle:anderlecht'], []), true)
})

test('a launch bundle buyer keeps access to active centers', () => {
  assert.equal(hasCircuitCenterEntitlement('braine-le-comte', [LAUNCH_BUNDLE_OFFER.id], []), true)
})

test('a legacy individual circuit purchase keeps access to its center', () => {
  assert.equal(hasCircuitCenterEntitlement('cuesmes', [], ['cuesmes-3']), true)
})

test('a non-buyer or purchase for another center gets no access', () => {
  assert.equal(hasCircuitCenterEntitlement('lobbes', [], []), false)
  assert.equal(hasCircuitCenterEntitlement('lobbes', ['circuits-bundle:anderlecht'], ['cuesmes-1']), false)
})
