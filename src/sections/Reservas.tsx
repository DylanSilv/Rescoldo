import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Etiqueta } from '../components/Etiqueta'
import { Figura } from '../components/Figura'
import { LineasReveal, Reveal } from '../components/Reveal'
import { Boton } from '../components/Boton'
import { IMG } from '../data/images'
import { CONTACTO } from '../data/site'
import { cn } from '../lib/cn'

const COMENSALES = ['1', '2', '3', '4', '5', '6', '7+']
const HORARIOS_CENA = ['19:30', '20:00', '20:30', '21:00', '21:30', '22:00']

const PASOS = [
  { n: '01', titulo: 'Cuántos son' },
  { n: '02', titulo: 'Cuándo' },
  { n: '03', titulo: 'Quién reserva' },
]

interface Reserva {
  personas: string
  fecha: string
  hora: string
  nombre: string
  email: string
  telefono: string
  nota: string
}

const VACIA: Reserva = {
  personas: '2',
  fecha: '',
  hora: '',
  nombre: '',
  email: '',
  telefono: '',
  nota: '',
}

/** Pastilla seleccionable. En mobile son el reemplazo de todo `<select>`. */
function Pastilla({
  activa,
  children,
  onClick,
}: {
  activa: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={activa}
      className={cn(
        'label border px-5 py-3.5 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]',
        activa
          ? 'border-humo bg-humo text-cal'
          : 'border-humo/20 text-humo hover:border-humo/60 hover:bg-humo/[0.03]',
      )}
    >
      {children}
    </button>
  )
}

function Campo({
  id,
  etiqueta,
  tipo = 'text',
  valor,
  onChange,
  requerido,
  placeholder,
}: {
  id: string
  etiqueta: string
  tipo?: string
  valor: string
  onChange: (v: string) => void
  requerido?: boolean
  placeholder?: string
}) {
  return (
    <div className="group">
      <label htmlFor={id} className="label block text-piedra">
        {etiqueta}
        {requerido && <span className="text-rescoldo"> *</span>}
      </label>
      <input
        id={id}
        type={tipo}
        value={valor}
        required={requerido}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="type-body mt-2.5 w-full border-b border-humo/20 bg-transparent pb-2.5 outline-none transition-colors duration-400 placeholder:text-piedra/40 focus:border-rescoldo"
      />
    </div>
  )
}

/**
 * Capítulo VI — reservas.
 *
 * Tres pasos, nunca más de dos datos por pantalla. En mobile cada paso ocupa
 * el alto disponible y los horarios son pastillas grandes en vez de un
 * desplegable nativo, que en un celular es el peor control posible.
 */
