import type { Config } from 'tailwindcss'

/**
 * Direction artistique v2 — "ligne claire" belge (verrouillée, voir
 * reference-design-hero.html et docs/DESIGN_SYSTEM.md). Ne pas dévier de
 * cette palette/typo sans nouvelle validation explicite.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7F1E4',
        creamdim: '#EDE3CC',
        ink: '#1F1A14',
        yellow: '#F5B400',
        brick: '#C1432E',
        forest: '#2B5E44',
        sky: '#AFCFDA',
        region: {
          wallonie: '#C1432E',
          bruxelles: '#2B5E44',
          flandre: '#1F1A14',
        },
      },
      fontFamily: {
        display: ['var(--font-archivo-black)', 'system-ui', 'sans-serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        hand: ['var(--font-kalam)', 'cursive'],
      },
      boxShadow: {
        hard: '8px 8px 0 #1F1A14',
        'hard-sm': '5px 5px 0 #1F1A14',
        'hard-xs': '3px 3px 0 #1F1A14',
        'hard-hover': '11px 11px 0 #1F1A14',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
