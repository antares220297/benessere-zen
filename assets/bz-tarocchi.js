/* Benessere Zen · Mazzi delle intenzioni. */
(() => {
  'use strict';
  if (window.BZTarocchi) return;

  const selector = '[data-bz-tarocchi]';
  const instances = new WeakMap();
  const RM = matchMedia('(prefers-reduced-motion: reduce)');
  const FINE = matchMedia('(hover:hover) and (pointer:fine)');
  const rad = degrees => degrees * Math.PI / 180;
  const label = title => title.replace(/\s+/g, ' ').trim();
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);

  /* geometria comune ai due mazzi.
     rot: gradi per posizione nella fila; curve: discesa delle carte esterne (× altezza carta); rowGap: distanza tra le file (× altezza);
     wide: la fila sotto è più larga; sp: passo tra le carte (× larghezza) che lascia leggere per intero i nomi delle carte coperte a 1440
     (0,6 sotto i 768px, dove i nomi coperti sono parziali come in M1); fw: il mazzo da 10 occupa l'85% della colonna; cap: carta massima. */
  /* 19/11 sera (Michael da iPhone): carte più grandi.
     Sotto i 768px il 5+5 aperto riempie il pannello lasciando sideMobile (18px) per lato; passo 0,5: la striscia scoperta di ogni carta
     resta larga come prima (0,5 × 94 ≈ 0,6 × 79 = 47px a 390), le carte crescono del 19%. Il 3+3 usa la stessa carta.
     Da 768 in su il 10 occupa il 92% della colonna (era 85%), tetto 156px (era 140): sempre ≥ 16px dal bordo del pannello.
     edge: distanza minima della carta estratta (ingrandita) dal bordo dello stage. */
  /* 19/11 notte (Michael: «allargare un po' tutte… trovare l'equilibrio»).
     Mobile: file da 3 a passo 0,8 (nomi interi, la carta non cambia); file da 5 da 0,5 a 0,55 (carta −6%).
     Per avere ≥85% di nome anche su Concentrazione/Comunicazione nel 5+5 servirebbe passo 0,73 → carta 72,5px a 390: nome 8,1px e le pietre (10px)
     non ci stanno più (il disco scende al 12% della carta). Misure in shots/finale-pannelli/controlli.md.
     Desktop: file da 3 a passo 0,95; quando la carta è al tetto anche il passo del 5+5 cresce fino a spMax. */
  /* 19/11 22:45 (riferimento di Michael, ricerca/iphone-michael-2158/rif-arco-michael.png): su mobile ogni fila è un arco a mano di carte.
     Carta centrale dritta e più alta, laterali ±6° e ±12° (rotMobile 6 per posizione) con caduta 0,07 × altezza × posizione² (0,07 e 0,28);
     carte quasi affiancate (passo 0,78 della carta nel 5+5, 0,85 nel 3+3; nomi coperti ≥ 85%), fila sotto uguale (wideMobile 1), file distanziate 1,1 × altezza. Il 3+3 segue la stessa logica.
     Desktop invariato. */
  const P={rot:6,curve:.07,rowGap:1.02,wide:1,sp:.79,spMax:.95,spMobile:.78,sp3:.95,sp3Mobile:.85,fw:.92,sideMobile:11,cap:156,minTwoCol:100,deckCol:.6,edge:16,edgeMobile:8,rotMobile:6,curveMobile:.07,wideMobile:1,stagMobile:0,rowGapMobile:1.1,cwMinMobile:78,spMinMobile:.6,
    /* 19/11 23:10: mobile misurato carta per carta su ricerca/iphone-michael-2302/riferimento.png (Gioia 146×242 px immagine, pannello 732 px):
       carta 3:5; per posizione dal centro [x in larghezze carta, caduta in altezze carta, rotazione]; file a 1,124 altezze; margine minimo 2px */
    ratMobile:5/3, arcMobile:[[0,0,0],[.893,.087,12.35],[1.770,.277,19.1]], rowGapRef:1.124, sideRef:.4, cwMinRef:72, cwShrink:.965};
  const MOB=()=>innerWidth<768;
  const RAT=()=>MOB()?P.ratMobile:1.5; // 19/11 22:46 (Michael): carta corta e piena (2:3) ovunque, come rif-arco-michael.png; le pietre stanno sul retro
  const spNow=()=>MOB()?P.spMobile:P.sp;
  const rotNow=()=>MOB()?P.rotMobile:P.rot, curveNow=()=>MOB()?P.curveMobile:P.curve, wideNow=()=>MOB()?P.wideMobile:P.wide, stagNow=()=>MOB()?P.stagMobile:0;
  const sp3Now=()=>MOB()?P.sp3Mobile:P.sp3; // passo delle file da 3 (il 3+3): può essere più ampio, c'è spazio ai lati
  /* la carta più grande per cui il mazzo da 10 (5+5) sta nella larghezza W (desktop: 92% di W; mobile: W meno 18px per lato) */
  /* 20/11 00:12 (Michael): il 5+5 non tocca più il pannello. Margine laterale dallo stage: 7px a 318px di stage (telefono 360) → 11px a 388 (telefono 430),
     +1px di bordo del pannello = 8…12px. Prima si stringe il passo (arcSqueeze), la carta cala al massimo del 3,5% rispetto a prima (cwShrink). */
  const sideMob=W=>Math.max(7,Math.min(11,7+(W-318)/70*4));
  function fit10(W,spk){
    if(MOB()){ const [tx,,ro]=P.arcMobile[2], r=rad(ro), k=tx+.5*Math.cos(r)+RAT()/2*Math.sin(r);
      const cw0=Math.max(P.cwMinRef,(W-2*P.sideRef)/(2*k)), cwT=(W-2*sideMob(W))/(2*k);
      return Math.floor(Math.max(cwT,cw0*P.cwShrink)*10)/10; }
    const sp=spk||spNow(), avail=P.fw*W;
    for(let cw=P.cap;cw>=50;cw-=.5){ const ch=cw*RAT(); let a=0;
      for(let i=0;i<10;i++){ const row=i<5?0:1,rel=i%5-2,x=rel*sp*cw*(row?wideNow():1)+(row?-1:1)*stagNow()*sp*cw/2,r=rad(rel*rotNow());
        a=Math.max(a,Math.abs(x)+cw/2*Math.cos(r)+ch/2*Math.abs(Math.sin(r))); }
      if(2*a<=avail) return cw; }
    return 50; }
  /* telefoni stretti (sotto ~410px): la carta non scende sotto cwMinRef (72px, nomi ~9px); l'arco si stringe in larghezza quanto serve */
  function arcSqueeze(W,cw,ch){ const [tx,,ro]=P.arcMobile[2], r=rad(ro), ext=cw/2*Math.cos(r)+ch/2*Math.sin(r);
    return Math.min(1,(W/2-sideMob(W)-ext)/(tx*cw)); }
  function init(section) {
    if (instances.has(section)) return;

    const { cards, backs } = JSON.parse(section.querySelector('[data-deck-data]').textContent);
    const controller = new AbortController();
    const { signal } = controller;
    const decks = [];
    const timers = new Set();
    const listen = (target, type, fn) => target.addEventListener(type, fn, { signal });
    const later = (fn, delay) => {
      const id = setTimeout(() => {
        timers.delete(id);
        fn();
      }, delay);
      timers.add(id);
    };
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        const deck = decks.find(item => item.stage === entry.target);
        deck.root.classList.toggle('is-live', entry.isIntersecting);
        if (entry.intersectionRatio >= .55) deck.setOpen(true);
        else if (entry.intersectionRatio < .12 &&
          !(deck.root.contains(document.activeElement) && document.activeElement.matches(':focus-visible'))) {
          deck.setOpen(false);
        }
      }
    }, { threshold: [0, .12, .3, .55, .8, 1] });

    function columns() {
      section.classList.remove('tar-1col');
      if (MOB() || fit10(section.querySelector('.deck').clientWidth * P.deckCol) < P.minTwoCol) {
        section.classList.add('tar-1col');
      }
    }

    function face(card, deck) {
      const art = card.art
        ? `<img class="tc__art-image--${escape(card.slug)}" src="${escape(card.art)}" alt="" decoding="async">`
        : '';
      const motto = card.motto
        ? `<span class="tc__brule tc__brule--plain"></span><span class="tc__bmotto">${escape(card.motto)}</span>`
        : '';
      return `<span class="tc__glow" aria-hidden="true"></span><span class="tc__flip" aria-hidden="true">
<span class="tc__face tc__front"><span class="tc__num"><i class="tc__bz"></i></span><span class="tc__art"><span class="tc__sym tc__sym--art">${art}</span></span>
<span class="tc__cart"><span class="tc__title">${escape(card.title)}</span></span></span>
<span class="tc__face tc__back"><span class="tc__seal"><img src="${escape(backs[deck])}" width="320" height="279" alt="" decoding="async"></span>
<span class="tc__bgroup"><span class="tc__bname">${escape(card.title)}</span><span class="tc__brule"></span>
<span class="tc__stones">${card.stones.filter(Boolean).map(stone => `<span>${escape(stone)}</span>`).join('')}</span>${motto}</span>
<span class="tc__brand">Benessere Zen</span></span></span>`;
    }

    /* GIRO DEFINITIVO · i testi stanno SEMPRE nelle loro fasce, con qualsiasi font (anche il ripiego di sistema).
       Misura senza trasformazioni (copia nascosta nello stesso contenitore, offsetWidth), quindi vale anche sulle carte ruotate.
       Fronte: aria laterale = spazio cornice-bordo (3,6% della carta); prima si riduce il corpo, poi a capo bilanciato,
       mai sotto 9px (in extremis tracking fino a −0,04em). Retro: il nome sta nella larghezza del gruppo; se il gruppo
       non ci sta in altezza si stringe prima il motto (fino a 0,85), poi i passi (fino a 0,4u). */
    function natW(el,ws){ const m=el.cloneNode(true); m.style.cssText+=';position:absolute;visibility:hidden;left:0;top:0;width:max-content;max-width:none;min-height:0;margin:0;padding:0;white-space:'+(ws||'pre')+';display:block';
      el.parentElement.appendChild(m); const w=m.offsetWidth; m.remove(); return w; }
    function fitLine(t,avail,minPx){
      t.style.fontSize=t.style.letterSpacing=t.style.whiteSpace=''; const f0=parseFloat(getComputedStyle(t).fontSize);
      if (f0 < minPx) t.style.fontSize = minPx + 'px';
      const base = Math.max(f0, minPx);
      const w = natW(t);
      if (w <= avail) return base;
      let f=base*avail/w;
      if(f<minPx&&/ /.test(t.textContent.replace(/\n/g,' '))){ // a capo bilanciato: decide la parola più lunga
        t.style.whiteSpace='pre-line'; const words=t.textContent.split(/\s+/); let ww=0;
        for(const x of words){ const s=document.createElement('span'); s.textContent=x; s.style.font=getComputedStyle(t).font; t.parentElement.appendChild(s); s.style.cssText+=';position:absolute;visibility:hidden;white-space:pre'; ww=Math.max(ww,s.offsetWidth); s.remove(); }
        f=Math.min(base,base*avail/ww); }
      if(f<minPx){ const n=Math.max(1,t.textContent.trim().length-1), wMin=w*minPx/base; const ls=Math.max(-.04,(avail-wMin)/(n*minPx));
        f=minPx; let l2=ls; t.style.fontSize=f+'px'; t.style.letterSpacing=l2.toFixed(3)+'em'; let w2=natW(t);
        while(w2>avail&&l2>-.04){ l2=Math.max(-.04,l2-.005); t.style.letterSpacing=l2.toFixed(3)+'em'; w2=natW(t); }
         }
      t.style.fontSize=(Math.floor(f*100)/100)+'px'; return f; }
    function fitTexts(root,lims){
      root.querySelectorAll('.tc').forEach((li,ix)=>{
        const cw=li.offsetWidth; if(!cw) return;
        const t=li.querySelector('.tc__title'), L=lims&&lims[ix];
        const f1=fitLine(t,(L?L.band[1]-L.band[0]:t.parentElement.clientWidth-2*.036*cw)-1,9);
        // carta coperta: il nome prova a stare anche nella parte scoperta del cartiglio, senza scendere sotto 9px
        if(L){ const av=L.vis[1]-L.vis[0]-1, w=natW(t); if(w>av){ const f2=Math.max(9,f1*av/w); if(f2<f1) t.style.fontSize=(Math.floor(f2*100)/100)+'px';
          const w9=natW(t); if(w9>av){ const nch=Math.max(1,t.textContent.trim().length-1), fz=parseFloat(t.style.fontSize)||f1; t.style.letterSpacing=Math.max(-.04,(av-w9)/(nch*fz)).toFixed(3)+'em'; } } }
        const b=li.querySelector('.tc__back'), g=b.querySelector('.tc__bgroup'), nm=b.querySelector('.tc__bname'), mo=b.querySelector('.tc__bmotto');
        b.style.removeProperty('--mk'); b.style.removeProperty('--g');
        fitLine(nm,g.clientWidth-1,1);
        const cs=getComputedStyle(b), u=parseFloat(cs.getPropertyValue('--u'))||.036*cw;
        const need=()=>{ const k=[...g.children]; const gap=parseFloat(getComputedStyle(g).rowGap)||0; return k.reduce((a,e)=>a+e.offsetHeight,0)+gap*(k.length+1); };
        // spazio per il gruppo: alto della carta − padding − sigillo − firma (il gruppo ha anche un passo libero sopra e sotto)
        const room=()=>b.clientHeight-2*parseFloat(cs.paddingTop)-b.querySelector('.tc__seal').offsetHeight-b.querySelector('.tc__brand').offsetHeight;
        let mk=1; while(mo&&need()>room()&&mk>.86){ mk-=.05; b.style.setProperty('--mk',mk.toFixed(2)); }
        let gk=parseFloat(getComputedStyle(g).rowGap)/u; while(need()>room()&&gk>.41){ gk-=.05; b.style.setProperty('--g',`calc(var(--u) * ${gk.toFixed(2)})`); }
      }); }
    function Deck(root){
      const key=root.dataset.deck, deckCards=cards.filter(card => card.deck === key);
      const n=deckCards.length,name=root.dataset.name;
      const stage=root.querySelector('.deck__stage'),fan=root.querySelector('.deck__fan'),openBtn=root.querySelector('.deck__open');
      fan.setAttribute('aria-label',`Mazzo ${name}, ${n} carte`);
      stage.hidden = !n;
      if (!n) return null;
      fan.innerHTML=deckCards.map((card,i)=>`<li class="tc tc--${escape(card.slug)}" data-i="${i}"><a class="tc__hit" href="${escape(card.href)}" aria-label="${escape(label(card.title || ''))}, carta ${i+1} di ${n}" data-i="${i}">${face(card,key)}</a></li>`).join('');
      const els=[...fan.children],links=els.map(e=>e.firstElementChild);
      const rowsArr=n%2===0?[n/2,n/2]:[Math.floor(n/2),Math.ceil(n/2)];
      let st={open:false,active:-1,sel:-1},G={},lastPtr='mouse',downIdx=-1;

      /* posa di una carta (serve sia al disegno sia al calcolo dell'ingombro) */
      function rowOf(i){ let s=0,r=0; while(i>=s+rowsArr[r]){ s+=rowsArr[r]; r++; } return [r,i-s]; }
      function pose(i,o,g){
        const open=o.open, act=open?o.act:-1, [row,col]=rowOf(i), cnt=rowsArr[row], rel=col-(cnt-1)/2;
        // riposo: pila ordinata a fronte in su al centro, a metà tra le due file (ogni carta 0,6px sopra la precedente)
        if(!open) return {rel,isA:false,x:0,y:g.rowGap/2-i*.6,rot:0,sc:1};
        const k=open?1:g.ck, wf=row===rowsArr.length-1?g.wide:1, st=rowsArr.length>1?(row===0?1:-1)*g.stag/2:0;
        let x=(rel*wf*Math.min(1,4/Math.max(1,cnt-1))+st)*(cnt<=3?g.sp3:g.sp)*k, a=rel*g.rot*(open?1:.45), y=row*g.rowGap+g.curve*rel*rel*(open?1:.45)+(open?0:g.ch*.03);
        if(g.arc){ const edge = (cnt-1)/2;
          const index = cnt > 5 ? Math.abs(rel)*2/edge : Math.abs(rel);
          const t=g.arc[Math.round(index)], sg=Math.sign(rel);
          const offset = index % 1 === 0 ? t : g.arc[Math.floor(index)].map((value,j) => value+(g.arc[Math.ceil(index)][j]-value)*(index%1));
          x=sg*offset[0]*g.cw*(cnt>3?g.xs:1); a=sg*offset[2]; y=row*g.rowGap+offset[1]*g.ch; }
        const isA=i===act;
        if(act>=0&&!isA&&rowOf(act)[0]===row) x+=Math.sign(i-act)*g.pushX;
        let rot=a, sc=act>=0?(isA?g.scale:.97):1;
        if(isA){ const grow=(sc-1)*g.ch/2; // la fila sopra cresce verso il basso, quella sotto verso l'alto: resta nell'ingombro delle file
          y+=row===0?grow-g.lift:-grow-g.lift; rot=a*.12;
          const r=rad(rot), ex=sc*(g.cw/2*Math.cos(r)+g.ch/2*Math.abs(Math.sin(r))); x=Math.max(-(g.hw-ex),Math.min(g.hw-ex,x)); }
        return {rel,isA,x,y,rot,sc};
      }
      const states=()=>{ const S=[{open:false,act:-1},{open:true,act:-1}]; for(let j=0;j<n;j++) S.push({open:true,act:j}); return S; };
      /* ingombro su tutti gli stati raggiungibili. Coordinate: x dal centro dello stage, y dal top delle carte */
      function extent(g){ let minX=1e9,maxX=-1e9,minY=1e9,maxY=-1e9;
        for(const o of states()) for(let i=0;i<n;i++){ const p=pose(i,o,g), r=rad(p.rot), c=Math.abs(Math.cos(r)), sn=Math.abs(Math.sin(r));
          const ex=p.sc*(g.cw/2*c+g.ch/2*sn), ey=p.sc*(g.cw/2*sn+g.ch/2*c), cy=p.y+g.ch/2;
          minX=Math.min(minX,p.x-ex); maxX=Math.max(maxX,p.x+ex); minY=Math.min(minY,cy-ey); maxY=Math.max(maxY,cy+ey); }
        return {minX,maxX,minY,maxY,w:Math.max(-minX,maxX)}; }
      /* le carte a destra stanno sopra: di ogni carta coperta resta una striscia a sinistra larga quanto il passo.
         Il titolo delle coperte scivola a sinistra (al massimo fino al bordo interno del cartiglio) quanto basta per stare nella striscia. */
      function geom(){
        const W=stage.clientWidth; let spk=spNow(), cw=fit10(W,spk);
        // mobile: carta mai sotto cwMinMobile (78px: «Concentrazione» intero a 9,5px); se non ci sta, si stringe il passo del 5+5
        const ch=cw*RAT();
        // carta al tetto (schermi larghi): lo spazio che avanza allarga il passo, fino a spMax, senza rimpicciolire la carta
        if(!MOB()&&cw>=P.cap) while(spk+.01<=P.spMax&&fit10(W,spk+.01)>=P.cap) spk+=.01;
        const sp=cw*spk, sp3=cw*(MOB()?P.sp3Mobile:Math.max(P.sp3,spk)), fine=FINE.matches;
        root.style.setProperty('--cw',cw+'px'); root.style.setProperty('--sa',FINE.matches?1.1:(MOB()?1.3:1.15));
        const g={cw,ch,sp,sp3,rot:rotNow(),wide:wideNow(),stag:stagNow(),rowGap:ch*(MOB()?P.rowGapRef:P.rowGap),arc:MOB()?P.arcMobile:null,xs:MOB()?arcSqueeze(W,cw,ch):1,curve:ch*curveNow(),ck:.34,pushX:MOB()?0:cw*.05,lift:ch*(fine?.05:.07),scale:fine?1.1:(MOB()?1.3:1.15),hw:W/2-(MOB()?P.edgeMobile:P.edge)};
        // GIRO DEFINITIVO · parte scoperta del cartiglio di ogni carta nella posa aperta (coordinate della carta, px dal bordo sinistro):
        // tolgo dalla fascia del nome l'ingombro reale (ruotato) di ogni carta che le sta sopra; il nome si adatta a quella parte e ci si centra.
        const PO=els.map((_,i)=>pose(i,{open:true,act:-1},g)), Z=els.map((_,i)=>1+rowOf(i)[0]*12+(10-Math.round(Math.abs(PO[i].rel)*2)));
        const clipX=(pts,y0,y1)=>{ const cut=(P,f,k)=>{ const o=[]; for(let q=0;q<P.length;q++){ const A=P[q],B=P[(q+1)%P.length],ia=f(A),ib=f(B);
            if(ia) o.push(A); if(ia!==ib){ const t=(k-A[1])/(B[1]-A[1]); o.push([A[0]+t*(B[0]-A[0]),k]); } } return o; };
          let P=cut(pts,v=>v[1]>=y0,y0); if(P.length) P=cut(P,v=>v[1]<=y1,y1); return P.length?[Math.min(...P.map(v=>v[0])),Math.max(...P.map(v=>v[0]))]:null; };
        const lims=els.map((li,i)=>{ const t=li.querySelector('.tc__title'),cart=t.parentElement,pad=.036*cw, cl=cart.offsetLeft, cr=cl+cart.offsetWidth;
          const y0=cart.offsetTop-ch/2, y1=y0+cart.offsetHeight; let segs=[[0,cw]];
          for(let j=0;j<n;j++){ if(Z[j]<=Z[i]) continue; const a=rad(PO[i].rot), b=rad(PO[j].rot), dx=PO[j].x-PO[i].x, dy=PO[j].y-PO[i].y;
            const pts=[[-cw/2,-ch/2],[cw/2,-ch/2],[cw/2,ch/2],[-cw/2,ch/2]].map(([u,v])=>{ const X=dx+u*Math.cos(b)-v*Math.sin(b), Y=dy+u*Math.sin(b)+v*Math.cos(b);
              return [X*Math.cos(a)+Y*Math.sin(a)+cw/2, -X*Math.sin(a)+Y*Math.cos(a)]; });
            const xs=clipX(pts,y0,y1); if(!xs) continue;
            segs=segs.flatMap(([s0,e0])=>{ const o=[]; if(xs[0]>s0) o.push([s0,Math.min(e0,xs[0])]); if(xs[1]<e0) o.push([Math.max(s0,xs[1]),e0]); return o.filter(q=>q[1]-q[0]>.5); }); }
          segs.sort((p,q)=>(q[1]-q[0])-(p[1]-p[0])); const sg=segs[0]||[cw/2,cw/2];
          return {band:[cl+pad,cr-pad],vis:[Math.max(sg[0]+2,cl+pad),Math.min(sg[1]-2,cr-pad)],mid:(cl+cr)/2}; });
        fitTexts(root,lims);
        const tx=els.map((li,i)=>{ const L=lims[i]; if(L.vis[0]<=L.band[0]+.01&&L.vis[1]>=L.band[1]-.01) return 0; const w=natW(li.querySelector('.tc__title'));
          let c=(L.vis[0]+L.vis[1])/2; c=Math.min(Math.max(c,L.band[0]+w/2),L.band[1]-w/2); return c-L.mid; });
        els.forEach((el,i)=>el.style.setProperty('--tx',tx[i].toFixed(1)+'px'));
        const e=extent(g), top=-e.minY+2, H=Math.ceil(e.maxY-e.minY+4);
        G={W,top,H,H0:H,...g,ext:e};
        root.style.setProperty('--cw',cw+'px'); root.style.setProperty('--sa',g.scale); stage.style.setProperty('--top',top+'px'); stage.style.height=H+'px';
      }
      function render(instant){
        const open=st.open||RM.matches;
        root.classList.toggle('is-open',open);
        const act=st.active>=0?st.active:st.sel, o={open,act};
        els.forEach((el,i)=>{ const p=pose(i,o,G);
          el.style.transform=`translate(${p.x.toFixed(1)}px,${p.y.toFixed(1)}px) rotate(${p.rot.toFixed(2)}deg) scale(${p.sc})`;
          const was=el.classList.contains('is-active');
          // ordine come la mano di carte di Michael: in ogni fila la centrale davanti, poi a scalare verso i bordi; la fila sotto sopra quella sopra
          const [rw]=rowOf(i), zb=1+rw*12+(10-Math.round(Math.abs(p.rel)*2));
          el.style.zIndex=p.isA?50:(was?49:zb); el.classList.toggle('is-active',p.isA);
          // apertura e chiusura a cascata dal centro della fila; scelta: la carta esce e poi gira (flip con 140ms di ritardo);
          // lasciata: prima si rigira, poi rientra (spostamento con 260ms di ritardo)
          let d=instant||RM.matches?0:Math.round(Math.abs(p.rel)*45+rowOf(i)[0]*60), fd=0;
          if(!RM.matches){ if(p.isA&&!was){ d=0; fd=140; } else if(was&&!p.isA){ d=260; fd=0; } }
          el.style.setProperty('--d',d+'ms'); el.style.setProperty('--fd',fd+'ms');
          if(!p.isA&&was) later(()=>{ if(!el.classList.contains('is-active')) el.style.zIndex=zb; },900);
          if(i===st.sel) links[i].setAttribute('aria-current','true'); else links[i].removeAttribute('aria-current'); });
        root.classList.toggle('has-sel',st.sel>=0&&open);
        openBtn.tabIndex = st.sel>=0&&open ? 0 : -1;
        openBtn.setAttribute('aria-hidden', String(!(st.sel>=0&&open)));
        if(st.sel>=0){ openBtn.href=deckCards[st.sel].href; openBtn.setAttribute('aria-label',`Apri la carta ${label(deckCards[st.sel].title || '')}`); }
      }
      function setOpen(v){ if(st.open===v) return; st.open=v; if(!v){st.active=-1;st.sel=-1;} render(); }
      function setActive(i){ if(st.active===i) return; st.active=i; render(true); }
      function select(i){ st.sel=i; render(true); // una sola carta scelta nella sezione
        decks.forEach(deck => {
          if (deck.root !== root && deck.st.sel >= 0) {
            deck.st.sel = -1;
            deck.render(true);
          }
        });
      }
      function go(i) { location.href = deckCards[i].href; }
      /* desktop: la carta (posa aperta) sotto il puntatore; vince quella sopra */
      function pickFromPointer(e){
        const r=stage.getBoundingClientRect(), px=e.clientX-r.left-r.width/2, py=e.clientY-r.top;
        // vince la carta che sta davanti (stesso ordine di render: fila sotto, poi la più vicina al centro)
        const zOf=i=>{ const [r,c]=rowOf(i); return r*12-Math.abs(c-(rowsArr[r]-1)/2)*2; };
        for(const i of [...Array(n).keys()].sort((a,b)=>zOf(b)-zOf(a))){ const p=pose(i,{open:true,act:-1},G), t=-rad(p.rot), dx=px-p.x, dy=py-(G.top+p.y+G.ch/2);
          const u=dx*Math.cos(t)-dy*Math.sin(t), v=dx*Math.sin(t)+dy*Math.cos(t); if(Math.abs(u)<=G.cw/2&&Math.abs(v)<=G.ch/2) return i; }
        return -1;
      }
      listen(stage, 'pointermove',e=>{ if(e.pointerType!=='mouse'&&e.pointerType!=='pen') return; lastPtr='mouse';
        if(!st.open) setOpen(true); setActive(pickFromPointer(e)); stage.style.cursor=st.active>=0?'pointer':''; });
      listen(stage, 'pointerleave',e=>{ if(e.pointerType==='mouse'||e.pointerType==='pen') setActive(-1); });
      listen(stage, 'pointerenter',e=>{ if(e.pointerType==='mouse') setOpen(true); });
      listen(stage, 'pointerdown',e=>{ if(e.pointerType==='mouse') return; lastPtr='touch';
        // il touch di Chrome «aggiusta» il bersaglio verso la carta vicina: prendo quella che sta davvero sotto il dito
        const h=document.elementFromPoint(e.clientX,e.clientY), tc=h&&h.closest('.tc'); downIdx=tc&&fan.contains(tc)?+tc.dataset.i:-1; });
      listen(stage, 'click',e=>{
        const a=e.target.closest('.tc__hit');
        if(lastPtr==='mouse'&&e.detail>0){ e.preventDefault(); if(st.active>=0) go(st.active); return; }
        if(!a&&!(lastPtr==='touch'&&downIdx>=0&&e.detail>0)) return;
        e.preventDefault();
        const i=(lastPtr==='touch'&&downIdx>=0&&e.detail>0)?downIdx:+a.dataset.i;
        if(e.detail===0){ go(i); return; } // tastiera: Invio
        if(!st.open) setOpen(true);
        if(st.sel===i) go(i); else select(i);
      });
      links.forEach((l,i)=>{
        listen(l, 'focus',()=>{ if(!l.matches(':focus-visible')) return; if(!st.open) st.open=true;
          if(FINE.matches||lastPtr==='mouse'){ st.active=i; render(true); } else select(i); });
        listen(l, 'blur',()=>{ later(()=>{ if(!root.contains(document.activeElement)){ st.active=-1; render(true); } },0); });
        listen(l, 'keydown',e=>{
          if(e.key==='ArrowRight'||e.key==='ArrowLeft'){ e.preventDefault(); links[Math.max(0,Math.min(n-1,i+(e.key==='ArrowRight'?1:-1)))].focus(); }
          else if(e.key===' '||e.key==='Spacebar'){ e.preventDefault(); go(i); }
          else if(e.key==='Escape'){ e.preventDefault(); st.active=-1; st.sel=-1; st.open=false; render(); } });
      });
      listen(openBtn, 'click',e=>{ e.preventDefault(); if(st.sel>=0) go(st.sel); });
      geom();
      render(true);
      observer.observe(stage);
      return { root, stage, st, setOpen, render, geom, get G() { return G; } };
    }

    function equalize() {
      if (decks.length < 2 || section.classList.contains('tar-1col')) return;
      const height = Math.max(...decks.map(deck => deck.G.H0));
      for (const deck of decks) {
        const g = deck.G;
        g.top += (height - g.H) / 2;
        g.H = height;
        deck.stage.style.height = height + 'px';
        deck.stage.style.setProperty('--top', g.top + 'px');
      }
    }

    function relayout() {
      columns();
      for (const deck of decks) {
        deck.geom();
        deck.render(true);
      }
      equalize();
    }

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(relayout, 80);
    };

    columns();
    for (const root of section.querySelectorAll('.deck[data-deck]')) {
      const deck = Deck(root);
      if (deck) decks.push(deck);
    }
    equalize();
    listen(window, 'resize', onResize);
    listen(window, 'orientationchange', onResize);
    listen(RM, 'change', relayout);
    listen(FINE, 'change', relayout);
    if (document.fonts) {
      document.fonts.ready.then(() => { if (!signal.aborted) relayout(); });
      listen(document.fonts, 'loadingdone', relayout);
    }

    instances.set(section, () => {
      controller.abort();
      observer.disconnect();
      clearTimeout(resizeTimer);
      timers.forEach(id => clearTimeout(id));
      instances.delete(section);
    });
  }

  window.BZTarocchi = { init };
  document.querySelectorAll(selector).forEach(init);
  document.addEventListener('shopify:section:load', event => {
    if (event.target.matches(selector)) init(event.target);
    else event.target.querySelectorAll(selector).forEach(init);
  });
  document.addEventListener('shopify:section:unload', event => {
    if (event.target.matches(selector)) instances.get(event.target)?.();
    else event.target.querySelectorAll(selector).forEach(section => instances.get(section)?.());
  });
})();
