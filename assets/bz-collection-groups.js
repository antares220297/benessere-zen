(() => {
  function init(scope) {
    scope.querySelectorAll('[data-bz-grouped-plp]').forEach(root => {
      if (root.dataset.initialized) return;
      root.dataset.initialized = 'true';
      const bar = root.querySelector('[data-plp-bar]');
      const scroll = bar.querySelector('.chips-scroll');
      const tools = root.querySelector('.plp-tools');
      const sort = root.querySelector('[data-plp-sort]');
      const select = sort.querySelector('select');
      const buttons = [...bar.querySelectorAll('[data-bz-chip]')];
      const groups = [...root.querySelectorAll('[data-bz-group]')];
      const grids = groups.map(group => {
        const grid = group.querySelector('.pgrid');
        return { grid, cards: [...grid.children] };
      });
      const mobileTools = document.createComment('collection tools');
      tools.before(mobileTools);
      const desktop = matchMedia('(min-width: 1024px)');
      const collator = new Intl.Collator('it');
      const sorting = {
        new: (a, b) => Number(b.dataset.published) - Number(a.dataset.published),
        'price-up': (a, b) => Number(a.dataset.price) - Number(b.dataset.price),
        'price-down': (a, b) => Number(b.dataset.price) - Number(a.dataset.price),
        name: (a, b) => collator.compare(a.querySelector('h3').textContent, b.querySelector('h3').textContent)
      };

      function paintOverflow() {
        bar.classList.toggle('has-more', scroll.scrollLeft + scroll.clientWidth < scroll.scrollWidth - 3);
      }

      function layout() {
        if (desktop.matches && tools.parentNode !== bar) bar.append(tools);
        if (!desktop.matches && tools.previousSibling !== mobileTools) mobileTools.after(tools);
        root.style.setProperty('--plp-bar-height', bar.offsetHeight + 'px');
        paintOverflow();
      }

      function filter(button, jump) {
        buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
        const selected = button.dataset.bzChip;
        groups.forEach(group => { group.hidden = selected !== 'all' && group.dataset.bzGroup !== selected; });
        root.querySelector('[data-plp-total]').textContent = button.dataset.count;
        root.querySelector('[data-plp-unit]').textContent = button.dataset.count === '1' ? 'prodotto' : 'prodotti';
        const first = groups.find(group => !group.hidden);
        if (jump && first && bar.getBoundingClientRect().top <= 1) {
          first.scrollIntoView({ block: 'start', behavior: 'instant' });
        }
      }

      buttons.forEach(button => button.addEventListener('click', () => filter(button, true)));
      select.addEventListener('change', () => {
        const compare = sorting[select.value];
        grids.forEach(({ grid, cards }) => grid.append(...(compare ? [...cards].sort(compare) : cards)));
      });
      scroll.addEventListener('scroll', paintOverflow, { passive: true });
      const resize = new ResizeObserver(layout);
      resize.observe(bar);
      root.addEventListener('bz:unload', () => resize.disconnect(), { once: true });
      bar.hidden = false;
      sort.hidden = false;
      layout();
    });
  }

  if (window.bzCollectionGroups) return;
  window.bzCollectionGroups = true;
  document.addEventListener('shopify:section:load', event => init(event.target));
  document.addEventListener('shopify:section:unload', event => {
    event.target.querySelector('[data-bz-grouped-plp]')?.dispatchEvent(new Event('bz:unload'));
  });
  init(document);
})();
