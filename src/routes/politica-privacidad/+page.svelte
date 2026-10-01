<script>
  import { site } from '$lib/site';
</script>

<svelte:head>
  <title>Política de Privacidad | Eima Salut</title>
  <meta name="description" content="Política de privacidad de Eima Salut." />
  <meta name="robots" content="noindex, follow" />
  <meta property="og:title" content="Política de Privacidad | Eima Salut" />
  <meta property="og:description" content="Consulta cómo Eima Salut trata y protege los datos personales de los usuarios." />
  <link rel="canonical" href={`${site.url}/politica-privacidad`} />
</svelte:head>

<article lang="es" class="max-w-3xl mx-auto px-6 md:px-8 pt-24 pb-16 prose-blog">
  <h1>Política de Privacidad</h1>
  <p class="text-secondary">Última actualización: 17 de abril de 2026</p>

  <h2>Responsable del tratamiento</h2>
  <p>
    EIMA SALUT, con dirección postal en Mallorca (Islas Baleares, España) y correo
    electrónico <a href={`mailto:${site.email}`}>{site.email}</a>, es el
    responsable del tratamiento de los datos personales recogidos a través de este sitio web.
  </p>

  <h2>Datos que recogemos</h2>
  <ul>
    <li>Datos que nos facilitas al rellenar el formulario de contacto: nombre, email, teléfono, localidad y el mensaje que nos envíes.</li>
    <li>Datos técnicos de navegación imprescindibles para el funcionamiento del sitio.</li>
  </ul>

  <h2>Finalidad</h2>
  <p>
    Utilizamos tus datos exclusivamente para responderte, agendar una primera toma de contacto y
    hacerte seguimiento como paciente si contratas nuestros servicios. No enviamos comunicaciones
    comerciales ni cedemos tus datos a terceros para fines publicitarios.
  </p>

  <h2>Base legal</h2>
  <p>
    El tratamiento se basa en tu consentimiento expreso al enviar el formulario y en la ejecución de
    la relación asistencial cuando se produce.
  </p>

  <h2>Conservación</h2>
  <p>
    Conservamos los datos durante el tiempo necesario para prestar el servicio y, en su caso,
    durante los plazos legales exigibles a la documentación clínica.
  </p>

  <h2>Derechos</h2>
  <p>
    Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y
    portabilidad escribiendo a <a href={`mailto:${site.email}`}>{site.email}</a>.
    También puedes presentar una reclamación ante la Agencia Española de Protección de Datos.
  </p>

  <p class="text-sm text-secondary mt-10">
    Este texto es un borrador y puede requerir revisión legal antes de publicarse en producción.
  </p>
</article>
