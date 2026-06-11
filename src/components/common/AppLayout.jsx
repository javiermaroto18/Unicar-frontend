import '../../styles/AppLayout.css';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';
import BottomNav from './BottomNav.jsx';

export default function AppLayout({ activeHref, hasNotifications, showSearch = false, onSearch, onPublish, hideTopbar = false, children }) {
    return (
        <div className="app-layout">
            <Sidebar activeHref={activeHref} onPublish={onPublish} />

            <main className="app-layout-main">
                {/* Topbar coge el user del Contexto */}
                {!hideTopbar && (
                    <Topbar hasNotifications={hasNotifications} showSearch={showSearch} onSearch={onSearch} />
                )}

                <div className="app-layout-content">
                    {children}
                </div>
            </main>

            <BottomNav activeHref={activeHref} />
        </div>
    );
}