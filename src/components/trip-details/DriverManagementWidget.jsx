import { useState, useEffect } from 'react';
import '../../styles/Trip-detail-view.css';

function DriverManagementWidget({ trip, onCancelTrip }) {
    const [mockAvatars, setMockAvatars] = useState({});

    // Generador de avatares ficticios dinámicos para Social Proof
    useEffect(() => {
        const FICTIONAL_PHOTOS = [
            'https://randomuser.me/api/portraits/women/44.jpg',
            'https://randomuser.me/api/portraits/men/32.jpg',
            'https://randomuser.me/api/portraits/women/68.jpg',
            'https://randomuser.me/api/portraits/men/46.jpg',
            'https://randomuser.me/api/portraits/women/24.jpg',
            'https://randomuser.me/api/portraits/men/11.jpg'
        ];

        // Barajamos aleatoriamente las fotos cada vez que carga el componente
        const shuffled = [...FICTIONAL_PHOTOS].sort(() => 0.5 - Math.random());
        const assigned = {};
        
        trip.bookings.forEach((b, index) => {
            assigned[b.id] = shuffled[index % shuffled.length];
        });
        
        setMockAvatars(assigned);
    }, [trip.bookings]);

    // Filtrar pasajeros reales (que no han cancelado)
    const activeBookings = trip.bookings.filter(b => b.status !== 'cancelled');
    const reservedSeats = activeBookings.reduce((acc, curr) => acc + curr.seats_booked, 0);
    const revenue = (reservedSeats * trip.pricePerSeat).toFixed(2).replace('.', ',');

    const isCancelled = trip.status === 'cancelled';
    const isCompleted = trip.status === 'completed';
    const isScheduled = !isCancelled && !isCompleted; 

    console.log("Renderizando DriverManagementWidget con estado:", { isCancelled, isCompleted, isScheduled });

    return (
        <aside className="col-right">
            <div className="booking-card">
                
                {/* --- CABECERA DINÁMICA --- */}
                <div className="booking-card__price-row">
                    <span className="booking-card__price-label">Estado de la Ruta</span>
                    {isScheduled && <span className="status-badge status-badge--success">Publicado</span>}
                    {isCompleted && <span className="status-badge" style={{ backgroundColor: '#1e3a8a', color: '#60a5fa', border: '1px solid #1e3a8a' }}>Completado</span>}
                    {isCancelled && <span className="status-badge" style={{ backgroundColor: '#450a0a', color: '#f87171', border: '1px solid #450a0a' }}>Cancelado</span>}
                </div>

                {/* --- ESTADO 1: CANCELADO --- */}
                {isCancelled && (
                    <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#f87171', marginBottom: '0.5rem' }}>
                            <span className="material-symbols-outlined">info</span>
                            <span style={{ fontWeight: 600 }}>Viaje suspendido</span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: '#9ca3af', lineHeight: '1.5' }}>
                            Has cancelado este trayecto de forma permanente. Los pasajeros que habían reservado han sido notificados.
                        </p>
                    </div>
                )}

                {/* --- ESTADO 2 Y 3: PROGRAMADO O COMPLETADO --- */}
                {(isScheduled || isCompleted) && (
                    <>
                        <div className="booking-card__seats driver-seats-section">
                            <p className="booking-card__seats-label">
                                {isCompleted ? 'Resumen de Pasajeros' : `Pasajeros del coche (${reservedSeats} reservados)`}
                            </p>
                            
                            {activeBookings.length === 0 ? (
                                <p style={{ color: 'var(--color-text-dim)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                    Aún no hay reservas para este viaje.
                                </p>
                            ) : (
                                <div className="driver-passengers-list">
                                    {activeBookings.map(b => (
                                        <div key={b.id} className="driver-passenger-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                            <div 
                                                style={{
                                                    width: '32px', height: '32px', borderRadius: '50%',
                                                    backgroundImage: `url(${mockAvatars[b.id]})`,
                                                    backgroundSize: 'cover', backgroundPosition: 'center'
                                                }}
                                            />
                                            <div className="driver-passenger-info" style={{ flex: 1 }}>
                                                <span className="driver-passenger-name" style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: '#f1f5f9' }}>
                                                    {b.passenger?.name || 'Pasajero'}
                                                </span>
                                                <span className="driver-passenger-faculty" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                                                    {b.passenger?.faculty || 'Estudiante'}
                                                </span>
                                            </div>
                                            <span className="driver-passenger-seats" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f1f5f9' }}>
                                                {isCompleted ? `${(b.seats_booked * trip.pricePerSeat).toFixed(2)}€` : `${b.seats_booked} ${b.seats_booked === 1 ? 'plaza' : 'plazas'}`}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Si está programado, mostramos plazas libres */}
                        {isScheduled && (
                            <div className="booking-card__total driver-total-section">
                                <span className="booking-card__total-label">Plazas libres:</span>
                                <span className="driver-seats-available">
                                    {trip.seatsAvailable} de {trip.seatsTotal} libres
                                </span>
                            </div>
                        )}

                        {/* Recaudación Final o Proyectada */}
                        <div className="booking-card__total driver-revenue-section" style={isCompleted ? { marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #334155' } : {}}>
                            <span className="booking-card__total-label" style={isCompleted ? { fontSize: '1rem', color: '#cbd5e1' } : {}}>
                                {isCompleted ? 'Ingreso Final:' : 'Total recaudado:'}
                            </span>
                            <span className="booking-card__total-amount" style={isCompleted ? { color: '#60a5fa', fontSize: '1.5rem' } : { color: '#10b981' }}>
                                {revenue}€
                            </span>
                        </div>

                        {/* Mensaje de agradecimiento si está completado */}
                        {isCompleted && (
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '1rem', padding: '0.75rem', backgroundColor: 'rgba(56, 189, 248, 0.05)', borderRadius: '8px' }}>
                                <span className="material-symbols-outlined" style={{ color: '#38bdf8', fontSize: '1.25rem' }}>eco</span>
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
                                    Gracias por compartir tu viaje. Has contribuido a reducir la huella de carbono del campus.
                                </p>
                            </div>
                        )}

                        {/* Botón de cancelar SÓLO si está programado */}
                        {isScheduled && (
                            <button 
                                className="btn-pay btn-cancel-trip" 
                                onClick={onCancelTrip}
                                style={{ marginTop: '1rem' }}
                            >
                                <span className="material-symbols-outlined">cancel</span>
                                Cancelar viaje completo
                            </button>
                        )}
                    </>
                )}
                
            </div>
        </aside>
    );
}

export default DriverManagementWidget;