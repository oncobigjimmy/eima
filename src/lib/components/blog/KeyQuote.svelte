<script>
  export let text = '';
  export let highlight = '';
  $: at = highlight ? text.indexOf(highlight) : -1;
  /** @param {HTMLElement} node */
  function drawOnce(node) {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motion.matches || !('IntersectionObserver' in window)) { node.classList.add('drawn'); return {}; }
    const observer = new IntersectionObserver(([entry]) => { if (entry.intersectionRatio >= .6) { node.classList.add('drawn'); observer.disconnect(); } }, { threshold: .6 });
    const change = () => { if (motion.matches) { node.classList.add('drawn'); observer.disconnect(); } };
    observer.observe(node); motion.addEventListener('change', change);
    return { destroy() { observer.disconnect(); motion.removeEventListener('change', change); } };
  }
</script>
<blockquote class="key-quote" use:drawOnce>«{#if at >= 0}{text.slice(0, at)}<span>{highlight}</span>{text.slice(at + highlight.length)}{:else}{text}{/if}»</blockquote>
<style>
  blockquote.key-quote { margin: 22px 0; padding: 4px 0 4px 16px; border-left: 3px solid #8cd0d6; font: italic 400 22px/1.4 Fraunces, Georgia, serif; color: #233f4e; }
  .key-quote span { font: inherit; background: linear-gradient(#4083a74d, #4083a74d) left 85% / 0% 45% no-repeat; box-decoration-break: clone; -webkit-box-decoration-break: clone; transition: background-size 800ms var(--ease-calma); }
  .key-quote:global(.drawn) span { background-size: 100% 45%; }
  @media (min-width: 768px) { blockquote.key-quote { font-size: 24px; } }
  @media (prefers-reduced-motion: reduce) { .key-quote span { background-size: 100% 45%; transition: none; } }
</style>
