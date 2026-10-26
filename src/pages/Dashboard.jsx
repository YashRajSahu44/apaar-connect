import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useApp } from '../context/AppContext'
import { institutions } from '../data/mock'
import { apaarStatus } from '../utils/validation'
const Card=({t,v,d,tone='text-navy'})=><div className="card p-4"><div className="text-xs text-mute">{t}</div><div className={`text-2xl font-bold ${tone}`}>{v}</div><div className="text-xs text-mute">{d}</div></div>
export default function Dashboard({inst}){const {students,myInst}=useApp();const [q,setQ]=useState('')
 const rows=useMemo(()=>institutions.filter(i=>!inst||i.id===myInst.id).map(i=>{const ss=students.filter(s=>s.instId===i.id);const reg=ss.filter(s=>s.category!=='Supernumerary').length
  return{...i,enrol:ss.length,reg,util:Math.round(reg/i.intake*1000)/10,bad:ss.filter(s=>apaarStatus(s.apaar,students)!=='Format Valid').length}}),[students,inst,myInst])
 const T=a=>a.reduce((x,y)=>x+y,0),bad=T(rows.map(r=>r.bad)),over=rows.filter(r=>r.reg>r.intake).length
 const data=rows.map(r=>({name:r.id,Approved:r.intake,Enrolled:r.enrol,Available:Math.max(0,r.intake-r.reg)}))
 return <div className="space-y-5">
  <div><h1 className="text-xl font-semibold">{inst?`${myInst.name} — Institution Dashboard`:'National Student Data Dashboard'}</h1><p className="text-sm text-mute">Monitor student records, enrolment and academic identity validation. <b>Synthetic demonstration data.</b></p></div>
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
   <Card t={inst?'Approved Intake':'Total Registered Students'} v={inst?rows[0].intake:T(rows.map(r=>r.enrol))} d="Synthetic"/>
   <Card t={inst?'Total Enrolment':'Participating Institutions'} v={inst?rows[0].enrol:rows.length} d="From shared dataset"/>
   <Card t="Records Requiring Review" v={bad} d="Missing / invalid / duplicate APAAR" tone="text-warn"/>
   <Card t={inst?'Intake Utilisation':'Institutions Above Intake'} v={inst?rows[0].util+'%':over} d={inst?`Supernumerary: ${rows[0].sn} seats (configurable rule)`:'Regular enrolment > intake'} tone={over?'text-err':'text-ok'}/></div>
  {inst&&rows[0].reg>rows[0].intake&&<div className="border border-warn bg-amber-50 text-warn p-3 rounded text-sm">Regular enrolment exceeds approved intake. Supernumerary / NRI / OCI / FN admissions are handled per configurable demo rules.</div>}
  {inst&&<div className="flex flex-wrap gap-2"><Link className="btn" to="/bulk-upload">Upload Student Data</Link><Link className="btn-o" to="/students">View Student Records</Link></div>}
  <div className="card p-4"><h2 className="font-semibold text-sm mb-2">Approved intake vs actual enrolment</h2><div style={{height:260}}><ResponsiveContainer><BarChart data={data}><XAxis dataKey="name" fontSize={11}/><YAxis fontSize={11}/><Tooltip/><Legend/><Bar dataKey="Approved" fill="#123B63"/><Bar dataKey="Enrolled" fill="#E89B32"/><Bar dataKey="Available" fill="#218653"/></BarChart></ResponsiveContainer></div></div>
  <div className="card"><div className="p-3"><input className="inp max-w-xs" placeholder="Search institution" value={q} onChange={e=>setQ(e.target.value)} aria-label="Search institution"/></div>
   <table className="w-full"><thead><tr>{['ID','Institution','State','Intake','Enrolment','Utilisation','Status'].map(h=><th key={h} className="th">{h}</th>)}</tr></thead><tbody>
    {rows.filter(r=>r.name.toLowerCase().includes(q.toLowerCase())).map(r=><tr key={r.id}><td className="td">{r.id}</td><td className="td">{r.name}</td><td className="td">{r.state}</td><td className="td">{r.intake}</td><td className="td">{r.enrol}</td><td className="td">{r.util}%</td>
     <td className="td"><span className={r.reg>r.intake?'text-err':r.util>90?'text-warn':'text-ok'}>{r.reg>r.intake?'Review Required':r.util>90?'Near Capacity':'Within Intake'}</span></td></tr>)}</tbody></table></div></div>}
