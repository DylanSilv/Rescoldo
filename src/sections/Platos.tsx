import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Etiqueta } from '../components/Etiqueta'
import { Figura } from '../components/Figura'
import { LineasReveal, Reveal } from '../components/Reveal'
import { DESTACADOS, type Destacado } from '../data/destacados'
import { useEsEscritorio } from '../hooks/useMediaQuery'

function Ficha({ plato, className }: { plato: Destacado; className?: string }) {
  return (
    <article className={className}>
      <div className="mb-5 flex items-baseline justify-between gap-4 border-b border-cal/12 pb-3">
        <span className="label numeral text-cal/35">{plato.indice}</span>
        <span className="label text-rescoldo">{plato.tecnica}</span>
      </div>

      <Figura
        imagen={plato.imagen}
        profundidad={0.05}
        className="h-[42vh] max-h-[480px] min-h-[240px] w-full"
      />

      <div className="mt-6">
        <p className="label text-cal/35">{plato.seccion}</p>
        <h3 className="type-title mt-2.5">{plato.nombre}</h3>
        <p className="type-body mt-4 text-cal/55">{plato.descripcion}</p>
        <p className="numeral mt-6 text-cal/70">{plato.precio}</p>
      </div>
    </article>
  )
}

function Portada() {
  return (
    <div className="flex w-[78vw] shrink-0 flex-col justify-center sm:w-[46vw] lg:w-[30vw]">
      <Etiqueta capitulo="III" className="text-cal/60">
        Los platos
      </Etiqueta>
      <h2 className="type-display mt-7 max-w-[12ch]">
        <LineasReveal lineas={['Tres platos', 'que explican', 'la casa']} />
      </h2>
      <p className="type-body mt-7 max-w-[34ch] text-cal/55">
        Uno que nunca ve la llama, uno que pasa seis horas frente a ella y uno que la toca
        noventa segundos. Entre los tres está todo lo que sabemos hacer.
      </p>
      <p className="label mt-10 flex items-center gap-3 text-cal/30">
        Seguí bajando <span aria-hidden>→</span>
      </p>
    </div>
  )
}

/**
 * Capítulo III — el cambio de eje.
 *
 * En escritorio el scroll vertical mueve la fila en horizontal: rompe la
 * monotonía justo en la mitad del sitio y es el plano que mejor funciona en
 * video. En touch ese gesto se siente mal, así que ahí es un carrusel con
 * snap que se maneja con el dedo. Son dos interacciones distintas a propósito.
 */
export function Platos() {
  const escritorio = useEsEscritorio()
  const reducido = useReducedMotion()

  if (!escritorio || reducido) return <PlatosCarrusel />
  return <PlatosHorizontal />
}

function PlatosHorizontal() {
  const seccionRef = useRef<HTMLElement>(null)
  const pistaRef = useRef<HTMLDivElement>(null)
  const [distancia, setDistancia] = useState(0)
  const [alturaVentana, setAlturaVentana] = useState(0)

  useEffect(() => {
    const medir = () => {
      const pista = pistaRef.current
      if (!pista) return
      setDistancia(Math.max(0, pista.scrollWidth - window.innerWidth))
      setAlturaVentana(window.innerHeight)
    }
    medir()
    const observador = new ResizeObserver(medir)
    if (pistaRef.current) observador.observe(pistaRef.current)
    window.addEventListener('resize', medir)
    return () => {
      observador.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: seccionRef,
    offset: ['start start', 'end end'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, -distancia])

  return (
    <section
      ref={seccionRef}
      id="platos"
      data-tema="oscuro"
      className="relative bg-humo text-cal"
      style={{ height: alturaVentana ? distancia + alturaVentana : undefined }}
    >
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        <motion.div ref={pistaRef} style={{ x }} className="flex gap-12 px-8 lg:gap-16 lg:px-20 xl:px-24">
          <Portada />
          {DESTACADOS.map((plato) => (
            <Ficha key={plato.indice} plato={plato} className="w-[30vw] shrink-0 max-w-[420px]" />
          ))}
          <div className="w-8 shrink-0" aria-hidden />
        </motion.div>
      </div>
    </section>
  )
}

function PlatosCarrusel() {
  return (
    <section id="platos" data-tema="oscuro" className="bg-humo py-chapter text-cal">
      <div className="px-5 md:px-8">
        <Etiqueta capitulo="III" className="text-cal/60">
          Los platos
        </Etiqueta>
        <h2 className="type-display mt-6 max-w-[12ch]">
          <LineasReveal lineas={['Tres platos', 'que explican', 'la casa']} />
        </h2>
        <p className="type-body mt-6 max-w-[38ch] text-cal/55">
          Uno que nunca ve la llama, uno que pasa seis horas frente a ella y uno que la toca
          noventa segundos.
        </p>
      </div>

      <div
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 px-5 pb-4 [scrollbar-width:none] md:scroll-pl-8 md:px-8 [&::-webkit-scrollbar]:hidden"
        aria-label="Platos destacados"
      >
        {DESTACADOS.map((plato) => (
          <Reveal key={plato.indice} as="div" className="w-[80vw] shrink-0 snap-start md:w-[46vw]">
            <Ficha plato={plato} />
          </Reveal>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>
    </section>
  )
}
