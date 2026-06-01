import '../../styles/LandingShared.css'
import '../../styles/SeccionesLanding.css'

export default function CtaFinal({ isLogged, onCrearCuenta, onIrDashboard, onVerInfo }){
    return (
        <div className="landing-cta-final">
            <div className="landing-cta-final_interior">
                <div className="landing-cta-final_texto">
                    <h2 className="landing-cta-final_titulo">
                        ¿Listo para transformar tu forma de llegar a la U?
                    </h2>
                    <p className="landing-cta-final_subtitulo">
                        Únete a la comunidad de carpooling más grande de tu universidad. Es fácil, seguro y gratis.
                    </p>
                </div>
                <div className="landing-cta-final_acciones">
                    {/* Este boton solo aparece si el usuario está logueado */}
                    {isLogged ? (
                        <button 
                            className="landing-btn landing-btn_oscuro landing-btn_grande"
                            onClick={onIrDashboard}
                        >
                            Entrar a mi cuenta
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    ) : (
                        <button 
                            className="landing-btn landing-btn_oscuro landing-btn_grande"
                            onClick={onCrearCuenta}
                        >
                            Crear cuenta gratis
                            <span className="material-symbols-outlined">arrow_forward</span>
                        </button>
                    )}
                    
                    <button
                        className="landing-btn landing-btn_tenue landing-btn_grande"
                        onClick={onVerInfo}
                    >
                        Ver más info
                    </button>
                </div>
            </div>
        </div>
    );
}