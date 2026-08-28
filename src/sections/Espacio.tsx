import { Etiqueta } from '../components/Etiqueta'
import { Figura } from '../components/Figura'
import { LineasReveal, Reveal, RevealGrupo, RevealItem } from '../components/Reveal'
import { GALERIA, ESPACIO_TEXTO, DETALLES } from '../data/espacio'

/**
 * Capítulo V — el lugar físico.
 *
 * La galería no es una grilla: cinco piezas de tamaños distintos, a alturas
 * distintas y con velocidades de parallax distintas. Una de ellas rompe el
 * margen del contenedor a propósito, para que la composición no se sienta
 * encerrada en una caja.
 */
export function Espacio() {
  return (
    <section id="espacio" data-tema="oscuro" className="overflow-hidden bg-humo py-chapter text-cal">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-20 xl:px-24">
        <div className="grid grid-cols-12 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-2">
            <Etiqueta capitulo="V" className="text-cal/60">
              El espacio
            </Etiqueta>
          </Reveal>

          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <h2 className="type-display max-w-[15ch]">
              <LineasReveal lineas={['Doce metros de fuego', 'y treinta y cuatro sillas']} />
            </h2>
            <Reveal retraso={0.12}>
              <p className="type-lead mt-9 max-w-[62ch] text-cal/55">{ESPACIO_TEXTO.cuerpo}</p>
            </Reveal>
          </div>
        </div>

        {/* Composición asimétrica */}
        <div className="mt-20 grid grid-cols-12 gap-5 md:mt-28 md:gap-6">
          <Reveal className="col-span-12 md:col-span-7">
            <Figura
              imagen={GALERIA[0].imagen}
              profundidad={GALERIA[0].profundidad}
              epigrafe={GALERIA[0].epigrafe}
              className="aspect-[16/11] w-full"
            />
          </Reveal>

          <Reveal className="col-span-7 md:col-span-4 md:col-start-9 md:mt-24" retraso={0.1}>
            <Figura
              imagen={GALERIA[1].imagen}
              profundidad={GALERIA[1].profundidad}
              epigrafe={GALERIA[1].epigrafe}
              className="aspect-[3/4] w-full"
            />
          </Reveal>

          {/* rompe el margen del contenedor */}
          <Reveal className="col-span-12 -mx-5 mt-8 md:-mx-8 md:mt-16 lg:-mx-12" retraso={0.05}>
            <Figura
              imagen={GALERIA[2].imagen}
              profundidad={GALERIA[2].profundidad}
              epigrafe={GALERIA[2].epigrafe}
              className="aspect-[16/10] w-full md:aspect-[21/8]"
            />
          </Reveal>

          <Reveal className="col-span-8 mt-8 md:col-span-5 md:mt-16" retraso={0.08}>
            <Figura
              imagen={GALERIA[3].imagen}
              profundidad={GALERIA[3].profundidad}
              epigrafe={GALERIA[3].epigrafe}
              className="aspect-[4/5] w-full"
            />
          </Reveal>

          <Reveal
            className="col-span-8 col-start-5 -mt-10 md:col-span-4 md:col-start-8 md:mt-40"
            retraso={0.14}
          >
            <Figura
              imagen={GALERIA[4].imagen}
              profundidad={GALERIA[4].profundidad}
              epigrafe={GALERIA[4].epigrafe}
              className="aspect-square w-full"
            />
          </Reveal>
        </div>

        <RevealGrupo className="mt-24 grid grid-cols-2 gap-x-6 gap-y-10 md:mt-32 md:grid-cols-4 md:gap-x-10">
          {DETALLES.map((detalle) => (
            <RevealItem key={detalle.titulo} className="border-t border-cal/12 pt-5">
              <h3 className="type-body font-medium">{detalle.titulo}</h3>
              <p className="type-body mt-2 text-cal/45">{detalle.detalle}</p>
            </RevealItem>
          ))}
        </RevealGrupo>
      </div>
    </section>
  )
}
