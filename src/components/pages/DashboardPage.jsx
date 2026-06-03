import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { tripService } from '../../api/tripService';

import AppLayout    from '../common/AppLayout.jsx';
import VerifyBanner from '../dashboard/VerifyBanner.jsx';
import TripFilters  from '../dashboard/TripFilter.jsx';
import TripGrid     from '../dashboard/TripGrid.jsx';
import Pagination   from '../common/Pagination.jsx';

export default function DashboardPage() {
    const { user } = useAuth();

    const [activeTab,   setActiveTab]   = useState('Todos');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages,  setTotalPages]  = useState(1);

    // Estado para los datos reales del backend
    const [trips, setTrips] = useState([]);
    const [isLoadingTrips, setIsLoadingTrips] = useState(true);

    // Cargamos los viajes reales desde el backend al montar el componente
    useEffect(() => {
        const fetchTrips = async () => {
            setIsLoadingTrips(true);
            try {
                const response = await tripService.getAllTrips(currentPage, activeTab);
                const viajesReales = response.data || response; 

                // Transformamos el JSON de Laravel al formato de React
                const viajesAdaptados = viajesReales.map(trip => {
                    
                    let horaSalida = '--:--';
                    let horaLlegada = '--:--';
                    
                    if (trip.departure_time) {
                        const fechaLimpia = trip.departure_time.replace('T', ' ');
                        horaSalida = fechaLimpia.split(' ')[1]?.substring(0, 5) || '--:--';

                        // Sumamos 40 minutos a la llegada
                        if (horaSalida !== '--:--') {
                            let [h, m] = horaSalida.split(':').map(Number);
                            m += 40;
                            if (m >= 60) {
                                h = (h + 1) % 24; // Sumamos 1 hora y reiniciamos a 0 si pasa de las 23
                                m -= 60;          // Restamos los 60 minutos
                            }
                            // Formateamos la hora de llegada para que siempre tenga 2 dígitos
                            const hStr = h.toString().padStart(2, '0');
                            const mStr = m.toString().padStart(2, '0');
                            horaLlegada = `${hStr}:${mStr}`;
                        }
                    }

                    const conductor = trip.driver || trip.user || { 
                        name: 'Conductor anónimo', 
                        avatar: null, 
                        rating: 'Nuevo', 
                        faculty: 'Universidad' 
                    };

                    return {
                        id: trip.id,
                        departure_time: trip.departure_time,
                        driver: conductor,
                        origin: {
                            place: trip.origin,
                            time: horaSalida
                        },
                        destination: {
                            place: trip.destination,
                            time: horaLlegada
                        },
                        price: trip.price_per_seat,
                        seatsTotal: trip.seats_total,
                        seatsAvailable: trip.seats_available !== undefined ? trip.seats_available : trip.seats_total
                    };
                });

                setTrips(viajesAdaptados);

                if (response.meta && response.meta.last_page) {
                    setTotalPages(response.meta.last_page);
                }
            } catch (error) {
                console.error("Error cargando los viajes desde el servidor:", error);
            } finally {
                setIsLoadingTrips(false);
            }
        };

        fetchTrips();
    }, [currentPage, activeTab]); // Si el usuario cambia de página o de filtro, se vuelve a ejecutar

    function handleReserve(trip) {
        window.location.href = `/checkout/${trip.id}`;
    }

    function handlePublish() {
        window.location.href = '/publish';
    }

    function handleSearch(query) {
        console.log('Buscando:', query);
    }

    function handleTabChange(tab) {
        setActiveTab(tab);
        setCurrentPage(1); // Volvemos a la página 1 al cambiar de filtro
    }

    return (
        <AppLayout
            activeHref="/dashboard"
            hasNotifications
            showSearch
            onSearch={handleSearch}
            onPublish={handlePublish}
        >
            {user && !user.is_verified_driver && <VerifyBanner />}

            <TripFilters
                activeTab={activeTab}
                onTabChange={handleTabChange}
                onFilterOpen={() => {}}
            />

            {/* Renderizado condicional basado en la carga de datos */}
            {isLoadingTrips ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>sync</span>
                    <p style={{ marginTop: '1rem' }}>Buscando rutas disponibles...</p>
                </div>
            ) : trips.length > 0 ? (
                <>
                    <TripGrid trips={trips} onReserve={handleReserve} />
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    )}
                </>
            ) : (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>directions_car_off</span>
                    <p style={{ marginTop: '1rem' }}>No hay viajes disponibles para hoy con este filtro.</p>
                </div>
            )}
        </AppLayout>
    );
}