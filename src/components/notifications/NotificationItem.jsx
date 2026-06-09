import { getNotifConfig } from './notificationTypes.js';

export default function NotificationItem({ notificacion, onAbrir, onMarcarLeida, onEliminar }) {
    const { icon, tipo } = getNotifConfig(notificacion.tipo);
    const clicable = Boolean(notificacion.enlace);

    return (
        <article
            className={`notif-item${notificacion.leida ? '' : ' notif-item--no-leida'}${clicable ? ' notif-item--clicable' : ''}`}
            onClick={() => onAbrir(notificacion)}
            role={clicable ? 'button' : undefined}
            tabIndex={clicable ? 0 : undefined}
            onKeyDown={(e) => { if (clicable && e.key === 'Enter') onAbrir(notificacion); }}
        >
            <span className="notif-item-dot" aria-hidden="true" />
            <div className={`notif-item-icono notif-item-icono--${tipo}`}>
                <span className="material-symbols-outlined">{icon}</span>
            </div>

            <div className="notif-item-cuerpo">
                <div className="notif-item-cabecera">
                    <p className="notif-item-titulo">{notificacion.titulo}</p>
                    <span className="notif-item-tiempo">{notificacion.tiempo}</span>
                </div>
                <p className="notif-item-mensaje">{notificacion.mensaje}</p>
            </div>

            <div className="notif-item-acciones">
                {/* stopPropagation: los botones no deben disparar la apertura de la fila */}
                {!notificacion.leida && (
                    <button
                        type="button"
                        className="notif-item-boton"
                        onClick={(e) => { e.stopPropagation(); onMarcarLeida(notificacion.id); }}
                        title="Marcar como leída"
                        aria-label="Marcar como leída"
                    >
                        <span className="material-symbols-outlined">done</span>
                    </button>
                )}
                <button
                    type="button"
                    className="notif-item-boton notif-item-boton--eliminar"
                    onClick={(e) => { e.stopPropagation(); onEliminar(notificacion.id); }}
                    title="Eliminar notificación"
                    aria-label="Eliminar notificación"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </article>
    );
}
