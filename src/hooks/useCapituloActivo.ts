import { useEffect, useState } from 'react'
import { CAPITULOS } from '../data/site'

/** Marca en qué capítulo está el lector, para la barra lateral y la nav. */
export function useCapituloActivo(): string {
  const [activo, setActivo] = useState(CAPITULOS[0].id)

  useEffect(() => {
    const secciones = CAPITULOS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (secciones.length === 0) return

    const observador = new IntersectionObserver(
      (entradas) => {
        const visible = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActivo(visible.target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    secciones.forEach((s) => observador.observe(s))
    return () => observador.disconnect()
  }, [])

  return activo
}
