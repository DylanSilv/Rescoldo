/** Identidad, contacto y navegación. Todo el contenido editable del sitio. */

export const SITE = {
  nombre: 'Rescoldo',
  claim: 'El fuego se apaga. La cocina empieza.',
  bajada:
    'Cocina de fuego lento en Juanicó, Canelones. Un fuego por día, treinta y cuatro cubiertos.',
  fundado: 2019,
  horaDeEncendido: 11,
} as const

export const CONTACTO = {
  calle: 'Camino de los Zorzales, km 2',
  localidad: 'Juanicó',
  departamento: 'Canelones, Uruguay',
  telefono: '+598 94 812 073',
  telefonoHref: 'tel:+59894812073',
  email: 'hola@rescoldo.uy',
  instagram: '@rescoldo.uy',
  instagramHref: 'https://instagram.com',
  coordenadas: '34°35′S 56°16′O',
} as const

export const HORARIOS = [
  { dias: 'Miércoles a domingo', franja: 'Cena', horas: '19:30 — 00:00' },
  { dias: 'Sábados y domingos', franja: 'Almuerzo', horas: '12:30 — 15:30' },
  { dias: 'Lunes y martes', franja: 'Cerrado', horas: 'El fuego descansa' },
] as const

export interface NavItem {
  /** Numeración editorial del capítulo. */
  capitulo: string
  label: string
  id: string
}

/** Las siete secciones, en el orden en que se leen. */
export const CAPITULOS: NavItem[] = [
  { capitulo: 'I', label: 'Manifiesto', id: 'manifiesto' },
  { capitulo: 'II', label: 'El fuego', id: 'fuego' },
  { capitulo: 'III', label: 'Los platos', id: 'platos' },
  { capitulo: 'IV', label: 'La carta', id: 'carta' },
  { capitulo: 'V', label: 'El espacio', id: 'espacio' },
  { capitulo: 'VI', label: 'Reservas', id: 'reservas' },
  { capitulo: 'VII', label: 'Cómo llegar', id: 'ubicacion' },
]

/** Subconjunto que aparece en la barra superior. */
export const NAV: NavItem[] = CAPITULOS.filter((c) =>
  ['manifiesto', 'fuego', 'carta', 'espacio'].includes(c.id),
)
