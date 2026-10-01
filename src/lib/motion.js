/** @param {(reduced: boolean) => void} update */
export function watchReducedMotion(update) {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const sync = () => update(preference.matches);
  sync();
  preference.addEventListener('change', sync);
  return () => preference.removeEventListener('change', sync);
}

/** @param {number} duration */
export function motionDuration(duration) {
  return typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 0
    : duration;
}
