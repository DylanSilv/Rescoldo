import Lenis from 'lenis'

let lenis: Lenis | null = null

export function crearLenis(): () => void {
  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.6,
  })

  let frame = 0
  const raf = (time: number) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

/** Navega a una sección. Funciona con o sin scroll suave activo. */
export function irA(id: string): void {
  const destino = document.getElementById(id)
  if (!destino) return

  if (lenis) {
    lenis.scrollTo(destino, { offset: 0, duration: 1.4 })
  } else {
    destino.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

/** Congela el scroll mientras hay una capa abierta encima. */
export function bloquearScroll(bloquear: boolean): void {
  if (bloquear) lenis?.stop()
  else lenis?.start()
  document.body.style.overflow = bloquear ? 'hidden' : ''
}
