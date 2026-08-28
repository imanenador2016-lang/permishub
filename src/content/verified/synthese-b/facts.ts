import type { VerifiedFact } from '@/domain/source'

/**
 * Faits extraits de syntheseB.pdf (permisdeconduire-online.be, 2025),
 * fourni directement par l'utilisateur le 2026-08-20 — voir
 * sources-registry.ts (id: 'synthese-b'). Première passe par lecture
 * directe du PDF (verifiedBy: 'auto'), à faire relire par un humain avant
 * publication définitive — voir docs/CONTENT_PIPELINE.md.
 */
const ref = (page: number, region: import('@/domain/region').Region = 'BE') => ({
  sourceId: 'synthese-b',
  page,
  region,
  language: 'fr' as const,
  verifiedAt: '2026-08-20',
  verifiedBy: 'auto',
})

export const SYNTHESE_B_FACTS: VerifiedFact[] = [
  { id: 'sb-mma-def', themeSlug: 'vehicule-technique', statement: 'La MMA (Masse Maximale Autorisée) est déterminée par le fabricant ; avec un permis B, elle ne peut excéder 3,5 tonnes (3500 kg).', reference: ref(2) },
  { id: 'sb-mec-def', themeSlug: 'vehicule-technique', statement: "La MEC (Masse En Charge) est le poids réel du véhicule à un instant donné : voiture + essence + conducteur + passagers + charge.", reference: ref(2) },
  { id: 'sb-remorque', themeSlug: 'vehicule-technique', statement: 'Une remorque est interdite avec un permis de conduire B provisoire ; avec un permis B définitif, elle est limitée à 750 kg.', reference: ref(5) },
  { id: 'sb-pneus-cloutes', themeSlug: 'vehicule-technique', statement: "Les pneus cloutés sont autorisés du 1er novembre au 31 mars, sur un véhicule d'une MMA n'excédant pas 3,5 tonnes, à 90 km/h max sur autoroute et 60 km/h max sur les autres routes.", reference: ref(5) },
  { id: 'sb-pneus-sous-gonfles', themeSlug: 'vehicule-technique', statement: "Des pneus sous-gonflés augmentent le risque de crevaison, réduisent la tenue de route, s'usent plus vite et augmentent la consommation.", reference: ref(5) },
  { id: 'sb-abs-esp', themeSlug: 'vehicule-technique', statement: "L'ABS empêche les roues de se bloquer au freinage (évite le dérapage) ; l'ESP (Electronic Stability Program) est un système électronique de stabilité.", reference: ref(6) },
  { id: 'sb-documents', themeSlug: 'vehicule-technique', statement: "Documents obligatoires : le conducteur porte la carte d'identité et le permis de conduire ; la voiture doit avoir son certificat d'immatriculation, l'attestation d'assurance, le certificat de conformité et, si nécessaire, le certificat de contrôle technique.", reference: ref(7) },
  { id: 'sb-accessoires', themeSlug: 'vehicule-technique', statement: "Accessoires obligatoires dans la voiture : triangle de danger, trousse de secours, extincteur, gilet de sécurité.", reference: ref(6) },

  { id: 'sb-feux-croisement', themeSlug: 'circulation-vitesse', statement: 'Les feux de croisement sont utilisés de la tombée au lever du jour, et de jour lorsque la visibilité est inférieure à 200 mètres (pluie, neige, brouillard).', reference: ref(3) },
  { id: 'sb-feux-route-interdit', themeSlug: 'circulation-vitesse', statement: "Les feux de route sont interdits quand vous croisez un usager en sens inverse, quand vous suivez un véhicule à moins de 50 m, ou quand un éclairage suffisant permet déjà de voir à 100 m.", reference: ref(3) },
  { id: 'sb-klaxon', themeSlug: 'circulation-vitesse', statement: "Le klaxon s'utilise en cas de danger imminent, de jour comme de nuit ; de jour, il peut aussi être utilisé lors d'un dépassement.", reference: ref(3) },
  { id: 'sb-vitesse-autoroute', themeSlug: 'circulation-vitesse', statement: 'Sur autoroute en Belgique : vitesse maximale 120 km/h, vitesse minimale 70 km/h.', reference: ref(7) },
  { id: 'sb-vitesse-route-auto-2x2', themeSlug: 'circulation-vitesse', statement: 'Route pour automobiles / route ordinaire à 2x2 voies séparées par une berme centrale : 120 km/h en Belgique.', reference: ref(7) },
  { id: 'sb-vitesse-route-auto-marquage', themeSlug: 'circulation-vitesse', statement: 'Route pour automobiles / route ordinaire à 2x voies séparées par un simple marquage (hors agglomération) : 70 km/h en Flandre, 90 km/h en Wallonie, 70 km/h à Bruxelles.', reference: ref(7) },
  { id: 'sb-vitesse-agglo', themeSlug: 'circulation-vitesse', statement: 'En agglomération : 50 km/h en Région flamande et en Région wallonne, 30 km/h en Région bruxelloise.', reference: ref(7) },
  { id: 'sb-vitesse-zones', themeSlug: 'circulation-vitesse', statement: 'Zone de rencontre : 20 km/h. Chemin réservé : 30 km/h. Abords d’école et zone cyclable : 30 km/h. Dispositif surélevé : 25 km/h maximum.', reference: ref(8) },

  { id: 'sb-agents-qualifies', themeSlug: 'signalisation-priorites', statement: "Bras levé verticalement : tout le monde doit s'arrêter. Bras écartés à l'horizontale : ceux qui arrivent de face/dos à l'agent doivent s'arrêter, ceux déjà engagés doivent quitter le carrefour. Les conducteurs dirigés vers la main de l'agent sont autorisés à continuer.", reference: ref(8) },
  { id: 'sb-feu-jaune-clignotant', themeSlug: 'signalisation-priorites', statement: "Un feu jaune-orange clignotant remplace parfois le feu vert : vous pouvez vous engager dans le carrefour en respectant les règles de priorité et en redoublant de prudence.", reference: ref(9) },
  { id: 'sb-priorite-droite-exceptions', themeSlug: 'signalisation-priorites', statement: "La priorité de droite ne s'applique pas dans un rond-point, ni si le conducteur venant de droite débouche d'un sens interdit. Exception inverse : en présence d'un trottoir ininterrompu ou d'un passage pour piétons, le conducteur venant de droite doit laisser passer les piétons.", reference: ref(9) },
  { id: 'sb-rails-priorite', themeSlug: 'signalisation-priorites', statement: 'Les véhicules sur rails (trams) ne sont pas tenus de respecter la priorité de droite.', reference: ref(10) },
  { id: 'sb-panneau-voie-prioritaire', themeSlug: 'signalisation-priorites', statement: "Le panneau « voie prioritaire » donne priorité aux carrefours suivants et autorise à dépasser par la gauche dans ces carrefours si la manœuvre est sûre.", reference: ref(10) },
  { id: 'sb-triangle-pointe-bas', themeSlug: 'signalisation-priorites', statement: "Un panneau triangulaire pointe en bas (« cédez le passage ») impose de céder le passage aux conducteurs (pas aux piétons) de la voie que vous allez emprunter, et de vous arrêter si nécessaire.", reference: ref(10) },

  { id: 'sb-arret-stationnement-def', themeSlug: 'stationnement', statement: "Un arrêt est une immobilisation limitée au temps nécessaire à l'embarquement/débarquement de personnes ou de choses ; au-delà, c'est un stationnement.", reference: ref(11) },
  { id: 'sb-stationnement-interdit-proximite', themeSlug: 'stationnement', statement: "Le stationnement (mais pas nécessairement l'arrêt bref) est interdit à moins de 5 m avant un passage pour piétons ou cyclistes, ainsi qu'à l'approche d'un sommet de côte ou dans un virage à visibilité insuffisante.", reference: ref(14) },
  { id: 'sb-arret-autorise', themeSlug: 'stationnement', statement: "Même là où le stationnement est interdit, l'arrêt reste autorisé à moins d'un mètre devant/derrière une voiture, et devant l'accès carrossable d'une propriété si la plaque d'immatriculation y est reproduite lisiblement.", reference: ref(14) },
  { id: 'sb-disque-stationnement', themeSlug: 'stationnement', statement: "Le stationnement à durée limitée impose l'affichage d'un disque de stationnement, réglé sur l'heure d'arrivée, pour une durée maximale de 2 heures sauf indication contraire.", reference: ref(17) },
  { id: 'sb-interdictions-diverses', themeSlug: 'stationnement', statement: "Il est interdit de mettre un véhicule en vente sur la voie publique. Un véhicule en panne peut y rester 24 heures maximum, un véhicule publicitaire 3 heures maximum.", reference: ref(17) },

  { id: 'sb-permis-provisoire-horaires', themeSlug: 'securite-comportement', statement: "Le permis de conduire provisoire interdit de circuler sur la voie publique de 22h00 à 6h00 les nuits de vendredi, samedi et dimanche, ainsi que la veille et le soir d'un jour férié.", reference: ref(2) },
  { id: 'sb-ceintures', themeSlug: 'securite-comportement', statement: "Chaque siège doit être équipé d'une ceinture de sécurité. Sont exemptés : un conducteur en marche arrière, un chauffeur de taxi transportant des clients, un facteur en tournée porte-à-porte, et les agents/services de secours en mission.", reference: ref(4) },
  { id: 'sb-enfants-retenue', themeSlug: 'securite-comportement', statement: "Les enfants de moins de 18 ans ET dont la taille est inférieure à 1m35 doivent voyager dans un dispositif de retenue pour enfants.", reference: ref(4) },
  { id: 'sb-triangle-accident', themeSlug: 'securite-comportement', statement: "Le triangle de danger se place à environ 100 m derrière le véhicule sur autoroute, contre environ 30 m sur route ordinaire.", reference: ref(11) },
  { id: 'sb-accident-blesses', themeSlug: 'securite-comportement', statement: "En cas d'accident avec blessés, la police doit se déplacer ; si elle ne vient pas, une déclaration doit être faite au bureau de police dans les 24 heures.", reference: ref(11) },
  { id: 'sb-alcool-table', themeSlug: 'securite-comportement', statement: "Test d'haleine : SAFE (moins de 0,22 mg/l) → conduite autorisée. ALARME (0,22 à 0,35 mg/l) → 12 heures d'attente. POSITIF (0,35 mg/l ou plus) → 15 jours sans conduire. Refus de souffler → 12 heures d'attente.", reference: ref(18) },
]
