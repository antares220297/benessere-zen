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
    root.querySelectorAll("form[action*='cart']").forEach(function (form) {
      form.addEventListener("submit", function (event) {
        if (!window.fetch) return;
        event.preventDefault();
        var rootPath = (window.Shopify && Shopify.routes && Shopify.routes.root) || "/";
        fetch(rootPath + "cart/add.js", {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        }).then(function () {
          document.dispatchEvent(new CustomEvent("eurus:cart:items-changed"));
          var icon = document.getElementById("cart-icon");
          if (icon) icon.click();
        }).catch(function () { form.submit(); });
      });
    });
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
