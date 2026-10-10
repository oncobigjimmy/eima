<script>
  import { onMount } from 'svelte';
  /** @type {HTMLDivElement} */
  let photo;

  onMount(() => {
    const mobile = window.matchMedia('(max-width: 767px)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let frame = 0;
    function update() {
      frame = 0;
      if (!mobile.matches || reduced.matches) {
        photo.style.setProperty('--mobile-parallax-offset', '0px');
        return;
      }
      if (!visible) return;
      const rect = photo.getBoundingClientRect();
      const progress = (window.innerHeight / 2 - rect.top - rect.height / 2) / ((window.innerHeight + rect.height) / 2);
      photo.style.setProperty('--mobile-parallax-offset', `${Math.max(-80, Math.min(80, progress * 80))}px`);
    }
    function schedule() {
      if (!frame && visible && mobile.matches && !reduced.matches) frame = requestAnimationFrame(update);
    }
    function preferenceChanged() { update(); }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); });
    observer.observe(photo);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    mobile.addEventListener('change', preferenceChanged);
    reduced.addEventListener('change', preferenceChanged);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      mobile.removeEventListener('change', preferenceChanged);
      reduced.removeEventListener('change', preferenceChanged);
    };
  });
  export let image = '';
  export let topHtml = '';
  export let middleHtml = '';
  export let bottomHtml = '';
  export let overlayOpacity = 0.25;
  export let lineGap = 20;
  export let mobileTopSize = 16;
  export let desktopTopSize = 22;
  export let mobileMiddleSize = mobileTopSize;
  export let desktopMiddleSize = desktopTopSize;
  export let mobileBottomSize = 22;
  export let desktopBottomSize = 35;
  export let sectionClass = '';
  export let compact = false;

  /**
   * @param {HTMLElement} node
   * @param {string} value
   */
  function htmlContent(node, value) {
    node.innerHTML = value;

    return {
      /** @param {string} nextValue */
      update(nextValue) {
        node.innerHTML = nextValue;
      }
    };
  }
</script>

<section class={`bg-[#f8f4f0] pb-10 md:pb-12 ${sectionClass} ${compact ? 'parallax-slogan--compact' : ''}`.trim()}>
  <div class="parallax-slogan mx-auto max-w-[96rem] overflow-hidden">
    <div
      class="parallax-slogan__image"
      bind:this={photo}
      style={`--parallax-overlay: ${overlayOpacity}; --parallax-image: url('${image}');`}
    >
      <div class="parallax-slogan__overlay photo-text-contrast" style={`--parallax-gap:${lineGap}px;`}>
        <p
          class="parallax-slogan__top text-center font-light leading-tight text-white"
          style={`--mobile-top-size:${mobileTopSize}px; --desktop-top-size:${desktopTopSize}px;`}
        >
          <span use:htmlContent={topHtml}></span>
        </p>
        {#if middleHtml}
          <p
            class="parallax-slogan__middle text-center font-light leading-tight text-white"
            style={`--mobile-middle-size:${mobileMiddleSize}px; --desktop-middle-size:${desktopMiddleSize}px;`}
          >
            <span use:htmlContent={middleHtml}></span>
          </p>
        {/if}
        <p
          class="parallax-slogan__bottom text-center font-light leading-tight text-white"
          style={`--mobile-middle-size:${mobileMiddleSize}px; --desktop-middle-size:${desktopMiddleSize}px; --mobile-bottom-size:${mobileBottomSize}px; --desktop-bottom-size:${desktopBottomSize}px;`}
        >
          <span use:htmlContent={bottomHtml}></span>
        </p>
      </div>
    </div>
  </div>
</section>

<style>
  :global(.parallax-slogan .slogan-accent) {
    font-family: 'Fraunces', Georgia, 'Times New Roman', serif;
    font-weight: 400;
    font-style: italic;
    font-size: 1.20em;
    color: var(--color-brand-accent);
  }
  .parallax-slogan__overlay {
    text-shadow: 0 0 8px #071a2580, 0 0 18px #071a2566;
  }
  :global(.home-banner-section), :global(.about-banner-section) { padding-bottom: 0; }
  .parallax-slogan {
    border-radius: 0;
  }

  .parallax-slogan__image {
    position: relative;
    overflow: hidden;
    background-attachment: scroll;
    background-image:
      linear-gradient(
        180deg,
        rgba(22, 26, 31, var(--parallax-overlay)) 0%,
        rgba(22, 26, 31, var(--parallax-overlay)) 100%
      ),
      var(--parallax-image);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 150px;
    width: 100%;
  }

  .parallax-slogan__overlay {
    position: relative;
    z-index: 1;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: calc(var(--parallax-gap) * .55);
    justify-content: center;
    min-height: 150px;
    padding: .9rem 1.5rem .85rem;
  }

  .parallax-slogan--compact .parallax-slogan__image,
  .parallax-slogan--compact .parallax-slogan__overlay {
    min-height: 135px;
  }

  .parallax-slogan--compact .parallax-slogan__overlay {
    padding: .75rem 1.5rem;
  }

  .parallax-slogan__top {
    font-size: var(--mobile-top-size);
    font-weight: 200;
  }

  .parallax-slogan__middle {
    font-size: var(--mobile-middle-size);
    font-weight: 200;
  }

  .parallax-slogan__bottom {
    font-size: var(--mobile-bottom-size);
    font-weight: 200;
  }

  :global(.parallax-slogan__top strong),
  :global(.parallax-slogan__middle strong),
  :global(.parallax-slogan__bottom strong) {
    font-weight: 600;
  }

  :global(.parallax-mobile-break) {
    display: block;
  }

  @media (min-width: 768px) {
    .parallax-slogan__image {
      background-attachment: fixed;
      min-height: 180px;
    }

    .parallax-slogan__overlay {
      min-height: 180px;
      padding: 1.45rem 2rem 1.25rem;
    }

    .parallax-slogan--compact .parallax-slogan__image,
    .parallax-slogan--compact .parallax-slogan__overlay {
      min-height: 155px;
    }

    .parallax-slogan--compact .parallax-slogan__overlay {
      padding: 1.05rem 2rem;
    }

    .parallax-slogan__top {
      font-size: var(--desktop-top-size);
    }

    .parallax-slogan__middle {
      font-size: var(--desktop-middle-size);
    }

    .parallax-slogan__bottom {
      font-size: var(--desktop-bottom-size);
    }

    :global(.parallax-mobile-break) {
      display: none;
    }
  }
  @media (max-width: 767px) {
    .parallax-slogan__image { background-image: none; }
    .parallax-slogan__image::before {
      content: '';
      position: absolute;
      inset: -84px 0;
      background-image: linear-gradient(rgba(22, 26, 31, var(--parallax-overlay)), rgba(22, 26, 31, var(--parallax-overlay))), var(--parallax-image);
      background-position: center;
      background-size: cover;
      transform: translateY(var(--mobile-parallax-offset, 0px));
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .parallax-slogan__image { background-attachment: scroll; }
  }
</style>
