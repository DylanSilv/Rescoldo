/**
 * Graba el reel de presentación del sitio.
 *
 *   node scripts/reel.mjs desktop
 *   node scripts/reel.mjs vertical
 *
 * Maneja el Chrome del sistema con Playwright sobre el build de producción,
 * así que lo que se graba son las animaciones reales: el preloader, el scroll
 * suave de Lenis, el parallax, el campo de brasas y el formulario andando.
 *
 * La coreografía está escrita como un guion con tiempos: cada bloque es un
 * plano, con su pausa. No es un scroll automático de punta a punta — eso se
 * nota y se ve barato.
 */
import { chromium } from 'playwright'
import { mkdir, readdir, rename, rm } from 'node:fs/promises'
import { join } from 'node:path'

const MODO = process.argv[2] ?? 'desktop'
const BASE = process.env.BASE ?? 'http://localhost:4180'
const SALIDA = 'marketing'

const PERFILES = {
  desktop: {
    viewport: { width: 1600, height: 900 },
    escala: 1.5,
    video: { width: 1920, height: 1080 },
  },
  vertical: {
    viewport: { width: 432, height: 768 },
    escala: 2.5,
    video: { width: 1080, height: 1920 },
    movil: true,
  },
}

const perfil = PERFILES[MODO]
if (!perfil) throw new Error(`Modo desconocido: ${MODO}. Usá "desktop" o "vertical".`)

const esperar = (ms) => new Promise((r) => setTimeout(r, ms))

/** Rueda del mouse en pasos chicos: Lenis se encarga de suavizar. */
async function desplazar(page, distancia, { paso = 60, ritmo = 16 } = {}) {
  const signo = Math.sign(distancia)
  let restante = Math.abs(distancia)
  while (restante > 0) {
    const delta = Math.min(paso, restante)
    await page.mouse.wheel(0, delta * signo)
    restante -= delta
    await esperar(ritmo)
  }
}

/** Lleva una sección hasta cierta altura de pantalla. */
async function irHasta(page, id, offset = 0, opts) {
  const delta = await page.evaluate(
    ([sel, off]) => {
      const el = document.getElementById(sel)
      return el ? Math.round(el.getBoundingClientRect().top - off) : 0
    },
    [id, offset],
  )
  if (delta !== 0) await desplazar(page, delta, opts)
}

// Marca de inicio de la grabación: los tiempos que informa cada plano se usan
// después para colocar los textos sobreimpresos sin adivinar.
let t0 = 0

async function plano(nombre, fn) {
  const desde = (Date.now() - t0) / 1000
  try {
    await fn()
  } catch (error) {
    process.stdout.write(`    ⚠ ${nombre}: ${error.message}\n`)
  }
  const hasta = (Date.now() - t0) / 1000
  process.stdout.write(`  ${desde.toFixed(1).padStart(5)}s → ${hasta.toFixed(1).padStart(5)}s  ${nombre}\n`)
}

async function reservar(page, { rapido = false, esperaFinal = 0 } = {}) {
  const boton = (re) => page.getByRole('button', { name: re }).first()

  await page.getByRole('button', { name: '4', exact: true }).click()
  await esperar(rapido ? 700 : 1100)
  await boton(/Continuar/).click()
  await esperar(rapido ? 700 : 1000)

  await page.fill('#fecha', '2026-09-12')
  await esperar(600)
  await page.getByRole('button', { name: '20:30', exact: true }).click()
  await esperar(rapido ? 700 : 1000)
  await boton(/Continuar/).click()
  await esperar(900)

  await page.type('#nombre', 'Lucía Bentancur', { delay: rapido ? 45 : 65 })
  await esperar(350)
  await page.type('#email', 'lucia@correo.uy', { delay: rapido ? 40 : 55 })
  await esperar(rapido ? 700 : 1100)
  await boton(/Confirmar reserva/).click()
  await esperar(esperaFinal || (rapido ? 2200 : 3000))
}

/* ------------------------------------------------------------------ */

const navegador = await chromium.launch({ channel: 'chrome', headless: true })

const contexto = await navegador.newContext({
  viewport: perfil.viewport,
  deviceScaleFactor: perfil.escala,
  isMobile: Boolean(perfil.movil),
  hasTouch: Boolean(perfil.movil),
  recordVideo: { dir: '.reel-tmp', size: perfil.video },
})

const page = await contexto.newPage()

// La barra de scroll no aporta nada en un video y ensucia el encuadre.
await page.addInitScript(() => {
  const estilo = document.createElement('style')
  estilo.textContent = '::-webkit-scrollbar{width:0!important;height:0!important}'
  document.documentElement.appendChild(estilo)
})

console.log(`\nGrabando «${MODO}» — ${perfil.video.width}×${perfil.video.height}\n`)

t0 = Date.now()
await page.goto(BASE, { waitUntil: 'load' })

