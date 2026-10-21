import fs from 'node:fs';

const groups = new Map();

function answerText(question) {
  const choices = Array.isArray(question.choix) ? question.choix : [];
  const answer = String(question.reponse ?? '').trim();
  const letter = answer.match(/^[A-Z]$/i)?.[0]?.toUpperCase();
  if (!letter) return answer;

  const index = letter.charCodeAt(0) - 65;
  return choices[index] ?? answer;
}

function normalize(value) {
  return String(value ?? '')
    .toLocaleLowerCase('fr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/^[a-z][.)]\s*/i, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

for (let exam = 3; exam <= 14; exam += 1) {
  const questions = JSON.parse(
    fs.readFileSync(new URL(`../data/examens-blancs/examen-${exam}.json`, import.meta.url), 'utf8'),
  );

  questions.forEach((question, index) => {
    const key = question.question.toLocaleLowerCase('fr').replace(/\s+/g, ' ').trim();
    const occurrences = groups.get(key) ?? [];
    const selectedChoice = answerText(question);
    occurrences.push({
      exam,
      question: index + 1,
      answer: question.reponse,
      selectedChoice,
      normalizedChoice: normalize(selectedChoice),
      image: question.image,
    });
    groups.set(key, occurrences);
  });
}

let contradictoryGroups = 0;

for (const [wording, occurrences] of groups) {
  if (occurrences.length > 1 && new Set(occurrences.map(({ normalizedChoice }) => normalizedChoice)).size > 1) {
    contradictoryGroups += 1;
    console.log(wording);
    console.log(JSON.stringify(occurrences));
  }
}

if (contradictoryGroups === 0) {
  console.log('Aucune contradiction textuelle détectée entre les questions strictement identiques.');
}
