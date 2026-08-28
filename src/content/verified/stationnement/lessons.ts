import type { Lesson } from '@/domain/content'

const L25: Lesson = {
  slug: 'arret-et-stationnement',
  themeSlug: 'stationnement',
  title: { fr: 'Arrêt et stationnement', nl: 'Stilstaan en parkeren' },
  intro: {
    fr: "Arrêt, stationnement, immobilisation, panne : quatre mots qui semblent proches mais n'ont pas du tout la même valeur légale.",
    nl: 'Stilstaan, parkeren, immobilisatie, pech: vier woorden die op elkaar lijken maar wettelijk helemaal niet hetzelfde betekenen.',
  },
  objectives: [
    { fr: 'Distinguer arrêt, stationnement et immobilisation', nl: 'Stilstaan, parkeren en immobilisatie onderscheiden' },
    { fr: 'Savoir où stationner en priorité', nl: 'Weten waar u bij voorkeur parkeert' },
    { fr: "Connaître les lieux où l'arrêt est totalement interdit", nl: 'De plaatsen kennen waar stilstaan volledig verboden is' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'st25-c1-def',
      title: { fr: 'Quatre mots, quatre statuts légaux', nl: 'Vier woorden, vier wettelijke statuten' },
      paragraphs: [
        {
          fr: "S'arrêter, c'est le temps de faire monter/descendre quelqu'un ou de charger/décharger. Au-delà, tu stationnes. Un feu rouge ou un embouteillage qui t'immobilise n'est ni l'un ni l'autre — et une vraie panne encore moins : dans ce cas, le triangle de danger remplace toute question de « bon » emplacement.",
          nl: 'Stilstaan is de tijd om iemand te laten in- of uitstappen, of te laden/lossen. Daarna parkeer je. Een rood licht of file die je doet stilstaan is geen van beide — en echte pech al helemaal niet: dan vervangt de gevarendriehoek elke vraag naar een "goede" plaats.',
        },
      ],
      factIds: ['st25-definitions'],
      miniQuizQuestionIds: ['st25-q1'],
    },
    {
      id: 'st25-c2-priorite',
      title: { fr: 'Où stationner, dans l’ordre', nl: 'Waar parkeren, in volgorde' },
      paragraphs: [
        {
          fr: "L'accotement ou la bande de stationnement passent toujours avant la chaussée. Si tu dois vraiment te garer sur la chaussée, colle-toi au bord droit, dans le sens de la marche, et laisse au moins 1 mètre avec le véhicule suivant — jamais en double file.",
          nl: 'De berm of de parkeerstrook gaan altijd voor de rijbaan. Als u écht op de rijbaan moet parkeren, blijf dan dicht bij de rechterrand, in de rijrichting, en laat minstens 1 meter met het volgende voertuig — nooit dubbel geparkeerd.',
        },
      ],
      factIds: ['st25-ou-stationner'],
      miniQuizQuestionIds: ['st25-q2'],
    },
    {
      id: 'st25-c3-interdits',
      title: { fr: 'Les lieux sans discussion possible', nl: 'De plaatsen zonder discussie mogelijk' },
      paragraphs: [
        {
          fr: "Certains endroits interdisent même l'arrêt bref : trottoir, piste cyclable, zone d'évitement, voies de tram, passage à niveau, sous un pont, dans un virage sans visibilité... Ajoute les distances de sécurité aux carrefours — 5 m sans feux, 20 m avec — et tu couvres l'essentiel des questions d'examen sur ce sujet.",
          nl: 'Sommige plaatsen verbieden zelfs kort stilstaan: voetpad, fietspad, vermijdingszone, tramsporen, overweg, onder een brug, in een bocht zonder zicht... Voeg de veiligheidsafstanden bij kruispunten toe — 5 m zonder lichten, 20 m met — en u dekt het meeste van de examenvragen over dit onderwerp.',
        },
      ],
      callouts: [
        {
          kind: 'retenir',
          text: { fr: 'Interdit partout où ta présence crée un danger ou gêne sans raison valable — même sans signal.', nl: 'Verboden overal waar uw aanwezigheid gevaar oplevert of hindert zonder geldige reden — ook zonder bord.' },
        },
      ],
      factIds: ['st25-interdits-partout', 'st25-distances-carrefour', 'st25-visibilite'],
      miniQuizQuestionIds: ['st25-q3'],
    },
  ],
  summary: {
    fr: "Arrêt = temps de (dé)charger. Stationnement = au-delà. Priorité à l'accotement ; sur chaussée, bord droit + 1 m entre véhicules. Interdit partout où c'est dangereux, et dans un rayon précis autour des carrefours.",
    nl: 'Stilstaan = tijd om te (ont)laden. Parkeren = daarna. Voorrang aan de berm; op de rijbaan, rechterrand + 1 m tussen voertuigen. Verboden overal waar het gevaarlijk is, en binnen een precieze straal rond kruispunten.',
  },
}

