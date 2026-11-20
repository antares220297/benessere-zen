(() => {
  'use strict';
  const q = (s, r = document) => r.querySelector(s);
  const qa = (s, r = document) => [...r.querySelectorAll(s)];
  const params = new URLSearchParams(location.search);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const euro = cents => (cents / 100).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + '\u00a0€';

  if (!HTMLScriptElement.supports?.('speculationrules')) {
    const prefetched = new Set();
    let hoverTimer;

    const prefetch = link => {
      if (!link || navigator.connection?.saveData || link.hasAttribute('download')) return;
      let url;
      try { url = new URL(link.href); } catch { return; }
      const path = url.pathname.replace(/^\/[a-z]{2}(?:-[a-z]{2})?(?=\/)/i, '');
      if (url.origin !== location.origin || !['https:', 'http:'].includes(url.protocol) ||
          /^\/(cart|checkout|account)/i.test(path) || /add/i.test(url.search)) return;
      url.hash = '';
      if (url.href === location.origin + location.pathname + location.search || prefetched.has(url.href)) return;
      prefetched.add(url.href);
      const hint = document.createElement('link');
      hint.rel = 'prefetch';
      hint.href = url.href;
      document.head.append(hint);
    };

    document.addEventListener('pointerenter', event => {
      if (!event.target.matches?.('a[href]') || event.pointerType === 'touch') return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(() => prefetch(event.target), 65);
    }, true);
    document.addEventListener('pointerleave', event => {
      if (event.target.matches?.('a[href]')) clearTimeout(hoverTimer);
    }, true);
    document.addEventListener('touchstart', event => {
      prefetch(event.target.closest?.('a[href]'));
    }, { passive: true });
  }

  const hoursNode = q('#bz-hours');
  const hours = hoursNode ? JSON.parse(hoursNode.textContent) : { note: '', free: 50, days: ['', '', '', '', '', '', ''], exceptions: '' };
  const parseRanges = value => String(value || '').split(',').flatMap(part => {
    const range = /^(\d{1,2}):([0-5]\d)\s*-\s*(\d{1,2}):([0-5]\d)$/.exec(part.trim());
    if (!range) return [];
    const [, startHour, startMinute, endHour, endMinute] = range.map(Number);
    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;
    return startHour < 24 && end <= 1440 && start < end ? [[start, end]] : [];
  }).sort((a, b) => a[0] - b[0]);
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
  function shiftDate(now, offset) {
    const date = new Date(Date.UTC(now.y, now.mo - 1, now.d + offset));
    return { day: date.getUTCDay(), y: date.getUTCFullYear(), mo: date.getUTCMonth() + 1, d: date.getUTCDate() };
  }
  function rangesFor(now) {
    const key = `${now.y}-${String(now.mo).padStart(2, '0')}-${String(now.d).padStart(2, '0')}`;
    const hit = exceptions.find(line => line === key || line.startsWith(key + ' '));
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
        const date = shiftDate(now, offset);
        const nextRanges = rangesFor(date);
        if (nextRanges.length) { next = nextRanges[0]; when = DAYS[date.day]; break; }
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
      const showDetails = el.dataset.openBadge !== 'status';
      const hoursLabel = s.ranges.length ? s.ranges.map(([start, end]) => {
        const text = fmt(start) + '–' + fmt(end);
        return s.min >= start && s.min < end ? '<b>' + text + '</b>' : text;
      }).join(' · ') : (s.sundayPending ? hours.note : '');
      const html = '<span class="ob-dot" aria-hidden="true"></span><span class="ob-state">' + s.state + '</span>' +
        (showDetails && s.more ? '<span class="ob-more' + (s.open ? '' : ' ob-next') + '">' + s.more.replace(/^ /, '\u00a0') + '</span>' : '') +
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
    const monday = shiftDate(now, -((now.day + 6) % 7));
    const columns = [1, 2, 3, 4, 5, 6, 0].map((day, index) => {
      const today = day === now.day;
      const ranges = rangesFor(shiftDate(monday, index));
      const bars = ranges.map(([start, end], slot) => {
        const label = fmt(start) + '–' + fmt(end);
        return '<div class="bw-slot" tabindex="0" aria-label="' + DAYS[day] + ': ' + label + '" style="--bw-top:' + ((start - 540) / 660 * 100) + '%;--bw-size:' + ((end - start) / 660 * 100) + '%;--bw-delay:' + ((index * 2 + slot) * 40) + 'ms"><span class="bw-bar"></span><span class="bw-time">' + label + '</span></div>';
      }).join('');
      const empty = ranges.length ? '' : (day === 0 ? '<span class="bw-note">in arrivo</span>' : '<span class="bw-closed">chiuso</span>');
      return '<div class="bw-day' + (today ? ' bw-today' : '') + '"><span class="bw-name">' + SHORT[day] + '</span><div class="bw-track">' + bars + empty + (today ? '<span class="bw-now" hidden><span></span></span>' : '') + '</div></div>';
    }).join('');
    el.innerHTML = '<p class="bw-heading">Questa settimana</p><div class="bw-plot" role="img" aria-label="Orari settimanali. ' + (q('[data-hours-summary]')?.textContent || hours.note) + '"><div class="bw-guides" aria-hidden="true">' + [540, 780, 1020, 1200].map(m => '<span style="--bw-guide:' + ((m - 540) / 660 * 100) + '%"><i>' + fmt(m) + '</i></span>').join('') + '</div><div class="bw-days">' + columns + '</div></div>';
    chartDays.set(el, now.d);
    el.classList.add('bw-ready');
  }
  function paintCharts(now) {
    qa('[data-week-chart]').forEach(el => {
      if (chartDays.get(el) !== now.d) buildChart(el, now);
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
  const menuSection = toggle?.closest('.bz-header-section');
  const menuHeader = toggle?.closest('header');
  const desktop = matchMedia('(min-width:1024px)');
  const isMenuOpen = () => Boolean(menuSection?.classList.contains('is-menu-open'));

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

  function positionMobileMenu() {
    if (!isMenuOpen()) return;
    mobile.style.setProperty('--bz-menu-top', Math.max(0, menuHeader.getBoundingClientRect().bottom) + 'px');
  }

  function setMobileMenu(open, restoreFocus = true) {
    if (!mobile || !menuSection || isMenuOpen() === open) return;
    menuSection.classList.toggle('is-menu-open', open);
    document.body.classList.toggle('menu-locked', open);
    mobile.toggleAttribute('inert', !open);
    q('.brand', menuHeader)?.toggleAttribute('inert', open);
    mobile.setAttribute('aria-hidden', String(!open));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Chiudi menu' : 'Apri menu');
    if (open) {
      menuSection.setAttribute('role', 'dialog');
      menuSection.setAttribute('aria-modal', 'true');
      menuSection.setAttribute('aria-label', 'Menu mobile');
      positionMobileMenu();
    } else {
      menuSection.removeAttribute('role');
      menuSection.removeAttribute('aria-modal');
      menuSection.removeAttribute('aria-label');
      closeGroups(mobile);
      if (restoreFocus) toggle.focus({ preventScroll: true });
    }
  }
  toggle?.addEventListener('click', () => setMobileMenu(!isMenuOpen()));
  mobile?.addEventListener('click', event => {
    if (event.target.closest('a[href]')) setMobileMenu(false);
  });
  addEventListener('resize', positionMobileMenu);
  if (menuHeader && 'ResizeObserver' in window) new ResizeObserver(positionMobileMenu).observe(menuHeader);
  desktop.addEventListener('change', () => {
    closeGroups(desktopMenu);
    const wasOpen = isMenuOpen();
    setMobileMenu(false, !desktop.matches);
    if (wasOpen && desktop.matches) q('.brand', menuHeader)?.focus({ preventScroll: true });
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (isMenuOpen()) {
        event.preventDefault();
        setMobileMenu(false);
      }
      const openGroup = desktopMenu && q('.bz-menu-group[open]', desktopMenu);
      if (openGroup) {
        closeGroups(desktopMenu);
        q('summary', openGroup)?.focus();
      }
    }
    if (event.key === 'Tab' && isMenuOpen()) trapTab(event, menuSection);
  });

  function trapTab(event, root) {
    const items = qa('a[href], button:not(:disabled), summary, input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]', root)
      .filter(item => !item.closest('[inert]') && item.getClientRects().length &&
        getComputedStyle(item).visibility === 'visible');
    const first = items[0], last = items[items.length - 1];
    const active = document.activeElement;
    if (!items.includes(active) || (event.shiftKey ? active === first : active === last)) {
      event.preventDefault();
      (event.shiftKey ? last : first)?.focus();
    }
  }

  const overlay = q('.cart-overlay');
  const drawer = q('.drawer');
  let returnFocus;
  const routes = window.BZ || {};
  async function refreshCart() {
    const content = q('[data-cart-content]', drawer);
    if (!content) return;
    const url = new URL(location.href);
    url.searchParams.set('section_id', content.dataset.sectionId);
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) return;
    const html = new DOMParser().parseFromString(await response.text(), 'text/html');
    const updated = q('[data-cart-content]', html);
    if (!updated) return;
    content.replaceWith(updated);
    const itemCount = Number(updated.dataset.itemCount);
    const count = q('[data-cart-count]');
    if (count) {
      count.textContent = String(itemCount);
      count.hidden = itemCount < 1;
    }
    const label = q('[data-bz-header-cart]');
    if (label) label.setAttribute('aria-label', label.dataset.bzHeaderCart + (itemCount ? ', ' + itemCount + (itemCount === 1 ? ' pezzo' : ' pezzi') : ''));
    document.dispatchEvent(new CustomEvent('bz:cart-updated', { detail: { totalPrice: Number(updated.dataset.totalPrice) } }));
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
  function openCart() {
    if (!overlay) return;
    if (!overlay.hidden) return;
    if (isMenuOpen()) setMobileMenu(false);
    returnFocus = document.activeElement;
    overlay.hidden = false;
    document.body.classList.add('locked');
    drawer?.focus();
  }
  function closeCart() { if (!overlay) return; overlay.hidden = true; document.body.classList.remove('locked'); returnFocus?.focus(); }
  qa('[data-cart-open]').forEach(button => button.addEventListener('click', openCart));
  qa('[data-cart-close]').forEach(button => button.addEventListener('click', closeCart));
  document.addEventListener('keydown', event => {
    if (!drawer || overlay.hidden) return;
    if (event.key === 'Escape') closeCart();
    if (event.key === 'Tab') trapTab(event, drawer);
  });

  let cartQueue = Promise.resolve();
  function queueCart(task) {
    const operation = cartQueue.then(task);
    cartQueue = operation.catch(() => {});
    return operation;
  }

  function addItems(items) {
    return queueCart(async () => {
      const response = await fetch(routes.add, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items })
      });
      if (!response.ok) return false;
      await refreshCart().catch(() => {});
      openCart();
      return true;
    });
  }

  const adding = new WeakSet();
  async function submitItems(owner, anchor, items) {
    if (adding.has(owner)) return;
    adding.add(owner);
    owner.setAttribute('aria-busy', 'true');
    qa('.bz-ajax-error', owner.parentElement).forEach(message => { message.hidden = true; });
    const sibling = anchor.nextElementSibling;
    const status = sibling?.matches('.bz-ajax-error') ? sibling : document.createElement('p');
    status.className = 'bz-cart-error bz-ajax-error';
    status.setAttribute('role', 'alert');
    status.hidden = true;
    if (!status.isConnected) anchor.after(status);
    try {
      if (!await addItems(items)) {
        status.textContent = 'Impossibile aggiungere al carrello. Verifica la disponibilità e riprova.';
        status.hidden = false;
      }
    } catch {
      status.textContent = 'Impossibile confermare l’aggiunta. Controlla il carrello prima di riprovare.';
      status.hidden = false;
    } finally {
      adding.delete(owner);
      owner.removeAttribute('aria-busy');
    }
  }

  document.addEventListener('submit', event => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || !form.classList.contains('bz-ajax-cart')) return;
    event.preventDefault();
    const data = new FormData(form);
    const id = Number(data.get('id'));
    const quantity = Math.max(1, Number(data.get('quantity') || 1));
    if (id) submitItems(form, event.submitter?.closest('.bz-sticky') ? event.submitter : form, [{ id, quantity }]);
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-bz-add]');
    if (!button || button.disabled) return;
    event.preventDefault();
    submitItems(button, button.closest('.product-bottom') || button, [{ id: Number(button.dataset.bzAdd), quantity: 1 }]);
  });

  const hero = q('[data-bz-hero]');
  if (hero) {
    const slides = qa('.hero-slide', hero);
    const navigation = q('.hero-navigation', hero);
    const buttons = qa('[data-hero-target]', navigation);
    let index = 0;
    let timer;
    let hovered = matchMedia('(any-hover: hover)').matches && hero.matches(':hover');

    function schedule() {
      clearTimeout(timer);
      if (hovered || hero.contains(document.activeElement) || document.hidden || reduced.matches) return;
      timer = setTimeout(() => showSlide((index + 1) % slides.length), 3000);
    }

    function showSlide(next) {
      index = next;
      slides.forEach((slide, i) => {
        const active = i === index;
        slide.classList.toggle('active', active);
        slide.toggleAttribute('inert', !active);
        slide.setAttribute('aria-hidden', String(!active));
      });
      buttons.forEach((control, i) => {
        if (i === index) control.setAttribute('aria-current', 'true');
        else control.removeAttribute('aria-current');
      });
      schedule();
    }

    navigation.hidden = false;
    navigation.addEventListener('click', event => {
      const button = event.target.closest('[data-hero-target]');
      if (button) showSlide(Number(button.dataset.heroTarget));
    });
    hero.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      hovered = true;
      schedule();
    });
    hero.addEventListener('pointerleave', event => {
      if (event.pointerType === 'touch') return;
      hovered = false;
      schedule();
    });
    hero.addEventListener('focusin', schedule);
    hero.addEventListener('focusout', () => queueMicrotask(schedule));
    document.addEventListener('visibilitychange', schedule);
    reduced.addEventListener('change', schedule);
    schedule();
  }

  function warmHiddenImages(section) {
    qa('[hidden] img[loading="lazy"]', section).forEach(image => {
      // Hidden lazy images have no layout box to trigger the request.
      image.loading = 'eager';
      image.decode?.().catch(() => {});
    });
  }

  qa('[data-bz-warm-images]').forEach(section => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      warmHiddenImages(section);
      observer.disconnect();
    }, { rootMargin: '600px' });
    observer.observe(section);
  });

  function ritualSelection(panel) {
    const inputs = qa('input[data-variant]', panel);
    const checked = inputs.filter(input => input.checked);
    const bundle = panel.dataset.bundleVariant && checked.length > 0 && checked.length === inputs.length;
    const sum = bundle ? Number(panel.dataset.bundlePrice) : checked.reduce((total, input) => total + Number(input.dataset.price), 0);
    return { checked, bundle, sum };
  }

  function paintRitual(panel) {
    const { checked, bundle, sum } = ritualSelection(panel);
    const count = checked.length;
    q('.ritual-count', panel).textContent = count + (count === 1 ? ' pezzo scelto' : ' pezzi scelti');
    q('.ritual-sum', panel).textContent = euro(sum);
    qa('.ritual-compare, .ritual-saving', panel).forEach(node => { node.hidden = !bundle; });
    q('[data-bz-add-set]', panel).disabled = count === 0 || panel.hasAttribute('aria-busy');
  }

  document.addEventListener('change', event => {
    if (!event.target.matches('.ritual-row input[data-variant]')) return;
    const panel = event.target.closest('[data-ritual-set]');
    panel.closest('[data-bz-ritual]').setAttribute('data-ritual-interacted', '');
    paintRitual(panel);
  });

  document.addEventListener('click', async event => {
    const target = event.target.closest('[data-set], [data-bz-add-set]');
    const ritual = target?.closest('[data-bz-ritual]');
    if (!ritual) return;
    if (target.hasAttribute('data-set')) {
      qa('[data-ritual-set]', ritual).forEach(panel => { panel.hidden = panel.id !== target.dataset.set; });
      qa('[data-set]', ritual).forEach(pill => pill.setAttribute('aria-pressed', String(pill === target)));
      qa('[data-ritual-background]', ritual).forEach(layer => {
        layer.classList.toggle('on', layer.dataset.ritualBackground === target.dataset.set);
      });
      return;
    }

    const panel = q('[data-ritual-set]:not([hidden])', ritual);
    ritual.setAttribute('data-ritual-interacted', '');

    const { checked, bundle } = ritualSelection(panel);
    if (!checked.length || panel.hasAttribute('aria-busy')) return;
    const items = bundle ? [{ id: Number(panel.dataset.bundleVariant), quantity: 1 }] :
      checked.map(input => ({ id: Number(input.dataset.variant), quantity: 1 }));
    panel.setAttribute('aria-busy', 'true');
    const status = q('[data-ritual-status]', panel);
    status.textContent = '';
    try {
      if (!await addItems(items)) status.textContent = 'Non è stato possibile aggiungere i pezzi al carrello.';
    } catch {
      status.textContent = 'Non è stato possibile aggiornare il carrello.';
    } finally {
      panel.removeAttribute('aria-busy');
      paintRitual(panel);
    }
  });

  const stoneGrid = q('#gem-grid');
  if (stoneGrid) {
    let intent = 'all';
    qa('[data-stone-filter]').forEach(button => button.addEventListener('click', () => {
      qa('[data-stone-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      intent = button.dataset.stoneFilter;
      qa('.gem', stoneGrid).forEach(card => { card.hidden = intent !== 'all' && card.dataset.intent !== intent; });
      syncStones();
    }));
    let openCard = null;
    const setOpen = (card, open) => {
      const button = q('.stone__toggle', card);
      const front = q('.gem-front', card);
      const back = q('.gem-back', card);
      card.classList.toggle('flipped', open);
      button?.setAttribute('aria-expanded', String(open));
      const label = q('.stone__label', button);
      if (label) label.textContent = open ? 'Foto' : 'Significato';
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
      const showToggle = mobileStones.matches && intent === 'all';
      const collapsed = showToggle && more.dataset.expanded !== 'true';
      stoneGrid.classList.toggle('is-collapsed', collapsed);
      more.hidden = !showToggle;
      more.setAttribute('aria-expanded', String(!collapsed));
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
    if (items.length) submitItems(panel, button, items);
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
    const products = q('#circle-products');
    const names = ['Vata', 'Pitta', 'Kapha'];
    const centers = [[.5, .33], [.33, .62], [.67, .62]];
    const selectCircle = index => {
      circles.forEach((button, i) => button.setAttribute('aria-pressed', String(i === index)));
      const panel = q('#circle-panel');
      const source = q('#dosha-content-' + index);
      if (panel && source) {
        const content = source.content.cloneNode(true);
        const selection = q('.dosha-selection', content);
        if (products && selection) products.replaceChildren(selection);
        panel.replaceChildren(content);
        if (!reduced.matches) panel.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250, easing: 'cubic-bezier(.2,.7,.1,1)' });
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
    event.preventDefault();
    if (!link.href || link.getAttribute('aria-busy') === 'true') return;
    link.setAttribute('aria-busy', 'true');
    try {
      const response = await fetch(link.href);
      if (!response.ok) throw new Error('Caricamento');
      const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
      if (!q('[data-grid]', doc)) throw new Error('Griglia mancante');
      link.textContent = 'Carica altri';
      const grid = q('[data-grid]');
      const firstSoldOut = grid?.hasAttribute('data-stock-first') ? q('[data-sold-out]', grid) : null;
      doc.querySelectorAll('[data-grid] .product').forEach(card => {
        grid?.insertBefore(card, card.hasAttribute('data-sold-out') ? null : firstSoldOut);
      });
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
    } catch {
      link.textContent = 'Riprova';
    } finally {
      link.removeAttribute('aria-busy');
    }
  }));

  qa('[data-sort]').forEach(select => select.addEventListener('change', () => select.form?.requestSubmit()));

  let pendingLines = 0;
  let cartChanged = false;
  let cartFailed = false;
  document.addEventListener('click', event => {
    const button = event.target.closest('.cart-page [data-delta], .cart-page .remove-item');
    if (!button) return;
    const item = button.closest('.cart-item');
    const status = q('[data-cart-error]');
    if (pendingLines === 0) {
      status.hidden = true;
      cartFailed = false;
    }
    pendingLines++;
    queueCart(async () => {
      const current = Number(item.dataset.quantity);
      if (!current) return;
      const quantity = button.matches('.remove-item') ? 0 : Math.max(0, current + Number(button.dataset.delta));
      const response = await fetch(routes.change, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ id: item.dataset.key, quantity })
      });
      if (!response.ok) throw new Error('Modifica rifiutata');
      const cart = await response.json();
      const line = cart.items.find(entry => entry.key === item.dataset.key);
      item.dataset.quantity = line?.quantity || 0;
      if (line) {
        q('output', item).textContent = line.quantity;
        q('[data-delta="-1"]', item).disabled = line.quantity <= 1;
        q('.item-total', item).textContent = euro(line.final_line_price);
      } else {
        item.remove();
      }
      q('#cart-total').textContent = euro(cart.total_price);
      paintShipping(q('.cart-page [data-shipping]'), cart.total_price);
      cartChanged = true;
    }).catch(() => {
      cartFailed = true;
      status.textContent = 'Impossibile aggiornare la quantità. Riprova.';
      status.hidden = false;
    }).finally(() => {
      pendingLines--;
      if (pendingLines || !cartChanged) return;
      cartChanged = false;
      if (cartFailed) refreshCart().catch(() => {});
      else location.reload();
    });
  });

  const footerMedia = matchMedia('(max-width:600px)');
  const adjustFooter = () => qa('footer details').forEach(details => { if (footerMedia.matches) details.open = false; else details.open = true; });
  adjustFooter();
  footerMedia.addEventListener?.('change', adjustFooter);
  function selectPickedTab(tab) {
    const root = tab.closest('.picked');
    qa('[data-picked]', root).forEach(other => {
      other.setAttribute('aria-selected', String(other === tab));
      other.tabIndex = other === tab ? 0 : -1;
    });
    qa('[data-picked-panel]', root).forEach(panel => { panel.hidden = panel.id !== tab.getAttribute('aria-controls'); });
  }

  document.addEventListener('click', event => {
    const tab = event.target.closest('button[data-picked]');
    if (tab) selectPickedTab(tab);
  });

  document.addEventListener('keydown', event => {
    const tab = event.target.closest('button[data-picked]');
    if (!tab) return;
    const tabs = qa('[data-picked]', tab.closest('[role="tablist"]'));
    const index = tabs.indexOf(tab);
    let next;
    switch (event.key) {
      case 'ArrowLeft': next = (index - 1 + tabs.length) % tabs.length; break;
      case 'ArrowRight': next = (index + 1) % tabs.length; break;
      case 'Home': next = 0; break;
      case 'End': next = tabs.length - 1; break;
      default: return;
    }
    event.preventDefault();
    selectPickedTab(tabs[next]);
    tabs[next].focus();
  });
  qa('.shopify-policy__body table').forEach(table => {
    table.classList.add('bz-policy-table');
    table.setAttribute('role', 'table');
    qa('thead, tbody, tfoot', table).forEach(group => group.setAttribute('role', 'rowgroup'));
    [...table.rows].forEach(row => {
      row.setAttribute('role', 'row');
      [...row.cells].forEach(cell => {
        const role = cell.tagName === 'TD' ? 'cell' : cell.scope === 'row' || cell.scope === 'rowgroup' ? 'rowheader' : 'columnheader';
        cell.setAttribute('role', role);
      });
    });
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

  const chrome = q('.bz-chrome');
  const setSticky = () => {
    if (!chrome) return;
    document.documentElement.style.setProperty('--bz-sticky-h', Math.ceil(chrome.getBoundingClientRect().height) + 'px');
  };
  setSticky();
  addEventListener('resize', setSticky);
  if (chrome && 'ResizeObserver' in window) new ResizeObserver(setSticky).observe(chrome);

  if (!reduced.matches && 'IntersectionObserver' in window) {
    const reveal = [];
    qa('main h2').forEach(title => {
      if (title.closest('.home-hero, .hero, .cura-hero, .bz-phero')) return;
      if (title.getBoundingClientRect().top < innerHeight * 0.85) return;
      const block = [title];
      const parent = title.parentElement;
      if (parent) {
        const lead = q(':scope > .bz-sh-sub, :scope > .dosha-intro, :scope > .ay-prod-intro', parent) || q(':scope > .world-aside > .world-intro', parent);
        if (lead) block.push(lead);
      }
      block.forEach(el => el.classList.add('bz-ds-reveal'));
      reveal.push(...block);
    });
    if (reveal.length) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      reveal.forEach(el => io.observe(el));
    }
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
