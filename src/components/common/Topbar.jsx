import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NotificationsDropdown from '../notifications/NotificationsDropdown.jsx';
import '../../styles/Topbar.css';

export default function Topbar({ hasNotifications = false, showSearch = false, onSearch }) {
    const [query, setQuery] = useState('');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Enviamos la búsqueda en tiempo real cada vez que el usuario teclea
    function handleChange(e) {
        const newValue = e.target.value;
        setQuery(newValue);
        onSearch?.(newValue); 
    }

    // Mantenemos la función del enter porque hay usuarios que prefieren escribir y darle al enter
    function handleKeyDown(e) {
        if (e.key === 'Enter') onSearch?.(query);
    }

    async function handleLogout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        navigate('/auth');
        await logout();
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
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className="topbar-right">
                {user ? (
                    <>
                        <NotificationsDropdown />

                        <div className="topbar-user">
                            <span className="topbar-user-greeting">
                                Hola, <strong>{user.name}</strong>
                            </span>
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