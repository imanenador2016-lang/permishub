import type { LearningLesson } from './types'

export const LESSON_42: LearningLesson = {
  id: 'constat-police-et-assurance', moduleId: 'safety-behaviour', title: 'Constat, police & assurance',
  description: 'Savoir quoi faire selon qu’il y a ou non des blessés.', xp: 25,
  steps: [
    { type: 'scenario', visualId: 'M6_MINOR_ACCIDENT_01', title: 'Dégâts matériels uniquement', body: 'Personne n’est blessé, les documents sont en ordre et les conducteurs peuvent remplir un constat.', question: 'L’appel à la police est-il toujours obligatoire ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Pour un accident matériel sans blessé, les parties peuvent remplir le constat européen.' },
    { type: 'scenario', visualId: 'M6_INJURY_112_01', title: 'Une personne est blessée', body: 'Après le choc, une personne se plaint de douleurs.', question: 'Que faut-il faire ?', options: ['Appeler le 112 et la police', 'Remplir uniquement le constat et partir'], correct: 0, explanation: 'Avec des blessés, il faut appeler les secours et la police.' },
    { type: 'scenario', visualId: 'M6_CONSTAT_FRONT_01', title: 'Le recto du constat', body: 'Les deux conducteurs ont complété et signé le recto.', question: 'Peut-on encore le modifier unilatéralement ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le recto signé devient définitif. Il faut le relire avant de signer.' },
    { type: 'text', visualId: 'M6_CONSTAT_FRONT_01', title: 'Signer ne veut pas dire reconnaître sa faute', body: 'Le constat décrit les faits et les circonstances. Les assureurs et, si nécessaire, les autorités déterminent ensuite les responsabilités.', callout: 'DÉCRIS LES FAITS, NE DÉCIDE PAS TOI-MÊME DU RESPONSABLE.' },
    { type: 'scenario', visualId: 'M6_PHOTOS_CLEAR_ROAD_01', title: 'Libérer la chaussée', body: 'Il n’y a pas de blessé et les voitures peuvent rouler. La position a été photographiée.', question: 'Faut-il dégager la circulation sans tarder ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Après avoir conservé les éléments utiles, les véhicules roulants doivent être rangés pour sécuriser la circulation.' },
    { type: 'scenario', visualId: 'M6_MINOR_ACCIDENT_01', title: 'Documents manquants ou situation douteuse', body: 'L’autre conducteur ne peut pas présenter les documents nécessaires ou semble sous influence.', question: 'Faut-il demander l’intervention de la police ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Une situation douteuse, des documents manquants ou un soupçon d’influence justifient d’appeler la police.' },
    { type: 'summary', title: 'À retenir', items: ['Sans blessé : le constat européen peut suffire.', 'Avec blessé ou dégâts importants : appelle les services compétents.', 'Relis le recto avant de signer.', 'Ne modifie jamais seul un recto déjà signé.', 'Préviens rapidement ton assurance et conserve les preuves utiles.'] },
  ],
  quiz: [
    { question: 'Sans blessé et avec accord, le constat peut-il suffire ?', options: ['Oui', 'Non'], correct: 0, explanation: 'La police n’est pas systématiquement nécessaire dans ce cas.' },
    { question: 'Avec un blessé, faut-il appeler les secours ?', options: ['Oui', 'Non'], correct: 0, explanation: 'Le 112 doit être alerté.' },
    { question: 'Peut-on modifier seul le recto après signature ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le recto signé est définitif.' },
    { question: 'Signer le constat signifie-t-il automatiquement reconnaître sa responsabilité ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Le constat rapporte d’abord les circonstances.' },
    { question: 'Sans blessé, faut-il laisser inutilement des véhicules roulants au milieu de la chaussée ?', options: ['Oui', 'Non'], correct: 1, explanation: 'Après les photos utiles, il faut dégager les voies.' },
  ], nextLessonLabel: 'Suivant : porter secours →',
}
