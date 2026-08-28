import type { Lesson } from '@/domain/content'

const L28: Lesson = {
  slug: 'alcool-et-drogues',
  themeSlug: 'securite-comportement',
  title: { fr: 'Alcool et drogues au volant', nl: 'Alcohol en drugs achter het stuur' },
  intro: { fr: "Un contrôle d'alcoolémie suit une procédure précise, avec des seuils qui changent tout — de l'avertissement au retrait immédiat du permis.", nl: 'Een alcoholcontrole volgt een precieze procedure, met drempels die alles veranderen — van waarschuwing tot onmiddellijke intrekking van het rijbewijs.' },
  objectives: [
    { fr: 'Savoir qui peut être contrôlé, et dans quels cas', nl: 'Weten wie gecontroleerd kan worden, en in welke gevallen' },
    { fr: 'Connaître les seuils S/A/P et leurs conséquences', nl: 'De drempels S/A/P en hun gevolgen kennen' },
    { fr: 'Comprendre l’éthylotest antidémarrage et le dépistage de drogues', nl: 'Het alcoholslot en de drugstest begrijpen' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'sc28-c1-controle',
      title: { fr: 'Qui peut être contrôlé, et pourquoi refuser coûte cher', nl: 'Wie kan gecontroleerd worden, en waarom weigeren duur uitvalt' },
      paragraphs: [
        {
          fr: "Toute personne qui conduit ou s'apprête à conduire — voiture, mais aussi vélo ou cheval — peut être soumise à un contrôle d'alcoolémie, tout comme l'auteur présumé d'un accident. Un simple passager ou une personne qui dort ailleurs qu'au volant ne l'est pas. Refuser le test sans motif légitime est en soi punissable.",
          nl: 'Iedereen die rijdt of op het punt staat te rijden — auto, maar ook fiets of paard — kan aan een ademtest onderworpen worden, net als de vermoedelijke veroorzaker van een ongeval. Een gewone passagier of iemand die elders dan achter het stuur slaapt, niet. Weigeren zonder wettige reden is op zich strafbaar.',
        },
      ],
      factIds: ['sc28-qui-controle'],
      miniQuizQuestionIds: ['sc28-q1'],
    },
    {
      id: 'sc28-c2-test-sanctions',
      title: { fr: 'Le test d’haleine, étape par étape', nl: 'De ademtest, stap voor stap' },
      paragraphs: [
        {
          fr: "Le test rapide donne trois résultats : « S » (sûr, sous 0,22 mg/l — tu repars), « A » (alarme, 0,22 à 0,35 mg/l) ou « P » (positif, dès 0,35 mg/l). Les deux derniers déclenchent une analyse précise. Refuser équivaut à un « P » et interdit de conduire six heures.",
          nl: 'De snelle test geeft drie resultaten: "S" (veilig, onder 0,22 mg/l — u vertrekt gewoon), "A" (alarm, 0,22 tot 0,35 mg/l) of "P" (positief, vanaf 0,35 mg/l). De twee laatste leiden tot een precieze analyse. Weigeren staat gelijk aan een "P" en verbiedt u zes uur te rijden.',
        },
        {
          fr: "L'analyse confirme ensuite les sanctions : sous 0,22 mg/l, tu conduis normalement. Entre 0,22 et 0,35 mg/l, retrait du permis 3 heures plus amende. Dès 0,35 mg/l, retrait légal de 6 heures — mais en pratique les parquets retirent le permis 15 jours, devenu la norme actuelle.",
          nl: 'De analyse bevestigt vervolgens de sancties: onder 0,22 mg/l rijdt u gewoon verder. Tussen 0,22 en 0,35 mg/l: intrekking van het rijbewijs voor 3 uur plus boete. Vanaf 0,35 mg/l: wettelijke intrekking van 6 uur — maar in de praktijk trekt het parket het rijbewijs 15 dagen in, wat de huidige norm is geworden.',
        },
      ],
      callouts: [
        {
          kind: 'attention',
          text: { fr: "Retiens surtout l'ordre de grandeur : 0,22 et 0,35 mg/l sont les deux seuils qui changent la sanction. Les 15 jours de retrait pratiqués par les parquets ne remplacent pas légalement les 6 heures, mais sont la réalité du terrain.", nl: 'Onthoud vooral de grootteorde: 0,22 en 0,35 mg/l zijn de twee drempels die de sanctie veranderen. De 15 dagen intrekking die het parket toepast, vervangen de wettelijke 6 uur niet, maar zijn wel de realiteit op het terrein.' },
        },
      ],
      factIds: ['sc28-test-haleine', 'sc28-analyse-sanctions'],
      miniQuizQuestionIds: ['sc28-q2', 'sc28-q3'],
    },
    {
      id: 'sc28-c3-antidemarrage-drogues',
      title: { fr: 'Éthylotest antidémarrage et drogues', nl: 'Alcoholslot en drugs' },
      paragraphs: [
        {
          fr: "Un juge peut imposer un éthylotest antidémarrage (1 à 3 ans, voire à vie) dès 0,8 ‰ ou en cas de récidive ; il devient obligatoire à partir de 1,8 ‰ (sauf décision motivée contraire), ou pour un récidiviste grave contrôlé deux fois à 1,2 ‰ ou plus en 3 ans.",
          nl: 'Een rechter kan een alcoholslot opleggen (1 tot 3 jaar, of levenslang) vanaf 0,8 ‰ of bij recidive; het wordt verplicht vanaf 1,8 ‰ (behoudens andersluidende gemotiveerde beslissing), of voor een zware recidivist die twee keer op 1,2 ‰ of meer werd betrapt binnen 3 jaar.',
        },
        {
          fr: "Pour les drogues, un test salivaire n'est imposé que sur soupçon objectif — ou automatiquement en cas d'accident. Un résultat positif entraîne un retrait du permis de 12 heures (voire immédiat) et expose à une interdiction de conduire pouvant aller jusqu'à 5 ans.",
          nl: 'Voor drugs wordt een speekseltest enkel opgelegd bij objectief vermoeden — of automatisch bij een ongeval. Een positief resultaat leidt tot een intrekking van het rijbewijs van 12 uur (of onmiddellijk) en kan een rijverbod tot 5 jaar met zich meebrengen.',
        },
      ],
      factIds: ['sc28-antidemarrage', 'sc28-drogues'],
      miniQuizQuestionIds: ['sc28-q4', 'sc28-q5'],
    },
  ],
  summary: {
    fr: "Contrôle réservé aux conducteurs (et auteurs présumés d'accident). Test d'haleine : S / A / P selon 0,22 et 0,35 mg/l — refuser vaut « P ». Antidémarrage : possible dès 0,8 ‰, obligatoire dès 1,8 ‰. Drogues : test salivaire sur soupçon ou accident, jusqu'à 5 ans d'interdiction en cas de positif.",
    nl: 'Controle voorbehouden aan bestuurders (en vermoedelijke veroorzakers van een ongeval). Ademtest: S / A / P volgens 0,22 en 0,35 mg/l — weigeren telt als "P". Alcoholslot: mogelijk vanaf 0,8 ‰, verplicht vanaf 1,8 ‰. Drugs: speekseltest bij vermoeden of ongeval, tot 5 jaar rijverbod bij positief resultaat.',
  },
}

