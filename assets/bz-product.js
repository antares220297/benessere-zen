window.bzBuy = {
  init(root, quantity, quantityValue, currency) {
    const form = quantity.form;
    const status = root.querySelector('[data-bz-buy-status]');
    const productName = root.querySelector('h1').textContent;
    const variantSelector = '[name="id"][data-bz-variant]:checked, input[type="hidden"][name="id"][data-bz-variant]';
    const pickSelector = '[data-bz-pick]';
    const disabledCheckboxes = new WeakSet();
    let pending = false;
    let previousSummary;

    function read() {
      const variant = form.querySelector(variantSelector);
      const available = Boolean(variant && variant.dataset.available !== 'false');
      const main = { id: Number(variant?.value), quantity: quantityValue(quantity) };
      const picks = Array.from(root.querySelectorAll(pickSelector)).flatMap(row => {
        const unavailable = row.dataset.available === 'false';
        const checkbox = row.querySelector('input[type="checkbox"]');
        if (unavailable) {
          if (checkbox) {
            checkbox.checked = false;
            if (!checkbox.disabled) {
              checkbox.disabled = true;
              disabledCheckboxes.add(checkbox);
            }
          }
          if (row.getAttribute('aria-checked') === 'true') row.setAttribute('aria-checked', 'false');
          return [];
        }
        if (checkbox && disabledCheckboxes.delete(checkbox)) checkbox.disabled = false;
        if (row.getAttribute('aria-checked') !== 'true' && !checkbox?.checked) return [];

        const id = Number(row.dataset.variantId);
        const price = Number(row.dataset.price);
        if (!Number.isSafeInteger(id) || id < 1 || !Number.isSafeInteger(price) || price < 0) return [];
        const input = row.querySelector('input[data-bz-pick-qty]');
        const count = input ? Math.min(99, quantityValue(input)) : 1;
        return [{ item: { id, quantity: count }, price }];
      });
      const items = variant ? [main, ...picks.map(pick => pick.item)] : [];
      const pieces = items.reduce((sum, item) => sum + item.quantity, 0);
      const total = (variant ? Number(variant.dataset.bzVariant) * main.quantity : 0) +
        picks.reduce((sum, pick) => sum + pick.price * pick.item.quantity, 0);
      return { available, picks, summary: { pieces, total, items } };
    }

    function refresh() {
      const { available, picks, summary } = read();
      let label = available ? 'Aggiungi al carrello' : 'Esaurito';
      if (available && picks.length) {
        const money = window.bzMoney ? window.bzMoney(summary.total) : currency.format(summary.total / 100);
        label = 'Aggiungi ' + summary.pieces + ' · ' + money;
      }

      root.querySelectorAll('[data-bz-buy-submit]').forEach(button => {
        button.disabled = pending || !available;
        if (pending) button.setAttribute('aria-busy', 'true');
        else button.removeAttribute('aria-busy');
        button.classList.toggle('bz-stock--soldout', !available);
        const caption = button.querySelector('[data-bz-buy-label]');
        if (caption && caption.textContent !== label) caption.textContent = label;
        button.setAttribute('aria-label', label + ': ' + productName);
      });

      const signature = JSON.stringify({ available, summary });
      if (signature !== previousSummary) {
        previousSummary = signature;
        document.dispatchEvent(new CustomEvent('bz:buy-summary', { detail: summary }));
      }
    }

    function update(event) {
      const target = event.target;
      if (target === quantity || target.matches('[data-bz-variant]') || target.closest(pickSelector)) refresh();
    }

    root.addEventListener('input', update);
    root.addEventListener('change', update);
    // ARIA-based controls can change state without emitting a native input event.
    new MutationObserver(records => {
      if (records.some(record => record.target.matches?.(pickSelector + ', [data-bz-variant]') ||
        Array.from(record.addedNodes).concat(Array.from(record.removedNodes)).some(node =>
          node.matches?.(pickSelector) || node.querySelector?.(pickSelector)))) refresh();
    }).observe(root, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ['aria-checked', 'data-available', 'data-variant-id', 'data-price', 'data-bz-variant']
    });

    form.addEventListener('submit', async event => {
      const { available, picks, summary } = read();
      if (!pending && available) {
        status.hidden = true;
        if (!picks.length) return;
      }

      event.preventDefault();
      event.stopImmediatePropagation();
      if (pending || !available) return;

      const items = summary.items;
      const companions = Array.from(root.querySelectorAll('.bz-upsell [data-upsell-variant]'),
        row => Number(row.dataset.upsellVariant));
      if (picks.length === 2 && companions.length === 2 &&
          new Set([items[0].id, ...companions]).size === 3 &&
          companions.every(id => picks.some(pick => pick.item.id === id))) {
        const ids = items.map(item => item.id).sort((a, b) => a - b);
        const properties = { _bz_rituale: 'r-' + ids.join('-'), _bz_rituale_n: '3' };
        items.forEach(item => { item.properties = properties; });
      }

      pending = true;
      refresh();
      function errorMessage(error) {
        const availabilityError = /quantity|available|stock|sold out/i;
        return Number(error?.status) === 422 ||
          availabilityError.test(error?.description) || availabilityError.test(error?.message)
          ? 'Alcuni pezzi non sono disponibili nella quantità scelta. Controlla le quantità e riprova.'
          : 'Non è stato possibile aggiungere al carrello. Riprova.';
      }
      try {
        const result = await window.bzAddItems(items);
        if (!result || result.status || result.description || result.message) {
          status.textContent = errorMessage(result);
          status.hidden = false;
        }
      } catch (error) {
        status.textContent = errorMessage(error);
        status.hidden = false;
      } finally {
        pending = false;
        refresh();
      }
    }, true);

    return refresh;
  }
};

