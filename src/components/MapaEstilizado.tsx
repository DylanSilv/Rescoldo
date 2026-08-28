import { motion, useReducedMotion } from 'motion/react'

/**
 * Mapa dibujado a mano en SVG.
 *
 * Un iframe de Google Maps traería su propia paleta, su propia tipografía y
 * un logo ajeno justo en el cierre del sitio. Esto dice lo mismo —dónde
 * queda, contra qué referencias— sin romper la dirección de arte.
 */
export function MapaEstilizado() {
  const reducido = useReducedMotion()

  return (
    <svg
      viewBox="0 0 640 460"
      className="h-full w-full"
      role="img"
      aria-label="Mapa esquemático de la ubicación en Juanicó, Canelones, sobre el Camino de los Zorzales"
    >
      <rect width="640" height="460" fill="#1A1613" />

      {/* manzanas */}
      <g fill="#F2EFE9" opacity="0.035">
        <rect x="40" y="60" width="150" height="110" />
        <rect x="215" y="60" width="190" height="110" />
        <rect x="430" y="30" width="170" height="140" />
        <rect x="40" y="196" width="150" height="130" />
        <rect x="215" y="196" width="190" height="130" />
        <rect x="40" y="352" width="150" height="90" />
        <rect x="215" y="352" width="190" height="90" />
        <rect x="430" y="352" width="170" height="90" />
      </g>

      {/* plaza */}
      <rect x="430" y="196" width="170" height="130" fill="#BF4B21" opacity="0.07" />
      <text x="448" y="232" className="numeral" fontSize="9" fill="#F2EFE9" opacity="0.35" letterSpacing="1.6">
        ESTACIÓN JUANICÓ
      </text>

      {/* calles */}
      <g stroke="#F2EFE9" strokeOpacity="0.16" strokeWidth="1">
        <line x1="0" y1="183" x2="640" y2="183" />
        <line x1="0" y1="339" x2="640" y2="339" />
        <line x1="202" y1="0" x2="202" y2="460" />
        <line x1="417" y1="0" x2="417" y2="460" />
      </g>

      {/* ruta principal, en diagonal */}
      <line x1="-20" y1="440" x2="660" y2="20" stroke="#F2EFE9" strokeOpacity="0.3" strokeWidth="3" />
      <text
        x="60" y="404" fontSize="9" fill="#F2EFE9" opacity="0.4" letterSpacing="2.4"
        transform="rotate(-31.7 60 404)"
      >
        RUTA 5
      </text>

      {/* el callejón */}
      <line x1="202" y1="262" x2="417" y2="262" stroke="#BF4B21" strokeOpacity="0.85" strokeWidth="2" />
      <text x="214" y="252" fontSize="9" fill="#BF4B21" letterSpacing="1.8">
        CAMINO DE LOS ZORZALES
      </text>

      {/* marcador */}
      <g>
        {!reducido && (
          <motion.circle
            cx="320" cy="262" r="10" fill="none" stroke="#BF4B21" strokeWidth="1"
            animate={{ r: [10, 34], opacity: [0.7, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
        <circle cx="320" cy="262" r="6.5" fill="#BF4B21" />
        <circle cx="320" cy="262" r="2.2" fill="#F2EFE9" />
      </g>

      <text x="320" y="292" fontSize="10" fill="#F2EFE9" opacity="0.85" letterSpacing="2" textAnchor="middle">
        RESCOLDO
      </text>

      <text x="24" y="440" fontSize="9" fill="#F2EFE9" opacity="0.28" letterSpacing="1.8">
        JUANICÓ · CANELONES · URUGUAY
      </text>
      <text x="616" y="440" fontSize="9" fill="#F2EFE9" opacity="0.28" letterSpacing="1.8" textAnchor="end">
        34°35′S 56°16′O
      </text>
    </svg>
  )
}
