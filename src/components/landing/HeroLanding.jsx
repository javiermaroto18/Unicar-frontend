import '../../styles/LandingShared.css'
import '../../styles/HeroLanding.css'

export default function HeroLanding({ isLogged, onBuscar, onOfrecer }){
    return(
        <div className="landing-hero">
            {/* Overlay oscuro */}
            <div className="landing-hero_fondo"></div>
            <div className="landing-hero_overlay"></div> 
            
            <div className="landing-hero_contenido">
                <span className="landing-hero_etiqueta">Comunidad Universitaria Exclusiva</span>
                <h1 className="landing-hero_titulo">Viaja seguro con tu comunidad</h1>
                <p className="landing-hero_subtitulo">
                    Conecta con estudiantes de tu misma universidad. Comparte gastos, reduce tu huella de carbono y llega siempre a tiempo a tus clases.
                </p>
                <div className="landing-hero_ctas">
                    <button 
                        className="landing-btn landing-btn_primario landing-btn_grande"
                        onClick={onBuscar}
                    >
                        {isLogged ? 'Ir al Dashboard' : 'Buscar Viaje'}
                    </button>
                    <button 
                        className="landing-btn landing-btn_fantasma landing-btn_grande"
                        onClick={onOfrecer}
                    >
                        {isLogged ? 'Publicar Viaje' : 'Ofrecer asiento'}
                    </button>
                </div>
            </div>
        </div>
    )
}