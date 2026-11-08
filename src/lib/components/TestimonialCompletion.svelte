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
  const colors = ['#4083a7', '#8cd0d6', '#e8e8f6', '#d4b778'];
  const pieces = Array.from({ length: 160 }, (_, index) => ({
    left: index % 2 ? 100 : 0, drift: (index % 2 ? -1 : 1) * (7 + index % 13 * 1.5),
    rise: 65 + index % 11 * 2.5,
    delay: index % 6 * .012, duration: 1.45 + index % 6 * .08,
    color: colors[index % colors.length], rotate: index * 47, round: index % 4 === 0
  }));
</script>

<div class="completion-overlay" role="presentation" on:click={close}>
  <div class="completion-shell" role="dialog" aria-modal="true" aria-labelledby="completion-heading" aria-describedby="completion-intro completion-question" tabindex="-1" use:dialog={{ close }} on:click|stopPropagation on:keydown|stopPropagation>
    <button class="completion-close eima-close" type="button" aria-label={copy.close} on:click={close}><CloseIcon /></button>
    <div class="completion-panel">
    <h2 id="completion-heading">{copy.heading}</h2>
    <p id="completion-intro" class="completion-intro">{copy.intro}<br />{copy.introEnd}</p>
    <p id="completion-question" class="completion-question"><span>{copy.question}</span><span>{copy.questionEnd}</span></p>
    <p class="completion-invitation">{copy.invitation}</p>
    <PrimaryCta href={whatsappHref} label={copy.cta} target="_blank" rel="noopener noreferrer" />
    <p class="completion-free">{copy.free}</p>
    </div>
    <button class="completion-dismiss" type="button" on:click={close}>{copy.dismiss}</button>
  </div>
</div>
{#if !reduced}
  <div class="completion-confetti" aria-hidden="true">
    {#each pieces as piece}
      <span class:round={piece.round} style:left={`${piece.left}%`} style:background={piece.color} style:--drift={`${piece.drift}vw`} style:--rise={`${piece.rise}vh`} style:--rotation={`${piece.rotate}deg`} style:animation-delay={`${piece.delay}s`} style:animation-duration={`${piece.duration}s`}></span>
    {/each}
  </div>
{/if}

<style>
  .completion-overlay { position: fixed; inset: 0; z-index: 310; display: grid; place-items: center; padding: 76px 24px 44px; overflow-y: auto; background: #071a257a; backdrop-filter: blur(8px); }
  .completion-shell { position: relative; width: min(100%, 560px); text-align: center; font-family: Inter, sans-serif; }
  .completion-panel { max-height: calc(100dvh - 184px); overflow-y: auto; border-radius: 24px; border: 1px solid #ffffffa3; padding: 36px 36px 28px; background: #f8f4f0; color: #233f4e; box-shadow: 0 24px 80px #071a2538; }
  .completion-close.eima-close { position: absolute; top: -54px; right: 0; width: 44px; height: 44px; background: #233f4e; color: #fff; }
  h2 { margin: 0 auto 22px; max-width: 430px; font-family: 'Playfair Display', Georgia, serif; font-size: 40px; font-weight: 500; line-height: 1.2; }
  p { font-family: Inter, sans-serif; font-size: 15px; line-height: 1.65; }
  .completion-intro { margin: 0 0 18px; color: #233f4ec7; }
  .completion-question { margin: 0 0 18px; font-family: Fraunces, serif; font-size: 18px; font-weight: 600; line-height: 1.5; }
  .completion-question span { display: block; font: inherit; }
  .completion-invitation { margin: 0 0 24px; }
  .completion-panel :global(.primary-cta) { font-weight: 700; }
  .completion-free { margin: 12px auto 0; max-width: 340px; font-size: 12px; color: #233f4ebf; }
  .completion-dismiss { margin-top: 12px; min-height: 44px; padding: 8px 12px; color: #fff; font-size: 13px; text-decoration: underline; text-underline-offset: 4px; }
  .completion-dismiss:focus-visible { outline: 2px solid #4083a7; outline-offset: 2px; border-radius: 6px; }
  .completion-confetti { position: fixed; inset: 0; z-index: 320; pointer-events: none; overflow: hidden; }
  .completion-confetti span { position: absolute; bottom: -12px; width: 7px; height: 12px; opacity: 0; animation: confetti-burst linear both; }
  .completion-confetti .round { width: 8px; height: 8px; border-radius: 50%; }
  @keyframes confetti-burst {
    0% { opacity: 1; transform: translate3d(0,0,0) rotate(var(--rotation)); animation-timing-function: cubic-bezier(.12,.65,.35,1); }
    38% { opacity: 1; transform: translate3d(calc(var(--drift) * .55),calc(var(--rise) * -1),0) rotate(calc(var(--rotation) + 180deg)); animation-timing-function: cubic-bezier(.5,0,.9,.5); }
    70% { opacity: .9; transform: translate3d(calc(var(--drift) * .85),calc(var(--rise) * -.5),0) rotate(calc(var(--rotation) + 400deg)); }
    100% { opacity: 0; transform: translate3d(var(--drift),20vh,0) rotate(calc(var(--rotation) + 620deg)); }
  }
  @media (max-width: 767px) { .completion-overlay { padding: 72px 16px 28px; } .completion-panel { max-height: calc(100dvh - 172px); padding: 28px 22px 24px; border-radius: 20px; } h2 { font-size: 30px; } .completion-question { font-size: 18px; } }
  @media (prefers-reduced-motion: reduce) { .completion-confetti { display: none; } }
</style>
