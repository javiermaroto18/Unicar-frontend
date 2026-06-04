import { useState, useRef, useEffect } from 'react';
import '../../styles/TripFilter.css';

export default function TripFilters({ activeFilter, onFilterChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const filterOptions = [
        { id: 'date_asc', label: 'Salida: Más próximos', icon: 'schedule' },
        { id: 'price_asc', label: 'Precio: Más baratos', icon: 'payments' },
        { id: 'name_asc', label: 'Conductor: A - Z', icon: 'sort_by_alpha' }
    ];

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectOption = (optionId) => {
        onFilterChange(optionId);
        setIsOpen(false);
    };

    return (
        <div className="trip-filters">
            <div className="trip-filters-heading">
                <h2 className="trip-filters-title"
                    style={{ fontFamily: 'Be Vietnam Pro, sans-serif', fontWeight: 700, fontSize: '1.85rem' }}
                >
                    Encuentra tu próximo viaje
                </h2>
                <p className="trip-filters-subtitle">Explora las rutas disponibles para hoy</p>
            </div>

            <div className="trip-filters-controls">
                <div className="trip-filters-dropdown-wrapper" ref={dropdownRef}>
                    <button 
                        type="button"
                        className={`trip-filters-dropdown-btn ${isOpen ? 'is-open' : ''}`} 
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <span className="material-symbols-outlined">sort</span>
                        Ordenar y Filtrar
                        <span 
                            className="material-symbols-outlined" 
                            style={{ 
                                transform: isOpen ? 'rotate(180deg)' : 'none', 
                                transition: 'transform 0.2s ease' 
                            }}
                        >
                            expand_more
                        </span>
                    </button>

                    {isOpen && (
                        <div className="trip-filters-dropdown-menu">
                            {filterOptions.map((option) => (
                                <button
                                    key={option.id}
                                    type="button" 
                                    className={`trip-filters-dropdown-item ${activeFilter === option.id ? 'active' : ''}`}
                                    onClick={() => handleSelectOption(option.id)}
                                >
                                    <span className="material-symbols-outlined">{option.icon}</span>
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}