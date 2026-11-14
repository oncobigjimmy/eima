<script>
  import { getBlogCopy, } from '$lib/i18n/blog';
  import { getWhatsAppHref } from '$lib/i18n/copy';
  import { selectedSituation } from '$lib/data/situation';
  import PrimaryCta from '$lib/components/PrimaryCta.svelte';
  import { getRoutePath } from '$lib/i18n/routes';
  export let author;
  /** @type {import('$lib/i18n/copy').Language} */
  export let language = 'es';
  $: ui = getBlogCopy(language);
  $: authorHref = getRoutePath('story', language) + '#' + author.id;
  $: whatsappHref = getWhatsAppHref(language, false, $selectedSituation);
  $: copy = { es: { title: ['¿Quieres que te ', 'acompañemos', ' en tu proceso?'], text: 'Primera toma de contacto gratuita y sin compromiso.' }, ca: { title: ['Vols que t’', 'acompanyem', ' en el teu procés?'], text: 'Primera presa de contacte gratuïta i sense compromís.' }, en: { title: ['Would you like us to ', 'support you', ' through your journey?'], text: 'An initial conversation, free of charge and with no obligation.' } }[language];
</script>
<aside class="author-support" data-card>
  <a class="author-support-person" href={authorHref} aria-label={ui.written + ' ' + author.name}><img src={author.avatar} alt="" loading="lazy" /><div><p class="author-support-label">{ui.written}</p><p class="author-support-name">{author.name}</p><p class="author-support-role">{author.role}</p></div></a>
  <hr />
  <h2>{#if language === 'es'}¿Quieres que te<span class="mobile-title-break"><br /></span><span class="desktop-space">&nbsp;</span><span>acompañemos</span><span class="mobile-title-break">&nbsp;en<br /></span><span class="desktop-space">&nbsp;en&nbsp;</span>tu proceso?{:else}{copy.title[0]}<span>{copy.title[1]}</span>{copy.title[2]}{/if}</h2>
  <p class="author-support-text">{#if language === 'es'}Primera toma de contacto gratuita<br class="mobile-description-break" /><span class="desktop-space">&nbsp;</span>y sin compromiso.{:else}{copy.text}{/if}</p>
  <div class="author-support-links"><PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={ui.cta} /></div>
</aside>
<style>
  .author-support { position: relative; margin-top: 48px; border-radius: 14px; padding: 22px 20px; background: #fff; color: #233f4e; box-shadow: 0 4px 16px #233f4e0f; }
  :global(.article-closing-grid .author-support) { margin-top: 0; }
  @media (min-width: 1024px) { :global(.article-closing-grid .author-support) { padding-top: 18px; padding-bottom: 18px; } :global(.article-closing-grid .author-support h2), :global(.article-closing-grid .author-support-text) { text-align: center; } :global(.article-closing-grid .author-support-links) { width: 100%; justify-content: center; } }
  @media (max-width: 1023px) { .author-support h2, .author-support-text { text-align: center; } .author-support-links { width: 100%; justify-content: center; } }
  .author-support-person { display: flex; align-items: center; gap: 14px; color: inherit; text-decoration: none; }
  .author-support-person img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; object-position: top; background: #e8e8f6; }
  .author-support-label { font: 400 12px/1.5 Inter, sans-serif; color: #55656f; }
  .author-support-name { font: 400 20px/1.4 Fraunces, serif; }
  .author-support-role { font: 400 13px/1.5 Inter, sans-serif; color: #245b7d; }
  .mobile-title-break, .mobile-description-break { display: none; }
  @media (max-width: 767px) { .mobile-title-break, .mobile-description-break { display: inline; white-space: pre-wrap; } .desktop-space { display: none; } .author-support h2 { font-size: 26px; } }
  hr { margin: 20px 0; border: 0; border-top: 1px solid #233f4e1a; }
  h2 { font: 500 22px/1.3 'Playfair Display', Georgia, serif; }
  h2 span { font: inherit; color: #4083a7; }
  .author-support-text { margin: 12px 0 22px; font: 400 14px/1.6 Inter, sans-serif; }
  .author-support-links { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: 12px 20px; align-items: center; width: 100%; justify-content: center; }
  @media (min-width: 1024px) { .author-support-links { width: 100%; justify-content: center; } }
  @media (min-width: 1024px) { .author-support { display: flex; flex-direction: column; } .author-support { align-self: stretch; } .author-support h2 { margin-top: 4px; font-size: 28px; } .author-support-text { font-size: 16px; margin: 12px 0 17px; } .author-support-links { margin-bottom: 0; } }
  @media (min-width: 1024px) { .author-support-person img { width: 68px; height: 68px; } .author-support-label { font-size: 14px; } .author-support-name { font-size: 23px; } .author-support-role { font-size: 15px; } }

</style>
