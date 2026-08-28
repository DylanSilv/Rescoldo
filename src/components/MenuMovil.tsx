import { AnimatePresence, motion } from 'motion/react'
import { CAPITULOS, CONTACTO, SITE } from '../data/site'
import { IMG } from '../data/images'
import { irA } from '../lib/scroll'

/**
 * Menú mobile a pantalla completa.
 * No es la nav de escritorio apilada: acá los capítulos son el contenido
 * principal, en tipografía display, sobre una foto de la casa.
 */
export function MenuMovil({ abierto, cerrar }: { abierto: boolean; cerrar: () => void }) {
  const ir = (id: string) => {
    cerrar()
    // deja terminar la transición de salida antes de mover el scroll
    window.setTimeout(() => irA(id), 420)
  }

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          className="fixed inset-0 z-[80] flex flex-col bg-humo text-cal md:hidden"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <img
            src={IMG.comedor.src}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover opacity-25 [filter:contrast(1.1)_saturate(0.5)_brightness(0.6)]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-humo/70 via-humo/50 to-humo" />

          <div className="relative flex h-16 shrink-0 items-center justify-between px-5">
            <span className="label text-cal/60">{SITE.nombre}</span>
            <button onClick={cerrar} aria-label="Cerrar menú" className="label -mr-2 p-2 text-cal">
              Cerrar
            </button>
          </div>

          <nav className="relative flex flex-1 flex-col justify-center px-5">
            <ul>
              {CAPITULOS.map((c, i) => (
                <motion.li
                  key={c.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + i * 0.055, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-cal/10"
                >
                  <button
                    onClick={() => ir(c.id)}
                    className="flex w-full items-baseline gap-4 py-3.5 text-left"
                  >
                    <span className="label w-7 shrink-0 text-cal/35">{c.capitulo}</span>
                    <span className="type-title">{c.label}</span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="relative shrink-0 space-y-1 px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-cal/60"
          >
            <p className="label">{CONTACTO.calle}</p>
            <p className="label">{CONTACTO.telefono}</p>
            <p className="label text-rescoldo">{CONTACTO.instagram}</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
