// Mobile counterpart of a card's hover: active while crossing the screen centre.
// All cards share one passive listener and one animation frame per scroll.
/** @type {Set<HTMLElement>} */
const cards = new Set();
/** @type {WeakMap<HTMLElement, Element | null>} */
const groups = new WeakMap();
let frame = 0;
/** @type {MediaQueryList} */
let mobile;
/** @type {ResizeObserver} */
let resizeObserver;

function update() {
  frame = 0;
  const height = window.innerHeight;
  const selected = new Map();
  for (const node of cards) {
    const rect = node.getBoundingClientRect();
    if (mobile.matches && rect.top <= height * .55 && rect.bottom >= height * .45) {
      const distance = Math.abs((rect.top + rect.bottom) / 2 - height / 2);
      const group = groups.get(node);
      if (!selected.has(group) || distance < selected.get(group).distance) selected.set(group, { node, distance });
    }
  }
  for (const node of cards) node.classList.toggle('scroll-active', selected.get(groups.get(node))?.node === node);
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(update);
}

/**
 * @param {HTMLElement} node
 * @param {string} [groupSelector] Optional ancestor shared by nested cards.
 */
export function scrollContrast(node, groupSelector) {
  if (!cards.size) {
    mobile = window.matchMedia('(max-width: 767px)');
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mobile.addEventListener('change', schedule);
    resizeObserver = new ResizeObserver(schedule);
  }
  cards.add(node);
  groups.set(node, groupSelector ? node.closest(groupSelector) ?? node.parentElement : node.parentElement);
  resizeObserver.observe(node);
  schedule();
  return {
    destroy() {
      cards.delete(node);
      groups.delete(node);
      resizeObserver.unobserve(node);
      node.classList.remove('scroll-active');
      if (!cards.size) {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
        mobile.removeEventListener('change', schedule);
        resizeObserver.disconnect();
        if (frame) cancelAnimationFrame(frame);
        frame = 0;
      }
    }
  };
}
