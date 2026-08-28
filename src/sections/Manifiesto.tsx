import { Etiqueta } from '../components/Etiqueta'
import { PalabrasReveal, Reveal, Regla } from '../components/Reveal'
import { Figura } from '../components/Figura'
import { IMG } from '../data/images'

/**
 * Capítulo I — el respiro.
 *
 * Después del negro del hero, todo se abre a blanco de golpe. Cuarenta y
 * seis palabras y mucho aire: es el corte que le da ritmo al scroll y, en
 * un video, el momento en que se nota que el sitio está editado.
 */
export function Manifiesto() {
  return (
    <section id="manifiesto" data-tema="claro" className="relative bg-ceniza py-chapter text-humo">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-20 xl:px-24">
        <div className="grid grid-cols-12 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-2">
            <Etiqueta capitulo="I">Manifiesto</Etiqueta>
          </Reveal>

          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <PalabrasReveal
              className="font-display text-[clamp(1.45rem,2.85vw,2.65rem)] leading-[1.3] tracking-[-0.022em]"
              segmentos={[
                {
                  texto:
                    'A las once de la mañana encendemos un fuego con sarmientos de las viñas de al lado. No lo volvemos a alimentar. Todo lo que se sirve esta noche se cocina con',
                },
                { texto: 'el calor que quedó debajo de la ceniza', enfasis: true },
                { texto: '. Cuando el rescoldo se enfría, cerramos.' },
              ]}
            />

            <div className="mt-14 grid gap-10 md:grid-cols-12 md:items-end">
              <Reveal className="md:col-span-5" retraso={0.1}>
                <p className="type-body text-piedra">
                  No es una postura romántica sobre el fuego. Es una restricción de trabajo, y
                  como toda restricción, decide cosas: cuántos somos, a qué hora abrimos, qué
                  entra a la carta y qué se queda afuera.
                </p>
              </Reveal>

              <Reveal className="md:col-span-6 md:col-start-7" retraso={0.18}>
                <Figura
                  imagen={IMG.textura}
                  profundidad={0.06}
                  className="aspect-[5/3] w-full"
                  epigrafe="Cocción larga, servida sobre piedra"
                />
              </Reveal>
            </div>

            <Regla className="mt-16 text-humo" />
          </div>
        </div>
      </div>
    </section>
  )
}
