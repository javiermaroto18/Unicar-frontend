import '../../styles/MyTripCard.css';

export default function MyTripCard({ trip, onViewTicket, onViewDetails, isDriver }) {
    const isUpcoming = trip.status === 'upcoming';
    const isCancelled = trip.status === 'cancelled';

    return (
        <div className={`my-trip-card${!isUpcoming ? ' my-trip-card-completed' : ''}`}>

            <div
                className={`my-trip-card-preview${!isUpcoming ? ' my-trip-card-preview-completed' : ''}`}
                style={{ backgroundImage: `url('${trip.image}')` }}
            >
                <span 
                    className={`my-trip-card-badge my-trip-card-badge-${isUpcoming ? 'upcoming' : 'completed'}`}
                    style={isCancelled ? { backgroundColor: '#EF4444', color: 'white', borderColor: '#EF4444' } : {}}
                >
                    {isCancelled ? 'CANCELADO' : isUpcoming ? 'PRÓXIMO' : 'COMPLETADO'}
                </span>
            </div>

            <div className="my-trip-card-body">
                <div className={`my-trip-card-date my-trip-card-date-${isUpcoming ? 'upcoming' : 'completed'}`}>
                    <span className="material-symbols-outlined">
                        {isUpcoming ? 'calendar_today' : 'history'}
                    </span>
                    {trip.dateLabel}
                </div>

                <div className="my-trip-card-route">
                    <div className="my-trip-card-route-dots">
                        <div className={`my-trip-card-route-dot my-trip-card-route-dot-origin-${isUpcoming ? 'upcoming' : 'completed'}`} />
                        <div className="my-trip-card-route-line" />
                        <div className={`my-trip-card-route-dot my-trip-card-route-dot-dest${!isUpcoming ? '-completed' : ''}`} />
                    </div>
                    <div className="my-trip-card-route-stops">
                        <div className="my-trip-card-route-stop">
                            <span className="my-trip-card-route-time">{trip.origin.time} — Origen</span>
                            <span className="my-trip-card-route-place">{trip.origin.place}</span>
                        </div>
                        <div className="my-trip-card-route-stop">
                            <span className="my-trip-card-route-time">{trip.destination.time} — Destino</span>
                            <span className="my-trip-card-route-place">{trip.destination.place}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="my-trip-card-side">
                <div className="my-trip-card-driver">
                    <div
                        className="my-trip-card-driver-avatar"
                        style={{ backgroundImage: `url('${trip.driver?.avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(trip.driver?.name || 'C')}')` }}
                    />
                    <div>
                        <span className="my-trip-card-driver-label">{isDriver ? 'Tú eres el' : 'Conductor'}</span>
                        <span className="my-trip-card-driver-name">{isDriver ? 'Conductor' : trip.driver?.name}</span>
                    </div>
                </div>

                <div className="my-trip-card-action">
                    <span className={`my-trip-card-price-${isUpcoming ? 'upcoming' : 'completed'}`}>
                        {trip.price}€
                    </span>
                    
                    {/* Renderizado inteligente del botón según el estado y rol */}
                    {isCancelled ? (
                        <button 
                            className="my-trip-card-btn-ticket" 
                            disabled 
                            style={{ 
                                opacity: 0.6, 
                                cursor: 'not-allowed', 
                                backgroundColor: '#EF4444', 
                                borderColor: '#EF4444', 
                                color: 'white' 
                            }}
                        >
                            Cancelado
                        </button>
                    ) : isDriver ? (
                        <button className="my-trip-card-btn-details" onClick={() => onViewDetails?.(trip)}>
                            Ver detalles
                        </button>
                    ) : isUpcoming ? (
                        <button className="my-trip-card-btn-details" onClick={() => onViewDetails?.(trip)}>
                            Ver detalles
                        </button>
                    ) : (
                        <button className="my-trip-card-btn-ticket" onClick={() => onViewTicket?.(trip)}>
                            Ver billete
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
}