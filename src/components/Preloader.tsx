import { motion } from 'motion/react'
import { SITE, CONTACTO } from '../data/site'

/**
 * Nadie quiere esperar. Esto dura poco más de un segundo y existe por dos
 * razones: tapa el salto tipográfico mientras cargan las fuentes, y le da al
 * hero un punto de partida en negro para su propia entrada.
 */
export function Preloader() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-humo text-cal"
      initial={{ y: 0 }}
      exit={{ y: '-101%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.p
        className="label mb-6 text-cal/45"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
      >
        {CONTACTO.localidad} — {CONTACTO.departamento.split(',')[0]}
      </motion.p>

      <div className="overflow-hidden">
        <motion.h1
          className="type-display px-6 text-center"
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          {SITE.nombre}
        </motion.h1>
      </div>

      <div className="mt-8 h-px w-40 overflow-hidden bg-cal/15 md:w-56">
        <motion.div
          className="h-full w-full origin-left bg-rescoldo"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.15, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </motion.div>
  )
}
