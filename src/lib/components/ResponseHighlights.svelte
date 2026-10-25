<script lang="ts">
  import type { PatientResponse } from '$lib/data/patient-responses';

  export let lines: NonNullable<PatientResponse['underlines']> = [];
  export let active = false;
  export let reduced = false;
  export let duration = 500;

  let completed = 0;
  $: if (!active) completed = 0;
  $: if (active && reduced) completed = lines.length;
</script>

{#each lines as line, index}
  <span
    class="marker"
    class:drawing={active && !reduced && index === completed}
    class:drawn={active && index < completed}
    aria-hidden="true"
    style={`left:${line.x}%;top:${line.y}%;width:${line.width}%;height:${line.height}%;--marker-duration:${duration}ms`}
    on:animationend={() => { if (active && index === completed) completed = index + 1; }}
  ></span>
{/each}

<style>
  .marker { position: absolute; pointer-events: none; background: #4083a752; border-radius: 2px 5px 3px 2px; clip-path: polygon(1% 4%, 99% 0, 100% 94%, 0 100%); mix-blend-mode: multiply; transform: scaleX(0); transform-origin: left center; }
  .drawing { animation: marker-draw var(--marker-duration, 500ms) linear both; }
  .drawn { transform: scaleX(1); }
  @keyframes marker-draw { from { transform: scaleX(0); } to { transform: scaleX(1); } }
</style>
