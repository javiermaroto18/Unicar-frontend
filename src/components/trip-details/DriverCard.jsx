import '../../styles/trip-detail-view.css';

export const DriverCard = ({ driver }) => {
    // Si el conductor no tiene avatar, usamos un generador de iniciales
    const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(driver?.name || 'C')}&background=137fec&color=fff`;

    return (
        <section className="card">
            <div className="driver">
                <div className="driver__left">
                    <div 
                        className="driver__avatar" 
                        style={{ backgroundImage: `url('${driver?.avatar || fallbackAvatar}')` }}
                    ></div>
                    <div className="driver__info">
                        <div className="driver__name-row">
                            <p className="driver__name">{driver?.name || 'Conductor'}</p>
                            <div className="driver__rating">
                                <span className="material-symbols-outlined driver__star">star</span>
                                <span>{driver?.rating || 'Nuevo'}</span>
                            </div>
                        </div>
                        <div className="driver__vehicle">
                            <span className="material-symbols-outlined">directions_car</span>
                            {/* Podemos enlazar esto al vehículo real en el futuro, por ahora mostramos validado */}
                            <span>Vehículo validado · <span className="driver__plate">***</span></span>
                        </div>
                    </div>
                </div>
                <div className="driver__right">
                    <div className="tooltip-wrap">
                        <button className="btn-contact">
                            <span className="material-symbols-outlined">chat_bubble</span>
                            Contactar al conductor
                        </button>
                        <div className="tooltip">Próximamente</div>
                    </div>
                </div>
            </div>
        </section>
    );
};