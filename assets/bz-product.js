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
    var mainAdd = root.querySelector("[data-bz-atc] button[type='submit']");
    var sticky = root.querySelector(".bz-sticky");
    if (mainAdd && sticky && "IntersectionObserver" in window) {
      var mobile = window.matchMedia("(max-width: 860px)");
      function updateSticky() {
        var show = mobile.matches && mainAdd.getBoundingClientRect().bottom <= 0;
        sticky.classList.toggle("is-on", show);
        sticky.toggleAttribute("inert", !show);
      }

      new IntersectionObserver(updateSticky).observe(mainAdd);
      var stickyFrame;
      window.addEventListener("scroll", function () {
        if (!mobile.matches) return;
        cancelAnimationFrame(stickyFrame);
        stickyFrame = requestAnimationFrame(updateSticky);
      }, { passive: true });
      mobile.addEventListener("change", updateSticky);
      updateSticky();
    }
    root.querySelectorAll("[data-bz-open]").forEach(function (box) {
      var text = box.querySelector("p");
      var button = box.querySelector("[data-bz-more-copy]");
      if (!text || !button) return;
      if (text.scrollHeight <= text.clientHeight + 2) {
        button.hidden = true;
        return;
      }
      button.addEventListener("click", function () {
        box.classList.add("is-open");
        button.hidden = true;
      });
    });
    root.querySelectorAll("[data-bz-variant]").forEach(function (radio) {
      radio.addEventListener("change", function () {
        var stickyId = root.querySelector(".bz-sticky input[name='id']");
        var stickyButton = root.querySelector(".bz-sticky button");
        if (stickyId) stickyId.value = radio.value;
        if (stickyButton) {
          stickyButton.disabled = radio.disabled;
          stickyButton.textContent = radio.disabled ? "Esaurito" : "Aggiungi";
        }
        var priceNode = root.querySelector("[data-bz-price]");
        var cents = Number(radio.getAttribute("data-bz-variant"));
        if (priceNode && cents > 0) {
          var euros = Math.floor(cents / 100);
          var rest = String(cents % 100).padStart(2, "0");
          var grouped = String(euros).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          priceNode.textContent = grouped + "," + rest + "\u00a0€";
        }
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
