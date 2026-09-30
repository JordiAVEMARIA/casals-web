
(function(){
"use strict";
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const uid = p => p + Math.random().toString(36).slice(2,8);
const DIES = ["Dilluns","Dimarts","Dimecres","Dijous","Divendres"];
const DIES_C = ["Dl","Dt","Dc","Dj","Dv"];
const EIXOS = {salut:"Salut i activitat física", digital:"Competència digital", cultura:"Cultura i oci", comunitat:"Comunitat i voluntariat"};
const EIX_C = {salut:"Salut", digital:"Digital", cultura:"Cultura", comunitat:"Comunitat"};

const ICON = {
  home:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  users:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c.8-3.5 3.4-5.5 6.5-5.5s5.7 2 6.5 5.5"/><path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18.5 14.8c1.6.8 2.6 2.6 3 5.2"/></svg>',
  act:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="3"/><path d="M3 9h18M8 2v4M16 2v4M8 14h3M8 17h6"/></svg>',
  room:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M2 21h20M16 8h2a2 2 0 0 1 2 2v11"/><circle cx="12.5" cy="12" r=".6" fill="currentColor"/></svg>',
  cog:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  cup:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h13v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5z"/><path d="M17 11h1.5a2.5 2.5 0 0 1 0 5H17M8 2.5c-.6 1 .6 2 0 3M12 2.5c-.6 1 .6 2 0 3"/><path d="M3 22h15"/></svg>',
  plate:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="7"/><circle cx="12" cy="13" r="3.5"/><path d="M2 4v5a2 2 0 0 0 2 2V20M4 4v4M22 4c-1.5 0-2.5 2-2.5 4.5S20.5 12 22 12v8"/></svg>',
  heart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 5.6a5 5 0 0 0-7.1 0L12 7.3l-1.7-1.7a5 5 0 0 0-7.1 7.1L12 21.5l8.8-8.8a5 5 0 0 0 0-7.1z"/><path d="M3.5 12h4l2-3 3 6 2-3h6"/></svg>',
  tool:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a4 4 0 0 0 5 5L21 13l-8 8-3-3 1.3-1.3a4 4 0 0 1-5-5L3 8.4 8.4 3l3.3 3.3a4 4 0 0 1 3 0z"/></svg>',
  chart:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v18h18"/><path d="M7 15v3M11 10v8M15 12v6M19 6v12"/></svg>',
  key:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4"/><path d="M10.8 12.2 20 3M16 7l3 3M14 9l2 2"/></svg>',
  plus:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  x:'<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>'
};

const isoAvui = () => { const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); };

const iso = d => d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const addDays = (s,n) => { const d=new Date(s+"T12:00:00"); d.setDate(d.getDate()+n); return iso(d); };
const wd = s => (new Date(s+"T12:00:00").getDay()+6)%7;
const diesEntre = (a,b) => Math.round((new Date(b+"T12:00:00")-new Date(a+"T12:00:00"))/864e5);
const INICI_CONTRACTE="2026-09-01";
/* ---------- Dades: Supabase ---------- */
const CFG = window.CASALS_CONFIG || {};
const sb = window.supabase.createClient(CFG.url, CFG.key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
let D = null, ME = null;
let ROWS = new Map();   // estat del servidor: clau col|id -> {col,id,casal,json}
let LAST = new Map();   // darrer estat sincronitzat de l'aplicació
const AVUI_MENYS = n => addDays(isoAvui(), -n);

function buit(){
  return {casals:[],sales:[],socis:[],activitats:[],reserves:[],
    bar:{productes:[],vendes:[],tancaments:[],historic:[],fons:50},
    apats:{places:30,preuSoci:6.5,preuNoSoci:8.5,preuSubv:3,subvencionats:[],hora:"13:00",menus:Array.from({length:7},()=>({primer:"",segon:"",postres:""})),reserves:[],historic:[]},
    assist:{},rebuts:[],seguiments:[],derivacions:[],
    manteniment:{incidencies:[],inventari:[],preventiu:[],tasques:[],neteja:{}},
    config:{avisos:{actiu:true,destinataris:[]}},registre:[],mesosTancats:{},informes:{}};
}
const casalDe = (arr,id) => { const x=arr.find(y=>y.id===id); return x ? x.casal : undefined; };
const ARRAYS = {
  "casals":                  {get:d=>d.casals, casal:()=>null},
  "sales":                   {get:d=>d.sales, casal:r=>r.casal},
  "socis":                   {get:d=>d.socis, casal:r=>r.casal},
  "activitats":              {get:d=>d.activitats, casal:r=>r.casal},
  "reserves":                {get:d=>d.reserves, casal:(r,d)=>casalDe(d.sales,r.sala)},
  "rebuts":                  {get:d=>d.rebuts, casal:(r,d)=>casalDe(d.activitats,r.act)},
  "seguiments":              {get:d=>d.seguiments, casal:(r,d)=>casalDe(d.socis,r.soci)},
  "derivacions":             {get:d=>d.derivacions, casal:(r,d)=>casalDe(d.socis,r.soci)},
  "bar.productes":           {get:d=>d.bar.productes, casal:()=>null},
  "bar.vendes":              {get:d=>d.bar.vendes, casal:r=>r.casal},
  "bar.tancaments":          {get:d=>d.bar.tancaments, casal:r=>r.casal, id:r=>r.casal+"|"+r.data},
  "bar.historic":            {get:d=>d.bar.historic, casal:r=>r.casal, id:r=>r.casal+"|"+r.data},
  "apats.reserves":          {get:d=>d.apats.reserves, casal:()=>"c2"},
  "apats.historic":          {get:d=>d.apats.historic, casal:()=>"c2", id:r=>r.data},
  "manteniment.incidencies": {get:d=>d.manteniment.incidencies, casal:r=>r.casal},
  "manteniment.inventari":   {get:d=>d.manteniment.inventari, casal:r=>r.casal},
  "manteniment.preventiu":   {get:d=>d.manteniment.preventiu, casal:r=>r.casal},
  "manteniment.tasques":     {get:d=>d.manteniment.tasques, casal:r=>r.casal||null}
};
const MAPES = {
  "assist":             {get:d=>d.assist, casal:(k,d)=>casalDe(d.activitats,k.split("|")[0])},
  "manteniment.neteja": {get:d=>d.manteniment.neteja, casal:k=>k.split("|")[0]},
  "mesosTancats":       {get:d=>d.mesosTancats, casal:()=>null},
  "informes_mes":       {get:d=>d.informes, casal:()=>null}
};
const APATS_CFG = ["places","preuSoci","preuNoSoci","preuSubv","subvencionats","hora","menus"];

function fromRows(rows){
  const d=buit(), fitxes={};
  for(const r of rows){ const v=r.data;
    if(r.col==="config") Object.assign(d.config, v);
    else if(r.col==="bar.config") d.bar.fons = v.fons ?? 50;
    else if(r.col==="apats.config") APATS_CFG.forEach(k=>{ if(v[k]!==undefined) d.apats[k]=v[k]; });
    else if(r.col==="fitxes_socials") fitxes[r.id]=v;
    else if(MAPES[r.col]) MAPES[r.col].get(d)[v.k]=v.v;
    else if(ARRAYS[r.col]) ARRAYS[r.col].get(d).push(v);
  }
  d.socis.forEach(s=>{ const f=fitxes[s.id];
    if(f){ s.viuSol=!!f.viuSol; s.acollida=f.acollida||{completada:true}; }
    else s.acollida = diesEntre(s.alta||isoAvui(), isoAvui())<=60 ? {completada:false,entrevista:null,benvinguda:false,referent:null,revisio:null,interessos:[]} : {completada:true};
  });
  d.socis.sort((a,b)=>a.num-b.num); d.casals.sort((a,b)=>a.id.localeCompare(b.id));
  d.bar.vendes.sort((a,b)=>(a.data+a.hora).localeCompare(b.data+b.hora));
  d.apats.historic.sort((a,b)=>a.data.localeCompare(b.data));
  return d;
}
function toRecords(d){
  const m=new Map();
  const prev=(col,id)=>{ const o=LAST.get(col+"|"+id)||ROWS.get(col+"|"+id); return o?o.casal:null; };
  const put=(col,id,casal,data)=>{ if(casal===undefined) casal=prev(col,id); m.set(col+"|"+id,{col,id:String(id),casal:casal??null,json:JSON.stringify(data)}); };
  for(const [col,a] of Object.entries(ARRAYS)) for(const r of a.get(d)){
    let data=r; if(col==="socis"){ const {viuSol,acollida,...rest}=r; data=rest; }
    put(col, a.id?a.id(r):r.id, a.casal(r,d), data);
  }
  if(can("seguiment","C")) d.socis.forEach(s=>put("fitxes_socials",s.id,s.casal,{viuSol:!!s.viuSol,acollida:s.acollida}));
  for(const [col,a] of Object.entries(MAPES)) for(const [k,v] of Object.entries(a.get(d))) put(col,k,a.casal(k,d),{k,v});
  put("config","main",null,d.config);
  put("bar.config","main",null,{fons:d.bar.fons});
  if(ROWS.has("apats.config|main")||can("menu","M")) put("apats.config","main","c2",Object.fromEntries(APATS_CFG.map(k=>[k,d.apats[k]])));
  return m;
}

async function llegirTot(){
  const out=[], PAGE=1000;
  const pagina=async q=>{ for(let from=0;;from+=PAGE){ const {data,error}=await q().order("col").order("id").range(from,from+PAGE-1); if(error) throw error; out.push(...data); if(data.length<PAGE) break; } };
  await pagina(()=>sb.from("registres").select("col,id,casal,data").neq("col","bar.vendes"));
  await pagina(()=>sb.from("registres").select("col,id,casal,data").eq("col","bar.vendes").gte("data->>data",AVUI_MENYS(45)));
  return out;
}
async function carregar(){
  const rows=await llegirTot();
  ROWS=new Map(rows.map(r=>[r.col+"|"+r.id,{col:r.col,id:r.id,casal:r.casal,data:r.data,json:JSON.stringify(r.data)}]));
  D=fromRows([...ROWS.values()]);
  LAST=toRecords(D);
  dataVer++;
}

// ---- Desar: envia només el que ha canviat ----
let syncT=null, syncing=false, pendent=false, remotPendent=false;
const save = () => { dataVer++; clearTimeout(syncT); estatSync("desant"); syncT=setTimeout(sincronitzar,300); };
const saveUI = () => { try{ localStorage.setItem("casals-ui", JSON.stringify({casal:S.casal,view:S.view})); }catch(e){} };
async function sincronitzar(){
  syncT=null;
  if(syncing){ pendent=true; return; }
  syncing=true;
  const ara=toRecords(D), ups=[], dels=[];
  ara.forEach((r,k)=>{ const o=LAST.get(k); if(!o||o.json!==r.json||o.casal!==r.casal) ups.push(r); });
  LAST.forEach((r,k)=>{ if(!ara.has(k)) dels.push(r); });
  try{
    for(let i=0;i<ups.length;i+=200){
      const lot=ups.slice(i,i+200).map(r=>({col:r.col,id:r.id,casal:r.casal,data:JSON.parse(r.json)}));
      const {error}=await sb.from("registres").upsert(lot,{onConflict:"col,id"}); if(error) throw error;
      lot.forEach(r=>ROWS.set(r.col+"|"+r.id,{...r,json:JSON.stringify(r.data)}));
    }
    for(const r of dels){
      const {data,error}=await sb.from("registres").delete().eq("col",r.col).eq("id",r.id).select("id"); if(error) throw error;
      if(!data.length && ROWS.has(r.col+"|"+r.id)) throw {message:"no tens permís per esborrar-ho"};
      ROWS.delete(r.col+"|"+r.id);
    }
    LAST=ara; estatSync("desat");
  }catch(e){
    estatSync("error");
    toast("No s'ha pogut desar: "+textError(e)+". Es recarreguen les dades.");
    try{ await carregar(); if(!document.querySelector(".scrim")) render(); }catch(_){}
  }
  syncing=false;
  if(pendent){ pendent=false; sincronitzar(); }
  else if(remotPendent) aplicarRemot();
}
function textError(e){
  const m=(e&&(e.message||e.error_description))||"error desconegut";
  if(/row-level security|permission|42501/i.test(m)) return "el teu perfil no té permís per fer aquest canvi";
  if(/fetch|network|Failed/i.test(m)) return "no hi ha connexió";
  return m;
}
function estatSync(s){
  const el=document.getElementById("sync"); if(!el) return;
  el.className="chip sync "+(s==="error"?"crit":s==="desant"?"":"good");
  el.textContent = s==="desant"?"Desant…":s==="error"?"Error en desar":"Desat";
}

// ---- Canvis d'altres persones en temps real ----
let escoltant=false;
function escoltar(){
  if(escoltant) return; escoltant=true;
  sb.channel("registres").on("postgres_changes",{event:"*",schema:"public",table:"registres"},p=>{
    const row = p.eventType==="DELETE" ? p.old : p.new; if(!row||!row.col) return;
    const k=row.col+"|"+row.id;
    if(p.eventType==="DELETE"){ if(!ROWS.has(k)) return; ROWS.delete(k); }
    else { const js=JSON.stringify(row.data); const cur=ROWS.get(k); if(cur&&cur.json===js) return; ROWS.set(k,{col:row.col,id:row.id,casal:row.casal,data:row.data,json:js}); }
    remotPendent=true; aplicarRemot();
  }).subscribe();
}
function aplicarRemot(){
  if(!remotPendent) return;
  if(syncing||syncT||document.querySelector(".scrim")) return; // s'aplicarà en acabar
  remotPendent=false;
  D=fromRows([...ROWS.values()]); LAST=toRecords(D); dataVer++;
  render();
}
async function logCanvi(accio, detall, motiu){
  D.registre.unshift({data:araIso(),rol:ROLS[S.rol],accio,detall,motiu:motiu||""});
  try{ await sb.from("auditoria").insert({accio,detall:detall||"",motiu:motiu||""}); }catch(e){}
}
async function llegirAuditoria(){
  const {data,error}=await sb.from("auditoria").select("moment,email,rol,accio,detall,motiu").order("moment",{ascending:false}).limit(40);
  if(error) return;
  D.registre=data.map(r=>{ const t=new Date(r.moment); return {data:iso(t)+"T"+String(t.getHours()).padStart(2,"0")+":"+String(t.getMinutes()).padStart(2,"0"),rol:(ROLS[r.rol]||r.rol||"")+(r.email?" · "+r.email:""),accio:r.accio,detall:r.detall,motiu:r.motiu}; });
}

/* ---------- Accés ---------- */
const S = { rol:"pendent", casal:"tots", view:"inici", q:"", fq:"tots", eix:"tots", sala:null, portalSoci:null, barCasal:"c1", tiquet:{}, apDia:null };
try{ const r=localStorage.getItem("casals-ui"); if(r){ const o=JSON.parse(r); S.casal=o.casal||"tots"; S.view=o.view||"inici"; } }catch(e){}

function pantalla(html){ closeOverlay(); $("#root").innerHTML='<main class="auth"><div class="auth-card"><div class="brand" style="padding:0"><div class="brand-mark">AM</div><div><b>Casals de Gent Gran</b><small>Sant Pere de Ribes · Fundació Ave Maria</small></div></div>'+html+'</div></main>'; }
function pantallaAcces(mode, msg){
  mode=mode||"entrar";
  const T={entrar:["Entra al programa","Entrar"],oblit:["Recupera la contrasenya","Envia'm l'enllaç"],alta:["Sol·licita l'accés","Sol·licitar accés"]}[mode];
  pantalla('<h1>'+T[0]+'</h1>'+(msg?'<div class="note">'+esc(msg)+'</div>':'')+
    '<form class="form" id="fau" novalidate style="grid-template-columns:1fr">'+
    (mode==="alta"?'<div class="field"><label for="au_nom">Nom i cognoms</label><input id="au_nom" autocomplete="name"></div>':'')+
    '<div class="field"><label for="au_em">Correu electrònic</label><input id="au_em" type="email" autocomplete="username"></div>'+
    (mode!=="oblit"?'<div class="field"><label for="au_pw">Contrasenya</label><input id="au_pw" type="password" autocomplete="'+(mode==="alta"?'new-password':'current-password')+'"></div>':'')+
    (mode==="alta"?'<p class="note" style="margin:0">Mínim 8 caràcters. L\'administrador t\'assignarà el perfil i el casal.</p>':'')+
    '<div class="alert" id="auerr" hidden></div><button class="btn primary" type="submit" style="justify-content:center;padding:12px">'+T[1]+'</button></form>'+
    '<div class="auth-links">'+(mode!=="entrar"?'<button class="btn ghost sm" data-mode="entrar">Ja tinc compte: entrar</button>':'<button class="btn ghost sm" data-mode="oblit">He oblidat la contrasenya</button><button class="btn ghost sm" data-mode="alta">Sol·licitar accés</button>')+'</div>');
  document.querySelectorAll("[data-mode]").forEach(b=>b.onclick=()=>pantallaAcces(b.dataset.mode));
  $("#au_em").focus();
  $("#fau").onsubmit=async e=>{ e.preventDefault(); const er=$("#auerr"); er.hidden=true;
    const em=$("#au_em").value.trim(), pw=$("#au_pw")?$("#au_pw").value:"", btn=e.target.querySelector("[type=submit]");
    const falla=t=>{ er.textContent=t; er.hidden=false; btn.disabled=false; };
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em)) return falla("Escriu un correu electrònic vàlid.");
    btn.disabled=true;
    const redirect=location.origin+location.pathname;
    if(mode==="entrar"){
      const {error}=await sb.auth.signInWithPassword({email:em,password:pw});
      if(error) return falla(/confirm/i.test(error.message)?"Primer has de confirmar el correu: mira la teva bústia.":"Correu o contrasenya incorrectes.");
      entrar();
    } else if(mode==="oblit"){
      const {error}=await sb.auth.resetPasswordForEmail(em,{redirectTo:redirect});
      if(error) return falla("No s'ha pogut enviar: "+error.message);
      pantallaAcces("entrar","Si el correu està registrat, rebràs un enllaç per posar una contrasenya nova.");
    } else {
      const nom=$("#au_nom").value.trim();
      if(!nom) return falla("Escriu el teu nom.");
      if(pw.length<8) return falla("La contrasenya ha de tenir com a mínim 8 caràcters.");
      const {error}=await sb.auth.signUp({email:em,password:pw,options:{data:{nom},emailRedirectTo:redirect}});
      if(error) return falla("No s'ha pogut crear el compte: "+error.message);
      pantallaAcces("entrar","T'hem enviat un correu per confirmar l'adreça. Després, l'administrador t'activarà l'accés.");
    }
  };
}
function pantallaNovaContrasenya(){
  pantalla('<h1>Nova contrasenya</h1><form class="form" id="fnp" novalidate style="grid-template-columns:1fr"><div class="field"><label for="np1">Contrasenya nova</label><input id="np1" type="password" autocomplete="new-password"></div><div class="field"><label for="np2">Repeteix-la</label><input id="np2" type="password" autocomplete="new-password"></div><div class="alert" id="nperr" hidden></div><button class="btn primary" type="submit" style="justify-content:center;padding:12px">Desar la contrasenya</button></form>');
  $("#fnp").onsubmit=async e=>{ e.preventDefault(); const a=$("#np1").value, b=$("#np2").value, er=$("#nperr");
    if(a.length<8){ er.textContent="Mínim 8 caràcters."; er.hidden=false; return; }
    if(a!==b){ er.textContent="Les dues contrasenyes no coincideixen."; er.hidden=false; return; }
    const {error}=await sb.auth.updateUser({password:a}); if(error){ er.textContent=error.message; er.hidden=false; return; }
    history.replaceState(null,"",location.pathname); toast("Contrasenya canviada."); entrar(); };
}
function pantallaPendent(){
  pantalla('<h1>Hola'+(ME.nom?', '+esc(ME.nom.split(" ")[0]):'')+'</h1><p>'+(ME.actiu?'El teu compte està creat. Falta que l\'administrador t\'assigni el perfil i el casal. Quan ho faci, torna a entrar.':'El teu compte està desactivat. Parla amb l\'administrador.')+'</p><div style="display:flex;gap:8px"><button class="btn primary" id="retry">Tornar a provar</button><button class="btn ghost" id="sortir">Sortir</button></div>');
  $("#retry").onclick=()=>entrar(); $("#sortir").onclick=sortir;
}
async function sortir(){ await sb.auth.signOut(); ME=null; D=null; pantallaAcces(); }
async function entrar(){
  pantalla('<p>Carregant…</p>');
  const {data:{user}}=await sb.auth.getUser();
  if(!user) return pantallaAcces();
  const {data:p,error}=await sb.from("perfils").select("*").eq("id",user.id).single();
  if(error||!p){ pantalla('<h1>No s\'ha pogut entrar</h1><p>Falta configurar la base de dades o el perfil. Parla amb l\'administrador.</p><button class="btn ghost" id="sortir">Sortir</button>'); $("#sortir").onclick=sortir; return; }
  ME=p;
  if(p.rol==="pendent"||!p.actiu) return pantallaPendent();
  S.rol=p.rol;
  if(["dinamitzador","informador"].includes(p.rol)) S.casal=p.casal||"c1";
  if(p.rol==="ajuntament") S.casal="tots";
  try{ await carregar(); }catch(e){ pantalla('<h1>No s\'han pogut carregar les dades</h1><p>'+esc(textError(e))+'</p><button class="btn primary" id="retry">Tornar a provar</button>'); $("#retry").onclick=()=>entrar(); return; }
  if(!D.casals.length) D.casals=[{id:"c1",nom:"Casal de Ribes",curt:"Ribes"},{id:"c2",nom:"Casal de Roquetes",curt:"Roquetes"}];
  escoltar();
  render();
}
async function boot(){
  if(!CFG.url||!window.supabase){ pantalla('<h1>Falta la configuració</h1><p>Revisa el fitxer config.js.</p>'); return; }
  let recuperant=/type=recovery/.test(location.hash);
  sb.auth.onAuthStateChange(ev=>{ if(ev==="PASSWORD_RECOVERY"){ recuperant=true; pantallaNovaContrasenya(); } });
  const {data:{session}}=await sb.auth.getSession();
  if(recuperant) return pantallaNovaContrasenya();
  if(!session) return pantallaAcces();
  entrar();
}

