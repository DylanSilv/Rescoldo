# Rescoldo — piezas de video

Grabadas del sitio real con Chrome + Playwright sobre el build de producción.
Todo lo que se ve está andando de verdad: el preloader, el scroll suave, el
parallax, el campo de brasas y el formulario de reservas completándose solo.

**Los tres archivos vienen sin audio.** Es a propósito: la música se elige en el
editor, y un reel silencioso rinde mal. Poneles algo instrumental y lento —
ambient, piano, folk seco. Nada con voz.

## Qué es cada archivo

Los dos primeros están **montados para publicar**: llevan placa de título, dos
textos sobreimpresos y placa de cierre, todo compuesto en Instrument Serif —
la tipografía real de la marca, no una parecida.

| Archivo | Formato | Dónde va |
|---|---|---|
| `ig-story.mp4` | 1080×1920 · 19 s | **Empezá por acá.** Stories, TikTok y como primer Reel. |
| `ig-reel.mp4` | 1080×1920 · 65 s | Reel completo, para quien quiera ver todo el recorrido. |
| `rescoldo-vertical.mp4` | 1080×1920 · 60 s | El mismo recorrido sin placas, por si querés editarlo vos. |
| `rescoldo-hook-vertical.mp4` | 1080×1920 · 15 s | El corte corto sin placas. |
| `rescoldo-desktop.mp4` | 1920×1080 · 49 s | Portafolio, LinkedIn, Behance. |
| `portada-vertical.jpg` | 1080×1920 | Cover del Reel. |
| `portada-desktop.jpg` | 1920×1080 | Miniatura del caso en el portafolio. |
| `placas/` | PNG | Las placas y textos sueltos, por si querés recomponer. |

Las placas se generan con `node scripts/placas.mjs`, que las dibuja en el
navegador para que usen las fuentes del propio sitio.

## Guion de `ig-reel.mp4`

| Tiempo | Plano | Por qué está |
|---|---|---|
| 0:00 | **Placa**: «Diseñé la web de un restaurante que *no existe*» | El gancho. Negro sobre negro: empalma con el preloader sin corte visible |
| 0:03 | Hero, la marca entra por máscara | Primera impresión |
| 0:05 | Menú a pantalla completa | Prueba que hay diseño mobile propio, no un desktop achicado |
| 0:08 | Manifiesto, palabra por palabra | El respiro. Cambio de negro a blanco |
| 0:20 | Los números contando: 1 · 34 · 0 · 90 km | El dato que convierte «lindo» en «esto es en serio» |
| 0:24 | Tramo de brasas + **texto**: «El fuego no es una foto» | El plano más lindo, y el que explica la decisión técnica |
| 0:27 | Carrusel de platos | Producto |
| 0:32 | La carta | Contenido real, no lorem ipsum |
| 0:44 | El espacio | Fotografía |
| 0:47 | Reserva completándose | |
| 0:53 | Confirmación + **texto**: «Y la reserva *funciona de verdad*» | Prueba que funciona, no que solo se ve bien |
| 1:02 | **Placa de cierre**: marca, crédito y «link en la bio» | Recuerdo y llamada a la acción |

El corte de Stories usa el gancho, el tramo de brasas, los platos y la
confirmación.

## Cómo publicarlo

**Reel.** El gancho ya viene montado en la placa de título, así que no hace
falta agregar texto en la app. Cover: `portada-vertical.jpg`.

Publicá primero `ig-story.mp4`: 19 segundos rinden mucho mejor que 65 en un
primer posteo, y si funciona, después subís el completo.

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
