// @ts-nocheck
// Adapted from the 3R reference: the shader, letter masks and scroll timing
// are shared with the prototype. The animated background is managed by the layout.
import { setBar } from '$lib/actions/eimaBar';
function startThreeR(root, motion) {
  const controller = new AbortController();
  const { signal } = controller;
  const $ = s => root.querySelector(s);
  const $$ = s => Array.from(root.querySelectorAll(s));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
  const STILL = motion.matches;

  /* Escena: tres R que se llenan de agua; debajo se releva el texto de cada una */
  function initScene() {
    const track = $('.scene__track'), pin = $('.scene__pin'), canvas = $('#rrr'), rail = $('.rail');
    const rtexts = $$('.rtext');
    if (!track || STILL || innerHeight < 540 || !CSS.supports('position', 'sticky')) return null;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    root.classList.add('pin');
    const CH = ['R', 'R', 'R'], FAMILY = 'Newsreader, "Iowan Old Style", "Palatino Linotype", Georgia, serif';
    const FILL_END = .94;
    let W = 0, H = 0, dpr = 1, mask = null, outline = null, boxes = [], shown = 0, active = -1;
    function build() {
      const textBottom = rtexts[2].offsetTop + rtexts[2].offsetHeight;
      const spare = Math.max(0, pin.clientHeight - textBottom);
      root.style.setProperty('--payoff-mobile-lift', `${spare * .8}px`);
      const r = canvas.getBoundingClientRect(); if (!r.width || !r.height) return;
      W = r.width; H = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.font = `600 100px ${FAMILY}`;
      const ms = CH.map(ch => ctx.measureText(ch));
      const asc = Math.max(...ms.map(m => m.actualBoundingBoxAscent)), desc = Math.max(...ms.map(m => m.actualBoundingBoxDescent)), GAP = 26;
      const glyphWidth = m => m.actualBoundingBoxLeft + m.actualBoundingBoxRight;
      const total = ms.reduce((s, m) => s + glyphWidth(m), 0) + GAP * 2;
      const k = Math.min((W - 10) / total, (H - 6) / (asc + desc)) + 3 / 100;
      const fs = 100 * k, base = Math.round((H + (asc - desc) * k) / 2); let x = (W - total * k) / 2;
      boxes = ms.map(m => {
        const w = glyphWidth(m) * k;
        const box = { x, w, origin: x + m.actualBoundingBoxLeft * k, top: base - asc * k, bottom: base + desc * k };
        x += w + GAP * k;
        return box;
      });
      const layer = paint => { const o = document.createElement('canvas'); o.width = canvas.width; o.height = canvas.height; const c = o.getContext('2d'); c.scale(dpr, dpr); c.font = `600 ${fs}px ${FAMILY}`; CH.forEach((ch, i) => paint(c, ch, boxes[i].origin, base)); return o; };
      mask = layer((c, ch, x, y) => { c.fillStyle = '#000'; c.fillText(ch, x, y); });
      outline = layer((c, ch, x, y) => { c.fillStyle = 'rgba(248,244,240,.62)'; for (let a = 0; a < 16; a++) c.fillText(ch, x + Math.cos(a * Math.PI / 8) * 1.1, y + Math.sin(a * Math.PI / 8) * 1.1); });
      const oc = outline.getContext('2d'); oc.globalCompositeOperation = 'destination-out'; oc.setTransform(1, 0, 0, 1, 0, 0); oc.drawImage(mask, 0, 0);
    }
    function wave(x0, x1, y, amp, phase, freq, fill) { ctx.beginPath(); ctx.moveTo(x0, H + 2); for (let x = x0; x <= x1 + 6; x += 6) ctx.lineTo(x, y + Math.sin(x * freq + phase) * amp); ctx.lineTo(x1 + 6, H + 2); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); }
    function draw(T) {
      if (!mask) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, W, H);
      const A = Math.max(2.5, Math.min(9, H * .035));
      boxes.forEach((b, i) => {
        const lv = clamp((shown * 3 - i) / .9); if (lv <= .001) return;
        const amp = A * Math.min(1, lv * 7) * Math.min(1, (1 - lv) * 7), y = b.bottom - lv * (b.bottom - b.top);
        const g = ctx.createLinearGradient(0, y, 0, b.bottom + 1); g.addColorStop(0, '#8CD0D6'); g.addColorStop(1, '#4083A7');
        wave(b.x - 4, b.x + b.w + 4, y - amp * .9, amp, T * .9 + i * 2.1, .045, 'rgba(232,232,246,.55)');
        wave(b.x - 4, b.x + b.w + 4, y, amp, -T * 1.2 + i * 1.3, .032, g);
      });
      ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(mask, 0, 0, W, H);
      ctx.globalCompositeOperation = 'source-over'; ctx.drawImage(outline, 0, 0, W, H);
    }
    build(); let rz = 0; addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(build, 160); }, { signal });
    signal.addEventListener('abort', () => clearTimeout(rz));
    if (document.fonts && document.fonts.load) document.fonts.load('600 100px Newsreader').then(() => { if (!signal.aborted) build(); }).catch(() => {});
    return { update(T, dt) {
      const r = track.getBoundingClientRect();
      const p = clamp((pin.getBoundingClientRect().top - r.top) / Math.max(1, r.height - pin.offsetHeight));
      const q = clamp(p / FILL_END);
      shown += (q - shown) * (1 - Math.exp(-dt / .16));
      if (q === 1 && shown >= .995) shown = 1;
      const i = Math.min(2, Math.floor(q * 3));
      if (i !== active) { active = i; rtexts.forEach((s, n) => { s.classList.toggle('is-active', n === i); s.classList.toggle('is-past', n < i); }); }
      setBar(rail, shown);
      root.classList.toggle('payoff-ready', shown === 1);
      if (r.top < innerHeight && r.bottom > 0) draw(T);
    } };
  }


  const scene = initScene();
  let last = performance.now(), T = STILL ? 14 : 0, frameId = 0;
  function frame(now) {
    frameId = 0;
    const dt = Math.min(.05, (now - last) / 1000); last = now; if (!STILL) T += dt;
    if (scene) scene.update(T, dt);
    if (!STILL) schedule();
  }
  function schedule() {
    if (!frameId) frameId = requestAnimationFrame(frame);
  }
  if (scene) window.addEventListener('resize', schedule, { signal });
  const visibility = scene && 'IntersectionObserver' in window
    ? new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) schedule();
      else { cancelAnimationFrame(frameId); frameId = 0; }
    })
    : null;
  if (visibility) visibility.observe(root);
  else if (scene) schedule();

  return () => {
    controller.abort();
    visibility?.disconnect();
    cancelAnimationFrame(frameId);
    root.classList.remove('pin', 'payoff-ready');
  };
}

/** @param {HTMLElement} node */
export function threeR(node) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let stop = startThreeR(node, motion);
  function refresh() { stop(); stop = startThreeR(node, motion); }
  motion.addEventListener('change', refresh);
  return {
    destroy() { motion.removeEventListener('change', refresh); stop(); }
  };
}