const L26: Lesson = {
  slug: 'stationnement-interdit',
  themeSlug: 'stationnement',
  title: { fr: 'Stationnement interdit (mais arrêt permis)', nl: 'Verboden te parkeren (maar stilstaan toegelaten)' },
  intro: {
    fr: "Une catégorie à part : des lieux où tu ne peux pas rester, mais où tu peux malgré tout t'arrêter un instant.",
    nl: 'Een aparte categorie: plaatsen waar u niet mag blijven, maar waar u toch even mag stilstaan.',
  },
  objectives: [
    { fr: "Reconnaître les cas où seul le stationnement est interdit", nl: 'De gevallen herkennen waar enkel parkeren verboden is' },
    { fr: 'Lire correctement les signaux et leurs flèches', nl: 'De borden en hun pijlen correct lezen' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'st26-c1-arret-ok',
      title: { fr: 'Stationner non, s’arrêter oui', nl: 'Parkeren nee, stilstaan ja' },
      paragraphs: [
        {
          fr: "Sans 1 mètre libre avant et après ta voiture, devant un garage ou un accès (sauf plaque du riverain), à moins de 15 m d'un arrêt de bus, ou là où un obstacle forcerait un cycliste vers la chaussée : dans tous ces cas, tu peux t'arrêter le temps de déposer quelqu'un, mais pas stationner.",
          nl: 'Zonder 1 meter vrije ruimte voor en achter uw auto, voor een garage of oprit (tenzij nummerplaat van de bewoner), binnen 15 m van een bushalte, of waar een obstakel een fietser naar de rijbaan zou dwingen: in al deze gevallen mag u stilstaan om iemand af te zetten, maar niet parkeren.',
        },
      ],
      examples: [
        {
          fr: "Une chaussée trop étroite pour laisser 3 m de passage, ou stationner en face d'un véhicule déjà garé au point de gêner un croisement : même logique, arrêt bref toléré, stationnement non.",
          nl: 'Een rijbaan te smal om 3 m doorgang te laten, of parkeren tegenover een al geparkeerd voertuig zodat een kruising gehinderd wordt: dezelfde logica, kort stilstaan getolereerd, parkeren niet.',
        },
      ],
      factIds: ['st26-arret-ok-stationnement-non', 'st26-chaussee-etroite-oppose', 'st26-voie-prioritaire-bandes'],
      miniQuizQuestionIds: ['st26-q1'],
    },
    {
      id: 'st26-c2-signaux',
      title: { fr: 'Lire les panneaux et leurs flèches', nl: 'De borden en hun pijlen lezen' },
      paragraphs: [
        {
          fr: "Un rond bleu barré d'une diagonale = stationnement interdit ; de deux diagonales = stationnement ET arrêt interdits. Une flèche sous le panneau précise où : vers le haut, l'interdiction commence après le signal ; vers le bas, elle s'arrête à lui.",
          nl: 'Een blauwe cirkel met één diagonale streep = parkeren verboden; met twee = parkeren ÉN stilstaan verboden. Een pijl onder het bord verduidelijkt waar: naar boven, het verbod begint na het bord; naar beneden, het stopt bij het bord.',
        },
      ],
      factIds: ['st26-signaux-fleches', 'st26-alterne-semi-mensuel'],
      miniQuizQuestionIds: ['st26-q2'],
    },
  ],
  summary: {
    fr: "Certains lieux (1 m manquant, garage, arrêt de bus, chaussée trop étroite...) interdisent seulement le stationnement, pas l'arrêt bref. Sur les panneaux, la flèche indique où l'interdiction s'applique.",
    nl: 'Sommige plaatsen (1 m ontbrekend, garage, bushalte, te smalle rijbaan...) verbieden enkel parkeren, niet kort stilstaan. Op de borden geeft de pijl aan waar het verbod geldt.',
  },
}

