/**
 * Renderiza las placas y los textos sobreimpresos del reel.
 *
 * Se dibujan en el navegador y no en un editor de video para que usen la
 * tipografía real de la marca —Instrument Serif y DM Mono, servidas por el
 * propio sitio— en lugar de una fuente parecida.
 */
import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'

const BASE = process.env.BASE ?? 'http://localhost:4180'
const W = 1080
const H = 1920

const base = `
  <link rel="stylesheet" href="/fonts.css">
  <style>
    *{margin:0;padding:0;box-sizing:border-box}
    html,body{width:${W}px;height:${H}px;background:transparent;
      -webkit-font-smoothing:antialiased}
    .placa{width:${W}px;height:${H}px;display:flex;flex-direction:column;
      align-items:center;justify-content:center;text-align:center;
      background:#14110F;padding:0 96px}
    .label{font-family:'DM Mono',monospace;font-size:26px;letter-spacing:.26em;
      text-transform:uppercase;color:rgba(251,250,247,.42)}
    .display{font-family:'Instrument Serif',serif;color:#FBFAF7;
      line-height:1.02;letter-spacing:-.03em}
    .rescoldo{color:#BF4B21}
    .regla{width:120px;height:2px;background:#BF4B21}
    /* Texto sobre el video: va abajo, con un velo propio para que se lea */
    .sobre{width:${W}px;height:${H}px;display:flex;flex-direction:column;
      justify-content:flex-end;padding:0 84px 260px;
      background:linear-gradient(to top,rgba(20,17,15,.92) 0%,
        rgba(20,17,15,.72) 26%,rgba(20,17,15,0) 52%)}
    .sobre p{font-family:'Instrument Serif',serif;font-size:82px;line-height:1.06;
      letter-spacing:-.03em;color:#FBFAF7;text-align:left}
    .sobre .label{text-align:left;margin-bottom:28px}
  </style>`

const PLACAS = {
  'placa-titulo': `${base}<div class="placa">
      <p class="label" style="margin-bottom:56px">Website concept &amp; development</p>
      <h1 class="display" style="font-size:112px">
        Diseñé la web de un<br>restaurante que<br><em class="rescoldo">no existe</em>.
      </h1>
      <div class="regla" style="margin-top:64px"></div>
    </div>`,

  'placa-cierre': `${base}<div class="placa">
      <h1 class="display" style="font-size:196px">Rescoldo</h1>
      <div class="regla" style="margin:56px 0 52px"></div>
      <p class="label">Concepto, diseño y desarrollo</p>
      <p class="label" style="color:#FBFAF7;margin-top:20px">Dylan Silva</p>
      <p class="label rescoldo" style="margin-top:88px">Sitio completo en el link de la bio</p>
    </div>`,

  'texto-brasas': `${base}<div class="sobre">
      <p class="label">Capítulo II</p>
      <p>El fuego no es una foto:<br>son 110 brasas dibujadas<br>en <em class="rescoldo">canvas</em>.</p>
    </div>`,

  'texto-reserva': `${base}<div class="sobre">
      <p class="label">Capítulo VI</p>
      <p>Y la reserva<br><em class="rescoldo">funciona de verdad</em>.</p>
    </div>`,
}

const navegador = await chromium.launch({ channel: 'chrome', headless: true })
const contexto = await navegador.newContext({ viewport: { width: W, height: H } })
const page = await contexto.newPage()
await page.goto(BASE, { waitUntil: 'load' })
await mkdir('marketing/placas', { recursive: true })

for (const [nombre, html] of Object.entries(PLACAS)) {
  await page.setContent(html, { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(250)
  await page.screenshot({
    path: `marketing/placas/${nombre}.png`,
    omitBackground: nombre.startsWith('texto-'),
  })
  console.log(`  · ${nombre}.png`)
}

await navegador.close()
