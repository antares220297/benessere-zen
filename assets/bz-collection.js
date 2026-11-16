(function () {
  function withPreview(url) {
    var preview = "";
    try {
      preview = new URL(window.location.href).searchParams.get("preview_theme_id") || "";
    } catch (error) {
      preview = "";
    }
    if (!preview) return url;
    try {
      var next = new URL(url, window.location.origin);
      next.searchParams.set("preview_theme_id", preview);
      return next.pathname + next.search;
    } catch (error) {
      return url;
    }
  }

  function ensurePreview(form) {
    var preview = "";
    try {
      preview = new URL(window.location.href).searchParams.get("preview_theme_id") || "";
    } catch (error) {
      preview = "";
    }
    if (!preview || !form) return;
    var existing = form.querySelector('input[name="preview_theme_id"]');
    if (!existing) {
      existing = document.createElement("input");
      existing.type = "hidden";
      existing.name = "preview_theme_id";
      form.appendChild(existing);
    }
    existing.value = preview;
  }

  function euroLabel(raw) {
    var num = Number(raw);
    if (!isFinite(num)) return "";
    var sign = num < 0 ? "-" : "";
    var bits = Math.abs(num).toFixed(2).split(".");
    var whole = bits[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return sign + whole + "," + bits[1] + " €";
  }

  function paintRange(input) {
    if (!input || input.type !== "range" || !input.getAttribute("data-bz-range")) return;
    var box = input.closest(".bz-range");
    if (!box) return;
    var ends = box.nextElementSibling;
    if (!ends || !ends.classList.contains("bz-range__ends")) return;
    var slot = ends.querySelector('[data-bz-euro="' + input.getAttribute("data-bz-range") + '"]');
    if (slot) slot.textContent = euroLabel(input.value);
  }

  document.querySelectorAll("[data-bz-coll]").forEach(function (root) {
    var grid = root.querySelector("[data-bz-grid]");
    root.querySelectorAll("[data-bz-view]").forEach(function (button) {
      button.addEventListener("click", function () {
        root.querySelectorAll("[data-bz-view]").forEach(function (item) { item.classList.toggle("is-on", item === button); });
        if (grid) grid.classList.toggle("is-list", button.getAttribute("data-bz-view") === "list");
      });
    });
    var side = root.querySelector("[data-bz-side]");
    var sortSheet = root.querySelector("[data-bz-sort-sheet]");
    function lockSheet(open) {
      document.documentElement.classList.toggle("bz-sheet-open", open);
    }
    function closeSheets() {
      if (side) side.classList.remove("is-open");
      if (sortSheet) sortSheet.classList.remove("is-open");
      lockSheet(false);
    }
    root.querySelectorAll("[data-bz-open-filters]").forEach(function (opener) {
      opener.addEventListener("click", function () {
        var wasOpen = side && side.classList.contains("is-open");
        closeSheets();
        if (wasOpen || !side) return;
        side.classList.add("is-open");
        lockSheet(true);
        var closer = side.querySelector("[data-bz-close-filters]");
        if (closer) closer.focus();
      });
    });
    root.querySelectorAll("[data-bz-close-filters]").forEach(function (closer) {
      closer.addEventListener("click", function () {
        if (side) side.classList.remove("is-open");
        if (!sortSheet || !sortSheet.classList.contains("is-open")) lockSheet(false);
      });
    });
    root.querySelectorAll("[data-bz-open-sort]").forEach(function (opener) {
      opener.addEventListener("click", function () {
        var wasOpen = sortSheet && sortSheet.classList.contains("is-open");
        closeSheets();
        if (wasOpen || !sortSheet) return;
        sortSheet.classList.add("is-open");
        lockSheet(true);
        var closer = sortSheet.querySelector("[data-bz-close-sort]");
        if (closer) closer.focus();
      });
    });
    root.querySelectorAll("[data-bz-close-sort]").forEach(function (closer) {
      closer.addEventListener("click", function () {
        if (sortSheet) sortSheet.classList.remove("is-open");
        lockSheet(false);
      });
    });
    function sheetFocusables(box) {
      if (!box) return [];
      return Array.prototype.filter.call(
        box.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])'),
        function (el) { return el.getClientRects().length > 0; }
      );
    }
    document.addEventListener("keydown", function (event) {
      var openBox = null;
      if (side && side.classList.contains("is-open")) openBox = side;
      else if (sortSheet && sortSheet.classList.contains("is-open")) openBox = sortSheet;
      if (event.key === "Escape") {
        if (openBox) closeSheets();
        return;
      }
      if (event.key !== "Tab" || !openBox) return;
      var items = sheetFocusables(openBox);
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });
    var mobile = window.matchMedia("(max-width: 860px)");
    if (mobile.addEventListener) mobile.addEventListener("change", function () {
      if (!mobile.matches) closeSheets();
    });
    var filterForm = root.querySelector("[data-bz-filter-form]");
    if (filterForm) {
      filterForm.querySelectorAll("[data-bz-range]").forEach(paintRange);
      filterForm.addEventListener("input", function (event) {
        var field = event.target;
        if (!field || field.type !== "range") return;
        paintRange(field);
      });
      filterForm.addEventListener("change", function (event) {
        var field = event.target;
        if (!field || !field.name) return;
        if (field.type === "range") {
          var rangeSheet = side && side.classList.contains("is-open") && mobile.matches;
          if (rangeSheet) return;
          ensurePreview(filterForm);
          filterForm.submit();
          return;
        }
        if (field.type !== "checkbox") return;
        var sheetOpen = side && side.classList.contains("is-open") && mobile.matches;
        if (sheetOpen) return;
        ensurePreview(filterForm);
        filterForm.submit();
      });
      filterForm.addEventListener("submit", function () {
        ensurePreview(filterForm);
        closeSheets();
      });
    }
    root.querySelectorAll("[data-bz-clear]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href) link.setAttribute("href", withPreview(href));
    });
    root.querySelectorAll("[data-bz-sort-link]").forEach(function (link) {
      var href = link.getAttribute("href");
      if (href) link.setAttribute("href", withPreview(href));
      link.addEventListener("click", function (event) {
        var key = link.getAttribute("data-sort");
        if (!key) return;
        event.preventDefault();
        var url = new URL(window.location.href);
        url.searchParams.set("sort_by", key);
        url.searchParams.delete("page");
        window.location.assign(url.toString());
      });
    });
    var more = root.querySelector("[data-bz-more]");
    if (more && grid) {
      var loading = false;
      more.addEventListener("click", function () {
        if (loading || more.hidden) return;
        var raw = more.getAttribute("data-url");
        if (!raw) {
          more.hidden = true;
          return;
        }
        loading = true;
        fetch(withPreview(raw)).then(function (response) {
          if (!response.ok) throw new Error("load");
          return response.text();
        }).then(function (html) {
          var doc = new DOMParser().parseFromString(html, "text/html");
          doc.querySelectorAll("[data-bz-item]").forEach(function (node) { grid.appendChild(node); });
          var seen = root.querySelector("[data-bz-seen]");
          var total = root.querySelector("[data-bz-total]");
          var bar = root.querySelector("[data-bz-bar]");
          var nextSeen = doc.querySelector("[data-bz-seen]");
          var nextTotal = doc.querySelector("[data-bz-total]");
          var nextBar = doc.querySelector("[data-bz-bar]");
          if (seen && nextSeen) seen.textContent = nextSeen.textContent.trim();
          if (total && nextTotal) total.textContent = nextTotal.textContent.trim();
          if (bar && nextBar) {
            var width = nextBar.getAttribute("data-width") || "0";
            bar.style.width = width + "%";
            bar.setAttribute("data-width", width);
          }
          var next = doc.querySelector("[data-bz-more]");
          if (next && next.getAttribute("data-url")) more.setAttribute("data-url", next.getAttribute("data-url"));
          else more.hidden = true;
          loading = false;
        }).catch(function () {
          loading = false;
        });
      });
    }
    var sort = root.querySelector("[data-bz-sort]");
    if (sort) sort.addEventListener("change", function () {
      var url = new URL(window.location.href);
      url.searchParams.set("sort_by", sort.value);
      window.location.assign(url.toString());
    });
  });
})();
