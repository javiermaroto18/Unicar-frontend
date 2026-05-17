import { useState } from 'react';

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
    const searchParams = new URLSearchParams(window.location.search);
    const sectionFromUrl = searchParams.get('section') || 'info';
    const [activeSection, setActiveSection] = useState(sectionFromUrl);

    return (
        <AppLayout
            user={MOCK_USER}
            activeHref="/profile"
            hasNotifications
            onPublish={() => { window.location.href = '/publish'; }}
        >
            {/*
             * El perfil tiene su propio layout interno de dos columnas
             * (subnav + content) que vive dentro del app-layout__content.
             * Por eso necesita anular el padding del contenedor padre.
             */}
            <div className="profile-layout">
                <ProfileNav
                    user={MOCK_PROFILE_USER}
                    activeSection={activeSection}
                    onSectionChange={setActiveSection}
                    onLogout={() => { window.location.href = '/login'; }}
                />
                <div className="profile-content">
                    {SECTION_MAP[activeSection]}
                </div>
            </div>
        </AppLayout>
    );
}
