import { Link, useNavigate } from 'react-router-dom';
import '../../styles/BottomNav.css';

const LEFT_LINKS = [
    { icon: 'home',            label: 'Inicio',       href: '/dashboard' },
    { icon: 'calendar_today',  label: 'Mis Reservas', href: '/trips' },
];

const RIGHT_LINKS = [
    { icon: 'chat_bubble',     label: 'Chat',   href: '/chat' },
    { icon: 'manage_accounts', label: 'Perfil', href: '/profile' },
];

function NavLink({ icon, label, href, active }) {
    return (
        <Link
            to={href}
            className={`bottomnav-item${active ? ' bottomnav-item-active' : ''}`}
            aria-label={label}
        >
            <span className="material-symbols-outlined">{icon}</span>
        </Link>
    );
}

export default function BottomNav({ activeHref }) {
    const navigate = useNavigate();

    return (
        <nav className="bottomnav">
            {LEFT_LINKS.map(link => (
                <NavLink key={link.href} {...link} active={activeHref === link.href} />
            ))}

            <button
                className="bottomnav-publish-btn"
                onClick={() => navigate('/publish')}
                aria-label="Publicar viaje"
            >
                <span className="material-symbols-outlined">add</span>
            </button>

            {RIGHT_LINKS.map(link => (
                <NavLink key={link.href} {...link} active={activeHref === link.href} />
            ))}
        </nav>
    );
}
