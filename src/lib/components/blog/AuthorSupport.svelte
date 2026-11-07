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
  <a class="author-support-cover" href={authorHref} aria-label={ui.written + ' ' + author.name}></a>
  <div class="author-support-person"><img src={author.avatar} alt="" loading="lazy" /><div><p class="author-support-label">{ui.written}</p><p class="author-support-name">{author.name}</p><p class="author-support-role">{author.role}</p></div></div>
  <hr />
  <h2>{copy.title[0]}<span>{copy.title[1]}</span>{copy.title[2]}</h2>
  <p class="author-support-text">{copy.text}</p>
  <div class="author-support-links"><PrimaryCta href={whatsappHref} target="_blank" rel="noopener noreferrer" label={ui.cta} /></div>
</aside>
<style>
  .author-support { position: relative; margin-top: 48px; border-radius: 14px; padding: 22px 20px; background: #fff; color: #233f4e; box-shadow: 0 4px 16px #233f4e0f; }
  :global(.article-closing-grid .author-support) { margin-top: 0; }
  @media (min-width: 1024px) { :global(.article-closing-grid .author-support) { padding-top: 18px; padding-bottom: 18px; } :global(.article-closing-grid .author-support h2), :global(.article-closing-grid .author-support-text) { text-align: center; } :global(.article-closing-grid .author-support-links) { width: 100%; justify-content: center; } }
  .author-support-cover { position: absolute; inset: 0; border-radius: inherit; }
  .author-support-cover:focus-visible { outline: 2px solid #4083a7; outline-offset: 3px; }
  .author-support-person { display: flex; align-items: center; gap: 14px; pointer-events: none; }
  .author-support-person img { width: 56px; height: 56px; border-radius: 50%; object-fit: cover; object-position: top; background: #e8e8f6; }
  .author-support-label { font: 400 12px/1.5 Inter, sans-serif; color: #55656f; }
  .author-support-name { font: 400 20px/1.4 Fraunces, serif; }
  .author-support-role { font: 400 13px/1.5 Inter, sans-serif; color: #245b7d; }
  hr { margin: 20px 0; border: 0; border-top: 1px solid #233f4e1a; }
  h2 { font: 500 22px/1.3 'Playfair Display', Georgia, serif; }
  h2 span { font: inherit; color: #4083a7; }
  .author-support-text { margin: 10px 0 18px; font: 400 14px/1.6 Inter, sans-serif; }
  .author-support-links { position: relative; z-index: 1; display: flex; flex-wrap: wrap; gap: 12px 20px; align-items: center; width: fit-content; }
  @media (min-width: 1024px) { .author-support-links { width: 100%; justify-content: center; } }

</style>
