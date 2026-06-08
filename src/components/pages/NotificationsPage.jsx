import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import AppLayout           from '../common/AppLayout.jsx';
import PageHeader          from '../common/PageHeader.jsx';
import NotificationFilters from '../notifications/NotificationFilters.jsx';
import NotificationList    from '../notifications/NotificationList.jsx';

import { useToast } from '../../context/ToastContext.jsx';
import { MOCK_NOTIFICACIONES } from '../../utils/mockDataNotifications.js';

import '../../styles/Notifications.css';

export default function NotificationsPage() {
    const navigate = useNavigate();
    const toast = useToast();

    // Estado local: hoy se inicializa con datos mock (Fase 2: vendrá del backend)
    const [notificaciones, setNotificaciones] = useState(MOCK_NOTIFICACIONES);
    const [filtro, setFiltro] = useState('todas');

    const totalNoLeidas = useMemo(
        () => notificaciones.filter((n) => !n.leida).length,
        [notificaciones]
    );

    // Aplicamos el filtro de pestaña activo sobre la lista
    const visibles = useMemo(() => {
        if (filtro === 'noLeidas') {
            return notificaciones.filter((n) => !n.leida);
        }
        return notificaciones;
    }, [notificaciones, filtro]);

    function marcarLeida(id) {
        setNotificaciones((prev) =>
            prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
        );
    }

    function marcarTodasLeidas() {
        setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })));
        toast.success('Todas las notificaciones se han marcado como leídas.');
    }

    function eliminar(id) {
        setNotificaciones((prev) => prev.filter((n) => n.id !== id));
        toast.info('Notificación eliminada.');
    }

    return (
        <AppLayout
            activeHref="/notifications"
            hasNotifications={totalNoLeidas > 0}
            onPublish={() => navigate('/publish')}
        >
            <PageHeader
                title="Notificaciones"
                subtitle="Reservas, viajes y avisos de tu actividad en UniCar."
            />

            <NotificationFilters
                filtroActivo={filtro}
                onCambiarFiltro={setFiltro}
                totalNoLeidas={totalNoLeidas}
                onMarcarTodas={marcarTodasLeidas}
            />

            <NotificationList
                notificaciones={visibles}
                onMarcarLeida={marcarLeida}
                onEliminar={eliminar}
            />
        </AppLayout>
    );
}
