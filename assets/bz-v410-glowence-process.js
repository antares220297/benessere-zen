(function () {
  function arm(root) {
    if (!root || root.getAttribute("data-bz-ready") === "true") return;
    root.setAttribute("data-bz-ready", "true");

    var buttons = root.querySelectorAll("button[aria-controls]");

    function select(btn) {
      var shotId = btn.getAttribute("data-bz-shot-id");
      buttons.forEach(function (other) {
        var on = other === btn;
        other.setAttribute("aria-expanded", on ? "true" : "false");
        var panel = document.getElementById(other.getAttribute("aria-controls"));
        if (!panel) return;
        if (on) panel.removeAttribute("hidden");
        else panel.setAttribute("hidden", "");
      });
      root.querySelectorAll("[data-bz-shot]").forEach(function (shot) {
        if (shot.getAttribute("data-bz-shot") === shotId) shot.removeAttribute("hidden");
        else shot.setAttribute("hidden", "");
      });
    }

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (btn.getAttribute("aria-expanded") === "true") return;
        select(btn);
      });
    });
  }

  function boot(scope) {
    var root = scope || document;
    root.querySelectorAll("[data-bz-process]").forEach(arm);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { boot(document); });
  } else {
    boot(document);
  }

  document.addEventListener("shopify:section:load", function (event) {
    if (!event.target || !event.target.querySelectorAll) return;
    boot(event.target);
  });
})();
