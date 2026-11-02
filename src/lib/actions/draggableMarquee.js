const duration = 75000;

/** Keep an offset in the first of the two identical copies. @param {number} value @param {number} width */
export function wrapMarqueeOffset(value, width) {
  return width > 0 ? -(((-value % width) + width) % width) : 0;
}

/** @param {number} offset @param {number} width @param {boolean} reverse */
export function marqueeTimeForOffset(offset, width, reverse) {
  const progress = width > 0 ? -wrapMarqueeOffset(offset, width) / width : 0;
  return (reverse ? 1 - progress : progress) * duration;
}

/**
 * One timeline drives both automatic motion and direct manipulation, so a drag
 * also works while paused and resuming never jumps back to an old position.
 * @param {HTMLElement} node
 * @param {{ paused: boolean; reverse: boolean }} options
 */
export function draggableMarquee(node, options) {
  const selectedTrack = node.querySelector('.marquee-track');
  if (!(selectedTrack instanceof HTMLElement)) return {};
  const track = selectedTrack;
  /** @type {Animation | undefined} */
  let animation;
  let width = 0, hovered = false, focused = false, dragging = false, suppressClick = false;
  /** @type {{ id: number; x: number; offset: number; moved: boolean } | null} */
  let pointer = null;

  function sync() {
    if (!animation) return;
    if (options.paused || hovered || focused || dragging) animation.pause();
    else animation.play();
  }
  function rebuild() {
    const previousTime = Number(animation?.currentTime ?? 0);
    width = track.scrollWidth / 2;
    animation?.cancel();
    animation = track.animate([{ transform: 'translateX(0px)' }, { transform: `translateX(${-width}px)` }], {
      duration, iterations: Infinity, easing: 'linear', direction: options.reverse ? 'reverse' : 'normal'
    });
    animation.currentTime = previousTime;
    sync();
  }
  function offset() {
    const progress = ((Number(animation?.currentTime ?? 0) % duration) + duration) % duration / duration;
    return -width * (options.reverse ? 1 - progress : progress);
  }
  /** @param {number} value */
  function scrub(value) {
    if (animation) animation.currentTime = marqueeTimeForOffset(value, width, options.reverse);
  }
  /** @param {PointerEvent} event */
  function down(event) {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    pointer = { id: event.pointerId, x: event.clientX, offset: offset(), moved: false };
  }
  /** @param {PointerEvent} event */
  function move(event) {
    if (!pointer || pointer.id !== event.pointerId) return;
    const dx = event.clientX - pointer.x;
    if (!pointer.moved && Math.abs(dx) < 6) return;
    if (!pointer.moved) {
      pointer.moved = true; dragging = true; suppressClick = true;
      node.classList.add('is-dragging'); node.setPointerCapture(event.pointerId); sync();
    }
    event.preventDefault();
    scrub(pointer.offset + dx);
  }
  /** @param {PointerEvent} event */
  function up(event) {
    if (!pointer || pointer.id !== event.pointerId) return;
    pointer = null; dragging = false; node.classList.remove('is-dragging');
    if (node.hasPointerCapture(event.pointerId)) node.releasePointerCapture(event.pointerId);
    sync();
  }
  /** @param {MouseEvent} event */
  function click(event) {
    if (suppressClick) { event.preventDefault(); event.stopPropagation(); suppressClick = false; }
  }
  function enter() { hovered = true; sync(); }
  function leave() { hovered = false; sync(); }
  function focusIn() { focused = true; sync(); }
  function focusOut() { queueMicrotask(() => { focused = node.contains(document.activeElement); sync(); }); }
  /** @param {KeyboardEvent} event */
  function keydown(event) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault(); scrub(offset() + (event.key === 'ArrowLeft' ? 284 : -284));
  }
  node.addEventListener('pointerdown', down);
  node.addEventListener('pointermove', move);
  node.addEventListener('pointerup', up);
  node.addEventListener('pointercancel', up);
  node.addEventListener('click', click, true);
  node.addEventListener('pointerenter', enter);
  node.addEventListener('pointerleave', leave);
  node.addEventListener('focusin', focusIn);
  node.addEventListener('focusout', focusOut);
  node.addEventListener('keydown', keydown);
  const observer = new ResizeObserver(rebuild);
  observer.observe(track); rebuild();
  return {
    /** @param {typeof options} value */
    update(value) { options = value; sync(); },
    destroy() {
      observer.disconnect(); animation?.cancel();
      node.removeEventListener('pointerdown', down); node.removeEventListener('pointermove', move);
      node.removeEventListener('pointerup', up); node.removeEventListener('pointercancel', up);
      node.removeEventListener('click', click, true); node.removeEventListener('pointerenter', enter);
      node.removeEventListener('pointerleave', leave); node.removeEventListener('focusin', focusIn);
      node.removeEventListener('focusout', focusOut); node.removeEventListener('keydown', keydown);
    }
  };
}
