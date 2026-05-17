import { useState, useEffect } from 'react';

// Ampliamos el array base para tener variedad
const TODOS_LOS_AVATARES = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAlXe0M5FSmqHxOQZqEfLMoFkuiC1try2LI7820zIMMQL9HqLJxv4aoZAW2ttTwhk6KADnx9L4Au4zYEopxAbH2teHhgTB5Wqg0EDsXCca1pXkxAtjQ37VYl4aKxvPiKQvtvH6jy_IFkViRKAeIslCd0GvYui9frZN4wp6tSn5rI9AHsKtLmDSz1_6Ho2DHMSQbVh3gp6PQ-wqhrrs2GhVSs2FCvx1cHjSDAeTKlmSAMgfTkrMb5DaCjgCss3vJe5t3o7YJxcI3sPo',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDlZoTncDydaeNThrTiMKyxe9soQ3ilb6zDsVo-Bx0M0fv8pEuMkkNhO4UZQ9zXsL1GU1plcwJVeL76TxElLY4V0cnFoutleop6gzFLzDpt5pNsoCLfLIpiGjhUdFhsyU6BkiS5D3hGkIWCBN0MRvlUkSbUjvf6_nCO_90qVVp8gVmrF0UtIw0Ns9eC8vz1hueKATKLJKort58Hw8p',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDlZoTncDydaeNThrTiMKyxe9soQ3ilb6zDsVo-Bx0M0fv8pEuMkkNhO4UZQ9zXsL1GU1plcwJVeL76TxElLY4V0cnFoutleop6gzFLzDpt5pNsoCLfLIpiGjhUdFhsyU6BkiS5D3hGkIWCBN0MRvlUkSbUjvf6_nCO_90qVVp8gVmrF0UtIw0Ns9eC8vz1hueKATKLJKort58Hw8pP2jjrFRe8Siqyev4jxAqjqYaLwE1RR_CvwoQwY3fI25w428KOBT6RY6NnLPQ',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC_R7MEA_6xWC5nW1CwAU1HWdGAJa1-1UwVZptzF59ZYZolJkaSLLbeF23UKC5qdmgUiqTsRw2eIdsVKlqR8Q9q2Mw0x9ueXrjEdGCEe8AGEcloljc68f5NOHRjNMPuvCfhxxgUpnq03HVTzWTCecz-zmXReEmGiXx3HlexE7P2RjLqjzMDTCL6UJhqchljHTh_y3Dc3WvYdEtHwbOvhbGcZii8ahRMAUwcgZhIbkaO4GkSdBXgVUXfoON5mk2lMt6AYQyDtIteVPU',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCbU13Pd0SYBRtTf8f7ALSAVAng-Sr7sP4-DLWQ9io2uEKYDicMHjs17iKgVuPRfaHcKjBqPHTHRn3knL_3oVqsY63VjGFiyZji2-fhhXIIuD2_SFOHXFTo446rFMifC_bA2uHSFL1zBJ8-1PfwGdTVwn4v4UfnWNjeTBvWaQymYL157psGUDJko1ArYsVNVQg2f0MmuvWFItX6cUa8ERMhNSeO6aJvRnkqbMrUAFqv2pYRDuNXDwERANkmNhs7PlAcFVrjfGSqMCA',
    'http://googleusercontent.com/profile/picture/5',
];

export default function HeroAuth() {
    const [avataresMostrar, setAvataresMostrar] = useState([]);

    useEffect(() => {
        // Barajamos el array aleatoriamente y cogemos los 3 primeros cada vez que la página carga
        const mezclados = [...TODOS_LOS_AVATARES].sort(() => 0.5 - Math.random());
        setAvataresMostrar(mezclados.slice(0, 3));
    }, []);

    return (
        <section className="auth-hero">
            <img
                className="auth-hero_fondo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbU13Pd0SYBRtTf8f7ALSAVAng-Sr7sP4-DLWQ9io2uEKYDicMHjs17iKgVuPRfaHcKjBqPHTHRn3knL_3oVqsY63VjGFiyZji2-fhhXIIuD2_SFOHXFTo446rFMifC_bA2uHSFL1zBJ8-1PfwGdTVwn4v4UfnWNjeTBvWaQymYL157psGUDJko1ArYsVNVQg2f0MmuvWFItX6cUa8ERMhNSeO6aJvRnkqbMrUAFqv2pYRDuNXDwERANkmNhs7PlAcFVrjfGSqMCA"
                alt="Estudiantes universitarios en el campus"
            />
            <div className="auth-hero_overlay" />

            <div className="auth-hero_contenido">
                <div className="auth-hero_marca">
                    <div className="auth-hero_logo">
                        <span className="material-symbols-outlined">directions_car</span>
                    </div>
                    <span className="auth-hero_nombre-app">UniCar</span>
                </div>

                <h1 className="auth-hero_titulo">
                    La red de movilidad exclusiva para universitarios.
                </h1>

                <div className="auth-prueba-social">
                    <div className="auth-prueba-social_avatares">
                        {avataresMostrar.map((src, i) => (
                            <img
                                key={i}
                                className="auth-prueba-social_avatar"
                                src={src}
                                alt={`Usuario verificado ${i + 1}`}
                            />
                        ))}
                    </div>
                    <p className="auth-prueba-social_texto">
                        Únete a <span className="auth-prueba-social_destacado">+2.000</span> estudiantes verificados.
                    </p>
                </div>
            </div>
        </section>
    );
}