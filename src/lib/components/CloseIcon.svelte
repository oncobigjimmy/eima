<svg class="eima-close-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
  <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
</svg>

<style>
  .eima-close-icon { width: 21px; height: 21px; }
  :global(button.eima-close.eima-close) {
    display: grid; place-items: center; border: 0; border-radius: 50%;
    background: #e8e8f6; color: #233f4e;
  }
  :global(.eima-close:is(:hover, :focus-visible)) .eima-close-icon {
    animation: close-turn 500ms cubic-bezier(.3,.9,.3,1);
  }
  :global(.eima-close:focus-visible) { outline: 2px solid #8cd0d6; outline-offset: 4px; }
  @keyframes close-turn { from { transform: rotate(0); } to { transform: rotate(180deg); } }
  @media (prefers-reduced-motion: reduce) {
    :global(.eima-close:is(:hover, :focus-visible)) .eima-close-icon { animation: none; }
  }
</style>
