(function () {
  const variantSelector = '[data-bz-variant]:checked, input[type="hidden"][data-bz-variant]';
  const unavailable = 'Alcuni pezzi non sono disponibili nella quantità scelta. Controlla le quantità e riprova.';
  const addError = 'Non è stato possibile aggiungere al carrello. Riprova.';
  const discountRate = 0.10;

  function discountedTotal(full) {
    return Math.round(full * (1 - discountRate));
  }

  function init(root) {
    const form = root.querySelector('form.bb-buy');
    if (!form) return;

    const input = form.querySelector('[data-main-qty]');
    const row = form.querySelector('#bbRow');
    const ship = form.querySelector('[data-ship]');
    const status = form.querySelector('#bbStatus');
    const bottom = root.querySelector('#bbBottom');
    const bottomAction = bottom?.querySelector('.bb-bottom__action');
    const bottomState = bottom?.querySelector('[data-bottom-state]');
    const bottomPrefix = bottom?.querySelector('[data-bottom-prefix]');
    const bottomQuantity = bottom?.querySelector('[data-bottom-quantity]');
    const bottomFull = bottom?.querySelector('[data-bottom-full]');
    const bottomTotal = bottom?.querySelector('[data-bottom-total]');
    const bottomDiscount = bottom?.querySelector('[data-bottom-discount]');
    const buttons = [...root.querySelectorAll('[data-atc]')];
    const mainButton = form.querySelector('[data-atc]');
    const demoOffer = root.dataset.demoOffer === '1' &&
      new URLSearchParams(window.location.search).get('bz_demo_sconto') === '1';
    const errors = root.querySelectorAll('[data-bz-buy-status]');
    const thumbs = [...root.querySelectorAll('[data-bz-thumb]')];
    const stage = root.querySelector('#BzStage');
    const frame = root.querySelector('[data-bz-frame]');
    const galleryVariant = root.querySelector('[data-bz-gallery-variant]');
    const price = root.querySelector('[data-bz-price]');
    const productName = form.dataset.name;
    const threshold = Number(ship.dataset.threshold);
    const header = document.querySelector('.bz-chrome');
    let cartTotal = Number(root.dataset.bzCartTotal);
    let state = '';
    let cartOpener;

    function money(cents) {
      return window.bzMoney(cents);
    }

    function mainQuantity() {
      return Math.max(1, Math.min(99, Math.floor(input.valueAsNumber || 1)));
    }

    function announce(message) {
      status.textContent = message;
    }

    function showError(message) {
      errors.forEach(error => {
        error.textContent = message;
        error.hidden = !message;
      });
      announce(message);
    }

    function observeBottom() {
      if (!bottom || !row) return;

      const footer = document.querySelector('.bz-foot');
      const cart = document.querySelector('.cart-overlay');
      const menu = document.querySelector('.bz-header-section');
      const desktopMenu = menu?.querySelector('.main-nav');
      const viewport = window.visualViewport;
      let shown = false;
      let cartWasOpen = cart && !cart.hidden;

      function updateVisibility() {
        const height = document.documentElement.clientHeight;
        const active = document.activeElement;
        const fieldFocused = active?.matches('input, textarea, select') && !bottom.contains(active);
        const viewportReduced = viewport && height - viewport.height * viewport.scale > 100;
        const menuOpen = menu?.classList.contains('is-menu-open') ||
          desktopMenu?.querySelector('.bz-menu-group[open]');
        const cartOpen = cart && !cart.hidden;
        const rowAbove = row.getBoundingClientRect().bottom <= 0;
        const footerReached = footer && footer.getBoundingClientRect().top <= height;
        const show = rowAbove && !footerReached && !cartOpen && !menuOpen && !fieldFocused && !viewportReduced;
        if (show === shown) return;
        shown = show;
        bottom.classList.toggle('is-on', show);
        bottom.setAttribute('aria-hidden', String(!show));
        bottom.toggleAttribute('inert', !show);
      }

      const intersections = new IntersectionObserver(updateVisibility);
      intersections.observe(row);
      if (footer) intersections.observe(footer);

      const overlays = new MutationObserver(updateVisibility);
      if (cart) {
        const cartVisibility = new MutationObserver(() => {
          updateVisibility();
          if (cartWasOpen && cart.hidden && cartOpener) {
            const target = bottom.contains(cartOpener) && !shown ? mainButton : cartOpener;
            cartOpener = null;
            target?.focus({ preventScroll: true });
          }
          cartWasOpen = !cart.hidden;
        });
        cartVisibility.observe(cart, { attributeFilter: ['hidden'] });
      }
      if (menu) overlays.observe(menu, { attributeFilter: ['class'] });
      if (desktopMenu) overlays.observe(desktopMenu, { subtree: true, attributeFilter: ['open'] });

      document.addEventListener('focusin', updateVisibility);
      document.addEventListener('focusout', () => requestAnimationFrame(updateVisibility));
      viewport?.addEventListener('resize', updateVisibility);
      window.addEventListener('resize', updateVisibility);
      updateVisibility();
    }

    function resolveCareLinks() {
      const references = root.querySelectorAll('span[data-bz-care-handle][data-bz-care-url]');
      if (!references.length) return;

      function linkReferences() {
        clearTimeout(timeout);
        root.removeEventListener('bz:ritual-loaded', linkReferences);
        const handles = new Set([...root.querySelectorAll('[data-bz-pair-handle]')]
          .map(pair => pair.dataset.bzPairHandle));
        references.forEach(reference => {
          if (handles.has(reference.dataset.bzCareHandle)) return;
          const link = document.createElement('a');
          link.setAttribute('href', reference.dataset.bzCareUrl);
          link.textContent = reference.textContent;
          reference.replaceWith(link);
        });
      }

      const timeout = setTimeout(linkReferences, 5000);
      root.addEventListener('bz:ritual-loaded', linkReferences);
      if (!root.querySelector('[data-bz-upsell-url]')) linkReferences();
    }

    function render() {
      const variant = root.querySelector(variantSelector);
      const available = variant?.dataset.available === 'true';
      const quantity = mainQuantity();
      const unit = Number(variant?.dataset.bzVariant ?? form.dataset.unit);
      const ritual = root.querySelector('.bb-rit');
      const offerEnabled = ritual?.dataset.offer === 'on';
      if (ritual) ritual.hidden = !available;

      const pairs = [...(ritual?.querySelectorAll('[data-pair]') ?? [])];
      const items = [{ id: Number(variant?.value), quantity }];
      const missing = [];
      let pieces = quantity;
      let full = unit * quantity;
      let setFull = full;
      pairs.forEach(pair => {
        const pairAvailable = pair.dataset.available === 'true';
        const count = pairAvailable ? Number(pair.dataset.q) : 0;
        const cents = Number(pair.dataset.cents);
        pair.querySelector('[data-pair-qty]').textContent = count;
        pair.querySelector('[data-pstep="-1"]').setAttribute('aria-disabled', String(count === 0));
        const plus = pair.querySelector('[data-pstep="1"]');
        plus.disabled = !pairAvailable;
        plus.setAttribute('aria-disabled', String(!pairAvailable || count === 99));
        if (!available) return;

        setFull += Math.max(1, count) * cents;
        if (!count) {
          missing.push(pair.dataset.name);
          return;
        }
        items.push({ id: Number(pair.dataset.variant), quantity: count });
        full += count * cents;
        pieces += count;
      });

      const complete = items.length === 3 && new Set(items.map(item => item.id)).size === 3;
      const discounted = complete && offerEnabled;
      const total = discounted ? discountedTotal(full) : full;
      const previewSet = demoOffer && available && pairs.length === 2 &&
        pairs.every(pair => pair.dataset.available === 'true') &&
        new Set([variant.value, ...pairs.map(pair => pair.dataset.variant)]).size === 3;
      const displayDiscounted = discounted || previewSet;
      const displayFull = previewSet ? setFull : full;
      const displayTotal = previewSet ? discountedTotal(displayFull) : total;
      const displayPieces = previewSet ? pieces + missing.length : pieces;
      root.querySelectorAll('[data-step]').forEach(step => {
        const limitReached = step.dataset.step === '-1' ? quantity === 1 : quantity === 99;
        step.setAttribute('aria-disabled', String(limitReached));
      });
      price.textContent = money(unit);

      const label = !available ? 'Esaurito' : state === 'done' ? 'Aggiunto' :
        pieces > quantity ? 'Aggiungi · ' + money(total) : 'Aggiungi al carrello';
      const ariaLabel = state === 'done' || !available ? label :
        'Aggiungi ' + pieces + (pieces === 1 ? ' pezzo' : ' pezzi') + ' di ' + productName +
        ' al carrello, totale ' + money(total) + (discounted ? ', sconto del 10% incluso' : '');
      form.querySelector('[data-atc-label]').textContent = label;
      if (bottom) {
        const paired = displayPieces - quantity;
        const stateLabel = state === 'done' || !available ? label : '';
        const totalLabel = money(displayTotal);
        bottomAction.hidden = Boolean(stateLabel);
        bottomState.hidden = !stateLabel;
        bottomState.textContent = stateLabel;
        bottomPrefix.hidden = paired > 0;
        bottomQuantity.textContent = quantity + ' pz' + (paired ? ' · +' + paired + ' dal rituale' : '');
        bottomFull.hidden = !displayDiscounted;
        bottomFull.textContent = displayDiscounted ? money(displayFull) : '';
        bottomDiscount.hidden = !displayDiscounted;
        if (bottomTotal.textContent !== totalLabel) bottomTotal.textContent = totalLabel;
      }
      buttons.forEach(button => {
        // The confirmation state stays focusable for the drawer's return focus.
        button.disabled = !available || state === 'loading';
        button.classList.toggle('bb-btn--primary', available);
        button.classList.toggle('bb-btn--secondary', !available);
        button.classList.toggle('is-loading', available && state === 'loading');
        button.classList.toggle('is-done', available && state === 'done');
        if (state === 'loading') button.setAttribute('aria-busy', 'true');
        else button.removeAttribute('aria-busy');
        if (available) button.removeAttribute('aria-disabled');
        else button.setAttribute('aria-disabled', 'true');
        button.setAttribute('aria-label', ariaLabel);
      });

      const offer = ritual?.querySelector('.bb-set');
      if (offer) offer.hidden = !offerEnabled && !previewSet;
      if (offer && !offer.hidden) {
        const setDiscounted = discountedTotal(setFull);
        offer.querySelector('[data-set-full]').textContent = money(displayDiscounted ? displayFull : setFull);
        offer.querySelector('[data-set-disc]').textContent = money(displayDiscounted ? displayTotal : setDiscounted);
        offer.querySelector('[data-set-save]').textContent = 'Risparmi ' + money(displayDiscounted ? displayFull - displayTotal : setFull - setDiscounted);
        offer.querySelector('[data-set-hint]').textContent = displayDiscounted ? 'Su tutti i ' + displayPieces + ' pezzi dei tre prodotti' :
          missing.length === 1 ? 'Manca solo ' + missing[0] + ' per lo sconto' :
            'Con ' + productName + ' e i due abbinati, almeno un pezzo ciascuno';
        const chooseAll = offer.querySelector('[data-set-all]');
        chooseAll.hidden = displayDiscounted;
        chooseAll.disabled = pairs.some(pair => pair.dataset.available !== 'true');
        chooseAll.setAttribute('aria-disabled', String(chooseAll.disabled));
        offer.querySelector('[data-set-ok]').hidden = !displayDiscounted;
      }

      const projected = cartTotal + total;
      const left = threshold - projected;
      ship.classList.toggle('is-free', left <= 0);
      ship.querySelector('[data-ship-text]').innerHTML = left > 0 ?
        'Ti mancano <b>' + money(left) + '</b> per la spedizione gratuita' : 'Spedizione gratuita inclusa';
      ship.querySelector('[data-ship-bar]').style.transform =
        'scaleX(' + Math.min(1, Math.max(0.02, projected / threshold)).toFixed(3) + ')';
      return { available, items, complete, discounted };
    }

    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(button => {
          button.classList.toggle('is-on', button === thumb);
          button.setAttribute('aria-pressed', String(button === thumb));
        });
        if (stage && thumb.dataset.full) {
          stage.removeAttribute('srcset');
          stage.removeAttribute('sizes');
          stage.src = thumb.dataset.full;
          stage.alt = thumb.getAttribute('aria-label') || '';
        }
        if (frame) frame.textContent = thumb.dataset.bzThumb + ' / ' + thumbs.length;
      });
    });

    root.addEventListener('click', event => {
      const control = event.target.closest('[data-step], [data-pstep], [data-set-all]');
      if (!control || control.getAttribute('aria-disabled') === 'true') return;
      if (control.hasAttribute('data-step')) {
        input.value = mainQuantity() + Number(control.dataset.step);
        render();
      } else if (control.hasAttribute('data-pstep')) {
        const pair = control.closest('[data-pair]');
        pair.dataset.q = Number(pair.dataset.q) + Number(control.dataset.pstep);
        if (render().discounted) announce('Sconto del 10% applicato a tutti e tre');
      } else {
        const ritual = control.closest('.bb-rit');
        ritual.querySelectorAll('[data-pair]').forEach(pair => {
          pair.dataset.q = Math.max(1, Number(pair.dataset.q));
        });
        render();
        const confirmation = ritual.querySelector('[data-set-ok]');
        confirmation.classList.remove('bb-in');
        void confirmation.offsetWidth;
        confirmation.classList.add('bb-in');
        announce('Tutti e tre scelti: sconto del 10% applicato');
      }
    });

    input.addEventListener('input', render);
    input.addEventListener('change', () => {
      input.value = mainQuantity();
      render();
    });
    root.addEventListener('change', event => {
      const radio = event.target;
      if (!radio.matches('input[type="radio"][data-bz-variant]')) return;
      const imageId = radio.dataset.imageId || root.dataset.featuredImageId;
      thumbs.find(thumb => thumb.dataset.imageId === imageId)?.click();
      if (galleryVariant) galleryVariant.textContent = radio.dataset.variantTitle;
      showError('');
      render();
    });
    document.addEventListener('bz:cart-updated', event => {
      cartTotal = Number(event.detail.totalPrice);
      render();
    });
    root.addEventListener('bz:ritual-loaded', render);

    form.addEventListener('submit', async event => {
      event.preventDefault();
      if (state) return;
      const { available, items, complete } = render();
      if (!available) return;
      if (complete) {
        const ids = items.map(item => item.id).sort((a, b) => a - b);
        const properties = { _bz_rituale: 'r-' + ids.join('-'), _bz_rituale_n: '3' };
        items.forEach(item => { item.properties = properties; });
      }

      showError('');
      cartOpener = buttons.includes(event.submitter) ? event.submitter : mainButton;
      state = 'loading';
      render();
      try {
        const result = await window.bzAddItems(items);
        if (!result || result.status || result.description || result.message) throw result;
        state = 'done';
        render();
        announce('Aggiunto al carrello');
        setTimeout(() => {
          state = '';
          render();
        }, 2000);
      } catch (error) {
        cartOpener = null;
        const availabilityError = /quantity|available|stock|sold out/i;
        const isUnavailable = Number(error?.status) === 422 ||
          availabilityError.test(error?.description) || availabilityError.test(error?.message);
        state = '';
        showError(isUnavailable ? unavailable : addError);
        render();
      }
    }, true);

    if (header) {
      const updateHeaderHeight = () => {
        root.style.setProperty('--bb-top', Math.round(header.getBoundingClientRect().height) + 'px');
      };
      updateHeaderHeight();
      if ('ResizeObserver' in window) new ResizeObserver(updateHeaderHeight).observe(header);
      else window.addEventListener('resize', updateHeaderHeight);
    }
    observeBottom();
    resolveCareLinks();
    render();
  }

  document.querySelectorAll('[data-bz-product]').forEach(init);
})();
