import { useEffect, useState } from 'react'

export function useMediaQuery(query: string): boolean {
  const [coincide, setCoincide] = useState(() =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches,
  )

  useEffect(() => {
    const mql = window.matchMedia(query)
    const alCambiar = () => setCoincide(mql.matches)
    alCambiar()
    mql.addEventListener('change', alCambiar)
    return () => mql.removeEventListener('change', alCambiar)
  }, [query])

  return coincide
}

/** El halo del cursor y el parallax solo tienen sentido con puntero fino. */
export const useEsEscritorio = () => useMediaQuery('(min-width: 1024px) and (pointer: fine)')
