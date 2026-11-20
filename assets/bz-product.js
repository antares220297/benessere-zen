(function () {
  function initDescription(description) {
    var intro = description.querySelector("[data-bz-intro]");
    var brief = description.querySelector("[data-bz-brief]");
    var toggle = description.querySelector(".bz-description__toggle");
    var body = description.querySelector(".bz-description__body");
    var list = brief.querySelector("ul");
    var extracted = [];

    body.querySelectorAll("p, li, div").forEach(function (paragraph) {
      if (paragraph.closest("table") || paragraph.querySelector("p, li, div, ul, ol, table, h2, h3, h4")) return;
      var breaks = Array.from(paragraph.querySelectorAll("br"));
      if (!paragraph.textContent.includes("✅") && !intro.hasChildNodes() && paragraph.tagName === "P") {
        // A paragraph with ordinary line breaks is still a single opening paragraph.
        breaks = [];
      }

      // Keep the original paragraph markup and split only at actual line breaks.
      for (var i = 0; i <= breaks.length; i++) {
        var line = document.createRange();
        line.selectNodeContents(paragraph);
        if (i > 0) line.setStartAfter(breaks[i - 1]);
        if (i < breaks.length) line.setEndBefore(breaks[i]);
        var content = line.toString().trim();
        if (!content) continue;

        if (!content.startsWith("✅") && !intro.hasChildNodes() && paragraph.tagName !== "LI") {
          var opening = document.createElement("p");
          opening.append(line.cloneContents());
          intro.append(opening);
          intro.hidden = false;
        } else if (content.startsWith("✅") && list.children.length < 3) {
          var item = document.createElement("li");
          var text = document.createElement("span");
          var value = content.replace(/^✅\uFE0F?\s*/, "");
          var colon = value.indexOf(":");
          if (colon > 0) {
            var label = document.createElement("strong");
            label.textContent = value.slice(0, colon + 1);
            text.append(label, value.slice(colon + 1));
          } else {
            text.textContent = value;
          }
          item.append(text);
          list.append(item);
          brief.hidden = false;
        } else {
          continue;
        }

        if (i < breaks.length) line.setEndAfter(breaks[i]);
        extracted.push({ line: line, paragraph: paragraph });
      }
    });

    extracted.reverse().forEach(function (entry) {
      entry.line.deleteContents();
      if (!entry.paragraph.textContent.trim() && !entry.paragraph.querySelector("img, video, iframe, svg")) {
        entry.paragraph.remove();
      }
    });
    body.querySelectorAll("h2, h3, h4").forEach(function (heading) {
      if (!/^in breve\s*:?$/i.test(heading.textContent.trim())) return;
      var next = heading.nextElementSibling;
      if (!next || !next.textContent.trim() && !next.querySelector("img, video, iframe, svg")) heading.remove();
    });

    if (!body.textContent.trim() && !body.querySelector("table, img, video, iframe, svg")) {
      body.hidden = true;
      return;
    }
    if (!extracted.length) return;

    body.hidden = true;
    toggle.hidden = false;
    toggle.addEventListener("click", function () {
      var expanded = toggle.getAttribute("aria-expanded") === "true";
      body.hidden = expanded;
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.textContent = expanded ? "Leggi tutto" : "Mostra meno";
    });
  }

  document.querySelectorAll("[data-bz-product]").forEach(function (root) {
    var description = root.querySelector("[data-bz-description]");
    if (description) initDescription(description);
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
      function updateSticky() {
        var show = mobile.matches && mainAdd.getBoundingClientRect().bottom <= 0;
        sticky.classList.toggle("is-on", show);
        sticky.toggleAttribute("inert", !show);
      }

      new IntersectionObserver(updateSticky).observe(mainAdd);
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
    var cartTotal = Number(document.querySelector("[data-cart-content]")?.dataset.totalPrice || 0);
    var variantPrice = Number(shipping.dataset.price);
    var threshold = Number(shipping.dataset.threshold);

    function updateShipping() {
      var count = Math.max(1, Math.floor(Number(quantity.value) || 1));
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
    document.addEventListener("bz:cart-updated", function (event) {
      cartTotal = event.detail.totalPrice;
      updateShipping();
    });

    root.querySelectorAll("[data-bz-variant]").forEach(function (radio) {
      radio.addEventListener("change", function () {
        var imageId = radio.dataset.imageId || root.dataset.featuredImageId;
        var thumb = Array.from(thumbs).find(function (button) {
          return button.dataset.imageId === imageId;
        });
        if (thumb) thumb.click();
        var galleryVariant = root.querySelector("[data-bz-gallery-variant]");
        if (galleryVariant) galleryVariant.textContent = radio.nextElementSibling.textContent;
        var stickyButton = root.querySelector(".bz-sticky button");
        if (mainAdd) {
          mainAdd.disabled = radio.disabled;
          mainAdd.classList.toggle("bz-stock--soldout", radio.disabled);
          mainAdd.querySelector("[data-bz-add-label]").textContent = radio.disabled ? "Esaurito" : "Aggiungi al carrello";
          if (!radio.disabled) mainAdd.setAttribute("aria-label", "Aggiungi al carrello: " + root.querySelector("h1").textContent);
        }
        if (stickyButton) {
          stickyButton.disabled = radio.disabled;
          stickyButton.textContent = radio.disabled ? "Esaurito" : "Aggiungi";
          if (!radio.disabled) stickyButton.setAttribute("aria-label", "Aggiungi al carrello: " + root.querySelector("h1").textContent);
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
    root.querySelectorAll("[data-bz-qty]").forEach(function (button) {
      button.addEventListener("click", function () {
        var input = root.querySelector("input[name='quantity']");
        if (!input) return;
        var next = Math.max(1, Number(input.value || 1) + Number(button.getAttribute("data-bz-qty")));
        input.value = String(next);
        updateShipping();
      });
    });
  });
})();
