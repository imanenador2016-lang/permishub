import test from 'node:test'
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { MODULE_TEN_FINAL_CHALLENGE } from '../src/content/learning/module-10-final-challenge'
import { LEARNING_LESSONS } from '../src/content/learning/lesson-1'
import { LEARNING_SCENES } from '../src/content/learning/scenes'

test('module 10 contains seven lessons with five quiz questions each', () => {
  const lessons = LEARNING_LESSONS.filter((lesson) => lesson.moduleId === 'public-transport-level-crossings')
  assert.equal(lessons.length, 7)
  lessons.forEach((lesson) => { assert.ok(lesson.steps.length >= 7); assert.equal(lesson.quiz.length, 5) })
})

test('module 10 final challenge contains 15 valid questions with existing visuals', () => {
  assert.equal(MODULE_TEN_FINAL_CHALLENGE.length, 15)
  const ids = new Set<string>()
  MODULE_TEN_FINAL_CHALLENGE.forEach((question) => {
    assert.ok(!ids.has(question.id)); ids.add(question.id)
    assert.ok(question.options.length >= 2)
    assert.ok(question.correct >= 0 && question.correct < question.options.length)
    const scene = LEARNING_SCENES.find((item) => item.id === question.visualId)
    assert.ok(scene?.image)
    assert.ok(existsSync(join(process.cwd(), 'public', scene!.image)))
  })
})

test('all module 10 lesson visuals exist on disk', () => {
  const visualIds = LEARNING_LESSONS.filter((lesson) => lesson.moduleId === 'public-transport-level-crossings')
    .flatMap((lesson) => [...lesson.steps, ...lesson.quiz]).map((item) => item.visualId).filter(Boolean)
  visualIds.forEach((visualId) => {
    const scene = LEARNING_SCENES.find((item) => item.id === visualId)
    assert.ok(scene?.image, `missing scene for ${visualId}`)
    assert.ok(existsSync(join(process.cwd(), 'public', scene!.image)), `missing image for ${visualId}`)
  })
})
