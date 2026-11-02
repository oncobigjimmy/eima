<script>
  import { selectedSituation } from '$lib/data/situation';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { language } from '$lib/i18n/language';
  $: whatsappHref = getWhatsAppHref($language, false, $selectedSituation);
</script>

<section id="precios" class="max-w-7xl mx-auto px-8 md:px-16">
  <div class="bg-brand text-inverse rounded-3xl p-8 md:p-12 text-center">
    <p class="text-sm font-medium text-brand-accent uppercase tracking-wide mb-3">Sesiones a domicilio</p>
    <h2 class="text-3xl md:text-4xl font-semibold">
      Desde <span class="text-brand-accent">60 €</span> por sesión
    </h2>
    <p class="text-lg text-inverse/80 mt-4 max-w-2xl mx-auto">
      Sesiones de 50–80 minutos, a tu ritmo y en tu casa. Necesitas un espacio de unos 6–8 m².
    </p>
    <div class="grid gap-4 md:grid-cols-3 mt-10 text-left">
      <div class="bg-brand-dark/40 rounded-2xl p-5">
        <p class="text-brand-accent text-2xl font-semibold">60 € – 80 €</p>
        <p class="text-inverse/80 text-sm mt-1">Por sesión</p>
      </div>
      <div class="bg-brand-dark/40 rounded-2xl p-5">
        <p class="text-brand-accent text-2xl font-semibold">50 – 80 min</p>
        <p class="text-inverse/80 text-sm mt-1">Duración de cada sesión</p>
      </div>
      <div class="bg-brand-dark/40 rounded-2xl p-5">
        <p class="text-brand-accent text-2xl font-semibold">6 – 8 m²</p>
        <p class="text-inverse/80 text-sm mt-1">Espacio necesario en casa</p>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row gap-4 justify-center mt-10">
      <a
        href="/contacto"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-accent text-brand-dark px-6 py-3
          hover:scale-102 transition-[transform,font-weight] duration-300 ease-out font-light hover:font-bold"
      >
        <span>Reservar primera consulta</span>
        <span class="material-symbols-rounded">arrow_forward</span>
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-inverse/40 text-inverse px-6 py-3
          hover:bg-inverse hover:text-brand transition-[background-color,color,font-weight] duration-300 ease-out font-light hover:font-bold"
      >
        <span class="material-symbols-rounded">chat</span>
        <span>Pregúntanos por WhatsApp</span>
      </a>
    </div>
    <p class="text-sm text-inverse/70 mt-4">Primera toma de contacto gratuita y sin compromiso.</p>
  </div>
</section>
