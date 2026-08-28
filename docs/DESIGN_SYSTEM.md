# Design system PermisHub — v2 "ligne claire"

Direction verrouillée le 2026-08-20 (voir `reference-design-hero.html` à la
racine du repo — référence visuelle absolue, et
`prompt-claude-code-permishub-v2.md` pour le brief complet). **Remplace**
la v1 (asphalte/ambre "route de nuit") qui avait été validée puis
explicitement révoquée par l'utilisateur au tour suivant — ne pas revenir
en arrière sans nouvelle validation.

## Concept

Identité "ligne claire" belge — référence esthétique : tradition de la
bande dessinée franco-belge (Hergé). Aplats de couleur francs, contours
noirs épais et uniformes, **zéro dégradé, zéro ombre douce, zéro
glassmorphism/blur**. C'est le point de différenciation central du site.

## Palette (verrouillée — ne pas dévier sans validation)

| Rôle | Token Tailwind | Hex |
|---|---|---|
| Fond principal | `cream` | `#F7F1E4` |
| Fond secondaire (bandes, footer clair) | `creamdim` | `#EDE3CC` |
| Noir chaud — contours et texte, **jamais** `#000` pur | `ink` | `#1F1A14` |
| Accent principal, CTA | `yellow` | `#F5B400` |
| Accent secondaire, alertes, façades illustrées | `brick` | `#C1432E` |
| Badges, validations | `forest` | `#2B5E44` |
| Fonds d'illustration | `sky` | `#AFCFDA` |

## Typographie

- **Titres** : `Archivo Black` (`font-display`) — massif, énergique, un seul poids (400, le style est déjà "black").
- **Corps de texte / UI** : `Inter` (`font-body`) — 400/500/600/700/800, contraste volontaire avec les titres.
- **Annotations manuscrites** : `Kalam` (`font-hand`) — parcimonie stricte, jamais pour du contenu principal (notes/micro-conseils uniquement).

## Motifs structurels (classes utilitaires dans `globals.css`)

- **`.panel`** — bordure noire épaisse (3px mobile / 4px ≥640px) + ombre portée dure décalée (`shadow-hard-xs` / `shadow-hard`), jamais floue. Remplace les "cards" SaaS à coins arrondis + ombre douce. Utilisé par `Card`, la nav, le trust bar, les modales.
- **`.btn-comic`** (via `Button` variant `primary`) — fond jaune, bordure noire, ombre dure ; micro-interaction hover = translation -2px/-2px + ombre qui grandit ; active = ombre qui disparaît (effet "bouton pressé").
- **Technique d'annotation** (élément signature, `src/components/annotation/PinnedCard.tsx` + `AnnotationRing`) — quand une illustration accompagne un contenu ou une question, ne jamais les juxtaposer sans lien : punaise (`annotation-pin`) + flèche pointue (`annotation-tail`) accrochent la carte de contenu à l'illustration, et un cercle pointillé brick (`annotation-ring` / `AnnotationRing`) marque l'élément concerné dans la scène. Utilisé dans le hero (carte de question punaisée sur la rue illustrée) — **à réutiliser sur `/cours` et `/examen-blanc`** dès qu'une question a une illustration.
- Illustrations en scènes belges reconnaissables (`src/components/home/HeroIllustration.tsx`) — rues, façades en briques, tram, panneaux réels — jamais d'illustration abstraite/générique.

## Composants (`src/components/ui/`)

- `Button` — `primary` (jaune, `.btn-comic`), `secondary` (crème, même traitement bordure/ombre), `ghost` (soulignage, pas de panneau). Jamais de `rounded-full` — c'est un système à angles droits.
- `Card` — `.panel` + padding, prop `interactive` pour l'effet hover (translation + ombre qui grandit).
- `Badge` — pastille bordée, tons `brand/neutral/success/warning/danger` + régions belges.
- `ProgressBar` — piste bordée 2px, remplissage `forest`.

## Mobile-first

Les panneaux à bordure épaisse et ombre dure doivent rester lisibles sans
devenir lourds sur petit écran : **réduire** l'épaisseur (3px) et l'offset
d'ombre (`shadow-hard-xs`) en dessous de 640px plutôt que les supprimer —
c'est ce que fait `.panel` nativement via les classes `sm:`.

## Pièges rencontrés

1. **`backdrop-blur` + `position: fixed` descendant** : `backdrop-filter`
   crée un containing block pour les descendants `fixed` (même piège que
   `filter`), donc un overlay plein écran nichée dans un header avec
   `backdrop-blur` se retrouve coincé dans la boîte du header. La direction
   v2 n'utilise de toute façon aucun flou — mais `MobileMenu.tsx` reste
   rendu via un portail React vers `<body>` par prudence.
2. **Radar/labels longs en français** : prévoir un retour à la ligne
   (`wrapLabel` dans `RadarChart.tsx`) et une marge suffisante autour du
   cercle, sinon les libellés de thème débordent du SVG.
3. Les composants `components/lesson/*` (Callout, MiniQuiz, RegionTable,
   SourceFootnote) datent encore de la palette v1 (`ink-100`, `brand-*`,
   `ivory-*`) — pas encore branchés à une route, à retinter en même temps
   que `/cours` (voir SETUP.md).

## Non négociable (rappel du brief v2)

Ne pas proposer de variante de palette/typographie différente de celle
ci-dessus sans nouvelle validation explicite de l'utilisateur.
