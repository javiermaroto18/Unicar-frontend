import { useState } from 'react';

import AppLayout    from '../common/AppLayout.jsx';
import VerifyBanner from '../dashboard/VerifyBanner.jsx';
import TripFilters  from '../dashboard/TripFilter.jsx';
import TripGrid     from '../dashboard/TripGrid.jsx';
import Pagination   from '../common/Pagination.jsx';

import { MOCK_USER, MOCK_TRIPS } from '../../utils/mockData.js';

const TRIPS_PER_PAGE = 6;
const TOTAL_PAGES    = 8;

export default function DashboardPage() {
    const [activeTab,   setActiveTab]   = useState('Todos');
    const [currentPage, setCurrentPage] = useState(1);

    function handleReserve(trip) {
        window.location.href = `/checkout/${trip.id}`;
    }

    function handlePublish() {
        window.location.href = '/publish';
    }

    function handleSearch(query) {
        console.log('search:', query);
    }

    function handleTabChange(tab) {
        setActiveTab(tab);
        setCurrentPage(1);
    }

    return (
        <AppLayout
            user={MOCK_USER}
            activeHref="/dashboard"
            hasNotifications
            showSearch
            onSearch={handleSearch}
            onPublish={handlePublish}
        >
            <VerifyBanner />

            <TripFilters
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onFilterOpen={() => {}}
            />

            <TripGrid trips={MOCK_TRIPS} onReserve={handleReserve} />

            <Pagination
                currentPage={currentPage}
                totalPages={TOTAL_PAGES}
                onPageChange={setCurrentPage}
            />
        </AppLayout>
    );
}