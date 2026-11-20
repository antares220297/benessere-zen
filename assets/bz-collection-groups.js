(() => {
  function init(scope) {
    scope.querySelectorAll('[data-bz-grouped-plp]').forEach(root => {
      if (root.dataset.initialized) return;
      const chips = root.querySelector('[data-group-chips]');
      const buttons = chips.querySelectorAll('[data-bz-chip]');
      const groups = root.querySelectorAll('[data-bz-group]');
      const total = root.querySelector('[data-total]');

      chips.addEventListener('click', event => {
        const button = event.target.closest('[data-bz-chip]');
        if (!button) return;
        const selected = button.dataset.bzChip;
        buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
        groups.forEach(group => {
          group.hidden = selected !== 'all' && group.dataset.bzGroup !== selected;
        });
        total.textContent = button.dataset.count;
      });

      root.dataset.initialized = 'true';
      chips.hidden = false;
    });
  }

  if (window.bzCollectionGroups) return;
  window.bzCollectionGroups = true;
  document.addEventListener('shopify:section:load', event => init(event.target));
  init(document);
})();
