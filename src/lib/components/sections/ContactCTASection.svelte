<script>
  import { site } from '$lib/site';
  import { WEB_WHATSAPP_HREF } from '$lib/data/whatsapp';
</script>

<section class="max-w-7xl mx-auto px-8 md:px-16">
  <div class="bg-primary border border-default rounded-3xl p-8 md:p-12 text-center">
    <h2 class="text-3xl md:text-4xl font-semibold text-primary">Hablemos</h2>
    <p class="text-lg text-secondary mt-4 max-w-2xl mx-auto">
      La primera toma de contacto es gratuita. Cuéntanos tu situación y valoramos juntos si podemos ayudarte.
    </p>
    <div class="flex flex-col sm:flex-row gap-3 justify-center mt-8 flex-wrap">
      <a
        href={site.phoneHref}
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-brand text-inverse px-6 py-3
          hover:scale-102 transition-[transform,font-weight] duration-300 ease-out font-light hover:font-bold"
      >
        <span class="material-symbols-rounded">call</span>
        <span>{site.phoneLocal}</span>
      </a>
      <a
        href={WEB_WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brand text-brand px-6 py-3
          hover:bg-brand hover:text-inverse transition-[background-color,color,font-weight] duration-300 ease-out font-light hover:font-bold"
      >
        <span class="material-symbols-rounded">chat</span>
        <span>WhatsApp</span>
      </a>
      <a
        href={`mailto:${site.email}`}
        class="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-default text-primary px-6 py-3
          hover:border-brand hover:text-brand transition-[border-color,color,font-weight] duration-300 ease-out font-light hover:font-bold"
      >
        <span class="material-symbols-rounded">mail</span>
        <span>{site.email}</span>
      </a>
      <a
        href="/contacto"
        class="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-default text-primary px-6 py-3
          hover:border-brand hover:text-brand transition-[border-color,color,font-weight] duration-300 ease-out font-light hover:font-bold"
      >
        <span class="material-symbols-rounded">edit_note</span>
        <span>Formulario de contacto</span>
      </a>
    </div>
  </div>
</section>
