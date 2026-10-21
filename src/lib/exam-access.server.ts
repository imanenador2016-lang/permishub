import 'server-only'

import { cookies } from 'next/headers'
import { EXAM_ACCESS_COOKIE, verifyExamAccessToken } from './exam-access-token'

export function hasExamAccess() {
  if (process.env.NODE_ENV === 'development') return true
  return verifyExamAccessToken(cookies().get(EXAM_ACCESS_COOKIE)?.value)
}
