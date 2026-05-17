import '../../styles/AppLayout.css';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

export default function AppLayout({ activeHref, hasNotifications, showSearch = false, onSearch, onPublish, children }) {
    return (
        <div className="app-layout">
            {/* Pasamos las props correctas sin textos de ejemplo */}
            <Sidebar activeHref={activeHref} onPublish={onPublish} />
            
            <main className="app-layout-main">
                {/* Topbar ya no necesita recibir el user, lo coge él mismo del Contexto */}
                <Topbar hasNotifications={hasNotifications} showSearch={showSearch} onSearch={onSearch} />
                
                <div className="app-layout-content">
                    {children}
                </div>
            </main>
        </div>
    );
}