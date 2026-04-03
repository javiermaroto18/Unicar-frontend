import { useState } from 'react';

import AppLayout                from '../common/AppLayout.jsx';
import PageHeader               from '../common/PageHeader.jsx';
import MyTripsSegmentedControl  from '../trips/MyTripsSegmentedControl.jsx';
import MyTripsList              from '../trips/MyTripsList.jsx';

import { MOCK_USER, MOCK_MY_TRIPS } from '../../utils/mockData.js';

export default function TripsPage() {
    const [activeTab, setActiveTab] = useState('passenger');

    // Cuando el backend esté listo, esto será una llamada al servicio
    // filtrada por rol (passenger | driver) y paginada.
    const visibleTrips = MOCK_MY_TRIPS;

    function handleViewTicket(trip) {
        window.location.href = `/ticket/${trip.id}`;
    }

    function handleViewDetails(trip) {
        window.location.href = `/trip/${trip.id}`;
    }

    function handleLoadMore() {
        // conectará con paginación de la API
    }

    return (
        <AppLayout
            user={MOCK_USER}
            activeHref="/trips"
            hasNotifications
            onPublish={() => { window.location.href = '/publish'; }}
        >
            <PageHeader
                title="Mis Viajes"
                subtitle="Gestiona tus trayectos programados y el historial de viajes."
            />

            <MyTripsSegmentedControl
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <MyTripsList
                trips={visibleTrips}
                onViewTicket={handleViewTicket}
                onViewDetails={handleViewDetails}
                onLoadMore={handleLoadMore}
            />
        </AppLayout>
    );
}