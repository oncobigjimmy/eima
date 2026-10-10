<script lang="ts">
  import { onMount } from 'svelte';
  import { watchReducedMotion } from '$lib/motion';
  import type { Language } from '$lib/i18n/copy';
  import { empentaPathCopy } from '$lib/i18n/empenta-path';

  export let pageLanguage: Language = 'es';
  $: copy = empentaPathCopy[pageLanguage];
  let track: HTMLDivElement;
  let followUp: HTMLElement;
  let closingRevealed = true;
  let sectionVisible = false;
  let width = 1440;
  let height = 260;
  let vertical = false;
  let path = 'M0 68 C60 68 120 68 180 68 S480 86 540 86 S840 68 900 68 S1200 86 1260 86 S1380 86 1440 86';
  let progress = 1;
  let thresholds = [.125, .375, .625, .875];
  let enhanced = false;

  onMount(() => {
    let reduced = false;
    let visible = false;
    let frame = 0;
    const breakpoint = window.matchMedia('(max-width: 767px)');
    const clamp = (value: number) => Math.max(0, Math.min(1, value));
    function update() {
      frame = 0;
      if (reduced) { progress = 1; closingRevealed = true; return; }
      if (!visible) return;
      const bounds = track.getBoundingClientRect();
      // The same scroll position always produces the same route progress.
      const lead = breakpoint.matches ? .78 : .72;
      const linearProgress = clamp((window.innerHeight * lead - bounds.top) / (bounds.height + window.innerHeight * .43));
      // Keep the entrance alignment, then finish while the numbered circles are still visible.
      progress = breakpoint.matches || linearProgress <= .25
        ? linearProgress
        : clamp(.25 + (linearProgress - .25) * 1.8);
      closingRevealed = progress >= 1 && followUp.getBoundingClientRect().top <= window.innerHeight * .6;
    }
    function schedule() { if (!frame && visible) frame = requestAnimationFrame(update); }
    function measure() {
      const bounds = track.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      vertical = breakpoint.matches;
      const points = Array.from(track.querySelectorAll('.path-circle')).map(node => {
        const rect = node.getBoundingClientRect();
        return { x: rect.left - bounds.left + rect.width / 2, y: rect.top - bounds.top + rect.height / 2 };
      });
      if (!points.length) return;
      const all = vertical
        ? [{ x: points[0].x, y: 0 }, ...points, { x: points[3].x, y: height }]
        : [{ x: 0, y: points[0].y }, ...points, { x: width, y: points[3].y }];
      path = `M${all[0].x} ${all[0].y}`;
      all.slice(1).forEach((point, index) => {
        const previous = all[index];
        if (vertical) {
          const middle = (previous.y + point.y) / 2;
          path += ` C${previous.x} ${middle} ${point.x} ${middle} ${point.x} ${point.y}`;
        } else {
          const middle = (previous.x + point.x) / 2;
          path += ` C${middle} ${previous.y} ${middle} ${point.y} ${point.x} ${point.y}`;
        }
      });
      thresholds = points.map(point => vertical ? point.y / height : point.x / width);
      update();
    }
    enhanced = true;
    progress = 0;
    closingRevealed = false;
    const stopMotion = watchReducedMotion((value: boolean) => { reduced = value; update(); });
    const resize = new ResizeObserver(measure);
    resize.observe(track);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sectionVisible = visible; if (visible) schedule(); });
    observer.observe(track.closest('section')!);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    breakpoint.addEventListener('change', measure);
    measure();
    return () => {
      stopMotion(); resize.disconnect(); observer.disconnect(); cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure);
      breakpoint.removeEventListener('change', measure);
    };
  });
</script>

