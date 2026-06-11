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
    }
}

export function limpiarCache() {
    Object.keys(sessionStorage)
        .filter(clave => clave.startsWith(PREFIJO))
        .forEach(clave => sessionStorage.removeItem(clave));
}
