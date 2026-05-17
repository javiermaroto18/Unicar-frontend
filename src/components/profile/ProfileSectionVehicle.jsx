import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionOthers.css';

export default function ProfileSectionVehicle() {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [vehicleId, setVehicleId] = useState(null);
 
    const [form, setForm] = useState({
        brand: '',
        model: '',
        license_plate: '',
        is_frequent: true,
    });

    useEffect(() => {
        // Pedimos los vehículos a Laravel al cargar el componente
        const fetchVehicle = async () => {
            try {
                const response = await apiClient.get('/vehicles/me');
                const vehiculos = response.data; // Tu backend devuelve un array
                
                if (vehiculos && vehiculos.length > 0) {
                    // Si ya tiene coche, rellenamos los datos (separamos la marca/modelo)
                    const miCoche = vehiculos[0];
                    const [marca, ...modeloArray] = miCoche.brand_model.split(' ');
                    
                    setVehicleId(miCoche.id);
                    setForm({
                        brand: marca || '',
                        model: modeloArray.join(' ') || '',
                        license_plate: miCoche.license_plate || '',
                        is_frequent: miCoche.is_frequent === 1,
                    });
                }
            } catch (error) {
                console.error("Error cargando vehículo:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchVehicle();
    }, []);

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    async function handleSave() {
        setIsSaving(true);
        try {
            // Mandamos los datos al backend
            await apiClient.post('/vehicles', form);
            alert("Vehículo guardado correctamente.");
            setVehicleId(true); // Ya consideramos que tiene coche
        } catch (error) {
            console.error(error);
            alert("Revisa los datos del vehículo.");
        } finally {
            setIsSaving(false);
        }
    }

    if (isLoading) return <div className="psection" style={{padding: '2rem', color:'white'}}>Cargando vehículo...</div>;

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Mi vehículo</h2>
                    <p className="psection-subtitulo">Información del coche con el que realizas los viajes.</p>
                </div>
                <button className="btn-save" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? 'Guardando...' : 'Guardar vehículo'}
                </button>
            </div>

            {vehicleId && (
                <div className="prof-vehicle-preview">
                    <div className="prof-vehicle-preview-icono">
                        <span className="material-symbols-outlined">directions_car</span>
                    </div>
                    <div>
                        <p className="prof-vehicle-preview-nombre">{form.brand} {form.model}</p>
                        <p className="prof-vehicle-preview-matricula">{form.license_plate}</p>
                    </div>
                    <span className="prof-vehicle-preview-insignia">
                        <span className="material-symbols-outlined">verified</span>
                        Verificado
                    </span>
                </div>
            )}

            <div className="pform">
                <div className="pform-fila">
                    <div className="pfield">
                        <label className="pfield-etiqueta">Marca</label>
                        <input className="pfield-entrada" type="text" value={form.brand}
                            onChange={e => handleChange('brand', e.target.value)} placeholder="Ej: SEAT" />
                    </div>
                    <div className="pfield">
                        <label className="pfield-etiqueta">Modelo</label>
                        <input className="pfield-entrada" type="text" value={form.model}
                            onChange={e => handleChange('model', e.target.value)} placeholder="Ej: Ibiza" />
                    </div>
                </div>
                <div className="pform-fila">
                    <div className="pfield">
                        <label className="pfield-etiqueta">Matrícula</label>
                        <input className="pfield-entrada" type="text" value={form.license_plate}
                            onChange={e => handleChange('license_plate', e.target.value)} placeholder="Ej: 1234 ABC" />
                    </div>
                </div>
            </div>
        </section>
    );
}