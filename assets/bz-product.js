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
    if (mainAdd && sticky && "IntersectionObserver" in window) {
      var mobile = window.matchMedia("(max-width: 860px)");
      var book = document.querySelector("section.lb#libro");
      function updateSticky() {
        var show = mobile.matches && mainAdd.getBoundingClientRect().bottom <= 0;
        if (show && book) {
          var bookRect = book.getBoundingClientRect();
          show = !(bookRect.height > 0 && bookRect.bottom >= 0 && bookRect.top <= window.innerHeight);
        }
        sticky.classList.toggle("is-on", show);
        sticky.toggleAttribute("inert", !show);
      }

      var stickyObserver = new IntersectionObserver(updateSticky, { threshold: 0 });
      stickyObserver.observe(mainAdd);
      if (book) stickyObserver.observe(book);
      var stickyFrame;
      window.addEventListener("scroll", function () {
        if (!mobile.matches) return;
        cancelAnimationFrame(stickyFrame);
        stickyFrame = requestAnimationFrame(updateSticky);
      }, { passive: true });
      mobile.addEventListener("change", updateSticky);
      updateSticky();
    }
    var shipping = root.querySelector("[data-bz-shipping]");
    var quantity = root.querySelector("[data-bz-atc] input[name='quantity']");
    var currency = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR" });
    var cartTotal = Number(root.dataset.bzCartTotal || 0);
    var variantPrice = Number(shipping.dataset.price);
    var threshold = Number(shipping.dataset.threshold);
    var decrease = root.querySelector("[data-bz-atc] [data-bz-qty='-1']");

    function quantityValue() {
      return Math.max(1, Math.floor(quantity.valueAsNumber || 1));
    }

    function updateShipping() {
      var count = quantityValue();
      decrease.disabled = count <= 1;
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

    quantity.addEventListener("input", updateShipping);
    quantity.addEventListener("change", function () {
      quantity.value = String(quantityValue());
      updateShipping();
    });
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
        var stickyButton = root.querySelector(".bz-sticky button");
        if (mainAdd) {
          mainAdd.disabled = unavailable;
          mainAdd.classList.toggle("bz-stock--soldout", unavailable);
          mainAdd.querySelector("[data-bz-add-label]").textContent = unavailable ? "Esaurito" : "Aggiungi al carrello";
          mainAdd.setAttribute("aria-label", (unavailable ? "Esaurito: " : "Aggiungi al carrello: ") + root.querySelector("h1").textContent);
        }
        if (stickyButton) {
          stickyButton.disabled = unavailable;
          stickyButton.textContent = unavailable ? "Esaurito" : "Aggiungi";
          stickyButton.setAttribute("aria-label", (unavailable ? "Esaurito: " : "Aggiungi al carrello: ") + root.querySelector("h1").textContent);
        }
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
        var next = Math.max(1, quantityValue() + Number(button.dataset.bzQty));
        quantity.value = String(next);
        updateShipping();
      });
    });
    updateShipping();
  });
})();
