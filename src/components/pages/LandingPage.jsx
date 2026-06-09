import '../../styles/LandingShared.css'

import TopbarLanding from '../landing/TopbarLanding.jsx'
import HeroLanding from '../landing/HeroLanding.jsx'
import BuscadorViaje from '../landing/BuscadorViaje.jsx'
import ComoFunciona from '../landing/ComoFunciona.jsx'
import BeneficiosLanding from '../landing/BeneficiosLanding.jsx'
import CtaFinal from '../landing/CtaFinal.jsx'

import { useNavigate } from 'react-router-dom';

export default function LandingPage(){
    const navigate = useNavigate();

    const isLogged = !!localStorage.getItem('authToken');
    function irAAuth(tab) {
        navigate(`/auth#${tab}`);
    }

    function irADashboard(){
        navigate('/dashboard');
    }

    function handleBuscar(datos){
        const params = new URLSearchParams(datos).toString();
        navigate(`/dashboard?${params}`);
    }

    return (
        <div className="landing-pagina">
            <TopbarLanding 
                isLogged={isLogged} 
                onLogin={(e) => { e.preventDefault(); irAAuth('login'); }} 
                OnRegistro={(e) => { e.preventDefault(); irAAuth('registro'); }} 
            />
            <HeroLanding
                isLogged={isLogged}
                onBuscar={irADashboard}
                onOfrecer={isLogged ? irADashboard : () => irAAuth('registro')} 
            />
            <BuscadorViaje onBuscar={handleBuscar} />
            <ComoFunciona />
            <BeneficiosLanding />
            <CtaFinal 
                isLogged={isLogged} 
                onCrearCuenta={() => irAAuth('registro')} 
                onIrDashboard={irADashboard}
                onVerInfo={() => {}}
            />
        </div>
    )
}