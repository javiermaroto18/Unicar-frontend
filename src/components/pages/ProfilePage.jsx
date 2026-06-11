import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import AppLayout from '../common/AppLayout';
import ProfileNav from '../profile/ProfileNav';
import ProfileSectionInfo from '../profile/ProfileSectionInfo';
import ProfileSectionVerification from '../profile/ProfileSectionVerification';
import ProfileSectionVehicle from '../profile/ProfileSectionVehicle';
import ProfileSectionTripPrefs from '../profile/ProfileSectionTripPrefs';
import ProfileSectionRatings from '../profile/ProfileSectionRatings';
import ProfileSectionSecurity from '../profile/ProfileSectionSecurity';

import { MOCK_USER } from '../../utils/mockData';
import { MOCK_PROFILE_USER, MOCK_VEHICLE, MOCK_REVIEWS } from '../../utils/mockDataProfile';

import '../../styles/ProfileShared.css';

const SECTION_MAP = {
    'info': <ProfileSectionInfo user={MOCK_PROFILE_USER} />,
    'verification': <ProfileSectionVerification />,
    'vehicle': <ProfileSectionVehicle vehicle={MOCK_VEHICLE} />,
    'trip-prefs': <ProfileSectionTripPrefs />,
    'ratings': <ProfileSectionRatings reviews={MOCK_REVIEWS} overallScore={4.8} totalCount={23} />,
    'security': <ProfileSectionSecurity />,
};

export default function ProfilePage() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    const searchParams = new URLSearchParams(window.location.search);
    const sectionFromUrl = searchParams.get('section') || 'info';
    const [activeSection, setActiveSection] = useState(sectionFromUrl);
    const [menuAbierto, setMenuAbierto] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
        } finally {
            navigate('/auth');
        }
    };

    // Manejamos el cambio de seccion con una funcion que actualiza la URL del navegador
    const handleSectionChange = (newSection) => {
        setActiveSection(newSection);
        setMenuAbierto(false);

        // Actualiza la URL del navegador sin recargar la página
        const newUrl = `${window.location.pathname}?section=${newSection}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    };

    return (
        <AppLayout
            user={MOCK_USER}
            activeHref="/profile"
            hasNotifications
            onPublish={() => navigate('/publish')}
            hideTopbar={true}
        >
            <div className="profile-layout">
                <button className="profile-menu-btn" onClick={() => setMenuAbierto(true)}>
                    <span className="material-symbols-outlined">menu</span>
                    Secciones del perfil
                </button>

                {menuAbierto && (
                    <div className="profile-nav-fondo" onClick={() => setMenuAbierto(false)} />
                )}

                <ProfileNav
                    user={MOCK_PROFILE_USER}
                    activeSection={activeSection}
                    onSectionChange={handleSectionChange}
                    onLogout={handleLogout}
                    abierto={menuAbierto}
                />
                <div className="profile-content">
                    {SECTION_MAP[activeSection]}
                </div>
            </div>
        </AppLayout>
    );
}