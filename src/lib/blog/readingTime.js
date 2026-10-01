/** @param {unknown} text */
export function readingTime(text) {
  const words = String(text ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
