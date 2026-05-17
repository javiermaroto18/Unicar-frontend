import { useState } from 'react';
import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionOthers.css';

export default function ProfileSectionVehicle({ vehicle, onSave }) {
    const [form, setForm] = useState({
        brand:   vehicle.brand,
        model:   vehicle.model,
        color:   vehicle.color,
        plate:   vehicle.plate,
        year:    vehicle.year,
        seats:   vehicle.seats,
    });

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Mi vehículo</h2>
                    <p className="psection-subtitulo">Información del coche con el que realizas los viajes.</p>
                </div>
                <button className="btn-save" onClick={() => onSave?.(form)}>Guardar cambios</button>
            </div>

            <div className="prof-vehicle-preview">
                <div className="prof-vehicle-preview-icono">
                    <span className="material-symbols-outlined">directions_car</span>
                </div>
                <div>
                    <p className="prof-vehicle-preview-nombre">{form.brand} {form.model} {form.color}</p>
                    <p className="prof-vehicle-preview-matricula">{form.plate}</p>
                </div>
                <span className="prof-vehicle-preview-insignia">
                    <span className="material-symbols-outlined">verified</span>
                    Verificado
                </span>
            </div>

            <div className="pform">
                <div className="pform-fila">
                    <div className="pfield">
                        <label className="pfield-etiqueta">Marca</label>
                        <input className="pfield-entrada" type="text" value={form.brand}
                            onChange={e => handleChange('brand', e.target.value)} />
                    </div>
                    <div className="pfield">
                        <label className="pfield-etiqueta">Modelo</label>
                        <input className="pfield-entrada" type="text" value={form.model}
                            onChange={e => handleChange('model', e.target.value)} />
                    </div>
                </div>
                <div className="pform-fila">
                    <div className="pfield">
                        <label className="pfield-etiqueta">Color</label>
                        <input className="pfield-entrada" type="text" value={form.color}
                            onChange={e => handleChange('color', e.target.value)} />
                    </div>
                    <div className="pfield">
                        <label className="pfield-etiqueta">Matrícula</label>
                        <input className="pfield-entrada" type="text" value={form.plate}
                            onChange={e => handleChange('plate', e.target.value)} />
                    </div>
                </div>
                <div className="pform-fila">
                    <div className="pfield">
                        <label className="pfield-etiqueta">Año</label>
                        <input className="pfield-entrada" type="number" value={form.year} min="1990" max="2026"
                            onChange={e => handleChange('year', e.target.value)} />
                    </div>
                    <div className="pfield">
                        <label className="pfield-etiqueta">Plazas disponibles</label>
                        <input className="pfield-entrada" type="number" value={form.seats} min="1" max="8"
                            onChange={e => handleChange('seats', e.target.value)} />
                    </div>
                </div>
            </div>
        </section>
    );
}
