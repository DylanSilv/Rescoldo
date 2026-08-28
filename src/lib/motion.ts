import type { Variants } from 'motion/react'

/**
 * Una sola curva para todo el sitio.
 * Sale rápido y frena largo: se siente decidido, nunca rebota.
 */
export const EASE = [0.16, 1, 0.3, 1] as const

export const DUR = {
  rapido: 0.45,
  medio: 0.7,
  lento: 0.95,
} as const

/** Entrada estándar: 24px hacia arriba y opacidad. */
export const subir: Variants = {
  oculto: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.lento, ease: EASE },
  },
}

/** Contenedor que escalona a sus hijos. */
export const escalonar = (retraso = 0.08, inicial = 0): Variants => ({
  oculto: {},
  visible: {
    transition: { staggerChildren: retraso, delayChildren: inicial },
  },
})

/** Línea de texto que sube desde detrás de una máscara. */
export const linea: Variants = {
  oculto: { y: '110%' },
  visible: {
    y: '0%',
    transition: { duration: 1, ease: EASE },
  },
}

/** Regla horizontal que se dibuja. */
export const regla: Variants = {
  oculto: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.1, ease: EASE },
  },
}

/** Cuándo se dispara una entrada: bien entrada en pantalla, una sola vez. */
export const VIEWPORT = { once: true, margin: '-12% 0px -12% 0px' } as const
