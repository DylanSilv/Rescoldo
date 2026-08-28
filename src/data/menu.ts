/**
 * La carta.
 *
 * Los precios van sin símbolo de moneda: es la convención de la alta cocina
 * y además evita que el proyecto quede desactualizado por la variación
 * cambiaria. El cambio de moneda se resuelve en la nota al pie.
 */

export interface Plato {
  nombre: string
  descripcion: string
  precio: string
  /** Marca los platos que también aparecen en la sección de destacados. */
  destacado?: boolean
}

export interface SeccionCarta {
  id: string
  titulo: string
  /** Una línea que explica la lógica de la sección, no un adorno. */
  nota: string
  platos: Plato[]
}

export const MENU_DEGUSTACION = {
  titulo: 'Menú del rescoldo',
  pasos: 7,
  precio: '68',
  descripcion:
    'Lo que el fuego permite ese día, en el orden en que el calor va bajando. Se sirve a la mesa completa hasta las 21:30.',
} as const

export const CARTA: SeccionCarta[] = [
  {
    id: 'abrir',
    titulo: 'Para abrir',
    nota: 'Lo primero que sale, mientras el fuego todavía está alto.',
    platos: [
      {
        nombre: 'Pan de sarmiento',
        descripcion:
          'Masa madre de trigo de Dolores, cocida directo sobre la piedra. Manteca ahumada y sal marina de Cabo Polonio.',
        precio: '6',
      },
      {
        nombre: 'Mollejas al rescoldo',
        descripcion: 'Crocantes por fuera, todavía tibias por dentro. Limón quemado y hoja de capuchina.',
        precio: '16',
      },
      {
        nombre: 'Zanahorias de invierno enterradas en ceniza',
        descripcion: 'Miel de espinillo y queso de cabra de Colonia Valdense.',
        precio: '12',
      },
      {
        nombre: 'Escabeche de la casa',
        descripcion: 'Hongos de pino de Aiguá, laurel y tres semanas de espera.',
        precio: '11',
      },
      {
        nombre: 'Tomate de Melilla, cuatro horas',
        descripcion: 'Aceite de oliva de Garzón y albahaca quemada.',
        precio: '13',
      },
    ],
  },
  {
    id: 'rescoldo',
    titulo: 'Del rescoldo',
    nota: 'Cocido enterrado en la ceniza. Ninguno de estos platos ve la llama.',
    platos: [
      {
        nombre: 'Remolachas en su propia ceniza',
        descripcion: 'Crema agria de oveja y amaranto tostado.',
        precio: '14',
      },
      {
        nombre: 'Papa criolla bajo brasa',
        descripcion: 'Yema curada y aceite de sarmiento.',
        precio: '13',
      },
      {
        nombre: 'Zapallo kabutiá entero',
        descripcion: 'Seis horas bajo ceniza. Miel de espinillo, labneh de cabra y sus propias pepitas.',
        precio: '15',
        destacado: true,
      },
      {
        nombre: 'Hongos de pino',
        descripcion: 'Caldo hecho con sus tallos, tomillo y pan quemado.',
        precio: '17',
      },
      {
        nombre: 'Puerros a la ceniza',
        descripcion: 'Nuez pecán del litoral y manteca dorada.',
        precio: '14',
      },
    ],
  },
  {
    id: 'fuego-alto',
    titulo: 'Fuego alto',
    nota: 'Se marcan sobre leña de vid, apenas queda brasa viva.',
    platos: [
      {
        nombre: 'Cordero pesado de Rocha a la cruz',
        descripcion: 'Seis horas abierto frente al fuego. Chimichurri de menta de la huerta y nada más.',
        precio: '32',
        destacado: true,
      },
      {
        nombre: 'Entrecot de novillo Hereford, 40 días',
        descripcion: 'De pastura, madurado en cámara propia. Puré de ajo negro y berro de arroyo.',
        precio: '34',
        destacado: true,
      },
      {
        nombre: 'Corvina negra de La Paloma',
        descripcion: 'Piel crocante, manteca de alcaparras y limón.',
        precio: '28',
      },
      {
        nombre: 'Bondiola de cerdo de Tarariras',
        descripcion: 'Ocho horas. Membrillo asado y su propio jugo.',
        precio: '30',
      },
      {
        nombre: 'Coliflor entera al fuego',
        descripcion: 'Para compartir. Tahini de girasol y granada.',
        precio: '22',
      },
    ],
  },
  {
    id: 'dulce',
    titulo: 'Ceniza dulce',
    nota: 'A esta altura el fuego ya no sirve para otra cosa.',
    platos: [
      {
        nombre: 'Pera al rescoldo',
        descripcion: 'Crema de nuez y azúcar mascabo.',
        precio: '11',
      },
      {
        nombre: 'Helado de leche quemada',
        descripcion: 'Almendra tostada y sal en escamas.',
        precio: '9',
      },
      {
        nombre: 'Chocolate 72% y aceite de oliva',
        descripcion: 'Tres ingredientes, contando la sal.',
        precio: '12',
      },
      {
        nombre: 'Membrillo de la casa',
        descripcion: 'Queso de Colonia y miel de espinillo.',
        precio: '10',
      },
    ],
  },
  {
    id: 'liquidos',
    titulo: 'Líquidos',
    nota: 'Cuarenta etiquetas, todas de productores que conocemos.',
    platos: [
      {
        nombre: 'Tannat de Las Violetas 2021',
        descripcion: 'Viñedo plantado en 1954, a ocho kilómetros de acá. Copa o botella.',
        precio: '9 / 42',
      },
      {
        nombre: 'Albariño naranjo, ánfora',
        descripcion: 'Cuatro meses con sus pieles. Copa o botella.',
        precio: '10 / 46',
      },
      {
        nombre: 'Vermut de la casa',
        descripcion: 'Macerado con hierbas del jardín de atrás.',
        precio: '8',
      },
      {
        nombre: 'Kombucha de manzana y laurel',
        descripcion: 'Sin alcohol. Fermentada acá.',
        precio: '6',
      },
      {
        nombre: 'Café de finca',
        descripcion: 'Tostado en la Ciudad Vieja, molido al momento.',
        precio: '4',
      },
    ],
  },
]

export const NOTA_CARTA =
  'La carta cambia cuando cambia lo que llega. Puede que algo de esto ya no esté.'
