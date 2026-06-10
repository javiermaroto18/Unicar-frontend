import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getNotifConfig, formatearTiempo } from './notificationTypes.js';
import { useNotifications } from '../../context/NotificationsContext.jsx';
import '../../styles/NotificationsDropdown.css';

// Nº de notificaciones que se muestran en el desplegable (las más recientes)
const VISTA_PREVIA = 2;

export default function NotificationsDropdown() {
    const navigate = useNavigate();
    const { notificaciones, marcarLeida } = useNotifications();
    const [abierto, setAbierto] = useState(false);
    const contenedorRef = useRef(null);

    // Estado compartido con la pantalla. El array está ordenado de más reciente a más antiguo.
    const recientes = notificaciones.slice(0, VISTA_PREVIA);
    const noLeidas = notificaciones.filter((n) => !n.leida).length;

    // Cerrar al hacer clic fuera o pulsar Escape
    useEffect(() => {
        if (!abierto) return;

        function handleClickFuera(e) {
            if (contenedorRef.current && !contenedorRef.current.contains(e.target)) {
                setAbierto(false);
            }
        }
        function handleEsc(e) {
            if (e.key === 'Escape') setAbierto(false);
        }

        document.addEventListener('mousedown', handleClickFuera);
        document.addEventListener('keydown', handleEsc);
        return () => {
            document.removeEventListener('mousedown', handleClickFuera);
            document.removeEventListener('keydown', handleEsc);
        };
    }, [abierto]);

    function irATodas() {
        setAbierto(false);
        navigate('/notifications');
    }

    // Abrir una notificación: cerrar panel, marcarla leída y navegar a su destino
    function abrir(n) {
        setAbierto(false);
        if (!n.leida) marcarLeida(n.id);
        if (n.enlace) navigate(n.enlace);
    }

    return (
        <div className="topbar-notif" ref={contenedorRef}>
            <button
                type="button"
                className="topbar-notif-btn"
                aria-label="Notificaciones"
                aria-haspopup="true"
                aria-expanded={abierto}
                onClick={() => setAbierto((v) => !v)}
            >
                <span className="material-symbols-outlined">notifications</span>
                {noLeidas > 0 && (
                    <span className="topbar-notif-badge">{noLeidas > 9 ? '9+' : noLeidas}</span>
                )}
            </button>

            {abierto && (
                <div className="notif-drop" role="menu">
                    <div className="notif-drop-cabecera">
                        <h3 className="notif-drop-titulo">Notificaciones</h3>
                        {noLeidas > 0 && (
                            <span className="notif-drop-contador">{noLeidas} sin leer</span>
                        )}
                    </div>

                    {recientes.length === 0 ? (
                        <div className="notif-drop-vacio">
                            <span className="material-symbols-outlined">notifications_off</span>
                            <p>No tienes notificaciones</p>
                        </div>
                    ) : (
                        <ul className="notif-drop-lista">
                            {recientes.map((n) => {
                                const { icon, tipo } = getNotifConfig(n.tipo, n.icono);
                                return (
                                    <li
                                        key={n.id}
                                        className={`notif-drop-item${n.leida ? '' : ' notif-drop-item--no-leida'}${n.enlace ? ' notif-drop-item--clicable' : ''}`}
                                        onClick={() => abrir(n)}
                                        role={n.enlace ? 'button' : undefined}
                                        tabIndex={n.enlace ? 0 : undefined}
                                        onKeyDown={(e) => { if (n.enlace && e.key === 'Enter') abrir(n); }}
                                    >
                                        <div className={`notif-drop-icono notif-drop-icono--${tipo}`}>
                                            <span className="material-symbols-outlined">{icon}</span>
                                        </div>
                                        <div className="notif-drop-item-cuerpo">
                                            <p className="notif-drop-item-titulo">{n.titulo}</p>
                                            <p className="notif-drop-item-mensaje">{n.mensaje}</p>
                                            <span className="notif-drop-item-tiempo">{formatearTiempo(n.creadaEn ?? n.id)}</span>
                                        </div>
                                        {!n.leida && <span className="notif-drop-punto" aria-hidden="true" />}
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    <button type="button" className="notif-drop-ver-mas" onClick={irATodas}>
                        Ver todas las notificaciones
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            )}
        </div>
    );
}
