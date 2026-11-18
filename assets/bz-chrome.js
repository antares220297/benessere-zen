(function () {
  var root = (window.Shopify && Shopify.routes && Shopify.routes.root) || "/";

  function cartSections() {
    var list = [
      { id: "cart-drawer", selector: "#CartDrawer" },
      { id: "bz-cart", selector: "#bz-cart" },
      { id: "cart-icon-bubble", selector: "#cart-icon-bubble" },
      { id: "mobile-cart-icon-bubble", selector: "#mobile-cart-icon-bubble" }
    ];
    ["#main-cart-items", "#main-cart-footer"].forEach(function (selector) {
      var node = document.querySelector(selector);
      var section = node && node.closest(".shopify-section");
      if (section && section.id) {
        list.push({ id: section.id.replace("shopify-section-", ""), selector: selector });
      }
    });
    return list;
  }

  function applySections(payload, sections) {
    if (!payload || !payload.sections) return;
    sections.forEach(function (section) {
      var html = payload.sections[section.id];
      var target = document.querySelector(section.selector);
      if (!html || !target) return;
      var parsed = new DOMParser().parseFromString(html, "text/html");
      var inner = parsed.querySelector(section.selector);
      if (inner) target.innerHTML = inner.innerHTML;
    });
  }

  function openDrawer() {
    if (!(window.Alpine && Alpine.store && Alpine.store("xMiniCart"))) return;
    var cart = Alpine.store("xMiniCart");
    cart.type = "drawer";
    if (typeof cart.openCart === "function") cart.openCart();
    fillUpsell(document);
  }

  function formatEuro(cents) {
    var amount = Math.abs(Number(cents) || 0);
    var whole = Math.floor(amount / 100);
    var rest = String(amount % 100).padStart(2, "0");
    var grouped = String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return grouped + "," + rest + "\u00a0€";
  }
  window.bzMoney = formatEuro;

  function replaceSection(selector, html) {
    if (!html) return;
    var parsed = new DOMParser().parseFromString(html, "text/html");
    var fresh = parsed.querySelector(selector);
    var live = document.querySelector(selector);
    if (!fresh || !live) return;
    live.innerHTML = fresh.innerHTML;
    if (window.Alpine && typeof Alpine.initTree === "function") Alpine.initTree(live);
  }

  function updateCount(count) {
    document.querySelectorAll("[data-bz-count], #cart-icon-bubble span").forEach(function (node) {
      if (node.children && node.children.length) return;
      node.textContent = String(count);
    });
    document.querySelectorAll("#cart-icon-bubble > div, .bz-cart__count").forEach(function (node) {
      node.classList.toggle("hidden", count === 0);
    });
  }

  var cartLineDesired = {};
  var cartLineQueue = Promise.resolve();

  function writeQty(key, quantity) {
    document.querySelectorAll("[data-key]").forEach(function (row) {
      if (row.getAttribute("data-key") !== key) return;
      var input = row.querySelector("input.bz-drawer__qty-input");
      if (input) input.value = String(quantity);
    });
  }

  function changeCartLine(key, quantity) {
    cartLineDesired[key] = quantity;
    writeQty(key, quantity);
    cartLineQueue = cartLineQueue.catch(function () {}).then(function () {
      var next = cartLineDesired[key];
      if (next == null) return null;
      return fetch(root + "cart/change.js", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ id: key, quantity: next })
      }).then(function (response) {
        if (response.status === 429 || !response.ok) {
          delete cartLineDesired[key];
          return refreshCart();
        }
        return response.json();
      }).then(function (payload) {
        if (cartLineDesired[key] !== next) return payload;
        delete cartLineDesired[key];
        if (!payload || payload.status || payload.description) {
          return refreshCart();
        }
        return refreshCart().then(function () {
          openDrawer();
          return payload;
        });
      });
    });
    return cartLineQueue;
  }

  function refreshCart() {
    return fetch(root + "?sections=cart-drawer,bz-cart", { headers: { Accept: "application/json" } })
      .then(function (response) { return response.json(); })
      .then(function (sections) {
        replaceSection("#CartDrawer", sections["cart-drawer"]);
        replaceSection("#bz-cart", sections["bz-cart"]);
        return fetch(root + "cart.js", { headers: { Accept: "application/json" } });
      })
      .then(function (response) { return response.json(); })
      .then(function (cart) {
        updateCount(cart.item_count || 0);
        fillUpsell(document);
        return cart;
      });
  }

  function fillUpsell(scope) {
    (scope || document).querySelectorAll("[data-bz-upsell]").forEach(function (box) {
      var productId = box.getAttribute("data-product-id");
      var list = box.querySelector("[data-bz-upsell-list]");
      if (!productId || !list) return;
      fetch(root + "recommendations/products.json?product_id=" + productId + "&limit=4&intent=related")
        .then(function (response) { return response.json(); })
        .then(function (data) {
          var products = (data.products || []).filter(function (product) {
            var image = product.featured_image || (product.images && product.images[0]);
            var src = typeof image === "string" ? image : (image && (image.src || image.url)) || "";
            return src;
          }).slice(0, 2);
          if (!products.length) return;
          list.innerHTML = products.map(function (product) {
            var variant = (product.variants || [])[0] || {};
            var image = product.featured_image || (product.images && product.images[0]);
            var src = typeof image === "string" ? image : (image && (image.src || image.url)) || "";
            if (src.indexOf("//") === 0) src = "https:" + src;
            var title = String(product.title || "").replace(/[&<>"']/g, function (char) {
              return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
            });
            var href = String(product.url || "#").replace(/"/g, "");
            var safeSrc = String(src).replace(/"/g, "");
            return '<div class="bz-upsell">' +
              '<a href="' + href + '">' + (safeSrc ? '<img src="' + safeSrc + '" alt="" width="48" height="48">' : '') + '</a>' +
              '<a href="' + href + '">' + title + '</a>' +
              '<span>' + formatEuro(product.price) + '</span>' +
              '<button type="button" class="bz-drawer__plus" data-bz-upsell-add="' + (variant.id || "") + '" aria-label="Aggiungi">+</button>' +
              '</div>';
          }).join("");
        })
        .catch(function () {});
    });
  }

  document.addEventListener("click", function (event) {
    if (event.target.closest("#cart-icon, [data-bz-cart]")) fillUpsell(document);
    var closer = event.target.closest("[data-bz-close], [data-bz-cart]");
    if (closer && closer.hasAttribute("data-bz-cart")) {
      event.preventDefault();
      openDrawer();
      return;
    }
    if (closer && closer.hasAttribute("data-bz-close")) {
      event.preventDefault();
      if (window.Alpine && Alpine.store("xMiniCart")) Alpine.store("xMiniCart").hideCart();
      return;
    }
    var qty = event.target.closest("#CartDrawer [data-bz-qty], #bz-cart [data-bz-qty], #CartDrawer [data-bz-remove], #bz-cart [data-bz-remove]");
    if (qty) {
      event.preventDefault();
      var row = qty.closest(".cart-item");
      var key = row && row.getAttribute("data-key");
      var input = row && row.querySelector("input.bz-drawer__qty-input");
      var current = input ? parseInt(input.value, 10) : NaN;
      if (!key || !Number.isFinite(current)) return;
      var next = qty.hasAttribute("data-bz-remove") ? 0 : Math.max(0, current + Number(qty.getAttribute("data-bz-qty")));
      changeCartLine(key, next);
      return;
    }
    var add = event.target.closest("[data-bz-upsell-add]");
    if (!add || !window.bzAddItems) return;
    event.preventDefault();
    var id = Number(add.getAttribute("data-bz-upsell-add"));
    if (!id) return;
    window.bzAddItems([{ id: id, quantity: 1 }]).then(function () { return refreshCart(); });
  });

  window.bzAddItems = function (items) {
    var sections = cartSections();
    return fetch(root + "cart/add.js", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        items: items,
        sections: sections.map(function (section) { return section.id; })
      })
    }).then(function (response) {
      return response.json();
    }).then(function (payload) {
      if (!payload || payload.status) return payload;
      if (payload.sections) {
        replaceSection("#CartDrawer", payload.sections["cart-drawer"]);
        replaceSection("#bz-cart", payload.sections["bz-cart"]);
      } else {
        applySections(payload, sections);
      }
      document.dispatchEvent(new CustomEvent("eurus:cart:items-changed"));
      fillUpsell(document);
      openDrawer();
      return payload;
    });
  };

  document.addEventListener("change", function (event) {
    var input = event.target;
    if (!input || !input.matches || !input.matches(".bz-drawer__qty-input")) return;
    if (!input.closest("#CartDrawer, #bz-cart")) return;
    var row = input.closest("[data-key]");
    var key = row && row.getAttribute("data-key");
    if (!key) return;
    var next = parseInt(input.value, 10);
    if (!Number.isFinite(next) || next < 0) next = 0;
    changeCartLine(key, next);
  });

  document.addEventListener("submit", function (event) {
    var form = event.target;
    if (!form || !form.classList) return;
    var cardAdd = form.querySelector && form.querySelector(".bz-card__add");
    if (!form.classList.contains("bz-card__form") && !form.classList.contains("bz-hero__form") && !form.classList.contains("bz-ajax-cart") && !cardAdd) return;
    if (!window.bzAddItems) return;
    event.preventDefault();
    var data = new FormData(form);
    var id = data.get("id");
    if (!id) return;
    window.bzAddItems([{ id: Number(id), quantity: Number(data.get("quantity") || 1) }]);
  });

  var search = document.querySelector("[data-bz-search]");
  if (!search) return;

  var input = search.querySelector("input[name='q']");
  var hintWord = search.querySelector("[data-bz-word]");
  var panelHits = search.querySelector("[data-bz-hits]");
  var resultsTitle = search.querySelector("[data-bz-results-title]");
  var words = (search.getAttribute("data-words") || "")
    .split("|")
    .map(function (word) { return word.trim(); })
    .filter(Boolean);
  var defaultTitle = search.getAttribute("data-default-title") || "In evidenza";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var timer = 0;

  var headerEl = document.querySelector(".bz-header");
  var searchToggle = document.querySelector("[data-bz-search-toggle]");
  var narrowSearch = window.matchMedia("(max-width: 1179px)");

  function openSearch() {
    search.classList.add("is-open");
    search.querySelector(".bz-search__panel").hidden = false;
  }

  function closeSearch() {
    search.classList.remove("is-open");
    search.querySelector(".bz-search__panel").hidden = true;
  }

  function searchIsRevealed() {
    return !!(headerEl && (narrowSearch.matches || headerEl.classList.contains("is-compact")));
  }

  function collapseRevealedSearch() {
    if (!searchIsRevealed() || !headerEl) return;
    headerEl.classList.remove("is-search-open");
    if (searchToggle) searchToggle.setAttribute("aria-expanded", "false");
  }

  function syncCompact() {
    if (!headerEl) return;
    var compact = window.scrollY > 8;
    headerEl.classList.toggle("is-compact", compact);
    if (!compact && !narrowSearch.matches) {
      headerEl.classList.remove("is-search-open");
      if (searchToggle) searchToggle.setAttribute("aria-expanded", "false");
      return;
    }
    if (compact && !narrowSearch.matches && !headerEl.classList.contains("is-search-open")) {
      closeSearch();
    }
  }

  input.addEventListener("focus", openSearch);
  document.addEventListener("click", function (event) {
    if (searchToggle && searchToggle.contains(event.target)) return;
    if (!search.contains(event.target)) {
      closeSearch();
      collapseRevealedSearch();
    }
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeSearch();
      collapseRevealedSearch();
    }
  });

  if (searchToggle && headerEl) {
    searchToggle.addEventListener("click", function () {
      var open = !headerEl.classList.contains("is-search-open");
      headerEl.classList.toggle("is-search-open", open);
      searchToggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open) {
        closeSearch();
        return;
      }
      window.requestAnimationFrame(function () {
        openSearch();
        input.focus();
      });
    });
  }

  syncCompact();
  window.addEventListener("scroll", function () {
    syncCompact();
  }, { passive: true });
  window.addEventListener("resize", syncCompact);

  if (hintWord && words.length > 1 && !reduceMotion) {
    var index = 0;
    window.setInterval(function () {
      index = (index + 1) % words.length;
      hintWord.textContent = words[index];
    }, 2200);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char];
    });
  }

  function priceText(price) {
    if (price == null || price === "") return "";
    var text = String(price).replace(/<[^>]+>/g, "").trim();
    var prefixed = text.match(/^€\s*(.+)$/);
    if (prefixed) return prefixed[1].trim() + "\u00a0€";
    if (/€\s*$/.test(text)) return text;
    var amount = Number(text);
    if (!Number.isFinite(amount)) return text;
    return amount.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "\u00a0€";
  }

  function renderProducts(products, query) {
    if (!panelHits) return;
    if (resultsTitle) {
      resultsTitle.textContent = query ? "Prodotti per «" + query + "»" : defaultTitle;
    }
    if (!products.length) {
      panelHits.innerHTML = query
        ? '<p class="bz-search__empty">Nessun pezzo con questo nome. Prova la pietra o il tipo.</p>'
        : "";
      return;
    }
    panelHits.innerHTML = products.slice(0, 4).map(function (product) {
      var image = product.featured_image || product.image || {};
      var src = image.url || image;
      var alt = image.alt || product.title || "";
      var meta = product.type || product.product_type || "";
      return (
        '<a class="bz-hit" href="' + escapeHtml(product.url) + '">' +
          (src ? '<img src="' + escapeHtml(src) + '" alt="' + escapeHtml(alt) + '" width="56" height="56">' : "<span></span>") +
          "<span>" + escapeHtml(product.title) + (meta ? "<small>" + escapeHtml(meta) + "</small>" : "") + "</span>" +
          '<span class="bz-hit__price">' + escapeHtml(priceText(product.price)) + "</span>" +
        "</a>"
      );
    }).join("");
  }

  input.addEventListener("input", function () {
    var query = input.value.trim();
    window.clearTimeout(timer);
    if (query.length < 2) {
      if (resultsTitle) resultsTitle.textContent = defaultTitle;
      if (panelHits && search.getAttribute("data-initial-hits")) {
        panelHits.innerHTML = search.getAttribute("data-initial-hits");
      }
      return;
    }
    timer = window.setTimeout(function () {
      var url = root + "search/suggest.json?q=" + encodeURIComponent(query) +
        "&resources[type]=product&resources[limit]=4&resources[options][unavailable_products]=last";
      fetch(url, { headers: { Accept: "application/json" } })
        .then(function (response) { return response.json(); })
        .then(function (data) {
          var products = (((data || {}).resources || {}).results || {}).products || [];
          renderProducts(products, query);
        })
        .catch(function () {});
    }, 180);
  });

  var cartLink = document.querySelector("[data-bz-cart]");
  if (cartLink) {
    cartLink.addEventListener("click", function (event) {
      var nativeCart = document.getElementById("cart-icon");
      if (!nativeCart) return;
      event.preventDefault();
      nativeCart.click();
    });
  }

  document.addEventListener("eurus:cart:items-changed", function () {
    fetch(root + "cart.js", { headers: { Accept: "application/json" } })
      .then(function (response) { return response.json(); })
      .then(function (cart) {
        document.querySelectorAll("[data-bz-count]").forEach(function (node) {
          node.textContent = cart.item_count;
        });
      })
      .catch(function () {});
  });

  function placeCookieGap() {
    var banner = document.querySelector("#shopify-pc__banner, .shopify-pc__banner__dialog, #shopify-privacy-banner");
    var height = 0;
    if (banner) {
      var box = banner.getBoundingClientRect();
      if (box.height > 24 && box.bottom > window.innerHeight - 8) height = Math.round(box.height);
    }
    if (height) document.documentElement.style.setProperty("--bz-cookie", height + "px");
    else document.documentElement.style.removeProperty("--bz-cookie");
  }
  placeCookieGap();
  window.addEventListener("resize", placeCookieGap);
  if (window.MutationObserver) {
    new MutationObserver(placeCookieGap).observe(document.body, { childList: true, subtree: true });
  }

  var burger = document.querySelector("[data-bz-burger]");
  var nav = document.getElementById("BzNav");
  if (nav) {
    nav.querySelectorAll("[data-bz-sub]").forEach(function (button) {
      button.addEventListener("click", function () {
        if (window.matchMedia("(min-width: 1180px)").matches) return;
        var item = button.closest(".bz-nav__item");
        if (!item) return;
        var open = !item.classList.contains("is-open");
        nav.querySelectorAll(".bz-nav__item.is-open").forEach(function (other) {
          if (other === item) return;
          other.classList.remove("is-open");
          var otherButton = other.querySelector("[data-bz-sub]");
          if (otherButton) otherButton.setAttribute("aria-expanded", "false");
        });
        item.classList.toggle("is-open", open);
        nav.classList.toggle("is-sub", open);
        button.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });
    nav.querySelectorAll("[data-bz-back]").forEach(function (back) {
      back.addEventListener("click", function () {
        nav.classList.remove("is-sub");
        nav.querySelectorAll(".bz-nav__item.is-open").forEach(function (item) {
          item.classList.remove("is-open");
          var toggle = item.querySelector("[data-bz-sub]");
          if (toggle) toggle.setAttribute("aria-expanded", "false");
        });
      });
    });
  }
  if (burger && nav) {
    function placeOpenMenu() {
      var header = burger.closest(".bz-header");
      var wrap = nav.closest(".bz-navwrap");
      if (!header || !wrap) return;
      wrap.style.top = Math.round(header.getBoundingClientRect().bottom) + "px";
    }

    function closeMenu() {
      burger.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.documentElement.classList.remove("bz-nav-open");
    }

    function navMenuOpen() {
      return (
        burger.getAttribute("aria-expanded") === "true" ||
        nav.classList.contains("is-open") ||
        document.documentElement.classList.contains("bz-nav-open")
      );
    }

    function overlayBlocksNavTrap() {
      if (search.classList.contains("is-open")) return true;
      var cart = window.Alpine && Alpine.store && Alpine.store("xMiniCart");
      return !!(cart && cart.open);
    }

    function navTrapFocusables() {
      var selector =
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      var items = [burger];
      nav.querySelectorAll(selector).forEach(function (el) {
        items.push(el);
      });
      return items.filter(function (el) {
        if (el.disabled || el.tabIndex < 0) return false;
        return el.getClientRects().length > 0;
      });
    }

    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
      document.documentElement.classList.toggle("bz-nav-open", !open);
      if (!open) {
        placeOpenMenu();
        nav.querySelector("a") && nav.querySelector("a").focus();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        closeMenu();
        burger.focus();
        return;
      }
      if (event.key !== "Tab" || !navMenuOpen() || overlayBlocksNavTrap()) return;
      var focusables = navTrapFocusables();
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      var active = document.activeElement;
      var index = focusables.indexOf(active);
      if (event.shiftKey) {
        if (active === first || index === -1) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last || index === -1) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (!nav.classList.contains("is-open")) return;
      if (window.innerWidth >= 1180) {
        closeMenu();
        return;
      }
      placeOpenMenu();
    });
  }

  if (panelHits) search.setAttribute("data-initial-hits", panelHits.innerHTML);

  document.addEventListener("keydown", function (event) {
    var cart = window.Alpine && Alpine.store && Alpine.store("xMiniCart");
    var panel = document.querySelector("#CartDrawer .bz-drawer__panel");
    if (!cart || !cart.open || !panel) return;
    if (event.key === "Escape") {
      if (typeof cart.hideCart === "function") cart.hideCart();
      var opener = document.querySelector("[data-bz-cart]");
      if (opener) opener.focus();
      return;
    }
    if (event.key !== "Tab") return;
    var items = Array.prototype.filter.call(
      panel.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'),
      function (el) { return el.getClientRects().length > 0; }
    );
    if (!items.length) return;
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && (document.activeElement === last || items.indexOf(document.activeElement) === -1)) {
      event.preventDefault();
      first.focus();
    }
  });
})();
