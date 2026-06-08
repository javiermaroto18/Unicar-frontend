import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext.jsx';
import { useConfirm } from '../../context/ConfirmContext.jsx';
import { profileService } from '../../api/profileService';
import { authService } from '../../api/authService';

import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionOthers.css';

export default function ProfileSectionSecurity() {
    const { user, logout } = useAuth();
    const toast = useToast();
    const confirm = useConfirm();
    const [isLoading, setIsLoading] = useState(false);
    const [notificationsOn, setNotificationsOn] = useState(
        user?.preferences?.notifications_on ?? true
    );
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

    const [isLoggingOutOthers, setIsLoggingOutOthers] = useState(false);

    // Toggle de notificaciones
    const handleToggleNotifications = async (e) => {
        const isChecked = e.target.checked;
        setNotificationsOn(isChecked);
        try {
            const currentPrefs = user?.preferences || {};
            await profileService.updatePreferences({
                preferences: { ...currentPrefs, notifications_on: isChecked }
            });
        } catch (error) {
            console.error(error);
            setNotificationsOn(!isChecked); // Revertir si falla
            toast.error("Error al actualizar las notificaciones.");
        }
    };

    // Cambiar contraseña
    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) {
            toast.warning("Las contraseñas nuevas no coinciden.");
            return;
        }
        setIsLoading(true);
        try {
            await profileService.changePassword({
                current_password: passwords.current,
                new_password: passwords.new,
                new_password_confirmation: passwords.confirm
            });
            toast.success("Contraseña actualizada con éxito.");
            setShowPasswordForm(false);
            setPasswords({ current: '', new: '', confirm: '' });
        } catch (error) {
            toast.error(error.message || "Error al cambiar la contraseña.");
        } finally {
            setIsLoading(false);
        }
    };

    async function handleLogoutOtherSessions() {
        const ok = await confirm({
            title: 'Cerrar otras sesiones',
            message: 'Se cerrará la sesión en todos los demás dispositivos. Tendrás que volver a iniciar sesión en ellos.',
            confirmText: 'Cerrar otras sesiones',
            variant: 'danger',
            icon: 'devices',
        });
        if (!ok) return;

        setIsLoggingOutOthers(true);
        try {
            await authService.logoutOtherSessions();
            toast.success("¡Hecho! Se han cerrado todas las demás sesiones por seguridad.");
        } catch (error) {
            console.error("Error al cerrar otras sesiones:", error);
            toast.error("Hubo un problema al intentar cerrar las demás sesiones.");
        } finally {
            setIsLoggingOutOthers(false);
        }
    }

    // Eliminar cuenta
    const handleDeleteAccount = async () => {
        const ok = await confirm({
            title: 'Eliminar cuenta',
            message: 'Esta acción es irreversible. Se borrarán para siempre tu perfil, vehículos, viajes y reservas.',
            confirmText: 'Eliminar mi cuenta',
            variant: 'danger',
            icon: 'delete_forever',
            requireText: 'ELIMINAR',
        });
        if (!ok) return;

        setIsLoading(true);
        try {
            await profileService.deleteAccount();
            toast.success("Cuenta eliminada. Lamentamos verte partir.");
            logout(); // Expulsa al usuario al login
        } catch (error) {
            toast.error("Error al eliminar la cuenta.");
            setIsLoading(false);
        }
    };

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Seguridad</h2>
                    <p className="psection-subtitulo">Gestiona tu contraseña y el acceso a tu cuenta.</p>
                </div>
            </div>

            <div className="prof-security-cards">
                {/* TARJETA CONTRASEÑA */}
                <div className="prof-sec-card" style={{ flexDirection: 'column', alignItems: 'stretch' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div className="prof-sec-card-izquierda">
                            <div className="prof-sec-card-icono">
                                <span className="material-symbols-outlined">key</span>
                            </div>
                            <div>
                                <p className="prof-sec-card-titulo">Contraseña</p>
                                <p className="prof-sec-card-subtexto">Mantén tu cuenta segura</p>
                            </div>
                        </div>
                        <button 
                            className="prof-boton-accion-seguridad" 
                            onClick={() => setShowPasswordForm(!showPasswordForm)}
                        >
                            {showPasswordForm ? 'Cancelar' : 'Cambiar'}
                        </button>
                    </div>

                    {/* Formulario desplegable cambio contraseña */}
                    {showPasswordForm && (
                        <form onSubmit={handleChangePassword} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
                            <div className="pfield">
                                <label className="pfield-etiqueta">Contraseña actual</label>
                                <input className="pfield-entrada" type="password" required
                                    value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} />
                            </div>
                            <div className="pfield">
                                <label className="pfield-etiqueta">Nueva contraseña</label>
                                <input className="pfield-entrada" type="password" required minLength="8"
                                    value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} />
                            </div>
                            <div className="pfield">
                                <label className="pfield-etiqueta">Confirmar nueva contraseña</label>
                                <input className="pfield-entrada" type="password" required minLength="8"
                                    value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} />
                            </div>
                            <button type="submit" className="btn-save" disabled={isLoading} style={{ alignSelf: 'flex-start' }}>
                                {isLoading ? 'Guardando...' : 'Actualizar contraseña'}
                            </button>
                        </form>
                    )}
                </div>

                {/* TARJETA SESIONES */}
                <div className="prof-sec-card">
                    <div className="prof-sec-card-izquierda">
                        <div className="prof-sec-card-icono">
                            <span className="material-symbols-outlined">devices</span>
                        </div>
                        <div>
                            <p className="prof-sec-card-titulo">Sesiones activas</p>
                            <p className="prof-sec-card-subtexto">Cierra la sesión en otros móviles o PCs</p>
                        </div>
                    </div>
                    <button
                        className="btn-security-logout prof-boton-accion-seguridad"
                        onClick={handleLogoutOtherSessions}
                        disabled={isLoggingOutOthers}
                    >
                        {isLoggingOutOthers ? 'Cerrando sesiones...' : 'Cerrar otras sesiones'}
                    </button>
                </div>

                {/* TARJETA NOTIFICACIONES */}
                <div className="prof-sec-card">
                    <div className="prof-sec-card-izquierda">
                        <div className="prof-sec-card-icono">
                            <span className="material-symbols-outlined">notifications</span>
                        </div>
                        <div>
                            <p className="prof-sec-card-titulo">Notificaciones</p>
                            <p className="prof-sec-card-subtexto">Recibir correos de mis reservas y viajes</p>
                        </div>
                    </div>
                    <label className="prof-toggle-switch">
                        <input type="checkbox" checked={notificationsOn} onChange={handleToggleNotifications} disabled={isLoading} />
                        <span className="prof-toggle-switch-pista" />
                    </label>
                </div>

                {/* TARJETA ELIMINAR CUENTA */}
                <div className="prof-sec-card prof-sec-card--danger">
                    <div className="prof-sec-card-izquierda">
                        <div className="prof-sec-card-icono prof-sec-card-icono--peligro">
                            <span className="material-symbols-outlined">delete_forever</span>
                        </div>
                        <div>
                            <p className="prof-sec-card-titulo" style={{ color: '#f87171' }}>Eliminar cuenta</p>
                            <p className="prof-sec-card-subtexto">Esta acción es irreversible</p>
                        </div>
                    </div>
                    <button className="prof-boton-accion-seguridad prof-boton-accion-seguridad--peligro" onClick={handleDeleteAccount} disabled={isLoading}>
                        Eliminar
                    </button>
                </div>
            </div>
        </section>
    );
}