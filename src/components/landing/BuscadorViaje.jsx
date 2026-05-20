import { useState } from "react";
import '../../styles/LandingShared.css'
import '../../styles/BuscadorViaje.css'

export default function BuscadorViaje({onBuscar}){
    const [origen, setOrigen] = useState('');
    const [destino, setDestino] = useState('');
    const [fecha, setFecha] = useState('');
    
    function handleSubmit(e){
        e.preventDefault();
        onBuscar?.({origen, destino, fecha});
    }

    return(
        <div className="landing-buscador">
            <div className="landing-buscador_tarjeta">
                <h2 className="landing-buscador_titulo">Encuentra tu próximo viaje</h2>
                <form className="landing-buscador_formulario" onSubmit={handleSubmit}>
                    <div className="landing-campo">
                        <label className="landing-campo_etiqueta">Origen</label>
                        <div className="landing-campo_wrap">
                            <span className="material-symbols-outlined landing-campo_icono">trip_origin</span>
                            <input 
                                type="text" 
                                className="landing-campo_input"
                                placeholder="¿De dónde sales?"
                                value={origen}
                                onChange={e => setOrigen(e.target.value)}    
                            />
                        </div>
                    </div>

                    <div className="landing-campo">
                        <label className="landing-campo_etiqueta">Destino</label>
                        <div className="landing-campo_wrap">
                            <span className="material-symbols-outlined landing-campo_icono">location_on</span>
                            <input 
                                type="text" 
                                className="landing-campo_input"
                                placeholder="¿A dónde vas?"
                                value={destino}
                                onChange={e => setDestino(e.target.value)}    
                            />
                        </div>
                    </div>

                    <div className="landing-campo">
                        <label className="landing-campo_etiqueta">Destino</label>
                        <div className="landing-campo_wrap">
                            <span className="material-symbols-outlined landing-campo_icono">calendar_today</span>
                            <input 
                                type="date" 
                                className="landing-campo_input"
                                value={fecha}
                                onChange={e => setFecha(e.target.value)}    
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="landing-btn landing-btn_primario landing-btn_buscar"
                    >
                        Buscador Viaje
                    </button>
                </form>
            </div>
        </div>
    )
}