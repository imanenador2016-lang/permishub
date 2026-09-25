'use client'
import {useEffect,useRef,useState} from 'react'
import {RISK_EXAMS} from '@/content/risk-perception/exams'
import '../tpr.css'
type Box={x:number;y:number;width:number;height:number}
export default function Builder(){const exam=RISK_EXAMS[0], [ri,setRi]=useState(7), seq=exam.sequences[ri], [riskIndex,setRiskIndex]=useState(0), risk=seq.risks[riskIndex], video=useRef<HTMLVideoElement>(null), [drawing,setDrawing]=useState(false),[start,setStart]=useState<{x:number;y:number}>(),[box,setBox]=useState<Box>(),[time,setTime]=useState(seq.startTime);useEffect(()=>{if(video.current){video.current.currentTime=seq.startTime;video.current.pause()}const all=JSON.parse(localStorage.getItem('tpr-builder-boxes')||'{}');setBox(all[seq.id+':'+risk.id]?.box)},[seq.id,risk.id]);const point=(e:React.PointerEvent)=>{const r=video.current?.getBoundingClientRect();return r?{x:(e.clientX-r.left)/r.width,y:(e.clientY-r.top)/r.height}:null};return <main className="tpr-page"><section className="tpr-app"><h1>Builder â€” sÃ©quence {ri+1}</h1><select value={ri} onChange={e=>{setRi(+e.target.value);setRiskIndex(0);setBox(undefined)}}>{exam.sequences.map((s,i)=><option value={i} key={s.id}>SÃ©quence {i+1} â€” {s.risks.map(r=>r.label.fr).join(', ')}</option>)}</select>{seq.risks.length>1&&<select value={riskIndex} onChange={e=>{setRiskIndex(+e.target.value);setBox(undefined)}}>{seq.risks.map((r,i)=><option value={i} key={r.id}>Risque {i+1} — {r.label.fr}</option>)}</select>}<div className="tpr-video-frame" onPointerDown={e=>{const p=point(e);if(drawing&&p)setStart(p)}} onPointerMove={e=>{if(!start)return;const p=point(e);if(p)setBox({x:Math.min(start.x,p.x),y:Math.min(start.y,p.y),width:Math.abs(p.x-start.x),height:Math.abs(p.y-start.y)})}} onPointerUp={()=>{setStart(undefined);setDrawing(false)}}><video ref={video} src={seq.videoSrc} controls={!drawing} onTimeUpdate={e=>setTime(e.currentTarget.currentTime)} style={{pointerEvents:drawing?'none':'auto'}}/>{box&&<div className="tpr-hitbox" style={{left:`${box.x*100}%`,top:`${box.y*100}%`,width:`${box.width*100}%`,height:`${box.height*100}%`,borderColor:'#39c878'}}/>}</div><p>Temps : {time.toFixed(3)} s</p><button onClick={()=>{video.current?.pause();setDrawing(true)}}>PLACER LA ZONE DE CLIC</button><button disabled={!box} onClick={()=>{if(box){const all=JSON.parse(localStorage.getItem('tpr-builder-boxes')||'{}');all[seq.id+":"+risk.id]={box,time};localStorage.setItem('tpr-builder-boxes',JSON.stringify(all));}}}>ENREGISTRER LA ZONE</button><button onClick={()=>{if(video.current)video.current.currentTime+=.5}}>+0.5 s</button><button onClick={()=>video.current?.pause()}>PAUSE</button><p>La zone est enregistrÃ©e visuellement pour la sÃ©quence sÃ©lectionnÃ©e.</p></section></main>}












