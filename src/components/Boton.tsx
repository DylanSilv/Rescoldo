import type { ReactNode } from 'react'
import { cn } from '../lib/cn'

interface BotonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  type?: 'button' | 'submit'
  /** `solido` se usa una sola vez por pantalla. El resto es `linea`. */
  variante?: 'solido' | 'linea'
  /** Sobre capítulos oscuros el sólido se invierte, o desaparece contra el fondo. */
  tono?: 'oscuro' | 'claro'
  className?: string
  disabled?: boolean
}

/**
 * Dos botones en todo el sitio.
 * El sólido se rellena desde abajo; el de línea dibuja su propia regla.
 */
export function Boton({
  children,
  onClick,
  href,
  type = 'button',
  variante = 'linea',
  tono = 'oscuro',
  className,
  disabled,
}: BotonProps) {
  const base = 'label group relative inline-flex items-center gap-3 transition-colors duration-500'

  const estilos =
    variante === 'solido'
      ? cn(
          base,
          'overflow-hidden px-7 py-4 disabled:opacity-40',
          tono === 'claro' ? 'bg-cal text-humo hover:text-cal' : 'bg-humo text-cal',
          'before:absolute before:inset-0 before:origin-bottom before:scale-y-0 before:bg-rescoldo',
          'before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)]',
          'hover:before:scale-y-100 focus-visible:before:scale-y-100',
        )
      : cn(base, 'link-rule hover:text-rescoldo')

  const contenido = (
    <>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className="relative z-10 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
      >
        ↗
      </span>
    </>
  )

  if (href) {
    return (
      <a href={href} className={cn(estilos, className)}>
        {contenido}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cn(estilos, className)}>
      {contenido}
    </button>
  )
}
