import '../../styles/Loader.css';

export default function Loader({ text = 'Cargando...', fullScreen = false }) {
    return (
        <div className={fullScreen ? 'loader loader--full' : 'loader'}>
            <span className="material-symbols-outlined loader-icono">progress_activity</span>
            {text && <p className="loader-texto">{text}</p>}
        </div>
    );
}
