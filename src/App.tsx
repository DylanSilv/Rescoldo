import { useEffect, useState } from 'react'
import { AnimatePresence } from 'motion/react'

import { Nav } from './components/Nav'
import { MenuMovil } from './components/MenuMovil'
import { RielCapitulos } from './components/RielCapitulos'
import { BarraMovil } from './components/BarraMovil'
import { HaloBrasa } from './components/HaloBrasa'
import { Preloader } from './components/Preloader'

import { Hero } from './sections/Hero'
import { Manifiesto } from './sections/Manifiesto'
import { Fuego } from './sections/Fuego'
import { Platos } from './sections/Platos'
import { Carta } from './sections/Carta'
import { Espacio } from './sections/Espacio'
import { Reservas } from './sections/Reservas'
import { Ubicacion } from './sections/Ubicacion'
import { Footer } from './sections/Footer'

import { useSmoothScroll } from './hooks/useSmoothScroll'
import { useCapituloActivo } from './hooks/useCapituloActivo'
import { bloquearScroll } from './lib/scroll'

export default function App() {
  const [cargando, setCargando] = useState(true)
  const [menuAbierto, setMenuAbierto] = useState(false)

  useSmoothScroll()
  const capituloActivo = useCapituloActivo()

  // El preloader se va cuando están las fuentes, con un mínimo para que la
  // transición se lea como una decisión y no como un parpadeo.
  useEffect(() => {
    const minimo = new Promise((resolver) => window.setTimeout(resolver, 1200))
    const fuentes = document.fonts?.ready ?? Promise.resolve()
    Promise.all([minimo, fuentes]).then(() => setCargando(false))
  }, [])

  useEffect(() => {
    bloquearScroll(menuAbierto || cargando)
  }, [menuAbierto, cargando])

  return (
    <div className="grain relative">
      <AnimatePresence>{cargando && <Preloader key="preloader" />}</AnimatePresence>

      <a
        href="#manifiesto"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:bg-humo focus:px-4 focus:py-3 focus:text-cal"
      >
        Saltar al contenido
      </a>

      <HaloBrasa />
      <Nav activo={capituloActivo} abrirMenu={() => setMenuAbierto(true)} menuAbierto={menuAbierto} />
      <MenuMovil abierto={menuAbierto} cerrar={() => setMenuAbierto(false)} />
      <RielCapitulos activo={capituloActivo} />
      <BarraMovil />

      <main>
        <Hero />
        <Manifiesto />
        <Fuego />
        <Platos />
        <Carta />
        <Espacio />
        <Reservas />
        <Ubicacion />
      </main>

      <Footer />
    </div>
  )
}
