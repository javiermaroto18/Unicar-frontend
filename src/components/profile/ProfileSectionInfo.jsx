import { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext.jsx';
import { profileService } from '../../api/profileService';
import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionInfo.css';

export default function ProfileSectionInfo() {
    const { user } = useAuth();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState(false);
    
    const [form, setForm] = useState({
        name: user?.name || '',
        notification_email: user?.notification_email || '',
    });

    // Controladores de la imagen
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
    const fileInputRef = useRef(null);

    // Comprobamos en tiempo real si el usuario ha modificado algo
    const hasChanges = 
        form.name !== (user?.name || '') || 
        form.notification_email !== (user?.notification_email || '') || 
        avatarFile !== null;

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.warning("La imagen es demasiado grande. El máximo es 2MB.");
                return;
            }
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file)); 
        }
    }

    async function handleSave() {
        if (!hasChanges) return; 

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            
            formData.append('notification_email', form.notification_email);
            
            if (avatarFile) {
                formData.append('avatar', avatarFile);
            }
            
            formData.append('_method', 'PUT'); 

            await profileService.updateProfile(formData);
            
            setAvatarFile(null);

            toast.success("Perfil actualizado correctamente. (Recarga para ver los cambios)");
        } catch (error) {
            console.error(error);
            toast.error("Error al actualizar el perfil.");
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
                {/* Se desactiva si no hay cambios o si está cargando */}
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

            <div className="avatar-editor">
                <div className="avatar-editor-img-contenedor">
                    {avatarPreview ? (
                        <img className="avatar-editor-img" src={avatarPreview} alt={user.name} />
                    ) : (
                        <span className="material-symbols-outlined avatar-editor-img" style={{display:'flex', alignItems:'center', justifyContent:'center', fontSize: '3rem', background:'#374151', color:'white'}}>person</span>
                    )}
                    
                    <input 
                        type="file" 
                        accept="image/png, image/jpeg, image/jpg, image/webp" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        onChange={handleImageChange} 
                    />
                    
                    <button 
                        className="avatar-editor-boton"
                        onClick={() => fileInputRef.current.click()}
                    >
                        <span className="material-symbols-outlined">photo_camera</span>
                    </button>
                </div>
                <div>
                    <p className="avatar-editor-pista">Foto de perfil</p>
                    <p className="avatar-editor-subtexto">Formatos admitidos: JPG, PNG, WEBP. Max: 2MB.</p>
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

                <div className="pfield">
                    <label className="pfield-etiqueta">Correo de notificaciones</label>
                    <input className="pfield-entrada" type="email" value={form.notification_email}
                        onChange={e => handleChange('notification_email', e.target.value)} />
                </div>
            </div>
        </section>
    );
}