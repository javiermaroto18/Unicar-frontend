import '../../styles/Trip-detail-view.css';

export const MapPlaceholder = () => {
    return (
        <section className="map-preview">
            <div 
                className="map-preview__bg" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')" }}
            ></div>
            <div className="map-preview__label">
                <span className="material-symbols-outlined">map</span>
                Vista previa de la ruta
            </div>
        </section>
    );
};