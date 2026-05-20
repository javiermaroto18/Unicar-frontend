import '../../styles/LandingShared.css'
import '../../styles/HeroLanding.css'

export default function HeroLanding({ onBuscar, onOfrecer }){
    return(
        <div className="landing-hero">
            <div className="landing-hero_fondo">
                <div className="landing-hero_contenido">
                    <span className="landing-hero_etiqueta">Comunidad Universitaria Exclusiva</span>
                    <h1 className="landing-hero_titulo">Viaja seguro con tu comunidad</h1>
                    <p className="landing-hero_subtitulo">
                        Conect con estudiantes de tu misma universidad. Comparte gastos, reduce tu herlla de carbono y llega siempre a tiempo
                        a tus clase.
                    </p>
                    <div className="landing-hero_ctas">
                        <button 
                            className="landing-btn landing-btn_primario landing-btn_grande"
                            onClick={onBuscar}
                        >
                            Buscar Viaje
                        </button>
                        <button 
                            className="landing-btn landing-btn_fantasma landing-btn_grande"
                            onClick={onOfrecer}
                        >
                            Ofrecer asiento
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}