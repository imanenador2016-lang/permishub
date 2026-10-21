# Audit des séries d’examen PermisHub

> Statut au 20 octobre 2026 : **audit en cours — ne pas considérer la banque comme entièrement validée**.

## Périmètre inventorié

- 15 fichiers de séries trouvés, soit 748 questions.
- 12 séries actives dans `src/lib/examens-blancs.ts` : examens 3 à 14, soit 599 questions.
- 3 séries présentes mais non publiées : examens 1, 2 et 15, soit 149 questions.
- Autres banques séparées repérées dans `src/content/verified`, `src/content/risk-perception`, `src/content/test-de-niveau-questions.ts` et `src/content/imported`. Elles ne sont pas utilisées par le registre des examens blancs photo.

Une sauvegarde antérieure aux corrections est conservée dans `output/audit-examens/backups/examens-avant-audit-2026-10-20.zip` (SHA-256 : `24399C4EAD62D46386D0DFF44BFD6D7C552BE090E1A2143ECEC8BDA7C1DF62E9`).

## Résultats confirmés à ce stade

Le contrôle structurel automatisé couvre les 748 questions : identifiants, types, gravité, présence des champs obligatoires, format des choix, présence de la réponse parmi les choix, valeurs oui/non et numériques, coordonnées d’annotations et existence des images des séries actives. Il passe sans erreur structurelle.

Une première revue des 30 planches de contact couvrant les 599 questions actives a été effectuée. Les 599 fichiers d’image existent. Il reste toutefois 137 groupes de formulations réutilisées à comparer juridiquement avec leurs visuels et leurs réponses. Parmi les 599 questions actives, 309 portent encore le marqueur `needsLegalReview` et 88 le marqueur `needsNewImage`. Ces marqueurs interdisent de déclarer l’audit pédagogique entièrement terminé.

## Corrections confirmées et appliquées

| Question | Problème confirmé | Correction |
|---|---|---|
| E4Q30 | Les voitures sont face à face ; la réponse prétendait que la voiture noire venait de droite. | Réponse corrigée de B vers A. La voiture qui tourne à gauche cède à celle qui continue tout droit. Question, choix et explication réécrits. |
| E11Q29 | Réutilisation de la même scène et de la même erreur que E4Q30. | Réponse corrigée de B vers A et contenu harmonisé. |
| E4Q37 | Les choix « dessin 1 / dessin 2 » étaient peu lisibles malgré les deux moitiés de l’image. | Choix renommés « schéma de gauche / schéma de droite » et explication clarifiée. |
| E5Q4 | L’image montre deux limites de hauteur (2,50 m et 3,50 m), tandis que la question parlait d’une voiture longue de 7 m et de panneaux A/B absents. | Question basée sur un véhicule haut de 3 m ; choix gauche/droite ; réponse corrigée vers le panneau 3,50 m ; explication corrigée. |
| E3Q3 | Les choix parlaient de « panneau 1 » et « panneau 2 », mais aucun numéro n’était visible sur l’image. | Choix remplacés par « panneau de gauche » et « panneau de droite », avec description de l’orientation de la pente. Explication réécrite. |
| E3Q43 | L’ancienne version demandait de choisir entre trois panneaux alors que l’image n’en montrait que deux sans numérotation. | La version locale demande désormais quel panneau visible impose de céder le passage et nomme directement le panneau bleu d’autoroute et le triangle « Cédez le passage ». |
| E3Q17 | La question demandait d’identifier l’endroit marqué par un point d’interrogation, mais aucun point d’interrogation n’était visible. | Ajout d’un repère `?` responsive, positionné sur la chaussée sans masquer les lignes. Un contrôle automatique bloque désormais toute question citant ce repère lorsqu’il est absent. |
| E14Q47 | La question désignait un piéton avec une flèche orange, mais le visuel montrait deux voitures A et B dans une zone résidentielle. | Remplacement par le visuel correspondant à la question identique E13Q16, où le piéton et la flèche orange sont clairement visibles. |
| E7Q31 | L’image montre deux chaussées de deux bandes par sens séparées par une berme centrale, mais la réponse enregistrée était 90 km/h et l’explication traitait la scène comme une route ordinaire. | Réponse corrigée de 90 à 120 km/h et explication alignée sur l’article 11.2.1° du Code applicable. |
| E6Q9 et E13Q11 | La formulation sur le triangle pouvait laisser croire que la « route pour automobiles » était une autoroute et rendre le choix 30/100 m ambigu. | L’énoncé précise désormais explicitement qu’il ne s’agit pas d’une autoroute. Explication confirmée : 30 m sur une voie ordinaire, route pour automobiles comprise ; 100 m uniquement sur autoroute ; visibilité à environ 50 m. |
| E2Q44, E8Q3, E13Q9 et E13Q10 | La bonne limite ou durée était sélectionnée, mais les explications affirmaient à tort qu’un résultat d’au moins 0,35 mg/l ou 0,8 ‰ entraînait automatiquement « 15 jours ». | Explications corrigées selon les règles entrées en vigueur le 1er juillet 2026 : interdiction temporaire uniforme de 12 h et nouveau contrôle obligatoire avant reprise. |
| E14Q40 | Après les 12 h d’interdiction, la réponse enregistrée autorisait le conducteur à repartir sans nouveau contrôle. | Réponse corrigée de A vers B : nouveau test ou nouvelle analyse obligatoire ; nouvelle période de 12 h si le résultat reste au moins égal à 0,22 mg/l. |
| Affichage global des images | Un navigateur pouvait garder une ancienne illustration sous la même URL et afficher un visuel ne correspondant plus au JSON. | Ajout d’une version aux URL d’images dans le lecteur d’examen, y compris préchargement, WebP, image de secours et annotations SVG. |
| Affichage global des images | Le lecteur imposait un cadre fixe 4:3 à toutes les photos. 101 images actives sont en 3:2 et 65 en 16:9, ce qui créait des bandes vides. | Le ratio est désormais celui du fichier source : image complète, sans recadrage et sans vide ajouté par le lecteur, dans la question comme dans la correction. |
| Références visuelles | Les formulations du type « véhicule A/B » ou « panneau 1/2 » pouvaient être ajoutées sans contrôle de la présence du repère dans le visuel. | 24 questions actives avec repères ont été inventoriées et contrôlées. Le contrôle signale maintenant toute nouvelle référence non validée. Résultat actuel : 0 repère manquant parmi ces 24 questions. |

