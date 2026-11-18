(() => {
  'use strict';
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const euro = cents => (cents / 100).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '\u00a0€';

  const hoursNode = q('#bz-hours');
  const hours = hoursNode ? JSON.parse(hoursNode.textContent) : { note: '', free: 50, days: ['', '', '', '', '', '', ''], exceptions: '' };
  const parseRanges = value => String(value || '').split(',').map(part => part.trim()).filter(Boolean).map(part => {
    const [a, b] = part.split('-');
    const toMin = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
    return [toMin(a), toMin(b)];
  });
  const H = hours.days.map(parseRanges);
  const exceptions = String(hours.exceptions || '').split('\n').map(line => line.trim()).filter(Boolean);
  const DAYS = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  const SHORT = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
  const fmt = m => String(Math.floor(m / 60)).padStart(1, '0').replace(/^0(\d)/, '$1') + ':' + String(m % 60).padStart(2, '0');
  const formatter = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });

  function parts(date) {
    const values = formatter.formatToParts(date);
    const get = type => values.find(value => value.type === type).value;
    const y = +get('year'), mo = +get('month'), d = +get('day');
    return { day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday')), min: (+get('hour') % 24) * 60 + +get('minute'), y, mo, d };
  }
  function romeNow() {
    const override = params.get('now');
    if (override) {
      const local = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(override);
      if (local) {
        const year = +local[1], month = +local[2], day = +local[3], hour = +local[4], minute = +local[5];
        const date = new Date(Date.UTC(year, month - 1, day));
        return { day: date.getUTCDay(), min: hour * 60 + minute, y: year, mo: month, d: day };
      }
    }
    return parts(new Date());
  }
  function rangesFor(now) {
    const key = `${now.y}-${String(now.mo).padStart(2, '0')}-${String(now.d).padStart(2, '0')}`;
    const hit = exceptions.find(line => line.startsWith(key));
    if (hit) {
      const rest = hit.slice(key.length).trim();
      if (!rest || rest === 'closed' || rest === 'chiuso') return [];
      return parseRanges(rest);
    }
    return H[now.day] || [];
  }
  function status(now = romeNow()) {
    const ranges = rangesFor(now);
    const { day, min } = now;
    const sundayPending = day === 0 && !(H[0] || []).length && !ranges.length;
    if (sundayPending) {
      return { open: false, closing: false, state: hours.note, more: '', text: hours.note, key: 'sunday', day, min, ranges, sundayPending: true };
    }
    for (const [start, end] of ranges) {
      if (min >= start && min < end) {
        const closing = end - min <= 30;
        const state = closing ? 'Chiude alle ' + fmt(end) : 'Aperto ora';
        const more = closing ? '' : ' · chiude alle ' + fmt(end);
        return { open: true, closing, state, more, text: state + more, key: (closing ? 'closing-' : 'open-') + end, day, min, ranges };
      }
    }
    let next = ranges.find(([start]) => min < start);
    let when = 'oggi';
    if (!next) {
      for (let offset = 1; offset <= 7; offset++) {
        const nextDay = (day + offset) % 7;
        const probe = { ...now, day: nextDay };
        const nextRanges = nextDay === day ? ranges : (H[nextDay] || []);
        if (nextRanges.length) { next = nextRanges[0]; when = DAYS[nextDay]; break; }
      }
    }
    if (!next) return { open: false, closing: false, state: hours.note || 'Orari in arrivo', more: '', text: hours.note, key: 'none', day, min, ranges };
    const more = ' · riapre ' + when + ' alle ' + fmt(next[0]);
    return { open: false, closing: false, state: 'Chiuso', more, text: 'Chiuso' + more, key: 'closed-' + when, day, min, ranges };
  }

  const badgeStates = new WeakMap();
  function paintBadges(now) {
    const s = status(now);
    qa('[data-open-badge]').forEach(el => {
      const full = el.dataset.openBadge === 'full';
      const hoursLabel = s.ranges.length ? s.ranges.map(([start, end]) => {
        const text = fmt(start) + '–' + fmt(end);
        return s.min >= start && s.min < end ? '<b>' + text + '</b>' : text;
      }).join(' · ') : (s.sundayPending ? hours.note : '');
      const html = '<span class="ob-dot" aria-hidden="true"></span><span class="ob-state">' + s.state + '</span>' +
        (s.more ? '<span class="ob-more' + (s.open ? '' : ' ob-next') + '">' + s.more.replace(/^ /, '\u00a0') + '</span>' : '') +
        (full && hoursLabel && !s.sundayPending ? '<span class="ob-sep" aria-hidden="true"></span><span class="ob-hours">Oggi ' + hoursLabel + '</span>' : '');
      const previous = badgeStates.get(el);
      if (!previous || previous.html !== html) el.innerHTML = html;
      el.classList.toggle('closed', !s.open);
      el.classList.toggle('closing', s.closing);
      if (s.open && (!previous || previous.key !== s.key) && !reduced.matches && params.get('static') !== '1') {
        const dot = q('.ob-dot', el);
        if (dot) dot.classList.add('ob-pulse');
      }
      badgeStates.set(el, { key: s.key, html });
    });
  }
  const chartDays = new WeakMap();
  function buildChart(el, now) {
    const first = !chartDays.has(el);
    const columns = [1, 2, 3, 4, 5, 6, 0].map((day, index) => {
      const today = day === now.day;
      const ranges = H[day] || [];
      const bars = ranges.map(([start, end], slot) => {
        const label = fmt(start) + '–' + fmt(end);
        return '<div class="bw-slot" tabindex="0" aria-label="' + DAYS[day] + ': ' + label + '" style="--bw-top:' + ((start - 540) / 660 * 100) + '%;--bw-size:' + ((end - start) / 660 * 100) + '%;--bw-delay:' + ((index * 2 + slot) * 40) + 'ms"><span class="bw-bar"></span><span class="bw-time">' + label + '</span></div>';
      }).join('');
      const empty = ranges.length ? '' : (day === 0 ? '<span class="bw-note">in arrivo</span>' : '<span class="bw-closed">chiuso</span>');
      return '<div class="bw-day' + (today ? ' bw-today' : '') + '"><span class="bw-name">' + SHORT[day] + '</span><div class="bw-track">' + bars + empty + (today ? '<span class="bw-now" hidden><span></span></span>' : '') + '</div></div>';
    }).join('');
    el.innerHTML = '<p class="bw-heading">Questa settimana</p><div class="bw-plot" role="img" aria-label="Orari settimanali. ' + (q('[data-hours-summary]')?.textContent || hours.note) + '"><div class="bw-guides" aria-hidden="true">' + [540, 780, 1020, 1200].map(m => '<span style="--bw-guide:' + ((m - 540) / 660 * 100) + '%"><i>' + fmt(m) + '</i></span>').join('') + '</div><div class="bw-days">' + columns + '</div></div>';
    chartDays.set(el, now.day);
    el.classList.add('bw-ready');
  }
  function paintCharts(now) {
    qa('[data-week-chart]').forEach(el => {
      if (chartDays.get(el) !== now.day) buildChart(el, now);
      const line = q('.bw-now', el);
      if (!line) return;
      line.hidden = now.min < 540 || now.min > 1200;
      line.style.top = ((now.min - 540) / 660 * 100) + '%';
    });
  }
  function paintHours() {
    const now = romeNow();
    paintBadges(now);
    paintCharts(now);
    qa('[data-shop-day]').forEach(row => {
      row.classList.toggle('is-today', Number(row.dataset.shopDay) === now.day);
    });
  }
  paintHours();
  setInterval(paintHours, 60000);

  qa('.bz-pills').forEach(row => {
    const update = () => {
      const overflow = row.scrollWidth > row.clientWidth + 2;
      row.classList.toggle('is-overflowing', overflow);
      row.classList.toggle('is-end', overflow && row.scrollLeft + row.clientWidth >= row.scrollWidth - 4);
    };
    update();
    row.addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
  });

  const desktopMenu = q('.bz-header-section .main-nav');
  const mobile = q('#bz-mobile');
  const toggle = q('[data-bz-burger]');
  const mobileClose = mobile && q('.phone-close', mobile);
  const desktop = matchMedia('(min-width:1024px)');

  function closeGroups(menu, except) {
    if (!menu) return;
    qa('.bz-menu-group[open]', menu).forEach(group => {
      if (group !== except) group.open = false;
    });
  }
  [desktopMenu, mobile].filter(Boolean).forEach(menu => {
    qa('.bz-menu-group', menu).forEach(group => {
      group.addEventListener('toggle', () => { if (group.open) closeGroups(menu, group); });
    });
  });
  document.addEventListener('click', event => {
    if (!desktopMenu?.contains(event.target)) closeGroups(desktopMenu);
  });

  function setMobileMenu(open, restoreFocus = true) {
    if (!mobile || mobile.hidden === !open) return;
    mobile.hidden = !open;
    document.body.classList.toggle('menu-locked', open);
    toggle?.setAttribute('aria-expanded', String(open));
    if (open) mobileClose?.focus();
    else {
      closeGroups(mobile);
      if (restoreFocus) toggle?.focus();
    }
  }
  toggle?.addEventListener('click', () => setMobileMenu(mobile.hidden));
  mobileClose?.addEventListener('click', () => setMobileMenu(false));
  desktop.addEventListener('change', () => {
    closeGroups(desktopMenu);
    setMobileMenu(false, !desktop.matches);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (mobile && !mobile.hidden) setMobileMenu(false);
      const openGroup = desktopMenu && q('.bz-menu-group[open]', desktopMenu);
      if (openGroup) {
        closeGroups(desktopMenu);
        q('summary', openGroup)?.focus();
      }
    }
    if (event.key !== 'Tab' || !mobile || mobile.hidden) return;
    const items = qa('a[href], button, summary', mobile).filter(item => item.getClientRects().length);
    const first = items[0], last = items[items.length - 1];
    if ((event.shiftKey && document.activeElement === first) || (!event.shiftKey && document.activeElement === last)) {
      event.preventDefault();
      (event.shiftKey ? last : first)?.focus();
    }
  });

  const overlay = q('.cart-overlay');
  const drawer = q('.drawer');
  let returnFocus;
  const routes = window.BZ || {};
  async function refreshCart() {
    if (!drawer || !routes.cart) return;
    const cart = await fetch(routes.cart, { headers: { Accept: 'application/json' } }).then(r => r.json());
    const rows = q('[data-cart-rows]', drawer);
    if (rows) {
      rows.innerHTML = cart.items.map(item => `<div class="cart-row"><img src="${item.image}" alt="${item.product_title.replace(/"/g, '&quot;')}" width="200" height="200"><div><a href="${item.url}">${item.product_title}</a><p>${item.quantity} × ${euro(item.final_price)}</p></div></div>`).join('') || '<p>Il carrello è vuoto.</p>';
    }
    const total = q('[data-cart-total]', drawer);
    if (total) total.textContent = euro(cart.total_price);
    paintShipping(q('[data-shipping]', drawer), cart.total_price);
    const count = q('[data-cart-count]');
    if (count) {
      count.textContent = String(cart.item_count);
      count.hidden = cart.item_count < 1;
    }
    const label = q('[data-cart-open]');
    if (label) label.setAttribute('aria-label', 'Carrello, ' + cart.item_count + (cart.item_count === 1 ? ' pezzo' : ' pezzi'));
    return cart;
  }
  function paintShipping(box, cents) {
    if (!box) return;
    const goal = (hours.free || 50) * 100;
    const missing = Math.max(0, goal - cents);
    const text = q('[data-shipping-text]', box) || q('p', box);
    if (text) text.innerHTML = missing === 0 ? 'Spedizione gratuita' : 'Ti mancano <strong>' + euro(missing) + '</strong> per la spedizione gratuita';
    const bar = q('.track span', box);
    if (bar) bar.style.transform = 'scaleX(' + Math.min(cents / goal, 1) + ')';
    const track = q('.track', box);
    if (track) track.setAttribute('aria-valuenow', String(Math.min(cents, goal)));
  }
  function openCart() { if (!overlay) return; returnFocus = document.activeElement; overlay.hidden = false; document.body.classList.add('locked'); drawer?.focus(); }
  function closeCart() { if (!overlay) return; overlay.hidden = true; document.body.classList.remove('locked'); returnFocus?.focus(); }
  qa('[data-cart-open]').forEach(button => button.addEventListener('click', openCart));
  qa('[data-cart-close]').forEach(button => button.addEventListener('click', closeCart));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && overlay && !overlay.hidden) closeCart();
  });
  async function addItems(items) {
    const response = await fetch(routes.add, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ items })
    });
    if (!response.ok) return false;
    await refreshCart();
    openCart();
    return true;
  }
  document.addEventListener('submit', async event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.classList.contains('bz-ajax-cart')) return;
    event.preventDefault();
    const data = new FormData(form);
    const id = Number(data.get('id'));
    const quantity = Math.max(1, Number(data.get('quantity') || 1));
    if (!id) { form.submit(); return; }
    let added = false;
    try { added = await addItems([{ id, quantity }]); } catch (error) { added = false; }
    if (!added) form.submit();
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-bz-add]');
    if (!button || button.disabled) return;
    event.preventDefault();
    addItems([{ id: Number(button.dataset.bzAdd), quantity: 1 }]);
  });

  const hero = q('[data-bz-hero]');
  if (hero) {
    const slides = qa('.hero-slide', hero);
    const mobile = matchMedia('(max-width: 767px), (hover: none)');
    let index = 0, timer, loops = 0, stopped = false, seen = true, hiddenDoc = false;
    const show = n => {
      index = (n + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.classList.toggle('active', on);
        slide.toggleAttribute('inert', !on);
        slide.setAttribute('aria-hidden', String(!on));
      });
    };
    const can = () => !stopped && seen && !hiddenDoc && !reduced.matches && params.get('static') !== '1' && !mobile.matches;
    const arm = () => { clearInterval(timer); if (can()) timer = setInterval(() => {
      const next = (index + 1) % slides.length;
      if (next === 0) { loops += 1; show(0); if (loops >= 3) { stopped = true; clearInterval(timer); } return; }
      show(next);
    }, 7000); };
    const stopForever = () => { stopped = true; clearInterval(timer); };
    show(0);
    arm();
    hero.addEventListener('pointerenter', stopForever);
    hero.addEventListener('focusin', stopForever);
    hero.addEventListener('touchstart', stopForever, { passive: true });
    document.addEventListener('visibilitychange', () => { hiddenDoc = document.hidden; arm(); });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => { seen = entries.some(entry => entry.intersectionRatio >= 0.3); arm(); }, { threshold: [0, 0.3, 1] }).observe(hero);
    }
    mobile.addEventListener?.('change', arm);
  }

  const ritual = q('#ritual');
  if (ritual) {
    const sets = qa('[data-ritual-set]', ritual);
    const pills = qa('[data-set]', ritual);
    const showSet = index => {
      sets.forEach(set => { const on = set.dataset.ritualSet === String(index); set.hidden = !on; });
      pills.forEach(pill => pill.setAttribute('aria-pressed', String(pill.dataset.set === String(index))));
      qa('.ritual-bg', ritual).forEach(layer => layer.classList.toggle('on', layer.dataset.tone === String(index)));
      updateRitual();
    };
    const updateRitual = () => {
      const active = sets.find(set => !set.hidden) || sets[0];
      if (!active) return;
      const rows = qa('.ritual-row', active);
      let count = 0, sum = 0, enabled = 0, checked = 0;
      rows.forEach(row => {
        const input = q('input', row);
        if (!input || input.disabled) return;
        enabled += 1;
        if (input.checked) { checked += 1; count += 1; sum += Number(input.dataset.price || 0); }
      });
      const countEl = q('.ritual-count', active);
      const totalEl = q('.ritual-sum', active);
      if (countEl) countEl.textContent = count + (count === 1 ? ' pezzo scelto' : ' pezzi scelti');
      if (totalEl) totalEl.textContent = euro(sum);
      const saving = q('.ritual-saving', active);
      const bundle = ritual.dataset.bundle === 'true';
      if (saving) {
        if (bundle && enabled > 0 && checked === enabled) {
          const discounted = Math.round(sum * 0.9);
          saving.hidden = false;
          saving.textContent = 'Il set costa ' + euro(discounted) + ' invece di ' + euro(sum) + ': 10% in meno';
        } else saving.hidden = true;
      }
      const button = q('[data-add-ritual]', active);
      if (button) {
        button.disabled = count === 0;
        button.setAttribute('aria-disabled', String(count === 0));
        button.style.opacity = count === 0 ? '.45' : '';
      }
      const goal = (hours.free || 50) * 100;
      const text = q('.ritual-shipping-text', active);
      if (text) text.innerHTML = sum >= goal ? 'Spedizione gratuita' : 'Ti mancano <strong>' + euro(goal - sum) + '</strong> per la spedizione gratuita';
      const bar = q('.ritual-progress', active);
      if (bar) bar.style.transform = 'scaleX(' + Math.min(sum / goal, 1) + ')';
    };
    pills.forEach(pill => pill.addEventListener('click', () => showSet(pill.dataset.set)));
    ritual.addEventListener('change', event => { if (event.target.matches('input[type="checkbox"]')) updateRitual(); });
    ritual.addEventListener('click', event => {
      if (!event.target.closest('[data-add-ritual]')) return;
      const active = sets.find(set => !set.hidden) || sets[0];
      const items = qa('input:checked:not(:disabled)', active).map(input => ({ id: Number(input.dataset.variant), quantity: 1 }));
      if (items.length) addItems(items);
    });
    showSet(pills.find(pill => pill.getAttribute('aria-pressed') === 'true')?.dataset.set || '0');
  }

  const stoneGrid = q('#gem-grid');
  if (stoneGrid) {
    qa('[data-stone-filter]').forEach(button => button.addEventListener('click', () => {
      qa('[data-stone-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      const intent = button.dataset.stoneFilter;
      qa('.gem', stoneGrid).forEach(card => { card.hidden = intent !== 'all' && card.dataset.intent !== intent; });
    }));
    let openCard = null;
    const setOpen = (card, open) => {
      const turn = q('.gem-turn', card);
      const button = q('.stone__toggle', card);
      const front = q('.gem-front', card);
      const back = q('.gem-back', card);
      if (turn) turn.style.transform = open && !reduced.matches ? 'rotateY(180deg)' : '';
      if (reduced.matches) { if (front) front.hidden = open; if (back) back.hidden = !open; }
      button?.setAttribute('aria-expanded', String(open));
      const label = q('span', button);
      if (label) label.textContent = open ? 'Torna alla foto' : 'Scopri il significato';
      front?.toggleAttribute('inert', open);
      back?.toggleAttribute('inert', !open);
      if (back) back.setAttribute('aria-hidden', String(!open));
    };
    qa('.gem', stoneGrid).forEach(card => {
      const button = q('.stone__toggle', card);
      button?.addEventListener('click', () => {
        const open = button.getAttribute('aria-expanded') !== 'true';
        if (openCard && openCard !== card) setOpen(openCard, false);
        setOpen(card, open);
        openCard = open ? card : null;
      });
    });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && openCard) { setOpen(openCard, false); openCard = null; } });
    const more = q('#stones-toggle');
    const mobileStones = matchMedia('(max-width: 767px)');
    const syncStones = () => {
      if (!more) return;
      const collapsed = mobileStones.matches && more.dataset.expanded !== 'true';
      stoneGrid.classList.toggle('is-collapsed', collapsed);
      more.hidden = !mobileStones.matches;
    };
    more?.addEventListener('click', () => { more.dataset.expanded = more.dataset.expanded === 'true' ? 'false' : 'true'; more.textContent = more.dataset.expanded === 'true' ? 'Mostra meno' : 'Vedile tutte'; syncStones(); });
    syncStones();
    mobileStones.addEventListener?.('change', syncStones);
  }

  qa('[data-faq]').forEach(faq => {
    const panels = qa('[data-faq-panel]', faq);
    qa('[data-faq-tab]', faq).forEach(tab => tab.addEventListener('click', () => {
      qa('[data-faq-tab]', faq).forEach(other => other.setAttribute('aria-pressed', String(other === tab)));
      panels.forEach(panel => { panel.hidden = panel.dataset.faqPanel !== tab.dataset.faqTab; });
    }));
  });

  qa('[data-compare]').forEach(root => {
    const groups = qa('[data-compare-group]', root);
    qa('[data-compare-stone]', root).forEach(button => button.addEventListener('click', () => {
      qa('[data-compare-stone]', root).forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      groups.forEach(group => { group.hidden = group.dataset.compareGroup !== button.dataset.compareStone; });
      const status = q('#compare-status', root);
      if (status) status.textContent = button.textContent.trim();
    }));
  });

  qa('[data-add-month]').forEach(button => button.addEventListener('click', () => {
    const panel = button.closest('[data-month-panel]');
    const items = qa('[data-bz-add]', panel).filter(node => !node.disabled).map(node => ({ id: Number(node.dataset.bzAdd), quantity: 1 }));
    if (items.length) addItems(items);
  }));
  qa('[data-birthstones]').forEach(root => {
    const row = q('.bz-pills', root);
    const buttons = qa('[data-month]', row);
    const panels = qa('[data-month-panel]', root);
    const desktopMonths = matchMedia('(min-width: 1024px)');
    function centerMonth(button, animate = false) {
      if (!button || desktopMonths.matches) return;
      const delta = button.getBoundingClientRect().left - row.getBoundingClientRect().left;
      const left = row.scrollLeft + delta - (row.clientWidth - button.offsetWidth) / 2;
      row.scrollTo({ left, behavior: animate && !reduced.matches ? 'smooth' : 'instant' });
    }
    const selected = () => buttons.find(button => button.getAttribute('aria-pressed') === 'true');
    buttons.forEach(button => button.addEventListener('click', () => {
      buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      panels.forEach(panel => { panel.hidden = panel.dataset.monthPanel !== button.dataset.month; });
      centerMonth(button, true);
    }));
    const resizeMonths = new ResizeObserver(() => centerMonth(selected()));
    resizeMonths.observe(row);
    document.fonts?.ready.then(() => centerMonth(selected()));
    centerMonth(selected());
  });

  const routine = q('#routine');
  if (routine) {
    const products = qa('[data-routine-product]', routine);
    let mode = 0, step = 0;
    const paint = () => {
      routine.classList.toggle('is-night', mode === 1);
      qa('[data-mode]', routine).forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.mode) === mode)));
      qa('[data-step]', routine).forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.step) === step)));
      products.forEach(product => { product.hidden = product.dataset.routineProduct !== mode + '-' + step; });
    };
    qa('[data-mode]', routine).forEach(button => button.addEventListener('click', () => { mode = Number(button.dataset.mode); step = 0; paint(); }));
    qa('[data-step]', routine).forEach(button => button.addEventListener('click', () => { step = Number(button.dataset.step); paint(); }));
    paint();
  }

  const stage = q('.venn-stage');
  if (stage) {
    const circles = qa('[data-dosha]', stage);
    const names = ['Vata', 'Pitta', 'Kapha'];
    const centers = [[.5, .33], [.33, .62], [.67, .62]];
    const selectCircle = index => {
      circles.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      const panel = q('#circle-panel');
      const source = q('#dosha-content-' + index);
      if (panel && source) {
        panel.replaceChildren(source.content.cloneNode(true));
        if (!reduced.matches) panel.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, easing: 'cubic-bezier(.4,0,.2,1)' });
      }
    };
    stage.addEventListener('click', event => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const distances = centers.map(c => (c[0] - x) ** 2 + (c[1] - y) ** 2);
      const index = distances.indexOf(Math.min(...distances));
      if (event.detail === 0) { const button = event.target.closest('[data-dosha]'); if (button) selectCircle(Number(button.dataset.dosha)); return; }
      if (distances[index] <= .29 ** 2) selectCircle(index);
    });
    if (params.get('static') !== '1' && !reduced.matches && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        circles.forEach((button, i) => button.animate([{ transform: 'scale(1)' }, { transform: 'scale(1.015)' }, { transform: 'scale(1)' }], { duration: 2400, delay: i * 800, easing: 'ease-in-out' }));
      }, { threshold: 0.25 });
      observer.observe(stage);
    }
    selectCircle(params.get('state') === 'dosha' ? 1 : 0);
    const svg = q('.venn-orbit', stage);
    if (svg) {
      const NS = 'http://www.w3.org/2000/svg';
      const C = centers, DIR = [270, 125, 55], SLIDE = [-8, 8, -8];
      const LABEL = [['Vata', 'ARIA · SPAZIO'], ['Pitta', 'FUOCO'], ['Kapha', 'TERRA']];
      const G = [(C[0][0] + C[1][0] + C[2][0]) / 3, (C[0][1] + C[1][1] + C[2][1]) / 3];
      let orbs = [], water = null, selected = -1;
      const el = (t, a = {}, p) => { const node = document.createElementNS(NS, t); Object.entries(a).forEach(([k, v]) => node.setAttribute(k, v)); if (p) p.appendChild(node); return node; };
      const pt = (cx, cy, r, deg) => { const t = deg * Math.PI / 180; return [cx + r * Math.cos(t), cy + r * Math.sin(t)]; };
      const arc = (cx, cy, r, deg, span) => {
        const low = Math.sin(deg * Math.PI / 180) > 0;
        const a0 = low ? deg + span / 2 : deg - span / 2, a1 = low ? deg - span / 2 : deg + span / 2;
        const [x0, y0] = pt(cx, cy, r, a0), [x1, y1] = pt(cx, cy, r, a1);
        return `M${x0.toFixed(2)} ${y0.toFixed(2)}A${r.toFixed(2)} ${r.toFixed(2)} 0 ${span > 180 ? 1 : 0} ${low ? 0 : 1} ${x1.toFixed(2)} ${y1.toFixed(2)}`;
      };
      const build = () => {
        const W = stage.clientWidth; if (!W) return;
        svg.setAttribute('viewBox', `0 0 ${W} ${W}`); svg.replaceChildren(); orbs = [];
        const fsN = Math.max(17, Math.min(22, 6.9 + .029 * W)), fsE = W < 400 ? 10.5 : 11;
        const rIn = .29 * W * 1.04 + Math.max(6, .016 * W);
        const defs = el('defs', {}, svg);
        C.forEach((c, i) => {
          const cx = c[0] * W, cy = c[1] * W, deg = DIR[i], rb = rIn + fsN * .32;
          const g = el('g', { class: 'orb o' + i }, svg); g.style.transformOrigin = cx + 'px ' + cy + 'px';
          el('path', { id: 'orb-p' + i, d: arc(cx, cy, rb, deg, 300) }, defs);
          const text = el('text', {}, g);
          const path = el('textPath', { href: '#orb-p' + i, startOffset: '50%', 'text-anchor': 'middle' }, text);
          el('tspan', { class: 'o-name', 'font-size': fsN, dy: (.27 * fsN).toFixed(2) }, path).textContent = LABEL[i][0];
          el('tspan', { class: 'o-sep', 'font-size': fsE, dy: (-(.27 * fsN - .35 * fsE)).toFixed(2) }, path).textContent = ' · ';
          el('tspan', { class: 'o-el', 'font-size': fsE }, path).textContent = LABEL[i][1];
          orbs.push(g);
        });
        const gx = G[0] * W, gy = G[1] * W;
        el('path', { id: 'orb-pw', d: arc(gx, gy, gy * .2 + 40, 90, 120) }, defs);
        water = el('text', { class: 'o-water' }, svg);
        const wp = el('textPath', { href: '#orb-pw', startOffset: '50%', 'text-anchor': 'middle' }, water);
        el('tspan', { class: 'o-el', 'font-size': fsE }, wp).textContent = 'ACQUA';
        paintOrbit(false);
      };
      const paintOrbit = anim => {
        const i = circles.findIndex(button => button.getAttribute('aria-pressed') === 'true');
        orbs.forEach((g, k) => g.classList.toggle('on', k === i));
        if (water) water.classList.toggle('on', i === 1 || i === 2);
        if (anim && i >= 0 && i !== selected && !reduced.matches && orbs[i]) orbs[i].animate([{ transform: `rotate(${SLIDE[i]}deg)` }, { transform: 'rotate(0deg)' }], { duration: 400, easing: 'cubic-bezier(.2,.7,.1,1)' });
        selected = i;
      };
      new MutationObserver(() => paintOrbit(true)).observe(stage, { subtree: true, attributes: true, attributeFilter: ['aria-pressed'] });
      build();
      document.fonts?.ready?.then(build);
      new ResizeObserver(build).observe(stage);
    }
    void names;
  }

  qa('[data-load]').forEach(link => link.addEventListener('click', async event => {
    if (!link.href) return;
    event.preventDefault();
    link.setAttribute('aria-busy', 'true');
    const html = await fetch(link.href).then(r => r.text());
    const doc = new DOMParser().parseFromString(html, 'text/html');
    const grid = q('[data-grid]');
    doc.querySelectorAll('[data-grid] .product').forEach(card => grid?.append(card));
    const next = doc.querySelector('[data-load]');
    const shown = q('[data-shown]');
    const of = q('[data-of]');
    const nextShown = doc.querySelector('[data-shown]');
    const nextOf = doc.querySelector('[data-of]');
    if (shown && nextShown) shown.textContent = nextShown.textContent;
    if (of && nextOf) of.textContent = nextOf.textContent;
    const bar = q('[data-bar]');
    if (bar && shown && of) bar.style.transform = 'scaleX(' + (Number(shown.textContent) / Number(of.textContent) || 0) + ')';
    if (next) link.href = next.href; else link.hidden = true;
    link.removeAttribute('aria-busy');
  }));

  qa('[data-sort]').forEach(select => select.addEventListener('change', () => select.form?.requestSubmit()));

  qa('.cart-item [data-delta]').forEach(button => button.addEventListener('click', async () => {
    const item = button.closest('.cart-item');
    const key = item?.dataset.key;
    const qty = Number(item?.dataset.quantity || 1) + Number(button.dataset.delta);
    await fetch(routes.change, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ id: key, quantity: Math.max(0, qty) }) });
    location.reload();
  }));
  qa('.remove-item').forEach(button => button.addEventListener('click', async () => {
    const key = button.closest('.cart-item')?.dataset.key;
    await fetch(routes.change, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ id: key, quantity: 0 }) });
    location.reload();
  }));

  const footerMedia = matchMedia('(max-width:600px)');
  const adjustFooter = () => qa('footer details').forEach(details => { if (footerMedia.matches) details.open = false; else details.open = true; });
  adjustFooter();
  footerMedia.addEventListener?.('change', adjustFooter);
  document.addEventListener('click', event => {
    const tab = event.target.closest('button[data-picked]');
    if (!tab) return;
    const root = tab.closest('section');
    if (!root) return;
    root.querySelectorAll('[data-picked]').forEach(other => other.setAttribute('aria-selected', String(other === tab)));
    root.querySelectorAll('[data-picked-panel]').forEach(panel => { panel.hidden = panel.dataset.pickedPanel !== tab.dataset.picked; });
  });
  const tour = q('#shop-lightbox');
  const tourCards = qa('.tour-card');
  const tourOpener = q('[data-tour-open]');
  if (tour && tourCards.length) {
    const shot = q('.tour-large', tour);
    const caption = q('.tour-caption h3', tour);
    const count = q('.tour-caption p', tour);
    let tourIndex = 0;
    const showTour = index => {
      tourIndex = (index + tourCards.length) % tourCards.length;
      const img = q('img', tourCards[tourIndex]);
      if (shot && img) {
        shot.src = img.currentSrc || img.src;
        shot.alt = img.alt;
      }
      if (caption) caption.textContent = img ? img.alt : '';
      if (count) count.textContent = (tourIndex + 1) + ' / ' + tourCards.length;
      if (!tour.open) tour.showModal();
      tourOpener?.setAttribute('aria-expanded', 'true');
      document.body.classList.add('tour-locked');
    };
    tourCards.forEach((card, index) => card.addEventListener('click', () => showTour(index)));
    tourOpener?.addEventListener('click', () => showTour(0));
    q('.tour-prev', tour)?.addEventListener('click', () => showTour(tourIndex - 1));
    q('.tour-next', tour)?.addEventListener('click', () => showTour(tourIndex + 1));
    q('.tour-close', tour)?.addEventListener('click', () => tour.close());
    tour.addEventListener('close', () => {
      document.body.classList.remove('tour-locked');
      tourOpener?.setAttribute('aria-expanded', 'false');
    });
    tour.addEventListener('click', event => { if (event.target === tour) tour.close(); });
  }

  const triStage = q('.triangle-stage');
  const triPoint = q('.tri-point');
  if (triStage && triPoint) {
    const vertices = [{ x: 50, y: 6 }, { x: 6, y: 88 }, { x: 94, y: 88 }];
    const center = { x: 50, y: 182 / 3 };
    const names = ['Vata', 'Pitta', 'Kapha'];
    const vertexButtons = qa('[data-vertex]', triStage);
    const status = q('#tri-status');
    const panel = q('#tri-panel');
    let position = { ...center };
    let weights = [1 / 3, 1 / 3, 1 / 3];
    let dragging = null;
    let current = 0;
    const barycentric = p => {
      const v = (88 - p.y) / 82;
      const k = ((p.x - 50) + 44 * (1 - v)) / 88;
      return [v, 1 - v - k, k];
    };
    const project = p => {
      if (barycentric(p).every(w => w >= 0)) return p;
      let best = p;
      let dist = Infinity;
      vertices.forEach((a, i) => {
        const b = vertices[(i + 1) % 3];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
        const qpos = { x: a.x + t * dx, y: a.y + t * dy };
        const d = (qpos.x - p.x) ** 2 + (qpos.y - p.y) ** 2;
        if (d < dist) { best = qpos; dist = d; }
      });
      return best;
    };
    const positionPoint = () => {
      const r = triStage.getBoundingClientRect();
      triPoint.style.transform = 'translate(' + ((position.x / 100 * r.width) - 22) + 'px,' + ((position.y / 100 * r.height) - 22) + 'px)';
    };
    const paintTri = index => {
      const source = q('#dosha-content-' + index);
      if (!panel || !source) return;
      panel.replaceChildren(source.content.cloneNode(true));
      const title = q('h3', panel);
      if (title) title.innerHTML = 'Oggi prevale <em>' + names[index] + '</em>';
    };
    const move = p => {
      position = project(p);
      weights = barycentric(position).map(v => Math.max(0, Math.min(1, v)));
      const sum = weights.reduce((a, b) => a + b, 0) || 1;
      weights = weights.map(v => v / sum);
      let dominant = weights.indexOf(Math.max(...weights));
      if (weights[current] >= weights[dominant] - 1e-9) dominant = current;
      current = dominant;
      const percentages = weights.map(v => Math.floor(v * 100));
      const order = [0, 1, 2].sort((a, b) => (weights[b] * 100 - percentages[b]) - (weights[a] * 100 - percentages[a]));
      let remainder = 100 - percentages.reduce((a, b) => a + b, 0);
      for (let i = 0; i < remainder; i += 1) percentages[order[i]] += 1;
      positionPoint();
      triPoint.setAttribute('aria-valuenow', String(percentages[0]));
      triPoint.setAttribute('aria-valuetext', names.map((n, i) => n + ' ' + percentages[i] + '%').join(', '));
      qa('[data-weight]').forEach((bar, i) => {
        const output = q('output', bar);
        const fill = q('i', bar);
        if (output) output.textContent = percentages[i] + '%';
        if (fill) fill.style.transform = 'scaleX(' + weights[i] + ')';
      });
      vertexButtons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === dominant)));
      paintTri(dominant);
      if (status) status.textContent = triPoint.getAttribute('aria-valuetext');
    };
    const pointerPosition = event => {
      const r = triStage.getBoundingClientRect();
      return { x: (event.clientX - r.left) / r.width * 100, y: (event.clientY - r.top) / r.height * 100 };
    };
    if ('ResizeObserver' in window) new ResizeObserver(positionPoint).observe(triStage);
    triStage.addEventListener('pointerdown', event => {
      if (event.target.closest('[data-vertex]') || (event.pointerType === 'mouse' && event.button !== 0) || dragging !== null) return;
      const p = pointerPosition(event);
      if (!event.target.closest('.tri-point') && !barycentric(p).every(w => w >= 0)) return;
      dragging = event.pointerId;
      triStage.setPointerCapture(event.pointerId);
      triStage.classList.add('dragging');
      move(p);
      event.preventDefault();
    });
    triStage.addEventListener('pointermove', event => { if (event.pointerId === dragging) move(pointerPosition(event)); });
    const stop = event => {
      if (event.pointerId !== dragging) return;
      dragging = null;
      triStage.classList.remove('dragging');
      const i = weights.indexOf(Math.max(...weights));
      if (weights[i] > 0.9) move(vertices[i]);
      else if (weights.every(w => Math.abs(w - 1 / 3) <= 0.05)) move(center);
      if (triStage.hasPointerCapture(event.pointerId)) triStage.releasePointerCapture(event.pointerId);
    };
    triStage.addEventListener('pointerup', stop);
    triStage.addEventListener('pointercancel', stop);
    vertexButtons.forEach((button, i) => button.addEventListener('click', () => move(vertices[i])));
    move(center);
  }

  qa('.card-name').forEach(name => {
    let tracking = 0.08;
    name.style.letterSpacing = tracking + 'em';
    while (name.scrollWidth > name.clientWidth + 0.5 && tracking > 0) {
      tracking = Math.max(0, +(tracking - 0.01).toFixed(2));
      name.style.letterSpacing = tracking + 'em';
    }
  });
})();
