<script>
  export let image = '';
  export let topHtml = '';
  export let middleHtml = '';
  export let bottomHtml = '';
  export let overlayOpacity = 0.34;
  export let lineGap = 20;
  export let mobileTopSize = 16;
  export let desktopTopSize = 22;
  export let mobileMiddleSize = mobileTopSize;
  export let desktopMiddleSize = desktopTopSize;
  export let mobileBottomSize = 22;
  export let desktopBottomSize = 35;
  export let sectionClass = '';

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

<section class={`bg-[#f8f4f0] pb-10 md:pb-12 ${sectionClass}`.trim()}>
  <div class="parallax-slogan mx-auto max-w-[96rem] overflow-hidden">
    <div
      class="parallax-slogan__image"
      style={`--parallax-overlay: ${overlayOpacity}; --parallax-image: url('${image}');`}
    >
      <div class="parallax-slogan__overlay" style={`--parallax-gap:${lineGap}px;`}>
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
  .parallax-slogan {
    border-radius: 0;
  }

  .parallax-slogan__image {
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
    min-height: 180px;
    width: 100%;
  }

  .parallax-slogan__overlay {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: var(--parallax-gap);
    justify-content: center;
    min-height: 180px;
    padding: 1.1rem 1.5rem 1rem;
  }

  .parallax-slogan__top {
    font-size: var(--mobile-top-size);
  }

  .parallax-slogan__middle {
    font-size: var(--mobile-middle-size);
  }

  .parallax-slogan__bottom {
    font-size: var(--mobile-bottom-size);
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
      min-height: 220px;
    }

    .parallax-slogan__overlay {
      min-height: 220px;
      padding: 1.75rem 2rem 1.5rem;
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
</style>
