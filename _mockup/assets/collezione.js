/* collezione.html: filtri, ordinamento e «Carica altri» lato client sui dati reali di BZ_COLL. */
(()=>{'use strict';
const q=(s,r=document)=>r.querySelector(s),qa=(s,r=document)=>[...r.querySelectorAll(s)];
const DATA=(window.BZ_COLL||[]).slice(),PAGE=24,params=new URLSearchParams(location.search);
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
const eur=n=>n.toFixed(2).replace('.',',')+' €';
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// titolo originale del prodotto; se è ancora nel formato «Nome | Significato» si tiene solo il nome
const split=t=>({n:t.split('|')[0].trim()});
const img=(u,w)=>u+(u.includes('?')?'&':'?')+'width='+w;
const TYPES=['Ciondoli','Bracciali','Collane'];
const INTS=['Serenità','Protezione','Affetti','Coraggio','Concentrazione'];
const PMIN=Math.floor(Math.min(...DATA.map(p=>p.p))),PMAX=Math.ceil(Math.max(...DATA.map(p=>p.p)));
const st={k:'',i:new Set(),s:new Set(),avail:false,min:PMIN,max:PMAX,sort:'f',shown:PAGE};
const grid=q('[data-grid]'),empty=q('[data-empty]'),more=q('[data-more]'),live=q('[data-live]');

// match senza un certo filtro, per i conteggi delle faccette
const match=(p,skip)=>(skip==='k'||!st.k||p.k===st.k)&&(skip==='avail'||!st.avail||p.a)&&(skip==='price'||(p.p>=st.min&&p.p<=st.max))
 &&(skip==='i'||!st.i.size||p.i.some(x=>st.i.has(x)))&&(skip==='s'||!st.s.size||p.s.some(x=>st.s.has(x)));
const sorters={f:(a,b)=>(b.a-a.a)||a.f-b.f,new:(a,b)=>(b.a-a.a)||b.c.localeCompare(a.c),pa:(a,b)=>(b.a-a.a)||a.p-b.p,pd:(a,b)=>(b.a-a.a)||b.p-a.p,az:(a,b)=>split(a.t).n.localeCompare(split(b.t).n,'it')};

// pill sottocategorie
const chips=q('[data-chips]');
const renderChips=()=>{const base=DATA.filter(p=>match(p,'k'));chips.innerHTML=[['','Tutti'],...TYPES.map(t=>[t,t])].map(([v,l])=>{const n=v?base.filter(p=>p.k===v).length:base.length;return `<button class="chip${n?'':' zero'}" type="button" data-k="${v}" aria-pressed="${st.k===v}">${l} <small>${n}</small></button>`}).join('')};
chips.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(!b)return;st.k=b.dataset.k;st.shown=PAGE;update()});

// faccette nel pannello
const stones=[...new Set(DATA.flatMap(p=>p.s))];
const stoneCount=s=>DATA.filter(p=>p.s.includes(s)).length;
stones.sort((a,b)=>stoneCount(b)-stoneCount(a)||a.localeCompare(b,'it'));
const facet=(key,values)=>{const box=q(`[data-facet="${key}"]`);box.innerHTML=values.map((v,n)=>`<label class="fpill${key==='s'&&n>=12?' extra':''}"><input type="checkbox" value="${esc(v)}"><span>${esc(v)} <small></small></span></label>`).join('');
 box.addEventListener('change',e=>{const set=st[key];e.target.checked?set.add(e.target.value):set.delete(e.target.value);st.shown=PAGE;update()})};
facet('i',INTS);facet('s',stones);
const moreStones=q('[data-stones-more]');moreStones.textContent=`Mostra tutte (${stones.length})`;
moreStones.addEventListener('click',()=>{const box=q('[data-facet="s"]'),open=!box.classList.contains('all');box.classList.toggle('all',open);moreStones.setAttribute('aria-expanded',String(open));moreStones.textContent=open?'Mostra meno':`Mostra tutte (${stones.length})`;if(!open)moreStones.focus()});
const updFacets=()=>{['i','s'].forEach(key=>{const base=DATA.filter(p=>match(p,key));qa(`[data-facet="${key}"] input`).forEach(inp=>{const n=base.filter(p=>p[key].includes(inp.value)).length;inp.checked=st[key].has(inp.value);inp.disabled=!n&&!inp.checked;inp.nextElementSibling.querySelector('small').textContent=n})});
 // le pietre scelte restano visibili anche col pannello chiuso a 12
 qa('[data-facet="s"] .fpill.extra').forEach(l=>l.style.display=l.querySelector('input').checked?'block':'');
 const av=DATA.filter(p=>match(p,'avail')&&p.a).length;q('[data-avail-count]').textContent=av;q('[data-avail]').checked=st.avail};

