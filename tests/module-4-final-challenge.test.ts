import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { MODULE_FOUR_FINAL_CHALLENGE } from '../src/content/learning/module-4-final-challenge'
import { getLearningScene } from '../src/content/learning/scenes'

test('le défi final du module 4 contient 15 questions valides et uniques', () => {
  assert.equal(MODULE_FOUR_FINAL_CHALLENGE.length, 15)
  assert.equal(new Set(MODULE_FOUR_FINAL_CHALLENGE.map((question) => question.id)).size, 15)

  for (const question of MODULE_FOUR_FINAL_CHALLENGE) {
    assert.ok(question.options.length >= 2)
    assert.ok(question.correct >= 0 && question.correct < question.options.length)
    assert.ok(question.explanation.length > 0)
  }
})

test('les 7 leçons du module 4 sont représentées', () => {
  assert.deepEqual(
    new Set(MODULE_FOUR_FINAL_CHALLENGE.map((question) => question.topic)),
    new Set(['Fondamentaux', 'Sécurité', 'Interdictions', 'Signalisation', 'Usagers vulnérables', 'Tram', 'Manœuvres complexes']),
  )
})

test('chaque question utilise une scène existante avec un fichier image présent', () => {
  for (const question of MODULE_FOUR_FINAL_CHALLENGE) {
    const scene = getLearningScene(question.visualId)
    assert.ok(scene, `Scène introuvable : ${question.visualId}`)
    assert.ok(scene.image, `Image absente pour : ${question.visualId}`)
    assert.ok(existsSync(join(process.cwd(), 'public', scene.image.replace(/^\//, ''))), `Fichier absent : ${scene.image}`)
  }
})
