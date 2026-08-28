import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { Figura } from '../components/Figura'
import { LineasReveal } from '../components/Reveal'
import { Boton } from '../components/Boton'
import { IMG } from '../data/images'
import { SITE, CONTACTO } from '../data/site'
import { useFireClock } from '../hooks/useFireClock'
import { irA } from '../lib/scroll'

/**
 * Primera impresión.
 *
 * El titular es la frase de marca, no el nombre: dice de qué se trata la casa
 * en siete palabras, y el nombre ya está en la barra superior. Arriba a la
 * derecha corre el reloj del fuego, que lee la hora real del visitante — es
 * el detalle que hace que alguien mire la pantalla dos veces.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reducido = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const opacidad = useTransform(scrollYProgress, [0, 0.75], [1, reducido ? 1 : 0])
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reducido ? '0%' : '14%'])

  const fuego = useFireClock()

  return (
    <section
      ref={ref}
      id="hero"
      data-tema="oscuro"
      className="relative flex h-[100svh] min-h-[620px] flex-col justify-end overflow-hidden bg-humo text-cal"
    >
      <Figura
        imagen={IMG.mesa}
        prioridad
        profundidad={0.07}
        foco="52% 48%"
        className="absolute inset-0 h-full w-full"
        sizes="100vw"
      />
      {/*
        Velo direccional en vez de uniforme: cierra el lado izquierdo, donde
        va el titular, y deja respirar el derecho, donde está el sujeto de la
        foto. Un velo parejo tapaba la imagen entera.
      */}
      <div
        aria-hidden
        className="velo-lateral absolute inset-0"
      />
      <div
        aria-hidden
        className="velo-vertical absolute inset-0"
      />

      {/* Reloj del fuego */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute right-5 top-20 z-10 text-right md:right-8 md:top-28 lg:right-12"
      >
        <p className="label hidden items-center justify-end gap-2.5 text-cal/45 md:flex">
          <span className="numeral">{String(SITE.horaDeEncendido).padStart(2, '0')}:00</span>
          <span>Fuego encendido</span>
        </p>
        <p className="label flex items-center justify-end gap-2.5 text-cal/80 md:mt-2">
          <span className="numeral">{fuego.hora}</span>
          <span className="text-rescoldo md:hidden">{fuego.estadoCorto}</span>
          <span className="hidden text-rescoldo md:inline">{fuego.estado}</span>
        </p>
        <p className="label mt-1.5 hidden text-cal/35 md:block">{fuego.transcurrido}</p>
      </motion.div>

      <motion.div
        style={{ opacity: opacidad, y }}
        className="relative z-10 px-5 pb-8 md:px-8 md:pb-10 lg:px-20 xl:px-24"
      >
        <h1 className="type-hero">
          <LineasReveal lineas={['El fuego se apaga.']} retraso={1.15} />
          <span className="block italic text-rescoldo">
            <LineasReveal lineas={['La cocina empieza.']} retraso={1.42} />
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col gap-7 md:mt-12 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <p className="type-body max-w-sm text-cal/65">{SITE.bajada}</p>

          <div className="flex items-center gap-7">
            <Boton variante="solido" tono="claro" onClick={() => irA('reservas')}>
              Reservar mesa
            </Boton>
            <button onClick={() => irA('carta')} className="label link-rule hidden text-cal/70 sm:block">
              Ver la carta
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Pie del hero: marca, lugar y señal de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="relative z-10 mt-8 flex items-center justify-between gap-4 border-t border-cal/12 px-5 py-4 md:px-8 lg:px-20 xl:px-24"
      >
        <p className="label text-cal/45">
          {CONTACTO.localidad} · {CONTACTO.departamento.split(',')[0]}
        </p>
        <p className="label hidden text-cal/30 md:block numeral">{CONTACTO.coordenadas}</p>
        <button
          onClick={() => irA('manifiesto')}
          className="label group flex items-center gap-3 text-cal/45 transition-colors duration-500 hover:text-cal"
        >
          Seguir
          <span aria-hidden className="relative block h-5 w-px overflow-hidden bg-cal/20">
            <motion.span
              className="absolute inset-x-0 top-0 block h-2 bg-rescoldo"
              animate={reducido ? {} : { y: ['-100%', '250%'] }}
              transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </button>
      </motion.div>
    </section>
  )
}
