(function () {
  if (window.bzV410MarqueeReady) return;
  window.bzV410MarqueeReady = true;

  function release(event) {
    event.currentTarget.classList.remove("is-paused");
  }

  function bind() {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var roots = document.querySelectorAll(".bz-v410-marquee");
    for (var i = 0; i < roots.length; i++) {
      var root = roots[i];
      if (root.getAttribute("data-bz-bound") === "1") continue;
      root.setAttribute("data-bz-bound", "1");
      if (reduce) {
        root.classList.add("is-reduced");
        continue;
      }
      root.addEventListener("pointerdown", function (event) {
        event.currentTarget.classList.add("is-paused");
      });
      root.addEventListener("pointerup", release);
      root.addEventListener("pointercancel", release);
      root.addEventListener("pointerleave", release);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
})();
