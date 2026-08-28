import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { cn } from '../lib/cn'

/**
 * El fuego del sitio no es una foto: está dibujado.
 *
 * Ninguna imagen de stock de llamas transmitía la idea de la marca —el calor
 * que queda cuando el fuego ya se apagó— y todas se reconocían al instante
 * como banco de imágenes. Esto son cuarenta y ocho brasas subiendo despacio
 * sobre un rescoldo que respira. Cuesta menos de 3 kB y no se parece a nada.
 */
export function CampoDeBrasas({
  className,
  cantidad = 48,
  intensidad = 1,
}: {
  className?: string
  /** Más brasas para los tramos donde el fuego es el protagonista. */
  cantidad?: number
  intensidad?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reducido = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let ancho = 0
    let alto = 0

    const medir = () => {
      const caja = canvas.getBoundingClientRect()
      ancho = caja.width
      alto = caja.height
      canvas.width = Math.round(ancho * dpr)
      canvas.height = Math.round(alto * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    medir()
    const observador = new ResizeObserver(medir)
    observador.observe(canvas)

    const azar = (min: number, max: number) => min + Math.random() * (max - min)

    interface Brasa {
      x: number
      y: number
      r: number
      vy: number
      vx: number
      alfa: number
      fase: number
    }

    // coordenadas normalizadas: el redimensionado no altera la composición
    const nacer = (repartida: boolean): Brasa => ({
      x: azar(0.04, 0.96),
      y: repartida ? azar(0, 1) : azar(1.02, 1.3),
      r: azar(0.5, 2.3),
      vy: azar(0.00016, 0.00062),
      vx: azar(-0.00009, 0.00009),
      alfa: azar(0.2, 0.85),
      fase: azar(0, Math.PI * 2),
    })

    const brasas = Array.from({ length: cantidad }, () => nacer(true))

    let cuadro = 0
    let t = 0
    let activo = true

    const visible = new IntersectionObserver(
      ([entrada]) => {
        activo = entrada.isIntersecting
        if (activo && !reducido && !cuadro) cuadro = requestAnimationFrame(dibujar)
      },
      { threshold: 0 },
    )
    visible.observe(canvas)

    function dibujar() {
      if (!ctx) return
      t += 0.006
      ctx.clearRect(0, 0, ancho, alto)

      // el rescoldo de abajo: respira muy despacio
      const respiro = 0.5 + Math.sin(t * 0.9) * 0.5
      const brillo = ctx.createRadialGradient(
        ancho * 0.5,
        alto * 1.02,
        0,
        ancho * 0.5,
        alto * 1.02,
        Math.max(ancho, alto) * 0.85,
      )
      brillo.addColorStop(0, `rgba(191, 75, 33, ${(0.26 + respiro * 0.12) * intensidad})`)
      brillo.addColorStop(0.45, 'rgba(150, 52, 20, 0.07)')
      brillo.addColorStop(1, 'rgba(20, 17, 15, 0)')
      ctx.fillStyle = brillo
      ctx.fillRect(0, 0, ancho, alto)

      ctx.globalCompositeOperation = 'lighter'
      for (const b of brasas) {
        if (!reducido) {
          b.y -= b.vy
          b.x += b.vx + Math.sin(t * 1.6 + b.fase) * 0.00022
          if (b.y < -0.04) Object.assign(b, nacer(false))
        }

        const px = b.x * ancho
        const py = b.y * alto
        // se apagan a medida que suben
        const vida = Math.max(0, Math.min(1, b.y))
        const parpadeo = 0.55 + Math.sin(t * 3.1 + b.fase) * 0.45
        const a = b.alfa * vida * parpadeo

        const halo = ctx.createRadialGradient(px, py, 0, px, py, b.r * 9)
        halo.addColorStop(0, `rgba(255, 176, 108, ${a * 0.55})`)
        halo.addColorStop(0.35, `rgba(191, 75, 33, ${a * 0.22})`)
        halo.addColorStop(1, 'rgba(191, 75, 33, 0)')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(px, py, b.r * 9, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255, 214, 170, ${a})`
        ctx.beginPath()
        ctx.arc(px, py, b.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalCompositeOperation = 'source-over'

      cuadro = reducido || !activo ? 0 : requestAnimationFrame(dibujar)
    }

    dibujar()

    return () => {
      if (cuadro) cancelAnimationFrame(cuadro)
      observador.disconnect()
      visible.disconnect()
    }
  }, [reducido, cantidad, intensidad])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn('pointer-events-none absolute inset-0 h-full w-full', className)}
    />
  )
}
