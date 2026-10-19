/* Portfolio · comportamiento de la página. Sin dependencias. */
(function () {
  'use strict';

  const DATA = window.PORTFOLIO || { FEATURED: [], LAURA_REELS: [], DOCS: {} };
  const reduceMQ = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => reduceMQ.matches;
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const mmss = (t) => { const m = Math.floor(t / 60), s = Math.floor(t % 60); return m + ':' + String(s).padStart(2, '0'); };
  const pad2 = (n) => String(n).padStart(2, '0');

  /* Lleva un <video> a un tiempo y lo reproduce, aunque todavía no haya cargado. */
  function seekAndPlay(video, t) {
    const go = () => { try { video.currentTime = t; } catch (e) { /* noop */ } video.play().catch(() => {}); };
    if (video.readyState >= 1) { go(); return; }
    video.addEventListener('loadedmetadata', go, { once: true });
    video.preload = 'auto';
    video.load();
  }

  function pauseAll(except) {
    $$('video').forEach((v) => { if (v !== except && !v.classList.contains('hero__video')) v.pause(); });
  }

  /* ───────────── Header ───────────── */
  const top = $('.top');
  const toggle = $('.top__toggle');
  const menu = $('#menu');
  const onScroll = () => top.classList.toggle('is-solid', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr').textContent = open ? 'Cerrar menú' : 'Abrir menú';
    menu.classList.toggle('is-open', open);
    top.classList.toggle('is-open', open);
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => { if (e.target.closest('a, button')) setMenu(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { setMenu(false); toggle.focus(); } });

  // Sección activa en la navegación
  const navLinks = $$('.top__nav a[href^="#"]');
  if ('IntersectionObserver' in window) {
    const byId = new Map(navLinks.map((a) => [a.getAttribute('href').slice(1), a]));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        navLinks.forEach((a) => a.removeAttribute('aria-current'));
        const a = byId.get(en.target.id);
        if (a) a.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    byId.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  /* ───────────── Hero ───────────── */
  // Splash de entrada: se muestra una vez por sesión, se puede saltear con un clic
  // o una tecla, y la entrada del hero espera a que termine.
  const startHero = () => document.body.classList.add('is-loaded');
  const splash = document.getElementById('splash');
  if (splash && !document.documentElement.classList.contains('no-splash')) {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      splash.classList.add('is-done');
      setTimeout(() => { splash.remove(); startHero(); }, reduced() ? 50 : 650);
      document.removeEventListener('keydown', finish);
    };
    setTimeout(finish, reduced() ? 1400 : 2600);
    splash.addEventListener('click', finish);
    document.addEventListener('keydown', finish);
  } else {
    if (splash) splash.remove();
    requestAnimationFrame(startHero);
  }

  const heroVideo = $('.hero__video');
  const heroBtn = $('.hero__motion');
  let heroPausedByUser = reduced();
  let heroVisible = true;

  function syncHero() {
    if (!heroVideo) return;
    const shouldPlay = !heroPausedByUser && heroVisible && !document.hidden;
    if (shouldPlay) {
      if (heroVideo.preload === 'none') heroVideo.preload = 'auto';
      heroVideo.play().catch(() => {});
    } else {
      heroVideo.pause();
    }
    heroBtn.setAttribute('aria-pressed', String(heroPausedByUser));
    heroBtn.querySelector('.sr').textContent = heroPausedByUser ? 'Reproducir animación de fondo' : 'Pausar animación de fondo';
  }
  if (heroVideo) {
    heroBtn.addEventListener('click', () => { heroPausedByUser = !heroPausedByUser; syncHero(); });
    reduceMQ.addEventListener && reduceMQ.addEventListener('change', () => { heroPausedByUser = reduced(); syncHero(); });
    document.addEventListener('visibilitychange', syncHero);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; syncHero(); }, { threshold: 0.15 }).observe(heroVideo);
    } else { syncHero(); }
  }

  // Leve desplazamiento del cuadro con el puntero (solo mouse, sin movimiento reducido)
  const parallax = $('[data-parallax]');
  const hero = $('.hero');
  if (parallax && window.matchMedia('(pointer: fine)').matches) {
    let raf = 0;
    hero.addEventListener('pointermove', (e) => {
      if (reduced()) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = hero.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        parallax.style.transform = 'translate3d(' + (x * -14).toFixed(1) + 'px,' + (y * -10).toFixed(1) + 'px,0)';
      });
    });
    hero.addEventListener('pointerleave', () => { parallax.style.transform = ''; });
    parallax.style.transition = 'transform 900ms cubic-bezier(.22,1,.36,1)';
  }

  /* ───────────── Revelado al scroll ───────────── */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduced()) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-in'));
  }

  /* ───────────── Visor (videos, PDF, sitios) ───────────── */
  const viewer = $('[data-viewer]');
  const vKind = $('[data-viewer-kind]');
  const vTitle = $('[data-viewer-title]');
  const vBody = $('[data-viewer-body]');
  const vOpen = $('[data-viewer-open]');
  const vFoot = $('[data-viewer-foot]');
  const vDownload = $('[data-viewer-download]');
  let onViewerClose = null;
  let lastFocus = null;

  function showViewer() {
    lastFocus = document.activeElement;
    if (typeof viewer.showModal === 'function') viewer.showModal();
    else viewer.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeViewer() {
    if (onViewerClose) { try { onViewerClose(); } catch (e) { /* noop */ } onViewerClose = null; }
    if (viewer.open && typeof viewer.close === 'function') viewer.close();
    else viewer.removeAttribute('open');
  }
  viewer.addEventListener('close', () => {
    if (onViewerClose) { try { onViewerClose(); } catch (e) { /* noop */ } onViewerClose = null; }
    vBody.innerHTML = '';
    document.documentElement.style.overflow = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  });
  $('[data-viewer-close]').addEventListener('click', closeViewer);
  viewer.addEventListener('click', (e) => { if (e.target === viewer) closeViewer(); });

  function setHeader(kind, title, openHref) {
    vKind.textContent = kind || '';
    vTitle.textContent = title || '';
    if (openHref) { vOpen.href = openHref; vOpen.hidden = false; } else { vOpen.removeAttribute('href'); vOpen.hidden = true; }
  }

  function videoMarkup(v, title, cls) {
    return '<video ' + (cls ? 'class="' + cls + '" ' : '') + 'controls playsinline preload="metadata" poster="' + esc(v.poster || '') + '" width="' + v.w + '" height="' + v.h + '" aria-label="' + esc(title) + '">' +
      '<source src="' + esc(v.src) + '" type="video/mp4">' +
      '<p>Tu navegador no puede reproducir este video. <a href="' + esc(v.src) + '" download>Descargalo acá</a>.</p></video>';
  }

  function attachVideoFallback(video, holder, src) {
    const fail = () => {
      if (holder.querySelector('.slide__err')) { holder.closest('.slide') ? holder.closest('.slide').classList.add('has-error') : holder.querySelector('.slide__err').style.display = 'flex'; return; }
      const d = document.createElement('div');
      d.className = 'slide__err'; d.style.display = 'flex';
      d.innerHTML = '<p>No se pudo reproducir el video.</p><a href="' + esc(src) + '" download>Descargar el archivo</a>';
      holder.appendChild(d);
    };
    video.addEventListener('error', fail, true);
    const source = video.querySelector('source');
    if (source) source.addEventListener('error', fail);
  }

  /* Abre un video en grande. `from` es el video del carrusel, para sincronizar el tiempo. */
  function openVideo(item, from) {
    const v = item.video;
    pauseAll();
    setHeader(item.label || item.brand || '', item.title, v.src);
    vFoot.hidden = true;
    vBody.innerHTML = videoMarkup(v, item.title);
    const big = vBody.querySelector('video');
    attachVideoFallback(big, vBody, v.src);
    showViewer();
    const t = from && from.currentTime ? from.currentTime : 0;
    seekAndPlay(big, t);
    onViewerClose = () => {
      if (from && big.currentTime) { try { from.currentTime = big.currentTime; } catch (e) { /* noop */ } }
      big.pause();
    };
  }

  function openDoc(key) {
    const d = DATA.DOCS[key];
    if (!d) return;
    pauseAll();
    vFoot.hidden = true;
    if (!d.src) {
      setHeader(d.kind, d.title, null);
      vBody.innerHTML = '<div class="viewer__pending"><p class="kicker">Título en trámite</p><p>' + esc(d.hint) + '</p></div>';
    } else if (d.external) {
      setHeader(d.kind, d.title, d.src);
      vBody.innerHTML = '<div class="viewer__ext" style="--shot:url(\'' + esc(d.shot || '') + '\')"><p>' + esc(d.hint) + '</p>' +
        '<a class="btn btn--light" href="' + esc(d.src) + '" target="_blank" rel="noopener">Abrir el sitio ↗</a></div>';
    } else {
      setHeader(d.kind, d.title, d.src);
      const src = d.pdf ? d.src + '#view=FitH&navpanes=0' : d.src;
      vBody.innerHTML = '<iframe src="' + esc(src) + '" title="' + esc(d.title) + '" loading="lazy"></iframe>';
      if (d.pdf) { vFoot.hidden = false; vDownload.href = d.src; }
    }
    showViewer();
  }

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-doc]');
    if (b) { e.preventDefault(); openDoc(b.getAttribute('data-doc')); }
  });

  /* ───────────── Carrusel de trabajo seleccionado ───────────── */
  const reels = DATA.LAURA_REELS || [];
  const readyReels = reels.filter((r) => r.src);
  const items = DATA.FEATURED.slice();
  readyReels.forEach((r, i) => items.push({
    id: r.id,
    title: r.title || 'Video vertical ' + pad2(i + 1),
    brand: 'Sin Desperdicio · Laura Di Cola',
    label: 'Contenido vertical · con Laura Di Cola',
    tag: 'Trabajo profesional',
    format: 'Video vertical 9:16',
    video: { src: r.src, poster: r.poster || '', w: r.w || 1080, h: r.h || 1920 },
    thumb: r.poster || '',
    blocks: r.note ? [{ h: 'La pieza', p: r.note }] : []
  }));
  const show = $('[data-showcase]');
  if (show && items.length) {
    const stage = $('[data-stage]', show);
    const info = $('[data-info]', show);
    const index = $('[data-index]', show);
    const count = $('[data-count]', show);
    const total = items.length;
    let current = 0;
    let tick = null;

    index.style.setProperty('--n', total);

    // Escenario: una diapositiva por proyecto
    stage.innerHTML = items.map((it, i) => {
      const lbl = (i + 1) + ' de ' + total + ': ' + it.title;
      if (it.slot) {
        return '<div class="slide" role="group" aria-roledescription="diapositiva" aria-label="' + esc(lbl) + '" data-i="' + i + '">' +
          '<div class="slot" aria-hidden="true">' +
          '<div class="slot__frame"><span>9:16</span><b>01</b></div>' +
          '<div class="slot__frame"><span>Próximamente</span><b>02</b></div>' +
          '<div class="slot__frame"><span>9:16</span><b>03</b></div>' +
          '</div></div>';
      }
      const v = it.video;
      const vertical = v.h > v.w;
      return '<div class="slide" role="group" aria-roledescription="diapositiva" aria-label="' + esc(lbl) + '" data-i="' + i + '">' +
        '<div class="slide__media ' + (vertical ? 'slide__media--v' : 'slide__media--h') + '" style="--r:' + (v.w / v.h).toFixed(4) + '">' +
        '<video controls playsinline preload="none" poster="' + esc(v.poster) + '" width="' + v.w + '" height="' + v.h + '" aria-label="' + esc(it.title) + '">' +
        '<source src="' + esc(v.src) + '" type="video/mp4">' +
        '<p>Tu navegador no puede reproducir este video. <a href="' + esc(v.src) + '" download>Descargalo acá</a>.</p></video>' +
        '<div class="slide__err"><p>No se pudo reproducir el video.</p><a href="' + esc(v.src) + '" download>Descargar el archivo</a></div>' +
        '</div>' +
        '<button type="button" class="slide__expand" data-expand="' + i + '">Ver en grande <span aria-hidden="true">⤢</span></button>' +
        '</div>';
    }).join('');

    $$('.slide', stage).forEach((s) => {
      const v = $('video', s);
      if (!v) return;
      const src = $('source', v).getAttribute('src');
      attachVideoFallback(v, $('.slide__media', s), src);
      v.addEventListener('play', () => pauseAll(v));
    });

    // Índice con miniaturas
    index.innerHTML = items.map((it, i) => (
      '<li class="idx"><button type="button" data-go="' + i + '" aria-label="Ver ' + esc(it.title) + '">' +
      '<span class="idx__bar"></span>' +
      (it.slot
        ? '<span class="idx__thumb idx__thumb--slot" aria-hidden="true"><i></i><i></i><i></i></span>'
        : '<span class="idx__thumb"><img src="' + esc(it.thumb) + '" alt="" loading="lazy" width="320" height="180"></span>') +
      '<span class="idx__txt"><span class="idx__n">' + pad2(i + 1) + ' · ' + esc(it.slot ? 'Próximamente' : (it.tag || '')) + '</span>' +
      '<span class="idx__t">' + esc(it.title) + '</span></span>' +
      '</button></li>'
    )).join('');

    function renderInfo(it, i) {
      const blocks = (it.blocks || []).map((b) => (
        '<div class="info__block' + (/^Mi aporte/.test(b.h) ? ' info__block--mine' : '') + '"><h3>' + esc(b.h) + '</h3>' +
        (b.list ? '<ul>' + b.list.map((x) => '<li>' + esc(x) + '</li>').join('') + '</ul>' : '<p>' + esc(b.p) + '</p>') + '</div>'
      )).join('');

      const actions = it.slot
        ? '<a class="btn btn--line" href="#sin-desperdicio">Ir a Sin Desperdicio</a>'
        : '<button type="button" class="btn btn--light" data-play="' + i + '">Reproducir <span aria-hidden="true">▶</span></button>' +
          '<button type="button" class="btn btn--line" data-expand="' + i + '">Ver en grande</button>' +
          (it.docs || []).map((d) => '<button type="button" class="btn btn--line" data-doc="' + esc(d.key) + '">' + esc(d.label) + '</button>').join('');

      const chapters = it.chapters && it.chapters.length
        ? '<details class="chapters"' + (window.innerWidth > 960 ? ' open' : '') + '><summary>Capítulos de la presentación <span class="chapters__hint">· tocá uno para ir a esa parte</span></summary><ol>' +
          it.chapters.map((c) => '<li><button type="button" data-seek="' + c.t + '" aria-label="Ir a ' + esc(c.label) + ', ' + mmss(c.t) + '"><span class="chapters__play" aria-hidden="true"></span><time>' + mmss(c.t) + '</time><span>' + esc(c.label) + '</span></button></li>').join('') +
          '</ol></details>'
        : '';

      const frames = it.frames && it.frames.length
        ? '<div class="frames" aria-label="Fotogramas: tocá uno para ir a ese momento">' +
          it.frames.map((f) => '<button type="button" data-seek="' + f.t + '" aria-label="Ir a ' + esc(f.label) + ' (' + mmss(f.t) + ')"><img src="' + esc(f.img) + '" alt="" loading="lazy" width="720" height="405"><span>' + esc(f.label) + '</span></button>').join('') +
          '</div>'
        : '';

      info.innerHTML =
        '<div class="info">' +
          '<div class="info__top">' +
            '<p class="info__label"><span class="is-tag">' + esc(it.label) + '</span>' + (it.format ? '<span>' + esc(it.format) + '</span>' : '') + '</p>' +
            '<h3 class="info__title">' + esc(it.title) + '</h3>' +
            '<p class="info__brand">' + esc(it.brand) + '</p>' +
          '</div>' +
          '<div class="info__actions">' + actions + '</div>' +
          '<div class="info__blocks">' + blocks + '</div>' +
          frames + chapters +
        '</div>';
    }

    function currentVideo() { return $('.slide.is-active video', stage); }

    function trackChapters() {
      clearInterval(tick);
      const v = currentVideo();
      const btns = $$('.chapters button', info);
      if (!v || !btns.length) return;
      const update = () => {
        const t = v.currentTime;
        let k = -1;
        btns.forEach((b, j) => { if (parseFloat(b.dataset.seek) <= t + 0.25) k = j; });
        btns.forEach((b, j) => b.classList.toggle('is-current', j === k && t > 0));
      };
      v.ontimeupdate = update;
      update();
    }

    function goTo(i, focusIndex) {
      const prev = current;
      current = (i + total) % total;
      pauseAll();
      // Dirección del deslizamiento: la nueva diapositiva entra desde el lado hacia el que se navega
      const fwd = i > prev || (prev === total - 1 && current === 0 && i !== prev - 1);
      stage.style.setProperty('--dir', fwd ? 1 : -1);
      const incoming = $$('.slide', stage)[current];
      if (incoming && prev !== current && !reduced()) {
        incoming.style.transition = 'none';
        incoming.style.transform = 'translateX(' + (fwd ? 56 : -56) + 'px)';
        void incoming.offsetWidth;
        incoming.style.transition = '';
        incoming.style.transform = '';
      }
      $$('.slide', stage).forEach((s, j) => {
        const on = j === current;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', String(!on));
        if ('inert' in s) s.inert = !on;
      });
      $$('[data-go]', index).forEach((b, j) => {
        if (j === current) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current');
      });
      count.innerHTML = '<b>' + pad2(current + 1) + '</b> / ' + pad2(total);
      renderInfo(items[current], current);
      trackChapters();
      if (focusIndex) {
        const b = $$('[data-go]', index)[current];
        if (b) { b.focus({ preventScroll: true }); b.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: reduced() ? 'auto' : 'smooth' }); }
      }
    }

    $('[data-prev]', show).addEventListener('click', () => goTo(current - 1));
    $('[data-next]', show).addEventListener('click', () => goTo(current + 1));

    show.addEventListener('click', (e) => {
      const go = e.target.closest('[data-go]');
      if (go) { goTo(parseInt(go.dataset.go, 10)); return; }
      const ex = e.target.closest('[data-expand]');
      if (ex) { const k = parseInt(ex.dataset.expand, 10); openVideo(items[k], currentVideo()); return; }
      const pl = e.target.closest('[data-play]');
      if (pl) {
        const v = currentVideo();
        if (v) { seekAndPlay(v, v.currentTime || 0); if (window.innerWidth <= 960) stage.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' }); }
        return;
      }
      const sk = e.target.closest('[data-seek]');
      if (sk) {
        const v = currentVideo();
        if (v) { seekAndPlay(v, parseFloat(sk.dataset.seek)); if (window.innerWidth <= 960) stage.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' }); }
      }
    });

    // Flechas del teclado, salvo cuando el foco está en un video o en un control de texto
    show.addEventListener('keydown', (e) => {
      if (e.target.closest('video, input, textarea')) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1, !!e.target.closest('[data-go]')); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1, !!e.target.closest('[data-go]')); }
    });

    // Deslizar con el dedo sobre el área de información
    let sx = null, sy = null;
    info.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    info.addEventListener('touchend', (e) => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) goTo(current + (dx < 0 ? 1 : -1));
      sx = sy = null;
    }, { passive: true });

    goTo(0);

    // Accesos desde otras secciones
    document.addEventListener('click', (e) => {
      const b = e.target.closest('[data-play-featured]');
      if (!b) return;
      const k = items.findIndex((it) => it.id === b.dataset.playFeatured);
      if (k >= 0) openVideo(items[k], null);
    });
  }

  /* ───────────── Videos verticales en Sin Desperdicio ───────────── */
  const reelsBox = $('[data-reels]');
  if (reelsBox) {
    const slots = reels.length ? reels : [{}, {}, {}];
    reelsBox.innerHTML = slots.map((r, i) => {
      if (!r.src) {
        return '<div class="reel reel--empty"><span>9:16</span><span>' + (i === 1 ? 'Próximamente' : pad2(i + 1)) + '</span></div>';
      }
      const poster = r.poster
        ? '<img src="' + esc(r.poster) + '" alt="" loading="lazy" width="' + (r.w || 1080) + '" height="' + (r.h || 1920) + '">'
        : '<video muted playsinline preload="metadata" src="' + esc(r.src) + '#t=0.5" aria-hidden="true" tabindex="-1"></video>';
      return '<div class="reel"><button type="button" data-reel="' + i + '" aria-label="Ver ' + esc(r.title || 'video vertical ' + (i + 1)) + '">' + poster +
        '<span class="reel__play" aria-hidden="true">▶</span></button></div>';
    }).join('');
    const pending = reels.filter((r) => !r.src).length;
    const note = document.createElement('p');
    note.className = 'reels__note';
    note.textContent = pending === reels.length
      ? 'Acá van a estar dos o tres videos verticales que hice para Laura. Los estoy reuniendo.'
      : (pending ? 'Se suman más videos verticales en breve.' : '');
    if (note.textContent) reelsBox.after(note);

    reelsBox.addEventListener('click', (e) => {
      const b = e.target.closest('[data-reel]');
      if (!b) return;
      const r = reels[parseInt(b.dataset.reel, 10)];
      openVideo({ title: r.title || 'Video vertical', label: 'Sin Desperdicio · Laura Di Cola', video: { src: r.src, poster: r.poster || '', w: r.w || 1080, h: r.h || 1920 } }, null);
    });
  }

  /* ───────────── Recorrido (acordeón) ───────────── */
  const tl = $('[data-timeline]');
  if (tl) {
    const btns = $$('.tl__btn', tl);

    function setOpen(btn, open, animate) {
      const panel = document.getElementById(btn.getAttribute('aria-controls'));
      const item = btn.closest('.tl__item');
      btn.setAttribute('aria-expanded', String(open));
      item.classList.toggle('is-open', open);
      if (!animate || reduced()) {
        panel.hidden = !open;
        panel.style.height = '';
        return;
      }
      if (open) {
        panel.hidden = false;
        const h = panel.scrollHeight;
        panel.style.height = '0px';
        requestAnimationFrame(() => { panel.style.height = h + 'px'; });
        panel.addEventListener('transitionend', function done(ev) {
          if (ev.propertyName !== 'height') return;
          panel.style.height = ''; panel.removeEventListener('transitionend', done);
        });
      } else {
        panel.style.height = panel.scrollHeight + 'px';
        requestAnimationFrame(() => { panel.style.height = '0px'; });
        panel.addEventListener('transitionend', function done(ev) {
          if (ev.propertyName !== 'height') return;
          if (btn.getAttribute('aria-expanded') === 'false') panel.hidden = true;
          panel.style.height = ''; panel.removeEventListener('transitionend', done);
        });
      }
    }

    btns.forEach((b) => b.addEventListener('click', () => {
      const willOpen = b.getAttribute('aria-expanded') !== 'true';
      btns.forEach((o) => { if (o !== b && o.getAttribute('aria-expanded') === 'true') setOpen(o, false, true); });
      setOpen(b, willOpen, true);
    }));

    // Matrix abierto de entrada: es la experiencia más cercana al rol
    const matrix = $('[aria-controls="tl-matrix"]', tl);
    if (matrix) setOpen(matrix, true, false);
  }
})();
