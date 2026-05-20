import '../../styles/LandingShared.css'
import '../../styles/SeccionesLanding.css'

const PASOS = [
    {
        icono: 'school', 
        titulo: 'Regístrate', 
        texto: 'Verificar tu cuenta con tu correo institucional (.edu) para garantizar la seguridad de la comunidad',
    },
    {
        icono: 'directions_car', 
        titulo: 'Publica o Busca', 
        texto: 'Ofrece asientos vacíos en tu auto o encuentra un viaje que se ajuste a tu horario de clases.',
    },
    {
        icono: 'verified_user', 
        titulo: 'Viaja Seguro', 
        texto: 'Coordina el punto de encuentro y viaja tranquilo sabiendo con quién compartes el trayecto.',
    },
];

export default function ComoFunciona(){
    return(
        <section className="landing-como-funciona" id='como-funciona'>
            <h3 className="landing-titulo-seccion">¿Cómo funciona?</h3>
            <div className="landing-pasos-grid">
                {/* Mapa de los pasos para usar UniCar */}
                {PASOS.map(({icono, titulo, texto}) =>(
                    <div key={titulo} className="landing-paso-card">
                        <div className="landing-paso-card_icono landing-paso-card_icono-azul">
                            <span className="material-symbols-outlined">{icono}</span>
                        </div>
                        <div>
                            <h4 className="landing-paso-card_titulo">{titulo}</h4>
                            <p className="landing-paso-card_texto">{texto}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}