<script>
  import { onMount } from 'svelte';
  import { mallorcaPath, mallorcaLetterPath } from '$lib/brand/mallorca';

  let visible = true;
  let progress = 0;
  let finishing = false;

  onMount(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      visible = false;
      return;
    }
    let loaded = document.readyState === 'complete';
    let fontsReady = false;
    let stopped = false;
    let frame = 0;
    const started = performance.now();
    let previous = started;
    /** @type {ReturnType<typeof setTimeout> | undefined} */
    let dismissTimer;
    const onLoad = () => { loaded = true; };
    window.addEventListener('load', onLoad, { once: true });
    document.fonts.ready.then(() => { fontsReady = true; });

    /** @param {number} now */
    function update(now) {
      if (stopped) return;
      const elapsed = now - started;
      // Decorative loading mark: wait for the document and fonts, without
      // blocking interaction or claiming a percentage of downloaded bytes.
      const ready = (loaded && fontsReady && elapsed >= 700) || elapsed >= 4500;
      progress = ready
        ? Math.min(1, progress + Math.min(now - previous, 50) / 220)
        : Math.min(.9, elapsed / 900);
      previous = now;
      if (progress === 1) {
        finishing = true;
        dismissTimer = setTimeout(() => { visible = false; }, 220);
      } else {
        frame = requestAnimationFrame(update);
      }
    }
    frame = requestAnimationFrame(update);
    return () => {
      stopped = true;
      cancelAnimationFrame(frame);
      if (dismissTimer) clearTimeout(dismissTimer);
      window.removeEventListener('load', onLoad);
    };
  });
</script>

{#if visible}
  <div class="page-loader" class:page-loader--finishing={finishing} aria-hidden="true">
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <path id="loader-mallorca" d={mallorcaPath} />
        <path id="loader-mallorca-e" d={mallorcaLetterPath} />
        <clipPath id="loader-mallorca-fill">
          <rect x="0" y={512 * (1 - progress)} width="512" height={512 * progress} />
        </clipPath>
      </defs>
      <g>
        <use href="#loader-mallorca" fill="#fff" />
        <use href="#loader-mallorca-e" fill="#4083A7" />
      </g>
      <g clip-path="url(#loader-mallorca-fill)">
        <use href="#loader-mallorca" fill="#4083A7" />
        <use href="#loader-mallorca-e" fill="#fff" />
      </g>
    </svg>
  </div>
{/if}

<style>
  .page-loader {
    position: fixed;
    z-index: 100;
    top: 50%;
    left: 50%;
    width: clamp(120px, 18vw, 160px);
    transform: translate(-50%, -50%);
    pointer-events: none;
    opacity: 1;
    transition: opacity 220ms ease-out;
    /* A failed JS bundle must not leave the mark on screen indefinitely. */
    animation: loader-failsafe 0s 6s forwards;
  }
  .page-loader svg {
    display: block;
    width: 100%;
    overflow: visible;
    filter: drop-shadow(0 3px 5px #071a25b3) drop-shadow(0 8px 20px #071a2580);
  }
  .page-loader--finishing { opacity: 0; }
  @keyframes loader-failsafe { to { visibility: hidden; } }
  @media (prefers-reduced-motion: reduce) { .page-loader { display: none; } }
</style>
