import '../../styles/ProfileNav.css';

const NAV_SECTIONS = [
    {
        label: 'Cuenta',
        items: [
            { key: 'info', icon: 'person', label: 'Información personal' },
            { key: 'verification', icon: 'shield_person', label: 'Verificación', warn: true },
            { key: 'vehicle', icon: 'directions_car', label: 'Mi vehículo' },
        ],
    },
    {
        label: 'Preferencias',
        items: [
            { key: 'trip-prefs', icon: 'tune', label: 'Preferencias de viaje' },
            { key: 'ratings', icon: 'star', label: 'Valoraciones' },
        ],
    },
    {
        label: 'Ajustes',
        items: [
            { key: 'security', icon: 'lock', label: 'Seguridad' },
        ],
    },
];

function StarRating({ score }) {
    const full = Math.floor(score);
    const half = score % 1 >= 0.5;

    return (
        <div className="profile-nav-estrellas">
            {Array.from({ length: full }).map((_, i) => (
                <span key={i} className="material-symbols-outlined pn-star pn-star--full">star</span>
            ))}
            {half && <span className="material-symbols-outlined pn-star pn-star--half">star_half</span>}
        </div>
    );
}

export default function ProfileNav({ user, activeSection, onSectionChange, onLogout }) {
    return (
        <nav className="profile-nav">
            <div className="profile-nav-usuario">
                <div className="profile-nav-avatar-contenedor">
                    <img className="profile-nav-avatar" src={user.avatar} alt={user.name} />
                    <div className="profile-nav-verificado-insignia" title="Verificado">
                        <span className="material-symbols-outlined">verified</span>
                    </div>
                </div>
                <div>
                    <p className="profile-nav-nombre">{user.name}</p>
                    <p className="profile-nav-email">{user.email}</p>
                </div>
            </div>

            <div className="profile-nav-puntuacion">
                <StarRating score={user.rating} />
                <span className="profile-nav-valor-puntuacion">
                    {user.rating}{' '}
                    <span className="profile-nav-cantidad-viajes">({user.tripCount} viajes)</span>
                </span>
            </div>

            <div className="profile-nav-separador" />

            {NAV_SECTIONS.map(({ label, items }) => (
                <div key={label}>
                    <p className="profile-nav-etiqueta-seccion">{label}</p>
                    {items.map(({ key, icon, label: itemLabel, warn }) => (
                        <button
                            key={key}
                            className={`pnav-item${activeSection === key ? ' pnav-item--active' : ''}`}
                            onClick={() => onSectionChange(key)}
                        >
                            <span className="material-symbols-outlined">{icon}</span>
                            {itemLabel}
                            {warn && <span className="pnav-item-insignia pnav-item-insignia--advertencia">!</span>}
                        </button>
                    ))}
                </div>
            ))}

            <div className="profile-nav-separador" />

            <button className="pnav-item pnav-item--danger" onClick={onLogout}>
                <span className="material-symbols-outlined">logout</span>
                Cerrar sesión
            </button>
        </nav>
    );
}