<section class="empenta-path" aria-labelledby="empenta-path-title">
  <header class="path-heading">
    <h2 id="empenta-path-title" class="section-title-mobile section-playfair-desktop">{copy.before}<span>{copy.accent}</span>{copy.after}<span>{copy.endingAccent}</span></h2>
    <p class="path-subtitle">{@html copy.subtitle}</p>
  </header>
  <div class="path-track" class:enhanced bind:this={track}>
    <svg class="path-line" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      <defs><clipPath id="empenta-path-progress"><rect x="0" y="0" width={vertical ? width : width * progress} height={vertical ? height * progress : height} /></clipPath></defs>
      <path d={path} class="path-base" />
      <path d={path} class="path-lit" clip-path="url(#empenta-path-progress)" />
    </svg>
    <ol class="path-stages">
      {#each copy.stages as stage, index}
        <li class:reached={!enhanced || progress >= thresholds[index]}>
          <div class="path-circle"><span>{String(index).padStart(2, '0')}</span></div>
          <div class="path-stage-copy"><h3><span class="stage-initial">{stage.title.slice(0, 1)}</span>{stage.title.slice(1)}</h3><p>{@html stage.description}</p></div>
        </li>
      {/each}
    </ol>
  </div>
  <footer class="path-follow-up" bind:this={followUp} class:enhanced class:revealed={closingRevealed} class:flying={sectionVisible && closingRevealed} class:reached={!enhanced || closingRevealed}>
    <h3>{copy.next}</h3>
    <div class="follow-up-circle" aria-hidden="true">
      <svg class="follow-up-bird" viewBox="0 0 64 64">
        <g class="bird-lift">
          <path class="bird-back-wing" d="M32 36C38 22 44 15 53 10 51 25 45 34 37 38Z" />
          <path class="bird-body" d="M10 39 20 30 32 35 41 24C46 19 52 22 53 27L60 30 53 32C50 42 38 47 28 42L18 44 21 38Z" />
          <path class="bird-wing" d="M33 36C24 27 20 16 15 8 29 11 39 20 42 31Z" />
          <circle class="bird-eye" cx="48" cy="27" r="1.4" />
        </g>
      </svg>
    </div>
    <p class="follow-up-label">{copy.followUp}</p>
    <p>{@html copy.closing}</p>
  </footer>
</section>

<style>
  .empenta-path { background: #233f4e; color: #e8e8f6; padding: clamp(2.75rem, 5vw, 4.75rem) 0; overflow: clip; }
  .path-heading { max-width: 1000px; margin: 0 auto; padding: 0 1.5rem; text-align: center; }
  h2, h2 span { font-family: 'Playfair Display', Georgia, serif; font-weight: 500; }
  h2 { margin: 0; font-size: 50px; line-height: 1.16; color: #f8f4f0; text-wrap: balance; }
  h2 span { color: #8cd0d6; }
  .path-subtitle { font-size: 16px; line-height: 1.65; max-width: 760px; margin: 1.25rem auto 0; }
  .path-subtitle :global(strong) { font-weight: 700; }
  :global(.path-desktop-break) { display: none; }
  :global(.path-mobile-break) { display: block; }
  @media (min-width: 768px) {
    :global(.path-desktop-break) { display: block; }
    :global(.path-mobile-break) { display: none; }
    li:first-child .path-stage-copy p { max-width: 320px; }
  }
  .path-track { position: relative; margin-top: 2.75rem; }
  .path-line { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
  .path-line path { fill: none; stroke-width: 2; stroke-dasharray: 5 9; stroke-linecap: round; }
  .path-base { stroke: #4083a7; opacity: .55; }
  .path-lit { stroke: #8cd0d6; filter: drop-shadow(0 0 4px #8cd0d680) drop-shadow(0 0 9px #8cd0d633); }
  .path-stages { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1.5rem; max-width: 1440px; margin: 0 auto; padding: 0 1.5rem 1rem; list-style: none; }
  li { position: relative; min-width: 0; text-align: center; }
  li:nth-child(even) { padding-top: 18px; }
  .path-circle { position: relative; display: grid; place-items: center; width: 108px; height: 108px; margin: 0 auto; border-radius: 50%; border: 2px solid #4083a7; background: #245b7d; transition: background-color 350ms ease, border-color 350ms ease, box-shadow 350ms ease; }
  .path-circle span { font-family: 'Fraunces', Georgia, serif; font-size: 44px; font-weight: 500; color: #e8e8f6; transition: color 350ms ease; }
  .reached .path-circle { background: #8cd0d6; border-color: #8cd0d6; box-shadow: 0 0 26px 4px #8cd0d62b; }
  .reached .path-circle span { color: #233f4e; }
  .path-stage-copy { position: relative; margin-top: 1.35rem; }
  .path-stage-copy h3 { margin: 0; font-family: 'Fraunces', Georgia, serif; color: #e8e8f6; font-size: 27px; line-height: 1.2; font-weight: 500; transition: color 350ms ease; }
  .stage-initial { font-family: inherit; font-size: 39px; color: #245b7d; transition: color 350ms ease, text-shadow 350ms ease; }
  .reached .stage-initial { color: #fff; text-shadow: 0 0 12px #8cd0d633; }
  .reached .path-stage-copy h3 { color: #8cd0d6; }
  .path-stage-copy p { max-width: 290px; margin: .75rem auto 0; font-size: 14px; line-height: 1.55; color: #d1dfe5; transition: color 350ms ease, opacity 550ms ease, transform 550ms ease; text-wrap: pretty; }
  .enhanced li:not(.reached) .path-stage-copy p { opacity: 0; transform: translateY(12px); }
  .reached .path-stage-copy p { color: #f8f4f0; }
  .path-follow-up { max-width: 710px; text-align: center; margin: 2.75rem auto 0; padding: 1.5rem 1.5rem 0; border-top: 1px solid #4083a766; transition: opacity 600ms ease, transform 600ms ease; }
  .path-follow-up.enhanced:not(.revealed) { opacity: 0; transform: translateY(18px); }
  .path-follow-up h3 { font-family: 'Playfair Display', Georgia, serif; font-size: 28px; font-weight: 500; color: #f8f4f0; margin: 0; }
  .follow-up-circle { display: grid; place-items: center; width: 86px; height: 86px; margin: 1.5rem auto 0; overflow: hidden; border-radius: 50%; border: 2px solid #4083a7; background: #245b7d; color: #e8e8f6; transition: background-color 350ms ease, color 350ms ease, border-color 350ms ease, box-shadow 350ms ease; }
  .reached .follow-up-circle { background: #8cd0d6; border-color: #8cd0d6; color: #233f4e; box-shadow: 0 0 26px 4px #8cd0d62b; }
  .follow-up-bird { width: 64px; height: 64px; overflow: visible; transform: translateY(8px); }
  .bird-body, .bird-wing { fill: currentColor; }
  .bird-body { filter: drop-shadow(0 1px 1px #071a2533); }
  .bird-back-wing { fill: currentColor; }
  .bird-lift { transform-origin: 34px 33px; }
  .bird-wing { transform-origin: 37px 34px; }
  .reached.flying .follow-up-bird { animation: bird-flight 2.1s linear infinite; }
  .reached.flying .bird-wing { animation: bird-flap 900ms cubic-bezier(.45,0,.55,1) infinite; }
  .reached.flying .bird-back-wing { animation: bird-back-flap 900ms -60ms cubic-bezier(.45,0,.55,1) infinite; transform-origin: 35px 35px; }
  .reached.flying .bird-lift { animation: bird-bob 1.4s ease-in-out infinite alternate; }
  @keyframes bird-flight {
    0% { transform: translate(-69px, 8px); }
    100% { transform: translate(65px, 8px); }
  }
  @keyframes bird-flap { 0%, 100% { transform: rotate(12deg) scaleY(1); } 50% { transform: rotate(-32deg) scaleY(.48) skewX(-8deg); } }
  @keyframes bird-back-flap { 0%, 100% { transform: rotate(-8deg) scaleY(.95); } 50% { transform: rotate(28deg) scaleY(.52) skewX(6deg); } }
  @keyframes bird-bob { from { transform: translateY(0) rotate(-2deg); } to { transform: translateY(-3px) rotate(2deg); } }
  .bird-eye { fill: #8cd0d6; }
  .follow-up-label { font-family: 'Fraunces', Georgia, serif; font-size: 27px; line-height: 1.2; color: #e8e8f6; font-weight: 500; margin: 1.1rem 0 1.1rem; transition: color 350ms ease; }
  .reached .follow-up-label { color: #8cd0d6; }
  .path-follow-up p:last-child { font-size: 14px; line-height: 1.65; margin: 0; transition: opacity 600ms ease 120ms, transform 600ms ease 120ms; }
  .path-follow-up.enhanced:not(.revealed) p:last-child { opacity: 0; transform: translateY(12px); }
  @media (max-width: 767px) {
    .path-heading { padding-inline: 1.25rem; }
    .path-subtitle { font-size: 16px; }
    .path-track { margin-top: 2rem; }
    .path-track:not(.enhanced)::before { content: ''; position: absolute; top: 0; bottom: 0; left: calc(1.25rem + 38px); border-left: 2px dashed #8cd0d6; }
    .path-track:not(.enhanced) .path-line { display: none; }
    .path-stages { grid-template-columns: 1fr; padding: 1rem 1.25rem; gap: 1.75rem; }
    li, li:nth-child(even) { display: grid; grid-template-columns: 76px minmax(0, 1fr); gap: 1.25rem; align-items: center; padding-top: 0; text-align: left; min-height: 104px; }
    .path-circle { width: 76px; height: 76px; margin: 0; }
    .path-circle span { font-size: 34px; }
    .path-stage-copy { margin-top: 0; }
    .path-stage-copy h3, .follow-up-label { font-size: 25px; }
    .stage-initial { font-size: 36px; }
    .path-stage-copy p { margin: .5rem 0 0; max-width: none; }
    .path-follow-up { margin: 1.5rem 1.25rem 0; padding-inline: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .path-circle, .path-circle span, .path-stage-copy h3, .path-stage-copy p, .stage-initial, .follow-up-circle { transition: none; }
    .enhanced li:not(.reached) .path-stage-copy p,
    .path-follow-up.enhanced:not(.revealed),
    .path-follow-up.enhanced:not(.revealed) p:last-child { opacity: 1; transform: none; }
    .path-follow-up, .path-follow-up p:last-child { transition: none; }
    .follow-up-bird { animation: none !important; transform: translateY(8px) !important; }
    .bird-wing, .bird-back-wing, .bird-lift { animation: none !important; transform: none !important; }
  }
</style>
