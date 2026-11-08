<script lang="ts">
  import { dialog } from '$lib/actions/dialog';
  import { selectedSituation } from '$lib/data/situation';
  import { testimonialUi } from '$lib/data/testimonial-copy';
  import { getWhatsAppHref, type Language } from '$lib/i18n/copy';
  import CloseIcon from '$lib/components/CloseIcon.svelte';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  export let pageLanguage: Language = 'es';
  export let reduced = false;
  export let close: () => void;
  $: copy = testimonialUi[pageLanguage].completion;
  $: whatsappHref = getWhatsAppHref(pageLanguage, false, $selectedSituation);
  const colors = ['#4083a7', '#8cd0d6', '#c8b5e3', '#d4b778'];
  const pieces = Array.from({ length: 64 }, (_, index) => ({
    left: (index * 37.7) % 100, drift: (index % 2 ? 1 : -1) * (30 + index % 8 * 18),
    delay: index % 9 * .085, duration: 2.5 + index % 7 * .13,
    color: colors[index % colors.length], rotate: index * 47, round: index % 4 === 0
  }));
</script>

<div class="completion-overlay" role="presentation" on:click={close}>
  <div class="completion-panel" role="dialog" aria-modal="true" aria-labelledby="completion-heading" aria-describedby="completion-intro completion-question" tabindex="-1" use:dialog={{ close }} on:click|stopPropagation on:keydown|stopPropagation>
    <button class="completion-close eima-close" type="button" aria-label={copy.close} on:click={close}><CloseIcon /></button>
    <span class="completion-eyebrow">{copy.eyebrow}</span>
    <h2 id="completion-heading">{copy.heading}</h2>
    <p id="completion-intro" class="completion-intro">{copy.intro}</p>
    <p id="completion-question" class="completion-question">{copy.question}</p>
    <p class="completion-invitation">{copy.invitation}</p>
    <PrimaryCta href={whatsappHref} label={copy.cta} target="_blank" rel="noopener noreferrer" />
    <p class="completion-free">{copy.free}</p>
    <button class="completion-dismiss" type="button" on:click={close}>{copy.dismiss}</button>
  </div>
</div>
{#if !reduced}
  <div class="completion-confetti" aria-hidden="true">
    {#each pieces as piece}
      <span class:round={piece.round} style:left={`${piece.left}%`} style:background={piece.color} style:--drift={`${piece.drift}px`} style:--rotation={`${piece.rotate}deg`} style:animation-delay={`${piece.delay}s`} style:animation-duration={`${piece.duration}s`}></span>
    {/each}
  </div>
{/if}

<style>
  .completion-overlay { position: fixed; inset: 0; z-index: 310; display: grid; place-items: center; padding: 24px; overflow-y: auto; background: #071a257a; backdrop-filter: blur(8px); }
  .completion-panel { position: relative; width: min(100%, 560px); max-height: calc(100dvh - 48px); overflow-y: auto; border-radius: 24px; border: 1px solid #ffffffa3; padding: 48px 40px 28px; background: #f8f4f0; color: #233f4e; text-align: center; box-shadow: 0 24px 80px #071a2538; }
  .completion-close { position: absolute; top: 14px; right: 14px; width: 44px; height: 44px; }
  .completion-eyebrow { display: block; margin-bottom: 14px; color: #4083a7; font-size: 12px; font-weight: 600; letter-spacing: .09em; text-transform: uppercase; }
  h2 { margin: 0 auto 20px; max-width: 430px; font-family: 'Fraunces', serif; font-size: clamp(28px, 3vw, 38px); font-weight: 400; line-height: 1.15; }
  p { font-size: 15px; line-height: 1.65; }
  .completion-intro { margin: 0 0 18px; color: #233f4ec7; }
  .completion-question { margin: 0 0 12px; font-weight: 600; }
  .completion-invitation { margin: 0 0 24px; }
  .completion-free { margin: 12px auto 14px; max-width: 340px; font-size: 12px; color: #233f4ebf; }
  .completion-dismiss { min-height: 44px; padding: 8px 12px; font-size: 13px; text-decoration: underline; text-underline-offset: 4px; }
  .completion-dismiss:focus-visible { outline: 2px solid #4083a7; outline-offset: 2px; border-radius: 6px; }
  .completion-confetti { position: fixed; inset: 0; z-index: 320; pointer-events: none; overflow: hidden; }
  .completion-confetti span { position: absolute; top: -24px; width: 7px; height: 12px; opacity: 0; animation: confetti-fall ease-in both; }
  .completion-confetti .round { width: 8px; height: 8px; border-radius: 50%; }
  @keyframes confetti-fall { 0% { opacity: 0; transform: translate3d(0,-20px,0) rotate(var(--rotation)); } 8% { opacity: 1; } 80% { opacity: .9; } 100% { opacity: 0; transform: translate3d(var(--drift),110vh,0) rotate(calc(var(--rotation) + 540deg)); } }
  @media (max-width: 767px) { .completion-overlay { padding: 16px; } .completion-panel { max-height: calc(100dvh - 32px); padding: 60px 24px 22px; border-radius: 20px; } }
  @media (prefers-reduced-motion: reduce) { .completion-confetti { display: none; } }
</style>
