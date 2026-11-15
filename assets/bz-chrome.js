(function () {
  var root = (window.Shopify && Shopify.routes && Shopify.routes.root) || "/";
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

  function openSearch() {
    search.classList.add("is-open");
    search.querySelector(".bz-search__panel").hidden = false;
  }

  function closeSearch() {
    search.classList.remove("is-open");
    search.querySelector(".bz-search__panel").hidden = true;
  }

  input.addEventListener("focus", openSearch);
  document.addEventListener("click", function (event) {
    if (!search.contains(event.target)) closeSearch();
  });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeSearch();
  });

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
    var text = String(price);
    if (text.indexOf("€") !== -1) return text;
    var amount = Number(text);
    if (!Number.isFinite(amount)) return text;
    return amount.toLocaleString("it-IT", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
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

  var burger = document.querySelector("[data-bz-burger]");
  var nav = document.getElementById("BzNav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", open ? "false" : "true");
      nav.classList.toggle("is-open", !open);
      if (!open) nav.querySelector("a") && nav.querySelector("a").focus();
    });
  }

  if (panelHits) search.setAttribute("data-initial-hits", panelHits.innerHTML);
})();
