/**
 * Importe le contenu déjà vérifié de src/content/verified/* dans Postgres.
 * `npm run prisma:seed` (nécessite DATABASE_URL + `npx prisma migrate dev` déjà joué).
 */
import { PrismaClient } from '@prisma/client'
import { getThemes, getQuestionsByTheme } from '../src/content/repository'
import { getCenters, getCircuitsByCenter } from '../src/content/centers/registry'

const prisma = new PrismaClient()

async function main() {
  for (const theme of getThemes()) {
    const dbTheme = await prisma.theme.upsert({
      where: { slug: theme.slug },
      update: {
        titleFr: theme.title.fr,
        titleNl: theme.title.nl,
        descFr: theme.description.fr,
        descNl: theme.description.nl,
        icon: theme.icon,
        order: theme.order,
      },
      create: {
        slug: theme.slug,
        titleFr: theme.title.fr,
        titleNl: theme.title.nl,
        descFr: theme.description.fr,
        descNl: theme.description.nl,
        icon: theme.icon,
        order: theme.order,
      },
    })

    const questions = getQuestionsByTheme(theme.slug, 'BE')
    for (const q of questions) {
      await prisma.question.upsert({
        where: { id: q.id },
        update: {},
        create: {
          id: q.id,
          themeId: dbTheme.id,
          region: q.region,
          difficulty: q.difficulty === 'facile' ? 1 : q.difficulty === 'moyen' ? 2 : 3,
          textFr: q.prompt.fr,
          textNl: q.prompt.nl,
          choices: q.options.map((o) => ({ id: o.id, textFr: o.text.fr, textNl: o.text.nl, correct: o.correct })),
          explanationFr: q.explanation.fr,
          explanationNl: q.explanation.nl,
        },
      })
    }
  }

  // Centres d'examen + circuits — voir content/centers/registry.ts. Les id
  // des fixtures (ex. "anderlecht-1") sont réutilisés tels quels comme id
  // Prisma pour que circuitId envoyé au checkout Stripe corresponde à une
  // vraie ligne en base (voir api/checkout/circuit et api/webhooks/stripe).
  for (const center of getCenters()) {
    const lat = center.lat ?? 0
    const lng = center.lng ?? 0
    const dbCentre = await prisma.centreExamen.upsert({
      where: { slug: center.slug },
      update: { nom: center.name, ville: center.name, region: center.region, lat, lng },
      create: {
        slug: center.slug,
        nom: center.name,
        ville: center.name,
        region: center.region,
        lat,
        lng,
      },
    })

    for (const circuit of getCircuitsByCenter(center.slug)) {
      await prisma.circuit.upsert({
        where: { id: circuit.id },
        update: {
          nom: circuit.title.fr,
          priceCents: circuit.priceCents ?? 2499,
          distanceKm: circuit.distanceKm,
          attentionPointsCount: circuit.attentionPointsCount,
          difficulte: circuit.difficulty,
        },
        create: {
          id: circuit.id,
          centreId: dbCentre.id,
          nom: circuit.title.fr,
          priceCents: circuit.priceCents ?? 2499,
          distanceKm: circuit.distanceKm,
          attentionPointsCount: circuit.attentionPointsCount,
          difficulte: circuit.difficulty,
        },
      })
    }
  }

  console.log('Seed terminé.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