// prezzo
const rMin=q('[data-min]'),rMax=q('[data-max]'),fill=q('[data-fill]');
[rMin,rMax].forEach(r=>{r.min=PMIN;r.max=PMAX});rMin.value=PMIN;rMax.value=PMAX;
const paintRange=()=>{const a=(st.min-PMIN)/(PMAX-PMIN),b=(st.max-PMIN)/(PMAX-PMIN);fill.style.left=`calc(12px + (100% - 24px) * ${a})`;fill.style.right=`calc(12px + (100% - 24px) * ${1-b})`;q('[data-min-out]').textContent=st.min+' €';q('[data-max-out]').textContent=st.max+' €';rMin.setAttribute('aria-valuetext',st.min+' euro');rMax.setAttribute('aria-valuetext',st.max+' euro')};
let rt;const onRange=e=>{let a=+rMin.value,b=+rMax.value;if(a>b){if(e.target===rMin)a=b;else b=a}rMin.value=a;rMax.value=b;st.min=a;st.max=b;paintRange();clearTimeout(rt);rt=setTimeout(()=>{st.shown=PAGE;update()},120)};
rMin.addEventListener('input',onRange);rMax.addEventListener('input',onRange);
q('[data-avail]').addEventListener('change',e=>{st.avail=e.target.checked;st.shown=PAGE;update()});
q('[data-sort]').addEventListener('change',e=>{st.sort=e.target.value;st.shown=PAGE;update()});

// filtri attivi rimovibili
const activeBox=q('[data-active]');
const actives=()=>[...(st.k?[['k',st.k,st.k]]:[]),...(st.avail?[['avail','','Solo disponibili']]:[]),...((st.min>PMIN||st.max<PMAX)?[['price','',`${st.min}-${st.max} €`]]:[]),...[...st.i].map(v=>['i',v,v]),...[...st.s].map(v=>['s',v,v])];
const renderActive=()=>{const a=actives();activeBox.hidden=!a.length;activeBox.innerHTML=a.map(([k,v,l])=>`<button class="afchip" type="button" data-rm="${k}" data-v="${esc(v)}" aria-label="Togli il filtro ${esc(l)}">${esc(l)}<span class="ico ico-close" aria-hidden="true"></span></button>`).join('')+(a.length>1?'<button class="af-clear" type="button" data-clear>Azzera tutto</button>':'');
 const n=a.filter(x=>x[0]!=='k').length,badge=q('[data-filter-count]');badge.hidden=!n;badge.textContent=n};
activeBox.addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(!b)return;const k=b.dataset.rm,v=b.dataset.v;if(k==='k')st.k='';else if(k==='avail')st.avail=false;else if(k==='price'){st.min=PMIN;st.max=PMAX;rMin.value=PMIN;rMax.value=PMAX;paintRange()}else st[k].delete(v);st.shown=PAGE;update();(q('[data-rm]',activeBox)||q('[data-filters-open]')).focus()});
const clearAll=()=>{st.k='';st.i.clear();st.s.clear();st.avail=false;st.min=PMIN;st.max=PMAX;rMin.value=PMIN;rMax.value=PMAX;paintRange();st.shown=PAGE;update()};
document.addEventListener('click',e=>{if(e.target.closest('[data-clear]')){clearAll();if(e.target.closest('[data-empty],[data-active]'))q('[data-filters-open]').focus()}});

// card
const card=(p,fresh)=>{const {n}=split(p.t),url='https://benesserezen.shop/products/'+p.h;
 return `<article class="product pcard${fresh?' is-new':''}"><a href="${url}"><div class="pc-well">${p.a?'':'<span class="pc-badge">Esaurito</span>'}<img src="${img(p.img,640)}" alt="${esc(n)}" loading="lazy" decoding="async" width="640" height="640"></div><h3 class="pc-name">${esc(n)}</h3></a><div class="product-bottom"><div class="price${p.a?'':' out'}">${eur(p.p)}</div>${p.a?`<button class="add" type="button" aria-label="Aggiungi ${esc(n)} al carrello">+</button>`:`<button class="add" type="button" disabled aria-label="${esc(n)}: esaurito">+</button>`}</div></article>`};
