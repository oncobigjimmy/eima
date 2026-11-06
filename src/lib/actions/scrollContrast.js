// Mobile counterpart of a card's hover: active while crossing the screen centre.
// All cards share one passive listener and one animation frame per scroll.
/** @type {Set<HTMLElement>} */
const cards = new Set();
/** @type {WeakMap<HTMLElement, Element | null>} */
const groups = new WeakMap();
/** @type {WeakMap<HTMLElement, number>} */
const visibleRatios = new WeakMap();
let frame = 0;
/** @type {MediaQueryList} */
let mobile;
/** @type {ResizeObserver} */
let resizeObserver;

function update() {
  frame = 0;
  const height = window.innerHeight;
  const viewportTop = Math.max(0, document.querySelector('header')?.getBoundingClientRect().bottom ?? 0);
  const selected = new Map();
  for (const node of cards) {
    const rect = node.getBoundingClientRect();
    const ratio = visibleRatios.get(node) ?? 0;
    const visibleHeight = Math.max(0, Math.min(rect.bottom, height) - Math.max(rect.top, viewportTop));
    const eligible = ratio ? visibleHeight / rect.height >= ratio : rect.top <= height * .55 && rect.bottom >= height * .45;
    if (mobile.matches && eligible) {
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
 * @param {string | {groupSelector?: string, visibleRatio?: number}} [options]
 */
export function scrollContrast(node, options) {
  const groupSelector = typeof options === 'string' ? options : options?.groupSelector;
  if (!cards.size) {
    mobile = window.matchMedia('(max-width: 767px)');
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mobile.addEventListener('change', schedule);
    resizeObserver = new ResizeObserver(schedule);
  }
  cards.add(node);
  visibleRatios.set(node, typeof options === 'object' ? options.visibleRatio ?? 0 : 0);
  groups.set(node, groupSelector ? node.closest(groupSelector) ?? node.parentElement : node.parentElement);
  resizeObserver.observe(node);
  schedule();
  return {
    destroy() {
      cards.delete(node);
      groups.delete(node);
      visibleRatios.delete(node);
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
