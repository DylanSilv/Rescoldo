import { Etiqueta } from '../components/Etiqueta'
import { LineasReveal, Reveal } from '../components/Reveal'
import { Boton } from '../components/Boton'
import { MapaEstilizado } from '../components/MapaEstilizado'
import { CONTACTO, HORARIOS } from '../data/site'

/** Capítulo VII — dónde queda y cuándo está abierto. Nada más. */
export function Ubicacion() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${CONTACTO.calle}, ${CONTACTO.localidad}, ${CONTACTO.departamento}`,
  )}`

  return (
    <section id="ubicacion" data-tema="oscuro" className="bg-humo pt-chapter text-cal">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-20 xl:px-24">
        <div className="grid grid-cols-12 gap-y-10">
          <Reveal className="col-span-12 lg:col-span-2">
            <Etiqueta capitulo="VII" className="text-cal/60">
              Cómo llegar
            </Etiqueta>
          </Reveal>

          <div className="col-span-12 lg:col-span-9 lg:col-start-4">
            <h2 className="type-display max-w-[16ch]">
              <LineasReveal lineas={['A media hora', 'de Montevideo,', 'entre las viñas']} />
            </h2>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-12 gap-y-12 md:mt-20 lg:gap-x-12">
          <Reveal className="col-span-12 lg:col-span-7">
            <div className="aspect-[4/3] w-full overflow-hidden md:aspect-[16/11]">
              <MapaEstilizado />
            </div>
          </Reveal>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <Reveal>
              <div className="border-t border-cal/15 pt-5">
                <p className="label text-cal/45">Dirección</p>
                <address className="type-lead mt-3 not-italic">
                  {CONTACTO.calle}
                  <br />
                  {CONTACTO.localidad}
                  <br />
                  <span className="text-cal/50">{CONTACTO.departamento}</span>
                </address>
                <div className="mt-6">
                  <Boton href={mapsHref}>Abrir en el mapa</Boton>
                </div>
              </div>
            </Reveal>

            <Reveal retraso={0.1}>
              <div className="mt-12 border-t border-cal/15 pt-5">
                <p className="label text-cal/45">Horarios</p>
                <dl className="mt-4">
                  {HORARIOS.map((h) => (
                    <div key={h.dias} className="flex items-baseline justify-between gap-4 py-2.5">
                      <dt className="type-body text-cal/85">
                        {h.dias}
                        <span className="label ml-2 text-cal/35">{h.franja}</span>
                      </dt>
                      <dd className="numeral shrink-0 text-sm text-cal/60">{h.horas}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal retraso={0.18}>
              <div className="mt-12 border-t border-cal/15 pt-5">
                <p className="label text-cal/45">Contacto</p>
                <ul className="mt-4 space-y-2.5">
                  <li>
                    <a href={CONTACTO.telefonoHref} className="type-body link-rule numeral">
                      {CONTACTO.telefono}
                    </a>
                  </li>
                  <li>
                    <a href={`mailto:${CONTACTO.email}`} className="type-body link-rule">
                      {CONTACTO.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={CONTACTO.instagramHref}
                      target="_blank"
                      rel="noreferrer"
                      className="type-body link-rule text-rescoldo"
                    >
                      {CONTACTO.instagram}
                    </a>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
