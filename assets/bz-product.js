(function () {
  const variantSelector = '[data-bz-variant]:checked, input[type="hidden"][data-bz-variant]';
  const unavailable = 'Alcuni pezzi non sono disponibili nella quantità scelta. Controlla le quantità e riprova.';
  const addError = 'Non è stato possibile aggiungere al carrello. Riprova.';

  function init(root) {
    const form = root.querySelector('form.bb-buy');
    if (!form) return;

    const input = form.querySelector('[data-main-qty]');
    const row = form.querySelector('#bbRow');
    const ship = form.querySelector('[data-ship]');
    const status = form.querySelector('#bbStatus');
    const sticky = root.querySelector('#bbSticky');
    const stickyLabel = sticky.querySelector('.bb-btn__lb');
    const stickyDefaultLabel = stickyLabel.innerHTML;
    const buttons = [...root.querySelectorAll('[data-atc]')];
    const mirror = sticky.querySelector('[data-main-qty-mirror]');
    const stickyTotal = sticky.querySelector('[data-sticky-total]');
    const errors = root.querySelectorAll('[data-bz-buy-status]');
    const thumbs = [...root.querySelectorAll('[data-bz-thumb]')];
    const stage = root.querySelector('#BzStage');
    const frame = root.querySelector('[data-bz-frame]');
    const galleryVariant = root.querySelector('[data-bz-gallery-variant]');
    const price = root.querySelector('[data-bz-price]');
    const productName = form.dataset.name;
    const threshold = Number(ship.dataset.threshold);
    const header = document.querySelector('.bz-chrome');
    const footer = document.querySelector('.bz-foot');
    let cartTotal = Number(root.dataset.bzCartTotal);
    let state = '';
    let stickyShown = false;

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

    function updateSticky() {
      const top = Math.round(header?.getBoundingClientRect().bottom ?? 0);
      document.documentElement.style.setProperty('--bb-top', top + 'px');
      const ritual = root.querySelector('.bb-rit:not([hidden])');
      const cutoff = ritual?.getBoundingClientRect().bottom ??
        footer?.getBoundingClientRect().top ?? Infinity;
      const show = row.getBoundingClientRect().bottom < top && cutoff > top + 65;
      if (show === stickyShown) return;
      stickyShown = show;
      sticky.classList.toggle('is-on', show);
      sticky.setAttribute('aria-hidden', String(!show));
      sticky.toggleAttribute('inert', !show);
    }

    function render() {
      const variant = root.querySelector(variantSelector);
      const available = variant?.dataset.available === 'true';
      const quantity = mainQuantity();
      const unit = Number(variant?.dataset.bzVariant ?? form.dataset.unit);
      const ritual = root.querySelector('.bb-rit');
      const discount = ritual?.dataset.offer === 'on' ? 0.10 : 0;
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
      const discounted = complete && discount > 0;
      const total = discounted ? Math.round(full * (1 - discount)) : full;
      root.querySelectorAll('[data-step]').forEach(step => {
        const limitReached = step.dataset.step === '-1' ? quantity === 1 : quantity === 99;
        step.setAttribute('aria-disabled', String(limitReached));
      });
      mirror.textContent = quantity;
      price.textContent = money(unit);

      const label = state === 'done' ? 'Aggiunto' : !available ? 'Esaurito' :
        pieces > quantity ? 'Aggiungi · ' + money(total) : 'Aggiungi al carrello';
      const ariaLabel = state === 'done' || !available ? label :
        'Aggiungi ' + pieces + (pieces === 1 ? ' pezzo' : ' pezzi') + ' di ' + productName +
        ' al carrello, totale ' + money(total) + (discounted ? ', sconto del 10% incluso' : '');
      form.querySelector('[data-atc-label]').textContent = label;
      if (state === 'done' || !available) {
        stickyLabel.textContent = label;
      } else if (stickyLabel.innerHTML !== stickyDefaultLabel) {
        stickyLabel.innerHTML = stickyDefaultLabel;
      }
      buttons.forEach(button => {
        button.disabled = !available || Boolean(state);
        button.classList.toggle('is-loading', state === 'loading');
        button.classList.toggle('is-done', state === 'done');
        if (state === 'loading') button.setAttribute('aria-busy', 'true');
        else button.removeAttribute('aria-busy');
        if (available) button.removeAttribute('aria-disabled');
        else button.setAttribute('aria-disabled', 'true');
        button.setAttribute('aria-label', ariaLabel);
      });
      stickyTotal.innerHTML = (pieces > 1 ? '<span class="bb-lg">' + pieces + ' pezzi · </span>' : '') +
        money(total) + (discounted ? ' · −10%' : '');

      const offer = ritual?.querySelector('.bb-set');
      if (offer) {
        const setDiscounted = Math.round(setFull * (1 - discount));
        offer.querySelector('[data-set-full]').textContent = money(discounted ? full : setFull);
        offer.querySelector('[data-set-disc]').textContent = money(discounted ? total : setDiscounted);
        offer.querySelector('[data-set-save]').textContent = 'Risparmi ' + money(discounted ? full - total : setFull - setDiscounted);
        offer.querySelector('[data-set-hint]').textContent = discounted ? 'Su tutti i ' + pieces + ' pezzi dei tre prodotti' :
          missing.length === 1 ? 'Manca solo ' + missing[0] + ' per lo sconto' :
            'Con ' + productName + ' e i due abbinati, almeno un pezzo ciascuno';
        const chooseAll = offer.querySelector('[data-set-all]');
        chooseAll.hidden = discounted;
        chooseAll.disabled = pairs.some(pair => pair.dataset.available !== 'true');
        chooseAll.setAttribute('aria-disabled', String(chooseAll.disabled));
        offer.querySelector('[data-set-ok]').hidden = !discounted;
      }

      const projected = cartTotal + total;
      const left = threshold - projected;
      ship.classList.toggle('is-free', left <= 0);
      ship.querySelector('[data-ship-text]').innerHTML = left > 0 ?
        'Ti mancano <b>' + money(left) + '</b> per la spedizione gratuita' : 'Spedizione gratuita inclusa';
      ship.querySelector('[data-ship-bar]').style.transform =
        'scaleX(' + Math.min(1, Math.max(0.02, projected / threshold)).toFixed(3) + ')';
      updateSticky();
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
        const availabilityError = /quantity|available|stock|sold out/i;
        const isUnavailable = Number(error?.status) === 422 ||
          availabilityError.test(error?.description) || availabilityError.test(error?.message);
        state = '';
        showError(isUnavailable ? unavailable : addError);
        render();
      }
    }, true);

    window.addEventListener('scroll', updateSticky, { passive: true });
    window.addEventListener('resize', updateSticky);
    if (header && 'ResizeObserver' in window) new ResizeObserver(updateSticky).observe(header);
    render();
  }

  document.querySelectorAll('[data-bz-product]').forEach(init);
})();
