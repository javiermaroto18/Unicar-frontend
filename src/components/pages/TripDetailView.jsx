import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { tripService } from '../../api/tripService';
import { bookingService } from '../../api/bookingService';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext.jsx';
import { useConfirm } from '../../context/ConfirmContext.jsx';

import Topbar from '../common/Topbar.jsx'; 
import Footer from '../common/Footer.jsx'; 

import { TripRoute } from '../trip-details/TripRoute.jsx';
import { DriverCard } from '../trip-details/DriverCard.jsx';
import { MapPlaceholder } from '../trip-details/MapPlaceholder.jsx';
import { BookingWidget } from '../trip-details/BookingWidget.jsx';
import DriverManagementWidget from '../trip-details/DriverManagementWidget.jsx';
import { PassengerManagementWidget } from '../trip-details/PassengerManagementWidget.jsx';

import '../../styles/Trip-detail-view.css';

export default function TripDetailView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const toast = useToast();
    const confirm = useConfirm();

    const [trip, setTrip] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isProcessing, setIsProcessing] = useState(false); 

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await tripService.getTripById(id);
                const data = response.data || response;
                
                let horaSalida = '--:--';
                let isPast = false;

                if (data.departure_time) {
                    const dateObj = new Date(data.departure_time);
                    // Comprobamos si la fecha del viaje ya es pasada
                    isPast = dateObj < new Date(); 
                    
                    if (!isNaN(dateObj)) {
                        horaSalida = dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    }
                }

                // Lógica de estado inteligente para que el DriverManagementWidget reciba el dato correcto
                let estadoFinal = data.status;
                if (data.status !== 'cancelled' && (data.status === 'completed' || isPast)) {
                    estadoFinal = 'completed';
                }

                setTrip({
                    id: data.id,
                    status: estadoFinal, 
                    driverId: data.driver?.id || data.driver_id, 
                    origin: data.origin,
                    destination: data.destination,
                    time: horaSalida,
                    pricePerSeat: Number(data.price_per_seat || 0),
                    seatsAvailable: data.seats_available ?? data.seats_total,
                    seatsTotal: data.seats_total,
                    driver: data.driver || data.user || { name: 'Conductor anónimo' },
                    bookings: data.bookings || []
                });
            } catch (error) {
                console.error("Error al cargar detalles:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTripDetails();
    }, [id]);

    const handleConfirmBooking = async (selectedSeats) => {
        setIsProcessing(true);
        try {
            await bookingService.createBooking({ trip_id: trip.id, seats_booked: selectedSeats });
            toast.success("¡Reserva confirmada con éxito!");
            navigate('/trips');
        } catch (error) {
            toast.error("No se pudo completar la reserva.");
        } finally {
            setIsProcessing(false);
        }
    };

    const handleCancelTrip = async () => {
        const ok = await confirm({
            title: 'Cancelar viaje',
            message: 'Se cancelará el viaje y se avisará a los pasajeros con reserva. Esta acción no se puede deshacer.',
            confirmText: 'Cancelar viaje',
            cancelText: 'Volver',
            variant: 'danger',
            icon: 'directions_car',
        });
        if (!ok) return;

        setIsProcessing(true);
        try {
            await tripService.cancelTrip(trip.id);
            toast.success("Viaje cancelado correctamente.");
            navigate('/trips');
        } catch (error) {
            toast.error("Hubo un error al cancelar el viaje.");
            setIsProcessing(false);
        }
    };

    const handleCancelBooking = async (bookingId) => {
        const ok = await confirm({
            title: 'Cancelar tu plaza',
            message: 'Se cancelará tu reserva y se liberará la plaza. Se aplicarán las políticas de cancelación vigentes.',
            confirmText: 'Cancelar plaza',
            cancelText: 'Volver',
            variant: 'danger',
            icon: 'event_busy',
        });
        if (!ok) return;

        setIsProcessing(true);
        try {
            await bookingService.cancelBooking(bookingId);
            toast.success("Tu reserva ha sido cancelada.");
            navigate('/trips');
        } catch (error) {
            console.error("Error devuelto por Laravel al cancelar:", error);
            toast.error("Hubo un error al cancelar tu reserva.");
            setIsProcessing(false);
        }
    };

    if (isLoading) return <div className="loading-state">Cargando viaje...</div>;
    if (!trip) return <div className="error-state">Viaje no encontrado</div>;

    const esElConductor = Number(user?.id) === Number(trip.driverId);

    // Ignoramos las reservas canceladas para permitirle volver a reservar
    const miReserva = trip.bookings.find(b => 
        Number(b.passenger?.id || b.passenger_id) === Number(user?.id) && 
        b.status !== 'cancelled'
    );
    const yaEstaReservado = !!miReserva;

    const isManageRoute = location.pathname.includes('/manage-trip');
    const isDetailsRoute = location.pathname.includes('/trip-details');
    const isCheckoutRoute = location.pathname.includes('/checkout');

    if (esElConductor && !isManageRoute) {
        setTimeout(() => navigate(`/manage-trip/${trip.id}`, { replace: true }), 0);
        return null; 
    } 
    
    if (!esElConductor && yaEstaReservado && !isDetailsRoute) {
        setTimeout(() => navigate(`/trip-details/${trip.id}`, { replace: true }), 0);
        return null; 
    }

    if (!esElConductor && !yaEstaReservado && !isCheckoutRoute) {
        setTimeout(() => navigate(`/checkout/${trip.id}`, { replace: true }), 0);
        return null; 
    }

    return (
        <>
            <Topbar /> 
            <main className="main">
                <div className="main__inner">
                    <div className="layout-cols">
                        
                        <div className="col-left">
                            <h1 className="page-title">
                                {esElConductor ? 'Panel de Gestión del Viaje' : yaEstaReservado ? 'Tu billete para este viaje' : 'Detalles de tu viaje'}
                            </h1>
                            <TripRoute origin={trip.origin} destination={trip.destination} time={trip.time} />
                            <DriverCard driver={trip.driver} />
                            <MapPlaceholder />
                        </div>

                        {/* Renderizado condicional */}
                        {esElConductor ? (
                            <DriverManagementWidget trip={trip} onCancelTrip={handleCancelTrip} />
                        ) : yaEstaReservado ? (
                            <PassengerManagementWidget 
                                reserva={miReserva} 
                                trip={trip} 
                                onCancelBooking={handleCancelBooking} 
                            />
                        ) : (
                            <BookingWidget 
                                pricePerSeat={trip.pricePerSeat} 
                                maxSeats={trip.seatsAvailable} 
                                onConfirm={handleConfirmBooking}
                                isProcessing={isProcessing}
                            />
                        )}

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}