import '../../styles/VerifyBanner.css';

export default function VerifyBanner({ onVerify }) {
    return (
        <div className="verify-banner">
            <div className="verify-banner-left">
                <div className="verify-banner-icon">
                    <span className="material-symbols-outlined">shield_person</span>
                </div>
                <div>
                    <p className="verify-banner-title">
                        Verifica tu cuenta para desbloquear todas las funciones
                    </p>
                    <p className="verify-banner-subtitle">
                        Sube tu carnet universitario o DNI para poder publicar y reservar viajes.
                    </p>
                </div>
            </div>
            <a className="verify-banner-cta" href="/verification" onClick={onVerify}>
                Verificar ahora
            </a>
        </div>
    );
}