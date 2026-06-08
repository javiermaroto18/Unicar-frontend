import { useEffect, useState, useRef } from 'react';
import '../../styles/ConfirmDialog.css';

/*
 * Modal de confirmación. Lo renderiza el ConfirmProvider; no se usa directamente.
 * opciones admite:
 *   title        → título del diálogo
 *   message      → texto explicativo
 *   confirmText  → texto del botón de confirmar (def. "Confirmar")
 *   cancelText   → texto del botón de cancelar (def. "Cancelar")
 *   variant      → 'default' | 'danger' (color del icono y del botón)
 *   icon         → símbolo de Material Symbols (opcional)
 *   requireText  → si se indica, hay que teclear ese texto para habilitar la confirmación
 */
export default function ConfirmDialog({ opciones, onConfirmar, onCancelar }) {
    const {
        title = '¿Estás seguro?',
        message,
        confirmText = 'Confirmar',
        cancelText = 'Cancelar',
        variant = 'default',
        icon,
        requireText,
    } = opciones;

    const [texto, setTexto] = useState('');
    const inputRef = useRef(null);
    const confirmarRef = useRef(null);

    // Si se exige escribir un texto, el botón de confirmar se bloquea hasta que coincida
    const confirmacionValida = !requireText || texto === requireText;

    // Icono por defecto según la variante
    const iconoFinal = icon || (variant === 'danger' ? 'warning' : 'help');

    useEffect(() => {
        // Foco inicial: al input si hay que escribir; si no, al botón de confirmar
        if (requireText) {
            inputRef.current?.focus();
        } else {
            confirmarRef.current?.focus();
        }
    }, [requireText]);

    useEffect(() => {
        // Atajos de teclado: Esc cancela, Enter confirma (si es válido)
        function handleKey(e) {
            if (e.key === 'Escape') onCancelar();
            if (e.key === 'Enter' && confirmacionValida) onConfirmar();
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [confirmacionValida, onConfirmar, onCancelar]);

    return (
        <div className="confirm-overlay" onClick={onCancelar} role="presentation">
            <div
                className="confirm-dialog"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="confirm-titulo"
                onClick={(e) => e.stopPropagation()} // evita que un clic dentro cierre el modal
            >
                <div className={`confirm-icono confirm-icono--${variant}`}>
                    <span className="material-symbols-outlined">{iconoFinal}</span>
                </div>

                <h2 id="confirm-titulo" className="confirm-titulo">{title}</h2>
                {message && <p className="confirm-mensaje">{message}</p>}

                {requireText && (
                    <div className="confirm-campo">
                        <label className="confirm-campo-etiqueta">
                            Escribe <strong>{requireText}</strong> para confirmar
                        </label>
                        <input
                            ref={inputRef}
                            className="confirm-campo-input"
                            type="text"
                            value={texto}
                            onChange={(e) => setTexto(e.target.value)}
                            placeholder={requireText}
                            autoComplete="off"
                        />
                    </div>
                )}

                <div className="confirm-acciones">
                    <button
                        type="button"
                        className="confirm-btn confirm-btn--cancelar"
                        onClick={onCancelar}
                    >
                        {cancelText}
                    </button>
                    <button
                        ref={confirmarRef}
                        type="button"
                        className={`confirm-btn confirm-btn--confirmar confirm-btn--${variant}`}
                        onClick={onConfirmar}
                        disabled={!confirmacionValida}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
