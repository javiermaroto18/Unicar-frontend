// Tarjeta lateral de resumen: cifras + filtro por tipo (al pulsar, filtra la lista)
const TIPOS = [
    { id: 'reserva', label: 'Reservas', icon: 'event_seat' },
    { id: 'viaje',   label: 'Viajes',   icon: 'directions_car' },
    { id: 'sistema', label: 'Sistema',  icon: 'verified' },
];

export default function NotificationsSummary({ notificaciones, tipoActivo, onTipoChange }) {
    const total = notificaciones.length;
    const noLeidas = notificaciones.filter((n) => !n.leida).length;
    const conteo = (id) => notificaciones.filter((n) => (n.tipo || 'sistema') === id).length;

    return (
        <div className="notif-card">
            <h3 className="notif-card-titulo">Resumen</h3>

            <div className="notif-resumen-cifras">
                <div className="notif-resumen-cifra">
                    <span className="notif-resumen-num">{noLeidas}</span>
                    <span className="notif-resumen-etq">Sin leer</span>
                </div>
                <div className="notif-resumen-cifra">
                    <span className="notif-resumen-num">{total}</span>
                    <span className="notif-resumen-etq">En total</span>
                </div>
            </div>

            <div className="notif-resumen-tipos">
                <button
                    type="button"
                    className={`notif-tipo-fila${tipoActivo === null ? ' notif-tipo-fila--activa' : ''}`}
                    onClick={() => onTipoChange(null)}
                >
                    <span className="material-symbols-outlined">inbox</span>
                    <span className="notif-tipo-label">Todas</span>
                    <span className="notif-tipo-num">{total}</span>
                </button>

                {TIPOS.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        className={`notif-tipo-fila${tipoActivo === t.id ? ' notif-tipo-fila--activa' : ''}`}
                        onClick={() => onTipoChange(tipoActivo === t.id ? null : t.id)}
                    >
                        <span className="material-symbols-outlined">{t.icon}</span>
                        <span className="notif-tipo-label">{t.label}</span>
                        <span className="notif-tipo-num">{conteo(t.id)}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
