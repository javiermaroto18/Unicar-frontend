import { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionVerification.css';

const STATUS_STEPS = [
    { key: 'email',  icon: 'check_circle', iconMod: '--green', title: 'Email Institucional', sub: 'Verificado',          dim: false },
    { key: 'docs',   icon: 'pending',       iconMod: '--muted', title: 'Documentación',       sub: 'Pendiente de envío', dim: true  },
    { key: 'history',icon: 'history',       iconMod: '--muted', title: 'Historial de Viajes', sub: 'Bloqueado',          dim: true  },
];

export default function ProfileSectionVerification() {
    const { user } = useAuth();
    const isVerified = user?.is_verified_driver === true;
    
    const [isDragOver,    setIsDragOver]    = useState(false);
    const [selectedFile,  setSelectedFile]  = useState(null);

    function handleDrop(e) {
        e.preventDefault();
        if (isVerified) return;
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file) setSelectedFile(file.name);
    }

    function handleFileChange(e) {
        if (e.target.files[0]) setSelectedFile(e.target.files[0].name);
    }


    // Pasos según el estado del usuario
    const STATUS_STEPS = [
        { 
            key: 'email',  
            icon: 'check_circle', 
            iconMod: '--green', 
            title: 'Email Institucional', 
            sub: 'Verificado',          
            dim: false 
        },
        { 
            key: 'docs',   
            icon: isVerified ? 'check_circle' : 'pending',       
            iconMod: isVerified ? '--green' : '--muted', 
            title: 'Documentación',       
            sub: isVerified ? 'Validada correctamente' : 'Pendiente de envío', 
            dim: !isVerified  
        },
        { 
            key: 'history',
            icon: isVerified ? 'lock_open' : 'history',       
            iconMod: isVerified ? '--blue' : '--muted', 
            title: 'Historial de Viajes', 
            sub: isVerified ? 'Desbloqueado' : 'Bloqueado',          
            dim: !isVerified  
        },
    ];

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Verificación de identidad</h2>
                    <p className="psection-subtitulo">Necesaria para publicar y reservar viajes en UniCar.</p>
                </div>
            </div>

            {/* Renderizado condicional del banner de alerta */}
            {!isVerified ? (
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
            ) : (
                <div className="prof-alert-banner" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
                    <div className="prof-alert-banner-icono-contenedor" style={{ backgroundColor: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
                        <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                        <p className="prof-alert-banner-titulo" style={{ color: '#34d399' }}>Cuenta Verificada</p>
                        <p className="prof-alert-banner-texto">
                            Tu identidad ha sido confirmada. Ya puedes publicar y reservar viajes sin restricciones.
                        </p>
                    </div>
                </div>
            )}

            <div className="prof-verify-card">
                <div className="prof-verify-card-encabezado">
                    <span className="material-symbols-outlined prof-verify-card-encabezado-icono">badge</span>
                    <h3 className="prof-verify-card-titulo">Carnet Universitario</h3>
                </div>
                
                {isVerified ? (
                    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '4rem', color: '#34d399', marginBottom: '1rem' }}>
                            task_alt
                        </span>
                        <p style={{ color: '#f1f5f9', fontWeight: 'bold', fontSize: '1.1rem' }}>
                            Carnet validado con éxito
                        </p>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '0.5rem' }}>
                            No necesitas realizar ninguna acción adicional.
                        </p>
                    </div>
                ) : (
                    <>
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
                            <button className="prof-btn-send" disabled={!selectedFile}>
                                Enviar para verificación
                                <span className="material-symbols-outlined">send</span>
                            </button>
                            <div className="prof-verify-card-nota">
                                <span className="material-symbols-outlined prof-verify-card-nota-icono">info</span>
                                La validación manual puede tardar hasta 24 horas.
                            </div>
                        </div>
                    </>
                )}
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