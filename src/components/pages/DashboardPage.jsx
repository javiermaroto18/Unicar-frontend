import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { tripService } from '../../api/tripService';

import AppLayout    from '../common/AppLayout.jsx';
import VerifyBanner from '../dashboard/VerifyBanner.jsx';
import TripFilters  from '../dashboard/TripFilter.jsx';
import TripGrid     from '../dashboard/TripGrid.jsx';
import Pagination   from '../common/Pagination.jsx';

export default function DashboardPage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const [activeTab,   setActiveTab]   = useState('date_asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalPages,  setTotalPages]  = useState(1);

    const [trips, setTrips] = useState([]);
    const [isLoadingTrips, setIsLoadingTrips] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            setIsLoadingTrips(true);
            try {
                const response = await tripService.getAllTrips(currentPage, activeTab, searchQuery);
                
                const viajesReales = response.data?.data || response.data || response;
                const metaInfo = response.data?.meta || response.meta;

                const viajesAdaptados = viajesReales.map(trip => {
                    let horaSalida = '--:--';
                    let horaLlegada = '--:--';
                    
                    if (trip.departure_time) {
                        const fechaLimpia = trip.departure_time.replace('T', ' ');
                        horaSalida = fechaLimpia.split(' ')[1]?.substring(0, 5) || '--:--';

                        if (horaSalida !== '--:--') {
                            let [h, m] = horaSalida.split(':').map(Number);
                            m += 40;
                            if (m >= 60) {
                                h = (h + 1) % 24;
                                m -= 60;
                            }
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

                if (metaInfo && metaInfo.last_page) {
                    setTotalPages(metaInfo.last_page);
                } else if (response.last_page) {
                     setTotalPages(response.last_page);
                } else {
                     setTotalPages(1);
                }
            } catch (error) {
                console.error("Error cargando los viajes desde el servidor:", error);
            } finally {
                setIsLoadingTrips(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchTrips();
        }, 500); // Retardo de 500ms para evitar demasiadas llamadas en la busqueda

        // Función de limpieza: cancela el timeout si el usuario escribe otra letra
        return () => clearTimeout(delayDebounceFn);

    }, [currentPage, activeTab, searchQuery]);

    function handleReserve(trip) {
        navigate(`/checkout/${trip.id}`); // navegación SPA: sin recarga completa ni refetch de /me
    }

    function handlePublish() {
        navigate('/publish');
    }

    // Al buscar reseteamos a la página 1 para mostrar los resultados desde el principio
    function handleSearch(query) {
        setSearchQuery(query);
        setCurrentPage(1);
    }

    function handleTabChange(tab) {
        setActiveTab(tab);
        setCurrentPage(1); 
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

            <TripFilters activeFilter={activeTab} onFilterChange={handleTabChange} />

            {isLoadingTrips ? (
                <div style={{ padding: '3rem', textAlign: 'center', color: '#9CA3AF' }}>
                    <span className="material-symbols-outlined" style={{ fontSize: '2rem' }}>sync</span>
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
                    <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>search_off</span>
                    <p style={{ marginTop: '1rem' }}>No hemos encontrado viajes con esa búsqueda.</p>
                </div>
            )}
        </AppLayout>
    );
}