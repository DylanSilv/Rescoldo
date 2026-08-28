import { Reveal } from '../components/Reveal'
import { CAPITULOS, CONTACTO, SITE } from '../data/site'
import { irA } from '../lib/scroll'

/**
 * El cierre repite la marca a escala grande, recortada por el borde
 * inferior. Es la última imagen que queda y no cuesta nada.
 */
export function Footer() {
  const anio = new Date().getFullYear()

  return (
    <footer data-tema="oscuro" className="overflow-hidden bg-humo pt-chapter text-cal">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-20 xl:px-24">
        <Reveal>
          <p className="type-title font-display max-w-[18ch] italic text-cal/70">
            Los lunes el fuego descansa.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-12 gap-y-10 border-t border-cal/12 pt-10 md:mt-20">
          <div className="col-span-6 md:col-span-3">
            <p className="label text-cal/40">Capítulos</p>
            <ul className="mt-4 space-y-2">
              {CAPITULOS.map((c) => (
                <li key={c.id}>
                  <button
                    onClick={() => irA(c.id)}
                    className="type-body link-rule text-cal/75 hover:text-cal"
                  >
                    {c.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="label text-cal/40">Dónde</p>
            <address className="type-body mt-4 not-italic text-cal/75">
              {CONTACTO.calle}
              <br />
              {CONTACTO.localidad}
              <br />
              {CONTACTO.departamento}
            </address>
            <p className="label numeral mt-4 text-cal/35">{CONTACTO.coordenadas}</p>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="label text-cal/40">Contacto</p>
            <ul className="type-body mt-4 space-y-2 text-cal/75">
              <li>
                <a href={CONTACTO.telefonoHref} className="link-rule numeral">
                  {CONTACTO.telefono}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACTO.email}`} className="link-rule">
                  {CONTACTO.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACTO.instagramHref}
                  target="_blank"
                  rel="noreferrer"
                  className="link-rule text-rescoldo"
                >
                  {CONTACTO.instagram}
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2 md:col-start-11">
            <p className="label text-cal/40">Newsletter</p>
            <p className="type-body mt-4 text-cal/55">
              Escribimos cuatro veces al año, cuando cambia la carta.
            </p>
            <button
              onClick={() => irA('reservas')}
              className="label link-rule mt-4 text-cal/75"
            >
              Sumarme
            </button>
          </div>
        </div>

        {/* Marca a escala, recortada por el borde */}
        <div aria-hidden className="mt-16 overflow-hidden md:mt-20">
          <p className="type-hero translate-y-[14%] select-none text-center leading-[0.78] text-cal/[0.10]">
            {SITE.nombre}
          </p>
        </div>

        <div className="flex flex-col gap-3 border-t border-cal/12 py-6 md:flex-row md:items-center md:justify-between">
          <p className="label text-cal/35">
            © {anio} {SITE.nombre} — Desde {SITE.fundado}
          </p>
          <p className="label text-cal/35">
            Concepto, diseño y desarrollo — <span className="text-cal/60">Dylan Silva</span>
          </p>
          <button onClick={() => irA('hero')} className="label link-rule self-start text-cal/50">
            Volver arriba ↑
          </button>
        </div>
      </div>
    </footer>
  )
}
