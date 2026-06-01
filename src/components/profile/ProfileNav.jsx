import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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

async function handleLogout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/auth');
    await logout();
}

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

export default function ProfileNav({ activeSection, onSectionChange }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Si no hay usuario (está cargando), no renderizamos
    if (!user) return null;

    const handleLogout = async () => {
        await logout();
        navigate('/auth');
    };

    return (
        <nav className="profile-nav">
            <div className="profile-nav-usuario">
                <div className="profile-nav-avatar-contenedor">
                    {/* Sirve para mostrar el avatar del usuario o un fallback si no tiene */}
                    {user.avatar ? (
                        <img className="profile-nav-avatar" src={user.avatar} alt={user.name} />
                    ) : (
                         <span className="material-symbols-outlined profile-nav-avatar" style={{display:'flex', alignItems:'center', justifyContent:'center', background:'#374151', color:'white'}}>person</span>
                    )}
                    
                    {/* Solo mostramos la insignia si está verificado en base de datos */}
                    {user.is_verified_driver ? (
                        <div className="profile-nav-verificado-insignia" title="Conductor Verificado">
                            <span className="material-symbols-outlined">verified</span>
                        </div>
                    ) : null}
                </div>
                <div>
                    <p className="profile-nav-nombre">{user.name}</p>
                    <p className="profile-nav-email">{user.email}</p>
                </div>
            </div>

            {/* Dejamos las estrellas hardcodeadas por ahora hasta tener base de datos de reviews */}
            <div className="profile-nav-puntuacion">
                <StarRating score={4.8} />
                <span className="profile-nav-valor-puntuacion">
                    4.8 <span className="profile-nav-cantidad-viajes">(12 viajes)</span>
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
                            {/* Ocultamos el warning si ya está verificado */}
                            {warn && user.is_verified_driver === 0 && <span className="pnav-item-insignia pnav-item-insignia--advertencia">!</span>}
                        </button>
                    ))}
                </div>
            ))}

            <div className="profile-nav-separador" />

            <button className="pnav-item pnav-item--danger" onClick={handleLogout}>
                <span className="material-symbols-outlined">logout</span>
                Cerrar sesión
            </button>
        </nav>
    );
}