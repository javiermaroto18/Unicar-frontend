import { useState, useEffect } from 'react';
import apiClient from '../../api/apiClient';
import Loader from '../common/Loader.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useConfirm } from '../../context/ConfirmContext.jsx';
import '../../styles/ProfileShared.css';
import '../../styles/ProfileSectionOthers.css';

export default function ProfileSectionVehicle() {
    const toast = useToast();
    const confirm = useConfirm();
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    
    // Lista de vehículos
    const [vehicles, setVehicles] = useState([]); 
    
    const [showForm, setShowForm] = useState(false); 
    const [editingId, setEditingId] = useState(null); 
 
    const initialFormState = {
        brand: '',
        model: '',
        license_plate: '',
        is_frequent: false,
    };
    const [form, setForm] = useState(initialFormState);

    const fetchVehicles = async () => {
        try {
            const response = await apiClient.get('/vehicles/me');
            if (response.data) {
                setVehicles(response.data);
            }
        } catch (error) {
            console.error("Error cargando vehículos:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    function handleChange(field, value) {
        setForm(prev => ({ ...prev, [field]: value }));
    }

    // Preparar el formulario para crear uno nuevo
    function handleAddNew() {
        setForm(initialFormState);
        setEditingId(null);
        setShowForm(true);
    }

    // Preparar el formulario para EDITAR uno existente
    function handleEdit(vehicle) {
        const [marca, ...modeloArray] = vehicle.brand_model.split(' ');
        
        setForm({
            brand: marca || '',
            model: modeloArray.join(' ') || '',
            license_plate: vehicle.license_plate || '',            
            is_frequent: vehicle.is_frequent === 1 || vehicle.is_frequent === true, // Nos aseguramos de leerlo como booleano
        });
        setEditingId(vehicle.id);
        setShowForm(true);
    }

    async function handleSave() {
        // Al crear exigimos la matrícula, pero al editar ya no es obligatoria enviarla
        if (!form.brand || !form.model || (!editingId && !form.license_plate)) {
            toast.warning("Por favor, rellena todos los campos.");
            return;
        }

        setIsSaving(true);
        try {
            if (editingId) {
                const { license_plate, ...dataToUpdate } = form;
                await apiClient.put(`/vehicles/${editingId}`, dataToUpdate);
            } else {
                await apiClient.post('/vehicles', form);
            }
            
            setForm(initialFormState);
            setEditingId(null);
            setShowForm(false);
            await fetchVehicles();
            toast.success(editingId ? "Vehículo actualizado correctamente." : "Vehículo registrado correctamente.");

        } catch (error) {
            console.error(error);
            toast.error("Error al guardar el vehículo. Revisa los datos.");
        } finally {
            setIsSaving(false);
        }
    }

    async function handleDelete(vehicle) {
        const ok = await confirm({
            title: 'Eliminar vehículo',
            message: `Se eliminará el vehículo con matrícula ${vehicle.license_plate}. Dejará de estar disponible para publicar nuevos viajes.`,
            confirmText: 'Eliminar',
            variant: 'danger',
            icon: 'directions_car',
        });
        if (!ok) return;

        try {
            await apiClient.delete(`/vehicles/${vehicle.id}`);
            // Si estábamos editando justo este coche, cerramos el formulario
            if (editingId === vehicle.id) {
                setShowForm(false);
                setEditingId(null);
                setForm(initialFormState);
            }
            // Recargamos la lista
            await fetchVehicles();
            toast.success("Vehículo eliminado correctamente.");
        } catch (error) {
            console.error(error);
            toast.error("Error al eliminar el vehículo.");
        }
    }

    if (isLoading) return <section className="psection"><Loader text="Cargando vehículos..." /></section>;

    return (
        <section className="psection">
            <div className="psection-encabezado">
                <div>
                    <h2 className="psection-titulo">Mis vehículos</h2>
                    <p className="psection-subtitulo">Gestiona los coches con los que realizas los viajes.</p>
                </div>
                
                {!showForm && (
                    <button className="btn-save" onClick={handleAddNew}>
                        <span className="material-symbols-outlined" style={{ fontSize: '1.2rem', verticalAlign: 'middle', marginRight: '0.25rem' }}>add</span>
                        Añadir vehículo
                    </button>
                )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {vehicles.length === 0 && !showForm ? (
                    <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#1e2d3d', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--color-border)' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--color-text-dim)', marginBottom: '1rem' }}>no_crash</span>
                        <p style={{ color: 'var(--color-text-muted)' }}>Aún no tienes vehículos registrados.</p>
                    </div>
                ) : (
                    vehicles.map((vehicle) => (
                        <div key={vehicle.id} className="prof-vehicle-preview" style={{ opacity: editingId === vehicle.id ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                            <div className="prof-vehicle-preview-icono">
                                <span className="material-symbols-outlined">directions_car</span>
                            </div>
                            <div>
                                <p className="prof-vehicle-preview-nombre">{vehicle.brand_model}</p>
                                <p className="prof-vehicle-preview-matricula">{vehicle.license_plate}</p>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
                                {/* Badge de Frecuente */}
                                {vehicle.is_frequent && (
                                    <span className="prof-vehicle-preview-insignia" style={{ color: 'var(--color-amber)', marginLeft: 0 }}>
                                        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                                        Frecuente
                                    </span>
                                )}
                                
                                <span className="prof-vehicle-preview-insignia" style={{ marginLeft: 0 }}>
                                    <span className="material-symbols-outlined">verified</span>
                                    Verificado
                                </span>
                                
                                {/* Botón Editar */}
                                <button 
                                    onClick={() => handleEdit(vehicle)}
                                    style={{ 
                                        background: 'rgba(19, 127, 236, 0.1)', 
                                        border: 'none', 
                                        borderRadius: 'var(--radius-md)', 
                                        color: 'var(--color-primary)', 
                                        cursor: 'pointer',
                                        display: 'flex',
                                        padding: '0.4rem',
                                        transition: 'background 0.2s'
                                    }}
                                    title="Editar vehículo"
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>edit</span>
                                </button>

                                {/* Botón Eliminar */}
                                <button 
                                    onClick={() => handleDelete(vehicle)}
                                    style={{ 
                                        background: 'rgba(248, 113, 113, 0.1)', 
                                        border: 'none', 
                                        borderRadius: 'var(--radius-md)', 
                                        color: '#f87171', 
                                        cursor: 'pointer',
                                        display: 'flex',
                                        padding: '0.4rem',
                                        transition: 'background 0.2s'
                                    }}
                                    title="Eliminar vehículo"
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: '1.2rem' }}>delete</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Formulario para añadir o editar vehículo */}
            {showForm && (
                <div className="pform" style={{ marginTop: '0.5rem', border: '1px solid var(--color-primary)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>
                            {editingId ? 'Editar vehículo' : 'Registrar nuevo vehículo'}
                        </h3>
                        <button onClick={() => { setShowForm(false); setEditingId(null); }} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', display: 'flex', padding: '0.2rem' }}>
                            <span className="material-symbols-outlined">close</span>
                        </button>
                    </div>

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
                            <div className="pfield-entrada-contenedor">
                                <input 
                                    className={`pfield-entrada ${editingId ? 'pfield-entrada--bloqueada' : ''}`} 
                                    type="text" 
                                    value={form.license_plate}
                                    onChange={e => handleChange('license_plate', e.target.value)} 
                                    placeholder="Ej: 1234 ABC" 
                                    disabled={!!editingId} // Se desactiva si hay un editingId
                                />
                                {editingId && (
                                    <span className="material-symbols-outlined pfield-icono-candado">lock</span>
                                )}
                            </div>
                        </div>
                        
                        {/* TOGGLE de Vehículo Frecuente */}
                        <div className="pfield" style={{ justifyContent: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#0d1520', padding: '0.625rem 0.875rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                                <div>
                                    <label className="pfield-etiqueta" style={{ marginBottom: 0, color: 'var(--color-text)' }}>Vehículo Frecuente</label>
                                    <p className="pfield-pista" style={{ margin: 0 }}>Priorizar al publicar viajes</p>
                                </div>
                                <label className="prof-toggle-switch">
                                    <input 
                                        type="checkbox" 
                                        checked={form.is_frequent} 
                                        onChange={e => handleChange('is_frequent', e.target.checked)} 
                                    />
                                    <div className="prof-toggle-switch-pista"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                        <button className="btn-save" onClick={handleSave} disabled={isSaving}>
                            {isSaving ? 'Guardando...' : (editingId ? 'Actualizar vehículo' : 'Guardar vehículo')}
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}