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

export default function Sidebar({ activeHref = '/dashboard', user, onPublish }) {
    return (
        <aside className="sidebar">
            <div className="sidebar-brand">
                <div className="sidebar-logo-icon">
                    <span className="material-symbols-outlined">directions_car</span>
                </div>
                <h1 className="sidebar-logo-text">UniCar</h1>
            </div>

            <div className="sidebar-profile">
                <div className="sidebar-profile-card">
                    <img
                        className="sidebar-profile-avatar"
                        src={user.avatar}
                        alt={`Foto de perfil de ${user.name}`}
                    />
                    <div>
                        <span className="sidebar-profile-name">{user.name}</span>
                        <span className="sidebar-profile-role">Perfil</span>
                    </div>
                </div>
            </div>

            <nav className="sidebar-nav">
                {NAV_LINKS.map(({ icon, label, href, filled }) => (
                    <a
                        key={href}
                        href={href}
                        className={`sidebar-nav-item${activeHref === href ? ' sidebar-nav-item-active' : ''}`}
                    >
                        <span className={`material-symbols-outlined${filled ? ' filled-icon' : ''}`}>
                            {icon}
                        </span>
                        {label}
                    </a>
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