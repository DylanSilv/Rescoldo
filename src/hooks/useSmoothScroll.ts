import { useEffect } from 'react'
import { useReducedMotion } from 'motion/react'
import { crearLenis } from '../lib/scroll'

/**
 * Scroll suave global. Es lo que le da el tacto al sitio.
 * Se desactiva por completo con `prefers-reduced-motion`.
 */
export function useSmoothScroll(): void {
  const reducido = useReducedMotion()

  useEffect(() => {
    if (reducido) return
    return crearLenis()
  }, [reducido])
}
