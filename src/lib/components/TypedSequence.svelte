<script>
  import { onMount } from 'svelte';
  import { watchReducedMotion } from '$lib/motion';
  export let words = [''];
  let typedPhrase = '';
  let complete = false;
  /** @param {number} ms */
  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  onMount(() => {
    let cancelled = false;
    let generation = 0;
    let hiddenAt = document.hidden ? performance.now() : null;
    let hiddenTime = 0;
    const visibilityChanged = () => {
      const now = performance.now();
      if (document.hidden) hiddenAt = now;
      else if (hiddenAt !== null) { hiddenTime += now - hiddenAt; hiddenAt = null; }
    };
    const activeNow = () => (hiddenAt ?? performance.now()) - hiddenTime;
    document.addEventListener('visibilitychange', visibilityChanged);
    /** Time advances only while the document is visible. @param {number} ms @param {number} version */
    async function wait(ms, version) {
      let remaining = ms;
      let previous = activeNow();
      while (remaining > 0 && !cancelled && version === generation) {
        await sleep(Math.min(25, remaining));
        const now = activeNow();
        remaining -= now - previous;
        previous = now;
      }
      while (document.hidden && !cancelled && version === generation) await sleep(50);
      return !cancelled && version === generation;
    }
    /** @param {number} version */
    async function animate(version) {
      complete = false;
      typedPhrase = '';
      for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
        const word = words[wordIndex];
        for (let length = 1; length <= word.length; length++) {
          if (!await wait(100, version)) return;
          typedPhrase = word.slice(0, length);
        }
        if (wordIndex === words.length - 1) break;
        if (!await wait(2000, version)) return;
        for (let length = word.length - 1; length >= 0; length--) {
          if (!await wait(50, version)) return;
          typedPhrase = word.slice(0, length);
        }
      }
      complete = true;
    }
    const stopMotion = watchReducedMotion(reduced => {

      generation++;

      if (reduced) { typedPhrase = words[words.length - 1]; complete = true; }
      else { animate(generation); }
    });
    return () => { cancelled = true; generation++; stopMotion(); document.removeEventListener('visibilitychange', visibilityChanged); };
  });
</script>
<span class="typed-text" class:complete aria-hidden="true">{typedPhrase}</span>
<style>
  .typed-text::after { content: ''; display: inline-block; width: 2px; height: .82em; margin-left: .08em; vertical-align: -.02em; background: currentColor; animation: hero-cursor 1200ms steps(1, end) infinite; }
  .typed-text.complete::after { animation: hero-cursor 1200ms steps(1, end) 3 forwards; }
  @keyframes hero-cursor { 0%, 55% { opacity: .65; } 56%, 100% { opacity: 0; } }

  @media (prefers-reduced-motion: reduce) { .typed-text::after { display: none; animation: none; } }
</style>
