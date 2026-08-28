import { cn } from '../lib/cn'

/**
 * La capa técnica de la marca: numeración de capítulo, secciones, horarios.
 * Mono en versalitas con tracking amplio. Es lo que le da el aire de estudio.
 */
export function Etiqueta({
  capitulo,
  children,
  className,
}: {
  capitulo?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <p className={cn('label flex items-center gap-3', className)}>
      {capitulo && (
        <>
          <span className="opacity-45">Cap. {capitulo}</span>
          <span aria-hidden className="h-px w-6 bg-current opacity-30" />
        </>
      )}
      <span>{children}</span>
    </p>
  )
}
