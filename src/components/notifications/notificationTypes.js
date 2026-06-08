/*
 * Configuración compartida por tipo de notificación: el icono de Material Symbols.
 * La usan tanto la lista de la pantalla (NotificationItem) como el desplegable del
 * Topbar (NotificationsDropdown), para no duplicar el mapeo en dos sitios.
 *
 * El color de acento se aplica con clases CSS por tipo (notif-item-icono--<tipo>,
 * notif-drop-icono--<tipo>) en cada contexto.
 */
export const NOTIF_TIPO_CONFIG = {
    reserva: { icon: 'event_seat' },
    viaje:   { icon: 'directions_car' },
    mensaje: { icon: 'chat_bubble' },
    sistema: { icon: 'verified' },
};

// Devuelve el icono y el tipo normalizado (con 'sistema' como respaldo)
export function getNotifConfig(tipo) {
    const tipoFinal = NOTIF_TIPO_CONFIG[tipo] ? tipo : 'sistema';
    return { icon: NOTIF_TIPO_CONFIG[tipoFinal].icon, tipo: tipoFinal };
}
