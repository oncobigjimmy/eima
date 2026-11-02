<script lang="ts">
  import { tick } from 'svelte';
  export let items: { id: string; label: string }[];
  export let selected: string;
  export let label: string;
  export let prefix = 'story';
  export let wide = false;
  export let tabs = true;
  export let onSelect: (id: string) => void;
  async function keydown(event: KeyboardEvent, index: number) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    onSelect(items[next].id);
    await tick(); document.getElementById(`${prefix}-tab-${items[next].id}`)?.focus();
  }
</script>

<div class="story-tabs" class:wide role={tabs ? 'tablist' : 'group'} aria-label={label}>
  {#each items as item, index}
    <button type="button" id={`${prefix}-tab-${item.id}`} role={tabs ? 'tab' : undefined} aria-selected={tabs ? selected === item.id : undefined} aria-controls={tabs ? `${prefix}-panel-${item.id}` : undefined} tabindex={tabs && selected !== item.id ? -1 : 0} class:active-person={selected === item.id} on:click={() => onSelect(item.id)} on:keydown={event => keydown(event, index)}>{item.label}</button>
  {/each}
</div>

<style>
  .story-tabs { display: grid; grid-template-columns: 1fr 1fr; gap: .5rem; width: min(100%, 18.5rem); margin: 1.25rem auto 0; padding: .55rem; border-radius: 9999px; background: #fff; box-shadow: 0 9px 22px rgba(14,29,38,.13), inset 0 0 0 1px rgba(35,63,78,.08); }
  .story-tabs.wide { width: min(100%, 28rem); }
  button { cursor: pointer; min-width: 44px; min-height: 2.8rem; border-radius: 9999px; background: #e8e8f6; color: #233f4e; font-size: 16px; font-weight: 400; line-height: 1; padding: .5rem; transition: background-color var(--dur-estado) var(--ease-calma), color var(--dur-estado) var(--ease-calma), transform var(--dur-micro) var(--ease-calma), font-weight var(--dur-estado) var(--ease-calma); }
  button.active-person { background: #4083a7; color: #fff; font-weight: 700; text-shadow: var(--eima-blue-text-shadow); }
  button:focus-visible { outline: 2px solid #245b7d; outline-offset: 4px; }
  @media (hover: hover) and (pointer: fine) { button:hover { transform: translateY(-1px); } }
  @media (max-width: 767px) { .story-tabs { width: min(100%, 18rem); } button { min-height: 2.85rem; } }
  @media (prefers-reduced-motion: reduce) { .story-tabs button { transition: none; transform: none; } }
</style>
