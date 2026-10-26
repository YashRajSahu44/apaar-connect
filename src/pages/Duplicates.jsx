import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { mask } from '../utils/validation'
const KEYS=[['Student ID','id'],['Name','name'],['APAAR','apaar'],['Institution','instId'],['Programme','programme'],['Year','year']]
export default function Duplicates(){const {students,cases,setCases,log}=useApp();const [open,setOpen]=useState(null)
 const by={};students.forEach(s=>{if(s.apaar)(by[s.apaar]=by[s.apaar]||[]).push(s)})
 const list=Object.values(by).filter(g=>g.length>1).map((g,i)=>({id:`DUP-${String(i+1).padStart(3,'0')}`,a:g[0],b:g[1],type:'Matching APAAR ID',conf:g[0].instId!==g[1].instId?'High (cross-institution)':'High'}))
 const act=(c,s)=>{setCases({...cases,[c.id]:s});log('Duplicate case: '+s,c.id,'Duplicate Detection')}
 const o=list.find(c=>c.id===open)
 return <div className="space-y-4"><h1 className="text-xl font-semibold">Duplicate Detection</h1><p className="text-sm text-mute">Candidates only. Matching data is not conclusive; records are never merged or deleted automatically, and cross-institution cases require authorised verification and human review.</p>
  <div className="card"><table className="w-full"><thead><tr>{['Case','Record A','Record B','Match type','Confidence','Review status',''].map(h=><th key={h} className="th">{h}</th>)}</tr></thead><tbody>
   {list.map(c=><tr key={c.id}><td className="td">{c.id}</td><td className="td">{c.a.id}</td><td className="td">{c.b.id}</td><td className="td">{c.type}</td><td className="td">{c.conf}</td><td className="td">{cases[c.id]||'Pending'}</td><td className="td"><button className="btn-o" onClick={()=>setOpen(c.id)}>Open</button></td></tr>)}
   {!list.length&&<tr><td className="td" colSpan={7}>No candidates.</td></tr>}</tbody></table></div>
  {o&&<div className="card p-4 space-y-3"><h2 className="font-semibold">{o.id} — side-by-side</h2><div className="grid grid-cols-2 gap-3 text-sm">
   {[o.a,o.b].map(s=><div key={s.id} className="border border-line rounded p-3 space-y-1">{KEYS.map(([l,k])=><div key={k} className={o.a[k]===o.b[k]?'text-ok':'text-err'}><span className="text-mute">{l}: </span>{k==='apaar'?mask(s[k]):s[k]}</div>)}</div>)}</div>
   <p className="text-xs text-mute">Green = matching, red = conflicting.</p>
   <div className="flex gap-2 flex-wrap">{['Marked as Reviewed','Confirmed Duplicate','Marked as Distinct Records','Further Verification Requested'].map(a=><button key={a} className="btn-o" onClick={()=>confirm(a+'?')&&act(o,a)}>{a}</button>)}</div></div>}</div>}
