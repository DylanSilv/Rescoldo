import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import type { Img } from '../data/images'
import { cn } from '../lib/cn'

interface FiguraProps {
  imagen: Img
  className?: string
  /** Cuánto se despega la imagen del scroll. 0 = quieta. Nunca más de 0.18. */
  profundidad?: number
  epigrafe?: string
  prioridad?: boolean
  /** Punto de interés del recorte, en sintaxis de `object-position`. */
  foco?: string
  sizes?: string
}

/**
 * Toda foto del sitio pasa por acá.
 *
 * Se ocupa de tres cosas: el parallax (muy leve, distinto por pieza para
 * romper la grilla), la aparición al cargar, y el revelado común que hace
 * que fotos de origen distinto parezcan del mismo fotógrafo.
 */
export function Figura({
  imagen,
  className,
  profundidad = 0,
  epigrafe,
  prioridad = false,
  foco,
  sizes,
}: FiguraProps) {
  const ref = useRef<HTMLElement>(null)
  const reducido = useReducedMotion()
  const [cargada, setCargada] = useState(false)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const desplazamiento = reducido ? 0 : profundidad * 100
  const y = useTransform(scrollYProgress, [0, 1], [`${-desplazamiento}%`, `${desplazamiento}%`])

  return (
    <figure ref={ref} className={cn('photo', className)}>
      <motion.div className="absolute inset-[-10%]" style={{ y }}>
        <motion.img
          src={imagen.src}
          alt={imagen.alt}
          loading={prioridad ? 'eager' : 'lazy'}
          decoding="async"
          fetchPriority={prioridad ? 'high' : 'auto'}
          sizes={sizes}
          style={foco ? { objectPosition: foco } : undefined}
          onLoad={() => setCargada(true)}
          initial={false}
          animate={{ opacity: cargada ? 1 : 0, scale: cargada ? 1 : 1.05 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-full w-full object-cover"
        />
      </motion.div>

      {epigrafe && (
        <figcaption className="label absolute bottom-4 left-4 z-10 text-cal/70 md:bottom-5 md:left-5">
          {epigrafe}
        </figcaption>
      )}
    </figure>
  )
}
