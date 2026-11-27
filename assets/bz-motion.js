(() => {
  const main = document.querySelector('#MainContent');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const special = '#cielo,[data-bz-tarocchi]';
  const heads = '.bz-sh>h2,.bz-related__head,.store-bleed-copy>h2,.bz-news__heading,' +
    '.categories>h2,.split-copy>:is(h1,h2),.cura-hero-copy,.cura-quote-text,' +
    '.ay-copy>:is(h1,h2),.ayt-head-row,#tre-energie>h2,#ay-prod-title,#ay-faq-title,' +
    '.shop-hero-copy,.shop-visit-col>h2,.shop-gallery-head>h2,' +
    '.bz-page-chi-siamo section>h2,.visit-copy>h2,.contact-hero,#form-title,.hours-top,' +
    '.plp-head-row,.plp-head>h1,.bz-buy h1';
  const cards = '.bz-product-tile,.compare-grid>*,.ritual-row,.category-row>a,.spheres>a,' +
    '.intention,.photo-card,.cura-quote,.cura-hours,.cura-routine-product,.ay-cat,' +
    '.shop-visit-col,.tour-card,.cards>.info-card,.contact-tile,.hours-card,.bz-dbento>article';
  const images = '.hero-photo,.split-photo img,.store-bleed-inner>img,.ritual-shot,' +
    '.bz-officina-scene,.cura-hero>img,.cura-quote-photo img,.ay-photo img,' +
    '.ayt-fig img,.shop-hero>img,.bz-stage img,:is(' + cards + ') img';
  const candidates = [special, heads, cards, images].join(',');
  const groups = new WeakMap();

  const observer = main && 'IntersectionObserver' in window && new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      groups.get(entry.target).forEach(item => item.classList.add('bz-motion-in'));
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  function prepare(element) {
    if (element.closest('#libro,section.lb') || groups.has(element) || !element.getClientRects().length) return;
    const section = element.matches(special);
    if (!section && element.closest(special)) return;

    let type = 'head';
    const group = [element];
    groups.set(element, group);
    if (element.getBoundingClientRect().top < innerHeight || element.matches(':target')) {
      element.classList.add('bz-motion-in');
      return;
    }
    if (section) {
      type = 'section';
    } else if (element.matches(cards)) {
      type = 'card';
      const siblings = [...element.parentElement.children].filter(el => el.matches(cards));
      element.style.setProperty('--bz-motion-step', Math.min(8, siblings.indexOf(element)));
    } else if (element.matches(images)) {
      type = 'image';
      if (/^(hidden|clip)$/.test(getComputedStyle(element.parentElement).overflowX)) type = 'zoom';
    } else if (element.matches('h1,h2')) {
      const kicker = element.previousElementSibling;
      const lead = element.nextElementSibling;
      if (kicker?.matches('.bz-kick,[class*=kicker],[class*=eyebrow]')) group.push(kicker);
      if (lead?.matches('p:not([role]), .cura-quote-copy')) group.push(lead);
    }

    for (const item of group) item.dataset.bzMotion = type;
    observer.observe(element);
  }

  function scan(root) {
    if (root.matches(candidates)) prepare(root);
    root.querySelectorAll(candidates).forEach(prepare);
  }

  document.documentElement.classList.add('bz-motion');
  if (observer && !reduced.matches) {
    scan(main);
    new MutationObserver(records => {
      for (const { target, addedNodes, type } of records) {
        if (type === 'attributes') scan(target);
        for (const node of addedNodes) if (node.nodeType === 1) scan(node);
      }
    }).observe(main, { subtree: true, childList: true, attributes: true, attributeFilter: ['hidden'] });
  }

  let pending = [];
  const timers = new WeakMap();
  function cartAdd(url, method) {
    try {
      const address = new URL(url, location.href);
      return method?.toUpperCase() === 'POST' && address.origin === location.origin &&
        /\/cart\/add(?:\.js)?\/?$/.test(address.pathname);
    } catch {
      return false;
    }
  }

  function remember(id, button) {
    if (!id || !button) return;
    const now = Date.now();
    pending = pending.filter(e => e.expires > now).slice(-15);
    pending.push({ id: String(id), button, expires: now + 10000 });
  }

  document.addEventListener('submit', event => {
    const form = event.target;
    const button = event.submitter;
    if (!cartAdd(button?.getAttribute('formaction') || form.action, button?.getAttribute('formmethod') || form.method)) return;
    remember(new FormData(form).get('id'), button);
  }, true);
  document.addEventListener('click', ({ target }) => {
    const button = target.closest('button[data-bz-add]:enabled');
    if (button) remember(button.dataset.bzAdd, button);
  }, true);

  function requestButton(data) {
    if (typeof data === 'string') {
      try { data = JSON.parse(data); }
      catch { data = new URLSearchParams(data); }
    }
    const id = String(data?.items?.[0]?.id || data?.id || data?.get?.('id'));
    const index = pending.findIndex(entry => entry.id === id && entry.expires > Date.now());
    if (index >= 0) return pending.splice(index, 1)[0].button;
  }

  const fetch = window.fetch;
  window.fetch = function (input, init) {
    const result = fetch.apply(this, arguments);
    if (!cartAdd(input?.url || input, init?.method ?? input?.method)) return result;
    const button = requestButton(init?.body);
    result.then(response => {
      if (response.ok) document.dispatchEvent(new CustomEvent('bz:cart:added', { detail: { button } }));
    }).catch(() => {});
    return result;
  };

  document.addEventListener('bz:cart:added', ({ detail }) => {
    const cart = document.querySelector('[data-bz-header-cart], #cart-icon');
    if (cart && !reduced.matches) {
      cart.classList.remove('bz-cart-pulse');
      void cart.offsetWidth;
      cart.classList.add('bz-cart-pulse');
    }
    const button = detail?.button;
    if (!button?.isConnected) return;
    clearTimeout(timers.get(button));
    button.classList.add('bz-add-confirmed');
    timers.set(button, setTimeout(() => button.classList.remove('bz-add-confirmed'), 1600));
  });
})();
