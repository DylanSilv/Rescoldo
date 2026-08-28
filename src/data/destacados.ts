import { IMG, type Img } from './images'

export interface Destacado {
  indice: string
  nombre: string
  seccion: string
  /** Dato duro que reemplaza al adjetivo. */
  tecnica: string
  descripcion: string
  precio: string
  imagen: Img
}

export const DESTACADOS: Destacado[] = [
  {
    indice: '01',
    nombre: 'Zapallo kabutiá entero',
    seccion: 'Del rescoldo',
    tecnica: '6 h bajo ceniza',
    descripcion:
      'Entra al mediodía, cuando la ceniza todavía quema, y sale a las ocho. En el medio no lo toca nadie. Miel de espinillo, labneh de cabra y sus propias pepitas tostadas.',
    precio: '15',
    imagen: IMG.platoZapallo,
  },
  {
    indice: '02',
    nombre: 'Cordero pesado de Rocha',
    seccion: 'Fuego alto',
    tecnica: '6 h a la cruz',
    descripcion:
      'Abierto frente al fuego desde la mañana, girado cuatro veces. Se sirve con chimichurri de menta de la huerta. No lleva salsa porque no la necesita.',
    precio: '32',
    imagen: IMG.platoCordero,
  },
  {
    indice: '03',
    nombre: 'Entrecot Hereford, 40 días',
    seccion: 'Fuego alto',
    tecnica: '90 s por lado',
    descripcion:
      'Novillo de pastura, madurado en cámara propia durante cuarenta días y marcado sobre sarmiento en el último momento de brasa viva. Puré de ajo negro y berro de arroyo.',
    precio: '34',
    imagen: IMG.platoBife,
  },
]
