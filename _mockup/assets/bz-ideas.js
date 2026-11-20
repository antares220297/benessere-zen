/* Componenti condivisi: orari Europe/Rome, badge e grafico settimanale. */
(function () {
  'use strict';
  const H = {1:[[570,750],[960,1170]],2:[[570,750],[960,1170]],3:[[570,750],[960,1170]],4:[[540,780]],5:[[570,750],[960,1170]],6:[[570,750],[960,1170]],0:[]};
  const DAYS = ['domenica','lunedì','martedì','mercoledì','giovedì','venerdì','sabato'];
  const SHORT = ['Dom','Lun','Mar','Mer','Gio','Ven','Sab'];
  const SUMMARY = 'Lun, mar, mer, ven, sab: 9:30-12:30 e 16:00-19:30. Giovedì: 9:00-13:00.';
  const TBC = 'Domenica: dal 1° dicembre aperto, orari in arrivo.';
  const fmt = m => Math.floor(m / 60) + ':' + String(m % 60).padStart(2, '0');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const isStatic = new URLSearchParams(location.search).get('static') === '1';
  const badgeStates = new WeakMap();
  const chartDays = new WeakMap();
  const formatter = new Intl.DateTimeFormat('en-GB', {timeZone:'Europe/Rome',weekday:'short',hour:'2-digit',minute:'2-digit',hourCycle:'h23'});

  function romeNow() {
    const override = new URLSearchParams(location.search).get('now');
    // Un timestamp senza offset rappresenta l'orologio di Roma, anche in browser con altro fuso.
    if (override) {
      const local = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::\d{2}(?:\.\d+)?)?$/.exec(override);
      if (local) {
        const [, year, month, day, hour, minute] = local.map(Number);
        const date = new Date(Date.UTC(year, month - 1, day));
        if (date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day && hour < 24 && minute < 60) {
          return {day:date.getUTCDay(), min:hour * 60 + minute};
        }
      } else if (/(?:Z|[+-]\d{2}:?\d{2})$/i.test(override)) {
        const date = new Date(override);
        if (!Number.isNaN(date.getTime())) return parts(date);
      }
    }
    return parts(new Date());
  }

  function parts(date) {
    const values = formatter.formatToParts(date);
    const get = type => values.find(value => value.type === type).value;
    return {day:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(get('weekday')), min:(+get('hour') % 24) * 60 + +get('minute')};
  }

  function status(now = romeNow()) {
    const {day, min} = now;
    for (const [start, end] of H[day]) {
      if (min >= start && min < end) {
        const closing = end - min <= 30;
        const state = closing ? 'Chiude alle ' + fmt(end) : 'Aperto ora';
        const more = closing ? '' : ' · chiude alle ' + fmt(end);
        return {open:true, closing, state, more, text:state + more, key:(closing ? 'closing-' : 'open-') + end, day, min};
      }
    }
    let next = H[day].find(([start]) => min < start);
    let when = 'oggi';
    if (!next) {
      for (let offset = 1; offset <= 7; offset++) {
        const nextDay = (day + offset) % 7;
        if (H[nextDay].length) {
          next = H[nextDay][0];
          when = DAYS[nextDay];
          break;
        }
      }
    }
    const more = ' · riapre ' + when + ' alle ' + fmt(next[0]);
    return {open:false, closing:false, state:'Chiuso', more, text:'Chiuso' + more, key:'closed', day, min};
  }

  window.bzHours = H;
  window.bzOpenStatus = status;

  function paintBadges(now) {
    const s = status(now);
    document.querySelectorAll('[data-open-badge]').forEach(el => {
      el.classList.add('open-badge');
      const full = el.dataset.openBadge === 'full';
      const previous = badgeStates.get(el);
      const hours = H[s.day].map(([start, end]) => {
        const text = fmt(start) + '–' + fmt(end);
        return s.min >= start && s.min < end ? '<b>' + text + '</b>' : text;
      }).join(' · ') || 'chiuso';
      const html = '<span class="ob-dot" aria-hidden="true"></span><span class="ob-state">' + s.state + '</span>' +
        '<span class="ob-more' + (!s.open ? ' ob-next' : '') + '">' + String(s.more).replace(/^ /,'\u00a0') + '</span>' +
        (full ? '<span class="ob-sep" aria-hidden="true"></span><span class="ob-hours">Oggi ' + hours + '</span>' : '');
      // Conserva il punto: l'aggiornamento ogni minuto non riavvia la pulsazione.
      if (!previous || previous.html !== html) {
        if (!previous) el.innerHTML = html;
        else {
          const template = document.createElement('template');
          template.innerHTML = html;
          const dot = el.querySelector('.ob-dot');
          if (dot) template.content.replaceChild(dot, template.content.firstElementChild);
          el.replaceChildren(template.content);
        }
      }
      el.classList.toggle('closed', !s.open);
      el.classList.toggle('closing', s.closing);
      if (s.open && (!previous || previous.key !== s.key) && !reduced.matches && !isStatic) {
        const dot = el.querySelector('.ob-dot');
        dot.classList.remove('ob-pulse');
        // Il nuovo nodo riparte soltanto al cambio di stato.
        const fresh = dot.cloneNode(true);
        fresh.classList.add('ob-pulse');
        dot.replaceWith(fresh);
      }
      badgeStates.set(el, {key:s.key, html});
    });
  }

  const chartObserver = !isStatic && !reduced.matches && 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('bw-ready');
      entry.target.classList.remove('bw-pending');
      chartObserver.unobserve(entry.target);
    });
  }, {threshold:0.15}) : null;

  function buildChart(el, now) {
    const first = !chartDays.has(el);
    if (!first) el.classList.remove('bw-ready');
    const columns = [1,2,3,4,5,6,0].map((day, index) => {
      const today = day === now.day;
      const bars = H[day].map(([start, end], slot) => {
        const label = fmt(start) + '–' + fmt(end);
        return '<div class="bw-slot" tabindex="0" aria-label="' + DAYS[day] + ': ' + label + '" style="--bw-top:' + ((start - 540) / 660 * 100) + '%;--bw-size:' + ((end - start) / 660 * 100) + '%;--bw-delay:' + ((index * 2 + slot) * 40) + 'ms"><span class="bw-bar"></span><span class="bw-time">' + label + '</span></div>';
      }).join('');
      return '<div class="bw-day' + (today ? ' bw-today' : '') + '"><span class="bw-name">' + SHORT[day] + '</span><div class="bw-track">' + bars + (H[day].length ? '' : '<span class="bw-closed">chiuso</span>') + (today ? '<span class="bw-now" hidden><span></span></span>' : '') + '</div></div>';
    }).join('');
    el.classList.add('bz-week');
    el.innerHTML = '<p class="bw-heading">Questa settimana</p><div class="bw-plot" role="img" aria-label="Orari settimanali. ' + SUMMARY + ' ' + TBC + ' Oggi ' + DAYS[now.day] + '."><div class="bw-guides" aria-hidden="true">' + [540,780,1020,1200].map(m => '<span style="--bw-guide:' + ((m - 540) / 660 * 100) + '%"><i>' + fmt(m) + '</i></span>').join('') + '</div><div class="bw-days">' + columns + '</div></div><p class="bw-summary">' + SUMMARY + ' ' + TBC + '</p>';
    chartDays.set(el, now.day);
    // Le barre entrano una volta sola; un cambio di giorno non ripete l'effetto.
    if (first && chartObserver) {
      el.classList.add('bw-pending');
      chartObserver.observe(el);
    }
  }

  function paintCharts(now) {
    document.querySelectorAll('[data-week-chart]').forEach(el => {
      if (chartDays.get(el) !== now.day) buildChart(el, now);
      const line = el.querySelector('.bw-now');
      if (!line) return;
      line.hidden = now.min < 540 || now.min > 1200;
      line.style.top = ((now.min - 540) / 660 * 100) + '%';
      line.classList.toggle('bw-now-bottom', now.min >= 1110);
      line.firstElementChild.textContent = 'ora ' + fmt(now.min);
    });
  }

  function paint() {
    const now = romeNow();
    paintBadges(now);
    paintCharts(now);
  }
  function stopMotion() {
    if (!reduced.matches) return;
    document.querySelectorAll('.ob-pulse').forEach(dot => dot.classList.remove('ob-pulse'));
    document.querySelectorAll('.bw-pending, .bw-ready').forEach(el => {
      el.classList.remove('bw-pending', 'bw-ready');
      if (chartObserver) chartObserver.unobserve(el);
    });
  }
  if (reduced.addEventListener) reduced.addEventListener('change', stopMotion);
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', paint, {once:true}) : paint();
  setInterval(paint, 60000);
})();
