import '../../styles/LandingShared.css'
import '../../styles/HeroLanding.css'

export default function HeroLanding({ isLogged, displayAvatars, onBuscar, onOfrecer }){
    return(
        <div className="landing-hero">
            <div className="landing-hero_fondo"></div>
            {/* AÑADIDO: Tu overlay oscuro que definiste en el CSS */}
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
            {/* 
                {/* AÑADIDO: La prueba social con las fotos }
                {displayAvatars && displayAvatars.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
                        <div style={{ display: 'flex', paddingLeft: '10px' }}>
                            {displayAvatars.map((src, idx) => (
                                <img 
                                    key={idx} 
                                    style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #101922', marginLeft: '-10px', objectFit: 'cover' }} 
                                    src={src} 
                                    alt="Usuario UniCar" 
                                />
                            ))}
                        </div>
                        <span style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 500 }}>
                            Únete a <span style={{ color: 'white', fontWeight: 700 }}>más de 2,500 estudiantes</span>
                        </span>
                    </div>
                )} 
            */}
            </div>
        </div>
    )
}