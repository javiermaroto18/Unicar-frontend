import { createContext, useState, useContext, useEffect, useCallback, useRef } from 'react';
import { useAuth } from './AuthContext';
import { tripService } from '../api/tripService';

/*
 * Estado global de notificaciones (Nivel 2: reales, sin backend dedicado).
 *
 * Cómo se generan:
 *  - Acciones propias inmediatas: las añade quien actúa con add() (p. ej. TripDetailView
 *    al confirmar/cancelar una reserva).
 *  - Detección de cambios ("diff"): al sincronizar se comparan /bookings/me y /trips/me
 *    con una instantánea guardada en localStorage. Así detectamos lo que hacen OTROS:
 *      · el conductor canceló un viaje que yo había reservado,
 *      · alguien reservó / canceló una plaza en un viaje que yo conduzco.
 *  - Recordatorios por fecha: viajes (como pasajero o conductor) que salen en <24h.
 *
 * Persistencia POR SESIÓN: la lista vive en sessionStorage (sobrevive a recargas,
 * se borra al cerrar la pestaña) y se elimina al cerrar sesión. La instantánea de
 * referencia (cursor de sincronización) vive en localStorage para detectar también
 * los cambios ocurridos mientras no estabas.
 */
const NotificationsContext = createContext();

export function useNotifications() {
    return useContext(NotificationsContext);
}

const claveNotifs = (uid) => `unicar_notifs_${uid}`;      // lista (sessionStorage)
const claveBase   = (uid) => `unicar_notif_base_${uid}`;  // instantánea (localStorage)
const claveDedupe = (uid) => `unicar_notif_rem_${uid}`;   // recordatorios/welcome ya emitidos (sessionStorage)

const INTERVALO_SYNC = 60000; // re-sincroniza cada 60s mientras la pestaña está abierta

// Devuelve el array de datos sea cual sea el nivel de anidación de la respuesta
function aArray(resp) {
    if (Array.isArray(resp)) return resp;
    if (Array.isArray(resp?.data)) return resp.data;
    if (Array.isArray(resp?.data?.data)) return resp.data.data;
    return [];
}

// Texto del recordatorio si el viaje sale dentro de las próximas 24h; si no, null
function textoRecordatorio(departureTime) {
    if (!departureTime) return null;
    const fecha = new Date(String(departureTime).replace(' ', 'T'));
    if (isNaN(fecha)) return null;
    const horas = (fecha - new Date()) / 3600000;
    if (horas <= 0 || horas > 24) return null;
    return horas < 1 ? 'en menos de 1 hora' : `en ${Math.round(horas)} h`;
}

