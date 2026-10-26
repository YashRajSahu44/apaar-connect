import { createContext, useContext, useState, useEffect } from 'react'
import { mockStudents, seedAudit, institutions } from '../data/mock'
const Ctx=createContext()
export const useApp=()=>useContext(Ctx)
export const ROLES={
 admin:{label:'AICTE Administrator',home:'/dashboard',nav:['dashboard','students','duplicates','audit']},
 inst:{label:'Institution Administrator',home:'/institution-dashboard',nav:['institution-dashboard','students','bulk-upload','audit']},
 officer:{label:'Verification Officer',home:'/verification-portal',nav:['verification-portal']},
 auditor:{label:'Read-Only Auditor',home:'/students',nav:['students','audit']}}
export function AppProvider({children}){
 const [role,setRole]=useState(()=>localStorage.getItem('demoRole')||null)
 const [students,setStudents]=useState(mockStudents)
 const [audit,setAudit]=useState(seedAudit)
 const [cases,setCases]=useState({})
 useEffect(()=>{role?localStorage.setItem('demoRole',role):localStorage.removeItem('demoRole')},[role])
 const log=(action,ref,module,result='Success',details='')=>setAudit(a=>[{ts:new Date().toISOString().slice(0,16).replace('T',' '),user:'Demo User',role:ROLES[role]?.label,action,ref,module,result,details},...a])
 return <Ctx.Provider value={{role,setRole,students,setStudents,audit,log,cases,setCases,myInst:institutions[0]}}>{children}</Ctx.Provider>}
