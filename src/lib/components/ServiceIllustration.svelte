<script lang="ts">
  export let icon: string;
  const shapes: Record<string, { body: string; details: string }> = {
    call: { body: 'M5.5 3.5 9 3l2 5-2.4 2.1a14 14 0 0 0 5.3 5.3L16 13l5 2-.5 3.5a3 3 0 0 1-3.4 2.4A18.5 18.5 0 0 1 3.1 6.9a3 3 0 0 1 2.4-3.4Z', details: 'M15 4a6 6 0 0 1 5 5M15 8a2 2 0 0 1 1 1' },
    home: { body: 'M3 10.5 12 3l9 7.5-2 2V21h-5v-7h-4v7H5v-8.5Z', details: 'M16.5 6.7V3.5h2v4.9M8 10h.01M16 10h.01' },
    phone: { body: 'M12 15H4a1.5 1.5 0 0 1-1.5-1.5v-8A1.5 1.5 0 0 1 4 4h12a1.5 1.5 0 0 1 1.5 1.5V7M15.5 9h5a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1Z', details: 'M8.5 15v4M5.5 19h6M17 12h2M18 18.5h.01' },
    checklist: { body: 'M8 4H5a1 1 0 0 0-1 1v15a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3M9 2h6a1 1 0 0 1 1 1v3H8V3a1 1 0 0 1 1-1Z', details: 'M7 11l1 1 2-2M13 11h4M7 16l1 1 2-2M13 16h4' },
    support: { body: 'M6 4h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-7l-5 3v-3a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3Z', details: 'M7 9h10M7 13h6' },
    list: { body: 'M9 3h11v18H9', details: 'M2 6l1.5 1.5L6 4M2 12l1.5 1.5L6 10M2 18l1.5 1.5L6 16M12 6h5M12 12h5M12 18h5' },
    car: { body: 'M3 10 5 5h14l2 5 1 2v6H2v-6ZM2 10h20', details: 'M6 18v3M18 18v3M5 14h2M17 14h2M10 14h4M8 5l-1 5M16 5l1 5' },
    handshake: { body: 'M2 8 5 5l5 2 4-2 5 2 3 3-3 6-5 4-5-1-5-4Z', details: 'M10 7 7 11l2 2 4-3 6 6M5 5 2 13l3 2M19 7l3 3-3 6M8 15l4 4M11 14l4 4M14 13l4 4' },
    calendar: { body: 'M4 4h16a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z', details: 'M7 2v5M17 2v5M3 9h18M7 13h.01M12 13h.01M17 13h.01M7 17h.01M12 17h.01M17 17h.01' }
  };
  $: shape = shapes[icon] ?? shapes.calendar;
</script>

<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round">
  <path d={shape.body} fill="#f4f8f0" />
  <path d={shape.details} />
</svg>

<style>svg { display: block; width: 100%; height: 100%; }</style>
