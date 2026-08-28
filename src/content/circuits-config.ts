/**
 * Contenu éditable du bandeau "coût de l'échec" au-dessus du carrousel
 * circuits (brief v2 §Monétisation). Volontairement dans un module à part
 * (pas un texte figé dans le composant) pour pouvoir migrer vers un champ
 * back-office éditable sans toucher au JSX.
 *
 * ⚠️ sourceUrl est délibérément vide : le client n'a pas pu vérifier la
 * règle "6h de cours pratique après 2 échecs" via une source officielle
 * belge (GOCA / SPF Mobilité) au moment de l'écriture. Ne pas inventer de
 * lien — à compléter avant mise en production (voir SETUP.md).
 */
export const COUT_ECHEC_BANNER = {
  textFr:
    "Après 2 échecs à l'examen pratique, une formation complémentaire de 6h dans l'auto-école de ton choix est souvent exigée — ça coûte vite plus cher qu'un circuit d'entraînement.",
  textNl:
    'Na 2 mislukte praktijkexamens is vaak een aanvullende opleiding van 6u bij de rijschool naar keuze vereist — dat kost al snel meer dan een trainingscircuit.',
  /** À remplir avec une source officielle vérifiée (GOCA/SPF Mobilité) avant mise en prod. */
  sourceUrl: null as string | null,
}
