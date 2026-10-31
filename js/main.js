/* ==========================================================
   El Águila y la Isla — interacción y animación
   GSAP + ScrollTrigger + Flip + Lenis
   ========================================================== */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE_POINTER = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const byId = Object.fromEntries(COLECCION.map(o => [o.id, o]));
  const SALA_NOMBRE = Object.fromEntries(SALAS.map(s => [s.num, s.titulo]));

  gsap.registerPlugin(ScrollTrigger, Flip);

  /* ----------------------------------------------------------
     1. Render de contenido dinámico
     ---------------------------------------------------------- */
  function renderSalas() {
    $('[data-salas]').innerHTML = SALAS.map(s => `
      <a href="#coleccion" class="sala" data-sala="${s.num}" data-cursor="Explorar">
        <div class="sala__frame" data-reveal>
          <div class="inner-scroll" data-inner-scroll>
            <img src="${IMG}${s.img}.webp" alt="${byId[s.img].titulo}" width="${byId[s.img].w}" height="${byId[s.img].h}" loading="lazy">
          </div>
          <div class="sala__alt"><img src="${IMG}${s.alt}.webp" alt="" loading="lazy"></div>
          <span class="sala__num">${s.num}</span>
        </div>
        <div class="sala__info">
          <h3 class="sala__title">${s.titulo}</h3>
          <span class="sala__years">${s.años}</span>
          <p class="sala__text">${s.texto}</p>
          <span class="sala__count">${COLECCION.filter(o => o.sala === s.num).length} piezas destacadas</span>
        </div>
      </a>`).join('');
  }

  const CARRUSEL = [
    ['reloj', 'canova', 'mascara', 'recamier', 'tuileries', 'arcole', 'josefina'],
    ['bicornio', 'sevres', 'trono-fontainebleau', 'moneda', 'gerard-sacre', 'campagne-1814', 'malmaison-biblioteca']
  ];
  const EXTRA = { 'malmaison-biblioteca': { titulo: 'Interior de Malmaison', fecha: 'c. 1800' } };

  function renderCarousels() {
    $$('[data-carousel]').forEach((el, i) => {
      const items = CARRUSEL[i].map(id => {
        const o = byId[id] || EXTRA[id];
        const clickable = byId[id] ? `data-open="${id}" data-cursor="Ver"` : '';
        return `<figure class="obj" ${clickable}>
          <div class="obj__img"><img src="${IMG}${id}.webp" alt="${o.titulo}" loading="lazy"></div>
          <figcaption class="obj__cap"><span>${o.titulo}</span><span>${o.fecha}</span></figcaption>
        </figure>`;
      }).join('');
      // duplicado para bucle infinito
      el.querySelector('.carousel__track').innerHTML = items + items;
    });
  }

  function renderGallery() {
    $('[data-gallery]').innerHTML = COLECCION.map(o => {
      const r = o.h / o.w;
      const cls = r > 1.25 ? 'is-tall' : (r < .72 ? 'is-wide' : '');
      return `<button class="card ${cls}" data-tipo="${o.tipo}" data-open="${o.id}" data-flip-id="${o.id}" data-cursor="Ver">
        <img src="${IMG}${o.id}.webp" alt="${o.titulo}" loading="lazy">
        <span class="card__cap"><strong>${o.titulo}</strong><span>${o.autor} · ${o.fecha}</span></span>
      </button>`;
    }).join('');

    // contadores en filtros
    $$('.filter').forEach(f => {
      const t = f.dataset.filter;
      f.querySelector('sup').textContent = t === 'todo' ? COLECCION.length : COLECCION.filter(o => o.tipo === t).length;
    });
  }

  function renderCredits() {
    $('#credits').innerHTML = CREDITOS.map(([txt, lic, url]) =>
      `<li>${txt} — <a href="${url}" target="_blank" rel="noopener">${lic}</a></li>`).join('');
  }

  renderSalas();
  renderCarousels();
  renderGallery();
  renderCredits();

  /* ----------------------------------------------------------
     2. Split de texto en caracteres
     ---------------------------------------------------------- */
  function splitChars(el) {
    if (el.dataset.splitted) return;
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w =>
      `<span class="word">${[...w].map(c => `<span class="char">${c}</span>`).join('')}</span>`
    ).join(' ');
    el.dataset.splitted = '1';
  }
  $$('.split').forEach(splitChars);

  // palabras del manifiesto
  $$('[data-words]').forEach(el => {
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.append(part);
            else { const s = document.createElement('span'); s.className = 'w'; s.textContent = part; frag.append(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(el);
  });

  /* ----------------------------------------------------------
     3. Smooth scroll (Lenis)
     ---------------------------------------------------------- */
  let lenis = null;
  let velocity = 0;
  if (!REDUCED && window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    lenis.on('scroll', e => { velocity = e.velocity; ScrollTrigger.update(); });
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  const scrollTo = target => {
    if (lenis) lenis.scrollTo(target, { duration: 1.6 });
    else (typeof target === 'string' ? $(target) : target)?.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth' });
  };

  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length < 2 || !$(id)) return;
    e.preventDefault();
    document.body.classList.remove('menu-open');
    $('.menu-toggle').setAttribute('aria-expanded', 'false');
    // filtrar la colección al pinchar una sala
    if (a.dataset.sala) filterGallery('todo');
    scrollTo(id);
  }));

  /* ----------------------------------------------------------
     4. Preloader + intro del hero
     ---------------------------------------------------------- */
  function runPreloader() {
    const counter = $('[data-count]');
    const bar = $('.preloader__bar span');
    const progress = { v: 0 };

    const ready = Promise.all([
      document.fonts ? document.fonts.ready : Promise.resolve(),
      new Promise(r => { const img = $('.hero__arch img'); img.complete ? r() : (img.onload = img.onerror = r); })
    ]);
    const timeout = new Promise(r => setTimeout(r, 4000));

    const fill = gsap.to(progress, {
      v: 90, duration: 1.4, ease: 'power2.out',
      onUpdate: () => { counter.textContent = Math.round(progress.v); bar.style.transform = `scaleX(${progress.v / 100})`; }
    });

    Promise.race([ready, timeout]).then(() => {
      fill.kill();
      gsap.timeline()
        .to(progress, {
          v: 100, duration: .5, ease: 'power1.out',
          onUpdate: () => { counter.textContent = Math.round(progress.v); bar.style.transform = `scaleX(${progress.v / 100})`; }
        })
        .to('.preloader__inner', { autoAlpha: 0, y: -20, duration: .5, ease: 'power2.in' }, '+=.15')
        .to('.preloader', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=.1')
        .add(heroIntro(), '-=.65')
        .add(() => {
          $('.preloader').remove();
          document.body.classList.remove('is-loading');
          lenis?.start();
          ScrollTrigger.refresh();
        }, '-=1');
    });
  }

  function heroIntro() {
    const tl = gsap.timeline();
    tl.from('.hero__arch', { clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)', duration: 1.5, ease: 'expo.out' })
      .from('.hero__arch img', { scale: 1.4, duration: 2, ease: 'expo.out' }, 0)
      .from('.hero__title .char', { yPercent: 120, rotate: 6, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: .045 }, .15)
      .from('.hero__meta span, .hero__lede, .hero__scroll, .header > *', { y: 18, opacity: 0, duration: .9, ease: 'power3.out', stagger: .05 }, .6);
    return tl;
  }

  /* ----------------------------------------------------------
     5. Efectos de scroll
     ---------------------------------------------------------- */
  function scrollEffects() {
    // --- Hero: el arco crece y las líneas del título se separan
    const heroTl = gsap.timeline({
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
    });
    heroTl.to('.hero__arch', { scale: 1.18, yPercent: 12, ease: 'none' }, 0)
      .to('.hero__title .line:first-child', { xPercent: -14, ease: 'none' }, 0)
      .to('.hero__title .line:last-child', { xPercent: 14, ease: 'none' }, 0)
      .to('.hero__meta, .hero__lede, .hero__scroll', { opacity: 0, ease: 'none' }, 0);

    // --- Scroll interno de imágenes (efecto "captura de web")
    $$('[data-inner-scroll]').forEach(frame => {
      const img = frame.querySelector('img');
      const inHero = frame.closest('.hero');
      const distance = () => Math.max(0, img.offsetHeight - frame.offsetHeight);
      gsap.fromTo(img, { y: 0 }, {
        y: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: inHero ? '.hero' : frame,
          start: inHero ? 'top top' : 'top bottom',
          end: 'bottom top',
          scrub: inHero ? true : .6,
          invalidateOnRefresh: true
        }
      });
      // recalcular cuando la imagen termine de cargar
      if (!img.complete) img.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    });

    // --- Revelado de marcos
    $$('[data-reveal]').forEach(el => {
      gsap.from(el, {
        clipPath: 'inset(100% 0 0 0 round 6px)', duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: el, start: 'top 88%' }
      });
    });

    // --- Títulos de sección carácter a carácter
    $$('.section-title .split, .visita__title .split').forEach(el => {
      gsap.from(el.querySelectorAll('.char'), {
        yPercent: 100, opacity: 0, rotate: 4, duration: 1, ease: 'expo.out', stagger: .03,
        scrollTrigger: { trigger: el, start: 'top 85%' }
      });
    });

    // --- Eyebrows y textos secundarios
    $$('.eyebrow, .section-sub, .sala__info, .visita__col, .visita__photo').forEach(el => {
      if (el.closest('.hero, .sacre, .lightbox, .preloader')) return;
      gsap.from(el, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });

    // --- Manifiesto: las palabras se iluminan con el scroll
    gsap.to('.intro__text .w', {
      opacity: 1, stagger: .05, ease: 'none',
      scrollTrigger: { trigger: '.intro__text', start: 'top 78%', end: 'bottom 45%', scrub: true }
    });

    // --- Contadores
    $$('[data-counter]').forEach(el => {
      const target = +el.dataset.counter;
      const obj = { v: target > 1000 ? 1769 : 0 }; // 1769: nacimiento de Napoleón
      ScrollTrigger.create({
        trigger: el, start: 'top 90%', once: true,
        onEnter: () => gsap.to(obj, {
          v: target, duration: 2, ease: 'power3.out',
          onUpdate: () => el.textContent = Math.round(obj.v)
        })
      });
    });

    // --- Marquesina con aceleración según la velocidad de scroll
    marquee($('.ticker__track'), 60, 1);

    // --- Pieza destacada: el marco se abre y la imagen se asienta
    gsap.timeline({
      scrollTrigger: { trigger: '.featured', start: 'top 60%', end: 'center center', scrub: true }
    })
      .to('.featured__frame', { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }, 0)
      .to('.featured__frame img', { scale: 1, ease: 'none' }, 0);

    $$('.step').forEach(step => {
      gsap.from(step, { opacity: 0, y: 60, duration: 1.1, ease: 'power3.out', scrollTrigger: { trigger: step, start: 'top 80%' } });
    });

    // --- Visita: el título se desplaza en paralaje
    gsap.to('.visita__title', {
      yPercent: -40, ease: 'none',
      scrollTrigger: { trigger: '.visita__hero', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    // --- Footer: texto gigante entra de lado
    gsap.from('.footer__giant', {
      xPercent: 12, opacity: 0, ease: 'none',
      scrollTrigger: { trigger: '.footer', start: 'top bottom', end: 'center bottom', scrub: true }
    });

    // --- Galería: entrada escalonada
    ScrollTrigger.batch('.card', {
      start: 'top 92%', once: true,
      onEnter: els => gsap.from(els, { y: 60, opacity: 0, duration: 1, ease: 'power3.out', stagger: .08 })
    });
  }

  /* ----------------------------------------------------------
     6. La Consagración — recorrido de cámara fijado
     ---------------------------------------------------------- */
  function sacreCamera() {
    const stage = $('.sacre__stage');
    const canvas = $('.sacre__canvas');
    const img = canvas.querySelector('img');
    const notes = $$('.sacre__notes li');
    const ratio = +img.getAttribute('width') / +img.getAttribute('height');

    // puntos de interés (proporción sobre el lienzo) y zoom
    const STOPS = [
      { fx: .5,   fy: .5,  z: 1 },
      { fx: .565, fy: .62, z: 2.6, note: 0 },
      { fx: .47,  fy: .74, z: 2.8, note: 1 },
      { fx: .665, fy: .64, z: 2.8, note: 2 },
      { fx: .385, fy: .55, z: 3.4, note: 3 },
      { fx: .5,   fy: .5,  z: 1 }
    ];

    let base = { w: 0, h: 0 };
    const measure = () => {
      const vw = stage.clientWidth, vh = stage.clientHeight;
      base.w = Math.max(vw, vh * ratio);
      base.h = base.w / ratio;
      canvas.style.width = base.w + 'px';
      canvas.style.height = base.h + 'px';
    };
    measure();

    // centro de encuadre: a la derecha en escritorio (deja sitio a la nota), arriba en móvil
    const focus = () => {
      const vw = stage.clientWidth, vh = stage.clientHeight;
      return vw > 820 ? { cx: vw * .64, cy: vh * .5 } : { cx: vw * .5, cy: vh * .36 };
    };
    // en pantallas verticales el lienzo ya llena el alto: se reduce el zoom
    const zoom = s => s.z === 1 ? 1 : Math.max(1.2, s.z * gsap.utils.clamp(.5, 1, stage.clientWidth / stage.clientHeight));
    const pos = (s, axis) => {
      const vw = stage.clientWidth, vh = stage.clientHeight;
      const { cx, cy } = s.z === 1 ? { cx: vw / 2, cy: vh / 2 } : focus();
      const W = base.w * zoom(s), H = base.h * zoom(s);
      if (axis === 'x') return gsap.utils.clamp(vw - W, 0, cx - s.fx * W);
      return gsap.utils.clamp(vh - H, 0, cy - s.fy * H);
    };

    gsap.set(canvas, { x: () => pos(STOPS[0], 'x'), y: () => pos(STOPS[0], 'y'), scale: 1 });
    gsap.set(notes, { autoAlpha: 0, y: 30 });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: '.sacre',
        start: 'top top',
        end: () => '+=' + window.innerHeight * 5,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        onRefreshInit: measure,
        onUpdate: self => gsap.set('.sacre__progress span', { scaleY: self.progress })
      }
    });

    tl.to({}, { duration: .3 }); // pequeña pausa con la vista general
    STOPS.slice(1).forEach((s, i) => {
      const move = { x: () => pos(s, 'x'), y: () => pos(s, 'y'), scale: () => zoom(s), duration: 1 };
      if (i === 0) tl.to('.sacre__intro', { autoAlpha: 0, y: -30, duration: .5 }).to(canvas, move, '<');
      else tl.to(canvas, move);
      if (s.note !== undefined) {
        tl.to(notes[s.note], { autoAlpha: 1, y: 0, duration: .35, ease: 'power2.out' }, '-=.25')
          .to({}, { duration: .6 })
          .to(notes[s.note], { autoAlpha: 0, y: -20, duration: .3, ease: 'power2.in' });
      }
    });
    tl.to('.sacre__veil', { opacity: .3, duration: .4 }, '<');
  }

  /* ----------------------------------------------------------
     7. Marquesinas / carruseles infinitos
     ---------------------------------------------------------- */
  function marquee(track, speed, dir, opts = {}) {
    if (!track) return;
    // duplicar contenido si no se ha hecho
    if (!track.dataset.cloned && !opts.prefilled) { track.innerHTML += track.innerHTML; track.dataset.cloned = '1'; }
    let x = 0, hoverFactor = 1, skew = 0;
    const setX = gsap.quickSetter(track, 'x', 'px');
    const setSkew = opts.skew ? gsap.quickSetter(track, 'skewX', 'deg') : null;

    if (opts.pauseOnHover) {
      track.addEventListener('mouseenter', () => gsap.to({ f: hoverFactor }, { f: .15, duration: .6, onUpdate() { hoverFactor = this.targets()[0].f; } }));
      track.addEventListener('mouseleave', () => gsap.to({ f: hoverFactor }, { f: 1, duration: .6, onUpdate() { hoverFactor = this.targets()[0].f; } }));
    }

    gsap.ticker.add((t, dt) => {
      const half = track.scrollWidth / 2;
      if (!half) return;
      const boost = 1 + Math.min(Math.abs(velocity) * .25, 8);
      const scrollDir = velocity < -0.1 ? -1 : 1;
      x -= (speed * dir * scrollDir * boost * hoverFactor * dt) / 1000;
      x = ((x % half) - half) % half; // siempre en [-half, 0)
      setX(x);
      if (setSkew) {
        skew += ((gsap.utils.clamp(-6, 6, velocity * .35)) - skew) * .1;
        setSkew(skew);
      }
    });
  }

  function carousels() {
    $$('[data-carousel]').forEach(el => {
      marquee(el.querySelector('.carousel__track'), 45, +el.dataset.carousel, { prefilled: true, pauseOnHover: true, skew: true });
    });
  }

  /* ----------------------------------------------------------
     8. Colección: filtros con Flip
     ---------------------------------------------------------- */
  let currentFilter = 'todo';
  function filterGallery(type) {
    if (type === currentFilter) return;
    currentFilter = type;
    $$('.filter').forEach(f => {
      const on = f.dataset.filter === type;
      f.classList.toggle('is-active', on);
      f.setAttribute('aria-selected', on);
    });
    const cards = $$('.card');
    const state = Flip.getState(cards);
    cards.forEach(c => c.classList.toggle('is-hidden', type !== 'todo' && c.dataset.tipo !== type));
    Flip.from(state, {
      duration: REDUCED ? 0 : .8, ease: 'power3.inOut', absolute: true, scale: true,
      onEnter: els => gsap.fromTo(els, { opacity: 0, scale: .85 }, { opacity: 1, scale: 1, duration: .6 }),
      onLeave: els => gsap.to(els, { opacity: 0, scale: .85, duration: .4 }),
      onComplete: () => ScrollTrigger.refresh()
    });
  }
  $$('.filter').forEach(f => f.addEventListener('click', () => filterGallery(f.dataset.filter)));

  /* ----------------------------------------------------------
     9. Lightbox
     ---------------------------------------------------------- */
  const lb = $('.lightbox');
  let lbList = [], lbIndex = 0;

  function fillLightbox() {
    const o = lbList[lbIndex];
    const lbImg = $('.lightbox__media img');
    lbImg.src = `${IMG}${o.id}.webp`;
    lbImg.alt = o.titulo;
    $('.lightbox__sala').textContent = `Sala ${o.sala} · ${SALA_NOMBRE[o.sala]}`;
    $('.lightbox__title').textContent = o.titulo;
    $('.lightbox__autor').textContent = o.autor;
    $('.lightbox__meta').innerHTML = `
      <div><dt>Fecha</dt><dd>${o.fecha}</dd></div>
      <div><dt>Técnica</dt><dd>${o.tecnica}</dd></div>
      <div><dt>Categoría</dt><dd>${o.tipo[0].toUpperCase() + o.tipo.slice(1)}</dd></div>`;
    $('.lightbox__text').textContent = o.texto;
    $('.lightbox__index').textContent = `${String(lbIndex + 1).padStart(2, '0')} / ${String(lbList.length).padStart(2, '0')}`;
    gsap.fromTo('.lightbox__media img', { opacity: 0, scale: .96 }, { opacity: 1, scale: 1, duration: .7, ease: 'power3.out' });
    gsap.fromTo('.lightbox__info > *', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .6, stagger: .04, ease: 'power3.out' });
  }

  function openLightbox(id, fromGallery) {
    lbList = fromGallery
      ? $$('.card:not(.is-hidden)').map(c => byId[c.dataset.open])
      : COLECCION;
    lbIndex = Math.max(0, lbList.findIndex(o => o.id === id));
    fillLightbox();
    lb.showModal();
    lenis?.stop();
    cursor?.reset();
  }
  const step = d => { lbIndex = (lbIndex + d + lbList.length) % lbList.length; fillLightbox(); };

  document.addEventListener('click', e => {
    const t = e.target.closest('[data-open]');
    if (t) openLightbox(t.dataset.open, !!t.closest('.gallery'));
  });
  $('.lightbox__close').addEventListener('click', () => lb.close());
  $('.lightbox__nav--prev').addEventListener('click', () => step(-1));
  $('.lightbox__nav--next').addEventListener('click', () => step(1));
  lb.addEventListener('close', () => lenis?.start());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
  document.addEventListener('keydown', e => {
    if (!lb.open) return;
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  });

  /* ----------------------------------------------------------
     10. Cursor personalizado
     ---------------------------------------------------------- */
  let cursor = null;
  if (FINE_POINTER) {
    const el = $('.cursor');
    const label = $('.cursor__label');
    const xTo = gsap.quickTo(el, 'x', { duration: .45, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: .45, ease: 'power3' });
    window.addEventListener('pointermove', e => { xTo(e.clientX); yTo(e.clientY); el.style.opacity = 1; }, { passive: true });
    document.addEventListener('pointerleave', () => el.style.opacity = 0);

    document.addEventListener('pointerover', e => {
      const target = e.target.closest('[data-cursor]');
      const link = e.target.closest('a, button, input');
      el.classList.toggle('is-active', !!target);
      el.classList.toggle('is-link', !target && !!link);
      if (target) label.textContent = target.dataset.cursor;
    });
    cursor = { reset: () => el.classList.remove('is-active', 'is-link') };

    // la imagen alternativa de cada sala se abre desde la posición del ratón
    $$('.sala').forEach(s => s.addEventListener('pointermove', e => {
      const r = s.querySelector('.sala__frame').getBoundingClientRect();
      s.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      s.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
    }));
  }

  /* ----------------------------------------------------------
     11. Header, navegación y menú móvil
     ---------------------------------------------------------- */
  const header = $('.header');
  let lastY = 0;
  const onScroll = y => {
    header.classList.toggle('is-scrolled', y > 40);
    header.classList.toggle('is-hidden', y > 300 && y > lastY && !document.body.classList.contains('menu-open'));
    lastY = y;
  };
  if (lenis) lenis.on('scroll', e => onScroll(e.scroll));
  else window.addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  $$('.nav a').forEach(a => {
    const sec = $(a.getAttribute('href'));
    ScrollTrigger.create({
      trigger: sec, start: 'top 50%', end: 'bottom 50%',
      onToggle: self => a.classList.toggle('is-current', self.isActive)
    });
  });

  $('.menu-toggle').addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    $('.menu-toggle').setAttribute('aria-expanded', open);
    $('.mobile-menu').setAttribute('aria-hidden', !open);
    open ? lenis?.stop() : lenis?.start();
  });
  $$('.mobile-menu a').forEach(a => a.addEventListener('click', () => {
    $('.mobile-menu').setAttribute('aria-hidden', 'true');
    lenis?.start();
  }));

  $('.credits-toggle').addEventListener('click', e => {
    const list = $('#credits');
    list.hidden = !list.hidden;
    e.currentTarget.setAttribute('aria-expanded', !list.hidden);
    ScrollTrigger.refresh();
    if (!list.hidden) scrollTo(list);
  });

  /* ----------------------------------------------------------
     12. Arranque
     ---------------------------------------------------------- */
  scrollEffects();
  sacreCamera();
  carousels();

  if (REDUCED) {
    $('.preloader').remove();
    document.body.classList.remove('is-loading');
  } else {
    runPreloader();
  }

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
