import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { profileService } from '../../api/profileService';
import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionInfo.css';

export default function ProfileSectionInfo() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    
    const [form, setForm] = useState({
        name: user?.name || '',
    });

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    async function handleSave() {
        setIsLoading(true);
        try {
            // Llamamos al servicio para actualizar el perfil
            await profileService.updateProfile(form);
            alert("Perfil actualizado correctamente. (Recarga para ver los cambios)");
            // En un futuro añadiremos aquí una función para que el Contexto se refresque solo
        } catch (error) {
            console.error(error);
            alert("Error al actualizar el perfil.");
        } finally {
            setIsLoading(false);
        }
    }

    if (!user) return null;

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Información personal</h2>
                    <p className="psection-subtitulo">Estos datos son visibles para otros usuarios de UniCar.</p>
                </div>
                <button className="btn-save" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Guardando...' : 'Guardar cambios'}
                </button>
            </div>

            <div className="avatar-editor">
                <div className="avatar-editor-img-contenedor">
                    {user.avatar ? (
                        <img className="avatar-editor-img" src={user.avatar} alt={user.name} />
                    ) : (
                         <span className="material-symbols-outlined avatar-editor-img" style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize: '3rem', background:'#374151', color:'white'}}>person</span>
                    )}
                    <button className="avatar-editor-boton">
                        <span className="material-symbols-outlined">photo_camera</span>
                    </button>
                </div>
                <div>
                    <p className="avatar-editor-pista">Foto de perfil</p>
                    <p className="avatar-editor-subtexto">Funcionalidad en desarrollo para la próxima fase</p>
                </div>
            </div>

            <div className="pform">
                <div className="pfield">
                    <label className="pfield-etiqueta">Nombre Completo</label>
                    <input className="pfield-entrada" type="text" value={form.name}
                        onChange={e => handleChange('name', e.target.value)} />
                </div>

                <div className="pfield">
                    <label className="pfield-etiqueta">Correo universitario</label>
                    <div className="pfield-entrada-contenedor">
                        <input className="pfield-entrada pfield-entrada--bloqueada" type="email"
                            value={user.email} readOnly />
                        <span className="pfield-icono-candado material-symbols-outlined">lock</span>
                    </div>
                    <p className="pfield-pista">El correo institucional no puede modificarse.</p>
                </div>
            </div>
        </section>
    );
}