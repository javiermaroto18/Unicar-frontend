import { getNotifConfig } from './notificationTypes.js';

export default function NotificationItem({ notificacion, onMarcarLeida, onEliminar }) {
    const { icon, tipo } = getNotifConfig(notificacion.tipo);

    return (
        <article className={`notif-item${notificacion.leida ? '' : ' notif-item--no-leida'}`}>
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
                {/* Marcar como leída: solo se ofrece si aún no lo está */}
                {!notificacion.leida && (
                    <button
                        type="button"
                        className="notif-item-boton"
                        onClick={() => onMarcarLeida(notificacion.id)}
                        title="Marcar como leída"
                        aria-label="Marcar como leída"
                    >
                        <span className="material-symbols-outlined">done</span>
                    </button>
                )}
                <button
                    type="button"
                    className="notif-item-boton notif-item-boton--eliminar"
                    onClick={() => onEliminar(notificacion.id)}
                    title="Eliminar notificación"
                    aria-label="Eliminar notificación"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>
        </article>
    );
}
