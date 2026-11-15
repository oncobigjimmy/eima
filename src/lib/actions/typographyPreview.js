/**
 * Keeps the preview at three CSS pixels above every responsive Newsreader
 * size. The comparison only changes coloured fragments of Playfair headings.
 * @param {HTMLElement} root
 * @param {'playfair' | 'newsreader'} variant
 */
export function typographyPreview(root, variant) {
  /** @type {Map<HTMLElement, Map<string, [string, string]>>} */
  const previous = new Map();
  let frame = 0;

  function restore() {
    for (const [node, styles] of previous) {
      for (const [name, [value, priority]] of styles) {
        if (value) node.style.setProperty(name, value, priority);
        else node.style.removeProperty(name);
      }
    }
    previous.clear();
  }

  /** @param {HTMLElement} node @param {string} name @param {string} value */
  function change(node, name, value) {
    const styles = previous.get(node) ?? new Map();
    styles.set(name, [node.style.getPropertyValue(name), node.style.getPropertyPriority(name)]);
    previous.set(node, styles);
    node.style.setProperty(name, value, 'important');
  }

  function apply() {
    frame = 0;
    restore();
    /** @type {{node: HTMLElement, pixels: number, weight: number, accent: boolean}[]} */
    const updates = [];
    for (const node of root.querySelectorAll('*')) {
      if (!(node instanceof HTMLElement) || !node.textContent?.trim() || node.matches('script, style, option') || node.closest('[data-newsreader-fixed]')) continue;
      const style = getComputedStyle(node);
      const isNewsreader = /^["']?Newsreader\b/.test(style.fontFamily);
      let accent = false;
      if (/^["']?Playfair Display\b/.test(style.fontFamily) && node.matches('span, em, strong, b, i')) {
        const parent = node.closest('h1, h2, h3, h4, h5, h6, [role="heading"]');
        if (parent) {
          const title = getComputedStyle(parent);
          accent = /^["']?Playfair Display\b/.test(title.fontFamily) &&
            (parent.getAttribute('data-water-color') ?? title.color) !== (node.dataset.waterColor ?? style.color);
        }
      }
      if (isNewsreader || accent) updates.push({
        node, pixels: parseFloat(style.fontSize), weight: Number(style.fontWeight), accent
      });
    }

    for (const { node, accent, pixels, weight } of updates) {
      if (accent) {
        change(node, 'font-style', 'italic');
        if (variant === 'playfair') continue;
        change(node, 'font-optical-sizing', 'auto');
        change(node, 'letter-spacing', '-.026em');
      }
      change(node, 'font-family', 'Newsreader, "Iowan Old Style", "Palatino Linotype", Georgia, serif');
      if (accent || weight < 400) change(node, 'font-weight', '400');
      change(node, 'font-size', `${pixels + 3}px`);
    }
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(apply);
  }

  const observer = new MutationObserver(records => {
    if (records.some(record => [...record.addedNodes, ...record.removedNodes].some(node => node instanceof HTMLElement))) schedule();
  });
  observer.observe(root, { childList: true, subtree: true });
  window.addEventListener('resize', schedule);
  schedule();

  return {
    /** @param {'playfair' | 'newsreader'} next */
    update(next) { variant = next; schedule(); },
    destroy() {
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
      restore();
    }
  };
}