export function Reservas() {
  const [paso, setPaso] = useState(0)
  const [datos, setDatos] = useState<Reserva>(VACIA)
  const [confirmada, setConfirmada] = useState(false)

  const set = (campo: keyof Reserva) => (valor: string) =>
    setDatos((previo) => ({ ...previo, [campo]: valor }))

  const puedeSeguir =
    paso === 0
      ? Boolean(datos.personas)
      : paso === 1
        ? Boolean(datos.fecha && datos.hora)
        : Boolean(datos.nombre.trim() && datos.email.includes('@'))

  const avanzar = () => {
    if (!puedeSeguir) return
    if (paso < 2) setPaso(paso + 1)
    else setConfirmada(true)
  }

  const reiniciar = () => {
    setDatos(VACIA)
    setPaso(0)
    setConfirmada(false)
  }

  const hoy = new Date().toISOString().split('T')[0]

  return (
    <section id="reservas" data-tema="claro" className="bg-ceniza py-chapter text-humo">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8 lg:px-20 xl:px-24">
        <div className="grid grid-cols-12 gap-y-14 lg:gap-x-12">
          {/* Columna editorial */}
          <div className="col-span-12 lg:col-span-5">
            <Reveal>
              <Etiqueta capitulo="VI">Reservas</Etiqueta>
            </Reveal>
            <h2 className="type-display mt-7 max-w-[11ch]">
              <LineasReveal lineas={['Treinta y', 'cuatro lugares']} />
            </h2>
            <Reveal retraso={0.12}>
              <p className="type-body mt-7 max-w-[42ch] text-piedra">
                Tomamos reservas con hasta sesenta días de anticipación. Si no encontrás lugar,
                liberamos las mesas canceladas todos los martes a las diez de la mañana.
              </p>
              <p className="type-body mt-5 max-w-[42ch] text-piedra">
                Para grupos de más de siete personas, escribinos directamente a{' '}
                <a href={`mailto:${CONTACTO.email}`} className="link-rule text-humo">
                  {CONTACTO.email}
                </a>
                .
              </p>
            </Reveal>

            <Reveal retraso={0.2}>
              <Figura
                imagen={IMG.reserva}
                profundidad={0.07}
                className="mt-12 aspect-[4/3] w-full lg:mt-16"
                epigrafe="18:55 — diez minutos antes de abrir"
              />
            </Reveal>
          </div>

          {/* Formulario */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="border-t border-humo/15 pt-8">
              <AnimatePresence mode="wait">
                {confirmada ? (
                  <motion.div
                    key="confirmada"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="label text-rescoldo">Mesa tomada</p>
                    <h3 className="type-display mt-6 max-w-[12ch]">Te esperamos.</h3>

                    <dl className="mt-10 space-y-0">
                      {[
                        ['A nombre de', datos.nombre],
                        ['Personas', datos.personas],
                        ['Día', datos.fecha],
                        ['Hora', datos.hora],
                        ['Confirmación a', datos.email],
                      ].map(([clave, valor]) => (
                        <div
                          key={clave}
                          className="flex items-baseline justify-between gap-6 border-t border-humo/12 py-4"
                        >
                          <dt className="label text-piedra">{clave}</dt>
                          <dd className="type-body text-right">{valor}</dd>
                        </div>
                      ))}
                    </dl>

                    <p className="type-body mt-8 max-w-[44ch] text-piedra">
                      La mesa se guarda quince minutos. Si vas a llegar más tarde, avisanos al{' '}
                      <a href={CONTACTO.telefonoHref} className="link-rule text-humo">
                        {CONTACTO.telefono}
                      </a>
                      .
                    </p>

                    <button onClick={reiniciar} className="label link-rule mt-10 text-piedra">
                      Hacer otra reserva
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="formulario">
                    {/* Indicador de paso */}
                    <div className="flex items-center gap-4">
                      {PASOS.map((p, i) => (
                        <button
                          key={p.n}
                          type="button"
                          onClick={() => i < paso && setPaso(i)}
                          disabled={i > paso}
                          className={cn(
                            'label flex items-center gap-2 transition-opacity duration-500',
                            i === paso ? 'opacity-100' : 'opacity-35',
                            i < paso && 'hover:opacity-70',
                          )}
                        >
                          <span className="numeral">{p.n}</span>
                          <span className="hidden sm:inline">{p.titulo}</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-4 h-px w-full bg-humo/12">
                      <motion.div
                        className="h-full origin-left bg-rescoldo"
                        animate={{ scaleX: (paso + 1) / 3 }}
                        initial={{ scaleX: 1 / 3 }}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>

                    <div className="mt-10 min-h-[280px]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={paso}
                          initial={{ opacity: 0, y: 18 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -14 }}
                          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        >
                          {paso === 0 && (
                            <fieldset>
                              <legend className="type-title mb-7">¿Cuántos van a ser?</legend>
                              <div className="flex flex-wrap gap-2.5">
                                {COMENSALES.map((n) => (
                                  <Pastilla
                                    key={n}
                                    activa={datos.personas === n}
                                    onClick={() => set('personas')(n)}
                                  >
                                    {n}
                                  </Pastilla>
                                ))}
                              </div>
                              <p className="type-body mt-7 max-w-[40ch] text-piedra">
                                Doce de los treinta y cuatro lugares están en la barra, frente a
                                la cocina. Si querés esos, decínoslo en el último paso.
                              </p>
                            </fieldset>
                          )}

                          {paso === 1 && (
                            <fieldset className="space-y-9">
                              <legend className="type-title mb-7">¿Qué día?</legend>
                              <Campo
                                id="fecha"
                                etiqueta="Fecha"
                                tipo="date"
                                valor={datos.fecha}
                                onChange={set('fecha')}
                                requerido
                              />
                              <div>
                                <p className="label text-piedra">
                                  Hora <span className="text-rescoldo">*</span>
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2.5">
                                  {HORARIOS_CENA.map((h) => (
                                    <Pastilla
                                      key={h}
                                      activa={datos.hora === h}
                                      onClick={() => set('hora')(h)}
                                    >
                                      {h}
                                    </Pastilla>
                                  ))}
                                </div>
                                <p className="label mt-4 text-piedra/70">
                                  Cerramos lunes y martes · Almuerzos solo sábado y domingo
                                </p>
                              </div>
                            </fieldset>
                          )}

                          {paso === 2 && (
                            <fieldset className="space-y-8">
                              <legend className="type-title mb-7">¿A nombre de quién?</legend>
                              <Campo
                                id="nombre"
                                etiqueta="Nombre y apellido"
                                valor={datos.nombre}
                                onChange={set('nombre')}
                                requerido
                              />
                              <Campo
                                id="email"
                                etiqueta="Email"
                                tipo="email"
                                valor={datos.email}
                                onChange={set('email')}
                                requerido
                              />
                              <Campo
                                id="telefono"
                                etiqueta="Teléfono"
                                tipo="tel"
                                valor={datos.telefono}
                                onChange={set('telefono')}
                              />
                              <Campo
                                id="nota"
                                etiqueta="Algo que debamos saber"
                                valor={datos.nota}
                                onChange={set('nota')}
                                placeholder="Alergias, barra, celebraciones…"
                              />
                            </fieldset>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    <div className="mt-10 flex items-center justify-between gap-6 border-t border-humo/15 pt-7">
                      {paso > 0 ? (
                        <button
                          onClick={() => setPaso(paso - 1)}
                          className="label link-rule text-piedra"
                        >
                          Volver
                        </button>
                      ) : (
                        <span className="label text-piedra/50">
                          {hoy.split('-').reverse().join('.')}
                        </span>
                      )}

                      <Boton variante="solido" onClick={avanzar} disabled={!puedeSeguir}>
                        {paso < 2 ? 'Continuar' : 'Confirmar reserva'}
                      </Boton>
                    </div>

                    <p className="label mt-6 text-piedra/50">
                      Formulario de demostración — no se envía ninguna información.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
