<script lang="ts">
  import PatientJourney from '$lib/components/PatientJourney.svelte';
  import type { Language } from '$lib/i18n/copy';
  export let pageLanguage: Language = 'es';
</script>

<PatientJourney {pageLanguage} />
