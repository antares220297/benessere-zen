(function () {
  document.querySelectorAll("[data-bz-product]").forEach(function (root) {
    var stage = root.querySelector("#BzStage");
    var frame = root.querySelector("[data-bz-frame]");
    var thumbs = root.querySelectorAll("[data-bz-thumb]");
    thumbs.forEach(function (button) {
      button.addEventListener("click", function () {
        thumbs.forEach(function (item) {
          item.classList.toggle("is-on", item === button);
        });
        var full = button.getAttribute("data-full");
        if (stage && full) {
          stage.removeAttribute("srcset");
          stage.removeAttribute("sizes");
          stage.src = full;
        }
        var thumbImage = button.querySelector("img");
        if (stage && thumbImage) stage.alt = thumbImage.alt || "";
        if (frame) {
          frame.textContent = button.getAttribute("data-bz-thumb") + " / " + String(thumbs.length);
        }
      });
    });
    var bar = root.querySelector("[data-bz-atc]");
    var sticky = root.querySelector(".bz-sticky");
    if (bar && sticky && "IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        sticky.classList.toggle("is-on", !entries[0].isIntersecting);
      }, { threshold: 0.2 }).observe(bar);
    }
    root.querySelectorAll("[data-bz-qty]").forEach(function (button) {
      button.addEventListener("click", function () {
        var input = root.querySelector("input[name='quantity']");
        if (!input) return;
        var next = Math.max(1, Number(input.value || 1) + Number(button.getAttribute("data-bz-qty")));
        input.value = String(next);
      });
    });
  });
})();
