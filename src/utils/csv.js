export function parseCSV(t){const lines=t.replace(/\r/g,'').split('\n').filter(l=>l.trim());if(!lines.length)return{headers:[],rows:[]}
 const sp=l=>{const o=[];let c='',q=false;for(const ch of l){if(ch==='"')q=!q;else if(ch===','&&!q){o.push(c.trim());c=''}else c+=ch}o.push(c.trim());return o}
 const headers=sp(lines[0]);return{headers,rows:lines.slice(1).map(l=>{const v=sp(l);return Object.fromEntries(headers.map((h,i)=>[h,v[i]||'']))})}}
export function downloadCSV(name,headers,rows){const q=v=>`"${String(v??'').replace(/"/g,'""')}"`
 const b=new Blob([[headers.map(q).join(','),...rows.map(r=>r.map(q).join(','))].join('\n')],{type:'text/csv'})
 const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click()}
