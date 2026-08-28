import type { LocalizedText } from '@/domain/content'

/**
 * Messages personnalisés affichés sous le résultat du "Teste ton niveau",
 * un par score de 0 à 10 — remplace le message générique unique. Copywriting
 * fourni par l'utilisateur (brief CRO complet, voir conversation du
 * 2026-08-28) ; le néerlandais est ma traduction, pas une source distincte.
 *
 * `primaryOffer` détermine quelle offre reçoit le gros bouton (et le badge
 * "Recommandé" pour Examens blancs) : Pack Résumé pour les scores 0-3 (poser
 * les bases avant de s'entraîner), Examens blancs illimités pour 4-10 (la
 * pratique répétée fait progresser plus vite une fois les bases là) — voir
 * la table de recommandation du brief.
 */
export interface ScoreMessage {
  accroche: LocalizedText
  message: LocalizedText
  /** Texte du bouton principal, sans le prix (le prix est ajouté séparément via formatPrice). */
  ctaLabel: LocalizedText
  primaryOffer: 'resume' | 'examens'
}

export const RESUME_HOOK_MESSAGES: Record<number, ScoreMessage> = {
  0: {
    accroche: {
      fr: 'Zéro sur dix — et c’est en réalité une bonne nouvelle.',
      nl: 'Nul op tien — en dat is eigenlijk goed nieuws.',
    },
    message: {
      fr: 'Tu sais maintenant exactement d’où tu pars, au lieu de le découvrir le jour de l’examen. Il ne te manque pas de la pratique, il te manque une base claire, dans l’ordre.',
      nl: 'Je weet nu precies waar je staat, in plaats van dat te ontdekken op je examendag. Je mist geen oefening, je mist een duidelijke basis, in de juiste volgorde.',
    },
    ctaLabel: { fr: 'Apprendre les bases en 20 min', nl: 'Leer de basis in 20 min' },
    primaryOffer: 'resume',
  },
  1: {
    accroche: {
      fr: 'Un point marqué — et un vide total évité le jour J.',
      nl: 'Eén punt gescoord — en een volledige leegte vermeden op de grote dag.',
    },
    message: {
      fr: 'Ce test vient de t’épargner la pire des surprises : la découvrir en salle d’examen. Tu as maintenant une feuille de route au lieu d’un vide.',
      nl: 'Deze test heeft je zonet de ergste verrassing bespaard: die ontdekken tijdens het examen zelf. Je hebt nu een routekaart in plaats van een leegte.',
    },
    ctaLabel: { fr: 'Poser mes premières bases', nl: 'Leg mijn eerste basis' },
    primaryOffer: 'resume',
  },
  2: {
    accroche: {
      fr: 'Tes intuitions ne sont pas fausses — elles sont juste incomplètes.',
      nl: 'Je intuïtie zit er niet naast — ze is gewoon nog onvolledig.',
    },
    message: {
      fr: 'Plusieurs de tes réponses étaient proches. C’est bon signe : il te manque juste une structure pour transformer ces intuitions en réflexes fiables.',
      nl: 'Verschillende van je antwoorden zaten dichtbij. Dat is een goed teken: je mist enkel een structuur om die intuïtie om te zetten in betrouwbare reflexen.',
    },
    ctaLabel: { fr: 'Structurer mes connaissances', nl: 'Structureer mijn kennis' },
    primaryOffer: 'resume',
  },
  3: {
    accroche: {
      fr: 'Les bases commencent à se voir.',
      nl: 'De basis begint zichtbaar te worden.',
    },
    message: {
      fr: 'Tu n’es plus à zéro — plusieurs notions te sont déjà familières. Il faut maintenant les verrouiller avant qu’elles ne s’effacent.',
      nl: 'Je start niet meer bij nul — verschillende begrippen zijn je al vertrouwd. Nu moet je ze vastzetten voordat ze weer wegzakken.',
    },
    ctaLabel: { fr: 'Verrouiller mes acquis', nl: 'Zet mijn kennis vast' },
    primaryOffer: 'resume',
  },
  4: {
    accroche: {
      fr: 'Tu as des bases. Il leur manque juste la pratique.',
      nl: 'Je hebt een basis. Ze mist alleen nog oefening.',
    },
    message: {
      fr: 'Tu ne pars plus de zéro — mais une question sur deux te met encore en difficulté. C’est exactement ce que corrige la répétition en conditions réelles.',
      nl: 'Je start niet meer bij nul — maar bij één op de twee vragen twijfel je nog. Herhaling in realistische omstandigheden lost precies dat op.',
    },
    ctaLabel: { fr: 'M’entraîner pour progresser', nl: 'Oefenen om vooruit te gaan' },
    primaryOffer: 'examens',
  },
  5: {
    accroche: {
      fr: 'Tu es exactement au point de bascule.',
      nl: 'Je zit precies op het kantelpunt.',
    },
    message: {
      fr: 'Une question sur deux, tu la réussis déjà. L’autre moitié se joue sur des détails que seul l’entraînement révèle.',
      nl: 'Eén op de twee vragen beantwoord je al correct. De andere helft draait om details die enkel oefening blootlegt.',
    },
    ctaLabel: { fr: 'Faire basculer mon score', nl: 'Laat mijn score kantelen' },
    primaryOffer: 'examens',
  },
  6: {
    accroche: {
      fr: 'Tu sais l’essentiel. Ce sont les détails qui te coûtent des points.',
      nl: 'Je kent de essentie. Het zijn de details die je punten kosten.',
    },
    message: {
      fr: 'Tes erreurs ne viennent pas d’un manque de connaissances — mais de pièges précis qui reviennent d’un examen à l’autre. Les repérer, c’est déjà les éliminer.',
      nl: 'Je fouten komen niet door een gebrek aan kennis — maar door specifieke valkuilen die telkens terugkomen. Ze herkennen is ze al elimineren.',
    },
    ctaLabel: { fr: 'Repérer mes erreurs qui reviennent', nl: 'Spoor mijn terugkerende fouten op' },
    primaryOffer: 'examens',
  },
  7: {
    accroche: {
      fr: 'Un score solide. Reste à prouver que ce n’était pas un coup de chance.',
      nl: 'Een sterke score. Nu nog bewijzen dat het geen toeval was.',
    },
    message: {
      fr: 'Un bon résultat une fois ne garantit rien pour le jour J. L’examen teste la régularité, pas un instant de réussite.',
      nl: 'Eén goed resultaat garandeert niets voor je examendag. Het examen test consistentie, niet één gelukkig moment.',
    },
    ctaLabel: { fr: 'Confirmer mon niveau', nl: 'Bevestig mijn niveau' },
    primaryOffer: 'examens',
  },
  8: {
    accroche: {
      fr: 'Tu es prêt à 80 %. Il manque la régularité.',
      nl: 'Je bent voor 80% klaar. Het ontbreekt aan regelmaat.',
    },
    message: {
      fr: 'Le vrai risque, à ce niveau, ce n’est plus ce que tu ignores — c’est une question inhabituelle qui te déstabilise le jour J. La seule parade : en avoir déjà vu un maximum.',
      nl: 'Het echte risico op dit niveau is niet meer wat je niet weet — het is een ongewone vraag die je uit balans brengt op de dag zelf. De enige remedie: er al zoveel mogelijk gezien hebben.',
    },
    ctaLabel: { fr: 'Enchaîner les examens blancs', nl: 'Doorlopend oefenexamens afleggen' },
    primaryOffer: 'examens',
  },
  9: {
    accroche: {
      fr: 'Il ne manque presque rien.',
      nl: 'Er ontbreekt bijna niets meer.',
    },
    message: {
      fr: 'Une seule question t’a échappé — ce sera peut-être une autre la prochaine fois. À ce niveau, ce n’est plus une question de connaissances, mais de constance.',
      nl: 'Eén vraag ontging je — de volgende keer is het misschien een andere. Op dit niveau draait het niet meer om kennis, maar om consistentie.',
    },
    ctaLabel: { fr: 'Vérifier ma régularité', nl: 'Controleer mijn consistentie' },
    primaryOffer: 'examens',
  },
  10: {
    accroche: {
      fr: 'Score parfait. Maintenant, prouve que ce n’est pas un hasard.',
      nl: 'Perfecte score. Bewijs nu dat het geen toeval is.',
    },
    message: {
      fr: 'Un sans-faute sur une série, c’est excellent. Un sans-faute répété sur plusieurs séries différentes, c’est ce qui sépare ceux qui réussissent de ceux qui rejouent leur chance.',
      nl: 'Een foutloze reeks is uitstekend. Een foutloze prestatie die zich herhaalt over meerdere verschillende reeksen, dat is het verschil tussen slagen en gewoon geluk hebben.',
    },
    ctaLabel: { fr: 'Répéter la performance', nl: 'Herhaal de prestatie' },
    primaryOffer: 'examens',
  },
}
