(() => {
  function init(scope) {
    scope.querySelectorAll('[data-bz-grouped-plp]').forEach(root => {
      if (root.dataset.initialized) return;
      const dialog = root.querySelector('dialog.filters');
      const options = dialog?.querySelector('[data-group-chips]');
      if (!options) return;
      const filterLabel = root.querySelector('[data-filters-label]');
      const buttons = options.querySelectorAll('[data-bz-chip]');
      const groups = root.querySelectorAll('[data-bz-group]');
      const total = root.querySelector('[data-total]');

      options.addEventListener('click', event => {
        const button = event.target.closest('[data-bz-chip]');
        if (!button) return;
        const selected = button.dataset.bzChip;
        buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
        groups.forEach(group => {
          group.hidden = selected !== 'all' && group.dataset.bzGroup !== selected;
        });
        if (total) total.textContent = button.dataset.count;
        if (filterLabel) filterLabel.textContent = selected === 'all' ? 'Filtri' : 'Filtri · 1';
        dialog.close();
      });

      root.dataset.initialized = 'true';
    });
  }

  if (window.bzCollectionGroups) return;
  window.bzCollectionGroups = true;
  document.addEventListener('shopify:section:load', event => init(event.target));
  init(document);
})();
