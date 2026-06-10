import { useState } from 'react';
import '../../styles/SelectorVehiculo.css';

function textoVehiculo(v) {
    const nombre = v.brand_model || `${v.brand} ${v.model}`;
    return `${nombre} - ${v.license_plate}`;
}

export default function SelectorVehiculo({ vehiculos, value, onChange }) {
    const [abierto, setAbierto] = useState(false);
    const seleccionado = vehiculos.find(v => String(v.id) === String(value));

    function elegir(id) {
        onChange(id);
        setAbierto(false);
    }

    return (
        <div className="publicar-campo autocompletar" style={{ marginTop: '0.5rem' }}>
            <label className="publicar-campo_etiqueta">Vehículo para el viaje</label>
            <div className="publicar-campo_wrap">
                <span className="material-symbols-outlined publicar-campo_icono">directions_car</span>
                <button
                    type="button"
                    className="publicar-campo_input selector-trigger"
                    onClick={() => setAbierto(a => !a)}
                    onBlur={() => setTimeout(() => setAbierto(false), 150)}
                >
                    <span className={`selector-trigger-texto${seleccionado ? '' : ' selector-trigger-placeholder'}`}>
                        {seleccionado ? textoVehiculo(seleccionado) : 'Selecciona un vehículo...'}
                    </span>
                    <span className={`material-symbols-outlined selector-flecha${abierto ? ' selector-flecha--abierto' : ''}`}>
                        expand_more
                    </span>
                </button>
            </div>

            {abierto && (
                <ul className="autocompletar_lista">
                    {vehiculos.map(v => (
                        <li
                            key={v.id}
                            className="autocompletar_opcion"
                            onMouseDown={() => elegir(v.id)}
                        >
                            <span className="material-symbols-outlined">directions_car</span>
                            <span>{textoVehiculo(v)}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
