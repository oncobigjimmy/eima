<script lang="ts">
  import { onMount } from 'svelte';

  export let text: string;
  let element: HTMLSpanElement;
  let lines = [text, ''];
  let size = 16;

  onMount(() => {
    let alive = true;
    const context = document.createElement('canvas').getContext('2d');
    function fit() {
      if (!alive || !context || !element.clientWidth) return;
      context.font = `300 16px ${getComputedStyle(element).fontFamily}`;
      const words = text.split(/\s+/);
      let best = Infinity;
      for (let split = 1; split < words.length; split++) {
        const pair = [words.slice(0, split).join(' '), words.slice(split).join(' ')];
        const width = Math.max(...pair.map(line => context!.measureText(line).width));
        if (width < best) { best = width; lines = pair; }
      }
      size = Math.min(16, Math.floor((element.clientWidth - 2) / best * 160) / 10);
    }
    const observer = new ResizeObserver(fit);
    observer.observe(element);
    fit();
    document.fonts.ready.then(fit);
    return () => { alive = false; observer.disconnect(); };
  });
</script>

<span class="quote-lines" bind:this={element} style={`--quote-size:${size}px`}><span>{lines[0]}</span>{' '}<span>{lines[1]}</span></span>

<style>
  .quote-lines, .quote-lines > span { font-family: inherit; font-weight: inherit; }
  .quote-lines { display: block; }
  @media (max-width: 767px) {
    .quote-lines { width: 100%; font-size: var(--quote-size); }
    .quote-lines > span { display: block; white-space: nowrap; }
  }
</style>
