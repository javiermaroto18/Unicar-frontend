import { createContext, useState, useContext, useCallback, useRef } from 'react';
import ToastContainer from '../components/common/ToastContainer.jsx';

/*
 * Contexto global de notificaciones (toasts).
 * Sustituye a los alert() nativos del navegador por avisos visuales no bloqueantes.
 * Uso:  const toast = useToast();  toast.success('...');  toast.error('...');
 */
const ToastContext = createContext();

export function useToast() {
    return useContext(ToastContext);
}

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);
    const idRef = useRef(0); // contador incremental para dar una key única a cada toast

    const remove = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    // Crea un toast. duration en ms (0 = no se cierra solo).
    const show = useCallback((message, type = 'info', duration = 4000) => {
        const id = ++idRef.current;
        setToasts((prev) => [...prev, { id, message, type, duration }]);
        return id;
    }, []);

    // API cómoda por tipo: toast.success('...'), toast.error('...'), etc.
    const toast = {
        show,
        success: (msg, duration) => show(msg, 'success', duration),
        error:   (msg, duration) => show(msg, 'error', duration),
        warning: (msg, duration) => show(msg, 'warning', duration),
        info:    (msg, duration) => show(msg, 'info', duration),
    };

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <ToastContainer toasts={toasts} onClose={remove} />
        </ToastContext.Provider>
    );
}
