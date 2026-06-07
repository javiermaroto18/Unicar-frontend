import { useNavigate } from 'react-router-dom';

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { tripService } from '../../api/tripService';

import AppLayout from '../common/AppLayout.jsx';
import PageHeader from '../common/PageHeader.jsx';
import MyTripsSegmentedControl from '../trips/MyTripsSegmentedControl.jsx';
import MyTripsList from '../trips/MyTripsList.jsx';

export default function TripsPage() {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('passenger');
    const navigate = useNavigate();
    
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMyTrips = async () => {
            setIsLoading(true);
            try {
                let datosCrudos = [];
                
                if (activeTab === 'passenger') {
                    const response = await tripService.getMyBookings();
                    datosCrudos = response.data || response;
                } else {
                    const response = await tripService.getMyPublishedTrips();
                    datosCrudos = response.data || response;
                }

                const viajesAdaptados = datosCrudos.map(item => {
                    const trip = activeTab === 'passenger' && item.trip ? item.trip : item;

                    let horaSalida = '--:--';
                    let horaLlegada = '--:--';
                    if (trip.departure_time) {
                        const fechaLimpia = trip.departure_time.replace('T', ' ');
                        horaSalida = fechaLimpia.split(' ')[1]?.substring(0, 5) || '--:--';
                        
                        if (horaSalida !== '--:--') {
                            let [h, m] = horaSalida.split(':').map(Number);
                            m += 40;
                            if (m >= 60) { h = (h + 1) % 24; m -= 60; }
                            horaLlegada = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
                        }
                    }

                    const dateObj = trip.departure_time ? new Date(trip.departure_time) : new Date();
                    const dateLabel = `${dateObj.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' })}, ${horaSalida}`;

                    const conductor = trip.driver || trip.user || { name: 'Conductor', avatar: null };

                    const isCancelled = activeTab === 'passenger' ? item.status === 'cancelled' : trip.status === 'cancelled';
                    
                    let estadoFinal = 'completed';
                    if (isCancelled) {
                        estadoFinal = 'cancelled';
                    } else if (trip.status === 'scheduled') {
                        estadoFinal = 'upcoming';
                    }

                    return {
                        id: trip.id,
                        status: estadoFinal, // Ahora puede ser 'upcoming', 'completed' o 'cancelled'
                        dateLabel: dateLabel.charAt(0).toUpperCase() + dateLabel.slice(1),
                        image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80',
                        origin: { place: trip.origin, time: horaSalida },
                        destination: { place: trip.destination, time: horaLlegada },
                        driver: conductor,
                        price: Number(trip.price_per_seat || 0).toFixed(2)
                    };
                });

                setTrips(viajesAdaptados);
            } catch (error) {
                console.error("Error cargando el historial de viajes:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchMyTrips();
    }, [activeTab]);


    function handleViewTicket(trip) {
        navigate(`/ticket/${trip.id}`);
    }

    function handleViewDetails(trip) {
        if (activeTab === 'driver') {
            navigate(`/manage-trip/${trip.id}`);
        } else {
            if (trip.status === 'completed') { navigate(`/ticket/${trip.id}`); }// Si el viaje ya se hizo, le mandamos directamente al recibo/ticket
            else { navigate(`/trip-details/${trip.id}`); }
        }
    }

    function handleLoadMore() {
        console.log("Cargar más viajes clickeado");
    }

    return (
        <AppLayout
            activeHref="/trips"
            hasNotifications
            onPublish={() => navigate('/publish')}
        >
            <PageHeader
                title="Mis Viajes"
                subtitle="Gestiona tus trayectos programados y el historial de viajes."
            />

            <MyTripsSegmentedControl
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            {isLoading ? (
                 <div style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>sync</span>
                    <p style={{ marginTop: '1rem' }}>Cargando tu historial...</p>
                 </div>
            ) : trips.length > 0 ? (
                <MyTripsList
                    trips={trips}
                    onViewTicket={handleViewTicket}
                    onViewDetails={handleViewDetails}
                    onLoadMore={handleLoadMore}
                    isDriver={activeTab === 'driver'}
                />
            ) : (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>event_busy</span>
                    <p style={{ marginTop: '1rem' }}>
                        {activeTab === 'passenger' 
                            ? 'Aún no has reservado ningún viaje.' 
                            : 'Aún no has publicado ningún viaje.'}
                    </p>
                </div>
            )}
        </AppLayout>
    );
}