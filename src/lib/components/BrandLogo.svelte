<script>
  import { site } from '$lib/site';
  export let light = false;
  export let id = 'brand-logo';
  let className = '';
  export { className as class };
</script>

<svg class={className} class:brand-logo--light={light} viewBox="384 380 698 340" role="img" aria-label={site.name}>
  <defs>
    <filter id={id} color-interpolation-filters="sRGB">
      <feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0.2126 0.7152 0.0722 0 0" />
    </filter>
    <filter id={`${id}-blue`} color-interpolation-filters="sRGB">
      <feFlood flood-color="#233F4E" result="brandColor" />
      <feComposite in="brandColor" in2="SourceAlpha" operator="in" />
    </filter>
  </defs>
  <image filter={light ? `url(#${id})` : `url(#${id}-blue)`} href={light ? site.logoLight : site.logoDark} width="1448" height="1086" />
</svg>

<style>
  svg { display: block; aspect-ratio: 698 / 340; overflow: hidden; }
  .brand-logo--light {
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, .7)) drop-shadow(0 6px 12px rgba(0, 0, 0, .45));
  }
  /* El filtro convierte el fondo negro del original blanco en transparencia al renderizar. */
</style>
