# Test de perception des risques — module local

Routes : /fr/perception-risques et /nl/perception-risques.
Aucun déploiement. Aucune modification du paiement, du PDF commercial, de Prisma ou de l’authentification.
La page de démonstration est noindex et n’est pas ajoutée au menu commercial.

## Architecture

- src/domain/risk-perception.ts : données JSON sérialisables, versionnées et bilingues.
- src/content/risk-perception/exams.ts : registre des examens ; ajouter une entrée pour un nouvel examen.
- src/lib/risk-perception/coordinates.ts : rectangle réellement affiché par object-fit:contain, coordonnées normalisées.
- src/lib/risk-perception/hitboxes.ts : interpolation linéaire des keyframes.
- src/lib/risk-perception/validation.ts : validation du contenu à l’import, exactement 10 risques et 1–3 par séquence.
- src/lib/risk-perception/scoring.ts : calcul pur du score après l’examen.
- src/lib/risk-perception/session.ts et components/risk-perception/useRiskExam.ts : tentative, transitions de 1,5 s, résultats.
- src/components/risk-perception/RiskPerceptionPlayer.tsx : lecture tactile/souris/clavier et correction.
- src/components/risk-perception/RiskCorrection.tsx : replay, zones animées et journal des clics.
- src/lib/risk-perception/storage.ts : cinq dernières tentatives terminées dans localStorage, clé dédiée permishub.tpr.attempts.v1.

## Contenu DEMO

La vidéo locale `public/videos/tpr/anderlecht-01.mp4` est utilisée sans modification.
Cinq extraits de huit secondes : 60–68, 100–108, 140–148, 180–188, 220–228 secondes.
Les zones sont SYNTHÉTIQUES et ne représentent pas des dangers routiers validés. L’interface le dit avant, pendant et après l’essai.
Il faut annoter/vérifier le contenu avant d’en faire un entraînement pédagogique réel. Ne pas simplement retirer le bandeau DEMO.

## Convention de temps / coordonnées

Tous les temps stockés sont en secondes absolues dans le fichier vidéo, y compris startTime, endTime, activeFrom, activeUntil et click.time.
La correction affiche les secondes relatives au début du fragment pour faciliter la lecture.
Les clics stockent le currentTime non arrondi à la relâche du pointeur.
x/y = coin supérieur gauche de la hitbox ; width/height et les clics sont normalisés sur l’image réellement visible.
Les clics dans les bandes noires ne sont pas enregistrés. Recalcul au resize, rotation et clic.
Les glissements, annulations tactiles, appuis longs et gestes multi-touch ne sont pas des clics.
Le lecteur démarre sans son (autoplay mobile). Un bouton permet de démarrer/reprendre si le navigateur bloque la lecture.
Le test masque les contrôles natifs, remet les déplacements de timeline à la dernière position autorisée et force la vitesse normale.
Ce verrouillage est une protection UX, pas une protection anti-triche contre les outils développeur.

## Score

Fenêtre temporelle inclusive ET appartenance à la hitbox interpolée.
Un point par risque. Aucun malus pour un faux clic.
Si plusieurs zones se chevauchent, la zone dont le centre est le plus proche gagne ; l’ID départage les égalités.
Cliquer encore sur le même objet est un doublon, même si une autre zone non validée le chevauche.
Un même événement reçu deux fois (même ID) est ignoré.
Les réponses sont calculées côté client ; le lecteur en mode test reçoit uniquement une projection sans annotations.
La tentative reste en mémoire pendant le test. Recharger abandonne l’essai en cours ; seules les tentatives terminées sont sauvegardées.
Aucun envoi serveur ni liaison à un compte. Une nouvelle version du contenu ne restaure pas une ancienne tentative.

## Futur éditeur

L’éditeur pourra produire directement le même objet RiskExam (schemaVersion, id, version, status, textes FR/NL et séquences).
Chaque vidéo conserve sa source et ses bornes. Les risques contiennent des keyframes ordonnées, avec couverture de leur fenêtre active.
Une seule keyframe suffit pour une zone statique. Augmenter version après toute modification des annotations.
Appeler validateExam à l’import et avant publication. Pour des données JSON externes non fiables, ajouter une validation de structure à la frontière API avant cette validation métier.
Aucun schéma de base de données imposé : le registre pourra être remplacé par un repository.

## Vérification

npm run test:tpr
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run dev

Dans l’interface : terminer les cinq séquences, ouvrir la correction, cliquer « Revoir ce risque », vérifier la zone jaune et le journal.
Tester en portrait et paysage. Les flèches permettent de viser au clavier, Entrée/Espace enregistrent le clic.
