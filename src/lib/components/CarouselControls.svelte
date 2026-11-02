<script lang="ts">
  export let current: number;
  export let total: number;
  export let previousLabel: string;
  export let nextLabel: string;
  export let positionLabel = 'de';
  export let previous: () => void;
  export let next: () => void;
</script>

<div class="carousel-controls">
  <button class="carousel-arrow" type="button" data-direction="previous" aria-label={previousLabel} disabled={current === 0} on:click={previous}>
    <span class="arrow-icon" aria-hidden="true">{#each [0, 1] as copy}<svg viewBox="0 0 24 24" fill="none"><path d="M20 12H4m6-6-6 6 6 6" /></svg>{/each}</span>
  </button>
  <span class="carousel-position" aria-live="polite" aria-atomic="true">{current + 1} {positionLabel} {total}</span>
  <button class="carousel-arrow" type="button" data-direction="next" aria-label={nextLabel} disabled={current === total - 1} on:click={next}>
    <span class="arrow-icon" aria-hidden="true">{#each [0, 1] as copy}<svg viewBox="0 0 24 24" fill="none"><path d="M4 12h16m-6-6 6 6-6 6" /></svg>{/each}</span>
  </button>
  <slot />
</div>

<style>
  .carousel-controls { position: relative; display: flex; align-items: center; justify-content: center; gap: 12px; width: fit-content; margin: 0 auto; }
  .carousel-arrow { display: grid; place-items: center; width: 48px; height: 48px; border: 0; border-radius: 999px; color: #233f4e; background: #8cd0d6; transition: background var(--dur-estado) var(--ease-calma), transform var(--dur-estado) var(--ease-calma), box-shadow var(--dur-estado) var(--ease-calma); }
  .carousel-arrow:disabled { opacity: .45; cursor: default; }
  .carousel-position { min-width: 56px; text-align: center; color: #233f4e; font: 400 14px/1.4 Inter, sans-serif; font-variant-numeric: tabular-nums; }
  .arrow-icon { position: relative; display: block; width: 21px; height: 21px; overflow: hidden; }
  svg { display: block; position: absolute; inset: 0; width: 21px; height: 21px; stroke: currentColor; stroke-width: 1.5; stroke-linecap: round; stroke-linejoin: round; transition: transform 450ms cubic-bezier(.3,.9,.3,1); }
  [data-direction='next'] svg:last-child { transform: translateX(-150%); }
  [data-direction='previous'] svg:last-child { transform: translateX(150%); }
  .carousel-arrow:focus-visible { outline: 2px solid #245b7d; outline-offset: 4px; }
  .carousel-arrow:focus-visible:not(:disabled) { background: #4083a7; color: #fff; box-shadow: 0 10px 24px #233f4e24; }
  [data-direction='next']:focus-visible svg:first-child { transform: translateX(150%); }
  [data-direction='previous']:focus-visible svg:first-child { transform: translateX(-150%); }
  .carousel-arrow:focus-visible svg:last-child { transform: translateX(0); }
  .carousel-arrow:focus-visible svg { stroke-width: 2.25; }
  @media (hover: hover) and (pointer: fine) {
    .carousel-arrow:hover:not(:disabled) { background: #4083a7; color: #fff; box-shadow: 0 10px 24px #233f4e24; transform: translateY(-2px); }
    [data-direction='next']:hover svg:first-child { transform: translateX(150%); }
    [data-direction='previous']:hover svg:first-child { transform: translateX(-150%); }
    .carousel-arrow:hover svg:last-child { transform: translateX(0); } .carousel-arrow:hover svg { stroke-width: 2.25; }
  }
  @media (hover: none) and (prefers-reduced-motion: no-preference), (pointer: coarse) and (prefers-reduced-motion: no-preference) { .carousel-arrow:active:not(:disabled) { transform: scale(.97); transition-duration: 100ms; } }
  @media (prefers-reduced-motion: reduce) { svg, .carousel-arrow { transition: none; } .carousel-controls .carousel-arrow:not(:disabled) { transform: none; } }
</style>
