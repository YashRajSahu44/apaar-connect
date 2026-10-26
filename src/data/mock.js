// ALL DATA SYNTHETIC. Not connected to AICTE or real APAAR infrastructure.
export const institutions = [
 {id:'INS-1001',name:'Synthetic Institute of Technology',state:'Madhya Pradesh',intake:240,sn:12},
 {id:'INS-1002',name:'Demo College of Engineering',state:'Maharashtra',intake:300,sn:15},
 {id:'INS-1003',name:'Sample Polytechnic Institute',state:'Karnataka',intake:180,sn:9},
 {id:'INS-1004',name:'Test University School of Tech',state:'Tamil Nadu',intake:360,sn:18},
 {id:'INS-1005',name:'Mock Institute of Management',state:'Rajasthan',intake:120,sn:6},
 {id:'INS-1006',name:'Prototype Engineering College',state:'Gujarat',intake:200,sn:10}]
export const CATEGORIES=['General','OBC','SC','ST','EWS','NRI','OCI','Foreign National','Supernumerary']
export const PROGRAMMES=['B.Tech CSE','B.Tech ECE','B.Tech Mech','MBA','Diploma Civil']
const F=['Aarav','Diya','Rohan','Anika','Vihaan','Isha','Kabir','Meera','Arjun','Saanvi'],L=['Sharma','Patel','Reddy','Iyer','Singh','Nair','Gupta','Joshi']
const pad=(n,l)=>String(n).padStart(l,'0')
export const mkApaar=n=>`${pad(1000+n*7%9000,4)}-${pad(2000+n*13%8000,4)}-${pad(1000+n*37%9000,4)}`
export const mockStudents=Array.from({length:60},(_,i)=>{const ins=institutions[i%6]
 return {id:`STU-${pad(i+1,4)}`,name:`${F[i%10]} ${L[i%8]}`,apaar:i===4?'':i===9?'12AB-34':mkApaar(i),instId:ins.id,programme:PROGRAMMES[i%5],year:'2025-26',category:CATEGORIES[i%9],status:'Active',updated:'2026-10-20'}})
mockStudents[11].apaar=mockStudents[5].apaar
export const seedAudit=[{ts:'2026-10-24 10:12',user:'Demo Institution Admin',role:'Institution Administrator',action:'Student data uploaded',ref:'BATCH-001',module:'Bulk Upload',result:'Success',details:'58 rows submitted (synthetic)'}]
