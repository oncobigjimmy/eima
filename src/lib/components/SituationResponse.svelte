<script lang="ts">
  import { fade } from 'svelte/transition';
  import { dialog } from '$lib/actions/dialog';
  import { motionDuration } from '$lib/motion';
  import CloseIcon from '$lib/components/CloseIcon.svelte';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { situationResponseCopy, type Situation } from '$lib/data/situation';
  import type { Language } from '$lib/i18n/copy';
  export let situation: Situation;
  export let pageLanguage: Language;
  export let href: string;
  export let cta: string;
  export let confirm: () => void;
  export let close: () => void;
  $: copy = situationResponseCopy[pageLanguage];
  $: response = copy.responses[situation];
</script>

<div class="situation-response" role="presentation" on:click={close} transition:fade={{ duration: motionDuration(200) }}>
  <div class="response-panel" role="dialog" aria-modal="true" aria-labelledby="situation-response-title" aria-describedby="situation-response-body" tabindex="-1" use:dialog={{ close }} on:click|stopPropagation on:keydown|stopPropagation>
    <button type="button" class="close-response" aria-label={copy.close} on:click={close}><CloseIcon /></button>
    <span class="response-letter" aria-hidden="true"><span>{situation}</span></span>
    <h2 id="situation-response-title">{response.title}</h2>
    <p id="situation-response-body">{response.body}</p>
    <PrimaryCta {href} target="_blank" rel="noopener noreferrer" label={cta} onClick={confirm} />
  </div>
</div>

<style>
  .situation-response { position: fixed; inset: 0; z-index: 300; display: grid; place-items: center; padding: 1.25rem; overflow: auto; background: #071a258f; backdrop-filter: blur(10px); }
  .response-panel { position: relative; width: min(468px, 100%); padding: 36px 29px; border-radius: 22px; background: #f8f4f0; color: #233f4e; text-align: center; box-shadow: 0 24px 80px #071a2540; }
  .close-response { position: absolute; top: 10px; right: 10px; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; color: #233f4e; }
  .response-letter { display: flex; align-items: center; justify-content: center; width: 76px; height: 76px; margin: 0 auto 1.25rem; border-radius: 50%; background: #8cd0d640; color: #245b7d; }
  .response-letter span { display: block; width: 100%; text-align: center; font: 400 47px/1 'Playfair Display', Georgia, serif; transform: translateY(-.04em); }
  h2 { font: 600 25.2px/1.2 'Playfair Display', Georgia, serif; color: #233f4e; text-wrap: balance; white-space: pre-line; }
  p { margin: 18px 0 25px; min-height: 4.8em; text-wrap: pretty; white-space: normal; font: 400 14px/1.6 Inter, sans-serif; }
  .close-response:focus-visible { outline: 2px solid #4083a7; outline-offset: 2px; }
  @media (max-width: 767px) { .response-panel { padding: 2.5rem 1.25rem 2rem; } h2 { font-size: 23px; } p { font-size: 14px; white-space: normal; } }
</style>
