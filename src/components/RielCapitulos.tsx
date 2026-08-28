import { CAPITULOS } from '../data/site'
import { irA } from '../lib/scroll'
import { cn } from '../lib/cn'

/**
 * La numeración de capítulos, fija al costado.
 *
 * Va en `mix-blend-difference`: se invierte sola contra el fondo, así que
 * se lee igual sobre los capítulos claros que sobre los oscuros sin tener
 * que saber cuál está debajo.
 */
export function RielCapitulos({ activo }: { activo: string }) {
  return (
    <nav
      aria-label="Capítulos"
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 mix-blend-difference lg:block xl:left-8"
    >
      <ul className="flex flex-col gap-4">
        {CAPITULOS.map((c) => {
          const esActivo = activo === c.id
          return (
            <li key={c.id}>
              <button
                onClick={() => irA(c.id)}
                aria-current={esActivo ? 'true' : undefined}
                className="group flex items-center gap-3 text-cal"
              >
                <span
                  className={cn(
                    'label w-6 text-left transition-opacity duration-500',
                    esActivo ? 'opacity-100' : 'opacity-35 group-hover:opacity-70',
                  )}
                >
                  {c.capitulo}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    'h-px origin-left bg-cal transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
                    esActivo ? 'w-8 opacity-100' : 'w-3 opacity-30 group-hover:w-5',
                  )}
                />
                <span
                  className={cn(
                    'label whitespace-nowrap text-cal transition-all duration-500',
                    // solo al pasar el mouse: si estuviera siempre visible,
                    // el capítulo activo chocaría con los titulares grandes
                    '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-70',
                  )}
                >
                  {c.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
