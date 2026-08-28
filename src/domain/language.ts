/**
 * Langues supportées par PermisHub.
 * Extensible plus tard (DE couvrirait la Communauté germanophone),
 * mais le brief actuel se limite à FR/NL.
 */
export const LANGUAGES = ['fr', 'nl'] as const

export type Language = (typeof LANGUAGES)[number]

export const LANGUAGE_LABELS: Record<Language, string> = {
  fr: 'Français',
  nl: 'Nederlands',
}

export function isLanguage(value: string): value is Language {
  return (LANGUAGES as readonly string[]).includes(value)
}
