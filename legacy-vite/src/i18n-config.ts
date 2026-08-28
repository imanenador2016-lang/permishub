import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { fr } from './locales/fr'
import { nl } from './locales/nl'
import type { Language } from '@/domain/language'

export const DEFAULT_LANGUAGE: Language = 'fr'

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      nl: { translation: nl },
    },
    fallbackLng: DEFAULT_LANGUAGE,
    supportedLngs: ['fr', 'nl'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'permishub.language',
    },
  })

export default i18n
