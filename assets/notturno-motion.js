(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('js');

  if (!reduce) {
    var nodes = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window && nodes.length) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      }, { threshold: 0.15 });
      nodes.forEach(function (node) { observer.observe(node); });
    } else {
      nodes.forEach(function (node) { node.classList.add('is-in'); });
    }

    document.querySelectorAll('.nt-fill').forEach(function (bar) {
      requestAnimationFrame(function () { bar.classList.add('is-in'); });
    });
  }

  var header = document.getElementById('sticky-header-content');
  var lastY = 0;
  if (header) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY || 0;
      header.classList.toggle('nt-scrolled', y > 80);
      if (reduce) return;
      if (y > lastY && y > 120) header.classList.add('nt-header-hide');
      else header.classList.remove('nt-header-hide');
      lastY = y;
    }, { passive: true });
  }

  document.querySelectorAll('.nt-marquee-pause').forEach(function (button) {
    button.addEventListener('click', function () {
      var section = button.closest('.section-scroll-banner');
      if (!section) return;
      var paused = section.classList.toggle('is-paused');
      button.setAttribute('aria-pressed', paused ? 'true' : 'false');
      button.textContent = paused ? button.getAttribute('data-play') : button.getAttribute('data-pause');
    });
  });

  document.querySelectorAll('[data-nt-tabs]').forEach(function (root) {
    var tabs = root.querySelectorAll('[role="tab"]');
    var panels = root.querySelectorAll('[role="tabpanel"]');
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var id = tab.getAttribute('aria-controls');
        tabs.forEach(function (item) {
          item.setAttribute('aria-selected', item === tab ? 'true' : 'false');
        });
        panels.forEach(function (panel) {
          panel.hidden = panel.id !== id;
        });
      });
    });
  });

  var burger = document.getElementById('mobile-navigation');
  var shade = document.querySelector('.nt-drawer-shade');
  function closeNav() {
    document.documentElement.classList.remove('nt-nav-open');
  }
  if (burger) {
    burger.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopPropagation();
      document.documentElement.classList.toggle('nt-nav-open');
    }, true);
  }
  if (shade) shade.addEventListener('click', closeNav);
  document.querySelectorAll('[data-nt-close]').forEach(function (button) {
    button.addEventListener('click', closeNav);
  });
  document.querySelectorAll('[data-nt-sub]').forEach(function (button) {
    button.addEventListener('click', function () {
      var panel = document.getElementById(button.getAttribute('aria-controls'));
      if (!panel) return;
      var open = panel.classList.toggle('is-open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });

  document.addEventListener('eurus:cart:items-changed', function () {
    var bubble = document.getElementById('cart-icon-bubble');
    if (!bubble || reduce) return;
    bubble.classList.add('is-bump');
    window.setTimeout(function () { bubble.classList.remove('is-bump'); }, 200);
  });

  var guide = document.querySelector('[data-nt-guide]');
  if (guide) {
    guide.addEventListener('submit', function (event) {
      event.preventDefault();
      var data = new FormData(guide);
      var color = data.get('color') || '';
      var who = data.get('who') || '';
      var budget = data.get('budget') || '';
      var dest = guide.getAttribute('data-dest') || '/collections/all';
      var url = dest + (dest.indexOf('?') === -1 ? '?' : '&') + 'q=' + encodeURIComponent([color, who, budget].filter(Boolean).join(' '));
      window.location.assign(url);
    });
  }
})();
