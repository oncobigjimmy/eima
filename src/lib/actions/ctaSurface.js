/** Find the nearest painted background, ignoring translucent decorative layers.
 * @param {Element | null} node */
export function surfaceIsDark(node) {
  for (let parent = node; parent; parent = parent.parentElement) {
    const values = getComputedStyle(parent).backgroundColor.match(/[\d.]+/g)?.map(Number);
    if (!values || (values.length > 3 && values[3] < .9)) continue;
    return (values[0] * .2126 + values[1] * .7152 + values[2] * .0722) < 150;
  }
  return false;
}

/** @param {HTMLElement} node @param {'auto'|'light'|'dark'|'hero'} surface */
export function ctaSurface(node, surface) {
  function sync() {
    const dark = surface === 'dark' || surface === 'hero' || (surface === 'auto' && surfaceIsDark(node.parentElement));
    node.style.setProperty('--cta-hover', dark ? '#4083a7' : '#245b7d');
  }
  sync();
  node.addEventListener('pointerenter', sync);
  node.addEventListener('focus', sync);
  return {
    /** @param {'auto'|'light'|'dark'|'hero'} value */
    update(value) { surface = value; sync(); },
    destroy() { node.removeEventListener('pointerenter', sync); node.removeEventListener('focus', sync); }
  };
}