/* ---------- Helpers de dades ---------- */
const soci = id => D.socis.find(s=>s.id===id);
const sala = id => D.sales.find(s=>s.id===id);
const casal = id => D.casals.find(c=>c.id===id);
const inCasal = x => S.casal==="tots" || x.casal===S.casal;
const nomComplet = s => s ? s.nom+" "+s.cognoms : "—";
const inicials = s => (s.nom[0]+s.cognoms[0]).toUpperCase();
const edat = s => { const b=new Date(s.naix), n=new Date(); let a=n.getFullYear()-b.getFullYear(); if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate())) a--; return a; };
const mins = t => { const [h,m]=t.split(":").map(Number); return h*60+m; };
const avuiIdx = () => { const d=new Date().getDay(); return d>=1&&d<=5 ? d-1 : 0; };
const esAvuiLaborable = () => { const d=new Date().getDay(); return d>=1&&d<=5; };
const activitatsDe = sid => D.activitats.filter(a=>a.inscrits.includes(sid));
const esperaDe = sid => D.activitats.filter(a=>a.espera.includes(sid));

function inscriure(a, sid){
  if(a.inscrits.includes(sid)||a.espera.includes(sid)) return "ja";
  if(a.inscrits.length < a.places){ a.inscrits.push(sid); save(); return "inscrit"; }
  a.espera.push(sid); save(); return "espera";
}
function baixa(a, sid){
  let promo=null;
  if(a.inscrits.includes(sid)){
    a.inscrits = a.inscrits.filter(x=>x!==sid);
    if(a.espera.length && a.inscrits.length < a.places){ promo=a.espera.shift(); a.inscrits.push(promo); }
  } else a.espera = a.espera.filter(x=>x!==sid);
  save(); return promo;
}
function conflicte(salaId, dia, inici, fi, ignoreId){
  const a0=mins(inici), a1=mins(fi);
  const ov = (b0,b1)=> a0<mins(b1) && mins(b0)<a1;
  const act = D.activitats.find(a=>a.id!==ignoreId && a.sala===salaId && a.dia===dia && ov(a.inici,a.fi));
  if(act) return "Coincideix amb l'activitat «"+act.nom+"» ("+act.inici+"–"+act.fi+").";
  const r = D.reserves.find(r=>r.id!==ignoreId && r.sala===salaId && r.dia===dia && ov(r.inici,r.fi));
  if(r) return "Coincideix amb la reserva de "+r.entitat+" ("+r.inici+"–"+r.fi+").";
  return null;
}


const DIES7 = ["Dilluns","Dimarts","Dimecres","Dijous","Divendres","Dissabte","Diumenge"];
const avuiIdx7 = () => (new Date().getDay()+6)%7;
let partCache=null, partVer=-1, dataVer=0;
function participacio(){
  if(partCache && partVer===dataVer) return partCache;
  const m={}; const AV=isoAvui(), lim=addDays(AV,-30);
  const touch=(sid,d)=>{ const o=m[sid]||(m[sid]={last:null,n30:0}); if(!o.last||d>o.last) o.last=d; if(d>=lim) o.n30++; };
  Object.entries(D.assist).forEach(([k,arr])=>{ const d=k.split("|")[1]; arr.forEach(sid=>touch(sid,d)); });
  (D.apats.historic||[]).forEach(h=>h.servits.forEach(sid=>touch(sid,h.data)));
  partCache=m; partVer=dataVer; return m;
}
function absApats(sid){ const lim=addDays(isoAvui(),-14); return (D.apats.historic||[]).filter(h=>h.data>=lim && h.absents.includes(sid)).length; }
function alertesDe(s){
  if(s.baixa) return [];
  const out=[], AV=isoAvui(), p=participacio()[s.id], ac=s.acollida||{completada:true};
  if(!ac.completada){
    if(!ac.entrevista) out.push({t:"Entrevista inicial pendent",c:"warn",k:"acollida"});
    else { const due=addDays(ac.entrevista,30), q=diesEntre(AV,due); if(q<=5) out.push({t: q<0?"Revisió dels 30 dies endarrerida":"Revisió dels 30 dies en "+q+" dies",c:q<0?"crit":"warn",k:"acollida"}); }
  }
  const nIns=activitatsDe(s.id).length;
  if(ac.completada && nIns && diesEntre(s.alta,AV)>30){ const last=p&&p.last; const dd=last?diesEntre(last,AV):null; if(dd===null||dd>21) out.push({t: dd===null?"No ha vingut a cap activitat":"Fa "+dd+" dies que no ve",c:"crit",k:"participacio"}); }
  const ab=absApats(s.id); if(ab>=2) out.push({t:ab+" absències als àpats en 14 dies",c:"crit",k:"apats"});
  return out;
}
const derivOberta = sid => D.derivacions.find(d=>d.soci===sid && d.estat!=="Tancada");
function estatPersona(s){
  if(s.baixa) return '<span class="chip">Baixa</span>';
  if(!can("seguiment","C")) return '<span class="chip good">Activa</span>';
  if(s.acollida && !s.acollida.completada) return '<span class="chip warn">En acollida</span>';
  const a=alertesDe(s); if(a.length) return '<span class="chip crit">'+esc(a[0].t)+'</span>';
  return '<span class="chip good">Activa</span>';
}
const fdata = s => new Date(s+"T12:00:00").toLocaleDateString("ca-ES",{day:"numeric",month:"short"});

/* ---------- Permisos ---------- */
const ROLS={admin:"Administració",direccio:"Coordinació",dinamitzador:"Dinamitzador/a",informador:"Informador/a",soci:"Persona usuària",ajuntament:"Ajuntament"};
const ROLK=["admin","direccio","dinamitzador","informador","ajuntament"];
// C consulta · E enregistra · M modifica · B esborra
const PERMS=[
  {g:"Persones",m:"persones",n:"Fitxa de la persona usuària",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CE",soci:"C",ajuntament:""},nota:"Informador/a: alta bàsica i consulta de contacte. Persona usuària: només la seva fitxa. Dinamitzador/a fa baixes, no esborra."},
  {g:"Persones",m:"seguiment",n:"Acollida, seguiments i derivacions",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"",soci:"",ajuntament:""},nota:"Dades sensibles: només l'equip tècnic."},
  {g:"Activitats",m:"activitats",n:"Programació d'activitats",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"C",soci:"C",ajuntament:""}},
  {g:"Activitats",m:"inscripcions",n:"Inscripcions i llista d'espera",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"CEM",ajuntament:""},nota:"Persona usuària: s'apunta i es desapunta ella mateixa."},
  {g:"Activitats",m:"llista",n:"Passar llista",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"",ajuntament:""}},
  {g:"Espais",m:"reserves",n:"Calendari i reserves de sales",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CE",soci:"",ajuntament:""}},
  {g:"Espais",m:"espais",n:"Crear i editar espais",p:{direccio:"CEMB",dinamitzador:"C",informador:"C",soci:"",ajuntament:""}},
  {g:"Serveis",m:"bar",n:"Bar: vendes",p:{direccio:"CEMB",dinamitzador:"C",informador:"CE",soci:"",ajuntament:""},nota:"Una venda cobrada no es modifica: es fa una devolució."},
  {g:"Serveis",m:"caixa",n:"Tancament de caixa del bar",p:{direccio:"CEM",dinamitzador:"C",informador:"CE",soci:"",ajuntament:""},nota:"Caixa tancada = bloquejada. Només Coordinació la reobre, amb motiu."},
  {g:"Serveis",m:"apats",n:"Àpats: comensals, arribada i pagament",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"CEM",ajuntament:""},nota:"Persona usuària: reserva i anul·la el seu dinar."},
  {g:"Serveis",m:"menu",n:"Àpats: menú",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"C",soci:"C",ajuntament:""}},
  {g:"Manteniment",m:"incidencies",n:"Incidències",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"",ajuntament:""}},
  {g:"Manteniment",m:"neteja",n:"Checklist de neteja",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"",ajuntament:""}},
  {g:"Manteniment",m:"inventari",n:"Inventari i revisions",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"C",soci:"",ajuntament:""}},
  {g:"Justificació",m:"informes",n:"Informes i indicadors",p:{direccio:"C",dinamitzador:"",informador:"",soci:"",ajuntament:"C"},nota:"Ajuntament: informes i llistats nominals. No veu seguiments ni dietes."},
  {g:"Justificació",m:"rebuts",n:"Rebuts d'activitats complementàries",p:{direccio:"CEMB",dinamitzador:"CEM",informador:"CEM",soci:"",ajuntament:"C"}},
  {g:"Justificació",m:"mes",n:"Tancament mensual",p:{direccio:"CEM",dinamitzador:"",informador:"",soci:"",ajuntament:"C"},nota:"Mes tancat = bloquejat. Només Coordinació el reobre, amb motiu."},
  {g:"Sistema",m:"inici",n:"Tauler d'inici",p:{direccio:"C",dinamitzador:"C",informador:"C",soci:"",ajuntament:""}},
  {g:"Sistema",m:"config",n:"Rols, avisos i registre de canvis",p:{direccio:"CEMB",dinamitzador:"",informador:"",soci:"",ajuntament:""}},
  {g:"Sistema",m:"usuaris",n:"Usuaris, perfils i contrasenyes",p:{direccio:"",dinamitzador:"",informador:"",soci:"",ajuntament:""},nota:"Només l'Administració dona d'alta usuaris, assigna perfils i casals i desactiva comptes."}
];
PERMS.forEach(r=>{ r.p.admin = r.m==="usuaris" ? "CEMB" : r.p.direccio; });
const PM=Object.fromEntries(PERMS.map(r=>[r.m,r]));
const can=(m,a)=>{ const r=PM[m]; return !!r && (r.p[S.rol]||"").includes(a); };
const ABAST={admin:"Tot, i la gestió d'usuaris",direccio:"Els dos casals",dinamitzador:"El seu casal",informador:"El seu casal",soci:"Només les seves dades",ajuntament:"Els dos casals, només consulta"};
const NAVMOD={inici:"inici",socis:"persones",seguiment:"seguiment",activitats:"activitats",sales:"reserves",bar:"bar",apats:"apats",manteniment:"incidencies",informes:"informes",config:"config",usuaris:"usuaris"};
const RULES=[
  ["#nouSoci,[data-go='socis-nou']","persones","E","h"],["#edSoci","persones","M","h"],["#delSoci","persones","B","h"],["#baixaSoci","persones","M","h"],
  [".sens","seguiment","C","h"],["#fsSeg,#fsDer,[data-sg],[data-dv]","seguiment","E","h"],["#fsAco,[data-ac]","seguiment","M","h"],["[data-dvst]","seguiment","M","d"],
  ["#novaAct","activitats","E","h"],["#delAct","activitats","B","h"],
  ["#insSoci,[data-ins],.modal [data-s],.modal [data-a]","inscripcions","E","h"],["[data-baixa],.modal [data-b]","inscripcions","M","h"],["[data-pl]","llista","E","d"],
  ["#gestSales","espais","C","h"],["#novaSala","espais","E","h"],["[data-eds]","espais","M","h"],["#delSala","espais","B","h"],
  ["#novaRes","reserves","E","h"],["[data-delres]","reserves","M","h"],
  ["[data-p],[data-p2],[data-m],#buida,[data-pay]","bar","E","d"],["#tancar","caixa","E","h"],["#reobrirCaixa","caixa","M","h"],
  ["#nouCom","apats","E","h"],["[data-vin],[data-pag],[data-anl]","apats","M","d"],["#edMenu","menu","M","h"],
  ["#novaInc,[data-reav]","incidencies","E","h"],["[data-ist]","incidencies","M","h"],["[data-delinc]","incidencies","B","h"],["#cfgAvis","config","M","h"],
  ["[data-nt]","neteja","E","d"],["#nouInv","inventari","E","h"],["[data-pvok]","inventari","M","h"],
  ["#rbPend","rebuts","C","h"],["[data-rbok]","rebuts","M","h"],["#tancarMes","mes","E","h"],["#reobrirMes","mes","M","h"],
  ["#apCfg","menu","M","h"],["#tancarDia","apats","M","h"],["#emetreRb","rebuts","E","h"]
];
function applyPerms(root){
  RULES.forEach(([sel,m,a,mode])=>{ if(can(m,a)) return; root.querySelectorAll(sel).forEach(el=>{ if(mode==="d"){ el.disabled=true; el.style.cursor="not-allowed"; el.title="El teu perfil només pot consultar"; } else el.hidden=true; }); });
}
function logCanvi(accio, detall, motiu){ D.registre.unshift({data:araIso(),rol:ROLS[S.rol],accio,detall,motiu:motiu||""}); }
function confirmMotiu(titol, text, boto, onOk){
  overlay(hdr(titol,"Cal indicar el motiu")+'<p style="margin:0">'+esc(text)+'</p><form class="form" id="fmo" novalidate><div class="field full"><label for="mo_t">Motiu</label><textarea id="mo_t" rows="2" placeholder="Ex.: registre duplicat"></textarea></div><p class="note full" style="margin:0">Quedarà anotat al registre de canvis amb la data i el perfil.</p><div class="full alert" id="moerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn danger" type="submit">'+esc(boto)+'</button></div></form>');
  $("#fmo").onsubmit=e=>{ e.preventDefault(); const m=$("#mo_t").value.trim(); if(m.length<4){ const er=$("#moerr"); er.textContent="Explica breument el motiu."; er.hidden=false; return; } closeOverlay(); onOk(m); };
}
/* ---------- UI comuna ---------- */
let toastT;
function toast(msg){ let t=$(".toast"); if(!t){ t=document.createElement("div"); t.className="toast"; t.setAttribute("role","status"); document.body.appendChild(t); } t.textContent=msg; t.hidden=false; clearTimeout(toastT); toastT=setTimeout(()=>t.hidden=true,2600); }
function closeOverlay(){ const o=$(".scrim"); if(o){ o.remove(); setTimeout(()=>aplicarRemot(),0); } }
function overlay(html, drawer){
  closeOverlay();
  const s=document.createElement("div"); s.className="scrim"+(drawer?" drawer-scrim":"");
  s.innerHTML = drawer ? '<aside class="drawer" role="dialog" aria-modal="true">'+html+'</aside>' : '<div class="modal" role="dialog" aria-modal="true">'+html+'</div>';
  s.addEventListener("click", e=>{ if(e.target===s || e.target.closest("[data-close]")) closeOverlay(); });
  document.body.appendChild(s); applyPerms(s);
  const f=s.querySelector("input:not([disabled]),select:not([disabled]),button:not(.x):not([hidden])"); if(f) f.focus();
  return s;
}
document.addEventListener("keydown", e=>{ if(e.key==="Escape") closeOverlay(); });
const eixChip = e => '<span class="chip eix-'+e+'"><span class="dot"></span>'+EIX_C[e]+'</span>';
const quotaChip = q => q==="corrent" ? '<span class="chip good">Al corrent</span>' : '<span class="chip warn">Pendent</span>';
const hdr = (title, sub, extra) => '<div class="m-h"><div>'+(sub?'<div class="eyebrow">'+esc(sub)+'</div>':'')+'<h2>'+esc(title)+'</h2></div><div style="display:flex;gap:8px;align-items:center">'+(extra||'')+'<button class="x" data-close aria-label="Tancar">'+ICON.x+'</button></div></div>';

