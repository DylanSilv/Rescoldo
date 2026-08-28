import { Etiqueta } from '../components/Etiqueta'
import { Reveal, RevealGrupo, RevealItem, LineasReveal } from '../components/Reveal'
import { CampoDeBrasas } from '../components/CampoDeBrasas'
import { useCountUp } from '../hooks/useCountUp'
import { DATOS, FUEGO_TEXTO, type Dato } from '../data/fuego'

function Numero({ dato }: { dato: Dato }) {
  const { ref, valor } = useCountUp(dato.valor)

  return (
    <RevealItem className="border-t border-cal/12 pt-5">
      <p className="font-display text-[clamp(3rem,6vw,5.5rem)] leading-none tracking-tight">
        <span ref={ref} className="numeral">
          {dato.prefijo}
          {valor}
          {dato.sufijo && (
            <span className="ml-1.5 align-baseline text-[0.38em] tracking-wide">
              {dato.sufijo.trim()}
            </span>
          )}
        </span>
      </p>
      <p className="label mt-3 text-cal/70">{dato.etiqueta}</p>
      <p className="type-body mt-3 max-w-[26ch] text-cal/40">{dato.detalle}</p>
    </RevealItem>
  )
}

/**
 * Capítulo II — la prueba.
 *
 * Acá el visitante pasa de «qué lindo» a «esperá, esto es en serio». Por eso
 * la sección son números y no adjetivos. El fuego de fondo está dibujado en
 * canvas: ver `CampoDeBrasas`.
 */
export function Fuego() {
  return (
    <section id="fuego" data-tema="oscuro" className="relative overflow-hidden bg-humo py-chapter text-cal">
      <CampoDeBrasas className="opacity-90" />

      <div className="relative mx-auto max-w-[1500px] px-5 md:px-8 lg:px-20 xl:px-24">
        <div className="grid grid-cols-12 gap-y-12">
          <Reveal className="col-span-12 lg:col-span-2">
            <Etiqueta capitulo="II" className="text-cal/60">
              El fuego
            </Etiqueta>
          </Reveal>

          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <h2 className="type-display max-w-[14ch]">
              <LineasReveal lineas={['Cocinar con', 'lo que sobra']} />
            </h2>

            <div className="mt-12 grid gap-8 md:grid-cols-2 md:gap-14">
              {FUEGO_TEXTO.cuerpo.map((parrafo, i) => (
                <Reveal key={i} retraso={i * 0.12}>
                  <p className="type-lead text-cal/60">{parrafo}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <RevealGrupo className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-28 md:grid-cols-4 md:gap-x-10">
          {DATOS.map((dato) => (
            <Numero key={dato.etiqueta} dato={dato} />
          ))}
        </RevealGrupo>

        {/*
          Acá iría la foto del fuego. No la hay, y es a propósito: cualquier
          imagen de llamas se reconoce al instante como banco de imágenes y
          además contradice la frase de la marca. El tramo es una brasa
          dibujada, a sangre, con una sola línea encima.
        */}
        <Reveal className="relative -mx-5 mt-20 md:-mx-8 md:mt-28 lg:-mx-20 xl:-mx-24" retraso={0.1}>
          <div className="relative flex h-[52vh] min-h-[320px] items-center justify-center overflow-hidden bg-carbon">
            <CampoDeBrasas cantidad={110} intensidad={1.5} />
            <p className="type-title relative px-6 text-center font-display italic text-cal/80 md:max-w-[24ch]">
              A las tres de la tarde ya no hay llama. Solo ceniza que todavía quema.
            </p>
            <p className="label numeral absolute bottom-5 left-5 text-cal/30 md:bottom-6 md:left-8">
              15:40 · 240 °C y bajando
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
