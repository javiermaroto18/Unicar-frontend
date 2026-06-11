// Caché ligera de listados en sessionStorage.
// Guarda el último resultado de una pantalla para mostrarlo al instante
// al volver a ella, mientras se pide la versión fresca al servidor.

const PREFIJO = 'cache:';

export function leerCache(clave) {
    try {
        const guardado = sessionStorage.getItem(PREFIJO + clave);
        return guardado ? JSON.parse(guardado) : null;
    } catch {
        return null;
    }
}

export function guardarCache(clave, datos) {
    try {
        sessionStorage.setItem(PREFIJO + clave, JSON.stringify(datos));
    } catch {
        // Si el almacenamiento falla (lleno, modo privado...) seguimos sin caché
    }
}

// Borra todas las entradas de caché. Se llama al iniciar o cerrar sesión
// para que un usuario nunca vea los datos de otro.
export function limpiarCache() {
    Object.keys(sessionStorage)
        .filter(clave => clave.startsWith(PREFIJO))
        .forEach(clave => sessionStorage.removeItem(clave));
}
