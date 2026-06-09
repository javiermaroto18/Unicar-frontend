import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import AppLayout            from '../common/AppLayout.jsx';
import PageHeader           from '../common/PageHeader.jsx';
import NotificationFilters  from '../notifications/NotificationFilters.jsx';
import NotificationList     from '../notifications/NotificationList.jsx';
import NotificationsSummary from '../notifications/NotificationsSummary.jsx';
import ProximoViajeCard     from '../notifications/ProximoViajeCard.jsx';

import { useToast } from '../../context/ToastContext.jsx';
import { useNotifications } from '../../context/NotificationsContext.jsx';

import '../../styles/Notifications.css';

export default function NotificationsPage() {
    const navigate = useNavigate();
    const toast = useToast();

    const { notificaciones, marcarLeida, marcarTodas, eliminar } = useNotifications();
    const [filtro, setFiltro] = useState('todas');       // estado de lectura: todas | noLeidas
    const [tipoFiltro, setTipoFiltro] = useState(null);  // tipo: null | 'reserva' | 'viaje' | 'sistema'

    const totalNoLeidas = useMemo(
        () => notificaciones.filter((n) => !n.leida).length,
        [notificaciones]
    );

    // Combina el filtro de pestaña (lectura) con el filtro de tipo de la barra lateral
    const visibles = useMemo(() => {
        return notificaciones.filter((n) => {
            if (filtro === 'noLeidas' && n.leida) return false;
            if (tipoFiltro && (n.tipo || 'sistema') !== tipoFiltro) return false;
            return true;
        });
    }, [notificaciones, filtro, tipoFiltro]);

    // Al abrir una notificación: la marcamos leída y, si tiene destino, navegamos
    function handleAbrir(n) {
        if (!n.leida) marcarLeida(n.id);
        if (n.enlace) navigate(n.enlace);
    }

    function handleMarcarTodas() {
        marcarTodas();
        toast.success('Todas las notificaciones se han marcado como leídas.');
    }

    function handleEliminar(id) {
        eliminar(id);
        toast.info('Notificación eliminada.');
    }

    return (
        <AppLayout
            activeHref="/notifications"
            onPublish={() => navigate('/publish')}
        >
            <div className="notif-wrap">
                <PageHeader
                    title="Notificaciones"
                    subtitle="Reservas, viajes y avisos de tu actividad en UniCar."
                />

                <div className="notif-page">
                <div className="notif-main">
                    <NotificationFilters
                        filtroActivo={filtro}
                        onCambiarFiltro={setFiltro}
                        totalNoLeidas={totalNoLeidas}
                        onMarcarTodas={handleMarcarTodas}
                    />
                    <NotificationList
                        notificaciones={visibles}
                        onAbrir={handleAbrir}
                        onMarcarLeida={marcarLeida}
                        onEliminar={handleEliminar}
                    />
                </div>

                <aside className="notif-aside">
                    <NotificationsSummary
                        notificaciones={notificaciones}
                        tipoActivo={tipoFiltro}
                        onTipoChange={setTipoFiltro}
                    />
                    <ProximoViajeCard />
                </aside>
                </div>
            </div>
        </AppLayout>
    );
}
