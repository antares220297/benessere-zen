(function () {
  if (window.bzHomeReady) return;
  window.bzHomeReady = true;

  document.querySelectorAll("[data-bz-seg]").forEach(function (seg) {
    var knob = seg.querySelector("[data-bz-knob]");
    var buttons = seg.querySelectorAll("button");
    var root = seg.closest("[data-bz-picked], [data-bz-switch]");

    function place(button) {
      if (!knob || !button) return;
      knob.style.left = button.offsetLeft + "px";
      knob.style.width = button.offsetWidth + "px";
    }

    function show(button) {
      buttons.forEach(function (item) {
        var on = item === button;
        item.classList.toggle("is-on", on);
        item.setAttribute("aria-selected", on ? "true" : "false");
      });
      place(button);
      if (!root) return;
      root.querySelectorAll("[data-bz-pane]:not(button)").forEach(function (pane) {
        var on = pane.getAttribute("data-bz-pane") === button.getAttribute("data-bz-pane");
        pane.hidden = !on;
        pane.classList.toggle("is-on", on);
      });
      root.querySelectorAll("[data-bz-shot]").forEach(function (shot) {
        shot.hidden = shot.getAttribute("data-bz-shot") !== button.getAttribute("data-bz-pane");
      });
      if (window.bzSumSet) window.bzSumSet(root);
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () { show(button); });
    });
    place(seg.querySelector(".is-on") || buttons[0]);
    window.addEventListener("resize", function () {
      place(seg.querySelector(".is-on"));
    });
  });

  function money(cents) {
    var whole = Math.floor(cents / 100);
    var rest = String(cents % 100).padStart(2, "0");
    var grouped = String(whole).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return grouped + "," + rest + " €";
  }

  window.bzSumSet = function (root) {
    var pane = root.querySelector(".bz-pane.is-on");
    if (!pane) return;
    var total = 0;
    var count = 0;
    pane.querySelectorAll("input:checked").forEach(function (input) {
      total += Number(input.getAttribute("data-bz-price")) || 0;
      count += 1;
    });
    var countNode = root.querySelector("[data-bz-count]");
    var sumNode = root.querySelector("[data-bz-sum]");
    if (countNode) countNode.textContent = String(count);
    if (sumNode) sumNode.innerHTML = money(total);
  };

  document.querySelectorAll("[data-bz-switch]").forEach(function (root) {
    window.bzSumSet(root);
    root.addEventListener("change", function () { window.bzSumSet(root); });
  });

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-bz-add-set]");
    if (!button || !window.fetch) return;
    var root = button.closest("[data-bz-switch]");
    var pane = root && root.querySelector(".bz-pane.is-on");
    if (!pane) return;
    var items = [];
    pane.querySelectorAll("input:checked").forEach(function (input) {
      if (input.value) items.push({ id: Number(input.value), quantity: 1 });
    });
    if (!items.length) return;
    if (window.bzAddItems) window.bzAddItems(items);
  });

  document.addEventListener("click", function (event) {
    var chip = event.target.closest("[data-bz-filter]");
    if (!chip) return;
    var root = chip.closest("[data-bz-stones]");
    if (!root) return;
    var key = chip.getAttribute("data-bz-filter");
    root.querySelectorAll("[data-bz-filter]").forEach(function (item) {
      var on = item === chip;
      item.classList.toggle("is-on", on);
      item.setAttribute("aria-selected", on ? "true" : "false");
    });
    root.querySelectorAll("[data-bz-intent]").forEach(function (card) {
      var intent = card.getAttribute("data-bz-intent") || "";
      card.hidden = key !== "tutte" && intent !== key;
    });
  });

  if (window.fetch) {
    document.querySelectorAll("[data-bz-handle]").forEach(function (node) {
      var handle = node.getAttribute("data-bz-handle");
      if (!handle) return;
      var preview = "";
      try {
        preview = new URL(window.location.href).searchParams.get("preview_theme_id") || "";
      } catch (error) {
        preview = "";
      }
      var url = "/collections/" + encodeURIComponent(handle) + "?view=bz-min&sort_by=price-ascending";
      if (preview) url += "&preview_theme_id=" + encodeURIComponent(preview);
      fetch(url)
        .then(function (response) {
          if (!response.ok) throw new Error("fetch");
          return response.text();
        })
        .then(function (body) {
          var match = String(body).match(/id="BzMinPrice">(\d+)/);
          var cents = match ? parseInt(match[1], 10) : 0;
          if (!(cents > 0)) return;
          node.textContent = "da " + money(cents);
        })
        .catch(function () {});
    });
  }

})();
