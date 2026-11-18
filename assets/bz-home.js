(function () {
  if (window.bzHomeReady) return;
  window.bzHomeReady = true;

  document.querySelectorAll("[data-bz-seg]").forEach(function (seg) {
    var knob = seg.querySelector("[data-bz-knob]");
    var buttons = seg.querySelectorAll("button");
    var root = seg.closest("[data-bz-picked]");

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
    return grouped + "," + rest + "\u00a0€";
  }

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
    document.querySelectorAll("[data-bz-complementary]").forEach(function (node) {
      var raw = node.getAttribute("data-url");
      if (!raw) return;
      var url = raw;
      try {
        var preview = new URL(window.location.href).searchParams.get("preview_theme_id") || "";
        if (preview) {
          var next = new URL(raw, window.location.origin);
          next.searchParams.set("preview_theme_id", preview);
          url = next.pathname + next.search;
        }
      } catch (error) {
        url = raw;
      }
      fetch(url)
        .then(function (response) {
          if (!response.ok) throw new Error("recommendations");
          return response.text();
        })
        .then(function (html) {
          if (node.hasAttribute("data-ritual-interacted") || node.matches(":focus-within")) return;
          var doc = new DOMParser().parseFromString(html, "text/html");
          var nextSet = doc.querySelector("[data-bz-ritual]");
          if (nextSet && nextSet.querySelector("input[data-variant]")) {
            nextSet.removeAttribute("data-bz-complementary");
            node.replaceWith(nextSet);
          } else if (!node.querySelector("input[data-variant]")) {
            node.remove();
          }
        })
        .catch(function () {
          if (!node.querySelector("input[data-variant]")) node.remove();
        });
    });
  }

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
