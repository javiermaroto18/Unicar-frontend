import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../../styles/MapaVisualizacion.css';

const CENTRO_DEFECTO = [40.4168, -3.7038];

function formatearDuracion(min) {
    if (min < 60) return `${min} min`;
    const horas = Math.floor(min / 60);
    const resto = min % 60;
    return resto === 0 ? `${horas} h` : `${horas} h ${resto} min`;
}

function crearPin(letra, variante) {
    return L.divIcon({
        className: '',
        html: `<div class="mapa-pin mapa-pin--${variante}">${letra}</div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
    });
}

function AjustarVista({ origen, destino, ruta }) {
    const map = useMap();
    useEffect(() => {
        if (ruta?.coords?.length) {
            map.fitBounds(ruta.coords, { padding: [50, 50] });
        } else if (origen && destino) {
            map.fitBounds([[origen.lat, origen.lon], [destino.lat, destino.lon]], { padding: [50, 50] });
        } else if (origen) {
            map.setView([origen.lat, origen.lon], 13);
        } else if (destino) {
            map.setView([destino.lat, destino.lon], 13);
        }
    }, [origen, destino, ruta, map]);
    return null;
}

export default function MapaVisualizacion({ origen, destino, ruta, cargandoRuta }) {
    return (
        <section className="publicar-mapa">
            <MapContainer center={CENTRO_DEFECTO} zoom={11} scrollWheelZoom className="publicar-mapa_leaflet">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {origen && <Marker position={[origen.lat, origen.lon]} icon={crearPin('A', 'origen')} />}
                {destino && <Marker position={[destino.lat, destino.lon]} icon={crearPin('B', 'destino')} />}
                {ruta?.coords?.length > 0 && (
                    <Polyline positions={ruta.coords} pathOptions={{ color: '#137fec', weight: 5, opacity: 0.85 }} />
                )}
                <AjustarVista origen={origen} destino={destino} ruta={ruta} />
            </MapContainer>

            <div className="publicar-mapa_info">
                {cargandoRuta ? (
                    <span className="publicar-mapa_info-texto">Calculando ruta…</span>
                ) : ruta ? (
                    <>
                        <span className="publicar-mapa_info-dato">
                            <span className="material-symbols-outlined">history</span>
                            {formatearDuracion(ruta.minutos)}
                        </span>
                        <span className="publicar-mapa_info-dato">
                            <span className="material-symbols-outlined">straighten</span>
                            {ruta.distanciaKm.toFixed(1)} km
                        </span>
                    </>
                ) : (
                    <span className="publicar-mapa_info-texto">Elige origen y destino para ver la ruta</span>
                )}
            </div>
        </section>
    );
}
