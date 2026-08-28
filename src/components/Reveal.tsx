import type { ReactNode } from 'react'
import { motion } from 'motion/react'
import { subir, escalonar, VIEWPORT } from '../lib/motion'
import { cn } from '../lib/cn'

interface RevealProps {
  children: ReactNode
  className?: string
  /** Retraso propio, para escalonar bloques hermanos a mano. */
  retraso?: number
  as?: 'div' | 'section' | 'li' | 'article' | 'header' | 'figure'
}

/** Entrada estándar de cualquier bloque: 24px y opacidad, una sola vez. */
export function Reveal({ children, className, retraso = 0, as = 'div' }: RevealProps) {
  const Etiqueta = motion[as]
  return (
    <Etiqueta
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={subir}
      transition={{ delay: retraso }}
    >
      {children}
    </Etiqueta>
  )
}

interface GrupoProps {
  children: ReactNode
  className?: string
  paso?: number
  inicial?: number
}

/** Contenedor que escalona a sus hijos `<Reveal.Item>`. */
export function RevealGrupo({ children, className, paso = 0.08, inicial = 0 }: GrupoProps) {
  return (
    <motion.div
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={escalonar(paso, inicial)}
    >
      {children}
    </motion.div>
  )
}

export function RevealItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={subir}>
      {children}
    </motion.div>
  )
}

/**
 * Texto que sube desde detrás de una máscara, línea por línea.
 * Las líneas se pasan a mano: el corte tipográfico es una decisión de
 * diseño, no algo que convenga dejar librado al ancho del contenedor.
 */
export function LineasReveal({
  lineas,
  className,
  retraso = 0,
  paso = 0.09,
}: {
  lineas: string[]
  className?: string
  retraso?: number
  paso?: number
}) {
  return (
    <motion.span
      className={cn('block', className)}
      initial="oculto"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={escalonar(paso, retraso)}
    >
      {lineas.map((texto) => (
        // el padding extra deja pasar las colas de las g y las y
        <span key={texto} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span
            className="block"
            variants={{
              oculto: { y: '112%' },
              visible: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
            }}
          >
            {texto}
          </motion.span>
        </span>
      ))}
    </motion.span>
  )
}

/** Regla horizontal que se dibuja de izquierda a derecha al entrar. */
export function Regla({ className }: { className?: string }) {
  return (
    <motion.div
      className={cn('h-px w-full origin-left bg-current opacity-20', className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    />
  )
}

export interface Segmento {
  texto: string
  /** Se compone en itálica: una sola palabra o frase por bloque. */
  enfasis?: boolean
}

/**
 * Aparición palabra por palabra.
 * Se reserva para el manifiesto: en un párrafo largo cansa, en cuarenta
 * palabras obliga a leer despacio, que es justo lo que queremos ahí.
 */
export function PalabrasReveal({
  segmentos,
  className,
  paso = 0.022,
}: {
  segmentos: Segmento[]
  className?: string
  paso?: number
}) {
  let indice = 0

  return (
    <motion.p
      className={className}
      initial="oculto"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={escalonar(paso)}
    >
      {segmentos.map((segmento, s) => (
        <span key={s} className={segmento.enfasis ? 'italic text-rescoldo' : undefined}>
          {segmento.texto.split(' ').map((palabra) => (
            <motion.span
              key={`${s}-${indice++}`}
              className="inline-block"
              variants={{
                oculto: { opacity: 0, y: '0.32em' },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {palabra}
              {' '}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.p>
  )
}
