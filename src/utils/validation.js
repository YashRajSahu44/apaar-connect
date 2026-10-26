import { CATEGORIES } from '../data/mock'
export const APAAR_RE=/^\d{4}-\d{4}-\d{4}$/ // synthetic format; valid format is NOT proof of authenticity
export const mask=a=>a?(APAAR_RE.test(a)?'XXXX-XXXX-'+a.slice(-4):'Invalid format'):'Missing'
export const apaarStatus=(a,all=[])=>!a?'Missing Identifier':!APAAR_RE.test(a)?'Invalid Format':all.filter(s=>s.apaar===a).length>1?'Potential Duplicate':'Format Valid'
export const REQUIRED=['id','name','apaar','programme','year','category']
export function validateRows(rows,existing){
 const ids=new Set(existing.map(s=>s.id)),ap=new Map(existing.filter(s=>s.apaar).map(s=>[s.apaar,s.id])),seen=new Set()
 return rows.map((r,i)=>{const e=[]
  REQUIRED.forEach(k=>{if(!r[k]&&k!=='apaar')e.push(`Missing ${k}`)})
  if(!r.apaar)e.push('Missing APAAR ID');else if(!APAAR_RE.test(r.apaar))e.push('Invalid APAAR format (expected 1234-5678-9012)')
  if(r.id&&(ids.has(r.id)||seen.has(r.id)))e.push('Duplicate student ID')
  if(r.apaar&&ap.has(r.apaar))e.push(`APAAR matches ${ap.get(r.apaar)} in demo dataset (manual review; no national registry checked)`)
  if(r.category&&!CATEGORIES.includes(r.category))e.push('Unrecognised admission category')
  if(r.year&&!/^\d{4}-\d{2}$/.test(r.year))e.push('Inconsistent academic year (expected 2025-26)')
  seen.add(r.id);return {row:i+2,data:r,errors:e}})}
