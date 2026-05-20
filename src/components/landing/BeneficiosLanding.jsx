import '../../styles/LandingShared.css'
import '../../styles/SeccionesLanding.css'

const BENEFICIOS = [
    {
        icono: 'savings', 
        color: 'verde',
        titulo: 'Economía Real', 
        texto: 'Reduce tus gastos de transporte hasta un 75% compartiendo el costo de la gasolina con compañeros.',
    },
    {
        icono: 'security', 
        color: 'azul',
        titulo: 'Seguridad Verificada', 
        texto: 'Solo miembros con correo institucional activo. Conoce el perfil de tus compañeros antes de viajar.',
    },
    {
        icono: 'eco', 
        color: 'teal',
        titulo: 'Impacto Positivo', 
        texto: 'Menos autos en el campus eso significa menos tráfico y una reducción significativa en la huella de carbono',
    },
];

export default function BeneficiosLanding(){
    return(
        <section className="landing-beneficios" id='beneficios'>
            <div className="landing-beneficios_interior">
                <div className="landing-beneficios_cabecera">
                    <h3 className="landing-titulo-seccion">¿Por qué elegir UniCar?</h3>
                    <p className="landing-beneficios_subtitulo">
                        Diseñado exclusivamente para la vida universitaria, priorizando tu seguridad y presupuesto.
                    </p>
                </div>
                <div className="landing-beneficios-grid">
                    {/* Mapa de los beneficios de UniCar */}
                    {BENEFICIOS.map(({icono, color, titulo, texto}) => (
                        <div key={titulo} className='landing-beneficio-card'>
                            <div className={`landing-beneficio-card_icono landing-beneficio-card_icono-${color}`}>
                                <span className="material-symbols-outlined">{icono}</span>
                            </div>                            
                            <h4 className="landing-beneficio-card_titulo">{titulo}</h4>
                            <p className="landing-beneficio-card_texto">{texto}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}