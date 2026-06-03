import { useNavigate } from 'react-router-dom';
import '../../styles/trip-detail-view.css';

export function PassengerManagementWidget({ reserva, trip, onCancelBooking }) {
    const navigate = useNavigate();
    const totalPagado = (reserva.seats_booked * trip.pricePerSeat).toFixed(2).replace('.', ',');

    return (
        <aside className="col-right">
            <div className="booking-card">
                <div className="booking-card__price-row">
                    <span className="booking-card__price-label">Estado de tu reserva</span>
                    <span className="status-badge status-badge--success">Confirmada</span>
                </div>

                <div className="booking-card__seats driver-seats-section">
                    <p className="booking-card__seats-label">Tu billete</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Plazas reservadas:</span>
                        <span style={{ fontWeight: 700, color: 'var(--color-text)', fontSize: '1.125rem' }}>
                            {reserva.seats_booked} {reserva.seats_booked === 1 ? 'plaza' : 'plazas'}
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Localizador:</span>
                        <span style={{ fontFamily: 'monospace', background: 'var(--color-hover)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.875rem' }}>
                            #{reserva.id.toString().padStart(6, '0')}
                        </span>
                    </div>
                </div>

                <div className="booking-card__total driver-revenue-section">
                    <span className="booking-card__total-label">Total pagado:</span>
                    <span className="booking-card__total-amount status-badge--success">{totalPagado}€</span>
                </div>

                {/* Botpn: Ver Billete */}
                <button 
                    className="btn-pay" 
                    onClick={() => navigate(`/ticket/${trip.id}`)}
                    style={{ marginTop: '0.5rem' }}
                >
                    <span className="material-symbols-outlined">confirmation_number</span>
                    Ver mi billete
                </button>

                {/* Boton: Cancelar Reserva */}
                <button 
                    className="btn-pay btn-cancel-trip" 
                    onClick={() => onCancelBooking(reserva.id)}
                    style={{ marginTop: '0.5rem' }}
                >
                    <span className="material-symbols-outlined">event_busy</span>
                    Cancelar mi reserva
                </button>
                
                <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)', textAlign: 'center', marginTop: '-0.5rem' }}>
                    Revisa las condiciones de cancelación antes de proceder.
                </p>
            </div>
        </aside>
    );
}