# PermisHub

Plateforme belge d'e-learning pour la préparation au permis de conduire
théorique (FR/NL, Wallonie/Bruxelles/Flandre). *« Tout pour réussir ton
permis. »*

Ceci est le socle applicatif — voir la documentation d'architecture avant
toute modification structurelle :

- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) — stack, structure des
  dossiers, domaine (région/langue/contenu), état, trajectoire Supabase.
- [docs/CONTENT_PIPELINE.md](./docs/CONTENT_PIPELINE.md) — comment les PDF
  sources deviennent du contenu vérifié (cours/questions/examens), et l'état
  actuel du traitement (aucun PDF traité pour l'instant, catalogue seulement).
- [docs/DESIGN_SYSTEM.md](./docs/DESIGN_SYSTEM.md) — palette, typographie,
  composants, pièges Tailwind déjà rencontrés.

## État actuel (MVP)

- ✅ Architecture domaine (région/langue/traçabilité des sources/contenu/
  progression) en place et typée.
- ✅ Design system (tokens vert profond / ivoire / encre, composants de base).
- ✅ Navigation FR/NL + sélecteur de région, persistés.
- ✅ Parcours fonctionnels de bout en bout : leçon (intro → chapitres →
  résumé, mini-quiz inclus) → questions d'entraînement → examen blanc
  chronométré → progression.
- ✅ Premier thème **réel et sourcé** : « La voie publique et la chaussée »
  (`src/content/verified/voie-publique/`), extrait de `1-la-voie-publique.pdf`
  — 20 faits vérifiés avec page exacte, leçon FR/NL en 8 chapitres, 11
  questions. Première passe encore en attente de relecture humaine croisée
  (voir docs/CONTENT_PIPELINE.md).
- ✅ Catalogue des ~30 PDF sources (`src/content/sources-registry.ts`) —
  1 traité, le reste **non encore traité**.
- ⛔ Pas encore : contenu réel vérifié, authentification/Supabase,
  perception des risques, abonnement Premium — prévus dans l'architecture,
  pas construits maintenant (voir docs/ARCHITECTURE.md § Prochaines étapes).

## Développement

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # tsc -b && vite build
npm run lint         # oxlint
```

Alias d'import : `@/*` → `src/*`.
