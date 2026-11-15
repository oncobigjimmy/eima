/** @type {typeof import('./eima-barras-engine').EimaBars | undefined} */
let bars;

/** @typedef {{ value?: number, slide?: number, visible?: boolean, externalScroll?: boolean }} BarOptions */

/** @param {HTMLElement} node @param {BarOptions} [options] */
export function eimaBar(node, options = {}) {
  let disposed = false;
  let initialized = false;

  function update() {
    if (!initialized || !bars || options.value === undefined) return;
    if (options.slide !== undefined && options.visible) bars.play(node, options.value);
    else bars.set(node, options.value);
  }

  import('./eima-barras-engine').then(({ EimaBars }) => {
    if (disposed) return;
    bars = EimaBars;
    bars.init(node, options.externalScroll);
    initialized = true;
    update();
  });

  return {
    /** @param {BarOptions} value */
    update(value) { options = value; update(); },
    destroy() { disposed = true; if (initialized) bars?.destroy(node); }
  };
}

/** @param {HTMLElement} node @param {number} progress */
export function setBar(node, progress) {
  bars?.set(node, progress);
}
