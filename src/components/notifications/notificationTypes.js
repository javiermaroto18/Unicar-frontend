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

// Devuelve el icono y el tipo normalizado (con 'sistema' como respaldo).
// Si la notificación trae un icono propio, ese tiene prioridad sobre el del tipo.
export function getNotifConfig(tipo, iconoPropio) {
    const tipoFinal = NOTIF_TIPO_CONFIG[tipo] ? tipo : 'sistema';
    return { icon: iconoPropio || NOTIF_TIPO_CONFIG[tipoFinal].icon, tipo: tipoFinal };
}

// Convierte el momento de creación en una etiqueta relativa ("Ahora", "hace 5 min"...).
// Se calcula en el cliente al renderizar: no hay ninguna petición al servidor.
export function formatearTiempo(timestamp) {
    if (!timestamp) return '';
    const min = Math.floor((Date.now() - timestamp) / 60000);
    if (min < 1) return 'Ahora';
    if (min < 60) return `hace ${min} min`;
    const horas = Math.floor(min / 60);
    if (horas < 24) return `hace ${horas} h`;
    const dias = Math.floor(horas / 24);
    return dias === 1 ? 'hace 1 día' : `hace ${dias} días`;
}