let lastShown=0,lastKey='';
const update=()=>{const list=DATA.filter(p=>match(p)).sort(sorters[st.sort]);const total=list.length,shown=Math.min(st.shown,total);
 const key=JSON.stringify([st.k,[...st.i],[...st.s],st.avail,st.min,st.max,st.sort]);
 if(key===lastKey&&shown>lastShown){grid.insertAdjacentHTML('beforeend',list.slice(lastShown,shown).map(p=>card(p,!reduced.matches)).join(''))}
 else grid.innerHTML=list.slice(0,shown).map(p=>card(p,false)).join('');
 lastShown=shown;lastKey=key;
 empty.hidden=total>0;grid.hidden=!total;more.hidden=!total;
 q('[data-shown]').textContent=shown;q('[data-of]').textContent=total;q('[data-bar]').style.transform=`scaleX(${total?shown/total:0})`;q('[data-load]').hidden=shown>=total;
 q('[data-total]').textContent=DATA.filter(p=>!st.k||p.k===st.k).length;
 q('[data-apply]').textContent=total?`Mostra ${total} ${total===1?'pezzo':'pezzi'}`:'Nessun pezzo';
 live.textContent=total?`${total} ${total===1?'pezzo':'pezzi'}`:'Nessun pezzo con questi filtri';
 renderChips();updFacets();renderActive()};
q('[data-load]').addEventListener('click',()=>{const first=lastShown;st.shown+=PAGE;update();const next=grid.children[first];next?.querySelector('a')?.focus({preventScroll:true})});

// aggiungi: apre il carrello dimostrativo (stesso comportamento delle altre pagine)
grid.addEventListener('click',e=>{const b=e.target.closest('.add');if(!b||b.disabled)return;b.focus();q('header [data-cart-open]')?.click()});

// pannello filtri: dialog con focus trap, Esc, ritorno del focus
const ov=q('[data-filters-overlay]'),dlg=q('#filters'),opener=q('[data-filters-open]');let back;
const focusables=()=>qa('button:not([disabled]):not([tabindex="-1"]),input:not([disabled]),select,a[href]',dlg).filter(el=>el.offsetParent!==null);
const openF=()=>{back=document.activeElement;ov.hidden=false;document.body.classList.add('locked');opener.setAttribute('aria-expanded','true');requestAnimationFrame(()=>{ov.classList.add('open');dlg.focus()})};
const closeF=()=>{if(ov.hidden)return;ov.classList.remove('open');opener.setAttribute('aria-expanded','false');document.body.classList.remove('locked');const done=()=>{ov.hidden=true};if(reduced.matches)done();else setTimeout(done,300);(back&&document.contains(back)?back:opener).focus()};
opener.addEventListener('click',openF);
qa('[data-filters-close]').forEach(b=>b.addEventListener('click',closeF));
document.addEventListener('keydown',e=>{if(ov.hidden)return;if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeF();return}
 if(e.key==='Tab'){const f=focusables(),a=f[0],z=f.at(-1);if(e.shiftKey&&(document.activeElement===a||document.activeElement===dlg)){z.focus();e.preventDefault()}else if(!e.shiftKey&&document.activeElement===z){a.focus();e.preventDefault()}}},true);

// stati per le schermate: ?k=Ciondoli ?int=Protezione ?stone=Ametista ?avail=1 ?state=filters|empty|more
if(params.get('k'))st.k=params.get('k');
params.getAll('int').forEach(v=>st.i.add(v));params.getAll('stone').forEach(v=>st.s.add(v));
if(params.get('avail')==='1')st.avail=true;
if(params.get('state')==='empty'){st.s.add('Pirite');st.i.add('Affetti')}
if(params.get('state')==='more')st.shown=PAGE*2;
paintRange();update();
if(params.get('state')==='filters'){ov.hidden=false;ov.classList.add('open');document.body.classList.add('locked');opener.setAttribute('aria-expanded','true')}
})();
