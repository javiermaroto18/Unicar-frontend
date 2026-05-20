import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../styles/Topbar.css';

export default function Topbar({ hasNotifications = false, showSearch = false, onSearch }) {
    const [query, setQuery] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    function handleKeyDown(e) {
        if (e.key === 'Enter') onSearch?.(query);
    }

    async function handleLogout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        await logout();
        navigate('/auth');
    }

    return (
        <header className={`topbar${showSearch ? ' topbar-with-search' : ''}`}>
            {showSearch && (
                <div className="topbar-left">
                    <div className="topbar-search">
                        <div className="topbar-search-wrap">
                            <span className="material-symbols-outlined topbar-search-icon">search</span>
                            <input
                                className="topbar-search-input"
                                type="text"
                                placeholder="¿A dónde vas hoy? (o busca por conductor)"
                                value={query}
                                onChange={e => setQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="topbar-right">
                {user ? (
                    <>
                        <button className="topbar-notif-btn" aria-label="Notificaciones">
                            <span className="material-symbols-outlined">notifications</span>
                            {hasNotifications && <span className="topbar-notif-dot" />}
                        </button>

                        <div className="topbar-user">
                            <span className="topbar-user-greeting">
                                Hola, <strong>{user.name}</strong>
                            </span>
                            {/* {user.avatar ? (
                                <img
                                    className="topbar-user-avatar"
                                    src={user.avatar}
                                    alt={`Avatar de ${user.name}`}
                                />
                            ) : (
                                <span className="material-symbols-outlined topbar-user-avatar-default">
                                    person
                                </span>
                            )} */}
                            <button onClick={handleLogout} className="topbar-logout-btn">
                                Salir
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="topbar-auth-links">
                        <Link to="/auth" className="topbar-auth-link">
                            Iniciar sesión
                        </Link>
                        <Link to="/auth" className="topbar-auth-link topbar-auth-link-solid">
                            Registrarse
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}