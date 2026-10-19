# Portfolio · Malena Gonzales Chaves — versión Content, Social Media & Brand Marketing

Sitio estático en HTML, CSS y JavaScript, sin build ni dependencias. Las rutas son relativas, así que funciona tal cual en GitHub Pages.

## Estructura

```
index.html                       página principal (nueva)
css/styles.css                   estilos
js/data.js                       contenido editable: proyectos, capítulos, videos verticales, documentos
js/main.js                       carrusel, visor, recorrido, menú y animaciones
media/                           videos optimizados para web, pósters, fotogramas y portadas
docs/                            PDFs (CV, títulos, Puma, HÄBIT)
free2move-*.html                 páginas que se abren en el visor
.nojekyll

# Solo de referencia (no los usa el sitio nuevo):
Malena Gonzales Chaves.dc.html   copia literal del portfolio original de Claude Design
support.js, prismatic-discs.js   dependencias de esa copia
uploads/                         imágenes originales en PNG (el sitio usa media/covers/)
```

Antes de publicar se pueden excluir los archivos de referencia: el sitio no los necesita.

## Videos verticales de Laura Di Cola

La sección de videos verticales se quitó de la página. Si más adelante se quieren sumar, `js/data.js` conserva `LAURA_REELS`: al completar `src` en un objeto, el video aparece como una diapositiva más del carrusel.

## Splash de entrada

Al abrir la página se muestra una pantalla de presentación (nombre, puesto y empresa) durante unos 2,5 segundos, una vez por sesión del navegador. Se saltea con un clic o una tecla. Los textos están al principio de `index.html` (`.splash`).

## Notas sobre los videos actuales

- `kenzo-leau-pure.mp4` es una versión editada de la presentación original (6:01 → 2:58). Se quitó el tramo de 2:48 a 5:51 de la exportación original: ahí la imagen quedaba fija en el logo de Kenzo con un rectángulo negro, porque el video embebido en la presentación no se conservó (solo quedó el audio). Si aparece el clip original, se puede volver a armar.
- `bitrixkids.mp4` y `sin-desperdicio-changomas-sopa-zapallo.mp4` son los originales recomprimidos, sin cortes.
- `hero-loop.mp4` es un fragmento sin audio ni subtítulos de la cápsula de Chango Más (del segundo 8 al 11,5, en cámara lenta).

## Dirección visual

Toma como referencia el sitio actual de la División de Productos Profesionales de L'Oréal (loreal.com/en/professional-products-division), sin copiar su identidad ni usar su logo.

- Fondo blanco y gris claro (#F4F4F4) y texto carbón. El negro queda solo como escenario de los videos.
- Acento beige cálido en botones píldora y etiquetas. Sin rojo, porque el sitio de referencia no lo usa.
- Serif en mayúsculas con espaciado para lo institucional: nombre, menú, título del hero, cifras y contacto. Se usa **Bodoni Moda** con tamaño óptico bajo.
- Sans neogrotesca (**Inter Tight**) para títulos de sección y textos.
- Componentes inspirados en la referencia:
  - hero con foto a sangre y título superpuesto;
  - miga de pan con "/";
  - fila de cifras con líneas finas;
  - bloque "Focus on" para Sin Desperdicio;
  - tarjetas con radio moderado;
  - carrusel con flechas en círculos blancos y miniaturas redondas;
  - pie mínimo.

## Comportamiento

- Ningún video arranca con sonido. El fragmento del hero corre en silencio, se pausa fuera de pantalla, tiene botón de pausa y no se reproduce si el sistema tiene activado "reducir movimiento".
- Los videos cargan solo cuando se reproducen (`preload="none"` y póster).
- El carrusel se maneja con flechas, miniaturas, teclado (← →) y deslizando sobre el texto en celular. Cada video conserva su proporción original.
- Las presentaciones tienen capítulos y fotogramas que llevan al momento exacto del video. "Ver en grande" abre el video en el visor y retoma en el mismo punto.
- Si un video no se puede reproducir, aparece un enlace para descargarlo.
- Para probarlo en local hace falta un servidor que soporte pedidos por rangos de bytes, como GitHub Pages; sin eso, los capítulos no pueden adelantar el video. Con `file://`, además, los PDFs del visor no cargan.
