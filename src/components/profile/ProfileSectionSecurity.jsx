import { useState } from 'react';
import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionOthers.css';

export default function ProfileSectionSecurity() {
    const [notificationsOn, setNotificationsOn] = useState(true);

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Seguridad</h2>
                    <p className="psection-subtitulo">Gestiona tu contraseña y el acceso a tu cuenta.</p>
                </div>
            </div>

            <div className="prof-security-cards">
                <div className="prof-sec-card">
                    <div className="prof-sec-card-izquierda">
                        <div className="prof-sec-card-icono">
                            <span className="material-symbols-outlined">key</span>
                        </div>
                        <div>
                            <p className="prof-sec-card-titulo">Contraseña</p>
                            <p className="prof-sec-card-subtexto">Última modificación hace 3 meses</p>
                        </div>
                    </div>
                    <button className="prof-boton-accion-seguridad">Cambiar</button>
                </div>

                <div className="prof-sec-card">
                    <div className="prof-sec-card-izquierda">
                        <div className="prof-sec-card-icono">
                            <span className="material-symbols-outlined">devices</span>
                        </div>
                        <div>
                            <p className="prof-sec-card-titulo">Sesiones activas</p>
                            <p className="prof-sec-card-subtexto">1 dispositivo conectado actualmente</p>
                        </div>
                    </div>
                    <button className="prof-boton-accion-seguridad">Ver sesiones</button>
                </div>

                <div className="prof-sec-card">
                    <div className="prof-sec-card-izquierda">
                        <div className="prof-sec-card-icono">
                            <span className="material-symbols-outlined">notifications</span>
                        </div>
                        <div>
                            <p className="prof-sec-card-titulo">Notificaciones</p>
                            <p className="prof-sec-card-subtexto">Gestiona qué alertas quieres recibir</p>
                        </div>
                    </div>
                    <label className="prof-toggle-switch">
                        <input type="checkbox" checked={notificationsOn}
                            onChange={e => setNotificationsOn(e.target.checked)} />
                        <span className="prof-toggle-switch-pista" />
                    </label>
                </div>

                <div className="prof-sec-card prof-sec-card--danger">
                    <div className="prof-sec-card-izquierda">
                        <div className="prof-sec-card-icono prof-sec-card-icono--danger">
                            <span className="material-symbols-outlined">delete_forever</span>
                        </div>
                        <div>
                            <p className="prof-sec-card-titulo">Eliminar cuenta</p>
                            <p className="prof-sec-card-subtexto">Esta acción es irreversible</p>
                        </div>
                    </div>
                    <button className="prof-boton-accion-seguridad prof-boton-accion-seguridad--peligro">Eliminar</button>
                </div>
            </div>
        </section>
    );
}
