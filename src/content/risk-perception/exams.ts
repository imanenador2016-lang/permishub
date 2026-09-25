import type { RiskExam, PerceptionRisk, PlaybackSequence, RiskSequence } from '@/domain/risk-perception'
import { validateExam } from '@/lib/risk-perception/validation'
const videoSrc = '/videos/tpr/anderlecht-01.mp4'
const risk = (id:string,label:string,sourceTimestamp:number,activeFrom:number,activeUntil:number,boxes:[number,number,number,number][]):PerceptionRisk => ({id,calibrated:false,sourceTimestamp,label:{fr:label,nl:label},explanation:{fr:`Risque identifié dans la séquence Anderlecht (${sourceTimestamp.toFixed(0)} s).`,nl:`Risico geïdentificeerd in de Anderlecht-sequentie (${sourceTimestamp.toFixed(0)} s).`},activeFrom,activeUntil,hitboxes:boxes.map((b,i)=>({time:activeFrom+((activeUntil-activeFrom)*i)/Math.max(1,boxes.length-1),x:b[0],y:b[1],width:b[2],height:b[3]}))})
const sequences:RiskSequence[]=[
{id:'anderlecht-01-pedestrian',videoSrc,startTime:440,endTime:452,risks:[risk('r1-pedestrian','Piéton',448,443,452,[[.350,.575,.060,.170],[.395,.600,.060,.180],[.430,.615,.065,.185]])]},
{id:'anderlecht-02-traffic',videoSrc,startTime:505,endTime:528,risks:[risk('r2-white-car','Voiture blanche',512,509.5,516.5,[[.28,.38,.24,.20],[.36,.39,.25,.20]]),risk('r3-black-car','Voiture noire',520,516.5,524.5,[[.62,.34,.22,.20],[.55,.36,.24,.20]])]},
{id:'anderlecht-03-oncoming',videoSrc,startTime:527,endTime:545,risks:[risk('r4-oncoming-car','Voiture venant en face',534,530.5,538.5,[[.40,.32,.22,.20],[.45,.34,.24,.20]])]},
{id:'anderlecht-04-van',videoSrc,startTime:548,endTime:570,risks:[risk('r5-white-van','Camionnette blanche',555,551.5,560.5,[[.16,.35,.30,.24],[.24,.36,.30,.24]])]},
{id:'anderlecht-05-parking',videoSrc,startTime:610,endTime:635,risks:[risk('r6-parking-car','Voiture qui veut quitter son stationnement',622,617.5,626.5,[[.60,.38,.25,.20],[.52,.39,.27,.20]])]},
{id:'anderlecht-06-bus-stop',videoSrc,startTime:655,endTime:680,risks:[risk('r7-bus-stop-pedestrian','Piéton sur le trottoir près de l’arrêt de bus',663,659.5,667.5,[[.18,.30,.14,.28],[.25,.32,.14,.28]]),risk('r8-black-car','Voiture noire',669,665.5,673.5,[[.62,.36,.25,.20],[.55,.38,.26,.20]])]},
{id:'anderlecht-07-left',videoSrc,startTime:995,endTime:1020,risks:[risk('r9-black-car-left','Voiture noire à gauche',1010,1005.5,1015.5,[[.06,.35,.24,.22],[.16,.36,.24,.22]])]},
{id:'anderlecht-08-intersection',videoSrc,startTime:1060,endTime:1100,risks:[risk('r10-white-van-intersection','Camionnette blanche à l’intersection',1075,1069.5,1083.5,[[.42,.28,.28,.24],[.50,.32,.28,.24]])]},
]
const exam:RiskExam={schemaVersion:1,id:'tpr-test-1',version:2,status:'demo',title:{fr:'Test 1 — Perception des risques',nl:'Test 1 — Risicoperceptie'},sequences}
validateExam(exam)
export const RISK_EXAMS:readonly RiskExam[]=[exam]
export function getRiskExam(id:string):RiskExam|undefined{return RISK_EXAMS.find(exam=>exam.id===id)}
export function playbackSequence(sequence:RiskSequence):PlaybackSequence{const{id,videoSrc,startTime,endTime}=sequence;return{id,videoSrc,startTime,endTime}}





