<script>
  import { site } from '$lib/site';
</script>

<svelte:head>
  <title>Aviso Legal | Eima Salut</title>
  <meta name="description" content="Aviso legal de Eima Salut." />
  <meta name="robots" content="noindex, follow" />
  <meta property="og:title" content="Aviso Legal | Eima Salut" />
  <meta property="og:description" content="Información legal y condiciones generales del sitio web de Eima Salut." />
  <link rel="canonical" href={`${site.url}/aviso-legal`} />
</svelte:head>

<article lang="es" class="max-w-3xl mx-auto px-6 md:px-8 pt-24 pb-16 prose-blog">
  <h1>Aviso Legal</h1>
  <p class="text-secondary">Última actualización: 17 de abril de 2026</p>

  <h2>Titular del sitio</h2>
  <p>
    Este sitio web es titularidad de EIMA SALUT, con dirección en Mallorca (Islas Baleares,
    España) y correo electrónico de contacto
    <a href={`mailto:${site.email}`}>{site.email}</a>.
  </p>

  <h2>Objeto</h2>
  <p>
    La información contenida en este sitio tiene carácter informativo y no sustituye la consulta
    con un profesional sanitario. El tratamiento fisioterapéutico se presta de forma presencial o
    virtual tras una valoración previa.
  </p>

  <h2>Propiedad intelectual</h2>
  <p>
    Los contenidos, el diseño, los textos, las imágenes y el código de este sitio son propiedad de
    EIMA SALUT, salvo cuando se indique lo contrario.
  </p>

  <h2>Legislación aplicable</h2>
  <p>
    Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se
    someten a los tribunales que correspondan conforme a la normativa vigente.
  </p>

  <p class="text-sm text-secondary mt-10">
    Este texto es un borrador y puede requerir revisión legal antes de publicarse en producción.
  </p>
</article>
