import { Routes, Route, Navigate, NavLink, useNavigate } from 'react-router-dom'
import { Shield, LogOut, LayoutDashboard, Users, Upload, Copy, ScrollText, BadgeCheck, Building2 } from 'lucide-react'
import { useApp, ROLES } from './context/AppContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import BulkUpload from './pages/BulkUpload'
import Duplicates from './pages/Duplicates'
import Verification from './pages/Verification'
import Audit from './pages/Audit'
const NAV={dashboard:['Overview',LayoutDashboard],'institution-dashboard':['Overview',Building2],students:['Student Records',Users],'bulk-upload':['Bulk Upload',Upload],duplicates:['Duplicate Detection',Copy],'verification-portal':['Verification Portal',BadgeCheck],audit:['Audit Trail',ScrollText]}
function Layout({children}){const {role,setRole}=useApp();const nav=useNavigate()
 return <div className="min-h-screen flex flex-col">
  <header className="bg-navy text-white px-4 py-3 flex items-center gap-3">
   <Shield size={22}/><div><div className="font-semibold leading-tight">APAAR Connect</div><div className="text-xs opacity-80">Student Data Management &amp; Verification — Prototype</div></div>
   <span className="ml-auto text-xs bg-saffron text-ink px-2 py-1 rounded font-medium">{ROLES[role].label}</span>
   <button className="text-white" aria-label="Sign out" onClick={()=>{setRole(null);nav('/login')}}><LogOut size={18}/></button></header>
  <div className="flex flex-1">
   <aside className="w-52 bg-white border-r border-line p-3 space-y-1 hidden sm:block">
    {ROLES[role].nav.map(k=>{const [l,I]=NAV[k];return <NavLink key={k} to={'/'+k} className={({isActive})=>`flex items-center gap-2 px-3 py-2 rounded text-sm ${isActive?'bg-navy text-white':'hover:bg-bg'}`}><I size={16}/>{l}</NavLink>})}</aside>
   <main className="flex-1 p-5 overflow-x-auto">{children}
    <p className="text-xs text-mute mt-8 noprint">Demonstration prototype with synthetic data. Not an official AICTE system; production authorisation and audit must be enforced by a secure backend.</p></main></div></div>}
function Guard({k,children}){const {role}=useApp();if(!role)return <Navigate to="/login"/>
 if(!ROLES[role].nav.includes(k))return <Navigate to={ROLES[role].home}/>
 return <Layout>{children}</Layout>}
export default function App(){const {role}=useApp()
 return <Routes>
  <Route path="/login" element={<Login/>}/>
  <Route path="/dashboard" element={<Guard k="dashboard"><Dashboard/></Guard>}/>
  <Route path="/institution-dashboard" element={<Guard k="institution-dashboard"><Dashboard inst/></Guard>}/>
  <Route path="/students" element={<Guard k="students"><Students/></Guard>}/>
  <Route path="/students/:id" element={<Guard k="students"><Students/></Guard>}/>
  <Route path="/bulk-upload" element={<Guard k="bulk-upload"><BulkUpload/></Guard>}/>
  <Route path="/duplicates" element={<Guard k="duplicates"><Duplicates/></Guard>}/>
  <Route path="/verification-portal" element={<Guard k="verification-portal"><Verification/></Guard>}/>
  <Route path="/audit" element={<Guard k="audit"><Audit/></Guard>}/>
  <Route path="*" element={<Navigate to={role?ROLES[role].home:'/login'}/>}/></Routes>}
