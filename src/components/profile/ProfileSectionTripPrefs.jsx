import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext.jsx';
import { useNotifications } from '../../context/NotificationsContext.jsx';
import { profileService } from '../../api/profileService';
import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionOthers.css';

const PREFS_CONFIG = [
    {
        key: 'music', icon: 'music_note', color: '--blue',
        label: 'Música', sub: '¿Pones música durante el trayecto?',
        options: [
            { val: 'si',       label: 'Sí' },
            { val: 'no',       label: 'No' },
            { val: 'pasajero', label: 'Lo decide el pasajero' },
        ],
        default: 'si',
    },
    {
        key: 'pets', icon: 'pets', color: '--amber',
        label: 'Mascotas', sub: '¿Admites mascotas pequeñas?',
        options: [{ val: 'si', label: 'Sí' }, { val: 'no', label: 'No' }],
        default: 'si',
    },
    {
        key: 'chat', icon: 'chat', color: '--green',
        label: 'Conversación', sub: '¿Cómo prefieres el ambiente?',
        options: [{ val: 'hablador', label: 'Me gusta charlar' }, { val: 'silencio', label: 'Prefiero silencio' }],
        default: 'hablador',
    },
    {
        key: 'ac', icon: 'ac_unit', color: '--blue',
        label: 'Aire acondicionado', sub: '¿Llevas el aire puesto habitualmente?',
        options: [
            { val: 'si',    label: 'Sí' },
            { val: 'no',    label: 'No' },
            { val: 'segun', label: 'Según temperatura' },
        ],
        default: 'si',
    },
    {
        key: 'smoke', icon: 'smoking_rooms', color: '--muted',
        label: 'Fumadores', sub: '¿Se puede fumar en el vehículo?',
        options: [{ val: 'si', label: 'Sí' }, { val: 'no', label: 'No' }],
        default: 'no',
    },
];

export default function ProfileSectionTripPrefs() {
    const { user } = useAuth();
    const toast = useToast();
    const { add: addNotificacion } = useNotifications();
    const [isLoading, setIsLoading] = useState(false);
    const initialPrefs = user?.preferences || Object.fromEntries(PREFS_CONFIG.map(p => [p.key, p.default]));    
    const [prefs, setPrefs] = useState(initialPrefs);
    const hasChanges = JSON.stringify(prefs) !== JSON.stringify(initialPrefs);

    async function handleSave() {
        if (!hasChanges) return;

        setIsLoading(true);
        try {
            await profileService.updatePreferences({ preferences: prefs });

            addNotificacion({
                tipo: 'sistema',
                icono: 'tune',
                titulo: 'Preferencias actualizadas',
                mensaje: 'Has actualizado tus preferencias de viaje.',
                enlace: '/profile',
            });

            toast.success("Preferencias actualizadas correctamente. (Recarga para ver los cambios)");
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar las preferencias.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Preferencias de viaje</h2>
                    <p className="psection-subtitulo">Los pasajeros verán esto antes de reservar tu coche.</p>
                </div>
                
                <button 
                    className="btn-save" 
                    onClick={handleSave} 
                    disabled={isLoading || !hasChanges}
                    style={{ 
                        opacity: (!hasChanges && !isLoading) ? 0.5 : 1, 
                        cursor: (!hasChanges && !isLoading) ? 'not-allowed' : 'pointer' 
                    }}
                >
                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                </button>
            </div>

            <div className="prof-prefs-grid">
                {PREFS_CONFIG.map(({ key, icon, color, label, sub, options }) => (
                    <div key={key} className="prof-pref-card">
                        <div className="prof-pref-card-superior">
                            <div className={`prof-pref-card-icono prof-pref-card-icono${color}`}>
                                <span className="material-symbols-outlined">{icon}</span>
                            </div>
                            <div>
                                <p className="prof-pref-card-etiqueta">{label}</p>
                                <p className="prof-pref-card-subtexto">{sub}</p>
                            </div>
                        </div>
                        <div className="prof-toggle-group">
                            {options.map(({ val, label: optLabel }) => (
                                <button
                                    key={val}
                                    className={`prof-toggle-opt${prefs[key] === val ? ' prof-toggle-opt--activo' : ''}`}
                                    onClick={() => setPrefs(prev => ({ ...prev, [key]: val }))}
                                >
                                    {optLabel}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}