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

  document.querySelectorAll("[data-bz-coll]").forEach(function (root) {
    var grid = root.querySelector("[data-bz-grid]");
    root.querySelectorAll("[data-bz-view]").forEach(function (button) {
      button.addEventListener("click", function () {
        root.querySelectorAll("[data-bz-view]").forEach(function (item) { item.classList.toggle("is-on", item === button); });
        if (grid) grid.classList.toggle("is-list", button.getAttribute("data-bz-view") === "list");
      });
    });
    var side = root.querySelector("[data-bz-side]");
    if (side) {
      root.querySelectorAll("[data-bz-open-filters]").forEach(function (opener) {
        opener.addEventListener("click", function () {
          side.classList.toggle("is-open");
        });
      });
      side.querySelectorAll("[data-bz-close-filters]").forEach(function (closer) {
        closer.addEventListener("click", function () {
          side.classList.remove("is-open");
        });
      });
    }
    var filterForm = root.querySelector("[data-bz-filter-form]");
    if (filterForm) {
      filterForm.addEventListener("change", function (event) {
        var field = event.target;
        if (!field || !field.name) return;
        if (field.type !== "checkbox" && field.type !== "range") return;
        var preview = "";
        try {
          preview = new URL(window.location.href).searchParams.get("preview_theme_id") || "";
        } catch (error) {
          preview = "";
        }
        if (preview && !filterForm.querySelector('input[name="preview_theme_id"]')) {
          var hidden = document.createElement("input");
          hidden.type = "hidden";
          hidden.name = "preview_theme_id";
          hidden.value = preview;
          filterForm.appendChild(hidden);
        }
        filterForm.submit();
      });
    }
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
