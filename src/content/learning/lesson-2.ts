import type { LearningLesson } from './types'

export const LESSON_2: LearningLesson = {
  id: 'les-feux-de-circulation', moduleId: 'signalisation', title: 'Les feux de circulation', description: 'Savoir quoi faire devant un feu rouge, vert, orange fixe ou orange clignotant.', xp: 20,
  steps: [
    { type: 'scenario', title: 'Tu connais vraiment les feux ?', body: 'Ça paraît facile : 🔴 = stop, 🟢 = passe. Mais à l’examen, le piège se trouve souvent dans la situation autour du feu. Illustration : feu vert + carrefour bloqué.', question: 'Le feu est vert mais le carrefour devant toi est complètement bouché. Que fais-tu ?', options: ["Je m’engage puisque le feu est vert", 'J’attends que le carrefour se libère', "Je klaxonne et j’avance"], correct: 1, explanation: 'Le feu vert t’autorise à t’engager uniquement si le carrefour est dégagé.' },
    { type: 'text', title: '🔴 Le feu rouge', body: 'Rouge = ARRÊT. Lorsqu’un feu est rouge, tu dois t’arrêter devant la ligne d’arrêt blanche. Illustration : voiture arrêtée avant la ligne blanche face à un feu rouge.', callout: '🔴 ROUGE → ARRÊT' },
    { type: 'compare', title: '🟢 Le feu vert', body: 'Vert = tu peux passer… mais pas aveuglément. Illustration : feu vert, carrefour libre VS carrefour encombré.', items: [{ label: '🟢 Carrefour libre', result: '→ Tu peux t’engager' }, { label: '🟢 Carrefour bloqué', result: '→ Tu attends' }] },
    { type: 'text', title: '🟠 L’orange fixe', body: 'Si tu peux encore t’arrêter dans des conditions de sécurité suffisantes, arrête-toi. Si tu es tellement proche qu’un arrêt sûr n’est plus possible, continue.', callout: '🧠 Orange ne veut pas dire : accélère avant le rouge.' },
    { type: 'scenario', title: 'Le piège de l’orange', body: 'La voiture est très proche de la ligne lorsque le feu passe à l’orange. Un arrêt suffisamment sûr n’est plus possible. Illustration : voiture très proche de la ligne.', question: 'Que fais-tu ?', options: ['Je freine brutalement quoi qu’il arrive', 'Je continue', 'Je fais marche arrière'], correct: 1, explanation: 'Lorsque tu ne peux plus t’arrêter en sécurité, tu peux poursuivre.' },
    { type: 'compare', title: '🟠 Orange fixe ≠ orange clignotant', body: 'Ces deux signaux ne donnent pas la même consigne.', items: [{ label: 'ORANGE FIXE', result: 'Arrêt si possible en sécurité' }, { label: 'ORANGE CLIGNOTANT', result: 'Prudence + respect des priorités' }] },
    { type: 'text', title: '🔓 Prochaine leçon', body: 'Maintenant que tu maîtrises les feux classiques, tu découvriras les cas particuliers et les flèches.', callout: 'Feux particuliers & flèches — bientôt disponible' },
    { type: 'scenario', title: 'Rappel Leçon 1', body: '🟢 Feu vert + 👮 agent face au conducteur. Illustration : carrefour avec feu vert et agent face au conducteur.', question: 'Que fais-tu ?', options: ['Je passe', "Je m’arrête"], correct: 1, explanation: 'Agent > Feu.' },
    { type: 'summary', title: 'À retenir', items: ['🔴 Rouge → arrêt', '🟢 Vert → passage autorisé si le carrefour est dégagé', '🟠 Orange fixe → arrêt sauf si l’arrêt sûr est impossible', '🟠 Orange clignotant → prudence + respect des priorités'] },
  ],
  quiz: [
    { question: 'Le feu est vert mais le carrefour est bloqué.', options: ['Je m’engage', 'J’attends', 'Je klaxonne'], correct: 1, explanation: 'Le feu vert ne t’autorise pas à bloquer le carrefour.' },
    { question: 'Le feu passe à l’orange alors que tu peux encore t’arrêter normalement et en sécurité.', options: ['J’accélère', 'Je m’arrête', 'Je continue toujours'], correct: 1, explanation: 'Orange fixe = arrêt si tu peux le faire en sécurité.' },
    { question: 'Le feu passe à l’orange alors que tu es extrêmement proche.', options: ['Je freine brutalement', 'Je continue', 'Je m’arrête dans le carrefour'], correct: 1, explanation: 'Si l’arrêt sûr est impossible, tu peux poursuivre.' },
    { question: 'Tu rencontres un feu orange clignotant.', options: ['Je le traite toujours comme un feu rouge', 'Je continue avec prudence en respectant les priorités', 'J’ai automatiquement priorité'], correct: 1, explanation: 'Orange clignotant = prudence et règles de priorité.' },
    { question: 'Ton feu est vert mais un agent te présente son dos.', options: ['Je suis le feu vert', "Je m’arrête", 'J’applique la priorité de droite'], correct: 1, explanation: 'Agent > Feu.' },
  ],
}
