/**
 * Registro central de imágenes.
 *
 * Toda la fotografía del sitio entra por acá. Para reemplazar el set de
 * referencia por las fotos reales del restaurante alcanza con cambiar los
 * `src` de este archivo: ningún componente conoce una ruta de imagen.
 *
 * Dirección fotográfica del set: una sola fuente de luz cálida y lateral,
 * sombras cerradas, saturación baja, encuadres cerrados. El revelado común
 * (contraste + desaturación + temperatura) se aplica en CSS, en `.photo`.
 */

export interface Img {
  src: string
  alt: string
}

export const IMG = {
  textura: {
    src: '/img/textura.jpg',
    alt: 'Detalle de una cocción larga, servida sobre piedra',
  },
  platoCordero: {
    src: '/img/plato-cordero.jpg',
    alt: 'Cordero abierto a la cruz después de seis horas de fuego',
  },
  platoZapallo: {
    src: '/img/plato-zapallo.jpg',
    alt: 'Zapallo anco cocido entero bajo la ceniza, servido en cuenco de barro',
  },
  platoBife: {
    src: '/img/plato-bife.jpg',
    alt: 'Bife madurado, marcado sobre sarmiento y servido sobre plato oscuro',
  },
  pan: {
    src: '/img/pan.jpg',
    alt: 'Panes de masa madre cocidos sobre la piedra caliente',
  },
  cocina: {
    src: '/img/cocina.jpg',
    alt: 'Manos del cocinero terminando un plato en la barra',
  },
  mesa: {
    src: '/img/mesa.jpg',
    alt: 'Un plato saliendo a la mesa durante el servicio de la noche',
  },
  copa: {
    src: '/img/copa.jpg',
    alt: 'Una copa servida en la barra, con el salón desenfocado detrás',
  },
  bodega: {
    src: '/img/bodega.jpg',
    alt: 'La pared de botellas detrás de la barra, iluminada por debajo',
  },
  salon: {
    src: '/img/salon.jpg',
    alt: 'El salón vacío en penumbra, horas antes del servicio',
  },
  comedor: {
    src: '/img/comedor.jpg',
    alt: 'El comedor durante el servicio, bajo las lámparas bajas',
  },
  reserva: {
    src: '/img/reserva.jpg',
    alt: 'Las mesas montadas minutos antes de abrir',
  },
} as const satisfies Record<string, Img>
