(function () {
  document.querySelectorAll("[data-bz-coll]").forEach(function (root) {
    var grid = root.querySelector("[data-bz-grid]");
    var search = root.querySelector("[data-bz-q]");
    function filterCards() {
      var q = (search && search.value || "").toLowerCase();
      var types = Array.prototype.map.call(root.querySelectorAll("[data-bz-type]:checked"), function (box) { return box.value; });
      var min = root.querySelector("[data-bz-price='min']");
      var max = root.querySelector("[data-bz-price='max']");
      var shown = 0;
      root.querySelectorAll("[data-bz-item]").forEach(function (item) {
        var title = item.getAttribute("data-title") || "";
        var type = item.getAttribute("data-type") || "";
        var price = Number(item.getAttribute("data-price") || 0);
        var ok = !q || title.indexOf(q) !== -1;
        if (types.length) ok = ok && types.indexOf(type) !== -1;
        if (min) ok = ok && price >= Number(min.value);
        if (max) ok = ok && price <= Number(max.value);
        item.hidden = !ok;
        if (ok) shown += 1;
      });
      var count = root.querySelector("[data-bz-count]");
      if (count && q) count.textContent = String(shown);
    }
    if (search) search.addEventListener("input", filterCards);
    root.querySelectorAll("[data-bz-view]").forEach(function (button) {
      button.addEventListener("click", function () {
        root.querySelectorAll("[data-bz-view]").forEach(function (item) { item.classList.toggle("is-on", item === button); });
        grid.classList.toggle("is-list", button.getAttribute("data-bz-view") === "list");
      });
    });
    var opener = root.querySelector("[data-bz-open-filters]");
    var side = root.querySelector("[data-bz-side]");
    if (opener && side) opener.addEventListener("click", function () { side.classList.toggle("is-open"); });
    var more = root.querySelector("[data-bz-more]");
    if (more) more.addEventListener("click", function () {
      fetch(more.getAttribute("data-url")).then(function (response) { return response.text(); }).then(function (html) {
        var doc = new DOMParser().parseFromString(html, "text/html");
        doc.querySelectorAll("[data-bz-item], .bz-promo").forEach(function (node) { grid.appendChild(node); });
        var next = doc.querySelector("[data-bz-more]");
        if (next) more.setAttribute("data-url", next.getAttribute("data-url"));
        else more.hidden = true;
      });
    });
    var sort = root.querySelector("[data-bz-sort]");
    if (sort) sort.addEventListener("change", function () {
      var url = new URL(window.location.href);
      url.searchParams.set("sort_by", sort.value);
      window.location = url.toString();
    });
  });
})();
