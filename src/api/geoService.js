const KEY = import.meta.env.VITE_GEOAPIFY_KEY;
const BASE = 'https://api.geoapify.com/v1';

export async function buscarLugares(texto) {
    if (!KEY || !texto || texto.trim().length < 3) return [];

    const url = `${BASE}/geocode/autocomplete`
        + `?text=${encodeURIComponent(texto)}`
        + `&filter=countrycode:es&lang=es&limit=5&format=json&apiKey=${KEY}`;

    try {
        const resp = await fetch(url);
        if (!resp.ok) return [];
        const data = await resp.json();
        return (data.results || []).map((r) => ({
            nombre: r.formatted,
            lat: r.lat,
            lon: r.lon,
        }));
    } catch {
        return [];
    }
}

export async function calcularRuta(origen, destino) {
    if (!KEY || !origen || !destino) return null;

    const waypoints = `${origen.lat},${origen.lon}|${destino.lat},${destino.lon}`;
    const url = `${BASE}/routing?waypoints=${waypoints}&mode=drive&apiKey=${KEY}`;

    try {
        const resp = await fetch(url);
        if (!resp.ok) return null;
        const data = await resp.json();
        const ruta = data.features?.[0];
        if (!ruta) return null;

        const geom = ruta.geometry;
        const lineas = geom.type === 'MultiLineString' ? geom.coordinates : [geom.coordinates];
        const coords = [];
        for (const linea of lineas) {
            for (const [lon, lat] of linea) coords.push([lat, lon]);
        }

        return {
            coords,
            distanciaKm: ruta.properties.distance / 1000,
            minutos: Math.round(ruta.properties.time / 60),
        };
    } catch {
        return null;
    }
}
