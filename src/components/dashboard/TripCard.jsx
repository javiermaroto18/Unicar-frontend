import '../../styles/TripCard.css';

export default function TripCard({ trip, onReserve }) {
    const { driver, origin, destination, price } = trip;
    const takenSeats = trip.seatsTotal - trip.seatsAvailable;

    return (
        <div className="trip-card">
            <div className="trip-card-body">

                <div className="trip-card-driver">
                    <div className="trip-card-driver-info">
                        <img
                            className="trip-card-driver-avatar"
                            src={driver.avatar}
                            alt={driver.name}
                        />
                        <div>
                            <h4 className="trip-card-driver-name">{driver.name}</h4>
                            <div className="trip-card-driver-rating">
                                <span className="material-symbols-outlined filled-icon trip-card-driver-star">
                                    star
                                </span>
                                <span className="trip-card-driver-score">{driver.rating}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="trip-card-verified-badge">
                    Conductor verificado (carnet validado) | {driver.faculty}
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
                                <p className="trip-card-route-time">Salida {origin.time}</p>
                                <p className="trip-card-route-place">{origin.place}</p>
                            </div>
                            <span className="material-symbols-outlined trip-card-route-more-icon">
                                more_vert
                            </span>
                        </div>
                        <div className="trip-card-route-stop">
                            <div>
                                <p className="trip-card-route-time">Llegada {destination.time}</p>
                                <p className="trip-card-route-place trip-card-route-place-dest">
                                    {destination.place}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="trip-card-meta">
                    <div>
                        <span className="trip-card-price-label">Precio</span>
                        <div className="trip-card-price-value">
                            {price}€{' '}
                            <span className="trip-card-price-unit">Por plaza</span>
                        </div>
                    </div>

                    <div className="trip-card-seats">
                        <div className="trip-card-seats-bar">
                            {Array.from({ length: trip.seatsTotal }).map((_, i) => (
                                <div
                                    key={i}
                                    className={`trip-card-seats-dot${i < takenSeats ? ' trip-card-seats-dot-taken' : ''}`}
                                />
                            ))}
                        </div>
                        <span className="trip-card-seats-label">
                            {trip.seatsAvailable} {trip.seatsAvailable === 1 ? 'plaza libre' : 'plazas libres'}
                        </span>
                    </div>
                </div>

            </div>

            <div className="trip-card-footer">
                <button
                    className="trip-card-reserve-btn"
                    onClick={() => onReserve?.(trip)}
                >
                    Reservar plaza
                </button>
            </div>
        </div>
    );
}