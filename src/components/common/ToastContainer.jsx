import { useEffect, useState, useCallback } from 'react';
import '../../styles/Toast.css';

// Configuración visual por tipo de toast (icono + título corto)
const TOAST_CONFIG = {
    success: { icon: 'check_circle', titulo: 'Hecho' },
    error:   { icon: 'error',        titulo: 'Algo ha fallado' },
    warning: { icon: 'warning',      titulo: 'Atención' },
    info:    { icon: 'info',         titulo: 'Información' },
};

// Contenedor fijo que apila los toasts activos en la esquina superior derecha
export default function ToastContainer({ toasts, onClose }) {
    if (toasts.length === 0) return null;

    return (
        <div className="toast-contenedor" role="region" aria-live="polite" aria-label="Notificaciones">
            {toasts.map((t) => (
                <Toast key={t.id} toast={t} onClose={() => onClose(t.id)} />
            ))}
        </div>
    );
}

function Toast({ toast, onClose }) {
    const config = TOAST_CONFIG[toast.type] || TOAST_CONFIG.info;
    const [saliendo, setSaliendo] = useState(false);

    // Lanza la animación de salida y, al terminar, retira el toast del estado
    const cerrar = useCallback(() => {
        setSaliendo(true);
        setTimeout(onClose, 250); // debe coincidir con la duración de la animación CSS
    }, [onClose]);

    // Auto-cierre tras el tiempo indicado (si duration > 0)
    useEffect(() => {
        if (!toast.duration) return;
        const timer = setTimeout(cerrar, toast.duration);
        return () => clearTimeout(timer);
    }, [toast.duration, cerrar]);

    return (
        <div className={`toast toast-${toast.type}${saliendo ? ' toast-saliendo' : ''}`} role="alert">
            <span className="material-symbols-outlined toast-icono">{config.icon}</span>
            <div className="toast-cuerpo">
                <p className="toast-titulo">{config.titulo}</p>
                <p className="toast-mensaje">{toast.message}</p>
            </div>
            <button className="toast-cerrar" onClick={cerrar} aria-label="Cerrar notificación">
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
    );
}
