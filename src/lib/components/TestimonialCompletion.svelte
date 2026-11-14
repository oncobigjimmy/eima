<script lang="ts">
  import { confetti } from '$lib/actions/confetti';
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

</script>

<div class="completion-overlay" role="presentation" on:click={close}>
  <div class="completion-shell" role="dialog" aria-modal="true" aria-labelledby="completion-heading" aria-describedby="completion-intro completion-question" tabindex="-1" use:dialog={{ close }} on:click|stopPropagation on:keydown|stopPropagation>
    <button class="completion-close eima-close" type="button" aria-label={copy.close} on:click={close}><CloseIcon /></button>
    <div class="completion-panel">
    <h2 id="completion-heading">{copy.heading}</h2>
    <p id="completion-intro" class="completion-intro">{copy.intro}<br />{' '}{copy.introEnd}</p>
    <p id="completion-question" class="completion-question"><span>{copy.question}</span><span>{copy.questionEnd}</span></p>
    <p class="completion-invitation">{copy.invitation}</p>
    <PrimaryCta href={whatsappHref} label={copy.cta} target="_blank" rel="noopener noreferrer" />
    <p class="completion-free">{copy.free}</p>
    </div>
    <button class="completion-dismiss" type="button" on:click={close}>{copy.dismiss}</button>
  </div>
</div>
{#if !reduced}
  <canvas class="completion-confetti" aria-hidden="true" use:confetti={{ colors }}></canvas>
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
  .completion-free { margin: 12px auto 0; max-width: 340px; font-size: 12px; color: #233f4ebf; }
  .completion-dismiss { margin-top: 12px; min-height: 44px; padding: 8px 12px; color: #fff; font-size: 13px; text-decoration: underline; text-underline-offset: 4px; }
  .completion-dismiss:focus-visible { outline: 2px solid #4083a7; outline-offset: 2px; border-radius: 6px; }
  .completion-confetti { position: fixed; inset: 0; z-index: 320; width: 100%; height: 100%; pointer-events: none; }
  @media (max-width: 767px) {
    .completion-overlay { padding: 68px 16px 24px; }
    .completion-shell { max-width: 400px; }
    .completion-panel { display: flex; flex-direction: column; justify-content: center; max-height: calc(100dvh - 148px); padding: 28px 18px; border-radius: 20px; }
    h2 { max-width: 300px; font-size: 30px; margin-bottom: 24px; line-height: 1.1; }
    .completion-panel p { font-size: 10px; line-height: 1.4; }
    .completion-intro { margin-bottom: 8px; }
    .completion-intro br { display: initial; }
    .completion-panel .completion-question { font-size: 11.5px; line-height: 1.35; margin-bottom: 10px; }
    .completion-invitation { margin-bottom: 24px; }
    .completion-panel :global(.primary-cta) { align-self: center; min-height: 40px; padding: 8px 16px; font-size: 11px; }
    .completion-panel .completion-free { font-size: 10px; line-height: 1.35; margin-top: 8px; }
  }
  @media (max-width: 359px) { .completion-panel { padding: 12px; } }
  @media (prefers-reduced-motion: reduce) { .completion-confetti { display: none; } }
</style>
