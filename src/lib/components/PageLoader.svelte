<script>
  import { onMount } from 'svelte';
  import { mallorcaPath, mallorcaLetterPath } from '$lib/brand/mallorca';

  let visible = false;
  let progress = 0;

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    visible = true;
    progress = reduced ? 1 : 0;
    let frame = 0;
    const started = performance.now();
    /** @param {number} now */
    function update(now) {
      progress = Math.min(1, (now - started) / 700);
      if (progress < 1) frame = requestAnimationFrame(update);
    }
    if (!reduced) frame = requestAnimationFrame(update);
    const dismissTimer = setTimeout(() => { visible = false; cancelAnimationFrame(frame); }, 700);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(dismissTimer);
    };
  });
</script>

{#if visible}
  <div class="page-loader" aria-hidden="true">
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
    inset: 0;
    display: grid;
    place-items: center;
    -webkit-backdrop-filter: blur(16px);
    backdrop-filter: blur(16px);
    pointer-events: none;
    opacity: 1;
    /* A failed JS bundle must not leave the mark on screen indefinitely. */
    animation: loader-failsafe 0s .7s forwards;
  }
  .page-loader svg {
    display: block;
    width: clamp(120px, 18vw, 160px);
    overflow: visible;
    filter: drop-shadow(0 3px 5px #071a25b3) drop-shadow(0 8px 20px #071a2580);
  }
  @keyframes loader-failsafe { to { visibility: hidden; } }
</style>
