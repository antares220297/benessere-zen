/* Scroll-driven Ayurveda timeline. Layout measurements stay outside the animation loop. */
(() => {
  'use strict';
  if (window.bzAyurvedaTimeline || !window.IntersectionObserver || !window.ResizeObserver) return;
  window.bzAyurvedaTimeline = true;
  const instances = new WeakMap();

  function init(scope) {
    scope.querySelectorAll('.ayt').forEach(root => {
      instances.get(root)?.();
      instances.set(root, activate(root));
    });
  }

  document.addEventListener('shopify:section:load', event => init(event.target));
  document.addEventListener('shopify:section:unload', event => {
    event.target.querySelectorAll('.ayt').forEach(root => {
      instances.get(root)?.();
      instances.delete(root);
    });
  });
  init(document);

  function activate(root) {
    const $ = (s, el = root) => el.querySelector(s), $$ = (s, el = root) => [...el.querySelectorAll(s)];
    const track = $('.ayt-track'), rail = $('.ayt-rail');
    const pBase = $('.ayt-p-base'), pGlow = $('.ayt-p-glow'), pLine = $('.ayt-p-line'), grad = $('linearGradient');
    const head = $('.ayt-headdot'), endMark = $('.ayt-end');
    const stages = $$('.ayt-stage'), meds = $$('.ayt-med'), slides = $$('.ayt-slide'), caps = $$('.ayt-cap'), bar = $('.ayt-bar');
    const slideImgs = slides.map(s => s.querySelector('img'));
    const mqDesk = matchMedia('(min-width:900px)'), mqRed = matchMedia('(prefers-reduced-motion:reduce)');
    const forceStatic = new URLSearchParams(location.search).get('static') === '1';
    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    let nearby = false, mode = '', L = 0, H = 0, lut = [], medY = [], endY = 0, live = false, ticking = false, active = -1;

    function setMode() {
      const desktopStatic = mqDesk.matches && root.dataset.disableSticky === 'true';
      const m = forceStatic || mqRed.matches || desktopStatic ? 'static' : mqDesk.matches ? 'scrolly' : 'flow';
      if (live && m === 'static') {
        removeEventListener('scroll', onScroll);
        live = false;
      } else if (nearby && m !== 'static' && !live) {
        addEventListener('scroll', onScroll, { passive: true });
        live = true;
      }
      if (m !== mode) { mode = m; root.dataset.mode = m; active = -1; resetStates(); }
      layout();
    }
    function resetStates() {
      slides.forEach((s, i) => { s.style.transform = ''; slideImgs[i].style.transform = ''; slideImgs[i].style.opacity = ''; });
      stages.forEach(s => s.classList.toggle('is-in', mode === 'static'));
      stages.forEach(s => s.classList.remove('is-active'));
      caps.forEach(c => c.classList.remove('is-on'));
    }

    /* Serpentina: una curva a S tra due medaglioni consecutivi, sempre con lo stesso verso, così le tangenti
       si raccordano e il filo ondeggia senza spigoli. y cresce sempre lungo il tracciato (serve alla tabella). */
    function layout() {
      const rr = rail.getBoundingClientRect();
      const W = rr.width; H = rr.height;
      if (!W || !H) return;
      const desk = mode === 'scrolly' || (mode === 'static' && mqDesk.matches);
      const cx = W / 2;
      const amplitude = Number(root.dataset.curve || 100) / 100;
      const A = (desk ? Math.min(78, W * .36) : Math.min(10, W * .3)) * amplitude;
      medY = stages.map(stage => {
        const text = $('.ayt-txt', stage), date = $('.ayt-when', text);
        return stage.offsetTop + text.offsetTop + date.offsetTop + date.offsetHeight / 2;
      });
      endY = H - (desk ? 24 : 6);
      const pts = [0, ...medY, endY];
      let d = `M${cx} 0`;
      for (let k = 1; k < pts.length; k++) {
        const ya = pts[k - 1], yb = pts[k], dy = yb - ya;
        const a = (k === 1 || k === pts.length - 1) ? A * .55 : A; /* attacco e coda più morbidi */
        d += ` C${(cx + a * 1.25).toFixed(1)} ${(ya + dy * .36).toFixed(1)} ${(cx - a * 1.25).toFixed(1)} ${(yb - dy * .36).toFixed(1)} ${cx} ${yb.toFixed(1)}`;
      }
      [pBase, pGlow, pLine].forEach(p => p.setAttribute('d', d));
      grad.setAttribute('y2', String(H));
      L = pLine.getTotalLength();
      const N = Math.max(240, Math.round(L / 6));
      lut = new Array(N + 1);
      for (let i = 0; i <= N; i++) { const l = L * i / N, p = pLine.getPointAtLength(l); lut[i] = [p.y, l, p.x]; }
      meds.forEach((m, i) => { m.style.transform = `translate3d(${cx}px,${medY[i]}px,0)`; });
      endMark.style.transform = `translate3d(${cx}px,${endY}px,0)`;
      [pGlow, pLine].forEach(p => { p.style.strokeDasharray = `${L} ${L}`; });
      if (mode === 'static') {
        [pGlow, pLine].forEach(p => { p.style.strokeDashoffset = '0'; });
        meds.forEach(m => m.classList.add('is-lit')); endMark.classList.add('is-lit');
        if (bar) bar.style.transform = 'scaleX(1)';
      } else update();
    }

    function at(y) { /* ricerca binaria sulla tabella y → lunghezza */
      if (y <= 0) return lut[0]; if (y >= lut[lut.length - 1][0]) return lut[lut.length - 1];
      let lo = 0, hi = lut.length - 1;
      while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (lut[mid][0] < y) lo = mid; else hi = mid; }
      const a = lut[lo], b = lut[hi], t = (y - a[0]) / ((b[0] - a[0]) || 1);
      return [y, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }

    function update() {
      ticking = false;
      if (mode === 'static' || !lut.length) return;
      const vh = innerHeight, rr = rail.getBoundingClientRect();
      const tops = stages.map(st => st.getBoundingClientRect().top); /* tutte le letture prima delle scritture */
      const headY = clamp((mode === 'scrolly' ? vh * .5 : vh * .64) - rr.top, 0, H);
      const [hy, len, hx] = at(headY);
      const off = String(L - len);
      pLine.style.strokeDashoffset = off; pGlow.style.strokeDashoffset = off;
      head.style.transform = `translate3d(${hx}px,${hy}px,0)`;
      meds.forEach((m, i) => m.classList.toggle('is-lit', headY >= medY[i] - 1));
      endMark.classList.toggle('is-lit', headY >= endY - 1);

      if (mode === 'flow') {
        stages.forEach((s, i) => { if (tops[i] < vh * .86) s.classList.add('is-in'); });
        return;
      }
      /* scrolly: tappa attiva + ingresso dell'immagine dal basso, la precedente arretra */
      let a = 0; tops.forEach((t, i) => { if (t < vh * .55) a = i; });
      if (a !== active) {
        active = a;
        stages.forEach((s, i) => s.classList.toggle('is-active', i === a));
        caps.forEach((c, i) => c.classList.toggle('is-on', i === a));
        slides.forEach((slide, i) => slide.setAttribute('aria-hidden', String(i !== a)));
      }
      const prog = tops.map((t, i) => i === 0 ? 1 : ease(clamp((vh * .92 - t) / (vh * .6))));
      slides.forEach((s, i) => {
        const t = prog[i], next = i < slides.length - 1 ? prog[i + 1] : 0;
        if (i > 0) s.style.transform = `translate3d(0,${((1 - t) * 101).toFixed(2)}%,0)`;
        const img = slideImgs[i];
        img.style.transform = `scale(${(1.14 - .14 * t - .05 * next).toFixed(4)}) translate3d(0,${(-4 * next).toFixed(2)}%,0)`;
        img.style.opacity = (1 - .6 * next).toFixed(3);
      });
      const advances = prog.slice(1);
      if (bar) bar.style.transform = `scaleX(${advances.length ? advances.reduce((sum, step) => sum + step, 0) / advances.length : 1})`;
    }
    let scrollFrame = 0;
    const onScroll = () => { if (!ticking) { ticking = true; scrollFrame = requestAnimationFrame(update); } };

    const intersection = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      if (nearby && mode !== 'static' && !live) {
        live = true;
        addEventListener('scroll', onScroll, { passive: true });
        onScroll();
      } else if (!nearby && live) {
        live = false;
        removeEventListener('scroll', onScroll);
        onScroll();
      }
    }, { rootMargin: '50% 0px' });
    intersection.observe(root);

    let rz = 0;
    const resize = new ResizeObserver(() => { cancelAnimationFrame(rz); rz = requestAnimationFrame(layout); });
    resize.observe(track);
    mqDesk.addEventListener('change', setMode);
    mqRed.addEventListener('change', setMode);
    setMode();
    document.fonts?.ready.then(() => { if (root.isConnected) layout(); });
    return () => {
      intersection.disconnect();
      resize.disconnect();
      removeEventListener('scroll', onScroll);
      mqDesk.removeEventListener('change', setMode);
      mqRed.removeEventListener('change', setMode);
      cancelAnimationFrame(rz);
      cancelAnimationFrame(scrollFrame);
    };
  }
})();
