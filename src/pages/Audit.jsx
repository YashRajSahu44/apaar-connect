import { useState } from 'react'
import { useApp } from '../context/AppContext'
export default function Audit(){const {audit}=useApp();const [q,setQ]=useState('')
 const rows=audit.filter(a=>JSON.stringify(a).toLowerCase().includes(q.toLowerCase()))
 return <div className="space-y-4"><h1 className="text-xl font-semibold">Audit Trail <span className="text-xs text-mute">(read-only UI simulation)</span></h1><input className="inp max-w-xs" placeholder="Search log" aria-label="Search log" value={q} onChange={e=>setQ(e.target.value)}/>
  <div className="card overflow-x-auto"><table className="w-full"><thead><tr>{['Timestamp','User','Role','Action','Reference','Module','Result','Details'].map(h=><th key={h} className="th">{h}</th>)}</tr></thead><tbody>
   {rows.map((a,i)=><tr key={i}>{[a.ts,a.user,a.role,a.action,a.ref,a.module,a.result,a.details].map((v,j)=><td key={j} className="td">{v}</td>)}</tr>)}</tbody></table></div></div>}
