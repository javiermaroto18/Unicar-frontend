import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Sidebar.css';

const NAV_LINKS = [
    { icon: 'home',            label: 'Inicio',         href: '/dashboard' },
    { icon: 'calendar_today',  label: 'Mis Reservas',   href: '/trips' },
    { icon: 'chat_bubble',     label: 'Chat',           href: '/chat',         filled: true },
    { icon: 'notifications',   label: 'Notificaciones', href: '/notifications' },
    { icon: 'manage_accounts', label: 'Perfil',         href: '/profile' },
];

const SHORTCUTS = [
    { label: 'Campus Norte' },
    { label: 'CC City Center' },
];

// 1. Quitamos "user" de las props que recibe el componente
export default function Sidebar({ activeHref = '/dashboard', onPublish }) {
    
    // 2. Extraemos el usuario real de nuestro estado global
    const { user } = useAuth();

    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="sidebar-logo-icon">
                    <span className="material-symbols-outlined">directions_car</span>
                </div>
                <h1 className="sidebar-logo-text">UniCar</h1>
            </div>

            <div className="sidebar-profile">
                {/* 3. Comprobamos que el usuario ya ha cargado */}
                {user ? (
                    <div className="sidebar-profile-card">
                        {/* Si tiene avatar, lo mostramos. Si no, mostramos un icono por defecto */}
                        {user.avatar ? (
                            <img
                                className="sidebar-profile-avatar"
                                src={user.avatar}
                                alt={`Foto de perfil de ${user.name}`}
                            />
                        ) : (
                            <span 
                                className="material-symbols-outlined sidebar-profile-avatar" 
                                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#374151', color: '#9CA3AF' }}
                            >
                                person
                            </span>
                        )}
                        <div>
                            <span className="sidebar-profile-name">{user.name}</span>
                            <span className="sidebar-profile-role">Perfil</span>
                        </div>
                    </div>
                ) : (
                    <div className="sidebar-profile-card">
                        <span className="sidebar-profile-name">Cargando...</span>
                    </div>
                )}
            </div>

            <nav className="sidebar-nav">
                {NAV_LINKS.map(({ icon, label, href, filled }) => (
                    <Link
                        key={href}
                        to={href}
                        className={`sidebar-nav-item${activeHref === href ? ' sidebar-nav-item-active' : ''}`}
                    >
                        <span className={`material-symbols-outlined${filled ? ' filled-icon' : ''}`}>
                            {icon}
                        </span>
                        {label}
                    </Link>
                ))}
            </nav>

            <div className="sidebar-shortcuts">
                <p className="sidebar-shortcuts-label">Atajos Rápidos</p>
                {SHORTCUTS.map(({ label }) => (
                    <button key={label} className="sidebar-shortcut-btn">
                        <span className="material-symbols-outlined">location_on</span>
                        {label}
                    </button>
                ))}
            </div>

            <div className="sidebar-footer">
                <button className="sidebar-publish-btn" onClick={onPublish}>
                    <span className="material-symbols-outlined">add_circle</span>
                    Publicar viaje
                </button>
            </div>
        </aside>
    );
}