import test from 'node:test'
import assert from 'node:assert/strict'
import { MODULE_NINE_FINAL_CHALLENGE } from '../src/content/learning/module-9-final-challenge'
import { LEARNING_LESSONS } from '../src/content/learning/lesson-1'
import { LEARNING_SCENES } from '../src/content/learning/scenes'

test('module 9 contains seven lessons with five quiz questions each', () => {
  const lessons = LEARNING_LESSONS.filter((lesson) => lesson.moduleId === 'motorway-special-roads')
  assert.equal(lessons.length, 7)
  lessons.forEach((lesson) => { assert.ok(lesson.steps.length >= 7); assert.equal(lesson.quiz.length, 5) })
})

test('module 9 final challenge contains 15 valid questions with existing visuals', () => {
  assert.equal(MODULE_NINE_FINAL_CHALLENGE.length, 15)
  const ids = new Set<string>()
  MODULE_NINE_FINAL_CHALLENGE.forEach((question) => {
    assert.ok(!ids.has(question.id)); ids.add(question.id)
    assert.ok(question.options.length >= 2)
    assert.ok(question.correct >= 0 && question.correct < question.options.length)
    assert.ok(LEARNING_SCENES.some((scene) => scene.id === question.visualId && scene.image))
  })
})
