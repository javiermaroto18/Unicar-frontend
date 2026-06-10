import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext.jsx';
import { useNotifications } from '../../context/NotificationsContext.jsx';
import { tripService } from '../../api/tripService';
import { calcularRuta } from '../../api/geoService';
import apiClient from '../../api/apiClient'; // Para la llamada temporal de vehículos

import Topbar             from '../common/Topbar.jsx';
import FormularioPublicar from '../publish/FormularioPublicar';
import MapaVisualizacion  from '../publish/MapaVisualizacion';
import Loader             from '../common/Loader.jsx';

import '../../styles/PublicarPage.css';

export default function PublicarPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const { add: addNotificacion } = useNotifications();

    const [vehiculos, setVehiculos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [origen, setOrigen] = useState(null);
    const [destino, setDestino] = useState(null);
    const [ruta, setRuta] = useState(null);
    const [cargandoRuta, setCargandoRuta] = useState(false);

    const handleLugaresChange = useCallback((o, d) => {
        setOrigen(o);
        setDestino(d);
    }, []);

    useEffect(() => {
        if (!origen || !destino) {
            setRuta(null);
            return;
        }
        let activo = true;
        setCargandoRuta(true);
        calcularRuta(origen, destino).then((r) => {
            if (!activo) return;
            setRuta(r);
            setCargandoRuta(false);
        });
        return () => { activo = false; };
    }, [origen, destino]);

    useEffect(() => {
        // Redirección de seguridad: Si no es conductor verificado, fuera de aquí.
        if (user && !user.is_verified_driver) {
            toast.warning('Debes verificar tu cuenta y registrar un vehículo para poder publicar viajes.');
            navigate('/dashboard');
            return;
        }

        // Cargar los vehículos reales del usuario
        const fetchVehicles = async () => {
            try {
                // NOTA: Asegúrate de tener este endpoint en Laravel (ej: /api/v1/vehicles/me)
                // Si no lo tienes, deberás crearlo para devolver los coches del usuario autenticado.
                const response = await apiClient.get('/vehicles/me');
                const vehiculosData = response.data?.data || response.data || [];
                setVehiculos(vehiculosData);
            } catch (error) {
                console.error("Error cargando vehículos:", error);
                toast.error("No se pudieron cargar tus vehículos. Inténtalo más tarde.");
            } finally {
                setIsLoading(false);
            }
        };

        if (user) fetchVehicles();
    }, [user, navigate]);

    async function handlePublicar(datosFormulario) {
        setIsSubmitting(true);
        try {
            // Transformamos los datos del formulario al Payload que Laravel exige en StoreTripRequest
            const payload = {
                vehicle_id: datosFormulario.vehicle_id,
                origin: datosFormulario.origen,
                destination: datosFormulario.destino,
                // Concatenamos fecha y hora para el formato YYYY-MM-DD HH:MM:SS
                departure_time: `${datosFormulario.fecha} ${datosFormulario.hora}:00`,
                seats_total: datosFormulario.plazas,
                // Convertimos un posible "3,50" a un float "3.50"
                price_per_seat: parseFloat(datosFormulario.precio.replace(',', '.'))
            };

            await tripService.createTrip(payload);

            addNotificacion({
                tipo: 'viaje',
                titulo: 'Viaje publicado',
                mensaje: `Has publicado el viaje ${datosFormulario.origen} → ${datosFormulario.destino}.`,
                enlace: '/trips',
            });

            toast.success('¡Viaje publicado con éxito!');
            navigate('/dashboard'); // Mandamos al usuario de vuelta al inicio

        } catch (error) {
            console.error('Error publicando viaje:', error);
            toast.error('Hubo un error al publicar el viaje. Revisa los datos.');
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isLoading) {
        return <Loader fullScreen text="Cargando entorno seguro..." />;
    }

    return (
        <div className="publicar-pagina">
            <Topbar />
            <div className="publicar-pagina_main">
                <FormularioPublicar
                    vehiculos={vehiculos}
                    onPublicar={handlePublicar}
                    isSubmitting={isSubmitting}
                    onLugaresChange={handleLugaresChange}
                />
                <MapaVisualizacion
                    origen={origen}
                    destino={destino}
                    ruta={ruta}
                    cargandoRuta={cargandoRuta}
                />
            </div>
        </div>
    );
}