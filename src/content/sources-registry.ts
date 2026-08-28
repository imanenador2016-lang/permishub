import type { SourceDocument } from '@/domain/source'

/**
 * Catalogue des documents PDF de référence.
 *
 * Ces fichiers vivent physiquement en dehors de ce dépôt, dans le dossier
 * `/sources/` du projet (actuellement : documents-permis/ à la racine du
 * Bureau). Ils ne sont JAMAIS copiés ni servis par l'application — ce
 * fichier ne fait que les référencer par id, pour que domain/source.ts
 * (SourceReference) puisse pointer vers une page précise d'un document
 * précis.
 *
 * Statut au 2026-08-18 : catalogué uniquement, contenu non encore traité
 * (voir docs/CONTENT_PIPELINE.md, étape 1). Aucun fait vérifié n'a encore
 * été extrait de ces documents.
 *
 * Doublons constatés sur disque (même taille de fichier, donc probablement
 * un simple fichier dupliqué "- Copie" / "(1)") : signalés en note pour
 * nettoyage ultérieur du dossier source, sans impact ici puisqu'un seul id
 * est catalogué par contenu.
 */
export const SOURCE_DOCUMENTS: SourceDocument[] = [
  { id: '01-voie-publique', filename: '1-la-voie-publique.pdf', title: 'La voie publique', pageCount: 6, status: 'traite', notes: 'Doublon sur disque : "1-la-voie-publique (1).pdf". Document "Leçon 1 - 2026" (permisdeconduire-online.be). Faits extraits dans src/content/verified/voie-publique/ — première passe par lecture directe du PDF, à faire relire par un humain avant publication définitive (voir docs/CONTENT_PIPELINE.md, étape 6).' },
  { id: '02-bandes-de-circulation', filename: '2-les-bandes-de-circulation - Copie.pdf', title: 'Les bandes de circulation', status: 'traite', notes: 'Faits extraits dans src/content/verified/voie-publique/ (leçon "Les bandes de circulation").' },
  { id: '03-cyclistes', filename: '3-les-cyclistes - Copie.pdf', title: 'Les cyclistes', status: 'traite', notes: 'Faits extraits dans src/content/verified/voie-publique/ (leçon "Les cyclistes").' },
  { id: '04-autoroute', filename: "4-l'autoroute.pdf", title: "L'autoroute", status: 'traite', notes: 'Faits extraits dans src/content/verified/circulation-vitesse/ (leçon "Autoroute").' },
  { id: '05-route-pour-automobiles', filename: '5-route-pour-automobiles.pdf', title: 'Route pour automobiles', status: 'traite', notes: 'Doublon sur disque : "5-route-pour-automobiles - Copie.pdf". Faits extraits dans src/content/verified/circulation-vitesse/ (leçon "Route pour automobiles").' },
  { id: '06-lieux-particuliers', filename: '6-lieux-particuliers.pdf', title: 'Lieux particuliers', status: 'traite', notes: 'Doublon sur disque : "6-lieux-particuliers - Copie.pdf". Faits extraits dans src/content/verified/voie-publique/ (leçon "Lieux particuliers").' },
  { id: '07-pietons', filename: '7-les-piétons.pdf', title: 'Les piétons', status: 'traite', notes: 'Doublon sur disque : "7-les-piétons - Copie.pdf". Faits extraits dans src/content/verified/voie-publique/ (leçon "Les piétons").' },
  { id: '08-conducteurs-de-vehicules', filename: '8-les-conducteurs-de-véhicules.pdf', title: 'Les conducteurs de véhicules', status: 'traite', notes: 'Doublon sur disque : "8-les-conducteurs-de-véhicules - Copie.pdf". Faits extraits dans src/content/verified/voie-publique/ (leçon "Les conducteurs de véhicules").' },
  { id: '09-masse-maximale-autorisee', filename: '9-masse-maximale-autorisée.pdf', title: 'Masse maximale autorisée', status: 'traite', notes: 'Doublon sur disque : "9-masse-maximale-autorisée - Copie.pdf". Faits extraits dans src/content/verified/vehicule-technique/ (leçon "Masse maximale autorisée").' },
  { id: '10-chargement-de-vehicules', filename: '10-chargement-de-véhicules.pdf', title: 'Chargement de véhicules', status: 'traite', notes: 'Doublon sur disque : "10-chargement-de-véhicules - Copie.pdf". Faits extraits dans src/content/verified/vehicule-technique/ (leçon "Chargement de véhicules").' },
  { id: '11-feux-et-klaxon', filename: '11-les-feux-et-le-klaxon.pdf', title: 'Les feux et le klaxon', status: 'traite', notes: 'Faits extraits dans src/content/verified/signalisation-priorites/ (leçon "Feux et klaxon").' },
  { id: '12-vitesse-maximale', filename: '12-la-vitesse-maximale.pdf', title: 'La vitesse maximale', status: 'traite', notes: "Seuils par région (Wallonie vs Bruxelles/Flandre) recoupés via recherche web le 2026-08-18 — concordants avec le PDF. Faits extraits dans src/content/verified/circulation-vitesse/ (leçon \"Vitesse maximale — récapitulatif\", avec tableau régional)." },
  { id: '13-distance-arret', filename: '13-la-distance-d’arrêt.pdf', title: "La distance d'arrêt", status: 'traite', notes: 'Faits extraits dans src/content/verified/circulation-vitesse/ (leçon "Distance d\'arrêt").' },
  { id: '14-croisement', filename: '14-le-croisement.pdf', title: 'Le croisement', status: 'traite', notes: 'Faits extraits dans src/content/verified/circulation-vitesse/ (leçon "Croisement").' },
  { id: '15-depasser-par-la-gauche', filename: '15-dépasser-par-la-gauche.pdf', title: 'Dépasser par la gauche', status: 'traite', notes: 'Faits extraits dans src/content/verified/circulation-vitesse/ (leçon "Dépasser par la gauche").' },
  { id: '16-depassement-interdit', filename: '16-où-le-dépassement-est-interdit.pdf', title: "Où le dépassement est interdit", status: 'traite', notes: 'Faits extraits dans src/content/verified/circulation-vitesse/ (leçon "Dépassement interdit").' },
  { id: '17-personnes-qualifiees', filename: '17-les-personnes-qualifiées.pdf', title: 'Les personnes qualifiées', status: 'traite', notes: 'Faits extraits dans src/content/verified/voie-publique/ (leçon "Les personnes qualifiées").' },
  { id: '18-signaux-lumineux', filename: '18-les-signaux-lumineux.pdf', title: 'Les signaux lumineux', status: 'traite', notes: 'Faits extraits dans src/content/verified/signalisation-priorites/ (leçon "Signaux lumineux").' },
  { id: '19-signaux-priorite', filename: '19-les-signaux-relatifs-à-la-priorité.pdf', title: 'Les signaux relatifs à la priorité', status: 'traite', notes: 'Faits extraits dans src/content/verified/signalisation-priorites/ (leçon "Signaux de priorité").' },
  { id: '20-priorite-de-droite', filename: '20-la-priorité-de-droite.pdf', title: 'La priorité de droite', status: 'traite', notes: 'Faits extraits dans src/content/verified/signalisation-priorites/ (leçon "Priorité de droite").' },
  { id: '21-tourner-droite-gauche', filename: '21-tourner-à-droite-ou-à-gauche.pdf', title: 'Tourner à droite ou à gauche', status: 'traite', notes: 'Faits extraits dans src/content/verified/circulation-vitesse/ (leçon "Tourner à droite ou à gauche").' },
  { id: '22-tram-bus', filename: '22-tram-bus.pdf', title: 'Tram et bus', status: 'traite', notes: 'Faits extraits dans src/content/verified/voie-publique/ (leçon "Tram et bus").' },
  { id: '23-sens-interdits', filename: '23-sens-interdits.pdf', title: 'Sens interdits', status: 'traite', notes: 'Faits extraits dans src/content/verified/signalisation-priorites/ (leçon "Sens interdits").' },
  { id: '24-direction-obligatoire', filename: '24-direction-obligatoire.pdf', title: 'Direction obligatoire', status: 'traite', notes: 'Faits extraits dans src/content/verified/signalisation-priorites/ (leçon "Direction obligatoire").' },
  { id: '25-arret-et-stationnement', filename: '25-arrêt-et-stationnement.pdf', title: 'Arrêt et stationnement', status: 'traite', notes: 'Faits extraits dans src/content/verified/stationnement/ (leçon "Arrêt et stationnement").' },
  { id: '26-stationnement-interdit', filename: '26-stationnement-interdit.pdf', title: 'Stationnement interdit', status: 'traite', notes: 'Faits extraits dans src/content/verified/stationnement/ (leçon "Stationnement interdit").' },
  { id: '27-regles-stationnement', filename: '27-règles-concernant-le-stationnement.pdf', title: 'Règles concernant le stationnement', status: 'traite', notes: 'Faits extraits dans src/content/verified/stationnement/ (leçon "Autres règles").' },
  { id: '28-alcool-et-drogues', filename: '28-alcohol-et-drogues.pdf', title: 'Alcool et drogues', status: 'traite', notes: "Seuils d'alcoolémie recoupés via recherche web le 2026-08-18 — concordants avec le PDF. Faits extraits dans src/content/verified/securite-comportement/ (leçon \"Alcool et drogues au volant\")." },
  { id: '29-accident', filename: '29-accident.pdf', title: 'Accident', status: 'traite', notes: 'Faits extraits dans src/content/verified/securite-comportement/ (leçon "En cas d\'accident").' },
  { id: '30-consommation-carburant', filename: '30-consommation-du-carburant.pdf', title: 'Consommation du carburant', status: 'traite', notes: 'Faits extraits dans src/content/verified/vehicule-technique/ (leçon "Consommation du carburant").' },
  { id: '31-la-technique', filename: '31-la-technique.pdf', title: 'La technique', status: 'traite', notes: 'Faits extraits dans src/content/verified/vehicule-technique/ (leçon "La technique", avec tableau régional sur la symétrie des pneus).' },
  { id: 'permis-theorique-2022', filename: 'Permis théorique (janv 2022).pdf', title: 'Permis théorique — édition janvier 2022', status: 'non_traite', notes: "Document de synthèse transversal, pas un chapitre unique — laissé de côté lors de cette passe (les 31 fiches numérotées couvrent déjà les mêmes thèmes) ; à utiliser comme document de recoupement lors d'une relecture humaine future." },
  { id: 'synthese-pmdc', filename: 'Synthèse pmdc (1).pdf', title: 'Synthèse PMDC', status: 'non_traite', notes: 'Gros document (16 Mo) — probablement un support de cours complet. Sigle "PMDC" à confirmer avant exploitation. Laissé de côté lors de cette passe, à traiter séparément.' },
  { id: 'infractions', filename: 'infractions.pdf', title: 'Infractions', status: 'non_traite', notes: "Document d'index (degrés d'infraction ↔ numéros de leçon), pas un chapitre pédagogique autonome — décision : ne pas en faire une leçon dédiée, le garder comme référence de recoupement interne pour une future relecture humaine." },
  { id: 'synthese-b', filename: 'syntheseB.pdf', title: 'Synthèse B', pageCount: 32, status: 'traite', notes: "Fourni directement par l'utilisateur le 2026-08-20 (permisdeconduire-online.be, éd. 2025) — synthèse transversale MMA/MEC, permis provisoire, feux/klaxon, ceintures, pneus, freinage/ABS-ESP, documents et accessoires obligatoires, tableau des vitesses par région, priorité de droite, arrêt/stationnement, alcool. Faits extraits avec citation de page dans src/content/verified/synthese-b/ — première passe (verifiedBy: 'auto'), à faire relire par un humain avant publication définitive." },
]

/**
 * Brouillon existant, rédigé avant la mise en place de cette architecture,
 * SANS référence de page/source. Il ne doit pas être traité comme un fait
 * vérifié : à réintégrer uniquement après passage par la pipeline normale
 * (voir docs/CONTENT_PIPELINE.md) et rattachement à un SourceReference réel.
 */
export const UNVERIFIED_DRAFTS = [
  {
    filename: 'permisssssss.md',
    note: 'Brouillon de cours (ex. "La voie publique et la chaussée") sans citation de page — statut : non vérifié, non publiable en l\'état.',
  },
]
