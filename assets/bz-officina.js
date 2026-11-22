(() => {
  function init(section) {
    if (section.hasAttribute('data-officina-ready')) return;
    section.setAttribute('data-officina-ready', '');

    const tablist = section.querySelector('[role="tablist"]');
    const tabs = [...tablist.querySelectorAll('[role="tab"]')];
    const panel = section.querySelector('[role="tabpanel"]');
    const stage = section.querySelector('.bz-officina-stage');
    const scene = section.querySelector('.bz-officina-scene');
    const heading = section.querySelector('.bz-officina-cap h3 a');
    const caption = section.querySelector('.bz-officina-cap p');
    const products = section.querySelector('.bz-officina-prods');
    const templates = section.querySelectorAll('template[data-officina-products]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let active = 0;
    let fade;
    let swipe;

    function changeScene(tab) {
      const { scene: src, alt } = tab.dataset;
      const next = new Image();
      next.src = src;

      function showScene() {
        if (tabs[active] !== tab) return;

        fade?.cancel();
        if (!reducedMotion.matches && scene.naturalWidth && next.naturalWidth &&
            scene.getAttribute('src') !== src) {
          const outgoing = scene.cloneNode();
          outgoing.classList.add('bz-officina-scene--outgoing');
          outgoing.alt = '';
          outgoing.setAttribute('aria-hidden', 'true');
          scene.after(outgoing);
          fade = outgoing.animate([{ opacity: 1 }, { opacity: 0 }], 240);
          fade.onfinish = fade.oncancel = () => outgoing.remove();
        }
        scene.src = src;
        scene.alt = alt;
      }

      if (reducedMotion.matches) {
        showScene();
      } else {
        next.decode().then(showScene, showScene);
      }
    }

    function selectChapter(index, focusTab = false) {
      const selected = (index + tabs.length) % tabs.length;
      const tab = tabs[selected];
      if (selected !== active) {
        active = selected;
        tabs.forEach((item, i) => {
          item.setAttribute('aria-selected', String(i === active));
          item.tabIndex = i === active ? 0 : -1;
        });
        panel.setAttribute('aria-labelledby', tab.id);
        section.style.setProperty('--officina-veil', tab.dataset.veil);
        heading.textContent = tab.textContent;
        if (tab.dataset.collectionUrl) {
          heading.href = tab.dataset.collectionUrl;
        } else {
          heading.removeAttribute('href');
        }
        caption.textContent = tab.dataset.caption;
        products.replaceChildren(templates[active].content.cloneNode(true));
        products.scrollLeft = 0;
        changeScene(tab);
      }
      if (focusTab) tab.focus();
    }

    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectChapter(index));
      tab.addEventListener('shopify:block:select', () => selectChapter(index));
    });

    tablist.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      selectChapter(active + (event.key === 'ArrowLeft' ? -1 : 1), true);
    });

    stage.addEventListener('pointerdown', (event) => {
      if (!event.isPrimary || event.button !== 0 || event.target.closest('a')) return;
      swipe = { id: event.pointerId, x: event.clientX, y: event.clientY };
      stage.setPointerCapture(event.pointerId);
    });

    stage.addEventListener('pointerup', (event) => {
      if (swipe?.id !== event.pointerId) return;
      const dx = event.clientX - swipe.x;
      const dy = event.clientY - swipe.y;
      swipe = null;
      if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) {
        selectChapter(active + (dx < 0 ? 1 : -1));
      }
    });

    stage.addEventListener('lostpointercapture', (event) => {
      if (swipe?.id === event.pointerId) swipe = null;
    });
  }

  const selector = '[data-bz-officina]';
  document.querySelectorAll(selector).forEach(init);
  document.addEventListener('shopify:section:load', (event) => {
    event.target.querySelectorAll(selector).forEach(init);
  });
})();
