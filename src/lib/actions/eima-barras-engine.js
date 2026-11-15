// @ts-nocheck
/* =====================================================================
   EIMA BARRAS · motor común (sin dependencias)
   Cada .eb[data-eb] se inicializa solo. Dos modos:
     · data-drive="scroll"  el progreso sigue al scroll dentro de
                            data-target (A en vertical y C).
     · por defecto          al entrar en pantalla, anima de 0 a
                            data-value (%) en data-duration ms (B y D).
   API pública para casos como el carrusel:
     EimaBars.play(el)      repite la animación de una barra
     EimaBars.set(el, p)    fija el progreso a mano (0 → 1)
   ===================================================================== */
export const EimaBars = (() => {
  'use strict';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const easeInOut = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const state = new WeakMap();
  const active = new Set();          // barras que necesitan fotogramas ahora mismo
  let raf = 0;

  /* --- Pintado común --- */
  function paint(el, p) {
    const s = state.get(el);
    el.style.setProperty('--p', p.toFixed(4));
    const pct = Math.round(p * 100);
    if (el.getAttribute('role') === 'progressbar') el.setAttribute('aria-valuenow', pct);
    if (s.ticks) s.ticks.forEach((t, i) => t.classList.toggle('is-on', i / (s.ticks.length - 1) <= p + 1e-4));
    if (s.steps) {                    // pasos de «Cómo funciona»: se encienden al llegar el punto
      const r = s.track.getBoundingClientRect(), y = r.top + p * r.height;
      s.steps.forEach(step => {
        const number = step.querySelector('button span');
        if (!number) return;
        const box = number.getBoundingClientRect();
        const reached = r.height > 0 && box.top + box.height / 2 <= y + .01;
        const changed = step.classList.contains('is-reached') !== reached;
        step.classList.toggle('is-reached', reached);
        if (changed && r.height > 0 && !motion.matches) {
          s.knob?.animate([
            { boxShadow: '0 2px 10px #233f4e40, 0 0 0 0 #8cd0d680' },
            { boxShadow: '0 2px 10px #233f4e40, 0 0 0 7px #8cd0d600' }
          ], { duration: 320, easing: 'ease-out' });
        }
      });
    }
  }

  /* B · La posición de cada tarjeta ocupa la misma parte de su tramo. */
  function paintSegments(el, p) {
    const s = state.get(el), n = s.segs.length;
    s.segs.forEach((seg, i) => {
      const v = clamp(p * n - i);
      seg.style.setProperty('--v', v.toFixed(4));
      seg.style.setProperty('--w', seg.clientWidth + 'px');
      seg.style.setProperty('--shine', Math.sin(Math.PI * v).toFixed(3));
      const label = s.labels[i];
      if (label) { label.style.setProperty('--v', v.toFixed(3)); label.classList.toggle('is-done', v >= .999); }
    });
    el.style.setProperty('--p', p.toFixed(4));
    if (el.getAttribute('role') === 'progressbar') el.setAttribute('aria-valuenow', Math.round(p * n));
  }

  /* --- Bucle único: solo corre mientras alguna barra lo necesita --- */
  function tick(now) {
    raf = 0;
    active.forEach(el => {
      const s = state.get(el);
      if (s.drive === 'scroll') {
        const r = s.target.getBoundingClientRect();
        const span = s.vertical ? r.height - innerHeight * .5 : r.height - innerHeight;
        const goal = s.vertical
          ? clamp((innerHeight * .5 - r.top) / Math.max(1, span))
          : clamp(-r.top / Math.max(1, span));
        s.p = motion.matches ? goal : s.p + (goal - s.p) * .18;     // inercia suave
        (s.type === 'segments' ? paintSegments : paint)(el, s.p);
        if (!s.inView && Math.abs(goal - s.p) < .001) active.delete(el);
      } else {
        const k = motion.matches ? 1 : clamp((now - s.t0) / s.duration);
        s.p = s.from + (s.goal - s.from) * easeInOut(k);
        (s.type === 'segments' ? paintSegments : paint)(el, s.p);
        if (k >= 1) active.delete(el);
      }
    });
    if (active.size) raf = requestAnimationFrame(tick);
  }
  const wake = () => { if (!raf && active.size) raf = requestAnimationFrame(tick); };

  /* --- API --- */
  function play(el, progress) {
    const s = state.get(el); if (!s || s.drive === 'scroll') return;
    const explicit = progress !== undefined;
    if (explicit) s.goal = clamp(progress);
    if (motion.matches) { active.delete(el); s.p = s.goal; (s.type === 'segments' ? paintSegments : paint)(el, s.goal); return; }
    s.t0 = performance.now(); s.from = explicit ? s.p : 0; s.p = s.from;
    (s.type === 'segments' ? paintSegments : paint)(el, s.from);
    active.add(el); wake();
  }
  function set(el, p) {
    const s = state.get(el); if (!s) return;
    active.delete(el);
    s.p = clamp(p); (s.type === 'segments' ? paintSegments : paint)(el, s.p);
  }

  /* --- Inicialización --- */
  function init(el, externalScroll = false) {
    if (state.has(el)) return;
    const type = el.dataset.eb;
    const s = {
      type, p: 0,
      drive: el.dataset.drive || 'reveal',
      vertical: el.dataset.orientation === 'vertical',
      goal: clamp((parseFloat(el.dataset.value) || 100) / 100),
      duration: parseFloat(el.dataset.duration) || (type === 'segments' ? 2600 : 2200),
      track: el.querySelector('.eb-track'),
      knob: el.querySelector('.eb-knob'),
      segs: [...el.querySelectorAll('.eb-seg')],
      labels: [...el.querySelectorAll('.eb-seg-label')],
      target: el.dataset.target ? document.querySelector(el.dataset.target) : el,
      steps: el.dataset.steps ? [...document.querySelectorAll(el.dataset.steps)] : null,
      ticks: null, inView: false, cleanup: [], from: 0
    };
    if (type === 'segments') el.style.setProperty('--n', s.segs.length);
    if (type === 'thread') {          // C · marcas generadas a partir de data-ticks
      const n = parseInt(el.dataset.ticks, 10) || 12;
      s.ticks = Array.from({ length: n }, (_, i) => {
        const t = document.createElement('span'); t.className = 'eb-tick';
        t.style.left = `${(i / (n - 1)) * 100}%`; s.track.insertBefore(t, s.track.querySelector('.eb-knob-rail')); return t;
      });
    }
    state.set(el, s);
    if (s.track && 'ResizeObserver' in window) {     // longitud de la pista para mover el punto
      const ro = new ResizeObserver(() => el.style.setProperty('--len', (s.vertical ? s.track.clientHeight : s.track.clientWidth) + 'px'));
      ro.observe(s.track);
      s.cleanup.push(() => ro.disconnect());
    } else if (s.track) {
      el.style.setProperty('--len', (s.vertical ? s.track.clientHeight : s.track.clientWidth) + 'px');
    }
    (type === 'segments' ? paintSegments : paint)(el, 0);

    if (s.drive === 'scroll' && !externalScroll && s.target) {
      const io = new IntersectionObserver(([e]) => { s.inView = e.isIntersecting; if (e.isIntersecting) { active.add(el); wake(); } });
      io.observe(s.target);
      const scroll = () => { if (s.inView) { active.add(el); wake(); } };
      addEventListener('scroll', scroll, { passive: true });
      s.cleanup.push(() => { io.disconnect(); removeEventListener('scroll', scroll); });
    } else if (s.drive === 'reveal') {
      // Se anima la primera vez que se ve al 50 %. El carrusel puede repetirla con play().
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { play(el); io.disconnect(); } }, { threshold: .5 });
      io.observe(el);
      s.cleanup.push(() => io.disconnect());
    }
  }

  function destroy(el) {
    const s = state.get(el);
    if (!s) return;
    active.delete(el);
    s.cleanup.forEach(cleanup => cleanup());
    s.ticks?.forEach(tick => tick.remove());
    state.delete(el);
  }

  return { play, set, init, destroy };
})();
