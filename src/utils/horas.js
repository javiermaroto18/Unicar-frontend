// Utilidades de horas para los viajes.
// La duración real no se guarda en base de datos, así que la hora de llegada
// de los listados es una estimación y se muestra con "~" delante.

export const DURACION_ESTIMADA_MIN = 40;

// "2026-06-15T08:30:00" -> "08:30"
export function horaDeSalida(departureTime) {
    if (!departureTime) return '--:--';
    const fechaLimpia = departureTime.replace('T', ' ');
    return fechaLimpia.split(' ')[1]?.substring(0, 5) || '--:--';
}

// "08:30" + 40 min -> "~09:10"
export function horaLlegadaEstimada(horaSalida, duracionMin = DURACION_ESTIMADA_MIN) {
    if (!horaSalida || horaSalida === '--:--') return '--:--';
    let [h, m] = horaSalida.split(':').map(Number);
    m += duracionMin;
    h = (h + Math.floor(m / 60)) % 24;
    m = m % 60;
    return `~${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
