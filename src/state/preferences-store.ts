import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Region } from '@/domain/region'
import type { Language } from '@/domain/language'

interface PreferencesState {
  region: Region
  language: Language
  /** Vrai une fois que l'utilisateur a choisi région + langue au moins une fois. */
  onboarded: boolean
  setRegion: (region: Region) => void
  setLanguage: (language: Language) => void
  completeOnboarding: () => void
}

/**
 * Préférences persistées localement (localStorage). Remplaçable plus tard
 * par un profil Supabase sans changer la forme de cet état — voir
 * docs/ARCHITECTURE.md.
 */
export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      region: 'BE',
      language: 'fr',
      onboarded: false,
      setRegion: (region) => set({ region }),
      // La langue est désormais pilotée par l'URL (next-intl, /fr vs /nl) —
      // ce setter ne sert plus qu'à mémoriser la préférence pour les liens.
      setLanguage: (language) => set({ language }),
      completeOnboarding: () => set({ onboarded: true }),
    }),
    { name: 'permishub.preferences' },
  ),
)
