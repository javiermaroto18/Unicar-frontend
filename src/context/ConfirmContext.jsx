import { createContext, useContext, useState, useCallback, useRef } from 'react';
import ConfirmDialog from '../components/common/ConfirmDialog.jsx';

/*
 * Contexto global de confirmaciones.
 * Sustituye a window.confirm()/prompt() por un modal propio sin perder la comodidad
 * de uso: el hook devuelve una función que retorna una Promesa<boolean>.
 *
 * Uso:
 *   const confirm = useConfirm();
 *   const ok = await confirm({ title: '...', message: '...', variant: 'danger' });
 *   if (!ok) return;
 */
const ConfirmContext = createContext();

export function useConfirm() {
    return useContext(ConfirmContext);
}

export function ConfirmProvider({ children }) {
    const [opciones, setOpciones] = useState(null); // null = modal cerrado
    const resolverRef = useRef(null);               // guarda el resolve de la promesa activa

    const confirm = useCallback((config) => {
        return new Promise((resolve) => {
            resolverRef.current = resolve;
            setOpciones(config || {});
        });
    }, []);

    // Cierra el modal resolviendo la promesa con true (confirmar) o false (cancelar)
    const cerrar = useCallback((resultado) => {
        if (resolverRef.current) {
            resolverRef.current(resultado);
            resolverRef.current = null;
        }
        setOpciones(null);
    }, []);

    return (
        <ConfirmContext.Provider value={confirm}>
            {children}
            {opciones && (
                <ConfirmDialog
                    opciones={opciones}
                    onConfirmar={() => cerrar(true)}
                    onCancelar={() => cerrar(false)}
                />
            )}
        </ConfirmContext.Provider>
    );
}
