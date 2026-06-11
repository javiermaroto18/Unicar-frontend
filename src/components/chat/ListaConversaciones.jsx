import { useState } from 'react';
import '../../styles/ListaConversaciones.css';

export default function ListaConversaciones({ conversaciones, idActivo, onSeleccionar }) {
    const [busqueda, setBusqueda] = useState('');

    const filtradas = conversaciones.filter(c =>
        c.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    return (
        <aside className="lista-conversaciones">
            <div className="lista-conversaciones_cabecera">
                <div className="lista-conversaciones_titulo-wrap">
                    <h2 className="lista-conversaciones_titulo">Mensajes</h2>
                    <span className="lista-conversaciones_prototipo" title="Vista previa de diseño: la mensajería se integrará con el backend en próximas versiones">
                        Prototipo
                    </span>
                </div>
                <button className="lista-conversaciones_btn-nuevo" title="Nueva conversación">
                    <span className="material-symbols-outlined">edit_square</span>
                </button>
            </div>

            <div className="lista-conversaciones_buscador">
                <span className="material-symbols-outlined lista-conversaciones_buscador-icono">search</span>
                <input
                    className="lista-conversaciones_buscador-input"
                    type="text"
                    placeholder="Buscar conversación..."
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                />
            </div>

            <div className="lista-conversaciones_items">
                {filtradas.map(conv => (
                    <ElementoConversacion
                        key={conv.id}
                        conv={conv}
                        activo={conv.id === idActivo}
                        onClick={() => onSeleccionar(conv.id)}
                    />
                ))}
            </div>
        </aside>
    );
}

function ElementoConversacion({ conv, activo, onClick }) {
    return (
        <button
            className={`elemento-conversacion${activo ? ' elemento-conversacion_activo' : ''}`}
            onClick={onClick}
        >
            <div className="elemento-conversacion_avatar-wrap">
                {conv.esGrupo ? (
                    <div className="elemento-conversacion_avatar-grupo">
                        <span className="material-symbols-outlined">group</span>
                    </div>
                ) : (
                    <img className="elemento-conversacion_avatar" src={conv.avatar} alt={conv.nombre} />
                )}
                {conv.conectado && (
                    <span className="elemento-conversacion_estado elemento-conversacion_estado-conectado" />
                )}
            </div>

            <div className="elemento-conversacion_info">
                <div className="elemento-conversacion_fila-superior">
                    <span className="elemento-conversacion_nombre">{conv.nombre}</span>
                    <span className="elemento-conversacion_hora">{conv.hora}</span>
                </div>
                <div className="elemento-conversacion_fila-inferior">
                    <span className={`elemento-conversacion_preview${!activo ? ' elemento-conversacion_preview-tenue' : ''}`}>
                        {conv.preview}
                    </span>
                    {conv.noLeidos > 0 && (
                        <span className="elemento-conversacion_badge">{conv.noLeidos}</span>
                    )}
                </div>
            </div>
        </button>
    );
}
