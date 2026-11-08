<script lang="ts">
  import { ctaSurface } from '$lib/actions/ctaSurface';
  export let surface: 'auto' | 'light' | 'dark' | 'hero' = 'auto';
  export let href: string | undefined = undefined;
  export let label: string;
  export let target: string | undefined = undefined;
  export let rel: string | undefined = undefined;
  export let type: 'button' | 'submit' = 'button';
  export let ariaLabel: string | undefined = undefined;
  export let onClick: ((event: MouseEvent) => void) | undefined = undefined;
  export let shadowless = false;
  let className = '';
  export { className as class };
</script>

{#if href}
  <a use:ctaSurface={surface} class={`primary-cta cta-arrow-button ${className}`} class:primary-cta--shadowless={shadowless} {href} {target} {rel} aria-label={ariaLabel} on:click={onClick}>
    <span class="primary-cta__label">{label}</span>
    <span class="cta-arrow-swap" aria-hidden="true">
      <svg class="cta-arrow-swap__right" viewBox="0 0 256 256" fill="currentColor"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" /></svg>
      <svg class="cta-arrow-swap__up" viewBox="0 0 256 256" fill="currentColor"><path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" /></svg>
    </span>
  </a>
{:else}
  <button use:ctaSurface={surface} class={`primary-cta cta-arrow-button ${className}`} class:primary-cta--shadowless={shadowless} {type} aria-label={ariaLabel} on:click={onClick}>
    <span class="primary-cta__label">{label}</span>
    <span class="cta-arrow-swap" aria-hidden="true">
      <svg class="cta-arrow-swap__right" viewBox="0 0 256 256" fill="currentColor"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" /></svg>
      <svg class="cta-arrow-swap__up" viewBox="0 0 256 256" fill="currentColor"><path d="M204,64V168a12,12,0,0,1-24,0V93L72.49,200.49a12,12,0,0,1-17-17L163,76H88a12,12,0,0,1,0-24H192A12,12,0,0,1,204,64Z" /></svg>
    </span>
  </button>
{/if}

<style>
  .primary-cta { position: relative; isolation: isolate; overflow: hidden; display: inline-flex; width: fit-content; min-width: 44px; min-height: 44px; align-items: center; justify-content: center; gap: .55rem; border: 0; border-radius: 999px; background: #8cd0d6; padding: .75rem 1.75rem; color: #233f4e; font-family: 'Inter', Arial, sans-serif; font-size: 15px; font-weight: 500; line-height: 1.4; text-align: center; text-decoration: none; cursor: pointer; transition: transform var(--dur-estado) var(--ease-calma), background-color var(--dur-estado) var(--ease-calma), color var(--dur-estado) var(--ease-calma), font-weight var(--dur-estado) var(--ease-calma), box-shadow var(--dur-estado) var(--ease-calma); }
  .primary-cta::before { content: ''; position: absolute; z-index: 0; top: 0; left: 0; width: 44%; height: 100%; background: linear-gradient(90deg, transparent, #ffffff8c, transparent); transform: translateX(-180%) skewX(-18deg); transition: transform var(--dur-estado) var(--ease-calma); }
  .primary-cta__label { position: relative; z-index: 1; transition: text-shadow var(--dur-estado) var(--ease-calma); }
.primary-cta:focus-visible .primary-cta__label { text-shadow: var(--eima-active-text-shadow); }
@media (hover: hover) and (pointer: fine) { .primary-cta:hover .primary-cta__label { text-shadow: var(--eima-active-text-shadow); } }
.primary-cta:focus-visible :global(.cta-arrow-swap svg) { filter: drop-shadow(0 0 3px #071a2566) drop-shadow(0 0 7px #071a2533); }
@media (hover: hover) and (pointer: fine) { .primary-cta:hover :global(.cta-arrow-swap svg) { filter: drop-shadow(0 0 3px #071a2566) drop-shadow(0 0 7px #071a2533); } }
.primary-cta:focus-visible { transform: translateY(-3px) scale(1.03); background: var(--cta-hover, #4083a7); color: white; font-weight: 700; box-shadow: 0 10px 24px #4083a747; }
@media (hover: hover) and (pointer: fine) { .primary-cta:hover { transform: translateY(-3px) scale(1.03); background: var(--cta-hover, #4083a7); color: white; font-weight: 700; box-shadow: 0 10px 24px #4083a747; } }
@media (hover: none), (pointer: coarse) { .primary-cta:active { background: var(--cta-hover, #4083a7); color: white; } }
.primary-cta.primary-cta--shadowless, .primary-cta.primary-cta--shadowless:focus-visible { box-shadow: none; text-shadow: none; }
@media (hover: hover) and (pointer: fine) { .primary-cta.primary-cta--shadowless:hover { box-shadow: none; text-shadow: none; } }
.primary-cta:focus-visible::before { transform: translateX(260%) skewX(-18deg); }
@media (hover: hover) and (pointer: fine) { .primary-cta:hover::before { transform: translateX(260%) skewX(-18deg); } }
  @media (prefers-reduced-motion: reduce) { .primary-cta, .primary-cta::before, .primary-cta__label { transition: none; }
.primary-cta:focus-visible { transform: none; }
@media (hover: hover) and (pointer: fine) { .primary-cta:hover { transform: none; } } }
@media (hover: none) and (prefers-reduced-motion: no-preference), (pointer: coarse) and (prefers-reduced-motion: no-preference) { .primary-cta:active { transform: scale(.97); transition-duration: 100ms; } }
</style>
