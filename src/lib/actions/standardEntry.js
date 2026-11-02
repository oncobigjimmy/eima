/** Standard one-shot entrance. A group staggers at most four elements.
 * @param {HTMLElement} node @param {number} [index] */
export function standardEntry(node, index = 0) {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (motion.matches || !('IntersectionObserver' in window)) return {};
  node.style.setProperty('--entry-index', String(Math.min(3, Math.max(0, index))));
  node.classList.add('standard-entry-pending');
  /** @type {ReturnType<typeof setTimeout> | undefined} */
  let timer;
  const show = () => {
    clearTimeout(timer);
    node.classList.add('standard-entry-visible');
    observer.disconnect();
    // Release transform/opacity so existing focus and hover states can take over.
    timer = setTimeout(() => node.classList.remove('standard-entry-pending', 'standard-entry-visible'), motion.matches ? 0 : 700);
  };
  const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) show(); }, { threshold: .12, rootMargin: '0px 0px -10% 0px' });
  const changed = () => { if (motion.matches) show(); };
  motion.addEventListener('change', changed);
  observer.observe(node);
  return { destroy() { observer.disconnect(); clearTimeout(timer); motion.removeEventListener('change', changed); } };
}
