/** @param {{left:number;right:number;top:number;bottom:number;width:number;height:number}} card
 * @param {{left:number;right:number;top:number;bottom:number}} viewport */
export function hasExplorableArea(card, viewport) {
  const width = Math.max(0, Math.min(card.right, viewport.right) - Math.max(card.left, viewport.left));
  const height = Math.max(0, Math.min(card.bottom, viewport.bottom) - Math.max(card.top, viewport.top));
  return card.width > 0 && card.height > 0 && width >= card.width * .6 &&
    height >= Math.min(card.height * .5, (viewport.bottom - viewport.top) * .5);
}

/** Track unique screenshots across both physical copies of each moving row.
 * @param {HTMLElement} node
 * @param {{top:number; blocked:boolean; onSeen:(id:string)=>void}} options */
export function trackExplored(node, options) {
  const reported = new Set();
  /** @type {Set<HTMLElement>} */
  const candidates = new Set();
  /** @type {Map<HTMLElement, number>} */
  const since = new Map();
  /** @type {Set<HTMLElement>} */
  let observed = new Set();
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      const card = /** @type {HTMLElement} */ (entry.target);
      if (entry.isIntersecting) candidates.add(card);
      else { candidates.delete(card); since.delete(card); }
    }
  });
  function refresh() {
    const next = new Set([...node.querySelectorAll('[data-testimonial-id]')].filter(card => card instanceof HTMLElement));
    for (const card of observed) if (!next.has(card)) {
      observer.unobserve(card); candidates.delete(card); since.delete(card);
    }
    for (const card of next) if (!observed.has(card)) observer.observe(card);
    observed = next;
  }
  const mutations = new MutationObserver(refresh);
  mutations.observe(node, { childList: true, subtree: true });
  refresh();
  const timer = window.setInterval(() => {
    if (document.hidden || options.blocked) { since.clear(); return; }
    const now = performance.now();
    for (const card of candidates) {
      const id = card.dataset.testimonialId;
      if (!id || reported.has(id)) continue;
      const viewport = { left: 0, right: document.documentElement.clientWidth, top: options.top, bottom: window.innerHeight };
      const clip = card.closest('.marquee-window')?.getBoundingClientRect();
      if (clip) {
        viewport.left = Math.max(viewport.left, clip.left); viewport.right = Math.min(viewport.right, clip.right);
      }
      if (viewport.bottom <= viewport.top || !hasExplorableArea(card.getBoundingClientRect(), viewport)) { since.delete(card); continue; }
      const start = since.get(card);
      if (start === undefined) since.set(card, now);
      else if (now - start >= 400) { reported.add(id); since.delete(card); options.onSeen(id); }
    }
  }, 250);
  return {
    /** @param {typeof options} value */
    update(value) { options = value; },
    destroy() { clearInterval(timer); observer.disconnect(); mutations.disconnect(); candidates.clear(); since.clear(); }
  };
}
