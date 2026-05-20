import '../../styles/LandingShared.css'
import '../../styles/TopbarLanding.css'

export default function TopbarLanding({ onLogin, OnRegistro }) {
    const isLogged = !!localStorage.getItem('authToken');

    return (
        <header className="landing-topbar">
            <div className="landing-topbar_interior">
                <div className="landing-topbar_izquierda">
                    <h2 className="landing-topbar_logo">UniCar</h2>
                    <nav className="landing-topbar_nav">
                        <a href="#como-funciona">Cómo Funciona</a>
                        <a href="#beneficios">Beneficios</a>
                    </nav>
                </div>
                
                <div className="landing-topbar_acciones">
                    {/*Si está logueado, botón al Dashboard. Si no, botones normales */}
                    {isLogged ? (
                        <a 
                            href="/dashboard" 
                            className="landing-btn landing-btn_primario landing-btn_pastilla"
                        >
                            Ir al Dashboard
                        </a>
                    ) : (
                        <>
                            <a href="/auth" className="landing-topbar_login" onClick={onLogin}>
                                Log In
                            </a>
                            <a 
                                href="/auth" 
                                className="landing-btn landing-btn_primario landing-btn_pastilla"
                                onClick={OnRegistro}
                            >
                                Crear Cuenta
                            </a>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}