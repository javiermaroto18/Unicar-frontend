import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { tripService } from '../../api/tripService';
import { useAuth } from '../../context/AuthContext';
import '../../styles/ticket-view.css';

export default function TicketView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [trip, setTrip] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await tripService.getTripById(id);
                const dataCruda = response.data || response;
                
                let horaSalida = '--:--';
                let fechaBonita = 'Próximamente';
                if (dataCruda.departure_time) {
                    const fechaLimpia = dataCruda.departure_time.replace('T', ' ');
                    horaSalida = fechaLimpia.split(' ')[1]?.substring(0, 5) || '--:--';
                    
                    const dateObj = new Date(dataCruda.departure_time);
                    fechaBonita = dateObj.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                }

                setTrip({
                    origin: dataCruda.origin,
                    destination: dataCruda.destination,
                    time: horaSalida,
                    date: fechaBonita,
                    driver: dataCruda.driver || dataCruda.user || { name: 'Conductor' }
                });
            } catch (error) {
                console.error("Error al cargar detalles del viaje:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTripDetails();
    }, [id]);

    if (isLoading) return <div style={{ padding: '5rem', textAlign: 'center', color: 'white' }}>Generando billete...</div>;
    if (!trip) return <div style={{ padding: '5rem', textAlign: 'center', color: 'white' }}>Billete no encontrado</div>;

    // Generamos un código localizador aleatorio para el TFG (Ej: UC-A7X9)
    const locatorCode = `UC-${id.toString().padStart(4, '0')}X`;
    // Usamos una API gratuita para generar un QR real que contenga ese código
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${locatorCode}`;

    return (
        <div className="ticket-page">
            <div className="ticket-header">
                <button className="ticket-header-back" onClick={() => navigate('/trips')}>
                    <span className="material-symbols-outlined">arrow_back</span>
                    Volver a mis viajes
                </button>
            </div>

            <div className="ticket-card">
                <div className="ticket-top">
                    <div className="ticket-brand">
                        <span className="material-symbols-outlined">directions_car</span>
                        UniCar Pass
                    </div>
                    <div className="ticket-route">
                        {/* Acortamos los nombres si son muy largos para que quepan bien */}
                        <span className="ticket-city">{trip.origin.substring(0, 3).toUpperCase()}</span>
                        <span className="material-symbols-outlined ticket-arrow">trending_flat</span>
                        <span className="ticket-city">{trip.destination.substring(0, 3).toUpperCase()}</span>
                    </div>
                </div>

                <div className="ticket-middle">
                    <div className="ticket-info-group">
                        <span className="ticket-label">Pasajero</span>
                        <span className="ticket-value">{user?.name || 'Estudiante'}</span>
                    </div>
                    <div className="ticket-info-group">
                        <span className="ticket-label">Conductor</span>
                        <span className="ticket-value">{trip.driver.name}</span>
                    </div>
                    <div className="ticket-info-group">
                        <span className="ticket-label">Fecha</span>
                        <span className="ticket-value">{trip.date}</span>
                    </div>
                    <div className="ticket-info-group">
                        <span className="ticket-label">Hora de salida</span>
                        <span className="ticket-value">{trip.time}</span>
                    </div>
                </div>

                <div className="ticket-bottom">
                    <span className="ticket-label" style={{ color: '#64748b' }}>Muestra este código al conductor</span>
                    <img src={qrUrl} alt="Código QR del billete" className="ticket-qr" />
                    <span className="ticket-locator">{locatorCode}</span>
                </div>
            </div>
        </div>
    );
}