(function () {
  document.querySelectorAll("[data-bz-product]").forEach(function (root) {
    var stage = root.querySelector("#BzStage");
    var frame = root.querySelector("[data-bz-frame]");
    var thumbs = root.querySelectorAll("[data-bz-thumb]");
    thumbs.forEach(function (button) {
      button.addEventListener("click", function () {
        thumbs.forEach(function (item) {
          item.classList.toggle("is-on", item === button);
          item.setAttribute("aria-pressed", String(item === button));
        });
        var full = button.getAttribute("data-full");
        if (stage && full) {
          stage.removeAttribute("srcset");
          stage.removeAttribute("sizes");
          stage.src = full;
        }
        if (stage) stage.alt = button.getAttribute("aria-label") || "";
        if (frame) {
          frame.textContent = button.getAttribute("data-bz-thumb") + " / " + String(thumbs.length);
        }
      });
    });
    var shipping = root.querySelector("[data-bz-shipping]");
    var quantity = root.querySelector("[data-bz-atc] input[name='quantity']");
    var currency = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
    var cartTotal = Number(root.dataset.bzCartTotal || 0);
    var variantPrice = Number(shipping.dataset.price);
    var threshold = Number(shipping.dataset.threshold);
    var decreaseButtons = root.querySelectorAll("[data-bz-atc] [data-bz-qty='-1']");
    var refreshBuy = window.bzBuy.init(root, quantity, quantityValue, currency);

    function quantityValue(input) {
      return Math.max(1, Math.floor(input.valueAsNumber || 1));
    }

    function updateShipping() {
      var count = quantityValue(quantity);
      decreaseButtons.forEach(function (button) { button.disabled = count <= 1; });
      var projected = cartTotal + variantPrice * count;
      var missing = Math.max(0, threshold - projected);
      var text = shipping.querySelector("p");
      var amount = document.createElement("b");
      amount.textContent = missing ? currency.format(missing / 100) : "Spedizione gratuita";
      if (missing) {
        text.replaceChildren("Ti mancano ", amount, " per la spedizione gratuita");
      } else {
        text.replaceChildren(amount);
      }
      shipping.querySelector(".bz-ship__track i").style.width = Math.min(100, 100 * projected / threshold) + "%";
    }

    function syncQuantity(value) {
      if (quantity.value !== value) quantity.value = value;
      updateShipping();
      refreshBuy();
    }

    quantity.addEventListener("input", updateShipping);
    quantity.addEventListener("change", function () {
      syncQuantity(String(quantityValue(quantity)));
    });
    document.addEventListener("bz:cart-updated", function (event) {
      cartTotal = event.detail.totalPrice;
      updateShipping();
    });

    root.querySelectorAll("input[type='radio'][data-bz-variant]").forEach(function (radio) {
      radio.addEventListener("change", function () {
        var imageId = radio.dataset.imageId || root.dataset.featuredImageId;
        var thumb = Array.from(thumbs).find(function (button) {
          return button.dataset.imageId === imageId;
        });
        if (thumb) thumb.click();
        var galleryVariant = root.querySelector("[data-bz-gallery-variant]");
        if (galleryVariant) galleryVariant.textContent = radio.dataset.variantTitle;
        var cents = Number(radio.getAttribute("data-bz-variant"));
        if (Number.isFinite(cents) && cents >= 0) {
          variantPrice = cents;
          updateShipping();
          var euros = Math.floor(cents / 100);
          var rest = String(cents % 100).padStart(2, "0");
          var grouped = String(euros).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          root.querySelectorAll("[data-bz-price]").forEach(function (priceNode) {
            priceNode.textContent = grouped + "," + rest + "\u00a0€";
          });
        }
      });
    });
    root.querySelectorAll("[data-bz-atc] [data-bz-qty]").forEach(function (button) {
      button.addEventListener("click", function () {
        var next = Math.max(1, quantityValue(quantity) + Number(button.dataset.bzQty));
        syncQuantity(String(next));
      });
    });
    syncQuantity(String(quantityValue(quantity)));
  });
})();
