# Bibliothèque de panneaux PermisHub

La bibliothèque est verrouillée. Les panneaux utilisables dans le produit sont uniquement ceux ayant `confidence: "high"` et `needsReview: false` dans `manifest.json`.

- Utiliser `getPermisHubSign` ou `getValidatedPermisHubSignByCode` depuis `src/content/learning/signs.ts`.
- Ne jamais recréer, générer ou réextraire un panneau déjà validé.
- En l’absence d’un panneau validé, consulter `review-needed.json` uniquement avec un identifiant candidat précis, puis vérifier le visuel, la page et le texte source avant promotion.
- Les scènes routières doivent référencer un `signId` et l’asset officiel séparément ; elles ne doivent pas dessiner une nouvelle version du panneau.