const L29: Lesson = {
  slug: 'accident',
  themeSlug: 'securite-comportement',
  title: { fr: 'En cas d’accident', nl: 'Bij een ongeval' },
  intro: { fr: "Constat à remplir, gestes à éviter, police à appeler ou non : ce qu'il faut vraiment faire dans les premières minutes après un accident.", nl: 'Aanrijdingsformulier invullen, gebaren te vermijden, politie bellen of niet: wat u écht moet doen in de eerste minuten na een ongeval.' },
  objectives: [
    { fr: 'Savoir quand appeler la police', nl: 'Weten wanneer u de politie moet bellen' },
    { fr: 'Remplir correctement le constat européen d’accident', nl: 'Het Europees aanrijdingsformulier correct invullen' },
    { fr: 'Connaître les bons réflexes envers un blessé, et le délit de fuite', nl: 'De juiste reflexen tegenover een gewonde kennen, en het vluchtmisdrijf' },
  ],
  estimatedMinutes: 6,
  chapters: [
    {
      id: 'sc29-c1-sans-blesses',
      title: { fr: 'Accident sans blessé : la police est-elle nécessaire ?', nl: 'Ongeval zonder gewonden: is de politie nodig?' },
      paragraphs: [
        {
          fr: "Sans blessé, appeler la police n'est pas obligatoire si les parties remplissent et signent le constat européen d'accident — mais un désaccord ou un doute (documents en ordre, état du conducteur) justifie de le faire quand même. Place le triangle de danger à 30 m sur route ordinaire, 100 m sur autoroute.",
          nl: 'Zonder gewonden is de politie bellen niet verplicht als de partijen het Europees aanrijdingsformulier invullen en ondertekenen — maar onenigheid of twijfel (documenten in orde, toestand van de bestuurder) rechtvaardigt het toch te doen. Plaats de gevarendriehoek op 30 m op een gewone weg, 100 m op de autosnelweg.',
        },
        {
          fr: "La face avant du constat doit être remplie et signée par les deux parties avant de quitter les lieux — une fois signée, plus rien ne peut y être changé, d'où l'intérêt de bien la relire. La face arrière peut être complétée plus tard. Toute personne impliquée doit rester sur place et présenter sa carte d'identité si demandé (dès 15 ans).",
          nl: 'De voorzijde van het formulier moet ingevuld en door beide partijen ondertekend zijn vóór het verlaten van de plaats — eens ondertekend, kan er niets meer aan veranderd worden, vandaar het belang om ze goed te herlezen. De achterzijde kan later ingevuld worden. Elke betrokkene moet ter plaatse blijven en zijn identiteitskaart tonen indien gevraagd (vanaf 15 jaar).',
        },
      ],
      factIds: ['sc29-sans-blesses', 'sc29-constat'],
      miniQuizQuestionIds: ['sc29-q1', 'sc29-q2'],
    },
    {
      id: 'sc29-c2-avec-blesses',
      title: { fr: 'Accident avec blessés : les bons réflexes', nl: 'Ongeval met gewonden: de juiste reflexen' },
      paragraphs: [
        {
          fr: "Avec des blessés, la police doit toujours intervenir. Le gilet de sécurité est obligatoire pour le conducteur qui quitte son véhicule sur autoroute ou route pour automobiles (et vivement conseillé ailleurs).",
          nl: 'Met gewonden moet de politie altijd tussenkomen. Het veiligheidshesje is verplicht voor de bestuurder die zijn voertuig verlaat op de autosnelweg of autoweg (en sterk aangeraden elders).',
        },
        {
          fr: "Ne déplace jamais une victime inutilement (sauf risque d'incendie), ne retire pas un casque (sauf difficulté respiratoire), ne lui donne rien à boire ou manger. En cas d'hémorragie forte, couvre la plaie d'un tissu propre — ne fais jamais de garrot au-dessus.",
          nl: 'Verplaats een slachtoffer nooit onnodig (tenzij brandgevaar), verwijder geen helm (tenzij ademhalingsmoeilijkheden), geef niets te drinken of te eten. Bij hevige bloeding bedek je de wonde met een schone doek — leg nooit een knevelverband erboven.',
        },
      ],
      factIds: ['sc29-avec-blesses', 'sc29-blesses-gestes'],
      miniQuizQuestionIds: ['sc29-q3', 'sc29-q4'],
    },
    {
      id: 'sc29-c3-delit-fuite',
      title: { fr: 'Le délit de fuite', nl: 'Vluchtmisdrijf' },
      paragraphs: [
        {
          fr: "Quitter volontairement les lieux d'un accident qu'on a causé ou pu causer — en le sachant ou en le soupçonnant — pour échapper aux constatations constitue un délit de fuite, sévèrement puni. Le doute sur sa propre responsabilité n'excuse jamais la fuite.",
          nl: 'Vrijwillig de plaats van een ongeval verlaten dat u veroorzaakt hebt of kon veroorzaakt hebben — terwijl u dit weet of vermoedt — om de vaststellingen te ontlopen, is vluchtmisdrijf, streng bestraft. Twijfel over uw eigen aansprakelijkheid verontschuldigt de vlucht nooit.',
        },
      ],
      callouts: [
        {
          kind: 'retenir',
          text: { fr: "En cas de doute après un accident (même léger), reste sur place ou contacte la police plutôt que de partir — l'incertitude ne protège pas juridiquement.", nl: 'Bij twijfel na een ongeval (zelfs licht), blijf ter plaatse of contacteer de politie in plaats van te vertrekken — onzekerheid biedt geen juridische bescherming.' },
        },
      ],
      factIds: ['sc29-delit-fuite'],
      miniQuizQuestionIds: ['sc29-q5'],
    },
  ],
  summary: {
    fr: "Sans blessé : constat signé suffit, sauf désaccord/doute. Avec blessés : police obligatoire, gilet sur autoroute, gestes prudents (ne pas déplacer, ne pas retirer un casque, rien à boire). Quitter les lieux en cas de doute sur sa responsabilité reste un délit de fuite.",
    nl: 'Zonder gewonden: ondertekend formulier volstaat, tenzij onenigheid/twijfel. Met gewonden: politie verplicht, hesje op autosnelweg, voorzichtige gebaren (niet verplaatsen, geen helm afzetten, niets te drinken geven). De plaats verlaten bij twijfel over aansprakelijkheid blijft vluchtmisdrijf.',
  },
}

export const SECURITE_COMPORTEMENT_LESSONS: Lesson[] = [L28, L29]
