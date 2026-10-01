// Shared keyboard, focus and background handling for the existing overlays.
/**
 * @param {HTMLElement} node
 * @param {{ active?: boolean, close: () => void, include?: string }} options
 */
export function dialog(node, options) {
  let active = false;
  /** @type {HTMLElement | null} */
  let opener = null;
  let previousOverflow = '';
  /** @type {Map<HTMLElement, boolean>} */
  const background = new Map();
  /** @type {HTMLElement[]} */
  const guards = [];
  const included = () => (options.include ? document.querySelector(options.include) : null);
  const focusable = () =>
    [
      ...(included()?.querySelectorAll('a[href], button, [tabindex]') ?? []),
      ...node.querySelectorAll('a[href], button, iframe, [tabindex]')
    ].filter(
      (element) =>
        element instanceof HTMLElement &&
        element.tabIndex >= 0 &&
        !element.matches(':disabled, [data-dialog-guard]') &&
        !element.closest('[inert]') &&
        element.getClientRects().length &&
        getComputedStyle(element).visibility !== 'hidden'
    );

  /** @param {KeyboardEvent} event */
  function keydown(event) {
    if (event.target instanceof Element && event.target.closest('[role="menu"]')) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopPropagation();
      options.close();
    } else if (event.key === 'Tab') {
      const elements = focusable();
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (!first) {
        event.preventDefault();
        node.focus();
      } else if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === node)
      ) {
        event.preventDefault();
        if (last instanceof HTMLElement) last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        if (first instanceof HTMLElement) first.focus();
      }
    }
  }

  function deactivate() {
    if (!active) return;
    active = false;
    document.removeEventListener('keydown', keydown, true);
    for (const [element, wasInert] of background) element.inert = wasInert;
    background.clear();
    for (const guard of guards) guard.remove();
    guards.length = 0;
    document.body.style.overflow = previousOverflow;
    if (opener?.isConnected) opener.focus({ preventScroll: true });
  }

  function sync() {
    if (options.active === false) {
      deactivate();
      return;
    }
    if (active) return;
    active = true;
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let branch = node;
    while (branch.parentElement && branch.parentElement !== document.body) {
      for (const sibling of branch.parentElement.children) {
        if (!(sibling instanceof HTMLElement) || sibling === branch || sibling === included())
          continue;
        background.set(sibling, sibling.inert);
        sibling.inert = true;
      }
      branch = branch.parentElement;
    }
    document.addEventListener('keydown', keydown, true);
    // Focus guards also catch Tab leaving a cross-origin video frame, whose
    // key events cannot reach the parent document.
    for (const atStart of [true, false]) {
      const guard = document.createElement('span');
      guard.tabIndex = 0;
      guard.dataset.dialogGuard = '';
      guard.style.cssText =
        'position:fixed;width:1px;height:1px;overflow:hidden;opacity:0;pointer-events:none';
      guard.addEventListener('focus', () => {
        const elements = focusable();
        const target = atStart ? elements[elements.length - 1] : elements[0];
        if (target instanceof HTMLElement) target.focus();
      });
      if (atStart) node.prepend(guard);
      else node.append(guard);
      guards.push(guard);
    }
    queueMicrotask(() => {
      if (!active) return;
      const first = node.querySelector('button:not([tabindex="-1"]), a[href]');
      if (first instanceof HTMLElement) first.focus({ preventScroll: true });
      else node.focus({ preventScroll: true });
    });
  }
  sync();
  return {
    /** @param {typeof options} next */
    update(next) {
      options = next;
      sync();
    },
    destroy: deactivate
  };
}
