import { useEffect, useState } from 'react'
import { SITE } from '../data/site'

export interface EstadoDelFuego {
  hora: string
  estado: string
  /** Versión de una palabra, para el reloj en pantallas angostas. */
  estadoCorto: string
  transcurrido: string
}

/**
 * El fuego se enciende a las once y baja solo.
 * El reloj del hero lee la hora real del visitante y dice en qué punto de
 * esa curva está: es un detalle chico que hace que el lugar parezca vivo.
 */
function leer(ahora: Date): EstadoDelFuego {
  const hora = ahora.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const minutosDelDia = ahora.getHours() * 60 + ahora.getMinutes()
  const encendido = SITE.horaDeEncendido * 60

  let estado: string
  let estadoCorto: string
  if (minutosDelDia < encendido) {
    estado = 'Ceniza fría'
    estadoCorto = 'Ceniza'
  } else if (minutosDelDia < 15 * 60) {
    estado = 'Llama viva'
    estadoCorto = 'Llama'
  } else if (minutosDelDia < 19 * 60 + 30) {
    estado = 'Brasa'
    estadoCorto = 'Brasa'
  } else {
    estado = 'Rescoldo · en servicio'
    estadoCorto = 'Rescoldo'
  }

  const minutos = minutosDelDia - encendido
  const transcurrido =
    minutos < 0
      ? `enciende en ${Math.floor(-minutos / 60)} h ${String(-minutos % 60).padStart(2, '0')}`
      : `hace ${Math.floor(minutos / 60)} h ${String(minutos % 60).padStart(2, '0')}`

  return { hora, estado, estadoCorto, transcurrido }
}

export function useFireClock(): EstadoDelFuego {
  const [valor, setValor] = useState(() => leer(new Date()))

  useEffect(() => {
    const id = window.setInterval(() => {
      const siguiente = leer(new Date())
      setValor((previo) =>
          previo.hora === siguiente.hora && previo.estado === siguiente.estado ? previo : siguiente,
      )
    }, 5000)
    return () => window.clearInterval(id)
  }, [])

  return valor
}
