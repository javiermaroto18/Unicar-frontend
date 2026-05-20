import '../../styles/LandingShared.css'

import TopbarLanding from '../landing/TopbarLanding.jsx'
import HeroLanding from '../landing/HeroLanding.jsx'
import BuscadorViaje from '../landing/BuscadorViaje.jsx'
import ComoFunciona from '../landing/ComoFunciona.jsx'
import BeneficiosLanding from '../landing/BeneficiosLanding.jsx'
import CtaFinal from '../landing/CtaFinal.jsx'

export default function LandingPage(){
    function irAAuth(tab) {
        window.location.href = `/auth#${tab}`;
    }

    function irADashboard(){
        window.location.href = '/dashboard';
    }

    function handleBuscar(datos){
        const params = new URLSearchParams(datos).toString();
        window.location.href = `/dashboard?${params}`;
    }

    return (
        <div className="landing-pagina">
            <TopbarLanding onLogin={(e) => { e.preventDefault(); irAAuth('login'); }} OnRegistro={(e) => { e.preventDefault(); irAAuth('registro'); }} />
            <HeroLanding onBuscar={irADashboard} onOfrecer={irAAuth} />
            <BuscadorViaje onBuscar={handleBuscar} />
            <ComoFunciona />
            <BeneficiosLanding />
            <CtaFinal onCrearCuenta={irAAuth} onVerInfo={() => {}}/>
        </div>
    )
}