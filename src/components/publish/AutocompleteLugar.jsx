import { useState, useEffect } from 'react';
import { buscarLugares } from '../../api/geoService';
import '../../styles/AutocompleteLugar.css';

export default function AutocompleteLugar({ id, label, icono, iconoClase, placeholder, value, onSelect }) {
    const [texto, setTexto] = useState(value?.nombre || '');
    const [sugerencias, setSugerencias] = useState([]);
    const [abierto, setAbierto] = useState(false);

    useEffect(() => {
        setTexto(value?.nombre || '');
    }, [value]);

    useEffect(() => {
        if (texto.trim().length < 3 || texto === value?.nombre) {
            setSugerencias([]);
            return;
        }
        const t = setTimeout(async () => {
            const resultados = await buscarLugares(texto);
            setSugerencias(resultados);
            setAbierto(resultados.length > 0);
        }, 600);
        return () => clearTimeout(t);
    }, [texto, value]);

    function handleChange(e) {
        setTexto(e.target.value);
        if (value) onSelect(null);
    }

    function elegir(lugar) {
        setTexto(lugar.nombre);
        setSugerencias([]);
        setAbierto(false);
        onSelect(lugar);
    }

    return (
        <div className="publicar-campo autocompletar">
            <label className="publicar-campo_etiqueta" htmlFor={id}>{label}</label>
            <div className="publicar-campo_wrap">
                <span className={`material-symbols-outlined publicar-campo_icono ${iconoClase || ''}`}>{icono}</span>
                <input
                    className={`publicar-campo_input${value ? ' autocompletar_input-ok' : ''}`}
                    id={id}
                    type="text"
                    autoComplete="off"
                    placeholder={placeholder}
                    value={texto}
                    onChange={handleChange}
                    onFocus={() => sugerencias.length > 0 && setAbierto(true)}
                    onBlur={() => setTimeout(() => setAbierto(false), 150)}
                />
                {value && <span className="material-symbols-outlined autocompletar_check">check_circle</span>}
            </div>

            {abierto && (
                <ul className="autocompletar_lista">
                    {sugerencias.map((lugar, i) => (
                        <li
                            key={`${lugar.lat}-${lugar.lon}-${i}`}
                            className="autocompletar_opcion"
                            onMouseDown={() => elegir(lugar)}
                        >
                            <span className="material-symbols-outlined">location_on</span>
                            <span>{lugar.nombre}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
