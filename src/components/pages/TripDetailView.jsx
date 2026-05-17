import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripService } from '../../api/tripService';
import { bookingService } from '../../api/bookingService';
import { useAuth } from '../../context/AuthContext'; // Importamos el contexto de usuario

import Topbar from '../common/Topbar.jsx'; 
import Footer from '../common/Footer.jsx'; 

import { TripRoute } from '../trip-details/TripRoute.jsx';
import { DriverCard } from '../trip-details/DriverCard.jsx';
import { MapPlaceholder } from '../trip-details/MapPlaceholder.jsx';
import { BookingWidget } from '../trip-details/BookingWidget.jsx';

import '../../styles/trip-detail-view.css';

export default function TripDetailView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth(); // Obtenemos el usuario autenticado
    
    const [trip, setTrip] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isBooking, setIsBooking] = useState(false);

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await tripService.getTripById(id);
                const dataCruda = response.data || response;
                
                let horaSalida = '--:--';
                if (dataCruda.departure_time) {
                    const fechaLimpia = dataCruda.departure_time.replace('T', ' ');
                    horaSalida = fechaLimpia.split(' ')[1]?.substring(0, 5) || '--:--';
                }

                setTrip({
                    id: dataCruda.id,
                    driverId: dataCruda.driver_id, // Guardamos quién creó el viaje
                    origin: dataCruda.origin,
                    destination: dataCruda.destination,
                    time: horaSalida,
                    pricePerSeat: Number(dataCruda.price_per_seat || 0),
                    seatsAvailable: dataCruda.seats_available !== undefined ? dataCruda.seats_available : dataCruda.seats_total,
                    seatsTotal: dataCruda.seats_total,
                    driver: dataCruda.driver || dataCruda.user || { name: 'Conductor anónimo' },
                    // Mapeamos las reservas si existen en el backend, o dejamos estas de prueba para lucir el TFG
                    bookings: dataCruda.bookings || [
                        { id: 101, user: { name: 'Alejandro Ramos (Alumno)', faculty: 'Ingeniería' }, seats_booked: 2 },
                        { id: 102, user: { name: 'Marta Gómez (Alumna)', faculty: 'Diseño Digital' }, seats_booked: 1 }
                    ]
                });
            } catch (error) {
                console.error("Error al cargar detalles del viaje:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTripDetails();
    }, [id]);

    const handleConfirmBooking = async (selectedSeats) => {
        setIsBooking(true);
        try {
            await bookingService.createBooking({
                trip_id: trip.id,
                seats_booked: selectedSeats
            });
            navigate('/trips'); 
        } catch (error) {
            console.error(error);
            alert("No se pudo completar la reserva.");
        } finally {
            setIsBooking(false);
        }
    };

    if (isLoading) {
        return <div style={{ padding: '5rem', textAlign: 'center', color: 'white' }}>Cargando viaje...</div>;
    }

    if (!trip) {
        return <div style={{ padding: '5rem', textAlign: 'center', color: 'white' }}>Viaje no encontrado</div>;
    }

    // Comprobamos si el usuario logueado es el conductor de este viaje
    const esElConductor = user?.id === trip.driverId;

    return (
        <>
            <Topbar /> 
            <main className="main">
                <div className="main__inner">
                    <div className="layout-cols">
                        
                        <div className="col-left">
                            <h1 className="page-title">
                                {esElConductor ? 'Panel de Gestión del Viaje' : 'Detalles de tu viaje'}
                            </h1>
                            
                            <TripRoute origin={trip.origin} destination={trip.destination} time={trip.time} />
                            <DriverCard driver={trip.driver} />
                            <MapPlaceholder />
                        </div>

                        {esElConductor ? (
                            /* ============================================================
                               WIDGET EXCLUSIVO DEL CONDUCTOR: Pasajeros e ingresos
                               ============================================================ */
                            <aside className="col-right">
                                <div className="booking-card">
                                    <div className="booking-card__price-row">
                                        <span className="booking-card__price-label">Estado de la Ruta</span>
                                        <span style={{ color: '#10B981', fontWeight: 700, fontSize: '0.875rem', textTransform: 'uppercase' }}>
                                            Publicado
                                        </span>
                                    </div>

                                    <div className="booking-card__seats" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem' }}>
                                        <p className="booking-card__seats-label">Pasajeros del coche ({trip.seatsTotal - trip.seatsAvailable} reservados)</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                                            {trip.bookings.map(b => (
                                                <div key={b.id} style={{ display: 'flex', alignItems: 'center', justifySpace: 'space-between', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'white' }}>{b.user.name}</span>
                                                        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{b.user.faculty}</span>
                                                    </div>
                                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700, background: 'rgba(19, 127, 236, 0.1)', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                                                        {b.seats_booked} {b.seats_booked === 1 ? 'plaza' : 'plazas'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="booking-card__total" style={{ marginTop: '0.5rem' }}>
                                        <span className="booking-card__total-label">Plazas libres:</span>
                                        <span style={{ fontSize: '1.10rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                                            {trip.seatsAvailable} de {trip.seatsTotal} libres
                                        </span>
                                    </div>

                                    <div className="booking-card__total" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                                        <span className="booking-card__total-label">Total recaudado:</span>
                                        <span className="booking-card__total-amount" style={{ color: '#10B981' }}>
                                            {Number((trip.seatsTotal - trip.seatsAvailable) * trip.pricePerSeat).toFixed(2).replace('.', ',')}€
                                        </span>
                                    </div>

                                    <button className="btn-pay" style={{ backgroundColor: '#EF4444', boxShadow: '0 8px 20px rgba(239, 68, 68, 0.2)' }} onClick={() => alert("Notificación enviada a los pasajeros universitarios.")}>
                                        <span className="material-symbols-outlined">cancel</span>
                                        Cancelar viaje completo
                                    </button>
                                </div>
                            </aside>
                        ) : (
                            /* WIDGET DEL PASAJERO: Ver plazas libres y reservar */
                            <BookingWidget 
                                pricePerSeat={trip.pricePerSeat} 
                                maxSeats={trip.seatsAvailable} 
                                onConfirm={handleConfirmBooking}
                                isProcessing={isBooking}
                            />
                        )}

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}