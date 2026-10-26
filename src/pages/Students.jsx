import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { institutions } from '../data/mock'
import { apaarStatus, mask } from '../utils/validation'
const instName=id=>institutions.find(i=>i.id===id)?.name
export default function Students(){const {id}=useParams();const {students,log,role}=useApp()
 const [q,setQ]=useState(''),[st,setSt]=useState(''),[sort,setSort]=useState('id'),[page,setPage]=useState(0)
 const rows=useMemo(()=>students.map(s=>({...s,vs:apaarStatus(s.apaar,students)})).filter(s=>(s.name+s.id+instName(s.instId)).toLowerCase().includes(q.toLowerCase())&&(!st||s.vs===st)).sort((a,b)=>String(a[sort]).localeCompare(String(b[sort]))),[students,q,st,sort])
 if(id){const s=students.find(x=>x.id===id);if(!s)return <p>Record not found. <Link to="/students" className="underline">Back</Link></p>
  return <div className="card p-5 space-y-3 max-w-xl"><Link to="/students" className="text-sm text-blue2">← Back</Link><h1 className="text-xl font-semibold">{s.name}</h1>
   {[['Student ID',s.id],['Institution',instName(s.instId)],['Programme',s.programme],['Academic year',s.year],['Admission category',s.category],['APAAR ID (masked)',mask(s.apaar)],['Validation',apaarStatus(s.apaar,students)]].map(([k,v])=><div key={k} className="flex text-sm"><span className="w-44 text-mute">{k}</span>{v}</div>)}
   {role!=='auditor'&&<button className="btn" onClick={()=>{log('APAAR format check performed',s.id,'Validation');alert('Format check run (simulated). A valid format is not proof of identity authenticity.')}}>Validate APAAR ID</button>}</div>}
 const pages=Math.ceil(rows.length/10),H=[['id','Student ID'],['name','Name'],['apaar','APAAR (masked)'],['instId','Institution'],['programme','Programme'],['category','Category'],['vs','Validation']]
 return <div className="space-y-4"><h1 className="text-xl font-semibold">Student Records <span className="text-xs text-mute">(synthetic)</span></h1>
  <div className="flex gap-2 flex-wrap"><input className="inp max-w-xs" placeholder="Search name, ID, institution" aria-label="Search" value={q} onChange={e=>{setQ(e.target.value);setPage(0)}}/>
   <select className="inp max-w-xs" aria-label="Validation filter" value={st} onChange={e=>{setSt(e.target.value);setPage(0)}}><option value="">All validation statuses</option>{['Format Valid','Missing Identifier','Invalid Format','Potential Duplicate'].map(x=><option key={x}>{x}</option>)}</select>
   <button className="btn-o" onClick={()=>{setQ('');setSt('');setPage(0)}}>Reset</button></div>
  <div className="card overflow-x-auto"><table className="w-full"><thead><tr>{H.map(([k,l])=><th key={k} className="th cursor-pointer" onClick={()=>setSort(k)}>{l}{sort===k&&' ▲'}</th>)}</tr></thead><tbody>
   {rows.slice(page*10,page*10+10).map(s=><tr key={s.id} className="hover:bg-bg"><td className="td"><Link className="text-blue2 underline" to={`/students/${s.id}`}>{s.id}</Link></td><td className="td">{s.name}</td><td className="td font-mono">{mask(s.apaar)}</td><td className="td">{s.instId}</td><td className="td">{s.programme}</td><td className="td">{s.category}</td><td className="td">{s.vs}</td></tr>)}
   {!rows.length&&<tr><td className="td text-mute" colSpan={7}>No records match the filters.</td></tr>}</tbody></table></div>
  <div className="flex items-center gap-2 text-sm"><button className="btn-o" disabled={!page} onClick={()=>setPage(page-1)}>Prev</button>Page {page+1} / {pages||1}<button className="btn-o" disabled={page+1>=pages} onClick={()=>setPage(page+1)}>Next</button></div></div>}
