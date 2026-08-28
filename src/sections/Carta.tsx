import { Fragment } from 'react'
import { Etiqueta } from '../components/Etiqueta'
import { Figura } from '../components/Figura'
import { LineasReveal, Reveal, RevealGrupo, RevealItem } from '../components/Reveal'
import { Boton } from '../components/Boton'
import { CARTA, MENU_DEGUSTACION, NOTA_CARTA, type SeccionCarta } from '../data/menu'
import { IMG } from '../data/images'
import { irA } from '../lib/scroll'

function Seccion({ seccion }: { seccion: SeccionCarta }) {
  return (
    <div className="grid grid-cols-12 gap-y-8">
      <Reveal className="col-span-12 lg:col-span-3">
        <div className="lg:sticky lg:top-32">
          <h3 className="type-title">{seccion.titulo}</h3>
          <p className="type-body mt-3 max-w-[26ch] text-piedra">{seccion.nota}</p>
        </div>
      </Reveal>

      <RevealGrupo className="col-span-12 lg:col-span-8 lg:col-start-5" paso={0.06}>
        {seccion.platos.map((plato) => (
          <RevealItem key={plato.nombre}>
            <div className="group flex items-baseline justify-between gap-6 border-t border-humo/12 py-5 transition-colors duration-500 hover:border-rescoldo/40 md:gap-12">
              <div className="min-w-0">
                <h4 className="type-body font-medium transition-colors duration-500 group-hover:text-rescoldo">
                  {plato.nombre}
                  {plato.destacado && (
                    <span className="label ml-3 align-middle text-rescoldo/70">destacado</span>
                  )}
                </h4>
                <p className="type-body mt-1.5 max-w-[52ch] text-piedra">{plato.descripcion}</p>
              </div>
              <p className="numeral shrink-0 text-humo/60">{plato.precio}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGrupo>
    </div>
  )
}

/**
 * Capítulo IV — la carta.
 *
 * Se lee como una página impresa: sin tarjetas, sin sombras, separada solo
 * por reglas de un píxel. El título de cada sección queda fijo mientras se
 * recorren sus platos, que es como funciona una carta de papel abierta.
 */
export function Carta() {
  return (
    <section id="carta" data-tema="claro" className="bg-cal py-chapter text-humo">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-20 xl:px-24">
        <div className="grid grid-cols-12 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-3">
            <Etiqueta capitulo="IV">La carta</Etiqueta>
          </Reveal>

          <div className="col-span-12 lg:col-span-8 lg:col-start-5">
            <h2 className="type-display max-w-[13ch]">
              <LineasReveal lineas={['Lo que el fuego', 'permite hoy']} />
            </h2>
          </div>
        </div>

        {/* Menú de pasos: el único bloque enmarcado del sitio */}
        <Reveal className="mt-16 md:mt-20">
          <div className="grid grid-cols-12 items-center gap-y-6 border-y border-humo/15 py-8 md:py-10">
            <div className="col-span-12 lg:col-span-3">
              <p className="label text-rescoldo">
                {MENU_DEGUSTACION.pasos} pasos · {MENU_DEGUSTACION.precio}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-6 lg:col-start-5">
              <h3 className="type-title">{MENU_DEGUSTACION.titulo}</h3>
              <p className="type-body mt-3 max-w-[46ch] text-piedra">
                {MENU_DEGUSTACION.descripcion}
              </p>
            </div>
            <div className="col-span-12 lg:col-span-2 lg:col-start-11 lg:text-right">
              <Boton onClick={() => irA('reservas')}>Reservar</Boton>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 space-y-20 md:mt-24 md:space-y-24">
          {CARTA.map((seccion, i) => (
            <Fragment key={seccion.id}>
              <Seccion seccion={seccion} />

              {/* corte visual a mitad de la carta, para que no sea una lista larga */}
              {i === 1 && (
                <Reveal>
                  <div className="grid grid-cols-12 items-end gap-y-6">
                    <div className="col-span-12 lg:col-span-7">
                      <Figura
                        imagen={IMG.pan}
                        profundidad={0.08}
                        className="aspect-[16/9] w-full"
                        epigrafe="Pan de sarmiento, sobre la piedra"
                      />
                    </div>
                    <div className="col-span-12 lg:col-span-4 lg:col-start-9">
                      <p className="type-lead font-display">
                        El pan se cocina apoyado directo sobre la piedra del horno, sin molde.
                      </p>
                      <p className="type-body mt-4 text-piedra">
                        Sale con la base más oscura de lo que a mucha gente le parece normal.
                        Es a propósito.
                      </p>
                    </div>
                  </div>
                </Reveal>
              )}
            </Fragment>
          ))}
        </div>

        <Reveal className="mt-20">
          <div className="flex flex-col gap-2 border-t border-humo/15 pt-6 md:flex-row md:justify-between">
            <p className="label max-w-[44ch] text-piedra">{NOTA_CARTA}</p>
            <p className="label text-piedra/70">
              Cocina cerrada 23:15 · Consultanos por restricciones alimentarias
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
