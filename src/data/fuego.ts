export interface Dato {
  valor: number
  /** Lo que se muestra si el número no cuenta la historia solo. */
  sufijo?: string
  prefijo?: string
  etiqueta: string
  detalle: string
}

/** Los cuatro números que definen cómo funciona la casa. */
export const DATOS: Dato[] = [
  {
    valor: 1,
    etiqueta: 'fuego por día',
    detalle: 'Se enciende a las once de la mañana y no se vuelve a alimentar.',
  },
  {
    valor: 34,
    etiqueta: 'cubiertos',
    detalle: 'La cantidad exacta que un solo fuego puede sostener bien.',
  },
  {
    valor: 0,
    etiqueta: 'hornallas a gas',
    detalle: 'No hay una sola en la cocina. Tampoco horno eléctrico.',
  },
  {
    valor: 90,
    sufijo: ' km',
    etiqueta: 'de radio',
    detalle: 'La distancia máxima entre el restaurante y sus seis productores.',
  },
]

export const FUEGO_TEXTO = {
  titulo: 'Cocinar con lo que sobra',
  cuerpo: [
    'El gas es cómodo: da la misma temperatura a las ocho de la noche que a la medianoche. La ceniza no. Baja despacio, sin avisar, y obliga a ordenar el servicio entero alrededor de ella.',
    'Primero sale lo que necesita fuerza. Al final, lo que solo necesita tiempo. Es una manera incómoda de trabajar y nos deja sin margen de error. También es la única que da este sabor.',
  ],
} as const
