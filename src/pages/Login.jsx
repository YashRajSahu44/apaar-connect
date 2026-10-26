import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Shield, Eye, EyeOff } from 'lucide-react'
import { useApp, ROLES } from '../context/AppContext'
export default function Login(){const {setRole}=useApp();const nav=useNavigate();const [show,setShow]=useState(false);const [r,setR]=useState('admin')
 const go=e=>{e.preventDefault();setRole(r);nav(ROLES[r].home)}
 return <div className="min-h-screen flex items-center justify-center p-4"><form onSubmit={go} className="card w-full max-w-md p-6 space-y-4">
  <div className="flex items-center gap-2 text-navy"><Shield/><b className="text-lg">APAAR Connect</b></div>
  <div><h1 className="font-semibold text-lg">Student Data Management &amp; Verification System</h1><p className="text-sm text-mute">Academic Identity, Enrolment Monitoring and Verification</p></div>
  <label className="block text-sm">User ID or email<input className="inp mt-1" placeholder="demo.user@example.org"/></label>
  <label className="block text-sm">Password<div className="relative mt-1"><input type={show?'text':'password'} className="inp pr-10" placeholder="Not validated in prototype"/><button type="button" aria-label="Toggle password" onClick={()=>setShow(!show)} className="absolute right-2 top-2.5 text-mute">{show?<EyeOff size={16}/>:<Eye size={16}/>}</button></div></label>
  <div className="border border-saffron bg-amber-50 rounded p-3"><label className="text-sm font-medium">Demo access — choose a role
   <select className="inp mt-1" value={r} onChange={e=>setR(e.target.value)}>{Object.entries(ROLES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}</select></label></div>
  <button className="btn w-full justify-center">Sign In</button>
  <p className="text-xs text-mute">Security notice: frontend demonstration only. No real authentication; no credentials are stored. All data is synthetic.</p></form></div>}
