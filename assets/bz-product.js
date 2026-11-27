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
    var mainAdd = root.querySelector("[data-bz-atc] button[type='submit']");
    var sticky = root.querySelector(".bz-sticky");
    var stickyButton = sticky && sticky.querySelector("button[type='submit']");
    if (mainAdd && sticky && "IntersectionObserver" in window) {
      var book = document.querySelector("section.lb#libro");
      var footers = Array.from(document.querySelectorAll(".shopify-section-group-footer-group, #shopify-section-footer"));
      if (!footers.length) {
        var footer = document.querySelector("footer.bz-foot") || document.querySelector("footer");
        if (footer) footers.push(footer);
      }
      var blockers = book ? footers.concat(book) : footers;

      function updateSticky() {
        var show = mainAdd.getBoundingClientRect().bottom <= 0 && !blockers.some(function (element) {
          var rect = element.getBoundingClientRect();
          return rect.height > 0 && rect.bottom >= 0 && rect.top <= window.innerHeight;
        });
        sticky.classList.toggle("is-on", show);
        sticky.toggleAttribute("inert", !show);
      }

      var stickyObserver = new IntersectionObserver(updateSticky, { threshold: 0 });
      stickyObserver.observe(mainAdd);
      blockers.forEach(function (element) { stickyObserver.observe(element); });
      var stickyFrame;
      window.addEventListener("scroll", function () {
        cancelAnimationFrame(stickyFrame);
        stickyFrame = requestAnimationFrame(updateSticky);
      }, { passive: true });
      updateSticky();
    }
    var shipping = root.querySelector("[data-bz-shipping]");
    var quantity = root.querySelector("[data-bz-atc] input[name='quantity']");
    var currency = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
    var cartTotal = Number(root.dataset.bzCartTotal || 0);
    var variantPrice = Number(shipping.dataset.price);
    var threshold = Number(shipping.dataset.threshold);
    var stickyQuantity = sticky && sticky.querySelector(".bz-qty input");
    var quantityInputs = stickyQuantity ? [quantity, stickyQuantity] : [quantity];
    var decreaseButtons = root.querySelectorAll("[data-bz-atc] [data-bz-qty='-1'], .bz-sticky [data-bz-qty='-1']");

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
      quantityInputs.forEach(function (input) {
        if (input.value !== value) input.value = value;
      });
      updateShipping();
    }

    quantityInputs.forEach(function (input) {
      input.addEventListener("input", function () { syncQuantity(input.value); });
      input.addEventListener("change", function () {
        syncQuantity(String(quantityValue(input)));
      });
    });
    if (stickyButton && stickyQuantity) {
      function copyStickyQuantity() {
        syncQuantity(String(quantityValue(stickyQuantity)));
      }
      stickyButton.addEventListener("click", copyStickyQuantity);
      quantity.form.addEventListener("submit", function (event) {
        if (event.submitter === stickyButton) copyStickyQuantity();
      });
    }
    document.addEventListener("bz:cart-updated", function (event) {
      cartTotal = event.detail.totalPrice;
      updateShipping();
    });

    root.querySelectorAll("input[type='radio'][data-bz-variant]").forEach(function (radio) {
      radio.addEventListener("change", function () {
        var unavailable = radio.dataset.available === "false";
        var imageId = radio.dataset.imageId || root.dataset.featuredImageId;
        var thumb = Array.from(thumbs).find(function (button) {
          return button.dataset.imageId === imageId;
        });
        if (thumb) thumb.click();
        var galleryVariant = root.querySelector("[data-bz-gallery-variant]");
        if (galleryVariant) galleryVariant.textContent = radio.dataset.variantTitle;
        var addLabel = unavailable ? "Esaurito" : "Aggiungi al carrello";
        var addAriaLabel = addLabel + ": " + root.querySelector("h1").textContent;
        [mainAdd, stickyButton].forEach(function (button) {
          if (!button) return;
          button.disabled = unavailable;
          button.querySelector("[data-bz-add-label]").textContent = addLabel;
          button.setAttribute("aria-label", addAriaLabel);
        });
        if (mainAdd) mainAdd.classList.toggle("bz-stock--soldout", unavailable);
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
    root.querySelectorAll("[data-bz-atc] [data-bz-qty], .bz-sticky [data-bz-qty]").forEach(function (button) {
      button.addEventListener("click", function () {
        var next = Math.max(1, quantityValue(quantity) + Number(button.dataset.bzQty));
        syncQuantity(String(next));
      });
    });
    syncQuantity(String(quantityValue(quantity)));
  });
})();
