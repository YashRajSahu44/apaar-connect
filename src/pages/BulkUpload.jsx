import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { parseCSV, downloadCSV } from '../utils/csv'
import { validateRows } from '../utils/validation'
const MAP={id:'Student ID',name:'Student Name',apaar:'APAAR ID',programme:'Programme',year:'Academic Year',category:'Admission Category'}
export default function BulkUpload(){const {students,setStudents,log,myInst}=useApp()
 const [step,setStep]=useState(1),[file,setFile]=useState(null),[res,setRes]=useState([]),[err,setErr]=useState(''),[done,setDone]=useState(false)
 const sample=()=>downloadCSV('sample_students.csv',Object.values(MAP),[['STU-9001','Test Student','1234-5678-9012','B.Tech CSE','2025-26','General'],['STU-9002','No Apaar','','MBA','2025-26','OBC'],['STU-9003','Bad Format','12AB-34','MBA','2025-26','Alien']])
 const onFile=async f=>{setErr('');if(!f)return;if(!/\.csv$/i.test(f.name))return setErr('Only CSV is supported in this prototype (XLSX not included).')
  const {headers,rows}=parseCSV(await f.text());const miss=Object.values(MAP).filter(h=>!headers.includes(h))
  if(miss.length)return setErr('Missing required columns: '+miss.join(', '))
  setFile({name:f.name,size:f.size});setRes(validateRows(rows.map(r=>Object.fromEntries(Object.entries(MAP).map(([k,h])=>[k,r[h]]))),students));setStep(2)}
 const ok=res.filter(r=>!r.errors.length),bad=res.filter(r=>r.errors.length)
 const submit=()=>{if(!confirm(`Submit ${ok.length} valid records?`))return
  setStudents([...students,...ok.map(r=>({...r.data,instId:myInst.id,status:'Active',updated:new Date().toISOString().slice(0,10)}))]);log('Student data uploaded',file.name,'Bulk Upload','Success',`${ok.length} valid, ${bad.length} rejected`);setDone(true)}
 return <div className="space-y-4 max-w-3xl"><h1 className="text-xl font-semibold">Bulk Student Data Upload</h1>
  <div className="flex gap-2 text-sm">{['Upload','Validate','Submit'].map((s,i)=><span key={s} className={`px-3 py-1 rounded ${step>i?'bg-navy text-white':'bg-white border border-line'}`}>{i+1}. {s}</span>)}</div>
  {done?<div className="card p-4 text-ok">Submitted {ok.length} synthetic records for {myInst.name}. Audit event recorded.</div>:<>
  {step===1&&<div className="card p-5 space-y-3"><label className="block border-2 border-dashed border-line rounded p-8 text-center text-sm cursor-pointer" onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();onFile(e.dataTransfer.files[0])}}>Drag &amp; drop a CSV here or <u>browse</u><input type="file" accept=".csv" className="sr-only" onChange={e=>onFile(e.target.files[0])}/></label>
   {err&&<p className="text-err text-sm" role="alert">{err}</p>}<p className="text-xs text-mute">Required columns: {Object.values(MAP).join(', ')}.</p><button className="btn-o" onClick={sample}>Download sample CSV</button></div>}
  {step>=2&&<div className="card p-5 space-y-3"><p className="text-sm">{file.name} ({(file.size/1024).toFixed(1)} KB)</p>
   <div className="grid grid-cols-3 gap-2 text-center text-sm"><div className="border border-line rounded p-2">Total <b>{res.length}</b></div><div className="border border-line rounded p-2 text-ok">Valid <b>{ok.length}</b></div><div className="border border-line rounded p-2 text-err">Need review <b>{bad.length}</b></div></div>
   <p className="text-xs text-mute">Duplicate checks compare only against the demonstration dataset — no national registry is queried.</p>
   <div className="max-h-64 overflow-auto"><table className="w-full"><thead><tr><th className="th">Row</th><th className="th">Student</th><th className="th">Issues</th></tr></thead><tbody>{bad.map(r=><tr key={r.row}><td className="td">{r.row}</td><td className="td">{r.data.id}</td><td className="td text-err">{r.errors.join('; ')}</td></tr>)}</tbody></table></div>
   <div className="flex gap-2 flex-wrap"><button className="btn-o" disabled={!bad.length} onClick={()=>downloadCSV('error_report.csv',['Row','Student ID','Errors'],bad.map(r=>[r.row,r.data.id,r.errors.join('; ')]))}>Download Error Report</button>
    <button className="btn" disabled={!ok.length} onClick={submit}>Submit Valid Records</button><button className="btn-o" onClick={()=>{setStep(1);setRes([]);setFile(null)}}>Cancel</button></div></div>}</>}</div>}
