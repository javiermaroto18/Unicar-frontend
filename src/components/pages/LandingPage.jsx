import '../../styles/LandingShared.css'

import TopbarLanding from '../landing/TopbarLanding.jsx'
import HeroLanding from '../landing/HeroLanding.jsx'
import BuscadorViaje from '../landing/BuscadorViaje.jsx'
import ComoFunciona from '../landing/ComoFunciona.jsx'
import BeneficiosLanding from '../landing/BeneficiosLanding.jsx'
import CtaFinal from '../landing/CtaFinal.jsx'

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// const RANDOM_FACES = [
//     'https://randomuser.me/api/portraits/women/44.jpg',
//     'https://randomuser.me/api/portraits/men/32.jpg',
//     'https://randomuser.me/api/portraits/women/68.jpg',
//     'https://randomuser.me/api/portraits/men/46.jpg',
//     'https://randomuser.me/api/portraits/women/12.jpg',
//     'https://randomuser.me/api/portraits/men/11.jpg',
//     'https://randomuser.me/api/portraits/women/33.jpg',
//     'https://randomuser.me/api/portraits/men/22.jpg',
// ];

export default function LandingPage(){
    const navigate = useNavigate();
    const [displayAvatars, setDisplayAvatars] = useState([]);
    
    const isLogged = !!localStorage.getItem('token');

    // useEffect(() => {
    //     const shuffled = [...RANDOM_FACES].sort(() => 0.5 - Math.random());
    //     setDisplayAvatars(shuffled.slice(0, 4));
    // }, []);

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
                displayAvatars={displayAvatars} 
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