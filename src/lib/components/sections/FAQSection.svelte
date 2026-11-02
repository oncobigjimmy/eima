<script lang="ts">
  import { selectedSituation } from '$lib/data/situation';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  $: whatsappHref = getWhatsAppHref($language, false, $selectedSituation);
  import { faqs } from '$lib/data/faqs';
  import { slide } from 'svelte/transition';

  let openIndex: number | null = null;
  let visibleIndex: number | null = null;
  let closing: number[] = [];

  function keepOpen(i: number) {
    if (!closing.includes(i)) closing = [...closing, i];
  }

  function doneClosing(i: number) {
    if (closing.includes(i)) closing = closing.filter((x) => x !== i);
  }

  function toggle(index: number) {
    if (openIndex === index) {
      keepOpen(index);
      visibleIndex = null;
      openIndex = null;
    } else {
      if (visibleIndex !== null) keepOpen(visibleIndex);
      openIndex = index;
      visibleIndex = index;
    }
  }
</script>

<section id="faq" class="py-6">
  <header class="text-center max-w-3xl mx-auto px-6 py-12">
    <h2 class="text-2xl md:text-3xl">
      <span class="font-bold">Preguntas frecuentes</span>
      <span class="font-light">de la fisioterapia a domicilio</span>
    </h2>
  </header>
</section>

<section class="bg-dark text-[color:var(--color-inverse)] py-16 md:py-24">
  <div class="mx-auto max-w-4xl px-6 md:px-10 flex flex-col gap-3">
    {#each faqs as faq, i (faq.q)}
      <details
        class="rounded-full border-2 transition-all duration-200
          {visibleIndex === i
          ? 'border-[color:var(--color-brand-accent)] rounded-[24px]'
          : 'border-[color:var(--color-brand-accent)]/50 hover:border-[color:var(--color-brand-accent)]'}"
        open={openIndex === i || closing.includes(i)}
      >
        <summary
          class="flex items-center justify-between cursor-pointer list-none gap-4 px-6 py-4 text-left"
          on:click|preventDefault={() => toggle(i)}
        >
          <span class="text-[15px] md:text-base font-light">
            {@html faq.q}
          </span>
          <span
            class="shrink-0 w-9 h-9 rounded-full border border-[color:var(--color-brand-accent)] flex items-center justify-center transition-transform
              {visibleIndex === i ? 'rotate-180 duration-250' : 'rotate-0 duration-200'}"
          >
            <span class="material-symbols-rounded !text-[18px] text-[color:var(--color-brand-accent)]"
              >expand_more</span
            >
          </span>
        </summary>
        {#if visibleIndex === i}
          <div
            class="px-6 pb-6 pt-2 text-[15px] font-light leading-relaxed opacity-90"
            in:slide={{ duration: 250 }}
            out:slide={{ duration: 200 }}
            on:outroend={() => doneClosing(i)}
          >
            <p>{@html faq.a}</p>
          </div>
        {/if}
      </details>
    {/each}

    <div class="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5 text-center">
      <p class="text-[15px] font-light">¿Todavía tienes dudas?</p>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-accent)] text-[color:var(--color-brand)] px-6 py-2.5 font-light text-[15px] transition-[transform,font-weight] duration-300 ease-out hover:scale-[1.03] hover:font-bold"
      >
        Contáctanos
      </a>
    </div>
  </div>
</section>




