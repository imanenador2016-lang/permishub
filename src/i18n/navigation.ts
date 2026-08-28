import { createNavigation } from 'next-intl/navigation'
import { LOCALES } from './request'

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales: LOCALES,
})
