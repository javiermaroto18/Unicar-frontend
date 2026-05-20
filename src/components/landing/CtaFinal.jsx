import '../../styles/LandingShared.css'
import '../../styles/SeccionesLanding.css'

export default function CtaFinal({ onCrearCuenta, onVerInfo}){
    <div className="landing-cta-final">
        <div className="landing-cta-final_interior">
            <div className="landing-cta-final_texto">
                <h2 className="landing-cta-final_titulo">
                    ¿Listo para transformar tu forma de llegar a la U?
                </h2>
                <p className="landing-cta-final_subtitulo">
                    únete a la comunidad de carpooling más grande de tu universidad. Es fácil, seguro y gratis.
                </p>
            </div>
            <div className="landing-cta-final_acciones">
                <button 
                    className="landing-btn landing-btn_oscuro landing-btn_grande"
                    onClick={onCrearCuenta}
                >
                    Crear cuenta gratis
                    <span className="material-symbols-outlined">arrow_forward</span>
                </button>
                <button
                    className="landing-btn landing-btn_tenue landing-btn_grande"
                    onClick={onVerInfo}
                >
                    Ver más info
                </button>
            </div>
        </div>
    </div>
}