if (perfil.movil) {
  /* ---------------- VERTICAL — Reels / TikTok ---------------- */

  await plano('Preloader + hero', async () => {
    await esperar(2800)
  })

  await plano('Menú a pantalla completa', async () => {
    await page.getByRole('button', { name: 'Abrir menú' }).click()
    await esperar(1500)
    await page.getByRole('button', { name: 'Cerrar menú' }).click()
    await esperar(800)
  })

  await plano('Manifiesto', async () => {
    await irHasta(page, 'manifiesto', 0, { paso: 58, ritmo: 14 })
    await esperar(1600)
  })

  await plano('El fuego · los números', async () => {
    await irHasta(page, 'fuego', 0, { paso: 60 })
    await esperar(1000)
    await desplazar(page, 700, { paso: 54 })
    await esperar(1300)
  })

  await plano('Tramo de brasas', async () => {
    await desplazar(page, 900, { paso: 54 })
    await esperar(4600)
  })

  await plano('Platos · carrusel', async () => {
    await irHasta(page, 'platos', -40, { paso: 64 })
    await esperar(900)
    const pista = page.locator('[aria-label="Platos destacados"]')
    for (const x of [340, 700]) {
      await pista.evaluate((el, left) => el.scrollTo({ left, behavior: 'smooth' }), x)
      await esperar(1400)
    }
  })

  await plano('La carta', async () => {
    await irHasta(page, 'carta', -20, { paso: 68 })
    await esperar(800)
    await desplazar(page, 1000, { paso: 48, ritmo: 16 })
    await esperar(1000)
  })

  await plano('El espacio', async () => {
    await irHasta(page, 'espacio', -20, { paso: 70 })
    await esperar(800)
    await desplazar(page, 1400, { paso: 60, ritmo: 15 })
    await esperar(800)
  })

  await plano('Reservas', async () => {
    await irHasta(page, 'reservas', -20, { paso: 72 })
    await esperar(700)
    await desplazar(page, 620, { paso: 54 })
    await esperar(500)
    await reservar(page, { rapido: true, esperaFinal: 4400 })
  })

  await plano('Cierre en la marca', async () => {
    await desplazar(page, 4200, { paso: 82, ritmo: 13 })
    await esperar(2200)
  })
} else {
  /* ---------------- DESKTOP — portafolio / LinkedIn ---------------- */

  await plano('Preloader + hero', async () => {
    await esperar(3200)
  })

  await plano('Halo de brasa siguiendo el cursor', async () => {
    for (let i = 0; i <= 26; i++) {
      await page.mouse.move(180 + i * 48, 620 - Math.sin(i / 4) * 130)
      await esperar(38)
    }
    await esperar(900)
  })

  await plano('Manifiesto', async () => {
    await irHasta(page, 'manifiesto', 0, { paso: 60, ritmo: 14 })
    await esperar(2200)
  })

  await plano('El fuego · los números', async () => {
    await irHasta(page, 'fuego', 0, { paso: 68 })
    await esperar(1200)
    await desplazar(page, 560, { paso: 58 })
    await esperar(1500)
  })

  await plano('Tramo de brasas', async () => {
    await desplazar(page, 760, { paso: 58 })
    await esperar(2600)
  })

  await plano('Platos · scroll horizontal', async () => {
    await irHasta(page, 'platos', 0, { paso: 74 })
    await esperar(700)
    await desplazar(page, 2600, { paso: 50, ritmo: 15 })
    await esperar(1000)
  })

  await plano('La carta', async () => {
    await irHasta(page, 'carta', 0, { paso: 74 })
    await esperar(900)
    await desplazar(page, 900, { paso: 52 })
    await page.mouse.move(900, 520)
    await esperar(1400)
    await desplazar(page, 1500, { paso: 54 })
    await esperar(1000)
  })

  await plano('El espacio', async () => {
    await irHasta(page, 'espacio', 0, { paso: 76 })
    await esperar(900)
    await desplazar(page, 1900, { paso: 52, ritmo: 15 })
    await esperar(1200)
  })

  await plano('Reservas', async () => {
    await irHasta(page, 'reservas', 0, { paso: 78 })
    await esperar(900)
    await reservar(page, { rapido: true })
  })

  await plano('Mapa y cierre', async () => {
    await irHasta(page, 'ubicacion', 0, { paso: 74 })
    await esperar(1800)
    await desplazar(page, 3000, { paso: 72, ritmo: 14 })
    await esperar(2400)
  })
}

const video = page.video()
await page.close()
await contexto.close()
await navegador.close()

await mkdir(SALIDA, { recursive: true })
const crudo = await video.path()
const destino = join(SALIDA, `rescoldo-${MODO}.webm`)
await rename(crudo, destino)
await rm('.reel-tmp', { recursive: true, force: true })

console.log(`\n✓ ${destino}\n`)
