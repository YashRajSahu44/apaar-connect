import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { institutions } from '../data/mock'
const Qr=({seed})=>{let h=[...seed].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);const cells=[];for(let i=0;i<121;i++){h=(h*1103515245+12345)>>>0;cells.push((h>>16)&1)}
 return <svg viewBox="0 0 11 11" width="110" aria-label="QR-style demo reference">{cells.map((c,i)=>c?<rect key={i} x={i%11} y={Math.floor(i/11)} width="1" height="1"/>:null)}</svg>}
export default function Verification(){const {students,log}=useApp();const [f,setF]=useState({sid:'',purpose:'Employment verification',org:'',consent:false});const [r,setR]=useState(null)
 const run=e=>{e.preventDefault();const s=students.find(x=>x.id===f.sid.trim());const ref='VR-'+Date.now().toString(36).toUpperCase()
  const outcome=!s?'Record Not Found':!f.consent?'Consent Required':'Record Verified'
  setR({ref,ts:new Date().toLocaleString(),outcome,s});log('Verification completed',ref,'Verification',outcome==='Record Verified'?'Success':'Blocked',f.purpose)}
 return <div className="space-y-4 max-w-2xl"><h1 className="text-xl font-semibold noprint">Authorised Verification Portal</h1>
  <form onSubmit={run} className="card p-5 space-y-3 noprint"><label className="block text-sm">Student ID (e.g. STU-0001)<input required className="inp mt-1" value={f.sid} onChange={e=>setF({...f,sid:e.target.value})}/></label>
   <label className="block text-sm">Requesting organisation<input required className="inp mt-1" value={f.org} onChange={e=>setF({...f,org:e.target.value})}/></label>
   <label className="block text-sm">Purpose<select className="inp mt-1" value={f.purpose} onChange={e=>setF({...f,purpose:e.target.value})}><option>Employment verification</option><option>Regulatory review</option><option>Admission verification</option></select></label>
   <label className="flex gap-2 text-sm"><input type="checkbox" checked={f.consent} onChange={e=>setF({...f,consent:e.target.checked})}/>Student consent has been obtained</label><button className="btn">Run Simulated Verification</button><p className="text-xs text-mute">No unrestricted search is offered. Real verification needs a secure backend and approved data sources.</p></form>
  {r&&<div className="card p-5 space-y-2"><div className="font-semibold">DEMONSTRATION VERIFICATION RECEIPT</div><div className="text-sm">Reference: {r.ref}<br/>Timestamp: {r.ts}<br/>Outcome: <b>{r.outcome}</b></div>
   {r.outcome==='Record Verified'&&<div className="text-sm">Institution: {institutions.find(i=>i.id===r.s.instId).name}<br/>Programme: {r.s.programme}<br/>Academic year: {r.s.year}<br/>Status: {r.s.status}</div>}
   <Qr seed={r.ref}/><p className="text-xs text-mute">Illustrative code only: contains no student data and does not prove identity authenticity. Not an official certificate or digitally signed credential.</p><button className="btn noprint" onClick={()=>window.print()}>Print Receipt</button></div>}</div>}
