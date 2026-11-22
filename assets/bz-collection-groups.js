(() => {
  function init(scope) {
    scope.querySelectorAll('[data-bz-grouped-plp]').forEach(root => {
      if (root.dataset.initialized) return;
      const dialog = root.querySelector('dialog.filters');
      const options = dialog?.querySelector('[data-group-chips]');
      if (!options) return;
      const filterLabel = root.querySelector('[data-filters-label]');
      const buttons = [...options.querySelectorAll('[data-bz-chip]')];
      const allButton = buttons.find(button => button.dataset.bzChip === 'all');
      const groups = root.querySelectorAll('[data-bz-group]');
      const total = root.querySelector('[data-total]');
      const typeInput = dialog.closest('form')?.querySelector('input[name="tipo"]');
      const storageKey = `bz-collection-tipo:${window.location.pathname}`;

      function applySelection(button) {
        const selected = button.dataset.bzChip;
        buttons.forEach(other => other.setAttribute('aria-pressed', String(other === button)));
        groups.forEach(group => {
          group.hidden = selected !== 'all' && group.dataset.bzGroup !== selected;
        });
        if (total) total.textContent = button.dataset.count;
        if (filterLabel) filterLabel.textContent = selected === 'all' ? 'Filtri' : 'Filtri · 1';
        if (typeInput) {
          typeInput.disabled = selected === 'all';
          typeInput.value = selected === 'all' ? '' : selected;
        }
      }

      let initialType = new URL(window.location.href).searchParams.get('tipo');
      if (initialType === null) {
        try {
          initialType = window.sessionStorage.getItem(storageKey);
        } catch {
          // Storage may be unavailable in restricted browsing contexts.
        }
      }
      applySelection(buttons.find(button => button.dataset.bzChip === initialType) || allButton);

      options.addEventListener('click', event => {
        const button = event.target.closest('[data-bz-chip]');
        if (!button) return;
        applySelection(button);
        const selected = button.dataset.bzChip;
        try {
          window.sessionStorage.setItem(storageKey, selected);
        } catch {
          // The URL and form still preserve the selection.
        }
        const url = new URL(window.location.href);
        if (selected === 'all') url.searchParams.delete('tipo');
        else url.searchParams.set('tipo', selected);
        window.history.replaceState(window.history.state, '', url);
        if (dialog.open) dialog.close();
      });

      root.dataset.initialized = 'true';
    });
  }

  if (window.bzCollectionGroups) return;
  window.bzCollectionGroups = true;
  document.addEventListener('shopify:section:load', event => init(event.target));
  init(document);
})();
