import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react'
import { useEsEscritorio } from '../hooks/useMediaQuery'

/**
 * Un halo cálido que sigue al puntero, como llevar una brasa en la mano.
 *
 * Solo tiene sentido sobre los capítulos oscuros: en `plus-lighter` sobre un
 * fondo claro deja una mancha lavada. Por eso el halo consulta el `data-tema`
 * de la sección que está debajo del cursor y se apaga al entrar en las claras.
 * Solo escritorio con puntero fino, y desactivado con movimiento reducido.
 */
export function HaloBrasa() {
  const escritorio = useEsEscritorio()
  const reducido = useReducedMotion()
  const activo = escritorio && !reducido

  const [sobreOscuro, setSobreOscuro] = useState(true)

  const x = useMotionValue(-500)
  const y = useMotionValue(-500)
  const sx = useSpring(x, { stiffness: 130, damping: 22, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 130, damping: 22, mass: 0.6 })

  useEffect(() => {
    if (!activo) return

    const mover = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)

      const debajo = document.elementFromPoint(e.clientX, e.clientY)
      const seccion = debajo?.closest('[data-tema]')
      setSobreOscuro(seccion?.getAttribute('data-tema') !== 'claro')
    }

    window.addEventListener('pointermove', mover, { passive: true })
    return () => window.removeEventListener('pointermove', mover)
  }, [activo, x, y])

  if (!activo) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 h-[420px] w-[420px] rounded-full"
      animate={{ opacity: sobreOscuro ? 1 : 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      style={{
        x: sx,
        y: sy,
        translateX: '-50%',
        translateY: '-50%',
        mixBlendMode: 'plus-lighter',
        background:
          'radial-gradient(circle, rgba(191,75,33,0.30) 0%, rgba(191,75,33,0.10) 38%, rgba(191,75,33,0) 68%)',
      }}
    />
  )
}
