(function () {
  document.querySelectorAll("[data-bz-coll]").forEach(function (root) {
    var items = Array.prototype.slice.call(root.querySelectorAll("[data-bz-item]"));
    var grid = root.querySelector("[data-bz-grid]");
    function apply() {
      var q = (root.querySelector("[data-bz-q]").value || "").toLowerCase();
      var types = Array.prototype.map.call(root.querySelectorAll("[data-bz-type]:checked"), function (box) { return box.value; });
      var stock = root.querySelector("[data-bz-stock]").checked;
      var sort = root.querySelector("[data-bz-sort]").value;
      var visible = items.filter(function (item) {
        var title = item.getAttribute("data-title") || "";
        var type = item.getAttribute("data-type") || "";
        var ok = !q || title.indexOf(q) !== -1;
        if (types.length) ok = ok && types.indexOf(type) !== -1;
        if (stock) ok = ok && item.getAttribute("data-available") === "true";
        item.hidden = !ok;
        return ok;
      });
      visible.sort(function (a, b) {
        if (sort === "price-asc" || sort === "price-desc") {
          var diff = Number(a.getAttribute("data-price")) - Number(b.getAttribute("data-price"));
          return sort === "price-asc" ? diff : -diff;
        }
        if (sort === "title") return (a.getAttribute("data-title") || "").localeCompare(b.getAttribute("data-title") || "");
        return 0;
      });
      visible.forEach(function (item) { grid.appendChild(item); });
      var count = root.querySelector("[data-bz-count]");
      if (count) count.textContent = visible.length + " pezzi";
    }
    root.addEventListener("input", apply);
    root.addEventListener("change", apply);
    var opener = root.querySelector("[data-bz-open-filters]");
    if (opener) opener.addEventListener("click", function () {
      root.querySelector("[data-bz-side]").classList.toggle("is-open");
    });
  });
})();
