import NotificationItem from './NotificationItem.jsx';

export default function NotificationList({ notificaciones, onMarcarLeida, onEliminar }) {
    // Estado vacío: mismo patrón visual que el "sin resultados" del Dashboard
    if (notificaciones.length === 0) {
        return (
            <div className="notif-vacio">
                <span className="material-symbols-outlined notif-vacio-icono">notifications_off</span>
                <p className="notif-vacio-texto">No tienes notificaciones por aquí.</p>
            </div>
        );
    }

    return (
        <div className="notif-lista">
            {notificaciones.map((n) => (
                <NotificationItem
                    key={n.id}
                    notificacion={n}
                    onMarcarLeida={onMarcarLeida}
                    onEliminar={onEliminar}
                />
            ))}
        </div>
    );
}