const L27: Lesson = {
  slug: 'autres-regles-de-stationnement',
  themeSlug: 'stationnement',
  title: { fr: "D'autres règles de stationnement", nl: 'Andere parkeerregels' },
  intro: { fr: "Zone bleue, panneaux P, sortie du véhicule, durée maximale : les derniers détails pratiques du stationnement.", nl: 'Blauwe zone, P-borden, uitstappen, maximumduur: de laatste praktische details van het parkeren.' },
  objectives: [
    { fr: 'Utiliser correctement le disque de stationnement', nl: 'De parkeerschijf correct gebruiken' },
    { fr: 'Descendre de voiture en toute sécurité', nl: 'Veilig uit de auto stappen' },
  ],
  estimatedMinutes: 5,
  chapters: [
    {
      id: 'st27-c1-zone-bleue',
      title: { fr: 'La zone bleue et les panneaux P', nl: 'De blauwe zone en de P-borden' },
      paragraphs: [
        {
          fr: "En zone bleue, le disque de stationnement est obligatoire les jours ouvrables de 9h à 18h, pour deux heures maximum — impossible de tricher en avançant l'heure affichée. Un panneau P avec une voiture autorise voitures, minibus et motos... mais pas les camionnettes, un piège classique.",
          nl: 'In de blauwe zone is de parkeerschijf verplicht op werkdagen van 9u tot 18u, voor maximum twee uur — onmogelijk te sjoemelen door het aangegeven uur te vervroegen. Een P-bord met een auto laat auto\'s, minibussen en motoren toe... maar geen bestelwagens, een klassieke valstrik.',
        },
      ],
      factIds: ['st27-zone-bleue', 'st27-signaux-p'],
      miniQuizQuestionIds: ['st27-q1'],
    },
    {
      id: 'st27-c2-sortie-duree',
      title: { fr: 'Descendre en sécurité, et la durée maximale', nl: 'Veilig uitstappen, en de maximumduur' },
      paragraphs: [
        {
          fr: "Frein à main, vitres fermées, moteur coupé, clé retirée : le rituel avant de sortir. Descends plutôt par l'arrière du véhicule pour voir venir la circulation. Et retiens les durées maximales : 24 heures pour un véhicule en panne, 3 heures pour un véhicule publicitaire — la vente sur la voie publique, elle, est carrément interdite.",
          nl: 'Handrem, ramen dicht, motor uit, sleutel eruit: het ritueel voor u uitstapt. Stap liever langs de achterkant van het voertuig uit om het verkeer te zien aankomen. En onthoud de maximumduren: 24 uur voor een voertuig met pech, 3 uur voor een reclamevoertuig — verkoop op de openbare weg is dan weer gewoon verboden.',
        },
      ],
      factIds: ['st27-descendre-vehicule', 'st27-longue-duree'],
      miniQuizQuestionIds: ['st27-q2'],
    },
  ],
  summary: {
    fr: "Zone bleue : disque obligatoire, 2h max, jours ouvrables 9h-18h. Descends par l'arrière du véhicule. Panne : 24h max sur la voie publique ; véhicule publicitaire : 3h max.",
    nl: 'Blauwe zone: schijf verplicht, max. 2u, werkdagen 9u-18u. Stap langs de achterkant uit. Pech: max. 24u op de openbare weg; reclamevoertuig: max. 3u.',
  },
}

export const STATIONNEMENT_LESSONS: Lesson[] = [L25, L26, L27]
