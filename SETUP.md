# Setup — après la migration Next.js

Ce projet vient d'être migré de Vite/React Router vers **Next.js 14 (App
Router)**, suite au brief du 2026-08-20 (voir échange de conception :
fondation Next.js, style vivant, Prisma + Postgres + NextAuth). L'ancien
projet Vite est conservé intact dans [legacy-vite/](./legacy-vite/) — rien
n'a été supprimé, seulement déplacé.

## Ce qui est fonctionnel dès maintenant (sans rien configurer)

```bash
npm install
npm run dev   # http://localhost:3000/fr (redirige automatiquement depuis /)
```

- Home bilingue FR/NL (`/fr`, `/nl`) avec la nouvelle direction artistique.
- **Test de niveau** (killer feature) entièrement fonctionnel : 12 questions
  tirées du contenu déjà vérifié (`src/content/verified/*`), progression
  animée, résultat avec radar de compétences, recommandation par thème
  faible. Fonctionne sans compte, sans base de données.
- Structure i18n (`next-intl`) prête pour que chaque route existe en
  `/fr/...` et `/nl/...`.
- `sitemap.xml` / `robots.txt` générés.

## Ce qui nécessite tes propres identifiants avant de fonctionner

Copie `.env.example` en `.env.local` et remplis :

| Variable | Pour quoi | Où l'obtenir |
|---|---|---|
| `DATABASE_URL` | Postgres (Prisma) | Vercel Postgres, Neon, Railway, ou une instance locale |
| `NEXTAUTH_SECRET` / `NEXTAUTH_URL` | Sessions NextAuth | `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Connexion Google | console.cloud.google.com → Identifiants OAuth |
| `EMAIL_SERVER` / `EMAIL_FROM` | Lien magique email | N'importe quel SMTP (Resend, Postmark…) |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Carte des circuits d'examen | console.cloud.google.com → API Maps JavaScript |
| `STRIPE_SECRET_KEY` | Paiement à l'unité des circuits (24,99€) | dashboard.stripe.com → Développeurs → Clés API |

Une fois `DATABASE_URL` renseigné :

```bash
npx prisma migrate dev --name init
npm run prisma:seed     # importe les thèmes/questions déjà vérifiés
```

Le bouton "Continuer avec Google/email" à la fin du test de niveau
(`SignupPrompt.tsx`) appelle déjà `next-auth/react`'s `signIn()` — il
fonctionnera dès que `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET` (ou le SMTP)
sont renseignés, sans changement de code.

Le bouton "Débloquer — 24,99€" du carrousel circuits (home) appelle
maintenant **la vraie intégration Stripe** (voir section dédiée ci-dessous)
via `api/checkout/circuit`. Les autres packs (Résumé, examens illimités,
perception des risques) utilisent encore `createCheckoutSession()`
(`lib/payment.ts`, stub honnête "pas encore disponible") — pas dans le
scope de cette intégration, à faire séparément si tu veux les vendre aussi.

La carte "Ta ville n'est pas là ?" du même carrousel écrit déjà dans
`DemandeVilleCircuit` via `POST /api/demande-ville` — fonctionne dès que
`DATABASE_URL` est renseigné et la migration jouée.

## Stripe — paiement des circuits (intégré le 2026-08-21)

**Avant de pouvoir tester le parcours complet, il te manque encore deux
choses que Stripe seul ne remplace pas :**

1. **Une base de données** (`DATABASE_URL`) — le webhook Stripe doit
   enregistrer l'achat (`AchatCircuit`) quelque part. Sans ça, le paiement
   fonctionnera mais l'accès ne sera jamais débloqué en base.
   → Le plus rapide et gratuit pour démarrer : [neon.tech](https://neon.tech)
   (crée un compte, un projet, copie la "connection string" dans
   `DATABASE_URL`).
2. **La connexion (NextAuth)** — le code exige d'être connecté avant
   d'acheter (comme demandé). Sans `GOOGLE_CLIENT_ID`/`GOOGLE_CLIENT_SECRET`
   (ou `EMAIL_SERVER`) renseignés, impossible de se connecter, donc
   impossible de tester un vrai clic sur "Débloquer" depuis le navigateur.

Dis-moi si tu veux qu'on configure l'un ou l'autre maintenant — sinon, tu
peux déjà tester la mécanique Stripe elle-même (webhook, signature) sans
base ni connexion, voir "Tester avec la Stripe CLI" ci-dessous.

### Ce qui a été codé

- `src/lib/stripe.ts` — client Stripe serveur.
- `POST /api/checkout/circuit` — reçoit `circuitId`, vérifie que tu es
  connecté, recalcule le prix depuis `content/centers/registry.ts` (jamais
  fait confiance au prix envoyé par le navigateur), crée une Stripe
  Checkout Session, renvoie son URL.
- `POST /api/webhooks/stripe` — vérifie la signature, écoute
  `checkout.session.completed`, crée l'`AchatCircuit` en base. **C'est la
  seule porte qui débloque l'accès** — jamais au clic ni à la redirection.
- `prisma/seed.ts` étendu pour créer les `CentreExamen`/`Circuit` en base
  (mêmes id que les fixtures, ex. `anderlecht-1`) — sans ça, le webhook
  échouerait à créer l'achat (le `circuitId` n'existerait pas en base).

### Tester avec la Stripe CLI, étape par étape

**Terminal 1 — le site tourne déjà normalement :**
```bash
npm run dev
```

**Terminal 2 — installe la Stripe CLI** (une seule fois) : va sur
[stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli), télécharge
l'exécutable Windows, puis dans un nouveau terminal :
```bash
stripe login
```
(ça ouvre ton navigateur pour connecter la CLI à ton compte Stripe — clique
"Allow access").

**Toujours dans ce terminal 2**, lance l'écoute des webhooks :
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```
Cette commande affiche une ligne du type `Your webhook signing secret is
whsec_...` — **copie ce `whsec_...`** dans `.env.local`, à la ligne
`STRIPE_WEBHOOK_SECRET=""`. Laisse ce terminal ouvert et tournant tout le
temps que tu testes.

