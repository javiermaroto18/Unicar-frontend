import { useState } from 'react';
import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionVerification.css';

const STATUS_STEPS = [
    { key: 'email',  icon: 'check_circle', iconMod: '--green', title: 'Email Institucional', sub: 'Verificado',          dim: false },
    { key: 'docs',   icon: 'pending',       iconMod: '--muted', title: 'Documentación',       sub: 'Pendiente de envío', dim: true  },
    { key: 'history',icon: 'history',       iconMod: '--muted', title: 'Historial de Viajes', sub: 'Bloqueado',          dim: true  },
];

export default function ProfileSectionVerification() {
    const [isDragOver,    setIsDragOver]    = useState(false);
    const [selectedFile,  setSelectedFile]  = useState(null);

    function handleDrop(e) {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) setSelectedFile(file.name);
    }

    function handleFileChange(e) {
        if (e.target.files[0]) setSelectedFile(e.target.files[0].name);
    }

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Verificación de identidad</h2>
                    <p className="psection-subtitulo">Necesaria para publicar y reservar viajes en UniCar.</p>
                </div>
            </div>

            <div className="prof-alert-banner">
                <div className="prof-alert-banner-icono-contenedor">
                    <span className="material-symbols-outlined">shield_person</span>
                </div>
                <div>
                    <p className="prof-alert-banner-titulo">Acción requerida</p>
                    <p className="prof-alert-banner-texto">
                        Para poder publicar o reservar viajes, necesitas verificar tu condición de estudiante.
                    </p>
                </div>
            </div>

            <div className="prof-verify-card">
                <div className="prof-verify-card-encabezado">
                    <span className="material-symbols-outlined prof-verify-card-encabezado-icono">badge</span>
                    <h3 className="prof-verify-card-titulo">Carnet Universitario</h3>
                </div>
                <p className="prof-verify-card-descripcion">
                    Sube una foto clara de tu carnet universitario vigente para confirmar tu identidad dentro de UniCar.
                </p>

                <div
                    className={`prof-dropzone${isDragOver ? ' prof-dropzone--over' : ''}`}
                    onClick={() => document.getElementById('prof-file-input').click()}
                    onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                    onDragLeave={() => setIsDragOver(false)}
                    onDrop={handleDrop}
                >
                    <div className="prof-dropzone-icono-contenedor">
                        <span className="material-symbols-outlined prof-dropzone-icono">cloud_upload</span>
                    </div>
                    <p className="prof-dropzone-etiqueta">
                        {selectedFile
                            ? `✓ Archivo seleccionado: ${selectedFile}`
                            : 'Arrastra tu archivo aquí o haz clic para explorar'}
                    </p>
                    <p className="prof-dropzone-nota">
                        <span className="material-symbols-outlined prof-dropzone-candado">lock</span>
                        Tus datos viajan encriptados de extremo a extremo
                    </p>
                    <input id="prof-file-input" type="file" accept="image/*,.pdf"
                        style={{ display: 'none' }} onChange={handleFileChange} />
                </div>

                <div className="prof-verify-card-llamada-accion">
                    <button className="prof-btn-send">
                        Enviar para verificación
                        <span className="material-symbols-outlined">send</span>
                    </button>
                    <div className="prof-verify-card-nota">
                        <span className="material-symbols-outlined prof-verify-card-nota-icono">info</span>
                        La validación manual puede tardar hasta 24 horas.
                    </div>
                </div>
            </div>

            <div className="prof-status-grid">
                {STATUS_STEPS.map(({ key, icon, iconMod, title, sub, dim }) => (
                    <div key={key} className={`prof-status-item${dim ? ' prof-status-item--dim' : ''}`}>
                        <span className={`material-symbols-outlined prof-status-item-icono prof-status-item-icono${iconMod}`}>
                            {icon}
                        </span>
                        <div>
                            <p className="prof-status-item-titulo">{title}</p>
                            <p className="prof-status-item-subtexto">{sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
