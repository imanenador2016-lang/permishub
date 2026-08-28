# Pipeline de contenu : PDF → cours vérifiés

## Règle non négociable

**Aucune règle du code de la route belge n'est inventée.** Tout ce qui est
présenté comme officiel doit remonter à un document source précis, une page
précise, une région précise, et une date de vérification humaine. Ce qui ne
remonte pas à une source reste explicitement marqué comme démonstration/
brouillon (voir `content/fixtures/`), jamais présenté comme officiel.

## Les 3 couches de traçabilité (`src/domain/source.ts`)

```
SourceDocument   → le PDF lui-même (catalogué dans sources-registry.ts)
SourceReference  → un pointeur précis : { sourceId, page, region, language, verifiedAt, verifiedBy }
VerifiedFact      → un fait atomique vérifié, portant une SourceReference
```

Un cours (`Lesson`) ne fait qu'assembler des `LessonSection`, et chaque
section référence les `factIds` qui la justifient. Une question (`Question`)
référence de la même façon les faits qui justifient sa bonne réponse et son
explication. Si une section ou une question n'a pas de `factIds`, c'est
qu'elle n'est pas prête à être publiée comme contenu officiel.

## État actuel (2026-08-18)

- **Catalogué, pas traité.** `src/content/sources-registry.ts` liste les ~30
  documents trouvés dans le dossier `/sources/` (aujourd'hui :
  `documents-permis/` à la racine du Bureau), avec statut `non_traite` pour
  chacun. Aucun contenu n'en a encore été extrait.
- Doublons détectés sur disque (mêmes fichiers en double, `- Copie` / `(1)`)
  → signalés en note dans le registre, un seul id catalogué par contenu
  réel. À nettoyer sur le dossier source quand utile (pas fait
  automatiquement).
- Un brouillon pré-existant (`permisssssss.md`, dans `documents-permis/`)
  contient du texte de cours déjà rédigé mais **sans aucune référence de
  page** → traité comme non vérifié, à ne réutiliser qu'après être repassé
  par cette pipeline.
- **Premier thème réel publié : « La voie publique et la chaussée »**
  (`src/content/verified/voie-publique/`), à partir de `1-la-voie-publique.pdf`
  (6 pages). 20 faits vérifiés, une leçon FR/NL en 8 chapitres courts
  (objectifs, exemples, encadrés « à retenir »/« attention », tableau
  comparatif régional pour la vitesse, mini-quiz par chapitre), 11 questions.
  Chaque chapitre cite sa page PDF exacte (composant `SourceFootnote`).
  Le contenu de démonstration fictif utilisé pour la V0 de l'architecture a
  été retiré (il n'est plus nécessaire une fois du vrai contenu en place).
- Les vitesses régionales du chapitre 5 ont été recoupées le 2026-08-18 avec
  des sources secondaires en ligne (dont un document officiel de la Région
  flamande, mow.vlaanderen.be), en plus du PDF — un encadré « attention »
  dans la leçon le précise explicitement à l'utilisateur, plutôt que de
  présenter ces chiffres comme définitivement certifiés.

## Processus recommandé pour traiter un document source

1. **Lire le PDF en entier** (pas d'extraction automatique non supervisée
   pour du contenu réglementaire) et noter, par page, les règles/faits
   pertinents.
2. **Rédiger un `VerifiedFact` par fait atomique**, avec sa `SourceReference`
   exacte (page, région concernée, langue du document consulté, date du
   jour, nom/identifiant du vérificateur). Un fait qui varie par région =
   plusieurs `VerifiedFact`, un par région.
3. **Mettre à jour `sources-registry.ts`** : statut du document
   (`en_cours` → `traite`).
4. **Rédiger la `Lesson`** correspondante en FR *et* NL : un titre, une
   intro courte, des objectifs d'apprentissage, puis des `LessonChapter`
   courts (2-4 paragraphes reformulés — jamais une copie du PDF —, exemples
   concrets, encadrés `retenir`/`attention`, et un `RegionComparisonTable`
   quand une règle diverge par région plutôt qu'un simple encart cyclable).
   Chaque chapitre liste les `factIds` qui le justifient.
5. **Écrire les `Question`**, toujours adossées à des `factIds`, et en
   rattacher 1-2 à chaque chapitre via `miniQuizQuestionIds` (mini-quiz de
   fin de chapitre) — le reste du pool sert à l'entraînement/l'examen.
6. **Relecture croisée** avant publication : quelqu'un d'autre que
   l'auteur vérifie que chaque affirmation correspond bien à la page citée.
7. Seulement à ce stade, remplacer/compléter les fixtures dans
   `content/repository.ts`.

## Pourquoi une région et pas juste « Belgique »

Certaines règles diffèrent explicitement entre Wallonie, Bruxelles et
Flandre (ex. vitesse hors agglomération : 90 km/h en Wallonie contre 70 km/h
à Bruxelles et en Flandre, selon le brouillon existant — **à re-vérifier
dans une source officielle avant publication**, ce chiffre vient d'un
brouillon non sourcé et ne doit pas être republié tel quel). D'où le champ
`region` obligatoire sur chaque `SourceReference`, `Question` et
`LessonSection.regionalNotes`.

## Ce qui n'est délibérément pas fait à ce stade

- Extraction automatique du texte des PDF.
- Génération de questions à partir du texte brut.
- Tout traitement en profondeur des 30 PDF — conformément à la demande
  initiale, cette étape prépare seulement l'architecture qui rendra ce
  travail possible et vérifiable.
