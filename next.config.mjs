import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Autorise les images distantes des futurs contenus (illustrations de
    // panneaux, etc.) — resserrer la liste une fois l'hébergement d'images
    // choisi (Supabase Storage / Cloudinary / Vercel Blob).
    remotePatterns: [],
    // AVIF avant WebP : Next choisit le premier format supporté par le
    // navigateur du visiteur. `next/image` gère déjà tout le reste
    // automatiquement (redimensionnement à la taille réelle affichée,
    // lazy loading par défaut) — voir audit SEO/perf du 2026-08-22.
    formats: ['image/avif', 'image/webp'],
  },
  // `compress` (Brotli/Gzip) est déjà `true` par défaut — explicité ici
  // pour que ce ne soit jamais désactivé par erreur. Sans effet une fois
  // déployé sur Vercel, qui compresse à l'edge indépendamment de ce réglage.
  compress: true,
  async headers() {
    return [
      {
        // Fichiers statiques du dossier public/ (photos d'avis, favicon,
        // icônes) — Next.js ne met pas de cache long dessus par défaut,
        // contrairement à /_next/static/* qui est déjà immuable/1 an.
        source: '/:path(favicon\\.svg|icons\\.svg|testimonials/.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default withNextIntl(nextConfig)
