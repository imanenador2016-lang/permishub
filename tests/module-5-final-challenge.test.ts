import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import test from 'node:test'
import { LEARNING_LESSONS } from '../src/content/learning/lesson-1'
import { MODULE_FIVE_FINAL_CHALLENGE } from '../src/content/learning/module-5-final-challenge'
import { MODULE_5 } from '../src/content/learning/module-5'
import { getLearningScene } from '../src/content/learning/scenes'
import { getPermisHubSign } from '../src/content/learning/signs'

test('le module 5 contient 7 leçons complètes', () => {
  const lessons = LEARNING_LESSONS.filter((lesson) => lesson.moduleId === MODULE_5.id)

  assert.equal(MODULE_5.lessons.length, 7)
  assert.equal(lessons.length, 7)
  assert.deepEqual(lessons.map((lesson) => lesson.id), MODULE_5.lessons.map((lesson) => lesson.id))

  for (const lesson of lessons) {
    assert.ok(lesson.steps.length >= 7, `${lesson.id} doit comporter au moins 7 étapes`)
    assert.equal(lesson.quiz.length, 5, `${lesson.id} doit comporter 5 questions de quiz`)
  }
})

test('tous les visuels des leçons du module 5 existent réellement', () => {
  const lessons = LEARNING_LESSONS.filter((lesson) => lesson.moduleId === MODULE_5.id)

  for (const lesson of lessons) {
    for (const step of lesson.steps) {
      if (!step.visualId) continue
      const scene = getLearningScene(step.visualId)
      assert.ok(scene, `Scène introuvable : ${step.visualId}`)
      assert.ok(scene.image, `Image absente pour : ${step.visualId}`)
      assert.ok(existsSync(join(process.cwd(), 'public', scene.image.replace(/^\//, ''))), `Fichier absent : ${scene.image}`)
      for (const signId of scene.signIds || (scene.signId ? [scene.signId] : [])) {
        const sign = getPermisHubSign(signId)
        assert.ok(sign, `Panneau introuvable : ${signId}`)
        assert.ok(existsSync(join(process.cwd(), 'public', sign.asset.replace(/^\//, ''))), `Fichier de panneau absent : ${sign.asset}`)
      }
    }
  }
})

test('le défi final du module 5 contient 15 questions valides et illustrées', () => {
  assert.equal(MODULE_FIVE_FINAL_CHALLENGE.length, 15)
  assert.equal(new Set(MODULE_FIVE_FINAL_CHALLENGE.map((question) => question.id)).size, 15)

  for (const question of MODULE_FIVE_FINAL_CHALLENGE) {
    assert.ok(question.options.length >= 2)
    assert.ok(question.correct >= 0 && question.correct < question.options.length)
    assert.ok(question.explanation.length > 0)

    const scene = getLearningScene(question.visualId)
    assert.ok(scene, `Scène introuvable : ${question.visualId}`)
    assert.ok(scene.image, `Image absente pour : ${question.visualId}`)
    assert.ok(existsSync(join(process.cwd(), 'public', scene.image.replace(/^\//, ''))), `Fichier absent : ${scene.image}`)
  }
})