## Base réglementaire applicable

À la date de l’audit, le nouveau Code de la voie publique n’est **pas encore en vigueur** : son entrée en vigueur a été reportée au 1er juin 2027. L’audit 2026 doit donc utiliser l’arrêté royal du 1er décembre 1975 et ses modifications encore applicables, ainsi que les règles régionales actuellement en vigueur.

Pour E4Q30 et E11Q29, l’article 19.3, 3° impose au conducteur qui tourne à gauche de céder le passage aux conducteurs venant en sens inverse.

Sources officielles et institutionnelles utilisées :

- [SPF Mobilité, rapport final du plan fédéral de sécurité routière 2021-2025](https://mobilit.belgium.be/sites/default/files/documents/publications/2026/Plan%20fed%20SR%202021-2025%20-%20rapport%20final.pdf) : entrée en vigueur du nouveau Code fixée au 1er juin 2027.
- [WALLEX, arrêté royal du 1er décembre 1975](https://wallex.wallonie.be/eli/arrete/1975/12/01/1975120109/1976/05/01), notamment l’article 11.2.1° pour les 120 km/h sur une voie à au moins deux bandes par sens séparées autrement que par des marques routières, ainsi que les articles 12 et 19.
- [Loi du 16 mars 1968 relative à la police de la circulation routière](https://www.codedelaroute.be/fr/reglementation/1968031601~invynqx4tj), article 60 : nouveau contrôle obligatoire avant reprise et prolongation de 12 h si le résultat reste au moins égal à 0,22 mg/l.
- [SPF Mobilité, changements entrés en vigueur le 1er juillet 2026](https://mobilit.belgium.be/fr/news/circulation-routiere-plusieurs-nouveautes-entrent-en-vigueur-prochainement) : uniformisation à 12 h des interdictions temporaires liées à l’alcool.
- WALLEX, arrêté du Gouvernement wallon du 17 juillet 2025 relatif aux futures règles régionalisées (à ne pas appliquer avant son entrée en vigueur).

## Tests et artefacts

- `npm run audit:examens` : réussi, 15 séries et 748 questions contrôlées, aucune erreur structurelle.
- Le même audit contient maintenant des garde-fous sur cinq réponses critiques déjà confirmées (E4Q30, E5Q4, E7Q31, E11Q29 et E14Q40) afin d’empêcher leur régression.
- `output/audit-examens/structure.json` : inventaire et résultat détaillé du contrôle.
- `output/audit-examens/index.html` : catalogue visuel des 599 questions actives.
- `output/audit-examens/toutes-les-questions/questions-01.jpg` à `questions-30.jpg` : planches de contact utilisées pour la première revue visuelle exhaustive des questions actives.
- `output/audit-examens/reference-labels.json` et `reference-labels-contact-sheet.jpg` : contrôle des références A/B/C/D et 1/2/3.
- `output/audit-examens/mobile-question-examen-7.png`, `mobile-question-examen-13-q1.png` et `desktop-question-examen-7.png` : rendus réels Chromium après démarrage d’un examen.
- `output/audit-examens/backups/` : sauvegarde avant corrections.

## Points encore ouverts

- Vérification réglementaire individuelle des 748 questions ; la première passe visuelle des 599 questions actives est faite, mais elle ne remplace pas la validation juridique question par question.
- Comparaison des 137 groupes de questions dupliquées ou réutilisées.
- Validation ou correction des 316 questions actives encore marquées pour revue juridique.
- Validation ou remplacement fiable des 88 visuels actifs encore marqués pour remplacement.
- Tests de rendu mobile et ordinateur sur chaque série après clôture des corrections. Un contrôle Chromium réel a déjà été exécuté à 390 × 844 et 1440 × 900 : largeur de page identique à la largeur de fenêtre, aucune barre horizontale, photo complète et ratio source respecté. Le cas 16:9 E13Q1 rend 302 × 170 px dans un conteneur 308 × 176 px, sans zone vide ajoutée par le lecteur. Le bouton WhatsApp n’apparaît plus dans l’interface d’examen.
- `npm run build` atteint Next.js mais échoue avant compilation sur `EINVAL readlink .next/types/package.json`, un artefact du dossier `.next` dans le répertoire OneDrive ; aucune suppression de cache n’a été faite afin de ne pas interrompre le serveur local existant.

Aucun déploiement n’a été effectué par cet audit. Aucun fichier Stripe, abonnement ou paiement ne fait partie des modifications de l’audit.