/* ---------- Shell ---------- */
const NAV = [
  {id:"inici",t:"Inici",i:"home"},{id:"socis",t:"Persones",i:"users"},{id:"seguiment",t:"Seguiment",i:"heart"},{id:"activitats",t:"Activitats",i:"act"},{id:"sales",t:"Sales",i:"room"},{id:"bar",t:"Bar",i:"cup"},{id:"apats",t:"Àpats",i:"plate"},{id:"manteniment",t:"Manteniment",i:"tool"},{id:"informes",t:"Informes",i:"chart"},{id:"config",t:"Rols",i:"cog"},{id:"usuaris",t:"Usuaris",i:"key"}
];
function render(){
  saveUI();
  const root=$("#root");
  if(!D||!ME) return;
  if((S.rol==="dinamitzador"||S.rol==="informador")) S.casal=ME.casal||"c1";
  if(S.rol==="ajuntament"){ S.casal="tots"; S.view="informes"; }
  const nav = NAV.filter(n=> can(NAVMOD[n.id],"C") && (n.id!=="apats" || S.casal==="tots" || S.casal==="c2"));
  if(!nav.find(n=>n.id===S.view)) S.view=nav[0].id;
  root.innerHTML = '<div class="app"><nav class="side" aria-label="Menú principal"><div class="brand"><div class="brand-mark">AM</div><div><b>Casals</b><small>Sant Pere de Ribes</small></div></div><div class="nav">'+
    nav.map(n=>'<button data-nav="'+n.id+'"'+(S.view===n.id?' aria-current="page"':'')+'>'+ICON[n.i]+'<span>'+n.t+'</span></button>').join("")+
    '</div><div class="side-foot">Gestió: Fundació Ave Maria<br>Titularitat: Ajuntament de Sant Pere de Ribes<br>Versió 1.0</div></nav><div class="main">'+topbar()+'<main class="content" id="view">'+VIEWS[S.view]()+'</main></div></div>';
  root.querySelectorAll("[data-nav]").forEach(b=>b.onclick=()=>{ S.view=b.dataset.nav; if(S.view==="usuaris") S._usuaris=null; render(); window.scrollTo(0,0); });
  bindTop(); BIND[S.view] && BIND[S.view](); applyPerms(root);
}
function topbar(){
  const fix=["dinamitzador","informador"].includes(S.rol);
  let casalEl='';
  if(S.rol!=="ajuntament"){
    if(fix) casalEl='<span class="chip">'+esc((casal(S.casal)||{nom:""}).nom)+'</span>';
    else casalEl='<select class="select" id="selCasal" aria-label="Casal"><option value="tots"'+(S.casal==="tots"?' selected':'')+'>Tots els casals</option>'+D.casals.map(c=>'<option value="'+c.id+'"'+(S.casal===c.id?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select>';
  }
  const nom=ME.nom||ME.email, ini=(nom.split(/\s+/).map(x=>x[0]).join("").slice(0,2)||"?").toUpperCase();
  return '<header class="top"><div class="who"><span class="avatar">'+esc(ini)+'</span><div>'+esc(nom)+'<small>'+esc(ROLS[S.rol]||"")+'</small></div></div><div class="grow"></div><span class="chip sync good" id="sync">Desat</span>'+casalEl+'<button class="btn sm ghost" id="sortir">Sortir</button></header>';
}
function bindTop(){
  const sc=$("#selCasal"); if(sc) sc.onchange=()=>{ S.casal=sc.value; S.sala=null; render(); };
  const so=$("#sortir"); if(so) so.onclick=sortir;
}

/* ---------- Vistes ---------- */
const VIEWS = {}, BIND = {};

VIEWS.inici = () => {
  const socis=D.socis.filter(inCasal), acts=D.activitats.filter(inCasal);
  const places=acts.reduce((t,a)=>t+a.places,0), ins=acts.reduce((t,a)=>t+a.inscrits.length,0);
  const espera=acts.reduce((t,a)=>t+a.espera.length,0), alrt=socis.filter(s=>alertesDe(s).length).length, acol=socis.filter(s=>s.acollida&&!s.acollida.completada).length;
  const di=avuiIdx(); const avui=acts.filter(a=>a.dia===di).sort((a,b)=>mins(a.inici)-mins(b.inici));
  const plenes=acts.filter(a=>a.inscrits.length>=a.places).sort((a,b)=>b.espera.length-a.espera.length);
  const nomCasal = S.casal==="tots" ? "Tots els casals" : casal(S.casal).nom;
  const perEix = Object.keys(EIXOS).map(e=>{ const x=acts.filter(a=>a.eix===e); return {e, n:x.length, ins:x.reduce((t,a)=>t+a.inscrits.length,0)}; });
  const maxE = Math.max(1,...perEix.map(p=>p.ins));
  return '<div class="head"><div><div class="eyebrow">'+esc(nomCasal)+'</div><h1>Bon dia! Així va la setmana</h1><p>'+(esAvuiLaborable()?'Avui és '+DIES[di].toLowerCase():'Cap de setmana · mostrem el dilluns')+'.</p></div><button class="btn primary" data-go="socis-nou">'+ICON.plus+'Nova persona</button></div>'+
  '<section class="kpis" aria-label="Indicadors">'+
    kpi("Persones usuàries", socis.length, D.casals.length>1&&S.casal==="tots" ? D.casals.map(c=>D.socis.filter(s=>s.casal===c.id).length+" "+c.curt).join(" · ") : "")+
    kpi("Ocupació de places", Math.round(ins/Math.max(1,places)*100)+"%", ins+" de "+places+" places")+
    kpi("A la llista d'espera", espera, plenes.length+" activitats plenes")+
    kpi("Alertes de seguiment", alrt, acol+" persones en acollida")+
  '</section>'+ serveisAvui() +
  '<div class="grid2"><section class="panel"><div class="panel-h"><h2>'+(esAvuiLaborable()?'Avui':'Dilluns')+' al casal</h2><span class="chip">'+avui.length+' activitats</span></div><div class="list">'+
    (avui.length? avui.map(a=>'<div class="row"><div class="time num">'+a.inici+'</div><div class="t"><b>'+esc(a.nom)+'</b><span>'+esc(sala(a.sala).nom)+' · '+a.inscrits.length+'/'+a.places+' inscrits</span></div>'+eixChip(a.eix)+'</div>').join("") : '<div class="empty">No hi ha activitats programades.</div>')+
  '</div></section><section class="panel"><div class="panel-h"><h2>Participació per eix</h2></div><div class="list">'+
    perEix.map(p=>'<div class="row" style="flex-wrap:wrap;gap:8px"><div class="t" style="flex-basis:100%;display:flex;justify-content:space-between"><b style="display:inline">'+EIXOS[p.e]+'</b><span class="num">'+p.ins+' inscripcions</span></div><div class="bar" style="flex:1"><i style="width:'+(p.ins/maxE*100)+'%;background:var(--'+p.e+')"></i></div></div>').join("")+
  '</div></section></div>'+
  '<section class="panel"><div class="panel-h"><h2>Activitats plenes</h2><button class="btn sm ghost" data-go="activitats">Veure totes</button></div><div class="list">'+
    (plenes.length? plenes.map(a=>'<div class="row"><div class="t"><b>'+esc(a.nom)+'</b><span>'+DIES[a.dia]+' '+a.inici+' · '+esc(sala(a.sala).nom)+'</span></div><span class="chip warn">'+a.espera.length+' en espera</span></div>').join("") : '<div class="empty">Encara queden places a totes les activitats.</div>')+
  '</div></section>';
};
function serveisAvui(){
  const cs=D.casals.filter(inCasal), avui=isoAvui(), di=avuiIdx();
  const rows=cs.map(c=>{ const r=resumBar(c.id,avui), t=D.bar.tancaments.find(x=>x.casal===c.id&&x.data===avui);
    return '<div class="row"><span class="avatar" style="background:var(--surface2);color:var(--ink)">'+ICON.cup.replace('<svg','<svg width="18" height="18"')+'</span><div class="t"><b>Bar · '+esc(c.curt)+'</b><span>'+r.v.length+' vendes · '+eur(r.ef)+' efectiu · '+eur(r.tg)+' targeta</span></div><span class="num" style="font-weight:700">'+eur(r.tot)+'</span>'+(t?'<span class="chip good">Tancada</span>':'<span class="chip">Oberta</span>')+'</div>'; }).join("");
  let ap=''; if(cs.find(c=>c.id==="c2")){ const di7=avuiIdx7(); const rs=D.apats.reserves.filter(r=>r.dia===di7);
    ap='<div class="row"><span class="avatar" style="background:var(--surface2);color:var(--ink)">'+ICON.plate.replace('<svg','<svg width="18" height="18"')+'</span><div class="t"><b>Àpats amb companyia · Roquetes</b><span>'+esc(D.apats.menus[di7].segon)+' · '+rs.filter(r=>!r.pagat).length+' pendents de pagar</span></div><span class="num" style="font-weight:700">'+rs.length+' / '+D.apats.places+'</span><span class="chip">comensals</span></div>'; }
  return '<section class="panel"><div class="panel-h"><h2>Serveis '+(esAvuiLaborable()?"d'avui":"del dilluns")+'</h2><div style="display:flex;gap:8px"><button class="btn sm ghost" data-go="bar">Bar</button>'+(ap?'<button class="btn sm ghost" data-go="apats">Àpats</button>':'')+'</div></div><div class="list">'+rows+ap+'</div></section>';
}
const kpi=(l,v,s)=>'<div class="kpi"><div class="label">'+l+'</div><div class="val num">'+v+'</div>'+(s?'<div class="sub">'+esc(s)+'</div>':'')+'</div>';
BIND.inici = () => { document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>{ if(b.dataset.go==="socis-nou"){ formSoci(); return; } S.view=b.dataset.go; render(); }); };

VIEWS.socis = () => {
  const q=S.q.trim().toLowerCase();
  const fk=s=> s.baixa ? "baixa" : s.acollida&&!s.acollida.completada ? "acollida" : (alertesDe(s).length ? "alerta" : "activa");
  const list=D.socis.filter(inCasal).filter(s=> (S.fq==="baixa" ? s.baixa : !s.baixa && (S.fq==="tots"||fk(s)===S.fq)) && (!q || (nomComplet(s)+" "+s.num+" "+s.tel).toLowerCase().includes(q)));
  return '<div class="head"><div><h1>Persones usuàries</h1><p>'+D.socis.filter(inCasal).filter(x=>!x.baixa).length+' persones actives'+(S.casal!=="tots"?' a '+esc(casal(S.casal).nom):'')+'.</p></div><button class="btn primary" id="nouSoci">'+ICON.plus+'Nova persona</button></div>'+
  '<div class="toolbar"><label class="search">'+ICON.search+'<input id="q" type="search" placeholder="Cerca per nom, número o telèfon" value="'+esc(S.q)+'" aria-label="Cerca persones"></label>'+
  '<div class="filters" role="group" aria-label="Estat">'+[["tots","Totes"],["activa","Actives"]].concat(can("seguiment","C")?[["acollida","En acollida"],["alerta","Amb alerta"]]:[]).concat([["baixa","Baixes"]]).map(f=>'<button data-fq="'+f[0]+'" aria-pressed="'+(S.fq===f[0])+'">'+f[1]+'</button>').join("")+'</div></div>'+
  '<div class="tablewrap"><table><thead><tr><th>Persona</th><th>Núm.</th><th>Edat</th><th>Telèfon</th>'+(S.casal==="tots"?'<th>Casal</th>':'')+'<th>Activitats</th><th>Estat</th></tr></thead><tbody id="tb">'+
  (list.length? list.map(s=>'<tr class="click" data-soci="'+s.id+'" tabindex="0"><td><div class="who"><span class="avatar">'+inicials(s)+'</span><div>'+esc(nomComplet(s))+'<small>'+(s.email?esc(s.email):'Sense correu')+'</small></div></div></td><td class="num">'+s.num+'</td><td class="num">'+edat(s)+'</td><td class="num">'+esc(s.tel)+'</td>'+(S.casal==="tots"?'<td>'+esc(casal(s.casal).nom)+'</td>':'')+'<td class="num">'+activitatsDe(s.id).length+(esperaDe(s.id).length?' <span class="chip warn">+'+esperaDe(s.id).length+' espera</span>':'')+'</td><td>'+estatPersona(s)+'</td></tr>').join("") : '<tr><td colspan="7" class="empty" style="padding:20px 16px">Cap persona coincideix amb la cerca.</td></tr>')+
  '</tbody></table></div>';
};
BIND.socis = () => {
  const q=$("#q"); q.oninput=()=>{ S.q=q.value; const pos=q.selectionStart; render(); const n=$("#q"); n.focus(); n.setSelectionRange(pos,pos); };
  document.querySelectorAll("[data-fq]").forEach(b=>b.onclick=()=>{ S.fq=b.dataset.fq; render(); });
  $("#nouSoci").onclick=()=>formSoci();
  document.querySelectorAll("[data-soci]").forEach(r=>{ r.onclick=()=>fitxaSoci(r.dataset.soci); r.onkeydown=e=>{ if(e.key==="Enter") fitxaSoci(r.dataset.soci); }; });
};

function fitxaSoci(id){
  const s=soci(id); const acts=activitatsDe(id), esp=esperaDe(id);
  const aut=[["imatge","Drets d'imatge"],["dades","Tractament de dades"],["domiciliacio","Domiciliació bancària"]];
  const ac=s.acollida||{completada:true}, pp=participacio()[id], al=alertesDe(s), segs=D.seguiments.filter(x=>x.soci===id).sort((a,b)=>b.data.localeCompare(a.data)), dv=derivOberta(id);
  const html = hdr(nomComplet(s), "Persona usuària · núm. "+s.num, '<button class="btn sm" id="edSoci">Editar</button>')+
  '<div class="who"><span class="avatar" style="width:56px;height:56px;font-size:18px">'+inicials(s)+'</span><div><b>'+edat(s)+' anys</b><small>'+esc(casal(s.casal).nom)+' · alta '+new Date(s.alta).toLocaleDateString("ca-ES",{month:"long",year:"numeric"})+'</small></div><div style="margin-left:auto">'+estatPersona(s)+'</div></div>'+
  (s.baixa?'<div class="note">Baixa des del '+fdata(s.baixa.data)+'. Motiu: '+esc(s.baixa.motiu)+'</div>':'')+
  (al.length?'<div class="sens" style="display:flex;flex-direction:column;gap:6px">'+al.map(a=>'<div class="alert" style="background:var(--'+(a.c==="crit"?"crit":"warn")+'-soft);color:var(--'+(a.c==="crit"?"crit":"warn")+')">'+esc(a.t)+'</div>').join("")+'</div>':'')+
  '<div class="sens" style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" id="fsSeg">Registrar seguiment</button>'+(dv?'<span class="chip warn">Derivada a '+esc(dv.a)+' · '+esc(dv.estat)+'</span>':'<button class="btn sm" id="fsDer">Derivar</button>')+(!ac.completada?'<button class="btn sm primary" id="fsAco">Acollida</button>':'')+'</div>'+
  '<div class="sens"><div class="section-t">Participació</div><dl class="dl" style="margin-top:8px"><dt>Darrera assistència</dt><dd>'+(pp&&pp.last?fdata(pp.last)+' ('+diesEntre(pp.last,isoAvui())+' dies)':'Cap registrada')+'</dd><dt>Assistències 30 dies</dt><dd class="num">'+(pp?pp.n30:0)+'</dd><dt>Membre de l\'entitat</dt><dd>'+(s.entitat?'Sí':'No')+'</dd><dt>Viu sol/a</dt><dd>'+(s.viuSol?'Sí':'No')+'</dd></dl></div>'+
  (!ac.completada?'<div class="sens"><div class="section-t">Acollida</div>'+passosAcollida(s)+'</div>':'')+
  '<div class="sens"><div class="section-t">Seguiments ('+segs.length+')</div><div class="list">'+(segs.slice(0,4).map(g=>'<div class="row"><div class="t"><b>'+esc(g.tipus)+' · '+fdata(g.data)+'</b><span style="white-space:normal">'+esc(g.nota)+'</span></div></div>').join("")||'<div class="empty">Sense seguiments registrats.</div>')+'</div></div>'+
  '<div><div class="section-t">Contacte</div><dl class="dl" style="margin-top:8px"><dt>Telèfon</dt><dd class="num">'+esc(s.tel)+'</dd><dt>Correu</dt><dd>'+(s.email?esc(s.email):'—')+'</dd><dt>Persona de referència</dt><dd>'+(s.contacte?esc(s.contacte):'—')+'</dd></dl></div>'+
  '<div><div class="section-t">Autoritzacions</div><div style="display:flex;flex-direction:column;gap:8px;margin-top:8px">'+aut.map(a=>'<div style="display:flex;justify-content:space-between"><span>'+a[1]+'</span>'+(s.aut[a[0]]?'<span class="chip good">Signada</span>':'<span class="chip">No</span>')+'</div>').join("")+'</div></div>'+
  (s.obs?'<div><div class="section-t">Observacions per a l\'activitat</div><p class="note" style="margin:8px 0 0">'+esc(s.obs)+'</p></div>':'')+
  '<div><div class="section-t">Activitats ('+acts.length+')</div><div class="list" style="margin-top:4px">'+(acts.length? acts.map(a=>'<div class="row"><div class="t"><b>'+esc(a.nom)+'</b><span>'+DIES[a.dia]+' '+a.inici+'</span></div><button class="btn sm ghost danger" data-baixa="'+a.id+'">Donar de baixa</button></div>').join("") : '<div class="empty">Encara no fa cap activitat.</div>')+
  esp.map(a=>'<div class="row"><div class="t"><b>'+esc(a.nom)+'</b><span>Llista d\'espera · posició '+(a.espera.indexOf(id)+1)+'</span></div><span class="chip warn">Espera</span></div>').join("")+'</div></div>'+
  '<button class="btn" id="insSoci">'+ICON.plus+'Inscriure a una activitat</button>'+
  '<p class="note" style="margin:0">Les dades de salut no es guarden aquí. Només observacions pràctiques per a l\'activitat, amb consentiment.</p>';
  const o=overlay(html,true);
  o.querySelectorAll("[data-baixa]").forEach(b=>b.onclick=()=>{ const a=D.activitats.find(x=>x.id===b.dataset.baixa); const p=baixa(a,id); toast(p? "Baixa feta. "+soci(p).nom+" passa de la llista d'espera a inscrit/a." : "Baixa feta."); render(); fitxaSoci(id); });
  o.querySelector("#edSoci").onclick=()=>formSoci(id);
  o.querySelector("#fsSeg").onclick=()=>formSeguiment(id);
  const fd=o.querySelector("#fsDer"); if(fd) fd.onclick=()=>formDerivacio(id);
  const fa=o.querySelector("#fsAco"); if(fa) fa.onclick=()=>formAcollida(id);
  o.querySelector("#insSoci").onclick=()=>{
    const disp=D.activitats.filter(a=>a.casal===s.casal && !a.inscrits.includes(id) && !a.espera.includes(id));
    overlay(hdr("Inscriure "+s.nom,"Tria l'activitat")+'<div class="list">'+disp.map(a=>'<div class="row"><div class="t"><b>'+esc(a.nom)+'</b><span>'+DIES[a.dia]+' '+a.inici+' · '+a.inscrits.length+'/'+a.places+'</span></div><button class="btn sm '+(a.inscrits.length<a.places?'primary':'')+'" data-a="'+a.id+'">'+(a.inscrits.length<a.places?'Inscriure':'A l\'espera')+'</button></div>').join("")+'</div>');
    document.querySelectorAll(".modal [data-a]").forEach(b=>b.onclick=()=>{ const a=D.activitats.find(x=>x.id===b.dataset.a); const r=inscriure(a,id); toast(r==="inscrit"? s.nom+" inscrit/a a "+a.nom+"." : s.nom+" a la llista d'espera (posició "+a.espera.length+")."); render(); fitxaSoci(id); });
  };
}

function formSoci(id){
  const s = id ? soci(id) : {nom:"",cognoms:"",naix:"1950-01-01",tel:"",email:"",contacte:"",casal:S.casal==="tots"?"c1":S.casal,entitat:false,viuSol:false,aut:{imatge:false,dades:true,domiciliacio:false},obs:""};
  const f=(k,l,t,full)=>'<div class="field'+(full?' full':'')+'"><label for="f_'+k+'">'+l+'</label><input id="f_'+k+'" type="'+(t||"text")+'" value="'+esc(s[k])+'"></div>';
  overlay(hdr(id?"Editar persona":"Nova persona usuària", id?"Núm. "+s.num:"Alta")+
  '<form class="form" id="fs" novalidate>'+f("nom","Nom")+f("cognoms","Cognoms")+f("naix","Data de naixement","date")+f("tel","Telèfon","tel")+f("email","Correu (opcional)","email",true)+f("contacte","Persona de referència (opcional)","text",true)+
  '<div class="field"><label for="f_casal">Casal</label><select id="f_casal">'+D.casals.map(c=>'<option value="'+c.id+'"'+(s.casal===c.id?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select></div>'+
  '<label class="check" style="align-self:end;padding-bottom:10px"><input type="checkbox" id="f_entitat"'+(s.entitat?' checked':'')+'>Membre de l\'entitat del casal</label>'+
  '<label class="check full"><input type="checkbox" id="f_viusol"'+(s.viuSol?' checked':'')+'>Viu sol/a <span style="color:var(--muted);font-size:13px">(serveix per detectar solitud; cal ampliar l\'Annex 4)</span></label>'+
  '<div class="full" style="display:flex;flex-direction:column;gap:8px"><span class="field"><label>Autoritzacions</label></span>'+
  [["imatge","Drets d'imatge"],["dades","Tractament de dades personals"],["domiciliacio","Domiciliació bancària de les tarifes"]].map(a=>'<label class="check"><input type="checkbox" id="f_a_'+a[0]+'"'+(s.aut[a[0]]?' checked':'')+'>'+a[1]+'</label>').join("")+'</div>'+
  '<div class="field full"><label for="f_obs">Observacions per a l\'activitat (opcional)</label><textarea id="f_obs" rows="2" placeholder="Ex.: necessita seure a prop de la porta">'+esc(s.obs)+'</textarea></div>'+
  '<div class="full alert" id="ferr" hidden></div><div class="m-f full">'+(id?'<button type="button" class="btn danger" id="delSoci" style="margin-right:auto">Esborrar</button>'+(s.baixa?'<button type="button" class="btn" id="altaSoci">Reactivar</button>':'<button type="button" class="btn" id="baixaSoci">Donar de baixa</button>'):'')+'<button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">'+(id?"Desar canvis":"Donar d'alta")+'</button></div></form>');
  const bs=$("#baixaSoci"); if(bs) bs.onclick=()=>confirmMotiu("Donar de baixa "+s.nom,"Deixarà d'aparèixer a les llistes i sortirà de totes les activitats. Les dades es conserven.","Donar de baixa",m=>{ s.baixa={data:isoAvui(),motiu:m}; D.activitats.forEach(a=>{ if(a.inscrits.includes(id)||a.espera.includes(id)) baixa(a,id); }); logCanvi("Baixa de persona",nomComplet(s),m); save(); toast(s.nom+" és baixa."); render(); });
  const as=$("#altaSoci"); if(as) as.onclick=()=>{ delete s.baixa; logCanvi("Reactivació de persona",nomComplet(s)); save(); closeOverlay(); toast(s.nom+" torna a estar activa."); render(); };
  const ds=$("#delSoci"); if(ds) ds.onclick=()=>confirmMotiu("Esborrar "+nomComplet(s),"S'esborren la fitxa, les inscripcions, els seguiments i les reserves. No es pot desfer. Fes-ho només si la persona exerceix el dret de supressió o és un registre duplicat.","Esborrar definitivament",m=>{
    D.activitats.forEach(a=>{ a.inscrits=a.inscrits.filter(x=>x!==id); a.espera=a.espera.filter(x=>x!==id); }); D.seguiments=D.seguiments.filter(x=>x.soci!==id); D.derivacions=D.derivacions.filter(x=>x.soci!==id); D.apats.reserves=D.apats.reserves.filter(x=>x.soci!==id);
    D.socis=D.socis.filter(x=>x.id!==id); logCanvi("Esborrat de persona","Núm. "+s.num,m); save(); toast("Persona esborrada."); render(); });
  $("#fs").onsubmit=e=>{ e.preventDefault();
    const v=k=>$("#f_"+k).value.trim();
    if(!v("nom")||!v("cognoms")||!v("tel")){ const er=$("#ferr"); er.textContent="Cal omplir nom, cognoms i telèfon."; er.hidden=false; return; }
    if(!$("#f_a_dades").checked){ const er=$("#ferr"); er.textContent="Sense l'autorització de tractament de dades no es pot donar d'alta."; er.hidden=false; return; }
    const obj = id ? s : {id:uid("p"), num:Math.max(...D.socis.map(x=>x.num))+1, alta:isoAvui(), acollida:{completada:false,entrevista:null,benvinguda:false,referent:null,revisio:null,interessos:[]}};
    Object.assign(obj,{nom:v("nom"),cognoms:v("cognoms"),naix:v("naix")||"1950-01-01",tel:v("tel"),email:v("email"),contacte:v("contacte"),casal:v("casal"),entitat:$("#f_entitat").checked,viuSol:$("#f_viusol").checked,obs:v("obs"),
      aut:{imatge:$("#f_a_imatge").checked,dades:true,domiciliacio:$("#f_a_domiciliacio").checked}});
    if(!id) D.socis.unshift(obj); save(); closeOverlay();
    toast(id? "Canvis desats." : obj.nom+" té el núm. "+obj.num+". Comença l'acollida."); if(!id){ S.view="socis"; } render(); if(id) fitxaSoci(id);
  };
}

VIEWS.activitats = () => {
  const acts=D.activitats.filter(inCasal).filter(a=>S.eix==="tots"||a.eix===S.eix).sort((a,b)=>a.dia-b.dia||mins(a.inici)-mins(b.inici));
  return '<div class="head"><div><h1>Activitats</h1><p>Programació setmanal per eixos d\'envelliment actiu.</p></div><button class="btn primary" id="novaAct">'+ICON.plus+'Nova activitat</button></div>'+
  '<div class="filters" role="group" aria-label="Eix">'+[["tots","Tots els eixos"]].concat(Object.entries(EIX_C)).map(f=>'<button data-eix="'+f[0]+'" aria-pressed="'+(S.eix===f[0])+'">'+f[1]+'</button>').join("")+'</div>'+
  '<div class="cards">'+acts.map(a=>{ const full=a.inscrits.length>=a.places, pct=Math.min(100,a.inscrits.length/a.places*100);
    return '<article class="card"><div style="display:flex;justify-content:space-between;gap:8px;align-items:flex-start"><h3>'+esc(a.nom)+'</h3>'+eixChip(a.eix)+'</div>'+
    '<div class="meta"><span>'+DIES[a.dia]+' · '+a.inici+'–'+a.fi+'</span><span>'+esc(sala(a.sala).nom)+(S.casal==="tots"?' · '+esc(casal(a.casal).nom):'')+'</span><span>'+esc(a.prof)+' · '+(a.preu?eur(a.preu)+' / mes':'Gratuïta')+(a.comp?' · Complementària':'')+'</span></div>'+
    '<div><div class="places"><span class="num"><b>'+a.inscrits.length+'</b> / '+a.places+' places</span>'+(full?'<span class="chip warn">Plena · '+a.espera.length+' en espera</span>':'<span style="color:var(--muted)">'+(a.places-a.inscrits.length)+' lliures</span>')+'</div><div class="bar'+(full?' full':'')+'" style="margin-top:8px"><i style="width:'+pct+'%"></i></div></div>'+
    '<div class="actions"><button class="btn sm primary" data-ins="'+a.id+'">Inscriure</button><button class="btn sm" data-llista="'+a.id+'">Llista</button></div></article>'; }).join("")+'</div>';
};
BIND.activitats = () => {
  document.querySelectorAll("[data-eix]").forEach(b=>b.onclick=()=>{ S.eix=b.dataset.eix; render(); });
  document.querySelectorAll("[data-ins]").forEach(b=>b.onclick=()=>inscriureModal(b.dataset.ins));
  document.querySelectorAll("[data-llista]").forEach(b=>b.onclick=()=>llistaAct(b.dataset.llista));
  $("#novaAct").onclick=()=>formAct();
};
function inscriureModal(aid, q){
  const a=D.activitats.find(x=>x.id===aid); q=q||"";
  const cand=D.socis.filter(s=>s.casal===a.casal && !a.inscrits.includes(s.id) && !a.espera.includes(s.id) && (!q||nomComplet(s).toLowerCase().includes(q.toLowerCase())));
  const full=a.inscrits.length>=a.places;
  overlay(hdr("Inscriure a "+a.nom, DIES[a.dia]+" "+a.inici)+(full?'<div class="note">Activitat plena. Les noves inscripcions van a la llista d\'espera i entren automàticament quan algú es dona de baixa.</div>':'<div class="note">Queden '+(a.places-a.inscrits.length)+' places.</div>')+
  '<label class="search">'+ICON.search+'<input id="qi" type="search" placeholder="Cerca soci" value="'+esc(q)+'" aria-label="Cerca soci"></label><div class="list">'+
  (cand.slice(0,40).map(s=>'<div class="row"><div class="who" style="flex:1"><span class="avatar">'+inicials(s)+'</span><div>'+esc(nomComplet(s))+'<small>Núm. '+s.num+'</small></div></div><button class="btn sm '+(full?'':'primary')+'" data-s="'+s.id+'">'+(full?'A l\'espera':'Inscriure')+'</button></div>').join("")||'<div class="empty">No hi ha socis per inscriure.</div>')+'</div>');
  const qi=$("#qi"); qi.oninput=()=>{ const p=qi.selectionStart; inscriureModal(aid, qi.value); const n=$("#qi"); n.focus(); n.setSelectionRange(p,p); };
  document.querySelectorAll(".modal [data-s]").forEach(b=>b.onclick=()=>{ const s=soci(b.dataset.s); const r=inscriure(a,s.id); toast(r==="inscrit"? s.nom+" inscrit/a." : s.nom+" a la llista d'espera (posició "+a.espera.length+")."); render(); inscriureModal(aid, $("#qi")?$("#qi").value:""); });
}
function darreraSessio(a){ let d=isoAvui(); for(let i=0;i<7;i++){ if(wd(d)===a.dia) return d; d=addDays(d,-1); } return d; }
function llistaAct(aid){
  const a=D.activitats.find(x=>x.id===aid); const ses=darreraSessio(a), key=a.id+"|"+ses, pres=D.assist[key]||[];
  overlay(hdr(a.nom, DIES[a.dia]+" "+a.inici+"–"+a.fi+" · "+sala(a.sala).nom)+
  (can("activitats","B")?'<div style="display:flex;justify-content:flex-end"><button class="btn sm ghost danger" id="delAct">Esborrar activitat</button></div>':'')+
  '<div class="note">Passar llista de la sessió de '+DIES[a.dia].toLowerCase()+' '+fdata(ses)+': '+pres.length+' de '+a.inscrits.length+' presents.</div>'+
  '<div><div class="section-t">Inscrits ('+a.inscrits.length+'/'+a.places+')</div><div class="list">'+(a.inscrits.map((id,i)=>{const s=soci(id); const hi=pres.includes(id); return '<div class="row"><span class="num" style="width:22px;color:var(--muted)">'+(i+1)+'</span><div class="t"><b>'+esc(nomComplet(s))+'</b><span class="num">'+esc(s.tel)+'</span></div><button class="tog" data-pl="'+id+'" aria-pressed="'+hi+'">'+(hi?'Present':'Absent')+'</button><button class="btn sm ghost danger" data-b="'+id+'">Baixa</button></div>';}).join("")||'<div class="empty">Encara no hi ha inscrits.</div>')+'</div></div>'+
  '<div><div class="section-t">Llista d\'espera ('+a.espera.length+')</div><div class="list">'+(a.espera.map((id,i)=>{const s=soci(id); return '<div class="row"><span class="chip warn num">'+(i+1)+'</span><div class="t"><b>'+esc(nomComplet(s))+'</b><span>Entrarà quan quedi una plaça</span></div><button class="btn sm ghost" data-b="'+id+'">Treure</button></div>';}).join("")||'<div class="empty">Ningú en espera.</div>')+'</div></div>');
  document.querySelectorAll(".modal [data-b]").forEach(b=>b.onclick=()=>{ const p=baixa(a,b.dataset.b); toast(p? soci(p).nom+" entra des de la llista d'espera." : "Fet."); render(); llistaAct(aid); });
  const da=$("#delAct"); if(da) da.onclick=()=>confirmMotiu("Esborrar "+a.nom,"Se n'esborren les inscripcions i la llista d'espera. Si només s'atura, millor no esborrar-la.","Esborrar",m=>{ D.activitats=D.activitats.filter(x=>x.id!==a.id); D.rebuts=D.rebuts.filter(r=>r.act!==a.id||D.mesosTancats[r.mes]); logCanvi("Esborrat d'activitat",a.nom+" · "+casal(a.casal).curt,m); save(); toast("Activitat esborrada."); render(); });
  document.querySelectorAll(".modal [data-pl]").forEach(b=>b.onclick=()=>{ const arr=D.assist[key]||(D.assist[key]=[]); const x=b.dataset.pl; const k=arr.indexOf(x); if(k>=0) arr.splice(k,1); else arr.push(x); save(); llistaAct(aid); });
}
function formAct(){
  const cs = S.casal==="tots" ? "c1" : S.casal;
  const ss = D.sales.filter(s=>s.casal===cs);
  if(!ss.length){ toast("Primer crea un espai a "+casal(cs).nom+" (Sales → Gestionar espais)."); return; }
  overlay(hdr("Nova activitat", casal(cs).nom)+'<form class="form" id="fa" novalidate>'+
  '<div class="field full"><label for="a_nom">Nom</label><input id="a_nom" placeholder="Ex.: Pilates suau"></div>'+
  '<div class="field"><label for="a_eix">Eix</label><select id="a_eix">'+Object.entries(EIXOS).map(e=>'<option value="'+e[0]+'">'+e[1]+'</option>').join("")+'</select></div>'+
  '<div class="field"><label for="a_dia">Dia</label><select id="a_dia">'+DIES.map((d,i)=>'<option value="'+i+'">'+d+'</option>').join("")+'</select></div>'+
  '<div class="field"><label for="a_ini">Inici</label><input id="a_ini" type="time" value="10:00" step="900"></div>'+
  '<div class="field"><label for="a_fi">Fi</label><input id="a_fi" type="time" value="11:00" step="900"></div>'+
  '<div class="field"><label for="a_sala">Sala</label><select id="a_sala">'+ss.map(s=>'<option value="'+s.id+'">'+esc(s.nom)+' ('+s.aforament+')</option>').join("")+'</select></div>'+
  '<div class="field"><label for="a_pl">Places</label><input id="a_pl" type="number" min="1" value="15"></div>'+
  '<div class="field"><label for="a_prof">Qui la fa</label><input id="a_prof" placeholder="Monitor/a o voluntariat"></div>'+
  '<div class="field"><label for="a_preu">Preu (€ / mes)</label><input id="a_preu" type="number" min="0" step="0.01" value="0"></div>'+
  '<label class="check full"><input type="checkbox" id="a_comp">Activitat complementària (prestació 3: gimnàstica, ioga, pintura, cant coral)</label>'+
  '<div class="full alert" id="aerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Crear activitat</button></div></form>');
  $("#fa").onsubmit=e=>{ e.preventDefault(); const v=k=>$("#a_"+k).value.trim(); const er=$("#aerr");
    const sl=sala(v("sala")), pl=Number(v("pl"));
    if(!v("nom")){ er.textContent="Posa un nom a l'activitat."; er.hidden=false; return; }
    if(mins(v("fi"))<=mins(v("ini"))){ er.textContent="L'hora de fi ha de ser posterior a la d'inici."; er.hidden=false; return; }
    if(pl>sl.aforament){ er.textContent="La "+sl.nom+" té aforament per a "+sl.aforament+" persones."; er.hidden=false; return; }
    const c=conflicte(sl.id,Number(v("dia")),v("ini"),v("fi")); if(c){ er.textContent="La sala està ocupada. "+c; er.hidden=false; return; }
    D.activitats.push({id:uid("a"),casal:cs,nom:v("nom"),eix:v("eix"),dia:Number(v("dia")),inici:v("ini"),fi:v("fi"),sala:sl.id,places:pl,preu:Number(v("preu"))||0,prof:v("prof")||"Per assignar",comp:$("#a_comp").checked,inscrits:[],espera:[]});
    save(); closeOverlay(); toast("Activitat creada."); render(); };
}

VIEWS.sales = () => {
  const ss=D.sales.filter(inCasal);
  if(!ss.length) return '<div class="head"><div><h1>Sales i espais</h1><p>Encara no hi ha cap espai creat.</p></div><button class="btn primary" id="gestSales">Gestionar espais</button></div><div class="note">Crea les sales de cada casal (nom, aforament, tipus). Després podràs programar-hi activitats i reserves.</div>';
  if(!S.sala||!ss.find(s=>s.id===S.sala)) S.sala=ss[0].id;
  const sl=sala(S.sala); const H0=9, H1=21, PX=48;
  const top=t=>(mins(t)-H0*60)/60*PX;
  const cols=DIES.map((d,di)=>{
    const evs=D.activitats.filter(a=>a.sala===sl.id&&a.dia===di).map(a=>'<div class="ev" style="top:'+top(a.inici)+'px;height:'+(top(a.fi)-top(a.inici)-2)+'px;color:var(--'+a.eix+')"><b>'+esc(a.nom)+'</b><span class="num">'+a.inici+'–'+a.fi+'</span></div>').join("");
    const rs=D.reserves.filter(r=>r.sala===sl.id&&r.dia===di).map(r=>'<div class="ev res" style="top:'+top(r.inici)+'px;height:'+(top(r.fi)-top(r.inici)-2)+'px"><b>'+esc(r.entitat)+'</b><span>'+esc(r.motiu)+' · '+r.inici+'–'+r.fi+'</span></div>').join("");
    return '<div class="col" style="height:'+((H1-H0)*PX)+'px">'+evs+rs+'</div>';
  }).join("");
  const reservesLlista=D.reserves.filter(r=>ss.find(s=>s.id===r.sala)).sort((a,b)=>a.dia-b.dia);
  return '<div class="head"><div><h1>Sales i espais</h1><p>Ocupació setmanal i reserves d\'entitats.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="gestSales">Gestionar espais</button><button class="btn primary" id="novaRes">'+ICON.plus+'Nova reserva</button></div></div>'+
  '<div class="filters" role="group" aria-label="Sala">'+ss.map(s=>'<button data-sala="'+s.id+'" aria-pressed="'+(S.sala===s.id)+'">'+esc(s.nom)+(S.casal==="tots"?' · '+esc(casal(s.casal).curt):'')+'</button>').join("")+'</div>'+
  '<div class="legend">'+Object.keys(EIX_C).map(e=>'<span><i style="background:var(--'+e+')"></i>'+EIX_C[e]+'</span>').join("")+'<span><i style="background:repeating-linear-gradient(135deg,var(--muted) 0 2px,transparent 2px 4px)"></i>Reserva externa</span><span>Aforament: '+sl.aforament+' persones</span></div>'+
  '<div class="tablewrap"><div class="cal"><div class="dh"></div>'+DIES.map((d,i)=>'<div class="dh'+(esAvuiLaborable()&&i===avuiIdx()?' today':'')+'">'+d+'</div>').join("")+
  '<div class="hours">'+Array.from({length:H1-H0},(_,i)=>'<div class="num">'+(H0+i)+':00</div>').join("")+'</div>'+cols+'</div></div>'+
  '<section class="panel"><div class="panel-h"><h2>Reserves d\'entitats</h2></div><div class="list">'+(reservesLlista.map(r=>'<div class="row"><div class="t"><b>'+esc(r.entitat)+'</b><span>'+esc(r.motiu)+' · '+esc(sala(r.sala).nom)+' · '+DIES[r.dia]+' '+r.inici+'–'+r.fi+'</span></div><button class="btn sm ghost danger" data-delres="'+r.id+'">Anul·lar</button></div>').join("")||'<div class="empty">Cap reserva.</div>')+'</div></section>';
};

function gestioSales(){
  const ss=D.sales.filter(inCasal);
  const us=id=>D.activitats.filter(a=>a.sala===id).length+D.reserves.filter(r=>r.sala===id).length;
  overlay(hdr("Sales i espais", S.casal==="tots"?"Tots els casals":casal(S.casal).nom, '<button class="btn sm primary" id="novaSala">'+ICON.plus+'Nou espai</button>')+
  '<div class="list">'+ss.map(x=>'<div class="row"><div class="t"><b>'+esc(x.nom)+'</b><span>'+esc(casal(x.casal).curt)+' · '+esc(x.tipus||"Sala polivalent")+' · aforament '+x.aforament+(x.accessible===false?' · no adaptat':'')+(x.equip?' · '+esc(x.equip):'')+'</span></div><span class="chip num">'+us(x.id)+' usos</span><button class="btn sm" data-eds="'+x.id+'">Editar</button></div>').join("")+'</div>');
  $("#novaSala").onclick=()=>formSala();
  document.querySelectorAll("[data-eds]").forEach(b=>b.onclick=()=>formSala(b.dataset.eds));
}
function formSala(id){
  const x = id ? sala(id) : {nom:"",casal:S.casal==="tots"?"c1":S.casal,aforament:20,tipus:"Sala polivalent",equip:"",accessible:true,actiu:true};
  const usos = id ? D.activitats.filter(a=>a.sala===id).length+D.reserves.filter(r=>r.sala===id).length : 0;
  const tipus=["Sala polivalent","Sala d'actes","Aula","Aula d'informàtica","Menjador","Bar","Despatx","Espai exterior"];
  overlay(hdr(id?"Editar espai":"Nou espai", id?x.nom:"Sales i espais")+'<form class="form" id="fsl" novalidate>'+
  '<div class="field full"><label for="sl_nom">Nom</label><input id="sl_nom" value="'+esc(x.nom)+'" placeholder="Ex.: Sala de ball"></div>'+
  '<div class="field"><label for="sl_casal">Casal</label><select id="sl_casal"'+(usos?' disabled':'')+'>'+D.casals.map(c=>'<option value="'+c.id+'"'+(x.casal===c.id?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select></div>'+
  '<div class="field"><label for="sl_tipus">Tipus</label><select id="sl_tipus">'+tipus.map(t=>'<option'+((x.tipus||"Sala polivalent")===t?' selected':'')+'>'+t+'</option>').join("")+'</select></div>'+
  '<div class="field"><label for="sl_af">Aforament (persones)</label><input id="sl_af" type="number" min="1" value="'+x.aforament+'"></div>'+
  '<div class="field"><label for="sl_eq">Equipament (opcional)</label><input id="sl_eq" value="'+esc(x.equip||"")+'" placeholder="Projector, piano, cadires…"></div>'+
  '<label class="check full"><input type="checkbox" id="sl_acc"'+(x.accessible!==false?' checked':'')+'>Accessible per a persones amb mobilitat reduïda</label>'+
  (usos?'<p class="note full" style="margin:0">Aquest espai té '+usos+' activitats o reserves. No es pot esborrar ni canviar de casal.</p>':'')+
  '<div class="full alert" id="slerr" hidden></div><div class="m-f full">'+(id&&!usos?'<button type="button" class="btn danger" id="delSala" style="margin-right:auto">Esborrar</button>':'')+'<button type="button" class="btn ghost" id="slBack">Tornar</button><button class="btn primary" type="submit">'+(id?"Desar canvis":"Crear espai")+'</button></div></form>');
  $("#slBack").onclick=()=>gestioSales();
  const del=$("#delSala"); if(del) del.onclick=()=>confirmMotiu("Esborrar "+x.nom,"L'espai deixarà d'existir.","Esborrar",m=>{ D.sales=D.sales.filter(y=>y.id!==id); if(S.sala===id) S.sala=null; logCanvi("Esborrat d'espai",x.nom,m); save(); toast("Espai esborrat."); render(); gestioSales(); });
  $("#fsl").onsubmit=e=>{ e.preventDefault(); const er=$("#slerr"), nom=$("#sl_nom").value.trim(), af=Number($("#sl_af").value);
    if(!nom){ er.textContent="Posa un nom a l'espai."; er.hidden=false; return; }
    if(!(af>0)){ er.textContent="L'aforament ha de ser com a mínim 1 persona."; er.hidden=false; return; }
    if(id){ const maxPl=Math.max(0,...D.activitats.filter(a=>a.sala===id).map(a=>a.places)); if(af<maxPl){ er.textContent="Hi ha una activitat amb "+maxPl+" places en aquest espai. L'aforament no pot ser inferior."; er.hidden=false; return; } }
    const obj = id ? x : {id:uid("s")};
    Object.assign(obj,{nom,casal:usos?x.casal:$("#sl_casal").value,tipus:$("#sl_tipus").value,aforament:af,equip:$("#sl_eq").value.trim(),accessible:$("#sl_acc").checked});
    if(!id) D.sales.push(obj); S.sala=obj.id; save(); toast(id?"Canvis desats.":"Espai creat."); render(); gestioSales(); };
}
BIND.sales = () => {
  $("#gestSales").onclick=()=>gestioSales();
  if(!$("#novaRes")) return;
  document.querySelectorAll("[data-sala]").forEach(b=>b.onclick=()=>{ S.sala=b.dataset.sala; render(); });
  document.querySelectorAll("[data-delres]").forEach(b=>b.onclick=()=>{ const r=D.reserves.find(x=>x.id===b.dataset.delres); D.reserves=D.reserves.filter(x=>x.id!==r.id); logCanvi("Anul·lació de reserva",r.entitat+" · "+DIES[r.dia]+" "+r.inici); save(); toast("Reserva anul·lada."); render(); });
  $("#novaRes").onclick=()=>{
    const ss=D.sales.filter(inCasal);
    overlay(hdr("Nova reserva","Espais per a entitats")+'<form class="form" id="fr" novalidate>'+
    '<div class="field full"><label for="r_ent">Entitat</label><input id="r_ent" placeholder="Ex.: Associació de veïns"></div>'+
    '<div class="field full"><label for="r_mot">Motiu</label><input id="r_mot" placeholder="Ex.: Reunió de junta"></div>'+
    '<div class="field"><label for="r_sala">Sala</label><select id="r_sala">'+ss.map(s=>'<option value="'+s.id+'"'+(s.id===S.sala?' selected':'')+'>'+esc(s.nom)+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="r_dia">Dia</label><select id="r_dia">'+DIES.map((d,i)=>'<option value="'+i+'">'+d+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="r_ini">Inici</label><input id="r_ini" type="time" value="18:00" step="900"></div>'+
    '<div class="field"><label for="r_fi">Fi</label><input id="r_fi" type="time" value="19:30" step="900"></div>'+
    '<div class="full alert" id="rerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Reservar</button></div></form>');
    $("#fr").onsubmit=e=>{ e.preventDefault(); const v=k=>$("#r_"+k).value.trim(); const er=$("#rerr");
      if(!v("ent")){ er.textContent="Indica quina entitat fa la reserva."; er.hidden=false; return; }
      if(mins(v("fi"))<=mins(v("ini"))){ er.textContent="L'hora de fi ha de ser posterior a la d'inici."; er.hidden=false; return; }
      const c=conflicte(v("sala"),Number(v("dia")),v("ini"),v("fi")); if(c){ er.textContent="No es pot reservar. "+c; er.hidden=false; return; }
      D.reserves.push({id:uid("r"),sala:v("sala"),dia:Number(v("dia")),inici:v("ini"),fi:v("fi"),entitat:v("ent"),motiu:v("mot")||"Reserva"});
      S.sala=v("sala"); save(); closeOverlay(); toast("Reserva feta."); render(); };
  };
};

VIEWS.config = () => {
  const L={C:"Consulta",E:"Enregistra",M:"Modifica",B:"Esborra"};
  const cell=v=> v ? '<span class="perms">'+"CEMB".split("").map(a=>'<i class="'+(v.includes(a)?'on':'')+'" title="'+L[a]+'">'+a+'</i>').join("")+'</span>' : '<span class="no">—</span>';
  const grups=[...new Set(PERMS.map(r=>r.g))];
  return '<div class="head"><div><h1>Rols i permisos</h1><p>Què pot fer cada perfil. Canvia de perfil a la barra superior per provar-ho.</p></div></div>'+
  '<div class="legend"><span><span class="perms"><i class="on">C</i></span>Consulta</span><span><span class="perms"><i class="on">E</i></span>Enregistra</span><span><span class="perms"><i class="on">M</i></span>Modifica</span><span><span class="perms"><i class="on">B</i></span>Esborra (amb motiu)</span></div>'+
  '<div class="tablewrap"><table class="perm"><thead><tr><th>Àmbit</th>'+ROLK.map(k=>'<th>'+ROLS[k]+'</th>').join("")+'</tr><tr><td style="font-size:12px;color:var(--muted)">Abast</td>'+ROLK.map(k=>'<td style="font-size:12px;color:var(--muted);white-space:normal">'+ABAST[k]+'</td>').join("")+'</tr></thead><tbody>'+
  grups.map(g=>'<tr><td colspan="'+(ROLK.length+1)+'" class="grp">'+g+'</td></tr>'+PERMS.filter(r=>r.g===g).map(r=>'<tr><td style="white-space:normal;min-width:220px"><b style="font-weight:600">'+r.n+'</b>'+(r.nota?'<div style="font-size:12px;color:var(--muted)">'+r.nota+'</div>':'')+'</td>'+ROLK.map(k=>'<td>'+cell(r.p[k])+'</td>').join("")+'</tr>').join("")).join("")+'</tbody></table></div>'+
  '<section class="panel"><div class="panel-h"><h2>Normes generals</h2></div><div class="list">'+[
    "Només Coordinació pot esborrar. Sempre demana confirmació i motiu, i queda al registre.",
    "La resta de perfils fan baixes o anul·lacions: el registre es conserva.",
    "Una caixa del bar tancada i un mes tancat queden bloquejats. Només Coordinació els pot reobrir, amb motiu.",
    "Dinamitzador/a i Informador/a només veuen el seu casal.",
    "Les notes de seguiment, derivacions, dietes i la dada «viu sol/a» només les veu l'equip tècnic (Coordinació i Dinamitzador/a).",
    "L'Ajuntament consulta informes i llistats nominals. No pot canviar res.",
    "Cada persona entra amb el seu usuari i contrasenya. Els permisos es comproven al servidor: encara que algú manipulés la pàgina, la base de dades no li deixaria veure ni canviar res fora del seu perfil."
  ].map(t=>'<div class="row"><div class="t"><span style="color:var(--ink);font-size:14px">'+t+'</span></div></div>').join("")+'</div></section>'+
  '<section class="panel"><div class="panel-h"><h2>Registre de canvis</h2><span class="chip">'+D.registre.length+'</span></div><div class="list">'+(D.registre.slice(0,20).map(r=>'<div class="row"><div class="time num" style="width:96px;font-size:13px">'+fdata(r.data.slice(0,10))+' '+r.data.slice(11)+'</div><div class="t"><b>'+esc(r.accio)+' · '+esc(r.detall)+'</b><span>'+esc(r.rol)+(r.motiu?' · Motiu: '+esc(r.motiu):'')+'</span></div></div>').join("")||'<div class="empty">Encara no hi ha cap canvi registrat. Hi surten esborrats, baixes, tancaments, reobertures i canvis de perfil.</div>')+'</div></section>'+
  '';
};
BIND.config = () => {
  if(!S._audOk){ S._audOk=true; llegirAuditoria().then(()=>{ if(S.view==="config") render(); setTimeout(()=>{ S._audOk=false; }, 30000); }); }
};

/* ---------- Bar ---------- */
const eur = n => (Math.round(n*100)/100).toLocaleString("ca-ES",{style:"currency",currency:"EUR"});
const prod = id => D.bar.productes.find(p=>p.id===id);
const barCasal = () => S.casal!=="tots" ? S.casal : S.barCasal;
const tiquetTotal = () => Object.entries(S.tiquet).reduce((t,[id,q])=>t+prod(id).preu*q,0);
function resumBar(cid, dia){
  const v=D.bar.vendes.filter(x=>x.casal===cid && x.data===dia);
  const tot=v.reduce((t,x)=>t+x.total,0), ef=v.filter(x=>x.pagament==="efectiu").reduce((t,x)=>t+x.total,0);
  const u={}; v.forEach(x=>x.linies.forEach(l=>u[l.p]=(u[l.p]||0)+l.q));
  const top=Object.entries(u).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([p,q])=>prod(p).nom+" ("+q+")");
  return {v, tot, ef, tg:tot-ef, top};
}
VIEWS.bar = () => {
  const cid=barCasal(), avui=isoAvui(), r=resumBar(cid,avui);
  const tanc=D.bar.tancaments.find(t=>t.casal===cid && t.data===avui);
  const cats=[...new Set(D.bar.productes.map(p=>p.cat))];
  const lines=Object.entries(S.tiquet);
  return '<div class="head"><div><div class="eyebrow">'+esc(casal(cid).nom)+'</div><h1>Bar</h1><p>Caixa d\'avui, '+new Date().toLocaleDateString("ca-ES",{weekday:"long",day:"numeric",month:"long"})+'.</p></div>'+
  (S.casal==="tots"?'<div class="filters" role="group" aria-label="Casal">'+D.casals.map(c=>'<button data-bc="'+c.id+'" aria-pressed="'+(cid===c.id)+'">'+esc(c.curt)+'</button>').join("")+'</div>':'')+'</div>'+
  (tanc?'<div class="note" style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center"><span>Caixa tancada a les '+tanc.hora+'. Comptat: '+eur(tanc.comptat)+' · Diferència: '+eur(tanc.dif)+'. Està bloquejada.</span><button class="btn sm" id="reobrirCaixa">Reobrir caixa</button></div>':'')+
  '<div class="pos"><section aria-label="Productes">'+cats.map(c=>'<div class="cat-t">'+esc(c)+'</div><div class="prods">'+D.bar.productes.filter(p=>p.cat===c).map(p=>'<button class="prod" data-p="'+p.id+'"'+(tanc?' disabled':'')+'>'+(S.tiquet[p.id]?'<em>'+S.tiquet[p.id]+'</em>':'')+'<b>'+esc(p.nom)+'</b><span>'+eur(p.preu)+'</span></button>').join("")+'</div>').join("")+'</section>'+
  '<aside class="panel ticket" aria-label="Tiquet"><div class="panel-h"><h2>Tiquet</h2>'+(lines.length?'<button class="btn sm ghost" id="buida">Buidar</button>':'')+'</div>'+
  '<div>'+(lines.length?lines.map(([id,q])=>'<div class="tline"><div class="t"><b>'+esc(prod(id).nom)+'</b><div style="font-size:13px;color:var(--muted)" class="num">'+eur(prod(id).preu)+' / u.</div></div><div class="qty"><button data-m="'+id+'" aria-label="Treure un">−</button><span class="num" style="min-width:18px;text-align:center">'+q+'</span><button data-p2="'+id+'" aria-label="Afegir un">+</button></div><span class="num" style="width:62px;text-align:right">'+eur(prod(id).preu*q)+'</span></div>').join(""):'<div class="empty">Toca un producte per afegir-lo.</div>')+'</div>'+
  '<div class="total"><span>Total</span><b class="num">'+eur(tiquetTotal())+'</b></div>'+
  '<div class="paybtns"><button class="btn primary" data-pay="efectiu"'+(lines.length&&!tanc?'':' disabled')+'>Cobrar en efectiu</button><button class="btn" data-pay="targeta"'+(lines.length&&!tanc?'':' disabled')+'>Cobrar amb targeta</button></div></aside></div>'+
  '<section class="panel"><div class="panel-h"><h2>Resum del dia</h2>'+(tanc?'<span class="chip good">Caixa tancada</span>':'<button class="btn" id="tancar">Tancar caixa</button>')+'</div>'+
  '<div class="minikpis"><div><small>Vendes</small><b class="num">'+r.v.length+'</b></div><div><small>Total</small><b class="num">'+eur(r.tot)+'</b></div><div><small>Efectiu</small><b class="num">'+eur(r.ef)+'</b></div><div><small>Targeta</small><b class="num">'+eur(r.tg)+'</b></div></div>'+
  (r.top.length?'<div style="font-size:14px;color:var(--muted)">Més venut: '+esc(r.top.join(" · "))+'</div>':'')+
  '<div class="list">'+r.v.slice().reverse().slice(0,8).map(x=>'<div class="row"><div class="time num">'+x.hora+'</div><div class="t"><b>'+esc(x.linies.map(l=>(l.q>1?l.q+"× ":"")+prod(l.p).nom).join(", "))+'</b><span>'+(x.pagament==="efectiu"?"Efectiu":"Targeta")+'</span></div><span class="num">'+eur(x.total)+'</span></div>').join("")+'</div></section>';
};
BIND.bar = () => {
  document.querySelectorAll("[data-bc]").forEach(b=>b.onclick=()=>{ S.barCasal=b.dataset.bc; S.tiquet={}; render(); });
  document.querySelectorAll("[data-p],[data-p2]").forEach(b=>b.onclick=()=>{ const id=b.dataset.p||b.dataset.p2; S.tiquet[id]=(S.tiquet[id]||0)+1; render(); });
  document.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{ const id=b.dataset.m; S.tiquet[id]--; if(S.tiquet[id]<=0) delete S.tiquet[id]; render(); });
  const bu=$("#buida"); if(bu) bu.onclick=()=>{ S.tiquet={}; render(); };
  document.querySelectorAll("[data-pay]").forEach(b=>b.onclick=()=>{
    const tot=Math.round(tiquetTotal()*100)/100; const n=new Date();
    D.bar.vendes.push({id:uid("v"),casal:barCasal(),data:isoAvui(),hora:String(n.getHours()).padStart(2,"0")+":"+String(n.getMinutes()).padStart(2,"0"),linies:Object.entries(S.tiquet).map(([p,q])=>({p,q})),total:tot,pagament:b.dataset.pay});
    S.tiquet={}; save(); toast("Cobrat "+eur(tot)+(b.dataset.pay==="efectiu"?" en efectiu.":" amb targeta.")); render(); });
  const rc=$("#reobrirCaixa"); if(rc) rc.onclick=()=>confirmMotiu("Reobrir la caixa","La caixa d'avui es tornarà a obrir per fer-hi canvis.","Reobrir",m=>{ const cid=barCasal(); const t=D.bar.tancaments.find(x=>x.casal===cid&&x.data===isoAvui()); D.bar.tancaments=D.bar.tancaments.filter(x=>x!==t); D.bar.historic=D.bar.historic.filter(x=>!(x.casal===cid&&x.data===isoAvui())); logCanvi("Reobertura de caixa",casal(cid).nom+" · tancada a les "+t.hora+" amb "+eur(t.comptat),m); save(); toast("Caixa reoberta."); render(); });
  const tc=$("#tancar"); if(tc) tc.onclick=()=>{
    const cid=barCasal(), r=resumBar(cid,isoAvui()), esperat=D.bar.fons+r.ef;
    overlay(hdr("Tancar caixa", casal(cid).nom)+
    '<dl class="dl"><dt>Fons inicial</dt><dd class="num">'+eur(D.bar.fons)+'</dd><dt>Vendes en efectiu</dt><dd class="num">'+eur(r.ef)+'</dd><dt>Vendes amb targeta</dt><dd class="num">'+eur(r.tg)+'</dd><dt><b>Efectiu esperat</b></dt><dd class="num"><b>'+eur(esperat)+'</b></dd></dl>'+
    '<form class="form" id="ftc" novalidate><div class="field"><label for="tc_c">Efectiu comptat (€)</label><input id="tc_c" type="number" step="0.01" min="0" value="'+esperat.toFixed(2)+'"></div><div class="field"><label>Diferència</label><div id="tc_d" class="num" style="padding:9px 0;font-weight:700">'+eur(0)+'</div></div>'+
    '<div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Tancar la caixa</button></div></form>');
    const inp=$("#tc_c"), out=$("#tc_d"); const upd=()=>{ const d=(Number(inp.value)||0)-esperat; out.textContent=eur(d); out.style.color=Math.abs(d)<0.005?"var(--good)":"var(--crit)"; }; inp.oninput=upd; upd();
    $("#ftc").onsubmit=e=>{ e.preventDefault(); const c=Number(inp.value)||0, n=new Date();
      logCanvi("Tancament de caixa",casal(cid).nom+" · comptat "+eur(c)); D.bar.historic=D.bar.historic.filter(x=>!(x.casal===cid&&x.data===isoAvui())); D.bar.historic.push({casal:cid,data:isoAvui(),total:r.tot,ef:r.ef,tg:r.tg,vendes:r.v.length}); D.bar.tancaments.push({casal:cid,data:isoAvui(),hora:String(n.getHours()).padStart(2,"0")+":"+String(n.getMinutes()).padStart(2,"0"),comptat:c,dif:Math.round((c-esperat)*100)/100,total:r.tot});
      save(); closeOverlay(); toast("Caixa tancada."); render(); };
  };
};

/* ---------- Àpats amb companyia ---------- */
const apDia = () => S.apDia==null ? avuiIdx7() : S.apDia;
const apNom = r => r.soci ? nomComplet(soci(r.soci)) : r.nom;
const apPreu = r => r.subv ? D.apats.preuSubv : (r.soci ? D.apats.preuSoci : D.apats.preuNoSoci);
VIEWS.apats = () => {
  const A=D.apats, d=apDia(), m=A.menus[d], rs=A.reserves.filter(r=>r.dia===d);
  const pag=rs.filter(r=>r.pagat), rec=pag.reduce((t,r)=>t+apPreu(r),0), vin=rs.filter(r=>r.vingut).length;
  const hAvui=(A.historic||[]).find(h=>h.data===isoAvui()), esAvui=d===avuiIdx7();
  return '<div class="head"><div><div class="eyebrow">Casal de Roquetes</div><h1>Àpats amb companyia</h1><p>Dinar a les '+A.hora+' al menjador · '+A.places+' places · cada dia · '+eur(A.preuSoci)+' usuaris, '+eur(A.preuNoSoci)+' externs, '+eur(A.preuSubv)+' derivats SS.</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="apCfg">Preus i places</button><button class="btn primary" id="nouCom">'+ICON.plus+'Afegir comensal</button></div></div>'+
  (esAvui?'<div class="note" style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;align-items:center"><span>'+(hAvui?'Dia tancat: '+(hAvui.servits.length+hAvui.externs)+' àpats servits, '+hAvui.absents.length+' absències'+(hAvui.pendents&&hAvui.pendents.length?' · pendents de pagar: '+esc(hAvui.pendents.join(", ")):'')+'.':'En acabar el dinar, marca qui ha vingut i qui ha pagat i tanca el dia. Queda registrat per a l\'informe mensual.')+'</span><button class="btn sm primary" id="tancarDia">'+(hAvui?'Tornar a tancar':'Tancar el dia')+'</button></div>':'')+
  '<div class="filters" role="group" aria-label="Dia">'+DIES7.map((x,i)=>'<button data-ad="'+i+'" aria-pressed="'+(d===i)+'">'+x+(i===avuiIdx7()?' · avui':'')+'</button>').join("")+'</div>'+
  '<div class="minikpis"><div><small>Comensals</small><b class="num">'+rs.length+' / '+A.places+'</b></div><div><small>Han vingut</small><b class="num">'+vin+'</b></div><div><small>Pagats</small><b class="num">'+pag.length+' de '+rs.length+'</b></div><div><small>Recaptat</small><b class="num">'+eur(rec)+'</b></div></div>'+
  '<div class="grid2"><section class="panel"><div class="panel-h"><h2>Comensals de '+DIES7[d].toLowerCase()+'</h2><span class="chip">'+(A.places-rs.length)+' places lliures</span></div><div class="list">'+
  (rs.map(r=>'<div class="row" style="flex-wrap:wrap"><div class="t" style="min-width:200px"><b>'+esc(apNom(r))+'</b><span>'+(r.subv?'Derivada SS · '+eur(A.preuSubv):r.soci?'Usuari/ària · '+eur(A.preuSoci):'Externa · '+eur(A.preuNoSoci))+(r.dieta?' · <span class="chip warn">'+esc(r.dieta)+'</span>':'')+'</span></div><div style="display:flex;gap:6px"><button class="tog" data-vin="'+r.id+'" aria-pressed="'+r.vingut+'">'+(r.vingut?'Ha vingut':'Marcar arribada')+'</button><button class="tog" data-pag="'+r.id+'" aria-pressed="'+r.pagat+'">'+(r.pagat?'Pagat':'Pendent')+'</button><button class="btn sm ghost danger" data-anl="'+r.id+'" aria-label="Anul·lar">'+ICON.x+'</button></div></div>').join("")||'<div class="empty">Encara no hi ha reserves.</div>')+
  '</div></section><section class="panel"><div class="panel-h"><h2>Menú del dia</h2><button class="btn sm" id="edMenu">Editar</button></div><div class="menu"><div><small>Primer</small><b>'+esc(m.primer)+'</b></div><div><small>Segon</small><b>'+esc(m.segon)+'</b></div><div><small>Postres</small><b>'+esc(m.postres)+'</b></div></div>'+
  '<div class="note">Per a cuina: '+rs.length+' racions'+(rs.some(r=>r.dieta)?', de les quals '+Object.entries(rs.filter(r=>r.dieta).reduce((o,r)=>(o[r.dieta]=(o[r.dieta]||0)+1,o),{})).map(([k,v])=>v+' '+k.toLowerCase()).join(', '):'')+'.</div>'+
  '<div class="section-t">La setmana</div><div class="list">'+A.menus.map((mm,i)=>{ const n=A.reserves.filter(r=>r.dia===i).length; return '<div class="row"><div class="t"><b>'+DIES7[i]+'</b><span>'+esc(mm.segon)+'</span></div><span class="num">'+n+' / '+A.places+'</span></div>'; }).join("")+'</div>'+
  (()=>{ const ab=[...new Set((A.historic||[]).flatMap(h=>h.absents))].map(x=>({x,n:absApats(x)})).filter(o=>o.n>=2); return ab.length?'<div class="alert">Absències reiterades (14 dies): '+ab.map(o=>esc(nomComplet(soci(o.x)))+' ('+o.n+')').join(', ')+'. Cal comunicar-ho a Serveis Socials.</div>':''; })()+'<p class="note" style="margin:0">Les indicacions de dieta són dades de salut: cal consentiment explícit i només les veu l\'equip de cuina.</p></section></div>';
};
BIND.apats = () => {
  const A=D.apats, d=apDia();
  document.querySelectorAll("[data-ad]").forEach(b=>b.onclick=()=>{ S.apDia=Number(b.dataset.ad); render(); });
  const f=(k,id)=>A.reserves.find(r=>r.id===id);
  document.querySelectorAll("[data-vin]").forEach(b=>b.onclick=()=>{ const r=f(0,b.dataset.vin); r.vingut=!r.vingut; save(); render(); });
  document.querySelectorAll("[data-pag]").forEach(b=>b.onclick=()=>{ const r=f(0,b.dataset.pag); r.pagat=!r.pagat; save(); if(r.pagat) toast("Cobrat "+eur(apPreu(r))+" a "+apNom(r)+"."); render(); });
  document.querySelectorAll("[data-anl]").forEach(b=>b.onclick=()=>{ A.reserves=A.reserves.filter(r=>r.id!==b.dataset.anl); save(); toast("Reserva anul·lada."); render(); });
  $("#edMenu").onclick=()=>{ const m=A.menus[d];
    overlay(hdr("Menú de "+DIES7[d].toLowerCase(),"Àpats amb companyia")+'<form class="form" id="fm" novalidate>'+
    ['primer','segon','postres'].map(k=>'<div class="field full"><label for="m_'+k+'">'+k[0].toUpperCase()+k.slice(1)+'</label><input id="m_'+k+'" value="'+esc(m[k])+'"></div>').join("")+
    '<div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar menú</button></div></form>');
    $("#fm").onsubmit=e=>{ e.preventDefault(); ['primer','segon','postres'].forEach(k=>m[k]=$("#m_"+k).value.trim()||m[k]); save(); closeOverlay(); toast("Menú desat."); render(); };
  };
  $("#nouCom").onclick=()=>comensalModal("");
  const td=$("#tancarDia"); if(td) td.onclick=()=>{ const avui=isoAvui(), di=avuiIdx7(), rs=A.reserves.filter(r=>r.dia===di);
    const ant=(A.historic||[]).find(h=>h.data===avui);
    const h={data:avui, servits:rs.filter(r=>r.vingut&&r.soci).map(r=>r.soci), externs:rs.filter(r=>r.vingut&&!r.soci).length, absents:rs.filter(r=>!r.vingut&&r.soci).map(r=>r.soci), pendents:rs.filter(r=>r.vingut&&!r.pagat).map(r=>apNom(r))};
    if(ant && !rs.some(r=>r.vingut)){ toast("El dia ja està tancat."); return; }
    A.historic=(A.historic||[]).filter(x=>x.data!==avui); A.historic.push(h); rs.forEach(r=>{ r.vingut=false; r.pagat=false; });
    save(); toast("Dia tancat: "+(h.servits.length+h.externs)+" àpats servits."); render(); };
  const ac=$("#apCfg"); if(ac) ac.onclick=()=>{
    overlay(hdr("Preus i places","Àpats en companyia")+'<form class="form" id="fap" novalidate>'+
    '<div class="field"><label for="ap_s">Preu usuari/ària (€)</label><input id="ap_s" type="number" step="0.01" min="0" value="'+A.preuSoci+'"></div>'+
    '<div class="field"><label for="ap_n">Preu persona externa (€)</label><input id="ap_n" type="number" step="0.01" min="0" value="'+A.preuNoSoci+'"></div>'+
    '<div class="field"><label for="ap_v">Preu derivats Serveis Socials (€)</label><input id="ap_v" type="number" step="0.01" min="0" value="'+A.preuSubv+'"></div>'+
    '<div class="field"><label for="ap_p">Places del menjador</label><input id="ap_p" type="number" min="1" value="'+A.places+'"></div>'+
    '<div class="field"><label for="ap_h">Hora del dinar</label><input id="ap_h" type="time" value="'+A.hora+'"></div>'+
    '<p class="note full" style="margin:0">Usa els preus públics aprovats per l\'Ajuntament.</p>'+
    '<div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
    $("#fap").onsubmit=e=>{ e.preventDefault(); const n=k=>Number($("#ap_"+k).value); A.preuSoci=n("s"); A.preuNoSoci=n("n"); A.preuSubv=n("v"); A.places=Math.max(1,n("p")||30); A.hora=$("#ap_h").value||A.hora; logCanvi("Canvi de preus dels àpats",eur(A.preuSoci)+" / "+eur(A.preuNoSoci)+" / "+eur(A.preuSubv)); save(); closeOverlay(); toast("Preus desats."); render(); }; };
};
function comensalModal(q){
  const A=D.apats, d=apDia(), rs=A.reserves.filter(r=>r.dia===d);
  if(rs.length>=A.places){ toast("El menjador és ple per a "+DIES7[d].toLowerCase()+"."); return; }
  const cand=D.socis.filter(s=>s.casal==="c2" && !rs.find(r=>r.soci===s.id) && (!q||nomComplet(s).toLowerCase().includes(q.toLowerCase())));
  overlay(hdr("Afegir comensal", DIES7[d]+" · "+(A.places-rs.length)+" places lliures")+
  '<label class="check"><input type="checkbox" id="c_subv">Derivada per Serveis Socials (preu subvencionat)</label>'+
  '<div class="field"><label for="c_dieta">Indicació de dieta (opcional)</label><select id="c_dieta"><option value="">Cap</option><option>Sense sal</option><option>Triturat</option><option>Sense gluten</option><option>Diabètic</option><option>Vegetarià</option></select></div>'+
  '<label class="search">'+ICON.search+'<input id="qc" type="search" placeholder="Cerca persona de Roquetes" value="'+esc(q)+'" aria-label="Cerca soci"></label><div class="list">'+
  (cand.map(s=>'<div class="row"><div class="who" style="flex:1"><span class="avatar">'+inicials(s)+'</span><div>'+esc(nomComplet(s))+'<small>Núm. '+s.num+'</small></div></div><button class="btn sm primary" data-cs="'+s.id+'">Afegir</button></div>').join("")||'<div class="empty">Cap soci disponible amb aquesta cerca.</div>')+'</div>'+
  '<div class="section-t">Persona externa</div><form id="fns" style="display:flex;gap:8px" novalidate><input id="c_nom" class="select" style="flex:1;background:var(--surface)" placeholder="Nom i cognoms" aria-label="Nom de la persona no sòcia"><button class="btn" type="submit">Afegir</button></form>');
  const qc=$("#qc"); qc.oninput=()=>{ const p=qc.selectionStart, dv=$("#c_dieta").value; const sv=$("#c_subv").checked; comensalModal(qc.value); $("#c_dieta").value=dv; $("#c_subv").checked=sv; const n=$("#qc"); n.focus(); n.setSelectionRange(p,p); };
  const add=(sid,nom)=>{ A.reserves.push({id:uid("m"),dia:d,soci:sid,nom:nom||"",pagat:false,vingut:false,dieta:$("#c_dieta").value,subv:!!sid&&($("#c_subv").checked||A.subvencionats.includes(sid))}); if(sid&&$("#c_subv").checked&&!A.subvencionats.includes(sid)) A.subvencionats.push(sid); save(); closeOverlay(); toast((sid?soci(sid).nom:nom)+" té dinar reservat."); render(); };
  document.querySelectorAll("[data-cs]").forEach(b=>b.onclick=()=>add(b.dataset.cs,""));
  $("#fns").onsubmit=e=>{ e.preventDefault(); const n=$("#c_nom").value.trim(); if(!n){ $("#c_nom").focus(); return; } add(null,n+" (externa)"); };
}

/* ---------- Acollida i seguiment ---------- */
function passosAcollida(s){
  const a=s.acollida, due=a.entrevista?addDays(a.entrevista,30):null;
  const st=(ok,t,sub)=>'<div class="step'+(ok?' done':'')+'"><i>'+(ok?'✓':'')+'</i><div><b>'+t+'</b>'+(sub?'<span>'+sub+'</span>':'')+'</div></div>';
  return '<div class="steps">'+st(!!a.entrevista,"Entrevista inicial",a.entrevista?fdata(a.entrevista):"Pendent")+st(a.benvinguda,"Sessió de benvinguda","")+st(!!a.referent,"Persona referent",a.referent?esc(nomComplet(soci(a.referent))):"Sense assignar")+st(!!a.revisio,"Revisió dels 30 dies",a.revisio?fdata(a.revisio):(due?"Prevista "+fdata(due):""))+'</div>';
}
const INTERESSOS=["Activitat física","Memòria","Tecnologia","Cultura","Manualitats","Música i cant","Relació social","Voluntariat","Sortides"];
function formAcollida(id){
  const s=soci(id), a=s.acollida; const cands=D.socis.filter(x=>x.casal===s.casal&&x.id!==id&&(!x.acollida||x.acollida.completada));
  overlay(hdr("Acollida de "+s.nom, "Pla d'acollida")+passosAcollida(s)+'<form class="form" id="fac" novalidate>'+
  '<div class="field"><label for="ac_ent">Data de l\'entrevista inicial</label><input id="ac_ent" type="date" value="'+(a.entrevista||"")+'"></div>'+
  '<label class="check" style="align-self:end;padding-bottom:10px"><input type="checkbox" id="ac_ben"'+(a.benvinguda?' checked':'')+'>Ha fet la sessió de benvinguda</label>'+
  '<div class="field full"><label for="ac_ref">Persona referent (mentor/a)</label><select id="ac_ref"><option value="">Sense assignar</option>'+cands.map(x=>'<option value="'+x.id+'"'+(a.referent===x.id?' selected':'')+'>'+esc(nomComplet(x))+'</option>').join("")+'</select></div>'+
  '<div class="full" style="display:flex;flex-direction:column;gap:8px"><span class="field"><label>Interessos</label></span><div class="filters">'+INTERESSOS.map(t=>'<button type="button" class="tg-int" aria-pressed="'+a.interessos.includes(t)+'">'+t+'</button>').join("")+'</div></div>'+
  '<label class="check full"><input type="checkbox" id="ac_rev"'+(a.revisio?' checked':'')+'>Revisió dels 30 dies feta: tanca l\'acollida</label>'+
  '<div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  document.querySelectorAll(".tg-int").forEach(b=>b.onclick=()=>b.setAttribute("aria-pressed", b.getAttribute("aria-pressed")!=="true"));
  $("#fac").onsubmit=e=>{ e.preventDefault(); a.entrevista=$("#ac_ent").value||null; a.benvinguda=$("#ac_ben").checked; a.referent=$("#ac_ref").value||null;
    a.interessos=[...document.querySelectorAll(".tg-int")].filter(b=>b.getAttribute("aria-pressed")==="true").map(b=>b.textContent);
    if($("#ac_rev").checked){ a.revisio=a.revisio||isoAvui(); a.completada=true; D.seguiments.push({id:uid("sg"),soci:id,data:isoAvui(),tipus:"Revisió dels 30 dies",nota:"Acollida tancada.",autor:"Dinamitzadora"}); }
    save(); closeOverlay(); toast(a.completada?"Acollida tancada.":"Acollida actualitzada."); render(); };
}
function formSeguiment(id){
  const s=soci(id);
  overlay(hdr("Registrar seguiment", nomComplet(s))+'<form class="form" id="fsg" novalidate>'+
  '<div class="field"><label for="sg_t">Tipus</label><select id="sg_t"><option>Trucada</option><option>Conversa presencial</option><option>Entrevista inicial</option><option>Revisió dels 30 dies</option><option>Visita a domicili</option></select></div>'+
  '<div class="field"><label for="sg_d">Data</label><input id="sg_d" type="date" value="'+isoAvui()+'"></div>'+
  '<div class="field full"><label for="sg_n">Què s\'ha parlat</label><textarea id="sg_n" rows="3" placeholder="Ex.: Està bé, vindrà a la coral dijous."></textarea></div>'+
  '<p class="note full" style="margin:0">Escriu només el necessari per al seguiment. No hi posis diagnòstics ni dades de salut.</p>'+
  '<div class="full alert" id="sgerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  $("#fsg").onsubmit=e=>{ e.preventDefault(); const n=$("#sg_n").value.trim(); if(!n){ const er=$("#sgerr"); er.textContent="Escriu una nota breu del seguiment."; er.hidden=false; return; }
    D.seguiments.push({id:uid("sg"),soci:id,data:$("#sg_d").value||isoAvui(),tipus:$("#sg_t").value,nota:n,autor:S.rol==="direccio"?"Coordinadora":"Dinamitzadora"}); save(); closeOverlay(); toast("Seguiment registrat."); render(); };
}
function formDerivacio(id){
  const s=soci(id);
  overlay(hdr("Derivar", nomComplet(s))+'<form class="form" id="fdv" novalidate>'+
  '<div class="field full"><label for="dv_a">A quin servei</label><select id="dv_a"><option>Oficina +65</option><option>Serveis Socials</option><option>Centre d\'atenció primària</option></select></div>'+
  '<div class="field full"><label for="dv_m">Motiu</label><input id="dv_m" placeholder="Ex.: Absències reiterades i viu sol/a"></div>'+
  '<div class="full alert" id="dverr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Derivar</button></div></form>');
  $("#fdv").onsubmit=e=>{ e.preventDefault(); const m=$("#dv_m").value.trim(), srv=$("#dv_a").value; if(!m){ const er=$("#dverr"); er.textContent="Indica el motiu de la derivació."; er.hidden=false; return; }
    D.derivacions.unshift({id:uid("dv"),soci:id,data:isoAvui(),a:srv,motiu:m,estat:"Enviada"}); save(); closeOverlay(); toast("Derivació enviada a "+srv+"."); render(); };
}
VIEWS.seguiment = () => {
  const ps=D.socis.filter(inCasal), AV=isoAvui();
  const acol=ps.filter(s=>s.acollida&&!s.acollida.completada);
  const al=ps.map(s=>({s,a:alertesDe(s).filter(x=>x.k!=="acollida")})).filter(o=>o.a.length);
  const dvs=D.derivacions.filter(d=>inCasal(soci(d.soci)));
  const segMes=D.seguiments.filter(g=>g.data.startsWith(AV.slice(0,7))&&inCasal(soci(g.soci)));
  return '<div class="head"><div><h1>Seguiment de persones</h1><p>Acollida, detecció de solitud i derivacions a l\'Oficina +65 i Serveis Socials.</p></div></div>'+
  '<div class="minikpis"><div><small>En acollida</small><b class="num">'+acol.length+'</b></div><div><small>Alertes actives</small><b class="num">'+al.length+'</b></div><div><small>Derivacions obertes</small><b class="num">'+dvs.filter(d=>d.estat!=="Tancada").length+'</b></div><div><small>Seguiments aquest mes</small><b class="num">'+segMes.length+'</b></div></div>'+
  '<section class="panel"><div class="panel-h"><h2>Alertes</h2><span class="chip">Sense assistència més de 21 dies o absències als àpats</span></div><div class="list">'+
  (al.map(o=>{ const dv=derivOberta(o.s.id); return '<div class="row" style="flex-wrap:wrap"><div class="who" style="flex:1;min-width:220px;cursor:pointer" data-fp="'+o.s.id+'"><span class="avatar">'+inicials(o.s)+'</span><div>'+esc(nomComplet(o.s))+'<small>'+esc(casal(o.s.casal).curt)+(o.s.viuSol?' · Viu sol/a':'')+'</small></div></div>'+o.a.map(x=>'<span class="chip crit">'+esc(x.t)+'</span>').join("")+'<div style="display:flex;gap:6px"><button class="btn sm" data-sg="'+o.s.id+'">Seguiment</button>'+(dv?'<span class="chip warn">'+esc(dv.a)+' · '+esc(dv.estat)+'</span>':'<button class="btn sm" data-dv="'+o.s.id+'">Derivar</button>')+'</div></div>'; }).join("")||'<div class="empty">Cap alerta. Tothom participa amb regularitat.</div>')+'</div></section>'+
  '<section class="panel"><div class="panel-h"><h2>Acollides en curs</h2></div><div class="list">'+
  (acol.map(s=>{ const a=alertesDe(s).find(x=>x.k==="acollida"); return '<div class="row" style="flex-wrap:wrap;align-items:flex-start"><div class="who" style="min-width:220px;cursor:pointer" data-fp="'+s.id+'"><span class="avatar">'+inicials(s)+'</span><div>'+esc(nomComplet(s))+'<small>Alta '+fdata(s.alta)+' · '+esc(casal(s.casal).curt)+'</small></div></div><div style="flex:1;min-width:260px">'+passosAcollida(s)+'</div>'+(a?'<span class="chip '+a.c+'">'+esc(a.t)+'</span>':'')+'<button class="btn sm primary" data-ac="'+s.id+'">Actualitzar</button></div>'; }).join("")||'<div class="empty">No hi ha cap acollida en curs.</div>')+'</div></section>'+
  '<section class="panel"><div class="panel-h"><h2>Derivacions</h2></div><div class="tablewrap" style="border:0"><table><thead><tr><th>Persona</th><th>Servei</th><th>Motiu</th><th>Data</th><th>Estat</th></tr></thead><tbody>'+
  (dvs.map(d=>'<tr><td>'+esc(nomComplet(soci(d.soci)))+'</td><td>'+esc(d.a)+'</td><td style="white-space:normal;min-width:200px">'+esc(d.motiu)+'</td><td class="num">'+fdata(d.data)+'</td><td><select class="select" data-dvst="'+d.id+'" aria-label="Estat">'+["Enviada","En curs","Tancada"].map(x=>'<option'+(d.estat===x?' selected':'')+'>'+x+'</option>').join("")+'</select></td></tr>').join("")||'<tr><td colspan="5" class="empty" style="padding:16px">Cap derivació.</td></tr>')+'</tbody></table></div></section>'+
  '<section class="panel"><div class="panel-h"><h2>Darrers seguiments</h2></div><div class="list">'+D.seguiments.filter(g=>inCasal(soci(g.soci))).sort((a,b)=>b.data.localeCompare(a.data)).slice(0,8).map(g=>'<div class="row"><div class="time num" style="width:64px">'+fdata(g.data)+'</div><div class="t"><b>'+esc(nomComplet(soci(g.soci)))+' · '+esc(g.tipus)+'</b><span style="white-space:normal">'+esc(g.nota)+'</span></div></div>').join("")+'</div></section>';
};
BIND.seguiment = () => {
  document.querySelectorAll("[data-fp]").forEach(b=>b.onclick=()=>fitxaSoci(b.dataset.fp));
  document.querySelectorAll("[data-sg]").forEach(b=>b.onclick=()=>formSeguiment(b.dataset.sg));
  document.querySelectorAll("[data-dv]").forEach(b=>b.onclick=()=>formDerivacio(b.dataset.dv));
  document.querySelectorAll("[data-ac]").forEach(b=>b.onclick=()=>formAcollida(b.dataset.ac));
  document.querySelectorAll("[data-dvst]").forEach(sl=>sl.onchange=()=>{ const d=D.derivacions.find(x=>x.id===sl.dataset.dvst); d.estat=sl.value; save(); toast("Estat actualitzat."); render(); });
};

/* ---------- Manteniment i neteja ---------- */
const URG={urgent:{t:"Urgent",h:24,c:"crit"},preferent:{t:"Preferent",h:72,c:"warn"},programable:{t:"Programable",h:360,c:""}};
const hores = (a,b) => (new Date(b)-new Date(a))/36e5;
const araIso = () => { const d=new Date(); return isoAvui()+"T"+String(d.getHours()).padStart(2,"0")+":"+String(d.getMinutes()).padStart(2,"0"); };
function terminiInc(i){ const lim=URG[i.urg].h, fi=i.resolt||araIso(), u=hores(i.obert,fi); return {dins:u<=lim, queden:lim-u}; }
const fh = h => h<48 ? Math.max(0,Math.round(h))+" h" : Math.round(h/24)+" dies";
VIEWS.manteniment = () => {
  const M=D.manteniment, t=S.mTab||"inc";
  const tabs='<div class="seg" role="tablist" aria-label="Seccions">'+[["inc","Incidències"],["net","Neteja"],["inv","Inventari i revisions"]].map(x=>'<button role="tab" data-mt="'+x[0]+'" aria-pressed="'+(t===x[0])+'">'+x[1]+'</button>').join("")+'</div>';
  let body='';
  if(t==="inc"){
    const inc=M.incidencies.filter(inCasal); const ob=inc.filter(i=>i.estat!=="resolta"); const fora=ob.filter(i=>!terminiInc(i).dins);
    const res=inc.filter(i=>i.estat==="resolta"); const pct=res.length?Math.round(res.filter(i=>terminiInc(i).dins).length/res.length*100):100;
    const ord={urgent:0,preferent:1,programable:2};
    body='<div class="minikpis"><div><small>Obertes</small><b class="num">'+ob.length+'</b></div><div><small>Urgents obertes</small><b class="num">'+ob.filter(i=>i.urg==="urgent").length+'</b></div><div><small>Fora de termini</small><b class="num" style="color:'+(fora.length?'var(--crit)':'inherit')+'">'+fora.length+'</b></div><div><small>Resoltes en termini</small><b class="num">'+pct+'%</b></div></div>'+
    '<div class="note" style="display:flex;justify-content:space-between;gap:12px;align-items:center;flex-wrap:wrap"><span>Terminis: urgent 24 h · preferent 72 h · programable 15 dies. '+(D.config.avisos.actiu?'Cada incidència nova s\'envia per correu a <b>'+esc(D.config.avisos.destinataris.join(", "))+'</b>.':'Els avisos per correu estan desactivats.')+'</span>'+(S.rol==="direccio"?'<button class="btn sm" id="cfgAvis">Configurar avisos</button>':'')+'</div>'+
    '<section class="panel"><div class="list">'+inc.slice().sort((a,b)=>(a.estat==="resolta")-(b.estat==="resolta")||ord[a.urg]-ord[b.urg]||a.obert.localeCompare(b.obert)).map(i=>{ const tm=terminiInc(i), u=URG[i.urg];
      return '<div class="row" style="flex-wrap:wrap"><span class="chip '+u.c+'">'+u.t+'</span><div class="t" style="min-width:200px"><b>'+esc(i.desc)+'</b><span>'+esc(casal(i.casal).curt)+(i.espai&&sala(i.espai)?' · '+esc(sala(i.espai).nom):'')+' · '+esc(i.resp)+' · obert '+fdata(i.obert.slice(0,10))+' '+i.obert.slice(11)+'</span></div>'+
      avisChip(i)+(i.estat==="resolta"?'<span class="chip '+(tm.dins?'good':'crit')+'">Resolta '+(tm.dins?'en termini':'fora de termini')+'</span>':
      '<span class="chip '+(tm.dins?'':'crit')+'">'+(tm.dins?'Queden '+fh(tm.queden):'Fora de termini')+'</span>'+(i.estat==="oberta"?'<button class="btn sm" data-ist="'+i.id+'|en curs">Començar</button>':'<span class="chip warn">En curs</span>')+'<button class="btn sm primary" data-ist="'+i.id+'|resolta">Resoldre</button>')+'<button class="btn sm ghost danger" data-delinc="'+i.id+'" aria-label="Esborrar">'+ICON.x+'</button></div>'; }).join("")+'</div></section>';
  } else if(t==="net"){
    const cs=D.casals.filter(inCasal), AV=isoAvui();
    body='<div class="grid2"'+(cs.length===1?' style="grid-template-columns:1fr"':' style="grid-template-columns:1fr 1fr"')+'>'+cs.map(c=>{ const tq=M.tasques.filter(x=>!x.casal||x.casal===c.id), fet=M.neteja[c.id+"|"+AV]||[];
      const zones=[...new Set(tq.map(x=>x.zona))];
      const hist=[]; for(let k=7;k>=1;k--){ const d=addDays(AV,-k); if(wd(d)<5){ const f=M.neteja[c.id+"|"+d]; hist.push({d,p:f?Math.round(f.length/tq.length*100):0}); } }
      return '<section class="panel"><div class="panel-h"><h2>'+esc(c.nom)+'</h2><span class="chip '+(fet.length===tq.length?'good':'')+'">Avui '+fet.length+'/'+tq.length+'</span></div>'+
      zones.map(z=>'<div><div class="section-t" style="margin-bottom:6px">'+esc(z)+'</div>'+tq.filter(x=>x.zona===z).map(x=>'<label class="check" style="padding:6px 0"><input type="checkbox" data-nt="'+c.id+'|'+x.id+'"'+(fet.includes(x.id)?' checked':'')+'>'+esc(x.t)+'</label>').join("")+'</div>').join("")+
      '<div><div class="section-t" style="margin-bottom:8px">Compliment darrers dies</div><div class="hist">'+hist.map(h=>'<div title="'+h.p+'%"><i style="height:'+h.p+'%;background:'+(h.p>=90?'var(--good)':'var(--warn)')+'"></i><span>'+DIES_C[wd(h.d)]+'</span></div>').join("")+'</div></div></section>'; }).join("")+'</div>';
  } else {
    const inv=M.inventari.filter(inCasal), pv=M.preventiu.filter(inCasal), AV=isoAvui();
    body='<section class="panel"><div class="panel-h"><h2>Revisions preventives</h2></div><div class="list">'+pv.slice().sort((a,b)=>a.propera.localeCompare(b.propera)).map(v=>{ const q=diesEntre(AV,v.propera); return '<div class="row"><div class="t"><b>'+esc(v.element)+'</b><span>'+esc(casal(v.casal).curt)+' · '+esc(v.freq)+'</span></div><span class="chip '+(q<0?'crit':q<=14?'warn':'')+'">'+(q<0?'Vençuda fa '+(-q)+' dies':'Propera: '+fdata(v.propera))+'</span><button class="btn sm" data-pvok="'+v.id+'">Feta</button></div>'; }).join("")+'</div></section>'+
    '<div class="panel-h"><h2>Inventari</h2><button class="btn sm primary" id="nouInv">'+ICON.plus+'Afegir</button></div><div class="tablewrap"><table><thead><tr><th>Element</th><th>Casal</th><th>Espai</th><th>Quantitat</th><th>Estat</th></tr></thead><tbody>'+inv.map(v=>'<tr><td>'+esc(v.nom)+'</td><td>'+esc(casal(v.casal).curt)+'</td><td>'+(v.espai&&sala(v.espai)?esc(sala(v.espai).nom):'—')+'</td><td class="num">'+v.q+'</td><td><span class="chip '+(v.estat==="Bo"?'good':v.estat==="Regular"?'warn':'crit')+'">'+esc(v.estat)+'</span></td></tr>').join("")+'</tbody></table></div>';
  }
  return '<div class="head"><div><h1>Manteniment i neteja</h1><p>Incidències amb terminis, pla de neteja i inventari dels dos casals.</p></div><button class="btn primary" id="novaInc">'+ICON.plus+'Nova incidència</button></div>'+tabs+body;
};
BIND.manteniment = () => {
  const M=D.manteniment;
  document.querySelectorAll("[data-mt]").forEach(b=>b.onclick=()=>{ S.mTab=b.dataset.mt; render(); });
  document.querySelectorAll("[data-delinc]").forEach(b=>b.onclick=()=>{ const i=M.incidencies.find(x=>x.id===b.dataset.delinc); confirmMotiu("Esborrar incidència",i.desc,"Esborrar",m=>{ M.incidencies=M.incidencies.filter(x=>x!==i); logCanvi("Esborrat d'incidència",i.desc+" · "+casal(i.casal).curt,m); save(); toast("Incidència esborrada."); render(); }); });
  document.querySelectorAll("[data-reav]").forEach(b=>b.onclick=()=>enviarAvis(M.incidencies.find(x=>x.id===b.dataset.reav)));
  document.querySelectorAll("[data-cpav]").forEach(b=>b.onclick=()=>{ const i=M.incidencies.find(x=>x.id===b.dataset.cpav); const c=correuInc(i); copiar("Per a: "+D.config.avisos.destinataris.join(", ")+"\nAssumpte: "+c.subject+"\n\n"+c.text); });
  const cfa=$("#cfgAvis"); if(cfa) cfa.onclick=()=>configAvisos();
  document.querySelectorAll("[data-ist]").forEach(b=>b.onclick=()=>{ const [id,st]=b.dataset.ist.split("|"); const i=M.incidencies.find(x=>x.id===id); i.estat=st; if(st==="resolta") i.resolt=araIso(); save(); toast(st==="resolta"?"Incidència resolta.":"Incidència en curs."); render(); });
  document.querySelectorAll("[data-nt]").forEach(cb=>cb.onchange=()=>{ const [c,t]=cb.dataset.nt.split("|"), k=c+"|"+isoAvui(); const arr=M.neteja[k]||(M.neteja[k]=[]); const j=arr.indexOf(t); if(cb.checked&&j<0) arr.push(t); if(!cb.checked&&j>=0) arr.splice(j,1); save(); render(); });
  document.querySelectorAll("[data-pvok]").forEach(b=>b.onclick=()=>{ const v=M.preventiu.find(x=>x.id===b.dataset.pvok); const n={Trimestral:90,Semestral:182,Anual:365}[v.freq]||365; v.propera=addDays(isoAvui(),n); save(); toast("Revisió registrada. Propera: "+fdata(v.propera)+"."); render(); });
  const ni=$("#nouInv"); if(ni) ni.onclick=()=>{ const cs=S.casal==="tots"?"c1":S.casal;
    overlay(hdr("Afegir a l'inventari",casal(cs).nom)+'<form class="form" id="fiv" novalidate><div class="field full"><label for="iv_n">Element</label><input id="iv_n"></div><div class="field"><label for="iv_c">Casal</label><select id="iv_c">'+D.casals.map(c=>'<option value="'+c.id+'"'+(c.id===cs?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select></div><div class="field"><label for="iv_q">Quantitat</label><input id="iv_q" type="number" min="1" value="1"></div><div class="field full"><label for="iv_e">Estat</label><select id="iv_e"><option>Bo</option><option>Regular</option><option>Cal substituir</option></select></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Afegir</button></div></form>');
    $("#fiv").onsubmit=e=>{ e.preventDefault(); const n=$("#iv_n").value.trim(); if(!n){ $("#iv_n").focus(); return; } M.inventari.push({id:uid("v"),casal:$("#iv_c").value,nom:n,espai:"",q:Number($("#iv_q").value)||1,estat:$("#iv_e").value}); save(); closeOverlay(); toast("Afegit a l'inventari."); render(); }; };
  $("#novaInc").onclick=()=>{ const cs=S.casal==="tots"?"c1":S.casal;
    const opts=c=>'<option value="">Zones comunes</option>'+D.sales.filter(x=>x.casal===c).map(x=>'<option value="'+x.id+'">'+esc(x.nom)+'</option>').join("");
    overlay(hdr("Nova incidència","Manteniment")+'<form class="form" id="fin" novalidate>'+
    '<div class="field"><label for="in_c">Casal</label><select id="in_c">'+D.casals.map(c=>'<option value="'+c.id+'"'+(c.id===cs?' selected':'')+'>'+esc(c.nom)+'</option>').join("")+'</select></div>'+
    '<div class="field"><label for="in_e">Espai</label><select id="in_e">'+opts(cs)+'</select></div>'+
    '<div class="field full"><label for="in_d">Què passa</label><input id="in_d" placeholder="Ex.: No funciona la calefacció de la sala gran"></div>'+
    '<div class="field full"><label>Urgència</label><div class="filters" id="in_u">'+Object.entries(URG).map(([k,u],ix)=>'<button type="button" data-u="'+k+'" aria-pressed="'+(ix===1)+'">'+u.t+' · '+(u.h<48?u.h+' h':u.h/24+' dies')+'</button>').join("")+'</div></div>'+
    '<div class="field full"><label for="in_r">Qui ho resol</label><select id="in_r"><option>Equip intern</option><option>Empresa externa</option><option>Ajuntament (brigada)</option></select></div>'+
    '<div class="full alert" id="inerr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Registrar</button></div></form>');
    $("#in_c").onchange=()=>{ $("#in_e").innerHTML=opts($("#in_c").value); };
    document.querySelectorAll("#in_u [data-u]").forEach(b=>b.onclick=()=>document.querySelectorAll("#in_u [data-u]").forEach(x=>x.setAttribute("aria-pressed",x===b)));
    $("#fin").onsubmit=e=>{ e.preventDefault(); const d=$("#in_d").value.trim(); if(!d){ const er=$("#inerr"); er.textContent="Descriu breument la incidència."; er.hidden=false; return; }
      const u=document.querySelector('#in_u [aria-pressed="true"]').dataset.u;
      const inc={id:uid("i"),casal:$("#in_c").value,espai:$("#in_e").value,desc:d,urg:u,estat:"oberta",obert:araIso(),resolt:null,resp:$("#in_r").value,avis:null};
      M.incidencies.unshift(inc); S.mTab="inc"; save(); closeOverlay(); toast("Incidència registrada. Termini: "+(URG[u].h<48?URG[u].h+" h":URG[u].h/24+" dies")+"."); render();
      if(D.config.avisos.actiu) enviarAvis(inc); };
  };
};


/* ---------- Avisos per correu (Microsoft 365) ---------- */
const M365="Microsoft 365";
function correuInc(i){
  const u=URG[i.urg], c=casal(i.casal), e=i.espai&&sala(i.espai)?sala(i.espai).nom:"Zones comunes";
  const term=u.h<48?u.h+" hores":u.h/24+" dies", data=fdata(i.obert.slice(0,10))+" a les "+i.obert.slice(11);
  const subject="[Casals SPR] Incidència "+u.t.toLowerCase()+" · "+c.nom+" · "+i.desc.slice(0,80);
  const rows=[["Casal",c.nom],["Espai",e],["Urgència",u.t+" (termini de resposta: "+term+")"],["Descripció",i.desc],["Qui ho resol",i.resp],["Registrada",data]];
  const html='<p>S\'ha registrat una nova incidència de manteniment.</p><table>'+rows.map(r=>'<tr><td><b>'+esc(r[0])+'</b></td><td>'+esc(r[1])+'</td></tr>').join("")+'</table><p>Cal resoldre-la abans de '+term+' des del registre.</p><p>Aplicatiu de gestió dels casals · Fundació Ave Maria</p>';
  const text="S'ha registrat una nova incidència de manteniment.\n\n"+rows.map(r=>r[0]+": "+r[1]).join("\n");
  return {subject, html, text};
}
const AVIS_ERR={
  needs_reauth:"Cal tornar a connectar Microsoft 365 a claude.ai (Configuració → Connectors).",
  server_not_connected:"Microsoft 365 no està connectat. Afegeix-lo a claude.ai (Configuració → Connectors).",
  selection_required:"Tens més d'un compte de Microsoft 365. Tria'n un quan t'ho demani.",
  not_in_manifest:"No has permès que l'aplicatiu enviï correus.",
  blocked_by_policy:"La teva organització no permet enviar correus des d'aquí.",
  approval_required:"La teva organització demana aprovació per enviar correus des d'aquí.",
  server_unavailable:"No s'ha pogut confirmar l'enviament. Mira Elements enviats abans de tornar-ho a provar.",
  upstream_error:"No s'ha pogut confirmar l'enviament. Mira Elements enviats abans de tornar-ho a provar."
};
async function enviarAvis(i){
  if(!i) return;
  const dest=D.config.avisos.destinataris.slice();
  i.avis={estat:"enviant",a:dest}; save(); if(S.view==="manteniment") render();
  const mcp = null; // Pendent: enviament des del servidor (Supabase Edge Function)
  if(!mcp){ i.avis={estat:"no",a:dest,msg:"L'enviament automàtic encara no està configurat. Copia l'avís i envia'l a mà."}; save(); if(S.view==="manteniment") render(); toast("Correu no enviat. "+i.avis.msg); return; }
  const c=correuInc(i);
  try{
    await mcp.callTool(M365,"outlook_send_mail",{to:dest,subject:c.subject,body:c.html,bodyType:"html"},{cache:false});
    i.avis={estat:"enviat",a:dest,hora:araIso()}; toast("Correu enviat a "+dest.join(", ")+".");
  }catch(err){
    const code=err&&err.code||"upstream_error";
    i.avis={estat:"error",a:dest,code,msg: code==="tool_error" ? "Outlook ha rebutjat el correu: "+(err.message||"") : (AVIS_ERR[code]||AVIS_ERR.upstream_error)};
    toast("Correu no enviat. "+i.avis.msg);
  }
  save(); if(S.view==="manteniment") render();
}
function avisChip(i){
  const a=i.avis; if(!a) return '';
  if(a.estat==="enviant") return '<span class="chip">Enviant correu…</span>';
  if(a.estat==="enviat") return '<span class="chip good" title="'+esc(a.a.join(", "))+'">Correu enviat '+a.hora.slice(11)+'</span>';
  return '<span class="chip crit" title="'+esc(a.msg||"")+'">Correu no enviat</span><button class="btn sm" data-reav="'+i.id+'">Tornar a enviar</button><button class="btn sm ghost" data-cpav="'+i.id+'">Copiar avís</button>';
}
function configAvisos(){
  const A=D.config.avisos;
  overlay(hdr("Avisos d'incidències","Correu electrònic")+'<form class="form" id="fav" novalidate>'+
  '<label class="check full"><input type="checkbox" id="av_on"'+(A.actiu?' checked':'')+'>Enviar un correu cada vegada que es registra una incidència</label>'+
  '<div class="field full"><label for="av_to">Destinataris (separats per comes)</label><input id="av_to" value="'+esc(A.destinataris.join(", "))+'"></div>'+
  '<p class="note full" style="margin:0">El correu surt del compte de Microsoft 365 de qui registra la incidència. El primer cop, claude.ai et demanarà permís.</p>'+
  '<div class="full alert" id="averr" hidden></div><div class="m-f full"><button type="button" class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" type="submit">Desar</button></div></form>');
  $("#fav").onsubmit=e=>{ e.preventDefault(); const l=$("#av_to").value.split(/[,;\s]+/).map(x=>x.trim()).filter(Boolean); const bad=l.filter(x=>!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(x));
    if(!l.length||bad.length){ const er=$("#averr"); er.textContent=bad.length?"Adreça no vàlida: "+bad.join(", "):"Posa almenys una adreça."; er.hidden=false; return; }
    A.actiu=$("#av_on").checked; A.destinataris=l; save(); closeOverlay(); toast("Avisos desats."); render(); };
}
/* ---------- Informes i justificació ---------- */
const PREV={p2any:84098.52, p3any:17651.56};
const MESOS=["gener","febrer","març","abril","maig","juny","juliol","agost","setembre","octubre","novembre","desembre"];
const nomMes = m => MESOS.at(Number(m.slice(5,7))-1)+" "+m.slice(0,4);
function mesosContracte(){ const out=[], AV=isoAvui().slice(0,7); for(let m=INICI_CONTRACTE.slice(0,7); m<=AV; m=addDays(m+"-28",5).slice(0,7)) out.push(m); return out; }
function barMes(cid,m){
  const dies=new Set(D.bar.historic.filter(x=>x.casal===cid&&x.data.startsWith(m)).map(x=>x.data).concat(D.bar.vendes.filter(x=>x.casal===cid&&x.data.startsWith(m)).map(x=>x.data)));
  let tot=0, ef=0, n=0, nd=0;
  dies.forEach(d=>{ const h=D.bar.historic.find(x=>x.casal===cid&&x.data===d); if(h){ tot+=h.total; ef+=h.ef; n+=h.vendes; } else { const r=resumBar(cid,d); tot+=r.tot; ef+=r.ef; n+=r.v.length; } nd++; });
  return {tot,ef,tg:tot-ef,n,dies:nd};
}
function apatsMes(m){ const A=D.apats, per={}; let ext=0, dies=0;
  (A.historic||[]).filter(h=>h.data.startsWith(m)).forEach(h=>{ dies++; ext+=h.externs; h.servits.forEach(x=>{ const o=per[x]||(per[x]={n:0,abs:0}); o.n++; }); h.absents.forEach(x=>{ const o=per[x]||(per[x]={n:0,abs:0}); o.abs++; }); });
  const rows=Object.entries(per).map(([x,o])=>{ const subv=A.subvencionats.includes(x), pr=subv?A.preuSubv:A.preuSoci; return {x,n:o.n,abs:o.abs,subv,pr,imp:o.n*pr}; }).sort((a,b)=>nomComplet(soci(a.x)).localeCompare(nomComplet(soci(b.x))));
  const tot=rows.reduce((t,r)=>t+r.imp,0)+ext*A.preuNoSoci; return {rows,ext,dies,tot,nApats:rows.reduce((t,r)=>t+r.n,0)+ext}; }
function copiar(text){ const done=()=>toast("Copiat. Enganxa-ho a l'Excel."); const fb=()=>{ overlay(hdr("Copia aquestes dades","CSV")+'<textarea id="csvta" rows="12" style="width:100%;font-family:ui-monospace,monospace;font-size:12px;border:1px solid var(--line);border-radius:10px;padding:10px;background:var(--surface)">'+esc(text)+'</textarea><p class="note" style="margin:0">Selecciona-ho tot i copia-ho.</p>'); const t=$("#csvta"); t.focus(); t.select(); };
  try{ navigator.clipboard.writeText(text).then(done,fb); }catch(e){ fb(); } }
const csv = rows => rows.map(r=>r.map(v=>{ const s=String(v); return /[;"\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s; }).join(";")).join("\n");
const n2 = v => (Math.round(v*100)/100).toFixed(2).replace(".",",");
function calcInforme(m){
  const ps=D.socis.filter(x=>!x.baixa), noves=D.socis.filter(x=>(x.alta||"").startsWith(m)).length;
  const ent=Object.entries(D.assist).filter(([k])=>k.split("|")[1].startsWith(m));
  const assist=ent.reduce((t,[,a])=>t+a.length,0), actives=new Set(ent.flatMap(([,a])=>a)).size;
  const deriv=D.derivacions.filter(d=>d.data.startsWith(m)).length, acol=ps.filter(x=>(x.alta||"").startsWith(m)||(x.acollida&&!x.acollida.completada)).length;
  const inc=D.manteniment.incidencies.filter(i=>i.estat==="resolta"&&i.resolt&&i.resolt.startsWith(m)); const incPct=inc.length?Math.round(inc.filter(i=>terminiInc(i).dins).length/inc.length*100):null;
  const net=Object.entries(D.manteniment.neteja).filter(([k])=>k.split("|")[1].startsWith(m));
  const netPct=net.length?Math.round(net.reduce((t,[k,a])=>{ const n=D.manteniment.tasques.filter(x=>!x.casal||x.casal===k.split("|")[0]).length||1; return t+a.length/n; },0)/net.length*100):null;
  const b1=barMes("c1",m), b2=barMes("c2",m), ap=apatsMes(m);
  const rb=D.rebuts.filter(r=>r.mes===m);
  const p3=D.activitats.filter(a=>a.comp).map(a=>{ const r=rb.filter(x=>x.act===a.id); return {nom:a.nom,casal:(casal(a.casal)||{curt:""}).curt,ins:a.inscrits.length,preu:a.preu,em:r.reduce((t,x)=>t+x.import,0),cob:r.filter(x=>x.pagat).reduce((t,x)=>t+x.import,0),pend:r.filter(x=>!x.pagat).length}; });
  return {mes:m, generat:araIso(),
    p1:{persones:ps.length,noves,actives,assist,acol,deriv,incPct,netPct},
    p2:{b1,b2,ap:{dies:ap.dies,nApats:ap.nApats,persones:ap.rows.length,subv:ap.rows.filter(r=>r.subv).length,tot:ap.tot}},
    p3,
    apats:{rows:ap.rows.map(r=>({nom:nomComplet(soci(r.x)),n:r.n,abs:r.abs,subv:r.subv,pr:r.pr,imp:r.imp})),ext:ap.ext,preuExt:D.apats.preuNoSoci,tot:ap.tot,nApats:ap.nApats}};
}
function htmlInforme(I, lectura, tancat){
  const P=I.p1, b1=I.p2.b1, b2=I.p2.b2, ap=I.p2.ap, p2=b1.tot+b2.tot+ap.tot, p2prev=PREV.p2any/12;
  const p3=I.p3.reduce((t,r)=>t+r.cob,0), p3em=I.p3.reduce((t,r)=>t+r.em,0), p3prev=PREV.p3any/12;
  const tile=(l,v,sub)=>'<div class="kpi"><div class="label">'+l+'</div><div class="val num" style="font-size:26px">'+v+'</div>'+(sub?'<div class="sub">'+sub+'</div>':'')+'</div>';
  const pct=v=>v==null?"—":v+"%";
  const meter=(v,prev)=>{ const p=Math.round(v/prev*100); return '<div style="display:flex;justify-content:space-between;font-size:13px;color:var(--muted)"><span>Previsió mensual '+eur(prev)+'</span><span class="num">'+p+'%</span></div><div class="bar" style="margin-top:6px"><i style="width:'+Math.min(100,p)+'%;background:'+(p>=100?'var(--good)':'var(--accent)')+'"></i></div>'; };
  return '<section class="panel"><div class="panel-h"><div><div class="eyebrow">Prestació 1</div><h2>Dinamització i gestió dels casals</h2></div></div><div class="kpis">'+
    tile("Persones usuàries",P.persones,P.noves+" altes noves")+tile("Persones que han participat",P.actives,P.assist+" assistències")+tile("Acollides i derivacions",P.acol,P.deriv+" derivacions")+tile("Manteniment i neteja",pct(P.incPct),"incidències en termini · neteja "+pct(P.netPct))+'</div></section>'+
  '<section class="panel"><div class="panel-h"><div><div class="eyebrow">Prestació 2 · concessió</div><h2>Bar i àpats en companyia</h2></div><button class="btn sm" id="cpP2">Copiar dades</button></div>'+
    '<div class="tablewrap" style="border:0"><table><thead><tr><th>Servei</th><th>Dies</th><th>Operacions</th><th>Efectiu</th><th>Targeta</th><th>Ingressos</th></tr></thead><tbody>'+
    '<tr><td>Bar · Ribes</td><td class="num">'+b1.dies+'</td><td class="num">'+b1.n+' vendes</td><td class="num">'+eur(b1.ef)+'</td><td class="num">'+eur(b1.tg)+'</td><td class="num"><b>'+eur(b1.tot)+'</b></td></tr>'+
    '<tr><td>Bar · Roquetes</td><td class="num">'+b2.dies+'</td><td class="num">'+b2.n+' vendes</td><td class="num">'+eur(b2.ef)+'</td><td class="num">'+eur(b2.tg)+'</td><td class="num"><b>'+eur(b2.tot)+'</b></td></tr>'+
    '<tr><td>Àpats en companyia · Roquetes</td><td class="num">'+ap.dies+'</td><td class="num">'+ap.nApats+' àpats</td><td colspan="2" style="color:var(--muted)">'+ap.persones+' persones · '+ap.subv+' derivades SS</td><td class="num"><b>'+eur(ap.tot)+'</b></td></tr>'+
    '<tr><td><b>Total ingressos d\'usuaris</b></td><td></td><td></td><td></td><td></td><td class="num"><b>'+eur(p2)+'</b></td></tr></tbody></table></div>'+meter(p2,p2prev)+
    '<p class="note" style="margin:0">Previsió: 84.098,52 € d\'ingressos d\'usuaris a l\'any, segons l\'estudi econòmic del PCAP. L\'aportació de l\'Ajuntament cobreix el dèficit d\'explotació.</p></section>'+
  '<section class="panel"><div class="panel-h"><div><div class="eyebrow">Prestació 3 · concessió</div><h2>Activitats complementàries</h2></div><div style="display:flex;gap:8px;flex-wrap:wrap">'+(lectura||tancat?'':'<button class="btn sm" id="emetreRb">Emetre rebuts del mes</button><button class="btn sm" id="rbPend">Rebuts pendents</button>')+'<button class="btn sm" id="cpP3">Copiar dades</button></div></div>'+
    (I.p3.length?'<div class="tablewrap" style="border:0"><table><thead><tr><th>Activitat</th><th>Casal</th><th>Inscrits</th><th>Tarifa</th><th>Emès</th><th>Cobrat</th><th>Pendents</th></tr></thead><tbody>'+
    I.p3.map(r=>'<tr><td>'+esc(r.nom)+'</td><td>'+esc(r.casal)+'</td><td class="num">'+r.ins+'</td><td class="num">'+(r.preu?eur(r.preu)+'/mes':'Gratuïta')+'</td><td class="num">'+eur(r.em)+'</td><td class="num"><b>'+eur(r.cob)+'</b></td><td>'+(r.pend?'<span class="chip warn">'+r.pend+'</span>':'—')+'</td></tr>').join("")+
    '<tr><td><b>Total</b></td><td></td><td></td><td></td><td class="num">'+eur(p3em)+'</td><td class="num"><b>'+eur(p3)+'</b></td><td></td></tr></tbody></table></div>':'<div class="empty">Encara no hi ha activitats marcades com a complementàries.</div>')+meter(p3,p3prev)+
    '<p class="note" style="margin:0">Tarifes aprovades: gimnàstica de manteniment 14,70 €/mes, ioga 8 €/mes, pintura i dibuix 36,75 €/mes, cant coral gratuït. Previsió: 17.651,56 € d\'ingressos el primer any.</p></section>'+
  '<section class="panel"><div class="panel-h"><div><div class="eyebrow">Informe mensual</div><h2>Àpats en companyia · '+nomMes(I.mes)+'</h2></div><button class="btn sm" id="cpAp">Copiar informe</button></div>'+
    '<div class="tablewrap" style="border:0"><table><thead><tr><th>Persona</th><th>Àpats</th><th>Absències</th><th>Tipus</th><th>Preu</th><th>Import</th></tr></thead><tbody>'+
    I.apats.rows.map(r=>'<tr><td>'+esc(r.nom)+'</td><td class="num">'+r.n+'</td><td>'+(r.abs>=2?'<span class="chip crit">'+r.abs+'</span>':r.abs||'—')+'</td><td>'+(r.subv?'<span class="chip warn">Derivada SS</span>':'Usuari/ària')+'</td><td class="num">'+eur(r.pr)+'</td><td class="num">'+eur(r.imp)+'</td></tr>').join("")+
    '<tr><td>Persones externes</td><td class="num">'+I.apats.ext+'</td><td></td><td>Externa</td><td class="num">'+eur(I.apats.preuExt)+'</td><td class="num">'+eur(I.apats.ext*I.apats.preuExt)+'</td></tr>'+
    '<tr><td><b>Total</b></td><td class="num"><b>'+I.apats.nApats+'</b></td><td></td><td></td><td></td><td class="num"><b>'+eur(I.apats.tot)+'</b></td></tr></tbody></table></div></section>';
}
VIEWS.informes = () => {
  const aj=S.rol==="ajuntament";
  const ms = aj ? Object.keys(D.informes).sort() : mesosContracte();
  const cap='<div class="eyebrow">Contracte 01040604/2026/9 · Ajuntament de Sant Pere de Ribes</div><h1>Informes i justificació</h1>';
  if(!ms.length) return '<div class="head"><div>'+cap+'<p>Encara no hi ha cap mes tancat i publicat per la Fundació.</p></div></div>';
  if(!S.mes||!ms.includes(S.mes)) S.mes=ms.at(-1); const m=S.mes, AV=isoAvui();
  const tancat=D.mesosTancats[m], pub=D.informes[m];
  const I = aj ? pub : (tancat && pub ? pub : calcInforme(m)); S._inf=I;
  const estat = aj ? 'Informe publicat per la Fundació el '+fdata(I.generat.slice(0,10))+'.' : tancat ? 'Mes tancat el '+fdata(tancat.data)+'. L\'Ajuntament veu aquest informe. Les dades estan bloquejades.' : (pub ? 'Mes reobert. L\'Ajuntament continua veient la versió del '+fdata(pub.generat.slice(0,10))+' fins que el tornis a tancar.' : m===AV.slice(0,7)?'Mes en curs, dades fins avui. En tancar-lo, l\'informe es publica per a l\'Ajuntament.':'Mes sense tancar.');
  return '<div class="head"><div>'+cap+'<p>'+estat+'</p>'+(aj?'':'<div style="display:flex;gap:8px;margin-top:10px;flex-wrap:wrap">'+(tancat?'<span class="chip good">Mes tancat</span><button class="btn sm" id="reobrirMes">Reobrir mes</button>':'<button class="btn sm primary" id="tancarMes">Tancar i publicar el mes</button>')+'</div>')+'</div><div class="filters" role="group" aria-label="Mes">'+ms.map(x=>'<button data-mes="'+x+'" aria-pressed="'+(x===m)+'">'+nomMes(x)+'</button>').join("")+'</div></div>'+
    htmlInforme(I, aj, !!tancat);
};
BIND.informes = () => {
  document.querySelectorAll("[data-mes]").forEach(b=>b.onclick=()=>{ S.mes=b.dataset.mes; render(); });
  const I=S._inf; if(!I) return; const m=I.mes, b1=I.p2.b1, b2=I.p2.b2, ap=I.p2.ap;
  $("#cpP2").onclick=()=>copiar(csv([["Servei","Dies","Operacions","Efectiu","Targeta","Ingressos"],["Bar Ribes",b1.dies,b1.n,n2(b1.ef),n2(b1.tg),n2(b1.tot)],["Bar Roquetes",b2.dies,b2.n,n2(b2.ef),n2(b2.tg),n2(b2.tot)],["Àpats Roquetes",ap.dies,ap.nApats,"","",n2(ap.tot)]]));
  $("#cpP3").onclick=()=>copiar(csv([["Activitat","Casal","Inscrits","Tarifa","Emès","Cobrat"]].concat(I.p3.map(r=>[r.nom,r.casal,r.ins,n2(r.preu),n2(r.em),n2(r.cob)]))));
  $("#cpAp").onclick=()=>copiar(csv([["Persona","Àpats","Absències","Tipus","Preu","Import"]].concat(I.apats.rows.map(r=>[r.nom,r.n,r.abs,r.subv?"Derivada SS":"Usuari/ària",n2(r.pr),n2(r.imp)]),[["Persones externes",I.apats.ext,"","Externa",n2(I.apats.preuExt),n2(I.apats.ext*I.apats.preuExt)]])));
  const rp=$("#rbPend"); if(rp) rp.onclick=()=>rebutsPendents();
  const er=$("#emetreRb"); if(er) er.onclick=()=>{ let n=0; D.activitats.filter(a=>a.comp&&a.preu>0&&inCasal(a)).forEach(a=>a.inscrits.forEach(x=>{ if(!D.rebuts.find(r=>r.mes===m&&r.act===a.id&&r.soci===x)){ D.rebuts.push({id:uid("rb"),mes:m,soci:x,act:a.id,import:a.preu,pagat:false}); n++; } })); save(); toast(n?n+" rebuts emesos per a "+nomMes(m)+".":"Ja estaven tots emesos."); render(); };
  const tm=$("#tancarMes"); if(tm) tm.onclick=()=>{ overlay(hdr("Tancar "+nomMes(m),"Justificació")+'<p style="margin:0">Un cop tancat, les dades d\'aquest mes queden bloquejades i l\'informe es publica perquè l\'Ajuntament el pugui consultar.</p><div class="m-f"><button class="btn ghost" data-close>Cancel·lar</button><button class="btn primary" id="okTM">Tancar i publicar</button></div>'); $("#okTM").onclick=()=>{ D.informes[m]=calcInforme(m); D.mesosTancats[m]={data:isoAvui(),per:ME.email}; logCanvi("Tancament mensual",nomMes(m)); save(); closeOverlay(); toast(nomMes(m)+" tancat i publicat."); render(); }; };
  const rm=$("#reobrirMes"); if(rm) rm.onclick=()=>confirmMotiu("Reobrir "+nomMes(m),"Les dades del mes es podran tornar a modificar. L'Ajuntament continuarà veient l'informe publicat fins que el tornis a tancar.","Reobrir",mo=>{ delete D.mesosTancats[m]; logCanvi("Reobertura de mes",nomMes(m),mo); save(); toast(nomMes(m)+" reobert."); render(); });
};
function rebutsPendents(){
  const m=S.mes, rb=D.rebuts.filter(r=>r.mes===m&&!r.pagat&&D.activitats.find(x=>x.id===r.act)), tancat=!!D.mesosTancats[m];
  overlay(hdr("Rebuts pendents", nomMes(m))+'<div class="list">'+(rb.map(r=>{ const a=D.activitats.find(x=>x.id===r.act); return '<div class="row"><div class="t"><b>'+esc(nomComplet(soci(r.soci)))+'</b><span>'+esc(a.nom)+' · '+esc(casal(a.casal).curt)+'</span></div><span class="num">'+eur(r.import)+'</span>'+(tancat?'<span class="chip">Mes tancat</span>':'<button class="btn sm primary" data-rbok="'+r.id+'">Cobrat</button>')+'</div>'; }).join("")||'<div class="empty">Tots els rebuts d\'aquest mes estan cobrats.</div>')+'</div>');
  document.querySelectorAll("[data-rbok]").forEach(b=>b.onclick=()=>{ const r=D.rebuts.find(x=>x.id===b.dataset.rbok); r.pagat=true; save(); toast("Rebut cobrat."); render(); rebutsPendents(); });
}


/* ---------- Usuaris (només Administració) ---------- */
VIEWS.usuaris = () => {
  const us=S._usuaris;
  if(!us) return '<div class="head"><div><h1>Usuaris i accessos</h1><p>Carregant…</p></div></div>';
  const pend=us.filter(u=>u.rol==="pendent"&&u.actiu);
  const opR=u=>'<select class="select" data-urol="'+u.id+'" aria-label="Perfil"'+(u.id===ME.id?' disabled':'')+'>'+["pendent","admin","direccio","dinamitzador","informador","ajuntament"].map(r=>'<option value="'+r+'"'+(u.rol===r?' selected':'')+'>'+(r==="pendent"?"Sense accés":ROLS[r])+'</option>').join("")+'</select>';
  const opC=u=>'<select class="select" data-ucas="'+u.id+'" aria-label="Casal"'+(["dinamitzador","informador"].includes(u.rol)?'':' disabled')+'><option value="">—</option>'+D.casals.map(c=>'<option value="'+c.id+'"'+(u.casal===c.id?' selected':'')+'>'+esc(c.curt)+'</option>').join("")+'</select>';
  return '<div class="head"><div><h1>Usuaris i accessos</h1><p>Tu gestiones qui entra i amb quin perfil. Els canvis s\'apliquen la propera vegada que la persona entri.</p></div></div>'+
  (pend.length?'<div class="alert" style="background:var(--warn-soft);color:var(--warn)">'+pend.length+' '+(pend.length===1?'persona espera':'persones esperen')+' que li assignis un perfil.</div>':'')+
  '<div class="note">Per donar d\'alta un treballador: digues-li que entri a aquesta adreça i faci clic a «Sol·licitar accés». Quan hagi confirmat el correu, apareixerà aquí i li assignes el perfil i el casal.</div>'+
  '<div class="tablewrap"><table><thead><tr><th>Persona</th><th>Perfil</th><th>Casal</th><th>Accés</th><th>Contrasenya</th></tr></thead><tbody>'+
  us.map(u=>'<tr><td><div class="who"><span class="avatar">'+esc(((u.nom||u.email).split(/\s+/).map(x=>x[0]).join("").slice(0,2)).toUpperCase())+'</span><div>'+esc(u.nom||"(sense nom)")+(u.id===ME.id?' <span class="chip">Tu</span>':'')+'<small>'+esc(u.email)+'</small></div></div></td><td>'+opR(u)+'</td><td>'+opC(u)+'</td><td>'+(u.id===ME.id?'<span class="chip good">Actiu</span>':'<button class="tog" data-uact="'+u.id+'" aria-pressed="'+u.actiu+'">'+(u.actiu?'Actiu':'Desactivat')+'</button>')+'</td><td><button class="btn sm" data-upw="'+esc(u.email)+'">Enviar enllaç</button></td></tr>').join("")+
  '</tbody></table></div>'+
  '<section class="panel"><div class="panel-h"><h2>Com funciona</h2></div><div class="list">'+[
   "«Sense accés»: la persona pot entrar però no veu cap dada.",
   "Dinamitzador/a i Informador/a han de tenir un casal assignat. Només veuran aquell casal.",
   "Desactivar un compte li treu l'accés a l'instant, sense esborrar-ne l'historial.",
   "«Enviar enllaç» envia un correu a la persona per posar una contrasenya nova. Tu no veus mai les contrasenyes.",
   "No et pots treure el perfil d'administrador a tu mateix."].map(t=>'<div class="row"><div class="t"><span style="color:var(--ink);font-size:14px">'+t+'</span></div></div>').join("")+'</div></section>';
};
async function carregarUsuaris(){ const {data,error}=await sb.from("perfils").select("*").order("creat"); if(error){ toast("No s'han pogut carregar els usuaris."); return; } S._usuaris=data; if(S.view==="usuaris") render(); }
async function canviUsuari(id, canvis, desc){
  const u=S._usuaris.find(x=>x.id===id);
  const {error}=await sb.from("perfils").update(canvis).eq("id",id);
  if(error){ toast("No s'ha pogut desar: "+textError(error)); await carregarUsuaris(); return; }
  Object.assign(u,canvis); logCanvi("Canvi d'usuari",u.email+" · "+desc); toast("Desat."); render();
}
BIND.usuaris = () => {
  if(!S._usuaris){ carregarUsuaris(); return; }
  document.querySelectorAll("[data-urol]").forEach(sl=>sl.onchange=()=>{ const r=sl.value, c={rol:r}; if(!["dinamitzador","informador"].includes(r)) c.casal=null; else if(!S._usuaris.find(x=>x.id===sl.dataset.urol).casal) c.casal="c1"; canviUsuari(sl.dataset.urol,c,"perfil: "+(ROLS[r]||"sense accés")); });
  document.querySelectorAll("[data-ucas]").forEach(sl=>sl.onchange=()=>canviUsuari(sl.dataset.ucas,{casal:sl.value||null},"casal: "+(sl.value?casal(sl.value).curt:"cap")));
  document.querySelectorAll("[data-uact]").forEach(b=>b.onclick=()=>{ const u=S._usuaris.find(x=>x.id===b.dataset.uact); canviUsuari(u.id,{actiu:!u.actiu},u.actiu?"desactivat":"activat"); });
  document.querySelectorAll("[data-upw]").forEach(b=>b.onclick=async()=>{ const {error}=await sb.auth.resetPasswordForEmail(b.dataset.upw,{redirectTo:location.origin+location.pathname}); toast(error?"No s'ha pogut enviar: "+error.message:"Enllaç enviat a "+b.dataset.upw+"."); });
};
/* ---------- Portal del soci ---------- */
function portal(){
  const s=soci(S.portalSoci)||D.socis[0]; S.portalSoci=s.id;
  const meves=D.activitats.filter(a=>a.inscrits.includes(s.id)||a.espera.includes(s.id)).sort((a,b)=>a.dia-b.dia);
  const altres=D.activitats.filter(a=>a.casal===s.casal && !meves.includes(a)).sort((a,b)=>a.dia-b.dia||mins(a.inici)-mins(b.inici));
  const card=(a,mine)=>{ const esp=a.espera.includes(s.id), full=a.inscrits.length>=a.places;
    return '<article class="pcard'+(mine?' mine':'')+'"><div>'+eixChip(a.eix)+'</div><h3>'+esc(a.nom)+'</h3><div class="when">'+DIES[a.dia]+' · '+a.inici+'</div><div style="color:var(--muted);font-size:15px">'+esc(sala(a.sala).nom)+' · '+(a.preu?a.preu+' € al mes':'Gratuïta')+'</div>'+
    (mine ? (esp?'<div class="chip warn" style="align-self:flex-start">Llista d\'espera · posició '+(a.espera.indexOf(s.id)+1)+'</div>':'<div class="chip good" style="align-self:flex-start">Hi estàs apuntat/da</div>')+'<button class="btn" data-pb="'+a.id+'">'+(esp?'Sortir de la llista':'Desapuntar-me')+'</button>'
    : (full?'<div style="font-size:15px;color:var(--warn)">Plena. Et podem avisar si queda lloc.</div>':'<div style="font-size:15px;color:var(--muted)">Queden '+(a.places-a.inscrits.length)+' places</div>')+'<button class="btn '+(full?'':'primary')+'" data-pa="'+a.id+'">'+(full?'Avisa\'m si queda lloc':'M\'hi apunto')+'</button>')+'</article>'; };
  return '<main class="portal"><div class="hello"><div><div class="eyebrow">'+esc(casal(s.casal).nom)+'</div><h1>Hola, '+esc(s.nom)+'!</h1><p style="margin:6px 0 0;color:var(--muted)">Aquí tens les teves activitats de la setmana.</p></div>'+
  '<div class="carnet"><canvas id="qr" width="84" height="84" aria-label="Codi QR del carnet (exemple)"></canvas><div><small>Carnet del casal</small><b>'+esc(nomComplet(s))+'</b><small class="num">Núm. '+s.num+'</small><small>Ensenya\'l a l\'entrada</small></div></div></div>'+
  '<section style="display:flex;flex-direction:column;gap:14px"><h2 style="font-size:24px">Les meves activitats</h2>'+(meves.length?'<div class="pcards">'+meves.map(a=>card(a,true)).join("")+'</div>':'<p style="color:var(--muted)">Encara no t\'has apuntat a cap activitat.</p>')+'</section>'+
  portalApats(s) +
  '<section style="display:flex;flex-direction:column;gap:14px"><h2 style="font-size:24px">Vols provar alguna cosa nova?</h2><div class="pcards">'+altres.map(a=>card(a,false)).join("")+'</div></section>'+
  '<p class="demo-flag">Prototip amb dades d\'exemple. El QR és il·lustratiu.</p></main>';
}
function portalApats(s){
  if(s.casal!=="c2") return "";
  const A=D.apats, di=avuiIdx7(), m=A.menus[di], r=A.reserves.find(x=>x.dia===di&&x.soci===s.id), n=A.reserves.filter(x=>x.dia===di).length;
  return '<section style="display:flex;flex-direction:column;gap:14px"><h2 style="font-size:24px">Dinar amb companyia</h2><article class="pcard'+(r?' mine':'')+'" style="max-width:520px"><div class="when">'+'Avui a les '+A.hora+' · Menjador</div><div class="menu"><div><small>Primer</small><b>'+esc(m.primer)+'</b></div><div><small>Segon</small><b>'+esc(m.segon)+'</b></div><div><small>Postres</small><b>'+esc(m.postres)+'</b></div></div><div style="color:var(--muted);font-size:15px">'+eur(A.subvencionats.includes(s.id)?A.preuSubv:A.preuSoci)+' · Queden '+(A.places-n)+' places</div>'+
  (r?'<div class="chip good" style="align-self:flex-start">Tens el dinar reservat</div><button class="btn" id="apB">Anul·lar la reserva</button>':'<button class="btn primary" id="apR"'+(n>=A.places?' disabled':'')+'>'+(n>=A.places?'Menjador ple':'Reserva el dinar')+'</button>')+'</article></section>';
}
function bindPortal(){
  const s=soci(S.portalSoci);
  document.querySelectorAll("[data-pa]").forEach(b=>b.onclick=()=>{ const a=D.activitats.find(x=>x.id===b.dataset.pa); const r=inscriure(a,s.id); toast(r==="inscrit"?"Fet! T'esperem "+DIES[a.dia].toLowerCase()+" a les "+a.inici+".":"T'hem posat a la llista d'espera. T'avisarem."); render(); });
  document.querySelectorAll("[data-pb]").forEach(b=>b.onclick=()=>{ const a=D.activitats.find(x=>x.id===b.dataset.pb); baixa(a,s.id); toast("T'hem desapuntat de "+a.nom+"."); render(); });
  const ar=$("#apR"); if(ar) ar.onclick=()=>{ D.apats.reserves.push({id:uid("m"),dia:avuiIdx7(),soci:s.id,nom:"",pagat:false,vingut:false,dieta:"",subv:D.apats.subvencionats.includes(s.id)}); save(); toast("Fet! T'esperem a les "+D.apats.hora+"."); render(); };
  const ab=$("#apB"); if(ab) ab.onclick=()=>{ D.apats.reserves=D.apats.reserves.filter(x=>!(x.dia===avuiIdx7()&&x.soci===s.id)); save(); toast("Reserva anul·lada."); render(); };
  drawQR($("#qr"), s.num);
}
function drawQR(cv, seedN){
  if(!cv) return; const c=cv.getContext("2d"), n=21, px=4; c.fillStyle="#fff"; c.fillRect(0,0,84,84); c.fillStyle="#14201C";
  let x=seedN*9301+49297; const rnd=()=>{ x=(x*9301+49297)%233280; return x/233280; };
  const finder=(ox,oy)=>{ for(let i=0;i<7;i++)for(let j=0;j<7;j++){ if(i===0||i===6||j===0||j===6||(i>1&&i<5&&j>1&&j<5)) c.fillRect((ox+i)*px,(oy+j)*px,px,px); } };
  for(let i=0;i<n;i++)for(let j=0;j<n;j++){ const inF=(i<8&&j<8)||(i>12&&j<8)||(i<8&&j>12); if(!inF && rnd()>.52) c.fillRect(i*px,j*px,px,px); }
  finder(0,0); finder(14,0); finder(0,14);
}

boot();
})();
