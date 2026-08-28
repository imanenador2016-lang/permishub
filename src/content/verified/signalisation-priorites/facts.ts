import type { SourceReference, VerifiedFact } from '@/domain/source'
import type { Region } from '@/domain/region'

/** Faits extraits des PDF 11, 18, 19, 20, 23, 24 — voir docs/CONTENT_PIPELINE.md. */
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

export const SIGNALISATION_PRIORITES_FACTS: VerifiedFact[] = [
  // --- 11-les-feux-et-le-klaxon.pdf ---
  {
    id: 'sp11-feux-quand',
    themeSlug: 'signalisation-priorites',
    statement: "Les feux de croisement ou de route doivent être allumés dès qu'il commence à faire sombre, la nuit, et même en plein jour dès que la visibilité descend sous 200 m (pluie, brouillard, neige, fumée...). Ne pas les allumer est une infraction grave.",
    reference: refFrom('11-feux-et-klaxon', 2),
  },
  {
    id: 'sp11-feux-route-interdits',
    themeSlug: 'signalisation-priorites',
    statement: "Les feux de route sont interdits si la route est déjà bien éclairée, s'ils risquent d'éblouir un véhicule en face, en suivant un véhicule à moins de 50 m sans intention de dépasser, ou à l'approche d'un véhicule sur rails ou d'un bateau.",
    reference: refFrom('11-feux-et-klaxon', 2),
  },
  {
    id: 'sp11-warnings',
    themeSlug: 'signalisation-priorites',
    statement: "Les quatre feux de détresse (warnings) ne peuvent être allumés qu'en cas de panne, pour signaler un risque d'accident imminent, ou par un bus scolaire à l'arrêt qui embarque/débarque des enfants — jamais pour un stationnement gênant.",
    reference: refFrom('11-feux-et-klaxon', 6),
  },
  {
    id: 'sp11-klaxon',
    themeSlug: 'signalisation-priorites',
    statement: "Le klaxon ne peut servir que pour un avertissement nécessaire (éviter un accident) ou, hors agglomération, pour signaler un dépassement imminent. Entre la tombée et le lever du jour, il est remplacé par un appel de phares, sauf danger imminent.",
    reference: refFrom('11-feux-et-klaxon', 8),
  },

  // --- 18-les-signaux-lumineux.pdf ---
  {
    id: 'sp18-feu-rouge-vert',
    themeSlug: 'signalisation-priorites',
    statement: "Feu rouge : arrêt obligatoire avant la ligne d'arrêt (ou le signal). Feu vert : passage autorisé, mais seulement si le carrefour est réellement dégagé — un feu vert n'oblige jamais à s'engager dans un carrefour bloqué.",
    reference: refFrom('18-signaux-lumineux', 1),
  },
  {
    id: 'sp18-feu-orange',
    themeSlug: 'signalisation-priorites',
    statement: "Le feu orange fixe impose de s'arrêter, sauf si l'arrêt en toute sécurité n'est plus possible. Un feu orange clignotant (feux en panne) autorise à franchir le carrefour en respectant les règles de priorité habituelles, avec prudence accrue.",
    reference: refFrom('18-signaux-lumineux', 3),
  },
  {
    id: 'sp18-fleche-verte-rouge',
    themeSlug: 'signalisation-priorites',
    statement: "Une flèche verte allumée en même temps qu'un feu rouge circulaire autorise à suivre sa direction, mais en cédant le passage à tous les usagers venant des autres directions — feu rouge + flèche verte n'est jamais une vraie priorité.",
    reference: refFrom('18-signaux-lumineux', 4),
  },
  {
    id: 'sp18-b22-b23',
    themeSlug: 'signalisation-priorites',
    statement: "Un panneau B22 (tourner à droite) ou B23 (tout droit) sous un feu autorise les cyclistes et speed pedelecs à franchir le feu rouge ou orange dans cette direction, à condition de céder le passage à tous les usagers de la voie transversale.",
    reference: refFrom('18-signaux-lumineux', 4),
  },

  // --- 19-les-signaux-relatifs-à-la-priorité.pdf ---
  {
    id: 'sp19-voie-prioritaire',
    themeSlug: 'signalisation-priorites',
    statement: "Le losange jaune indique une voie prioritaire : priorité à tous les carrefours suivants, jusqu'au signal de fin (souvent annoncé par un panneau « fin » + distance). On peut aussi y dépasser par la gauche dans un carrefour si la manœuvre est sûre.",
    reference: refFrom('19-signaux-priorite', 1),
  },
  {
    id: 'sp19-triangle-stop',
    themeSlug: 'signalisation-priorites',
    statement: "Un triangle sur pointe (cédez le passage) impose de céder le passage aux conducteurs (pas aux piétons) de la voie traversée, avec arrêt seulement si nécessaire. Un STOP impose un arrêt total à la ligne d'arrêt, même si la voie semble libre.",
    reference: refFrom('19-signaux-priorite', 3),
  },
  {
    id: 'sp19-rond-point',
    themeSlug: 'signalisation-priorites',
    statement: "Un rond-point se reconnaît à trois éléments : un dispositif central, des entrées signalées « cédez le passage » ou STOP, et le panneau bleu à trois flèches. En y entrant, on cède le passage à tous ceux déjà engagés dans le rond-point, venant de gauche.",
    reference: refFrom('19-signaux-priorite', 5),
  },

  // --- 20-la-priorité-de-droite.pdf ---
  {
    id: 'sp20-regle-generale',
    themeSlug: 'signalisation-priorites',
    statement: "Sans agent, feux ni signaux, la priorité de droite s'applique : tout conducteur cède le passage à celui qui vient de droite, même si celui-ci ralentit ou s'arrête — il conserve sa priorité et peut s'engager le premier.",
    reference: refFrom('20-priorite-de-droite', 1),
  },
  {
    id: 'sp20-exceptions',
    themeSlug: 'signalisation-priorites',
    statement: "La priorité de droite ne s'applique pas : dans un rond-point (priorité à qui vient du rond-point), à l'intersection avec un sentier/chemin de terre, en quittant un accès privé ou une place de stationnement (le sortant cède toujours), ou si le conducteur venant de droite est en sens interdit.",
    reference: refFrom('20-priorite-de-droite', 5),
  },
  {
    id: 'sp20-tram-priorite',
    themeSlug: 'signalisation-priorites',
    statement: "Un véhicule sur rails (tram) échappe à la priorité de droite : il est toujours prioritaire, quelle que soit sa position au carrefour.",
    reference: refFrom('20-priorite-de-droite', 4),
  },

  // --- 23-sens-interdits.pdf ---
  {
    id: 'sp23-sens-interdit-simple',
    themeSlug: 'signalisation-priorites',
    statement: "Le signal rond rouge à barre blanche interdit à tous les conducteurs (cyclistes compris) de le franchir dans ce sens, sauf panneau additionnel autorisant certains d'entre eux (souvent les cyclistes).",
    reference: refFrom('23-sens-interdits', 1),
  },
  {
    id: 'sp23-sens-interdit-double',
    themeSlug: 'signalisation-priorites',
    statement: "Le même signal sans flèche de direction interdit l'accès dans les deux sens (typiquement une rue piétonne). Le panneau « excepté circulation locale » y autorise les riverains, leurs visiteurs, les livreurs et les cyclistes — jamais un candidat lors de l'examen pratique.",
    reference: refFrom('23-sens-interdits', 2),
  },
  {
    id: 'sp23-mec-demi-tour',
    themeSlug: 'signalisation-priorites',
    statement: "Un signal avec un poids indique la masse en charge (MEC) maximale autorisée à le franchir. Un signal d'interdiction de tourner (gauche/droite) ou de faire demi-tour reste valable jusqu'au carrefour suivant inclus — le demi-tour interdit n'empêche pas de tourner à gauche.",
    reference: refFrom('23-sens-interdits', 5),
  },

  // --- 24-direction-obligatoire.pdf ---
  {
    id: 'sp24-obligation-vs-indication',
    themeSlug: 'signalisation-priorites',
    statement: "Ne pas confondre : un signal d'indication bleu avec flèche signale une voie à sens unique (information), tandis qu'un signal d'obligation (rond bleu à flèche) impose réellement de suivre cette direction — sauf panneau additionnel exemptant les cyclistes.",
    reference: refFrom('24-direction-obligatoire', 2),
  },
  {
    id: 'sp24-ilot',
    themeSlug: 'signalisation-priorites',
    statement: "Un îlot directionnel (peint au sol ou construit) doit être contourné par la droite ; il est interdit d'y circuler, de s'y arrêter ou d'y stationner.",
    reference: refFrom('24-direction-obligatoire', 3),
  },
]
