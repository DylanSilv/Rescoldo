import { useState } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react'
import { NAV, SITE } from '../data/site'
import { irA } from '../lib/scroll'
import { cn } from '../lib/cn'

/**
 * Transparente sobre el hero, sólida a partir del primer capítulo.
 * La línea de progreso de 1px al pie es el único indicador de avance
 * que necesita un sitio de esta longitud.
 */
export function Nav({
  activo,
  abrirMenu,
  menuAbierto,
}: {
  activo: string
  abrirMenu: () => void
  menuAbierto: boolean
}) {
  const [compacta, setCompacta] = useState(false)
  const { scrollY, scrollYProgress } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const umbral = window.innerHeight * 0.82
    setCompacta(v > umbral)
  })

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
      className={cn(
        'fixed inset-x-0 top-0 z-[70] transition-colors duration-700',
        compacta ? 'bg-ceniza/92 text-humo backdrop-blur-md' : 'text-cal',
      )}
    >
      <div className="flex h-16 items-center justify-between px-5 md:h-20 md:px-8 lg:px-20 xl:px-24">
        <button
          onClick={() => irA('hero')}
          className="type-title leading-none tracking-tight transition-opacity duration-300 hover:opacity-60"
          aria-label={`${SITE.nombre} — volver al inicio`}
        >
          {SITE.nombre}
        </button>

        <nav aria-label="Principal" className="hidden items-center gap-9 md:flex">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => irA(item.id)}
              className={cn(
                'label link-rule transition-opacity duration-400',
                activo === item.id ? 'opacity-100' : 'opacity-55 hover:opacity-100',
              )}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => irA('reservas')}
            className="label link-rule text-rescoldo"
          >
            Reservar
          </button>
        </nav>

        {/* Disparador del menú mobile: dos líneas que se separan al tocar */}
        <button
          onClick={abrirMenu}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          className="group -mr-2 flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
        >
          <span className="h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-px" />
          <span className="h-px w-6 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-px" />
        </button>
      </div>

      <AnimatePresence>
        {compacta && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-x-0 bottom-0 h-px bg-humo/10"
          >
            <motion.div
              style={{ scaleX: scrollYProgress }}
              className="h-full w-full origin-left bg-rescoldo"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
