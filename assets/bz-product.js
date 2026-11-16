(function () {
  document.querySelectorAll("[data-bz-product]").forEach(function (root) {
    var stage = root.querySelector("#BzStage");
    root.querySelectorAll("[data-bz-thumb]").forEach(function (button) {
      button.addEventListener("click", function () {
        root.querySelectorAll("[data-bz-thumb]").forEach(function (item) {
          item.classList.toggle("is-on", item === button);
        });
        var image = button.querySelector("img");
        if (stage && image) stage.src = image.src;
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
