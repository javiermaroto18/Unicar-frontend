import { useState } from 'react';
import '../../styles/Topbar.css';

export default function Topbar({ user, hasNotifications = false, showSearch = false, onSearch }) {
    const [query, setQuery] = useState('');

    function handleKeyDown(e) {
        if (e.key === 'Enter') onSearch?.(query);
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
                <button className="topbar-notif-btn" aria-label="Notificaciones">
                    <span className="material-symbols-outlined">notifications</span>
                    {hasNotifications && <span className="topbar-notif-dot" />}
                </button>

                <div className="topbar-user">
                    <span className="topbar-user-greeting">
                        Hola, <strong>{user.name}</strong>
                    </span>
                    <img
                        className="topbar-user-avatar"
                        src={user.avatar}
                        alt={`Avatar de ${user.name}`}
                    />
                </div>
            </div>
        </header>
    );
}