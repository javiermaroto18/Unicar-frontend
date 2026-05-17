import { useState } from 'react';

import HeroAuth from '../auth/HeroAuth';
import FormularioLogin from '../auth/FormularioLogin';
import FormularioRegistro from '../auth/FormularioRegistro';

import '../../styles/AuthPage.css';

export default function AuthPage() {
    // Solo necesitamos el estado para saber qué pestaña está activa
    const [tabActivo, setTabActivo] = useState('registro');

    return (
        <div className="auth-pagina">
            <HeroAuth />

            <div className="auth-formulario-lado">
                <div className="auth-formulario-lado_brillo auth-formulario-lado_brillo-superior" />
                <div className="auth-formulario-lado_brillo auth-formulario-lado_brillo-inferior" />

                <div className="auth-tarjeta">
                    <nav className="auth-tabs">
                        <button
                            className={`auth-tabs_boton${tabActivo === 'login' ? ' auth-tabs_boton-activo' : ''}`}
                            onClick={() => setTabActivo('login')}
                        >
                            Iniciar sesión
                        </button>
                        <button
                            className={`auth-tabs_boton${tabActivo === 'registro' ? ' auth-tabs_boton-activo' : ''}`}
                            onClick={() => setTabActivo('registro')}
                        >
                            Registrarse
                        </button>
                    </nav>

                    {/* Renderizamos los componentes sin pasarles props, 
                        ellos mismos se encargan de sus llamadas a la API y sus errores */}
                    {tabActivo === 'login' ? <FormularioLogin /> : <FormularioRegistro />}

                    <footer className="auth-tarjeta_pie">
                        <p className="auth-tarjeta_legal">
                            Al registrarte, aceptas nuestros{' '}
                            <a href="#">Términos de Servicio</a>
                            {' '}y <a href="#">Política de Privacidad</a>.
                        </p>
                        <a className="auth-tarjeta_volver" href="/">← Volver al inicio</a>
                    </footer>
                </div>
            </div>
        </div>
    );
}