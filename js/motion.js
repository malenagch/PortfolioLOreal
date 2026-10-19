/* Animaciones de la página: revelados al hacer scroll, títulos palabra por
   palabra, imágenes que se descubren, parallax suave y barra de progreso.
   Todo se desactiva con "reducir movimiento". Sin dependencias. */
(function () {
  'use strict';

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const root = document.documentElement;

  /* ───────────── Títulos palabra por palabra ───────────── */
  $$('.sec-title, .hero__lead, .contact__title, .focus__title, .split__h').forEach((el) => {
    if (el.children.length) return; // solo títulos de texto plano
    const words = el.textContent.trim().split(/\s+/);
    const esc = (t) => t.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
    el.innerHTML = words.map((w, i) => '<span class="w"><span style="--i:' + i + '">' + esc(w) + '</span></span>').join(' ');
    el.classList.add('split-words');
  });

  /* ───────────── Revelados en cascada ───────────── */
  const groups = [
    '.crumb', '.sec-sub', '.split__body', '.hero__ctas',
    '.stats li', '.sd__roles li', '.trend', '.sd__reels-head', '.reels', '.amada__head', '.amada__status',
    '.tl__item', '.beauty', '.grid3 > .tile', '.skill-list li', '.tools > div', '.edu__item',
    '.contact__sub', '.contact__links li', '.foot__row', '.focus__on', '.focus__tag', '.focus .pill', '.focus__foot',
    '.show__main', '.show__nav'
  ];
  const rv = [];
  groups.forEach((sel) => {
    $$(sel).forEach((el) => {
      if (el.classList.contains('reveal')) return;
      // escalonado entre hermanos del mismo grupo
      const sibs = el.parentElement ? Array.from(el.parentElement.children).filter((c) => c.matches(sel)) : [el];
      const k = Math.max(0, sibs.indexOf(el));
      el.style.setProperty('--d', Math.min(k, 8) * 70 + 'ms');
      el.classList.add('rv');
      rv.push(el);
    });
  });

  /* Imágenes que se descubren */
  const imgs = $$('.tile__img, .focus');
  imgs.forEach((el) => el.classList.add('img-rv'));

  /* Líneas que se dibujan */
  const lines = $$('.stats, .tl, .skill-list, .sd__roles');
  lines.forEach((el) => el.classList.add('draw'));

  const targets = rv.concat($$('.split-words'), imgs, lines);
  if (reduced || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
  } else {
    // Un elemento recortado por completo (clip-path) no cuenta como visible para
    // IntersectionObserver: para las imágenes y lo que contienen se observa el contenedor.
    const proxies = new Map();
    targets.forEach((el) => {
      const clipped = el.closest('.img-rv');
      const watch = clipped ? clipped.parentElement : el;
      if (!proxies.has(watch)) proxies.set(watch, []);
      proxies.get(watch).push(el);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        (proxies.get(en.target) || []).forEach((el) => el.classList.add('is-in'));
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    proxies.forEach((_, el) => io.observe(el));
  }

  /* ───────────── Scroll: progreso, parallax y hero ───────────── */
  const top = document.querySelector('.top');
  const band = document.querySelector('.hero__band');
  const heroVideo = document.querySelector('.hero__video');
  const heroTitle = document.querySelector('.hero__title');
  const focus = document.querySelector('.focus');
  const focusImg = document.querySelector('.focus__img');
  let ticking = false;

  function frame() {
    ticking = false;
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = Math.max(1, root.scrollHeight - vh);
    if (top) top.style.setProperty('--p', Math.min(1, y / max).toFixed(4));
    if (reduced) return;

    if (band && heroVideo) {
      const h = band.offsetHeight;
      if (y < h) {
        heroVideo.style.translate = '0 ' + (y * 0.28).toFixed(1) + 'px';
        if (heroTitle) {
          heroTitle.style.opacity = String(Math.max(0, 1 - y / (h * 0.7)).toFixed(3));
          heroTitle.style.translate = '0 ' + (y * -0.12).toFixed(1) + 'px';
        }
      }
    }
    if (focus && focusImg) {
      const r = focus.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh) {
        const prog = (r.top + r.height / 2 - vh / 2) / (vh + r.height); // -0.5 … 0.5
        focusImg.style.translate = '0 ' + (prog * -90).toFixed(1) + 'px';
      }
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  frame();
})();
