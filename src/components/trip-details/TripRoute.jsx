import '../../styles/Trip-detail-view.css';

export const TripRoute = ({ origin, destination, time }) => {
    return (
        <section className="card">
            <div className="route">
                {/* Origin */}
                <div className="route__row">
                    <div className="route__indicator">
                        <div className="route__dot route__dot--primary">
                            <div className="route__dot-inner"></div>
                        </div>
                        <div className="route__line"></div>
                    </div>
                    <div className="route__info">
                        <p className="route__place">{time} — {origin}</p>
                        <p className="route__sub">
                            <span className="material-symbols-outlined">location_on</span>
                            Punto de encuentro: Puerta Principal
                        </p>
                    </div>
                </div>
                {/* Destination */}
                <div className="route__row">
                    <div className="route__indicator">
                        <div className="route__dot route__dot--empty">
                            <span className="material-symbols-outlined route__dot-icon">sports_score</span>
                        </div>
                    </div>
                    <div className="route__info">
                        <p className="route__place">Llegada — {destination}</p>
                        <p className="route__sub route__sub--plain">Punto de llegada</p>
                    </div>
                </div>
            </div>
        </section>
    );
};