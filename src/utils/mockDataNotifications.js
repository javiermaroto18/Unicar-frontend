/*
 * Datos simulados para la pantalla de Notificaciones.
 * Aún no existe un backend de notificaciones (previsto para Fase 2, junto al envío
 * de emails de cancelación), así que la vista se abastece de este mock, igual que el chat.
 *
 * Estructura de cada notificación:
 *   id      → identificador único
 *   tipo    → 'reserva' | 'viaje' | 'mensaje' | 'sistema'  (determina icono y color)
 *   titulo  → texto principal en negrita
 *   mensaje → detalle de la notificación
 *   tiempo  → texto relativo legible ("Hace 5 min")
 *   leida   → booleano; las no leídas se resaltan
 */
export const MOCK_NOTIFICACIONES = [
    {
        id: 1,
        tipo: 'reserva',
        titulo: 'Reserva confirmada',
        mensaje: 'Tu plaza en el viaje Campus Norte → Facultad de Medicina del 21 de mayo está confirmada.',
        tiempo: 'Hace 5 min',
        leida: false,
    },
    {
        id: 2,
        tipo: 'viaje',
        titulo: 'Un viaje ha sido cancelado',
        mensaje: 'Carlos R. ha cancelado el viaje CC City Center → Campus Sur del 22 de mayo. Tu plaza ha sido liberada.',
        tiempo: 'Hace 1 h',
        leida: false,
    },
    {
        id: 3,
        tipo: 'mensaje',
        titulo: 'Nuevo mensaje',
        mensaje: 'María G. te ha escrito: «¿A qué hora sales mañana?».',
        tiempo: 'Hace 3 h',
        leida: false,
    },
    {
        id: 4,
        tipo: 'reserva',
        titulo: 'Nuevo pasajero en tu viaje',
        mensaje: 'Lucía P. ha reservado una plaza en tu viaje Campus Norte → Atocha del 25 de mayo.',
        tiempo: 'Ayer',
        leida: true,
    },
    {
        id: 5,
        tipo: 'sistema',
        titulo: 'Ya eres conductor verificado',
        mensaje: 'Has registrado tu primer vehículo. A partir de ahora puedes publicar viajes en UniCar.',
        tiempo: 'Hace 2 días',
        leida: true,
    },
    {
        id: 6,
        tipo: 'viaje',
        titulo: 'Recordatorio de viaje',
        mensaje: 'Tu viaje hacia Facultad de Derecho sale en 3 horas. No olvides estar puntual en el punto de recogida.',
        tiempo: 'Hace 3 días',
        leida: true,
    },
];
