// @ts-nocheck
// The reference shader draws one viewport-sized surface. The header copies
// its top strip so the waves align while the navigation covers scrolling text.
import { pageSurfaces } from './pageSurfaces';

/** @param {HTMLElement} root */
function startWater(root, motion, restart) {
  const controller = new AbortController();
  const { signal } = controller;
  const STILL = motion.matches;
  const headerTones = { shore: [1, 0, 0], mist: [0, 1, 0], deep: [0, 0, 1] };
  const headerFade = 18;

  const FRAG = `
    #ifdef GL_FRAGMENT_PRECISION_HIGH
    precision highp float;
    #else
    precision mediump float;
    #endif
    uniform vec2 uRes; uniform float uT; uniform float uScroll; uniform vec2 uPtr;
    uniform vec3 uTone;
    vec2 h2(vec2 p){ p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3))); return fract(sin(p) * 43758.5453) * 2.0 - 1.0; }
    float gn(vec2 p){
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
      float a = dot(h2(i), f), b = dot(h2(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0));
      float c = dot(h2(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), d = dot(h2(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }
    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      float asp = uRes.x / uRes.y;
      vec2 p = vec2(uv.x * asp, uv.y) * 1.55;
      p.y += uScroll;
      float t = uT;
      vec2 w = vec2(gn(p * 0.9 + vec2(t * 0.05, t * 0.03)), gn(p * 0.9 + vec2(-t * 0.04, t * 0.05) + 5.2));
      float swell = gn(p * 0.75 + w * 0.9 + vec2(0.0, t * 0.02));
      vec2 q = p * 2.1 + w * 1.5;
      float r1 = 1.0 - abs(gn(q + vec2(t * 0.06, -t * 0.04)));
      float r2 = 1.0 - abs(gn(q * 1.7 - vec2(t * 0.05, t * 0.07) + 9.1));
      float veins = pow(r1, 7.0) * 0.55 + pow(r1 * r2, 6.0) * 1.15;
      vec2 pp = vec2(uPtr.x * asp, uPtr.y) * 1.55; pp.y += uScroll;
      float glow = exp(-dot(p - pp, p - pp) * 2.2);
      vec3 weights = uTone;
      vec3 base = (weights.x * vec3(248,244,240) + weights.y * vec3(232,232,246) + weights.z * vec3(35,63,78)) / 255.0;
      vec3 shade = (weights.x * vec3(211,226,236) + weights.y * vec3(191,218,232) + weights.z * vec3(36,91,125)) / 255.0;
      vec3 light = (weights.x * vec3(255) + weights.y * vec3(255) + weights.z * vec3(140,208,214)) / 255.0;
      float veil = dot(weights, vec3(0.9, 0.8, 0.16));
      vec3 col = mix(base, shade, smoothstep(-0.32, 0.5, swell));
      col = mix(col, light, clamp(veins * veil + glow * veil * 0.35, 0.0, 1.0));
      col += (fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) / 255.0;
      gl_FragColor = vec4(col, 1.0);
    }`;

  function initWater() {
    const c = root.querySelector('#water');
    if (!c) return null;
    const fail = () => { root.classList.add('water-no-gl'); c.style.visibility = 'hidden'; return null; };
    let gl = null;
    try { gl = c.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'low-power' }); } catch (e) {}
    if (!gl) return fail();
    const sh = (type, src) => { const s = gl.createShader(type); if (!s) return null; gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const vs = sh(gl.VERTEX_SHADER, 'attribute vec2 a; void main(){ gl_Position = vec4(a, 0.0, 1.0); }');
    const fs = sh(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return fail();
    const pr = gl.createProgram();
    if (!pr) return fail();
    gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return fail();
    gl.useProgram(pr);
    const buffer = gl.createBuffer();
    if (!buffer) return fail();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'a');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = {};
    ['uRes', 'uT', 'uScroll', 'uPtr', 'uTone'].forEach(n => { U[n] = gl.getUniformLocation(pr, n); });

    const SCALE = .5;                                   // media resolución
    const size = () => {
      const w = Math.max(2, Math.round(c.clientWidth * SCALE)), h = Math.max(2, Math.round(c.clientHeight * SCALE));
      if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
      gl.viewport(0, 0, w, h);
    };
    size();
    addEventListener('resize', size, { signal });

    const ptr = [.74, .8], ptrTo = [.74, .8];           // la luz sigue al cursor (solo con ratón)
    if (matchMedia('(hover: hover) and (pointer: fine)').matches && !STILL) {
      addEventListener('pointermove', e => { ptrTo[0] = e.clientX / innerWidth; ptrTo[1] = 1 - e.clientY / innerHeight; }, { passive: true, signal });
    }
    let lost = false;
    c.addEventListener('webglcontextlost', e => {
      e.preventDefault();
      lost = true;
      root.classList.remove('water-rendered');
      root.classList.add('water-no-gl');
      c.style.visibility = 'hidden';
      schedule();
    }, { signal });
    c.addEventListener('webglcontextrestored', restart, { signal });
    signal.addEventListener('abort', () => {
      gl.deleteBuffer(buffer);
      gl.deleteProgram(pr);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    });

    return {
      draw(T, scrollY, dt, tone) {
        if (lost) return;
        const k = 1 - Math.exp(-dt / .5);
        ptr[0] += (ptrTo[0] - ptr[0]) * k; ptr[1] += (ptrTo[1] - ptr[1]) * k;
        gl.uniform2f(U.uRes, c.width, c.height);
        gl.uniform1f(U.uT, T);
        gl.uniform1f(U.uScroll, STILL ? 0 : scrollY / innerHeight * .22);
        gl.uniform2f(U.uPtr, ptr[0], ptr[1]);
        gl.uniform3fv(U.uTone, tone);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }
    };
  }
  const marked = new Set();
  const inkNodes = new Set();
  let surfaces = [];
  let needsSample = true;
  let theme = 'mist';
  let copyToHero;
  let dictionaryWater;
  let progressSurfaces = [];
  let goalsWater;
  const header = root.querySelector('header');
  const menuWater = root.querySelector('.menu-water');
  const mobileMenu = menuWater?.closest('#mobile-menu');
  const footer = root.querySelector('footer.footer');
  const headerCanvas = header.querySelector('.header-water');
  const headerContext = headerCanvas.getContext('2d');
  const canvas = root.querySelector('#water');

  function markInk() {
    root.classList.add('water-measuring');
    for (const node of inkNodes) {
      node.removeAttribute('data-water-ink');
      node.removeAttribute('data-water-color');
    }
    inkNodes.clear();
    const text = 'h1,h2,h3,h4,h5,h6,p,li,span,strong,em,i,b,a,dt,dd,blockquote,label';
    const areas = [main];
    for (const area of areas) {
      const protectedNodes = new WeakMap();
      const protectedFromWater = node => {
        if (!node || node === area) return false;
        if (protectedNodes.has(node)) return protectedNodes.get(node);
        const ownBackground = node.hasAttribute('data-water-tone') || node.hasAttribute('data-water-surface');
        const style = getComputedStyle(node);
        const opacity = style.backgroundColor.match(/[\d.]+/g)?.map(Number);
        const blocked = node.matches('[data-water-media], .photo-text-contrast, .photo-text-contrast--light, [role="dialog"], dialog, [aria-hidden="true"], .material-symbols-rounded, .desktop-filters, .exploration-label, .bridge-body') ||
          (!ownBackground && (style.backgroundImage !== 'none' || (opacity && (opacity[3] ?? 1) >= .65))) ||
          protectedFromWater(node.parentElement);
        protectedNodes.set(node, blocked);
        return blocked;
      };
      for (const node of area.querySelectorAll(text)) {
        if (!node.textContent?.trim() || protectedFromWater(node)) continue;
        const color = getComputedStyle(node).color;
        const values = color.match(/[\d.]+/g)?.map(Number);
        if (!values) continue;
        const [r, g, b] = values;
        const light = r * .2126 + g * .7152 + b * .0722 >= 150;
        const blue = b - r > 18 && g - r > 10;
        node.dataset.waterInk = `${light ? 'pale' : 'dark'}${blue ? '-blue' : ''}`;
        node.dataset.waterColor = color;
        inkNodes.add(node);
      }
    }
    root.classList.remove('water-measuring');
  }

  function markSurfaces() {
    for (const section of marked) {
      section.removeAttribute('data-water-surface');
    }
    marked.clear();
    surfaces = pageSurfaces();
    for (const section of surfaces) {
      if (section.hasAttribute('data-water-tone')) continue;
      const { backgroundColor, backgroundImage } = getComputedStyle(section);
      if (backgroundImage !== 'none') continue;
      const values = backgroundColor.match(/[\d.]+/g)?.map(Number);
      if (!values || (values[3] ?? 1) < .95) continue;
      const [r, g, b] = values;
      section.dataset.waterSurface = r * .2126 + g * .7152 + b * .0722 < 150 ? 'deep'
        : r >= 250 && g >= 250 && b >= 250 ? 'shore' : 'mist';
      marked.add(section);
    }
    markInk();
  }

  function sampleTheme() {
    const center = innerHeight / 2;
    const active = surfaces.find(section => {
      const rect = section.getBoundingClientRect();
      return !section.hasAttribute('data-water-media') && rect.top <= center && rect.bottom > center;
    });
    const pageTone = main.querySelector('[data-water-page-tone]')?.dataset.waterPageTone;
    theme = pageTone ?? active?.dataset.waterTone ?? active?.dataset.waterSurface ?? 'mist';
    const ribbon = main.querySelector('.eima-three-r.payoff-ready .goals');
    if (!pageTone && ribbon) {
      const bounds = ribbon.getBoundingClientRect();
      const release = innerHeight * (innerWidth <= 767 ? .73 : .84);
      if (bounds.top < innerHeight && bounds.bottom > release) theme = 'deep';
      else if (active?.matches('.eima-three-r .scene') && bounds.bottom <= release) theme = 'mist';
    }
    if (!pageTone && footer && footer.getBoundingClientRect().top <= innerHeight * 1.12) {
      const page = document.scrollingElement;
      // Allow for subpixel rounding at the native end of the scroll range.
      const atEnd = page && page.scrollHeight - page.clientHeight - page.scrollTop <= 1;
      const closingCard = main.querySelector('.home-closing-program .timeline-summary');
      const logo = footer.querySelector('.footer-main-grid svg[role="img"]')?.getBoundingClientRect();
      const mobileFooter = innerWidth <= 767 && (closingCard
        ? closingCard.getBoundingClientRect().bottom <= innerHeight * .65
        : logo && logo.top + logo.height / 2 <= center);
      theme = atEnd || mobileFooter ? 'deep' : 'mist';
    }
    const hero = main.querySelector('.hero-water');
    copyToHero = hero?.getBoundingClientRect().bottom > 0 ? hero : null;
    dictionaryWater = main.querySelector('.dictionary-water');
    progressSurfaces = main.querySelectorAll('.exploration-water, .mobile-step-water');
    goalsWater = main.querySelector('.goals-water');
    needsSample = false;
  }

  function copyWaterRegion(target, rect) {
    const scaleX = canvas.width / canvas.clientWidth;
    const scaleY = canvas.height / canvas.clientHeight;
    const width = Math.max(1, Math.round(rect.width * scaleX));
    const height = Math.max(1, Math.round(rect.height * scaleY));
    if (target.width !== width || target.height !== height) {
      target.width = width;
      target.height = height;
    }
    const context = target.getContext('2d');
    context?.clearRect(0, 0, width, height);
    context?.drawImage(canvas, rect.left * scaleX, rect.top * scaleY, width, height, 0, 0, width, height);
  }

  const main = root.querySelector('main');
  markSurfaces();
  const changes = new MutationObserver(records => {
    if (records.some(record => [...record.addedNodes, ...record.removedNodes]
      .some(node => node instanceof Element && (node.matches('section, article') || node.querySelector('section, article'))))) {
      markSurfaces();
      invalidateTheme();
    }
    if (records.some(record => record.type === 'attributes')) invalidateTheme();
  });
  changes.observe(main, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-water-tone', 'data-water-page-tone'] });

  const water = initWater();
  sampleTheme();
  const tone = [...headerTones[theme]];
  let last = performance.now(), time = STILL ? 14 : 0, frameId = 0;
  function frame(now) {
    frameId = 0;
    const dt = Math.min(.05, (now - last) / 1000);
    last = now;
    if (!STILL) time += dt;
    if (needsSample) sampleTheme();
    const targetTone = headerTones[theme];
    const blend = STILL ? 1 : 1 - Math.exp(-dt / .32);
    for (let i = 0; i < 3; i++) tone[i] += (targetTone[i] - tone[i]) * blend;
    const phase = tone[2] >= .54 ? 'deep' : 'light';
    if (root.dataset.waterPhase !== phase) root.dataset.waterPhase = phase;

    if (water && !root.classList.contains('water-no-gl')) {
      const headerOn = header.dataset.waterHeader === 'true';
      const menuOpen = mobileMenu?.getAttribute('aria-hidden') === 'false';
      const dictionaryRect = dictionaryWater && (STILL || dictionaryWater.parentElement.matches(':hover, .scroll-active'))
        ? dictionaryWater.getBoundingClientRect() : null;
      const dictionaryVisible = dictionaryRect && dictionaryRect.width > 0 && dictionaryRect.top < innerHeight && dictionaryRect.bottom > 0;
      if (menuOpen || dictionaryVisible) {
        water.draw(time, scrollY, 0, headerTones.deep);
        if (menuOpen) {
          copyWaterRegion(menuWater, mobileMenu.getBoundingClientRect());
          copyWaterRegion(headerCanvas, headerCanvas.getBoundingClientRect());
        }
        if (dictionaryVisible) copyWaterRegion(dictionaryWater, dictionaryRect);
      }
      if (goalsWater && !goalsWater.closest('.pin:not(.payoff-ready)')) {
        const rect = goalsWater.getBoundingClientRect();
        if (rect.width > 0 && rect.top < innerHeight && rect.bottom > 0) {
          water.draw(time, scrollY, 0, [tone[2], 0, 1 - tone[2]]);
          copyWaterRegion(goalsWater, rect);
        }
      }
      water.draw(time, scrollY, dt, tone);
      if (!root.classList.contains('water-rendered')) root.classList.add('water-rendered');
      for (const progressWater of progressSurfaces) {
        const rect = progressWater.getBoundingClientRect();
        if (rect.width > 0 && rect.top < innerHeight && rect.bottom > 0) copyWaterRegion(progressWater, rect);
      }
      if (headerContext && headerOn) {
        const height = Math.max(1, Math.round((header.offsetHeight + headerFade) * canvas.height / canvas.clientHeight));
        if (headerCanvas.width !== canvas.width || headerCanvas.height !== height) {
          headerCanvas.width = canvas.width;
          headerCanvas.height = height;
        }
        headerContext.drawImage(canvas, 0, 0, canvas.width, height, 0, 0, canvas.width, height);
      }
      if (copyToHero && !STILL) {
        const context = copyToHero.getContext('2d');
        if (copyToHero.width !== canvas.width || copyToHero.height !== canvas.height) {
          copyToHero.width = canvas.width;
          copyToHero.height = canvas.height;
        }
        context?.drawImage(canvas, 0, 0);
      }
      if (!STILL) schedule();
    } else {
      const fading = Math.abs(tone[2] - targetTone[2]) > .005;
      root.style.setProperty('--water-deep-opacity', String(fading ? tone[2] : targetTone[2]));
      if (fading) schedule();
    }
  }
  function schedule() {
    if (!frameId) frameId = requestAnimationFrame(frame);
  }
  function invalidateTheme() { needsSample = true; schedule(); }
  const headerChanges = new MutationObserver(schedule);
  headerChanges.observe(header, { attributes: true, attributeFilter: ['data-water-header'] });
  if (mobileMenu) headerChanges.observe(mobileMenu, { attributes: true, attributeFilter: ['aria-hidden'] });
  window.addEventListener('scroll', invalidateTheme, { passive: true, signal });
  window.addEventListener('resize', invalidateTheme, { signal });
  const headerSize = new ResizeObserver(() => {
    root.style.setProperty('--water-header-height', header.offsetHeight + 'px');
    schedule();
  });
  headerSize.observe(header);
  const contentSize = new ResizeObserver(invalidateTheme);
  contentSize.observe(main);
  if (footer) contentSize.observe(footer);
  function stop() {
    controller.abort();
    cancelAnimationFrame(frameId);
    changes.disconnect();
    headerChanges.disconnect();
    headerSize.disconnect();
    contentSize.disconnect();
    for (const section of marked) {
      section.removeAttribute('data-water-surface');
    }
    for (const node of inkNodes) {
      node.removeAttribute('data-water-ink');
      node.removeAttribute('data-water-color');
    }
    root.classList.remove('water-no-gl', 'water-rendered');
    delete root.dataset.waterPhase;
    root.style.removeProperty('--water-deep-opacity');
    canvas.style.visibility = '';
  }
  schedule();
  return stop;
}

/** @param {HTMLElement} root */
export function siteWater(root) {
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let stop = startWater(root, motion, refresh);
  function refresh() { stop(); stop = startWater(root, motion, refresh); }
  motion.addEventListener('change', refresh);
  return {
    destroy() { motion.removeEventListener('change', refresh); stop(); }
  };
}
