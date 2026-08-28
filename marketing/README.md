# Rescoldo — piezas de video

Grabadas del sitio real con Chrome + Playwright sobre el build de producción.
Todo lo que se ve está andando de verdad: el preloader, el scroll suave, el
parallax, el campo de brasas y el formulario de reservas completándose solo.

**Los tres archivos vienen sin audio.** Es a propósito: la música se elige en el
editor, y un reel silencioso rinde mal. Poneles algo instrumental y lento —
ambient, piano, folk seco. Nada con voz.

## Qué es cada archivo

| Archivo | Formato | Dónde va |
|---|---|---|
| `rescoldo-vertical.mp4` | 1080×1920 · 53 s | Reel de Instagram y TikTok. La pieza principal. |
| `rescoldo-hook-vertical.mp4` | 1080×1920 · 19 s | Stories y TikTok. Solo los cuatro momentos más fuertes. |
| `rescoldo-desktop.mp4` | 1920×1080 · 49 s | Portafolio, LinkedIn, Behance. |
| `portada-vertical.jpg` | 1080×1920 | Cover del Reel. |
| `portada-desktop.jpg` | 1920×1080 | Miniatura del caso en el portafolio. |

## Guion del vertical

| Tiempo | Plano | Por qué está |
|---|---|---|
| 0:00 | Preloader en negro, la marca entra por máscara | Arranca en negro: frena el scroll del feed |
| 0:03 | Menú a pantalla completa | Prueba que hay diseño mobile propio, no un desktop achicado |
| 0:07 | Manifiesto, palabra por palabra | El respiro. Cambio de negro a blanco |
| 0:14 | Los números contando: 1 · 34 · 0 · 90 km | El dato que convierte «lindo» en «esto es en serio» |
| 0:21 | Tramo de brasas | El plano más lindo del sitio. Este es el que se comparte |
| 0:24 | Carrusel de platos | Producto |
| 0:29 | La carta | Contenido real, no lorem ipsum |
| 0:38 | El espacio | Fotografía |
| 0:42 | Reserva completándose hasta «Te esperamos.» | Prueba que **funciona**, no que solo se ve bien |
| 0:50 | Cierre sobre la marca en grande | Recuerdo |

El corte de Stories usa los minutos 0:00, 0:21, 0:24 y 0:47.

## Cómo publicarlo

**Reel (vertical).** Los primeros dos segundos deciden todo. Poné un texto
sobreimpreso que arranque con una afirmación, no con una explicación:

> *Diseñé la web de un restaurante que no existe.*

y recién después el video hace su trabajo. Cover: `portada-vertical.jpg`.

**Stories.** El corte de 19 s con un sticker de encuesta («¿parece real?»)
sobre el segundo plano. Sirve para medir antes de invertir en el Reel.

**LinkedIn / portafolio.** El desktop, con un texto de proceso: qué decisiones
tomaste y por qué. Ahí el diferencial no es el video sino el criterio.

## Tres opciones de copy

1. **Concepto primero** — «Rescoldo no existe. Un restaurante en Juanicó donde
   se enciende un solo fuego a las once de la mañana y todo el servicio de la
   noche se cocina con el calor que queda. Le diseñé y programé la web.»

2. **Proceso** — «Antes de escribir una línea de código definí el nombre, la
   cocina, la carta, la paleta y hasta por qué cierran los lunes. La web salió
   sola después de eso. Concepto, diseño y desarrollo, de cero.»

3. **Detalle técnico** — «El fuego de esta web no es una foto: son 110 brasas
   dibujadas en canvas. Ninguna imagen de llamas evitaba parecer banco de
   imágenes, y encima contradecía la frase de la marca.»

Etiquetas: `#webdesign #uidesign #frontend #react #restaurantwebsite
#diseñoweb #arte​direccion #uruguay #creativedeveloper`

## Regenerar los videos

```bash
npm run build
npx vite preview --port 4180 &
node scripts/reel.mjs desktop
node scripts/reel.mjs vertical
```

La coreografía —planos, pausas y tiempos— está en `scripts/reel.mjs`, escrita
como un guion. Si cambia el sitio, se ajusta ahí y se vuelve a grabar.
