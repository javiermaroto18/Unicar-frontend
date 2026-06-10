import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext.jsx';
import AutocompleteLugar from './AutocompleteLugar.jsx';
import SelectorVehiculo from './SelectorVehiculo.jsx';
import '../../styles/FormularioPublicar.css';

export default function FormularioPublicar({ vehiculos, onPublicar, isSubmitting, onLugaresChange }) {
    const toast = useToast();
    const hoy = new Date().toISOString().split('T')[0];

    const [origen,  setOrigen]  = useState(null);
    const [destino, setDestino] = useState(null);
    const [fecha,   setFecha]   = useState(hoy);
    const [hora,    setHora]    = useState('08:00');
    const [plazas,  setPlazas]  = useState(3);
    const [precio,  setPrecio]  = useState('3.00');
    const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState('');

    useEffect(() => {
        if (vehiculos && vehiculos.length > 0 && !vehiculoSeleccionado) {
            setVehiculoSeleccionado(vehiculos[0].id);
        }
    }, [vehiculos, vehiculoSeleccionado]);

    useEffect(() => {
        onLugaresChange?.(origen, destino);
    }, [origen, destino, onLugaresChange]);

    function intercambiarRuta() {
        setOrigen(destino);
        setDestino(origen);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!vehiculoSeleccionado) {
            toast.warning('Debes seleccionar un vehículo.');
            return;
        }
        if (!origen || !destino) {
            toast.warning('Elige el origen y el destino de la lista de sugerencias.');
            return;
        }
        const salida = new Date(`${fecha}T${hora}`);
        if (salida <= new Date()) {
            toast.warning('La fecha y hora de salida no pueden estar en el pasado.');
            return;
        }
        const precioNum = parseFloat(precio.replace(',', '.'));
        if (isNaN(precioNum) || precioNum <= 0) {
            toast.warning('Introduce un precio válido por plaza.');
            return;
        }

        onPublicar?.({
            origen: origen.nombre,
            destino: destino.nombre,
            fecha,
            hora,
            plazas,
            precio,
            vehicle_id: vehiculoSeleccionado,
        });
    }

    if (!vehiculos || vehiculos.length === 0) {
        return (
            <section className="publicar-columna-form">
                <div className="publicar-columna-form_interior">
                    <Link to="/dashboard" className="publicar-volver">
                        <span className="material-symbols-outlined">arrow_back</span>
                        Volver al inicio
                    </Link>
                    <div className="publicar-sin-vehiculos">
                        <span className="material-symbols-outlined publicar-sin-vehiculos_icono">no_crash</span>
                        <h2 className="publicar-sin-vehiculos_titulo">Necesitas un vehículo para publicar</h2>
                        <p className="publicar-sin-vehiculos_texto">
                            Aún no tienes ningún vehículo registrado en tu cuenta.
                            Añade uno desde tu perfil y vuelve para publicar tu primer viaje.
                        </p>
                        <Link to="/profile" className="publicar-btn-enviar publicar-sin-vehiculos_btn">
                            Registrar vehículo
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="publicar-columna-form">
            <div className="publicar-columna-form_interior">
                <Link to="/dashboard" className="publicar-volver">
                    <span className="material-symbols-outlined">arrow_back</span>
                    Volver al inicio
                </Link>
                <div className="publicar-cabecera">
                    <h1 className="publicar-cabecera_titulo">Publicar un nuevo viaje</h1>
                    <p className="publicar-cabecera_subtitulo">
                        Completa los detalles para que otros estudiantes puedan unirse.
                    </p>
                </div>

                <form className="publicar-tarjeta" onSubmit={handleSubmit}>

                    <div className="publicar-grupo-ruta">
                        <AutocompleteLugar
                            id="pub-origen"
                            label="Origen"
                            icono="trip_origin"
                            iconoClase="publicar-campo_icono-primario"
                            placeholder="Ej: U-Tad, Las Rozas"
                            value={origen}
                            onSelect={setOrigen}
                        />
                        <AutocompleteLugar
                            id="pub-destino"
                            label="Destino"
                            icono="location_on"
                            placeholder="Ej: Moncloa, Madrid"
                            value={destino}
                            onSelect={setDestino}
                        />
                        <button
                            type="button"
                            className="publicar-btn-intercambio"
                            title="Intercambiar origen y destino"
                            onClick={intercambiarRuta}
                        >
                            <span className="material-symbols-outlined">swap_vert</span>
                        </button>
                    </div>

                    <div className="publicar-fila-campos">
                        <div className="publicar-campo">
                            <label className="publicar-campo_etiqueta" htmlFor="pub-fecha">Fecha</label>
                            <div className="publicar-campo_wrap">
                                <span className="material-symbols-outlined publicar-campo_icono">calendar_today</span>
                                <input
                                    className="publicar-campo_input"
                                    id="pub-fecha"
                                    type="date"
                                    min={hoy}
                                    value={fecha}
                                    onChange={e => setFecha(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="publicar-campo">
                            <label className="publicar-campo_etiqueta" htmlFor="pub-hora">Hora</label>
                            <div className="publicar-campo_wrap">
                                <span className="material-symbols-outlined publicar-campo_icono">schedule</span>
                                <input
                                    className="publicar-campo_input"
                                    id="pub-hora"
                                    type="time"
                                    value={hora}
                                    onChange={e => setHora(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="publicar-fila-campos">
                        <div className="publicar-campo">
                            <label className="publicar-campo_etiqueta">Plazas Libres</label>
                            <div className="publicar-contador">
                                <button
                                    type="button"
                                    className="publicar-contador_btn"
                                    onClick={() => setPlazas(v => Math.max(1, v - 1))}
                                >
                                    <span className="material-symbols-outlined">remove</span>
                                </button>
                                <span className="publicar-contador_valor">{plazas}</span>
                                <button
                                    type="button"
                                    className="publicar-contador_btn"
                                    onClick={() => setPlazas(v => Math.min(6, v + 1))}
                                >
                                    <span className="material-symbols-outlined">add</span>
                                </button>
                            </div>
                        </div>
                        <div className="publicar-campo">
                            <label className="publicar-campo_etiqueta" htmlFor="pub-precio">Precio por Plaza</label>
                            <div className="publicar-campo_wrap">
                                <span className="publicar-campo_icono publicar-campo_icono-texto">€</span>
                                <input
                                    className="publicar-campo_input"
                                    id="pub-precio"
                                    type="text"
                                    inputMode="decimal"
                                    value={precio}
                                    onChange={e => setPrecio(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <SelectorVehiculo
                        vehiculos={vehiculos}
                        value={vehiculoSeleccionado}
                        onChange={setVehiculoSeleccionado}
                    />

                    <button
                        type="submit"
                        className="publicar-btn-enviar"
                        disabled={isSubmitting}
                        style={{ opacity: isSubmitting ? 0.7 : 1 }}
                    >
                        {isSubmitting ? 'Publicando...' : 'Publicar Viaje'}
                    </button>
                </form>
            </div>
        </section>
    );
}
