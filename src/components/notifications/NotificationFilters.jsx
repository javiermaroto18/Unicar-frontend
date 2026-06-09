// Control segmentado para filtrar notificaciones. 'noLeidas' muestra un contador.
const TABS = [
    { id: 'todas',     label: 'Todas' },
    { id: 'noLeidas',  label: 'No leídas' },
];

export default function NotificationFilters({ filtroActivo, onCambiarFiltro, totalNoLeidas, onMarcarTodas }) {
    return (
        <div className="notif-barra">
            <div className="notif-tabs" role="tablist">
                {TABS.map(({ id, label }) => (
                    <button
                        key={id}
                        type="button"
                        role="tab"
                        aria-selected={filtroActivo === id}
                        className={`notif-tab${filtroActivo === id ? ' notif-tab--activa' : ''}`}
                        onClick={() => onCambiarFiltro(id)}
                    >
                        {label}
                        {id === 'noLeidas' && totalNoLeidas > 0 && (
                            <span className="notif-tab-contador">({totalNoLeidas})</span>
                        )}
                    </button>
                ))}
            </div>

            {/* Acción global: solo activa si hay algo que marcar */}
            <button
                type="button"
                className="notif-marcar-todas"
                onClick={onMarcarTodas}
                disabled={totalNoLeidas === 0}
            >
                Marcar todas como leídas
            </button>
        </div>
    );
}
