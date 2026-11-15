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
      root.querySelectorAll("[data-bz-pane]").forEach(function (pane) {
        pane.hidden = pane.getAttribute("data-bz-pane") !== button.getAttribute("data-bz-pane");
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

  document.addEventListener("submit", function (event) {
    var form = event.target.closest(".bz-card__form, .bz-hero__form");
    if (!form || !window.fetch) return;
    event.preventDefault();
    var data = new FormData(form);
    fetch((window.Shopify && Shopify.routes && Shopify.routes.root || "/") + "cart/add.js", {
      method: "POST",
      headers: { Accept: "application/json" },
      body: data
    }).then(function () {
      document.dispatchEvent(new CustomEvent("eurus:cart:items-changed"));
      var nativeCart = document.getElementById("cart-icon");
      if (nativeCart) nativeCart.click();
    }).catch(function () {
      form.submit();
    });
  });
})();
