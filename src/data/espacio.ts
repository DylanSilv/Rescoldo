import { IMG, type Img } from './images'

export interface PiezaGaleria {
  imagen: Img
  /** Multiplicador de parallax: distintas velocidades rompen la grilla. */
  profundidad: number
  epigrafe: string
}

/**
 * Composición asimétrica, no una grilla.
 * El orden y los tamaños se definen en la sección; acá solo vive el contenido.
 */
export const GALERIA: PiezaGaleria[] = [
  { imagen: IMG.salon, profundidad: 0.09, epigrafe: 'El salón, seis de la tarde' },
  { imagen: IMG.cocina, profundidad: 0.16, epigrafe: 'La barra, durante el servicio' },
  { imagen: IMG.bodega, profundidad: 0.05, epigrafe: 'Cuarenta etiquetas, todas de gente que conocemos' },
  { imagen: IMG.comedor, profundidad: 0.13, epigrafe: 'Miércoles, 21:40' },
  { imagen: IMG.copa, profundidad: 0.07, epigrafe: 'La barra, después de las once' },
]

export const ESPACIO_TEXTO = {
  titulo: 'Doce metros de fuego y treinta y cuatro sillas',
  cuerpo:
    'El salón era un galpón de esquila abandonado. Dejamos el ladrillo y la chapa como estaban —con las manchas de humedad incluidas— y les pusimos adentro una estructura de hierro negro y vidrio. La cocina no tiene puerta: es una barra que corre a lo largo de todo el galpón. Desde cualquier mesa se ve el fuego.',
} as const

export const DETALLES = [
  { titulo: 'Ladrillo de 1912', detalle: 'Las paredes originales del galpón, sin revocar.' },
  { titulo: 'Hierro, vidrio y pinotea', detalle: 'Lo único que sumamos. Nada pintado.' },
  { titulo: 'Barra de doce metros', detalle: 'Doce asientos mirando directo a la cocina.' },
  { titulo: 'Terraza bajo los eucaliptos', detalle: 'De noviembre a marzo, si no entra la sudestada.' },
] as const