export function NotificationsProvider({ children }) {
    const { user } = useAuth();
    const [notificaciones, setNotificaciones] = useState([]);
    const usuarioPrevioRef = useRef(null);
    const sincronizandoRef = useRef(false);

    useEffect(() => {
        const idActual = user?.id ?? null;
        const idPrevio = usuarioPrevioRef.current;

        // Al cerrar sesión o cambiar de cuenta, borramos las notificaciones del usuario anterior
        if (idPrevio !== null && idPrevio !== idActual) {
            sessionStorage.removeItem(claveNotifs(idPrevio));
            sessionStorage.removeItem(claveDedupe(idPrevio));
        }

        if (idActual === null) {
            setNotificaciones([]);
        } else {
            const guardadas = sessionStorage.getItem(claveNotifs(idActual));
            try {
                setNotificaciones(guardadas ? JSON.parse(guardadas) : []);
            } catch {
                setNotificaciones([]);
            }
        }

        usuarioPrevioRef.current = idActual;
    }, [user?.id]);

    useEffect(() => {
        if (user?.id == null) return;
        sessionStorage.setItem(claveNotifs(user.id), JSON.stringify(notificaciones));
    }, [notificaciones, user?.id]);

    const add = useCallback((datos) => {
        setNotificaciones((prev) => [
            { id: Date.now(), tiempo: 'Ahora', leida: false, tipo: 'sistema', ...datos },
            ...prev,
        ]);
    }, []);

    const marcarLeida = useCallback((id) => {
        setNotificaciones((prev) => prev.map((n) => (n.id === id ? { ...n, leida: true } : n)));
    }, []);

    const marcarTodas = useCallback(() => {
        setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
    }, []);

    const eliminar = useCallback((id) => {
        setNotificaciones((prev) => prev.filter((n) => n.id !== id));
    }, []);

    // Sincroniza con el servidor: detecta cambios y genera recordatorios
    const sync = useCallback(async () => {
        const uid = user?.id;
        if (uid == null || sincronizandoRef.current) return;
        sincronizandoRef.current = true;
        try {
            const [bResp, tResp] = await Promise.all([
                tripService.getMyBookings().catch(() => null),
                tripService.getMyPublishedTrips().catch(() => null),
            ]);
            const reservas = aArray(bResp);  // como pasajero
            const viajes   = aArray(tResp);  // como conductor

            let base = null;
            try { base = JSON.parse(localStorage.getItem(claveBase(uid))); } catch { base = null; }
            const emitidos = new Set(JSON.parse(sessionStorage.getItem(claveDedupe(uid)) || '[]'));
            const primeraVez = !base;

            const nuevos = [];

            // --- Cambios en mis reservas (como pasajero) ---
            for (const bk of reservas) {
                const trip = bk.trip || {};
                const prev = base?.b?.[bk.id];
                const activa = bk.status === 'pending' || bk.status === 'paid';

                // El conductor canceló el viaje: la reserva pasa a cancelled Y el viaje está cancelled
                if (!primeraVez && prev && prev !== 'cancelled'
                    && bk.status === 'cancelled' && trip.status === 'cancelled') {
                    nuevos.push({
                        tipo: 'viaje',
                        titulo: 'El conductor ha cancelado tu viaje',
                        mensaje: `Tu viaje ${trip.origin} → ${trip.destination} ha sido cancelado por el conductor. Tu plaza queda anulada.`,
                        enlace: '/trips',
                    });
                }

                // Recordatorio de salida (próximas 24h)
                if (activa && trip.status === 'scheduled') {
                    const k = `rem_b_${bk.id}`;
                    const aviso = textoRecordatorio(trip.departure_time);
                    if (aviso && !emitidos.has(k)) {
                        nuevos.push({
                            tipo: 'viaje',
                            titulo: 'Recordatorio de viaje',
                            mensaje: `Tu viaje ${trip.origin} → ${trip.destination} sale ${aviso}.`,
                            enlace: `/trip-details/${trip.id}`,
                        });
                        emitidos.add(k);
                    }
                }
            }

            // --- Cambios en mis viajes (como conductor) ---
            for (const tp of viajes) {
                if (tp.status !== 'scheduled') continue;
                const prev = base?.t?.[tp.id];

                if (!primeraVez && prev != null && tp.seats_available != null) {
                    if (tp.seats_available < prev) {
                        nuevos.push({
                            tipo: 'reserva',
                            titulo: 'Nuevo pasajero en tu viaje',
                            mensaje: `Alguien ha reservado una plaza en tu viaje ${tp.origin} → ${tp.destination}.`,
                            enlace: `/manage-trip/${tp.id}`,
                        });
                    } else if (tp.seats_available > prev) {
                        nuevos.push({
                            tipo: 'reserva',
                            titulo: 'Un pasajero ha cancelado',
                            mensaje: `Se ha liberado una plaza en tu viaje ${tp.origin} → ${tp.destination}.`,
                            enlace: `/manage-trip/${tp.id}`,
                        });
                    }
                }

                const k = `rem_t_${tp.id}`;
                const aviso = textoRecordatorio(tp.departure_time);
                if (aviso && !emitidos.has(k)) {
                    nuevos.push({
                        tipo: 'viaje',
                        titulo: 'Recordatorio de viaje',
                        mensaje: `Conduces el viaje ${tp.origin} → ${tp.destination}, que sale ${aviso}.`,
                        enlace: `/manage-trip/${tp.id}`,
                    });
                    emitidos.add(k);
                }
            }

            // Mensaje de bienvenida una vez por sesión (da sentido a la pantalla y evita verla vacía)
            if (!emitidos.has('welcome')) {
                nuevos.push({
                    tipo: 'sistema',
                    titulo: 'Centro de notificaciones',
                    mensaje: 'Aquí te avisaremos de tus reservas, cancelaciones de viajes y recordatorios de salida.',
                });
                emitidos.add('welcome');
            }

            // Actualizamos la instantánea de referencia y los recordatorios emitidos
            localStorage.setItem(claveBase(uid), JSON.stringify({
                b: Object.fromEntries(reservas.map((bk) => [bk.id, bk.status])),
                t: Object.fromEntries(viajes.map((tp) => [tp.id, tp.seats_available])),
            }));
            sessionStorage.setItem(claveDedupe(uid), JSON.stringify([...emitidos]));

            if (nuevos.length > 0) {
                setNotificaciones((prev) => [
                    ...nuevos.map((n, i) => ({ id: Date.now() + i, tiempo: 'Ahora', leida: false, tipo: 'sistema', ...n })),
                    ...prev,
                ]);
            }
        } finally {
            sincronizandoRef.current = false;
        }
    }, [user?.id]);

    // Sincroniza al iniciar sesión y periódicamente mientras la pestaña está abierta
    useEffect(() => {
        if (user?.id == null) return;
        sync();
        const intervalo = setInterval(sync, INTERVALO_SYNC);
        return () => clearInterval(intervalo);
    }, [user?.id, sync]);

    const value = { notificaciones, add, marcarLeida, marcarTodas, eliminar, sync };

    return (
        <NotificationsContext.Provider value={value}>
            {children}
        </NotificationsContext.Provider>
    );
}
