<script>
  export let language = 'es';
  /** @type {string[]} */
  export let points = [];
  // TODO [CA-revisar]: revisar «L’IMPORTANT».
  $: label = language === 'ca' ? 'L’IMPORTANT' : language === 'en' ? 'KEY POINTS' : 'LO IMPORTANTE';
</script>
<aside class="key-points"><p class="key-points-label">{label}</p><ul>{#each points as point}<li>{point}</li>{/each}</ul></aside>
<style>
  .key-points { background: #e8e8f6; border-radius: 12px; padding: 18px 18px 14px; margin: 22px 0; }
  .key-points .key-points-label { margin: 0; font: 600 12px/1.5 Inter, sans-serif !important; letter-spacing: .14em; color: #245b7d; }
  .key-points ul { margin: 10px 0 0; padding-left: 20px; }
  .key-points li { font: 400 15px/1.7 Inter, sans-serif; color: #233f4e; margin: 6px 0; }
  @media (min-width: 768px) { .key-points li { font-size: 16px; } }
</style>
