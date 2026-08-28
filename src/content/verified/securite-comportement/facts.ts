import type { SourceReference, VerifiedFact } from '@/domain/source'
import type { Region } from '@/domain/region'

/**
 * Faits extraits des PDF 28 (alcool/drogues) et 29 (accident) — voir
 * docs/CONTENT_PIPELINE.md. Les seuils d'alcoolémie ont en plus été
 * recoupés le 2026-08-18 avec des sources juridiques secondaires en ligne
 * (concordantes, y compris sur l'abaissement à 0,35 mg/l du seuil de
 * retrait immédiat depuis février 2026) — voir le callout du chapitre
 * correspondant.
 */
function refFrom(sourceId: string, page: number, region: Region = 'BE'): SourceReference {
  return {
    sourceId,
    page,
    region,
    language: 'fr',
    verifiedAt: '2026-08-18',
    verifiedBy: 'Claude (lecture directe du PDF) — relecture humaine à faire',
  }
}

export const SECURITE_COMPORTEMENT_FACTS: VerifiedFact[] = [
  // --- 28-alcohol-et-drogues.pdf ---
  {
    id: 'sc28-qui-controle',
    themeSlug: 'securite-comportement',
    statement: "Toute personne qui conduit ou s'apprête à conduire (y compris cyclistes et cavaliers) peut être soumise à un contrôle d'alcoolémie, tout comme l'auteur présumé d'un accident. Les passagers ou une personne endormie ailleurs qu'au volant ne le sont pas. Refuser le test sans motif légitime est punissable.",
    reference: refFrom('28-alcool-et-drogues', 1),
  },
  {
    id: 'sc28-test-haleine',
    themeSlug: 'securite-comportement',
    statement: "Le test d'haleine donne trois résultats : « S » (sûr, sous 0,22 mg/l), « A » (alarme, 0,22 à 0,35 mg/l) ou « P » (positif, dès 0,35 mg/l) — les deux derniers déclenchent une analyse de l'haleine pour un résultat précis. Refuser le test équivaut à un résultat « P » et interdit de conduire pendant six heures.",
    reference: refFrom('28-alcool-et-drogues', 2),
  },
  {
    id: 'sc28-analyse-sanctions',
    themeSlug: 'securite-comportement',
    statement: "Selon l'analyse de l'haleine : sous 0,22 mg/l, tu conduis normalement. Entre 0,22 et 0,35 mg/l, retrait du permis 3 heures + amende. À partir de 0,35 mg/l, retrait légal de 6 heures — mais en pratique les parquets retirent le permis 15 jours, la norme actuelle — plus une amende.",
    reference: refFrom('28-alcool-et-drogues', 3),
  },
  {
    id: 'sc28-antidemarrage',
    themeSlug: 'securite-comportement',
    statement: "Un juge peut imposer un éthylotest antidémarrage (1 à 3 ans, voire à vie) dès 0,8 ‰ ou en cas de récidive ; il devient obligatoire à partir de 1,8 ‰ (sauf décision motivée contraire) ou pour un récidiviste grave contrôlé deux fois à 1,2 ‰ ou plus en 3 ans.",
    reference: refFrom('28-alcool-et-drogues', 4),
  },
  {
    id: 'sc28-drogues',
    themeSlug: 'securite-comportement',
    statement: "Un test salivaire n'est imposé que sur soupçon objectif de drogue (ou automatiquement en cas d'accident). Un résultat positif entraîne un retrait du permis de 12 heures (voire immédiat) et expose à une interdiction de conduire jusqu'à 5 ans.",
    reference: refFrom('28-alcool-et-drogues', 5),
  },

  // --- 29-accident.pdf ---
  {
    id: 'sc29-sans-blesses',
    themeSlug: 'securite-comportement',
    statement: "Sans blessé, il n'est pas obligatoire d'appeler la police si les parties remplissent et signent le constat européen d'accident — mais un désaccord ou un doute (documents en ordre, état du conducteur) justifie d'appeler quand même. Le triangle de danger se place à 30 m sur route ordinaire, 100 m sur autoroute.",
    reference: refFrom('29-accident', 2),
  },
  {
    id: 'sc29-constat',
    themeSlug: 'securite-comportement',
    statement: "La face avant du constat européen d'accident doit être remplie et signée par les deux parties avant de quitter les lieux — une fois signée, plus rien ne peut y être modifié. La face arrière peut être complétée plus tard. Toute personne impliquée doit rester sur place et présenter sa carte d'identité si demandé (dès 15 ans).",
    reference: refFrom('29-accident', 3),
  },
  {
    id: 'sc29-avec-blesses',
    themeSlug: 'securite-comportement',
    statement: "En cas d'accident avec blessés, la police doit toujours intervenir. Le gilet de sécurité est obligatoire pour le conducteur qui quitte son véhicule sur autoroute ou route pour automobiles (vivement conseillé ailleurs).",
    reference: refFrom('29-accident', 4),
  },
  {
    id: 'sc29-blesses-gestes',
    themeSlug: 'securite-comportement',
    statement: "Ne jamais déplacer une victime inutilement (sauf risque d'incendie), ne pas retirer un casque (sauf difficulté respiratoire), ne rien lui donner à boire ou manger. En cas d'hémorragie forte, couvrir la plaie d'un tissu propre — jamais garrotter au-dessus.",
    reference: refFrom('29-accident', 6),
  },
  {
    id: 'sc29-delit-fuite',
    themeSlug: 'securite-comportement',
    statement: "Le délit de fuite consiste à quitter volontairement les lieux d'un accident qu'on a causé ou pu causer, en sachant ou en doutant l'avoir fait, pour échapper aux constatations — une infraction sévèrement punie, quelle que soit la conviction de ne pas avoir été vu.",
    reference: refFrom('29-accident', 10),
  },
]
