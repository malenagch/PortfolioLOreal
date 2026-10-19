/* Contenido editable del portfolio.
   ─────────────────────────────────────────────────────────────────────
   PARA SUMAR LOS VIDEOS VERTICALES DE LAURA DI COLA
   1. Copiá el archivo a /media (sin espacios ni paréntesis), por ejemplo
      media/laura-reel-01.mp4, y si querés un póster a media/posters/.
   2. Buscá el primer objeto de LAURA_REELS con `src: null` y completá
      `src`, `poster` y, si hace falta, `title` y `note`.
   El carrusel de "Trabajo seleccionado" y la sección de Sin Desperdicio
   los muestran solos; los huecos que queden sin `src` siguen como
   espacio reservado. No hace falta tocar HTML, CSS ni main.js.
   ───────────────────────────────────────────────────────────────────── */

window.PORTFOLIO = (function () {

  /* Proyectos destacados del carrusel, en orden. */
  const FEATURED = [
    {
      id: 'changomas',
      title: 'Sopa de zapallo, sin desperdicio',
      brand: 'Sin Desperdicio × Chango Más',
      label: 'Contenido audiovisual · con Laura Di Cola',
      tag: 'Trabajo profesional',
      format: '0:36',
      video: { src: 'media/sin-desperdicio-changomas-sopa-zapallo.mp4', poster: 'media/posters/changomas.jpg', w: 1280, h: 720 },
      thumb: 'media/posters/changomas-thumb.jpg',
      blocks: [
        { h: 'Contexto', p: 'Chango Más se alió con Laura Di Cola, cuya marca aporta autoridad y credibilidad en sustentabilidad. La alianza incluyó una mención en el libro Sin Desperdicio, sin injerencia en sus contenidos, y dos cápsulas de recetas, la sopa de zapallo y una receta con cáscaras de banana, que se emitieron en las pantallas de sus supermercados.' },
        { h: 'Objetivo', p: 'Transmitir cada receta de forma simple y ágil. El video tenía que ser breve y captar la atención en la tienda: tomas con mucho color y movimiento, y letra grande para que se leyera a distancia.' },
        { h: 'Desafío', p: 'Resumir una receta completa en pocos segundos, sin voz en off ni otros recursos de apoyo, sin perder el mensaje de no desperdiciar. En la cápsula de cáscaras de banana, por ejemplo, propuse cuatro versiones con distintas duraciones y cortes para equilibrar tiempo, legibilidad y mensaje.' },
        { h: 'La pieza', p: 'Cápsula de receta de Laura Di Cola: una sopa que aprovecha todas las partes del zapallo, paso a paso, con un QR a la receta completa.' },
        { h: 'Mi aporte', p: 'Guion, filmación y edición de la pieza.' }
      ],
      frames: [
        { t: 13, img: 'media/stills/chango-ajo.jpg', label: 'Paso a paso' },
        { t: 24, img: 'media/stills/chango-licuadora.jpg', label: 'Cocción' },
        { t: 29, img: 'media/stills/chango-lista.jpg', label: 'Resultado' },
        { t: 33, img: 'media/stills/chango-qr.jpg', label: 'Cierre con QR' }
      ]
    },
    {
      id: 'kenzo',
      title: "Kenzo · L'Eau Pure",
      brand: 'Campaña de influencers y gestión de crisis',
      label: 'Máster · Social Media Marketing',
      tag: 'Proyecto de máster en equipo',
      format: 'Presentación en video · 2:58',
      video: { src: 'media/kenzo-leau-pure.mp4', poster: 'media/posters/kenzo.jpg', w: 854, h: 480 },
      thumb: 'media/posters/kenzo.jpg',
      blocks: [
        { h: 'Contexto', p: "Propuesta de campaña de influencers para el lanzamiento de verano de L'Eau Pure, una fragancia de Kenzo con una narrativa de pureza y cuidado del océano." },
        { h: 'Objetivo', p: 'Enganchar a la Generación Z: llegar a esa nueva generación y fortalecer la sustentabilidad, el tercer pilar de la marca.' },
        { h: 'Enfoque', list: [
          'Análisis de los canales de la marca y selección de seis creadores, con el perfil y el motivo estratégico de cada uno.',
          'Briefing con formatos, tono y mandatories, y guion de la pieza creativa.',
          'Simulación de crisis: un creador publica contenido tocando fauna marina porque el briefing omitía un mandatory clave. Plan de acción de 0 a 72 h, comunicados y piezas de recuperación junto a Coral Gardeners.'
        ] },
        { h: 'Mi aporte en el equipo', list: [
          'Relevé las métricas de Instagram y TikTok de la marca con Not Just Analytics.',
          'Planteé los objetivos SMART, con apoyo de ChatGPT.',
          'Investigué a dos de los creadores con HypeAuditor.',
          'Propuse la simulación de crisis y planteé la mayor parte del plan de acción.'
        ] }
      ],
      chapters: [
        { t: 0, label: 'Portada' },
        { t: 6, label: 'Marca y objetivo' },
        { t: 14, label: 'Canales' },
        { t: 22, label: 'Selección de creadores' },
        { t: 52, label: 'Briefing' },
        { t: 62, label: 'Propuesta creativa' },
        { t: 66, label: 'Crisis: qué y por qué' },
        { t: 98, label: 'Plan de acción de 0 a 72 h' },
        { t: 104, label: 'Comunicados' },
        { t: 112, label: 'Post crisis' },
        { t: 126, label: 'Pieza de reactivación' }
      ],
      frames: [
        { t: 31, img: 'media/stills/kenzo-influencer.jpg', label: 'Ficha de creador' },
        { t: 59, img: 'media/stills/kenzo-briefing.jpg', label: 'Briefing' },
        { t: 71, img: 'media/stills/kenzo-crisis.jpg', label: 'Crisis' },
        { t: 132, img: 'media/stills/kenzo-spot.jpg', label: 'Pieza post crisis' }
      ]
    },
    {
      id: 'bitrixkids',
      title: 'BitrixKids',
      brand: 'Estrategia editorial y activación de comunidad',
      label: 'Máster · Social Media Marketing',
      tag: 'Proyecto de máster en equipo',
      format: 'Presentación en video · 1:38',
      video: { src: 'media/bitrixkids.mp4', poster: 'media/posters/bitrixkids.jpg', w: 1920, h: 1080 },
      thumb: 'media/posters/bitrixkids.jpg',
      blocks: [
        { h: 'Contexto', p: 'BitrixKids es una marca de moda infantil de Barcelona, con prendas atemporales, producción local y tejidos naturales. El análisis mostró una base visual fuerte y una comunidad pasiva.' },
        { h: 'Objetivo', p: 'Activar la comunidad y humanizar la marca con storytelling antes de la colección SS26. La idea que ordena todo: «menos catálogo, más alma».' },
        { h: 'Enfoque', list: [
          'Concepto creativo para febrero: «De un hilo nace una historia».',
          'Estrategia editorial con pilares temáticos, frecuencia semanal y calendario de publicaciones.',
          'Guiones de cuatro reels, cada uno con apertura, desarrollo y cierre.',
          'Activación 360°, «El taller de los pequeños soñadores»: los chicos suben un dibujo, la marca lo convierte en ilustración y se suma contenido generado por las familias.'
        ] },
        { h: 'Mi aporte en el equipo', p: 'Pensé el concepto creativo y el storytelling, los pilares temáticos, el calendario de contenidos y la activación 360°.' }
      ],
      chapters: [
        { t: 0, label: 'Portada' },
        { t: 4, label: 'Introducción' },
        { t: 8, label: 'Análisis de la marca' },
        { t: 15, label: 'Concepto creativo' },
        { t: 20, label: '¿Por qué febrero?' },
        { t: 24, label: 'Pilares temáticos' },
        { t: 27, label: 'Estrategia editorial' },
        { t: 31, label: 'El hilo del storytelling' },
        { t: 38, label: 'Guiones de reels' },
        { t: 78, label: 'Activación 360°' },
        { t: 81, label: 'Objetivos' },
        { t: 85, label: 'Redes sociales' }
      ],
      frames: [
        { t: 12.5, img: 'media/stills/bitrix-analisis.jpg', label: 'Diagnóstico' },
        { t: 32, img: 'media/stills/bitrix-storytelling.jpg', label: 'Storytelling' },
        { t: 46, img: 'media/stills/bitrix-reel.jpg', label: 'Guion de reel' },
        { t: 79, img: 'media/stills/bitrix-activacion.jpg', label: 'Activación' }
      ]
    }
  ];

  /* Videos verticales para Laura Di Cola. Completá `src` cuando estén. */
  const LAURA_REELS = [
    { id: 'laura-reel-1', title: 'Video vertical 01', src: null, poster: null, w: 1080, h: 1920, note: '' },
    { id: 'laura-reel-2', title: 'Video vertical 02', src: null, poster: null, w: 1080, h: 1920, note: '' },
    { id: 'laura-reel-3', title: 'Video vertical 03', src: null, poster: null, w: 1080, h: 1920, note: '' }
  ];

  /* Documentos y sitios que se abren en el visor. */
  const DOCS = {
    master:    { kind: 'Posgrado', title: 'Máster en Marketing Digital · Universidad Villanueva', src: null, hint: 'Terminé el máster y estoy esperando que la universidad emita el título digital. Mientras tanto, puedo enviar el certificado de notas.' },
    grado:     { kind: 'Grado', title: 'Lic. en Comunicación Social · Universidad Austral', src: 'docs/diploma-comunicacion-social.pdf', pdf: true },
    cpe:       { kind: 'Idiomas', title: 'Certificate of Proficiency in English (CPE) · Cambridge', src: 'docs/certificado-c2-cpe.pdf', pdf: true },
    cv:        { kind: 'Documento', title: 'CV · Malena Gonzales Chaves', src: 'docs/cv-malena-gonzales-chaves.pdf', pdf: true },
    habit:     { kind: 'GarnierLuxe · nueva propuesta', title: 'HÄBIT', src: 'docs/habit-garnierluxe.pdf', pdf: true },
    puma:      { kind: 'Universidad Austral · ganadora', title: 'Puma Challenge', src: 'docs/puma-challenge.pdf', pdf: true },
    dicha:     { kind: 'Máster · proyecto final', title: 'La Dicha Marbana', src: 'https://ladichamarbana-code.github.io/ladicha/' },
    f2mLanding:{ kind: 'Free2move · landing', title: 'Landing de conversión', src: 'free2move-landing.html' },
    f2mGrowth: { kind: 'Free2move · growth strategy', title: 'Estrategia de growth marketing', src: 'free2move-growth-strategy.html' },
    sbApp:     { kind: 'Máster · app mobile', title: 'SafeBite · app', src: 'https://ladichamarbana-code.github.io/SafeBiteMVPapp/', external: true, shot: 'media/covers/safebite.png', hint: 'La app está pensada para pantalla completa: se ve mejor en una pestaña aparte.' },
    sbPitch:   { kind: 'Máster · inversión', title: 'SafeBite · pitch de inversión', src: 'https://ladichamarbana-code.github.io/SafeBite/', external: true, shot: 'media/covers/safebite.png', hint: 'El pitch está pensado para pantalla completa: se ve mejor en una pestaña aparte.' },
    bombay:    { kind: 'Marca propia', title: 'Bombay clothing', src: 'https://bombay38.webnode.page', external: true, shot: 'media/covers/bombay.jpg', hint: 'El sitio vive en Webnode y no se deja ver desde acá: abrilo en una pestaña aparte.' }
  };

  return { FEATURED, LAURA_REELS, DOCS };
})();