**Redémarre le site** (Ctrl+C dans le terminal 1, puis `npm run dev` à
nouveau) pour qu'il prenne en compte le nouveau `STRIPE_WEBHOOK_SECRET`.

**Terminal 3 — simule un paiement réussi**, sans avoir besoin de passer par
le navigateur ni d'être connecté :
```bash
stripe trigger checkout.session.completed
```
Regarde le terminal 2 : tu dois voir une ligne
`checkout.session.completed [evt_...] ... 200`. Le `200` confirme que ta
route webhook a bien reçu et vérifié l'événement.

**Pour tester le vrai parcours** (clic sur "Débloquer" dans le navigateur) :
il te faut d'abord être connecté (voir point 2 ci-dessus), puis Stripe
Checkout s'ouvre en mode test — utilise le numéro de carte de test
`4242 4242 4242 4242`, une date future, n'importe quel CVC.

**Pour vérifier qu'un achat a bien été enregistré :**
```bash
npx prisma studio
```
Ça ouvre une interface dans ton navigateur — regarde la table
`AchatCircuit`, une nouvelle ligne doit apparaître après un paiement réussi.

## À valider avec toi avant mise en production

- **Bandeau "coût de l'échec"** (`content/circuits-config.ts`,
  `COUT_ECHEC_BANNER`) : le texte "6h de cours après 2 échecs" est affiché,
  mais `sourceUrl` est volontairement laissé vide — tu as dit ne pas avoir
  pu vérifier cette règle via une source officielle GOCA/SPF Mobilité. À
  compléter dès que tu as un lien, sinon le bandeau reste marqué "Source à
  confirmer".
- **Conditions de remboursement** des circuits (délai de demande,
  justificatif d'échec à fournir) : pas encore définies, `AchatCircuit`
  (schema Prisma) a les champs prêts (`statutRemboursement`,
  `dateLimiteDemandeRemboursement`) mais aucune logique métier dessus.
- **Distance / points d'attention / difficulté** des 2 circuits vitrines
  (Anderlecht, Schaerbeek) sont les valeurs d'exemple du mockup de
  référence (`content/centers/registry.ts`), pas encore calculées selon de
  vrais critères (voir `domain/centers.ts` → `CircuitDifficulty`).

## Prochaines étapes (ordre du brief)

Fait : 1) fondation Next.js + i18n + Prisma, 2) home + test de niveau,
carrousel circuits (2 centres réels) avec monétisation à l'unité.

Restant, dans l'ordre demandé :
3. `/cours` (liste) + `/cours/[slug]` — porter `components/lesson/*`
   (déjà écrits, dans `src/components/lesson/`, pas encore branchés à une
   route Next) sur le contenu de `content/repository.ts`.
4. `/examen-blanc` — session chronométrée, réutilise `domain/quiz.ts`
   (`ExamBlueprint`, `ExamAttempt`) déjà porté tel quel.
5. `/circuits/[ville]` — carte Google Maps interactive + mode entraînement
   checklist (brief v2), modèles `CentreExamen`/`Circuit`/`PointCircuit`
   déjà dans `prisma/schema.prisma`. La home ne montre qu'un aperçu léger
   (`CircuitIllustration.tsx`) ; la vraie carte Google Maps n'existe que
   sur cette page de détail, pas encore construite.
6. `/dashboard` — historique du test de niveau, progression par thème,
   nécessite l'auth branchée (étape précédente).
7. Perf mobile + Core Web Vitals (`next/image`, lazy loading) — à vérifier
   une fois les pages de contenu long en place.

## Ce qui a été déplacé dans legacy-vite/

`index.html`, `vite.config.ts`, `tsconfig.{app,node}.json`,
`.oxlintrc.json`, `src/main.tsx`, `src/App.tsx`, `src/app/router.tsx`,
l'ancien `src/pages/*` (React Router), `src/components/layout/*` (Navbar/
Footer réécrits en composants Next dans `src/components/site/`),
`src/i18n/config.ts` (react-i18next, remplacé par `next-intl`).

**Non touché**, réutilisé tel quel par le nouveau projet : `src/domain/*`,
`src/content/*` (le contenu vérifié — rien retapé), `src/i18n/locales/*`
(source des nouveaux `messages/{fr,nl}.json`), `src/lib/cn.ts`,
`src/components/ui/*` (retintés avec la nouvelle palette),
`src/components/lesson/*` (pas encore branchés, prêts pour `/cours`).
