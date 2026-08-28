import { useState } from 'react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react'
import { irA } from '../lib/scroll'
import { MENU_DEGUSTACION } from '../data/menu'

/**
 * En un celular hay una sola acción que importa.
 * Aparece recién pasado el hero y desaparece al llegar al formulario,
 * para no taparlo justo cuando se está usando.
 */
export function BarraMovil() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (v) => {
    const reservas = document.getElementById('reservas')
    const limite = reservas ? reservas.offsetTop - window.innerHeight * 0.5 : Infinity
    setVisible(v > window.innerHeight * 0.9 && v < limite)
  })

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          exit={{ y: '110%' }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[65] md:hidden"
        >
          <button
            onClick={() => irA('reservas')}
            className="flex w-full items-center justify-between bg-humo px-5 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-4 text-cal"
          >
            <span className="label text-cal/50">
              {MENU_DEGUSTACION.pasos} pasos · {MENU_DEGUSTACION.precio}
            </span>
            <span className="label flex items-center gap-2 text-rescoldo">
              Reservar mesa <span aria-hidden>↗</span>
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
