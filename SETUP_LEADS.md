# Leads du tunnel de qualification (`/test-de-niveau`)

Chaque soumission d'email sur `/[locale]/test-de-niveau` est envoyée à
`POST /api/lead`, qui écrit une ligne dans un Google Sheet via un **Google
Apps Script Web App** — pas de base de données pour l'instant (voir
`src/lib/leads.ts`, tout passe par `saveLead()` pour pouvoir migrer plus
tard sans toucher au reste du code).

## 1. Créer le Google Sheet

1. Va sur [sheets.google.com](https://sheets.google.com) → crée une feuille
   vide, nomme-la par exemple **"PermisHub — Leads"**.
2. Laisse la première ligne vide — le script écrit lui-même les en-têtes à
   la première exécution.

## 2. Ajouter le script

1. Dans le Sheet : **Extensions** → **Apps Script**.
2. Supprime le contenu par défaut de `Code.gs`, colle exactement ceci :

```javascript
/**
 * Reçoit un lead du tunnel PermisHub (POST JSON) et l'ajoute comme
 * nouvelle ligne. Colonnes dans un ordre fixe — si l'app envoie un champ
 * en plus/en moins, il est ignoré/laissé vide plutôt que de décaler les
 * colonnes existantes.
 */
var COLUMNS = [
  'date',
  'email',
  'locale',
  'region',
  'examen_vise',
  'echeance',
  'tentatives',
  'segment',
  'consentement',
  'utm_source',
  'utm_campaign',
  'user_agent',
  'a_achete',
];

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS);
  }

  var data = JSON.parse(e.postData.contents);
  var row = COLUMNS.map(function (key) {
    return data[key] !== undefined ? data[key] : '';
  });
  sheet.appendRow(row);

  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
    ContentService.MimeType.JSON,
  );
}
```

3. **Fichier** → **Enregistrer** (ou Ctrl+S), donne un nom au projet si demandé (ex. "PermisHub Leads").

## 3. Déployer en Web App

1. En haut à droite : **Déployer** → **Nouveau déploiement**.
2. Clique sur la roue dentée ⚙️ à côté de "Sélectionner le type" → choisis **Application Web**.
3. Renseigne :
   - **Exécuter en tant que** : Moi (ton compte Google).
   - **Qui a accès** : **Tout le monde** (obligatoire — sinon le serveur PermisHub ne peut pas écrire dedans).
4. **Déployer**. Google va peut-être demander d'autoriser le script à accéder au Sheet — accepte.
5. Copie l'**URL de l'application Web** affichée (se termine par `/exec`).

## 4. Brancher l'URL dans PermisHub

Ajoute cette URL comme variable d'environnement :

```
GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/XXXXXXXX/exec"
```

- En local : dans `.env.local`.
- En production (Netlify) : `netlify env:set GOOGLE_SHEET_WEBHOOK_URL "..."`, puis redéployer.

## 5. Tester

Depuis un terminal, sans passer par le site :

```bash
curl -X POST "TON_URL_ICI" \
  -H "Content-Type: application/json" \
  -d '{"date":"test","email":"test@example.com","locale":"fr","region":"wallonie","examen_vise":"theorique","echeance":"urgent","tentatives":"0","segment":"chaud","consentement":"oui","utm_source":"","utm_campaign":"","user_agent":"curl","a_achete":""}'
```

Une nouvelle ligne doit apparaître dans le Sheet. Si rien n'apparaît :
revérifie que "Qui a accès" est bien sur **Tout le monde**, et que tu as
copié l'URL qui se termine par `/exec` (pas celle de l'éditeur du script).

## Mise à jour du 2026-09-08 : ajout de la question "région"

Le tunnel pose maintenant une 4e question (Wallonie/Bruxelles/Flandre) en
premier, avant "Tu passes quoi". Le code envoie déjà un champ `region` à
`/api/lead`, mais **le Sheet et le script déjà déployés ne le savent pas
encore** — 3 actions manuelles à faire une seule fois :

1. **Dans le Sheet** : ajoute manuellement une colonne `region` (en-tête)
   entre `locale` et `examen_vise` — les en-têtes existantes ne se
   régénèrent pas toutes seules une fois écrites.
2. **Dans l'éditeur Apps Script** : mets à jour le tableau `COLUMNS` en
   haut de `Code.gs` pour qu'il corresponde exactement à celui de cette
   page (avec `'region'` ajouté après `'locale'`).
3. **Republie** : **Déployer** → **Gérer les déploiements** → icône crayon
   ✏️ sur le déploiement existant → **Nouvelle version** → **Déployer**.
   Ne crée surtout pas un *nouveau* déploiement (ça générerait une nouvelle
   URL et casserait `GOOGLE_SHEET_WEBHOOK_URL`, déjà configuré en local et
   sur Netlify).

Tant que ces 3 étapes ne sont pas faites, les nouveaux leads arriveront
quand même dans le Sheet, juste sans la colonne `region` remplie (le
script actuel ignore silencieusement les champs qu'il ne connaît pas).

## Retoucher le script plus tard

Si tu modifies `Code.gs` après ce premier déploiement, il faut **republier**
la même version : **Déployer** → **Gérer les déploiements** → icône crayon
✏️ sur le déploiement existant → **Nouvelle version** → **Déployer**. Créer
un *nouveau* déploiement au lieu de mettre à jour l'existant génère une
nouvelle URL, et casserait `GOOGLE_SHEET_WEBHOOK_URL`.

## Ce que le code fait déjà pour toi

- `src/lib/leads.ts` : seule fonction qui parle au Sheet (`saveLead`) — pour
  migrer vers une vraie base de données plus tard, ne change que ce fichier.
- `src/app/api/lead/route.ts` : valide l'email et le consentement, limite à
  5 requêtes / 10 min par IP, ne logue jamais un email en clair (seulement
  le domaine, en cas d'erreur).
- Le tunnel (`QuizFunnel.tsx`) avance vers le test **même si `/api/lead`
  échoue** (Sheet mal configuré, quota dépassé, etc.) — un visiteur n'est
  jamais bloqué par un souci de stockage.
