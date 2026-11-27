(() => {
  function init(root) {
    if (root.dataset.cieloReady) return;
    const $ = selector => root.querySelector(selector);
    const catalog = JSON.parse($('[data-cielo-catalog]').textContent);
    let signs;
    try {
      signs = JSON.parse(catalog.signs);
      if (!Array.isArray(signs) || signs.length !== 12 ||
          !signs.every(sign => sign && catalog.figures[sign.n] && elements[sign.el] &&
            Number.isInteger(sign.m) && Number.isInteger(sign.d) &&
            typeof sign.pietre === 'string' && typeof sign.g === 'string')) return;
    } catch {
      return;
    }
    root.dataset.cieloReady = 'true';

    const vv = $('.vv');
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const rot = { m: $('.vv-m'), a: $('.vv-a'), b: $('.vv-b') };
    const angles = { m: -30, a: -292.5, b: 0 };
    const flipTimers = {};
    const figures = [...root.querySelectorAll('.c5-fig')];
    const lines = $('.c6-ln');
    const rows = [...root.querySelectorAll('.c2-row')].map(node => ({
      node,
      input: node.querySelector('.c3-pick'),
      choice: node.querySelector('.c3-choice'),
      add: node.querySelector('.c3-add'),
      image: node.querySelector('.c3-ring img'),
      role: node.querySelector('.c2-sub'),
      link: node.querySelector('.c2-name a'),
      name: node.querySelector('.c2-name span'),
      price: node.querySelector('.c2-price')
    }));
    const cta = $('.c2-cta');
    const hint = $('.c3-hint');
    const status = $('.c3-status');
    const error = $('.c3-cart-error');
    const dedication = $('.c2-check input');
    const message = $('.c2-msg');
    const money = new Intl.NumberFormat('it-IT', { style: 'currency', currency: catalog.currency || 'EUR' });
    const price = cents => money.format(cents / 100);
    const field = name => $("[data-k='" + name + "']");
    const capitalize = value => value.charAt(0).toUpperCase() + value.slice(1);
    let month = 2;
    let day = 14;
    let gift = false;
    let busy = false;
    let shown = 'Acquario';
    let wanted = shown;
    let lineTimer;
    let glyphTimer;
    let liveTimer;

    function signForDate() {
      if (month === 12 && day >= signs[0].d) return signs[0];
      let result = signs[0];
      for (const sign of signs.slice(1)) {
        if (month > sign.m || (month === sign.m && day >= sign.d)) result = sign;
      }
      return result;
    }

    function turn(key, target) {
      const delta = ((target - angles[key]) % 360 + 540) % 360 - 180;
      angles[key] += delta;
      rot[key].style.setProperty('--r', angles[key] + 'deg');
      rot[key].style.transform = 'rotate(' + angles[key] + 'deg)';
      clearTimeout(flipTimers[key]);
      flipTimers[key] = setTimeout(() => {
        rot[key].querySelectorAll('button').forEach(button => {
          const angle = (parseFloat(button.style.getPropertyValue('--a')) + angles[key]) % 360;
          const normalized = (angle + 360) % 360;
          button.classList.toggle('vv-flip', normalized > 95 && normalized < 265);
        });
      }, motion.matches ? 0 : 520);
    }

    function drawLines(name) {
      lines.classList.remove('is-on');
      clearTimeout(lineTimer);
      lineTimer = setTimeout(() => {
        const constellation = catalog.lines[name];
        const nodes = [];
        const svg = (tag, attributes) => {
          const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
          Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
          nodes.push(node);
        };
        if (constellation) {
          const paths = constellation.l || constellation;
          paths.forEach(path => svg('polyline', { points: path.map(point => point.join(',')).join(' ') }));
          const stars = constellation.s || [...new Map(paths.flat().map(point => [point.join(','), point])).values()];
          stars.forEach(([x, y, magnitude]) => svg('circle', {
            class: magnitude ? 'm' + magnitude : '', cx: x, cy: y,
            r: [0, 5.3, 7.7, 10.6][magnitude] || 5.5
          }));
        }
        lines.replaceChildren(...nodes);
        requestAnimationFrame(() => lines.classList.add('is-on'));
      }, motion.matches ? 0 : 420);
    }

    function preloadNeighbors(name) {
      const index = signs.findIndex(sign => sign.n === name);
      for (const offset of [-1, 1]) {
        const image = new Image();
        image.src = catalog.figures[signs[(index + offset + 12) % 12].n];
      }
    }

    function showFigure(name) {
      wanted = name;
      if (name === shown) return;
      const current = figures.find(image => image.classList.contains('is-on'));
      const next = figures.find(image => image !== current);
      next.src = catalog.figures[name];
      next.decode().then(() => {
        if (wanted !== name || shown === name) return;
        next.classList.add('is-on');
        current.classList.remove('is-on');
        shown = name;
        drawLines(name);
      }).catch(() => {});
      preloadNeighbors(name);
    }

    function fillRow(row, product, role, fallback) {
      row.product = product || {};
      row.input.disabled = !row.product.available;
      row.input.checked = Boolean(row.product.available && row.selected !== false);
      row.choice.hidden = row.input.disabled;
      row.add.hidden = row.input.disabled;
      const name = row.product.name || fallback;
      row.role.textContent = role;
      row.input.setAttribute('aria-label', 'Includi nel corredo: ' + name);
      row.add.setAttribute('aria-label', 'Aggiungi al carrello: ' + name);
      row.image.hidden = !row.product.img;
      if (row.product.img) row.image.src = row.product.img;
      else row.image.removeAttribute('src');
      row.link.hidden = !row.product.url;
      row.name.hidden = !row.link.hidden;
      if (row.product.url) row.link.href = row.product.url;
      else row.link.removeAttribute('href');
      row.link.textContent = row.name.textContent = name;
      row.price.textContent = row.product.available ? price(row.product.price) : 'Esaurito';
    }

    function paintTotal(announce = false) {
      const selected = rows.filter(row => row.input.checked);
      const count = selected.length;
      const all = count === rows.length;
      const full = selected.reduce((sum, row) => sum + row.product.price, 0);
      const total = all ? Math.round(full * 0.9) : full;
      const label = count === 1 ? '1 pezzo' : count + ' pezzi';
      $('.c2-count').textContent = label;
      $('.c2-sum').textContent = price(total);
      $('.c3-was').textContent = price(full);
      $('.c3-was').hidden = !all;
      $('span.c3-deal').hidden = !all;
      hint.hidden = all || rows.some(row => row.input.disabled);
      hint.disabled = !count || busy;
      hint.textContent = ['Scegli almeno un pezzo', 'Aggiungi gli altri due: −10% su tutto',
        'Aggiungi il terzo: −10% su tutto'][count] || '';
      cta.disabled = !count || busy;
      $('.c3-lbl').textContent = all ? 'Aggiungi il corredo al carrello' :
        count ? 'Aggiungi ' + label + ' al carrello' : 'Aggiungi al carrello';
      rows.forEach(row => {
        row.node.classList.toggle('is-off', !row.input.checked);
        row.add.disabled = busy;
      });
      if (announce) status.textContent = label + ' nel corredo, totale ' + price(total) +
        (all ? ', con lo sconto del 10%' : '') + '.';
    }

    function sweep() {
      if (motion.matches) return;
      const beam = $('.vv-sweep');
      beam.classList.remove('go');
      void beam.offsetWidth;
      beam.classList.add('go');
    }

    function paintDate(animate) {
      day = Math.min(day, maxDays[month - 1]);
      for (const button of vv.querySelectorAll('.vv-mo, .vv-dy')) {
        const number = Number(button.dataset.m || button.dataset.d);
        const checked = number === (button.dataset.m ? month : day);
        button.setAttribute('aria-checked', String(checked));
        button.tabIndex = checked ? 0 : -1;
        if (button.dataset.d && number > maxDays[month - 1]) button.setAttribute('aria-disabled', 'true');
        else button.removeAttribute('aria-disabled');
      }
      turn('m', -(month - 1) * 30);
      if (day <= 16) turn('a', -(day - 1) * 22.5);
      else turn('b', -(day - 17) * 24);
      rot.a.classList.toggle('is-idle', day > 16);
      rot.b.classList.toggle('is-idle', day <= 16);

      const sign = signForDate();
      const current = catalog.months[month] || {};
      const element = elements[sign.el];
      const date = day + ' ' + months[month - 1];
      const glyph = $('.vv-glyph');
      const updateGlyph = () => {
        glyph.textContent = sign.g + '\ufe0e';
        glyph.classList.remove('is-out');
      };
      clearTimeout(glyphTimer);
      if (animate && !motion.matches && glyph.dataset.s !== sign.n) {
        glyph.classList.add('is-out');
        glyphTimer = setTimeout(updateGlyph, 300);
      } else updateGlyph();
      glyph.dataset.s = sign.n;
      showFigure(sign.n);
      if (animate) sweep();
      field('data').textContent = date;
      field('segno').textContent = sign.n;
      field('pietra').textContent = current.s || '—';
      field('pietre').textContent = capitalize(sign.pietre);
      field('elg').textContent = element.g + '\ufe0e';
      field('el').textContent = capitalize(sign.el);
      field('note').textContent = (sign.m === month ? current.late : current.early) ||
        [current.note, sign.fr].filter(Boolean).join(' ');
      field('per').textContent = 'per il ' + date;
      fillRow(rows[0], current.st, 'Pietra del mese', current.s || 'Pietra');
      fillRow(rows[1], catalog.elements[sign.el], element.per, capitalize(sign.el));
      fillRow(rows[2], current.j, 'Il gioiello', 'Gioiello');
      paintTotal();
      const live = $('.bz-live');
      live.textContent = date + ', ' + sign.n + '.';
      clearTimeout(liveTimer);
      liveTimer = setTimeout(() => {
        live.textContent = 'Corredo: ' + rows.map(row => row.link.textContent).join(', ') + '.';
      }, 600);
    }

    async function addPieces(selected, ensemble = false) {
      if (busy || !selected.length) return;
      const properties = {};
      if (ensemble) properties._corredo = months[month - 1] + ' · ' + signForDate().n;
      if (gift && dedication.checked && message.value.trim()) properties.Dedica = message.value.trim();
      const items = selected.map(row => ({
        id: row.product.id, quantity: 1,
        ...(Object.keys(properties).length ? { properties } : {})
      }));
      busy = true;
      error.hidden = true;
      status.textContent = '';
      $('.c3-cart').setAttribute('aria-busy', 'true');
      paintTotal();
      try {
        if (!await window.bzAddRitualItems(items)) throw new Error('Cart add failed');
        status.textContent = selected.length === 1 ? 'Pezzo aggiunto al carrello.' : 'Pezzi aggiunti al carrello.';
      } catch {
        error.textContent = 'Non è stato possibile aggiungere i pezzi al carrello.';
        error.hidden = false;
      } finally {
        busy = false;
        $('.c3-cart').removeAttribute('aria-busy');
        paintTotal();
      }
    }

    function selectDate(group, selector, get, set, limit) {
      group.addEventListener('click', event => {
        const button = event.target.closest(selector);
        if (!button || button.getAttribute('aria-disabled') === 'true') return;
        set(Number(button.dataset.m || button.dataset.d));
        paintDate(true);
        button.focus({ preventScroll: true });
      });
      group.addEventListener('keydown', event => {
        let value = get();
        switch (event.key) {
          case 'ArrowRight': case 'ArrowDown': value++; break;
          case 'ArrowLeft': case 'ArrowUp': value--; break;
          case 'Home': value = 1; break;
          case 'End': value = limit(); break;
          default: return;
        }
        event.preventDefault();
        if (value < 1) value = limit();
        if (value > limit()) value = 1;
        set(value);
        paintDate(true);
        group.querySelector(selector + '[aria-checked=true]').focus();
      });
    }

    rows.forEach(row => {
      row.input.addEventListener('change', () => {
        row.selected = row.input.checked;
        paintTotal(true);
      });
      row.add.addEventListener('click', () => addPieces([row]));
    });
    cta.addEventListener('click', () => {
      const selected = rows.filter(row => row.input.checked);
      addPieces(selected, selected.length === rows.length);
    });
    hint.addEventListener('click', () => {
      rows.forEach(row => { if (!row.input.disabled) row.input.checked = row.selected = true; });
      paintTotal(true);
      cta.focus();
    });
    selectDate(rot.m, '.vv-mo', () => month, value => { month = value; }, () => 12);
    selectDate($('.vv-gd'), '.vv-dy', () => day, value => { day = value; }, () => maxDays[month - 1]);

    const giftPanel = $('.c3-gift');
    const messagePanel = $('.c3-msgw');
    const modes = [...root.querySelectorAll('.c2-pills button')];
    modes.forEach(button => button.addEventListener('click', () => {
      gift = button.dataset.per === 'regalo';
      modes.forEach(mode => mode.setAttribute('aria-pressed', String(mode === button)));
      giftPanel.classList.toggle('is-open', gift);
      giftPanel.inert = !gift;
      giftPanel.setAttribute('aria-hidden', String(!gift));
      root.classList.toggle('is-gift', gift);
      field('tit').innerHTML = gift ? 'Il corredo <em>da regalare</em>' : 'Il tuo <em>corredo</em>';
      $('.c5-inv span').textContent = gift ? 'Tocca il suo mese, poi il giorno' : 'Tocca il tuo mese, poi il giorno';
    }));
    dedication.addEventListener('change', () => {
      messagePanel.classList.toggle('is-open', dedication.checked);
      messagePanel.inert = !dedication.checked;
    });
    $('.c2-again').addEventListener('click', event => {
      event.preventDefault();
      vv.scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth', block: 'center' });
      $('.vv-mo[aria-checked=true]').focus({ preventScroll: true });
    });

    function whenVisible(callback) {
      if (motion.matches || !('IntersectionObserver' in window)) {
        callback();
        return;
      }
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        callback();
      }, { threshold: 0.35 });
      observer.observe(vv);
    }

    const invitation = $('.c5-inv');
    const windowFrame = $('.vv-win');
    let seen = false;
    try { seen = sessionStorage.getItem('bzCieloTocco') === '1'; } catch {}
    invitation.hidden = seen;
    if (!seen) {
      whenVisible(() => setTimeout(() => {
        if (seen) return;
        invitation.classList.add('is-on');
        if (!motion.matches) windowFrame.classList.add('is-pulse');
      }, motion.matches ? 0 : 450));
      const dismiss = () => {
        seen = true;
        vv.removeEventListener('pointerdown', dismiss, true);
        vv.removeEventListener('keydown', dismiss, true);
        invitation.classList.remove('is-on');
        invitation.classList.add('is-gone');
        windowFrame.classList.remove('is-pulse');
        setTimeout(() => { invitation.hidden = true; }, motion.matches ? 0 : 450);
        preloadNeighbors(shown);
        try { sessionStorage.setItem('bzCieloTocco', '1'); } catch {}
      };
      vv.addEventListener('pointerdown', dismiss, true);
      vv.addEventListener('keydown', dismiss, true);
    }

    if (!motion.matches && 'IntersectionObserver' in window) {
      vv.classList.add('is-intro');
      $('.c3-cart').classList.add('is-wait');
      whenVisible(() => requestAnimationFrame(() => requestAnimationFrame(() => {
        vv.classList.remove('is-intro');
        setTimeout(sweep, 500);
        setTimeout(() => $('.c3-cart').classList.remove('is-wait'), 850);
      })));
    }
    drawLines(shown);
    paintDate(false);
  }

  const months = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno',
    'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre'];
  const maxDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const elements = {
    fuoco: { g: '🜂', per: 'Per il fuoco' },
    terra: { g: '🜃', per: 'Per la terra' },
    aria: { g: '🜁', per: 'Per l’aria' },
    acqua: { g: '🜄', per: 'Per l’acqua' }
  };
  document.querySelectorAll('[data-bz-cielo]').forEach(init);
  document.addEventListener('shopify:section:load', event => {
    event.target.querySelectorAll('[data-bz-cielo]').forEach(init);
  });
})();
