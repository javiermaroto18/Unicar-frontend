import { useState } from 'react';
import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionInfo.css';

export default function ProfileSectionInfo({ user, onSave }) {
    const [form, setForm] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        university: user.university,
        faculty: user.faculty,
        bio: user.bio ?? '',
    });

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Información personal</h2>
                    <p className="psection-subtitulo">Estos datos son visibles para otros usuarios de UniCar.</p>
                </div>
                <button className="btn-save" onClick={() => onSave?.(form)}>Guardar cambios</button>
            </div>

            <div className="avatar-editor">
                <div className="avatar-editor-img-contenedor">
                    <img className="avatar-editor-img" src={user.avatar} alt={user.name} />
                    <button className="avatar-editor-boton">
                        <span className="material-symbols-outlined">photo_camera</span>
                    </button>
                </div>
                <div>
                    <p className="avatar-editor-pista">Foto de perfil</p>
                    <p className="avatar-editor-subtexto">JPG o PNG, máximo 5 MB</p>
                </div>
            </div>

            <div className="pform">
                <div className="pform-fila">
                    <div className="pfield">
                        <label className="pfield-etiqueta">Nombre</label>
                        <input className="pfield-entrada" type="text" value={form.firstName}
                            onChange={e => handleChange('firstName', e.target.value)} />
                    </div>
                    <div className="pfield">
                        <label className="pfield-etiqueta">Apellidos</label>
                        <input className="pfield-entrada" type="text" value={form.lastName}
                            onChange={e => handleChange('lastName', e.target.value)} />
                    </div>
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

                <div className="pform-fila">
                    <div className="pfield">
                        <label className="pfield-etiqueta">Universidad</label>
                        <input className="pfield-entrada" type="text" value={form.university}
                            onChange={e => handleChange('university', e.target.value)} />
                    </div>
                    <div className="pfield">
                        <label className="pfield-etiqueta">Facultad</label>
                        <input className="pfield-entrada" type="text" value={form.faculty}
                            onChange={e => handleChange('faculty', e.target.value)} />
                    </div>
                </div>

                <div className="pfield">
                    <label className="pfield-etiqueta">
                        Sobre mí <span className="pfield-etiqueta-opcional">(opcional)</span>
                    </label>
                    <textarea className="pfield-entrada pfield-area-texto" rows={3}
                        placeholder="Cuéntanos algo sobre ti..."
                        value={form.bio}
                        onChange={e => handleChange('bio', e.target.value)} />
                </div>
            </div>
        </section>
    );
}
