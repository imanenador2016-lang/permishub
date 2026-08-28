# Architecture PermisHub

Ce document explique comment le projet est organisé et pourquoi. À lire avant
toute modification structurelle importante.

## Stack

- **React 19 + TypeScript + Vite 8** — build rapide, pas de dépendance à un
  framework serveur tant qu'on n'en a pas besoin.
- **Tailwind CSS v4** (config CSS-first, `@theme` dans `src/index.css`, pas
  de `tailwind.config.ts`) — voir [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md).
- **react-router-dom v7** — routage côté client, `createBrowserRouter`.
- **zustand** (+ middleware `persist`) — état global léger, persisté en
  `localStorage` en attendant Supabase.
- **react-i18next** — FR/NL, voir [i18n](#i18n-fr--nl).
- **lucide-react** — icônes, importées nommément (voir
  `src/components/ui/Icon.tsx`) pour rester tree-shakeable.

Choix délibérément *pas* fait maintenant : pas de backend, pas d'auth, pas de
paiement. L'architecture ci-dessous est conçue pour les brancher plus tard
sans réécrire l'existant (voir [Trajectoire Supabase](#trajectoire-supabase)).

## Structure des dossiers

```
src/
  domain/          Types métier purs (pas de dépendance React/UI)
    region.ts        Région belge (BE/WALLONIE/BRUXELLES/FLANDRE)
    language.ts       Langue (fr/nl)
    source.ts          Traçabilité : SourceDocument, SourceReference, VerifiedFact
    content.ts          Theme, Lesson (intro/objectifs/chapitres/résumé), LessonChapter, RegionComparisonTable, LessonCallout
    quiz.ts              Question, ExamBlueprint, ExamAttempt
    progress.ts           UserProgress, ProgressRepository (port)

  content/          Accès au contenu pédagogique
    sources-registry.ts   Catalogue des ~30 PDF sources (métadonnées seulement)
    repository.ts          Point d'accès unique (getThemes, getLesson, getFacts, ...)
    verified/<theme>/       Contenu réel, un dossier par thème traité (facts/theme/lesson/questions/exam.ts)

  components/lesson/  Rendu d'une leçon : Callout ("à retenir"/"attention"),
                       RegionTable (comparatif régional), MiniQuiz (quiz de
                       fin de chapitre, réutilise domain/quiz.ts Question),
                       SourceFootnote (citation page PDF + date de vérif.)

  state/            État applicatif (zustand, persisté localStorage)
    preferences-store.ts   Région + langue + onboarding
    progress-store.ts        Historique de réponses, tentatives d'examen

  i18n/             Configuration react-i18next + dictionnaires fr/nl
  domain, app, pages, components, lib  (voir le code, noms explicites)
```

Principe directeur : **les pages ne parlent jamais directement aux fixtures**.
Elles passent par `content/repository.ts`. Le jour où le contenu vérifié
remplace les fixtures (base de données, fichiers générés, ou API), seul ce
fichier change — aucune page ni composant à toucher.

## Domaine : région, langue, contenu

Le cœur de l'architecture, c'est que **rien n'est un texte brut** :

- Tout texte visible par l'utilisateur est un `LocalizedText`
  (`{ fr: string; nl: string }`), jamais une chaîne mono-langue.
- Toute règle qui peut varier par région porte une `Region` explicite
  (`'BE'` = valable partout, sinon la région précise). Une `Question` a un
  champ `region` ; une `LessonSection` peut avoir des `regionalNotes` par
  région.
- Tout contenu réglementaire remonte à une source vérifiable — voir
  [CONTENT_PIPELINE.md](./CONTENT_PIPELINE.md).

Ce choix a un coût (plus de structure que du texte en dur) mais évite
exactement le problème que ce projet doit résoudre : un site qui prétend
donner une règle belge sans pouvoir dire laquelle des 3 régions, ni d'où
elle vient.

## État et progression

`state/progress-store.ts` implémente aujourd'hui le port
`ProgressRepository` (défini dans `domain/progress.ts`) avec `localStorage`.
Les pages n'appellent que les méthodes du store (`recordQuestionAttempt`,
`getWeakThemes`, ...) — jamais `localStorage` directement. Résultat : passer
à une progression synchronisée (Supabase) plus tard ne change que
l'implémentation du store, pas les écrans qui l'utilisent.

Même logique pour `state/preferences-store.ts` (région/langue choisies).

## i18n (FR / NL)

- `react-i18next`, dictionnaires dans `src/i18n/locales/{fr,nl}.ts` — c'est
  l'UI (boutons, titres de page, messages) qui passe par là.
- Le **contenu pédagogique** (cours, questions) n'utilise pas i18next : il
  porte ses propres traductions via `LocalizedText` dans `domain/content.ts`
  et `domain/quiz.ts`, parce qu'un cours de droit belge en FR et en NL n'est
  pas juste une traduction UI, c'est deux rédactions qui doivent chacune
  remonter à une source vérifiée dans leur langue.
- La langue est stockée dans `preferences-store` *et* dans i18next
  (synchronisées par `setLanguage`), pour garder une seule source de vérité
  utilisateur tout en profitant des mécanismes i18next (détection navigateur,
  interpolation, etc.).

## Belgique : BE / Wallonie / Bruxelles / Flandre

`domain/region.ts` modélise 4 valeurs, pas 3 : les régions ne remplacent pas
un niveau « fédéral », elles s'y ajoutent. Une règle est déclarée `'BE'`
par défaut (valable partout) et seulement rattachée à une région précise
quand elle diverge réellement — pour éviter de sur-région­aliser du contenu
qui est en fait uniforme.

Composants concernés : `RegionPill` (sélecteur, dans la nav), `Onboarding`
(premier choix), `Badge` (tons `WALLONIE` / `BRUXELLES` / `FLANDRE` dédiés),
et le rendu conditionnel des `regionalNotes` dans `LessonView`.

## Trajectoire Supabase

Rien n'est branché aujourd'hui, mais l'architecture y prépare :

- `ProgressRepository` (interface) → une implémentation Supabase remplace
  `progress-store.ts` sans changer les pages.
- `userId: 'local'` dans `UserProgress` → deviendra l'id Supabase Auth.
- `content/repository.ts` → les fonctions `getThemes`/`getQuestionsByTheme`/…
  liront depuis Supabase (ou un contenu généré depuis la pipeline
  documentaire) au lieu des fixtures, même signatures.
- Premium : pas encore de code, mais le point d'extension naturel est
  `Account.tsx` + un futur `domain/subscription.ts` suivant le même
  principe (types d'abord, implémentation ensuite).

## Prochaines étapes (non faites maintenant, volontairement)

1. Traiter les PDF sources → premiers `VerifiedFact` réels (voir
   [CONTENT_PIPELINE.md](./CONTENT_PIPELINE.md)).
2. Remplacer le thème/leçon/questions de démo par du contenu vérifié pour un
   premier vrai thème.
3. Authentification + persistance Supabase (remplace `localStorage`).
4. Perception des risques : nouveau type de contenu (probablement vidéo/
   séquence temporelle) — prévoir un `domain/hazard-perception.ts` distinct
   plutôt que de forcer ça dans `Question`.
