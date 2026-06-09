import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { tripService } from '../../api/tripService';

// Devuelve el array de datos sea cual sea el nivel de anidación de la respuesta
function aArray(resp) {
    if (Array.isArray(resp)) return resp;
    if (Array.isArray(resp?.data)) return resp.data;
    if (Array.isArray(resp?.data?.data)) return resp.data.data;
    return [];
}

const parseFecha = (dt) => (dt ? new Date(String(dt).replace(' ', 'T')) : null);

// Tarjeta lateral: el viaje futuro más cercano del usuario (como pasajero o conductor)
export default function ProximoViajeCard() {
    const navigate = useNavigate();
    const [estado, setEstado] = useState('cargando'); // cargando | ok | vacio
    const [viaje, setViaje] = useState(null);

    useEffect(() => {
        let activo = true;

        (async () => {
            try {
                const [bResp, tResp] = await Promise.all([
                    tripService.getMyBookings().catch(() => null),
                    tripService.getMyPublishedTrips().catch(() => null),
                ]);

                const ahora = new Date();
                const candidatos = [];

                // Como pasajero: reservas activas de viajes programados aún por salir
                for (const bk of aArray(bResp)) {
                    const trip = bk.trip || {};
                    const fecha = parseFecha(trip.departure_time);
                    const activa = bk.status === 'pending' || bk.status === 'paid';
                    if (activa && trip.status === 'scheduled' && fecha && fecha > ahora) {
                        candidatos.push({ rol: 'pasajero', id: trip.id, origin: trip.origin, destination: trip.destination, fecha });
                    }
                }

                // Como conductor: viajes propios programados aún por salir
                for (const tp of aArray(tResp)) {
                    const fecha = parseFecha(tp.departure_time);
                    if (tp.status === 'scheduled' && fecha && fecha > ahora) {
                        candidatos.push({ rol: 'conductor', id: tp.id, origin: tp.origin, destination: tp.destination, fecha });
                    }
                }

                candidatos.sort((a, b) => a.fecha - b.fecha);

                if (!activo) return;
                if (candidatos.length === 0) {
                    setEstado('vacio');
                } else {
                    setViaje(candidatos[0]);
                    setEstado('ok');
                }
            } catch {
                if (activo) setEstado('vacio');
            }
        })();

        return () => { activo = false; };
    }, []);

    if (estado !== 'ok') {
        return (
            <div className="notif-card">
                <h3 className="notif-card-titulo">Tu próximo viaje</h3>
                <p className="notif-card-vacio">
                    {estado === 'cargando' ? 'Cargando…' : 'No tienes viajes próximos.'}
                </p>
            </div>
        );
    }

    const fechaTxt = viaje.fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' });
    const horaTxt = viaje.fecha.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    const irAlViaje = () =>
        navigate(viaje.rol === 'conductor' ? `/manage-trip/${viaje.id}` : `/trip-details/${viaje.id}`);

    return (
        <div className="notif-card">
            <h3 className="notif-card-titulo">Tu próximo viaje</h3>

            <span className={`notif-proximo-rol notif-proximo-rol--${viaje.rol}`}>
                {viaje.rol === 'conductor' ? 'Conduces' : 'Como pasajero'}
            </span>

            <div className="notif-proximo-ruta">
                <span className="material-symbols-outlined">trip_origin</span>
                <span className="notif-proximo-lugar">{viaje.origin}</span>
            </div>
            <div className="notif-proximo-ruta">
                <span className="material-symbols-outlined">place</span>
                <span className="notif-proximo-lugar">{viaje.destination}</span>
            </div>

            <p className="notif-proximo-fecha">
                <span className="material-symbols-outlined">schedule</span>
                {fechaTxt}, {horaTxt}
            </p>

            <button type="button" className="notif-proximo-btn" onClick={irAlViaje}>
                Ver viaje
            </button>
        </div>
    );
}
