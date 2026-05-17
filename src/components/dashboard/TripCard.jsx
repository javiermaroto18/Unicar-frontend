import '../../styles/TripCard.css';

export default function TripCard({ trip, onReserve }) {
    // Valores seguros por defecto en caso de que falten datos de la BD
    const driver = trip.driver || {};
    const origin = trip.origin || {};
    const destination = trip.destination || {};
    
    // Aseguramos que sea un número y le damos formato decimal
    const priceValue = Number(trip.price || 0).toFixed(2);
    
    // Cálculos de asientos seguros contra NaN
    const seatsTotal = trip.seatsTotal || 0;
    const seatsAvailable = trip.seatsAvailable !== undefined ? trip.seatsAvailable : seatsTotal;
    const takenSeats = Math.max(0, seatsTotal - seatsAvailable);

    return (
        <div className="trip-card">
            <div className="trip-card-body">

                <div className="trip-card-driver">
                    <div className="trip-card-driver-info">
                        {driver.avatar ? (
                            <img className="trip-card-driver-avatar" src={driver.avatar} alt={driver.name || 'Conductor'} />
                        ) : (
                            <span className="material-symbols-outlined trip-card-driver-avatar" style={{display:'flex', alignItems:'center', justifyContent:'center', background:'#374151', color:'white'}}>
                                person
                            </span>
                        )}
                        <div>
                            <h4 className="trip-card-driver-name"
                                style={{ fontFamily: 'Be Vietnam Pro, sans-serif', fontWeight: 500 }} 
                            >{driver.name || 'Conductor'}</h4>
                            <div className="trip-card-driver-rating">
                                <span className="material-symbols-outlined filled-icon trip-card-driver-star">
                                    star
                                </span>
                                <span className="trip-card-driver-score">{driver.rating || 'Nuevo'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="trip-card-verified-badge"  
                    style={{ 
                        paddingTop: '0.5rem', 
                        paddingBottom: '0.5rem',
                        marginBottom: '1rem',
                     }}
                >
                    Conductor verificado (carnet validado) {driver.faculty ? `| ${driver.faculty}` : ''}
                </div>

                <div className="trip-card-route">
                    <div className="trip-card-route-dots">
                        <div className="trip-card-route-dot trip-card-route-dot-origin" />
                        <div className="trip-card-route-line" />
                        <div className="trip-card-route-dot trip-card-route-dot-dest" />
                    </div>
                    <div className="trip-card-route-stops">
                        <div className="trip-card-route-stop">
                            <div>
                                <p className="trip-card-route-time">Salida {origin.time || '--:--'}</p>
                                <p className="trip-card-route-place" 
                                    style={{ fontFamily: 'Be Vietnam Pro, sans-serif', fontWeight: 200 }}
                                >
                                    {origin.place || 'Ubicación desconocida'}
                                </p>
                            </div>
                            <span className="material-symbols-outlined trip-card-route-more-icon">
                                more_vert
                            </span>
                        </div>
                        <div className="trip-card-route-stop">
                            <div>
                                <p className="trip-card-route-time">Llegada {destination.time || '--:--'}</p>
                                <p className="trip-card-route-place trip-card-route-place-dest" 
                                    style={{ fontFamily: 'Be Vietnam Pro, sans-serif', fontWeight: 500 }}
                                >
                                    {destination.place || 'Ubicación desconocida'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="trip-card-meta">
                    <div>
                        <span className="trip-card-price-label">Precio</span>
                        <div className="trip-card-price-value">
                            {priceValue}€{' '}
                            <span className="trip-card-price-unit" style={{ marginLeft: '0.25rem'}}>
                                Por plaza
                            </span>
                        </div>
                    </div>

                    <div className="trip-card-seats">
                        <div className="trip-card-seats-bar">
                            {Array.from({ length: seatsTotal }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`trip-card-seats-dot${i < takenSeats ? ' trip-card-seats-dot-taken' : ''}`}
                                />
                            ))}
                        </div>
                        <span className="trip-card-seats-label">
                            {seatsAvailable} {seatsAvailable === 1 ? 'plaza libre' : 'plazas libres'}
                        </span>
                    </div>
                </div>

            </div>

            <div className="trip-card-footer">
                <button
                    className="trip-card-reserve-btn"
                    onClick={() => onReserve?.(trip)} 
                    style={{ fontFamily: 'Be Vietnam Pro, sans-serif', fontWeight: 500 }}
                >
                    Reservar plaza
                </button>
            </div>
        </div>
    );
}