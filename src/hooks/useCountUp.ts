import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

/**
 * Cuenta hacia el valor final cuando el número entra en pantalla.
 * Sin librería: son treinta líneas y evita un `animate` de más en el bundle.
 */
export function useCountUp(destino: number, duracion = 1500) {
  const ref = useRef<HTMLSpanElement>(null)
  const visible = useInView(ref, { once: true, margin: '-15% 0px' })
  const reducido = useReducedMotion()
  const [valor, setValor] = useState(0)

  useEffect(() => {
    if (!visible) return
    // sin movimiento, sin animación — y si la pestaña está en segundo plano
    // el rAF no corre: mejor mostrar el número final que un cero.
    if (reducido || destino === 0 || document.hidden) {
      setValor(destino)
      return
    }

    let frame = 0
    const inicio = performance.now()
    const tick = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / duracion)
      // misma curva que el resto del sitio: frena largo
      const eased = 1 - Math.pow(1 - t, 4)
      setValor(Math.round(destino * eased))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [visible, destino, duracion, reducido])

  return { ref, valor }
}
