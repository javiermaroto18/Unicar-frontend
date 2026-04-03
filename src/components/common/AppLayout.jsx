import '../../styles/AppLayout.css';
import Sidebar from './Sidebar.jsx';
import Topbar from './Topbar.jsx';

export default function AppLayout({ user, activeHref, hasNotifications, showSearch = false, onSearch, onPublish, children }) {
    return (
        <div className="app-layout">
            <Sidebar user={user} activeHref={activeHref} onPublish={onPublish} />
            <main className="app-layout-main">
                <Topbar user={user} hasNotifications={hasNotifications} showSearch={showSearch} onSearch={onSearch} />
                <div className="app-layout-content">
                    {children}
                </div>
            </main>
        </div>
    );
}