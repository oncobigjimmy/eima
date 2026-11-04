<script lang="ts">
  import CloseIcon from '$lib/components/CloseIcon.svelte';
  import ResponseHighlights from '$lib/components/ResponseHighlights.svelte';
  import { dialog } from '$lib/actions/dialog';
  import { onMount } from 'svelte';
  import { watchReducedMotion } from '$lib/motion';
  import { patientProofCopy, type WrittenTestimonial } from '$lib/data/patient-responses';
  import type { Language } from '$lib/i18n/copy';
  export let item: WrittenTestimonial;
  export let pageLanguage: Language = 'es';
  export let close: () => void;
  let reduced = false;
  onMount(() => watchReducedMotion(value => { reduced = value; }));
  $: copy = patientProofCopy[pageLanguage];
</script>

<div class="response-modal" role="presentation" on:click={close}>
  <div class="response-modal-panel" use:dialog={{ close }} role="dialog" aria-modal="true" aria-label={copy.expand} tabindex="-1" on:click|stopPropagation on:keydown|stopPropagation>
    <button class="response-modal-close eima-close" type="button" aria-label={copy.close} on:click={close}><CloseIcon /></button>
    <span class="modal-image-frame">
      <img src={item.image} alt={item.alt} style:filter={item.cleanBackground ? 'contrast(1.15)' : undefined} width={item.width || undefined} height={item.height || undefined} />
      <ResponseHighlights lines={item.markers} active={true} {reduced} />
    </span>
  </div>
</div>

<style>
  .response-modal { position: fixed; z-index: 300; inset: 0; display: grid; align-items: center; justify-items: center; overflow: hidden; background: #071a25a3; -webkit-backdrop-filter: blur(20px); backdrop-filter: blur(20px); padding: 4rem 2rem 2rem; }
  .response-modal-panel { position: relative; width: fit-content; max-width: 90vw; padding: 0; background: transparent; }
  .modal-image-frame { position: relative; display: block; width: fit-content; max-width: 100%; }
  img { display: block; width: auto; max-width: min(720px, 86vw); max-height: calc(100dvh - 140px); object-fit: contain; border-radius: 7px; box-shadow: 0 20px 50px #071a2560; }
  .response-modal-close { position: absolute; top: -54px; right: 0; z-index: 1; display: grid; place-items: center; width: 44px; height: 44px; border-radius: 999px; background: #233f4e; color: #fff; }
  .response-modal-close:focus-visible { outline: 2px solid #8cd0d6; outline-offset: 4px; }
  @media (max-width: 767px) { .response-modal { padding: 4rem 1.25rem 1.5rem; } .response-modal-panel { max-width: 100%; } img { max-width: calc(100vw - 2.5rem); max-height: calc(100dvh - 120px); } }
</style>
