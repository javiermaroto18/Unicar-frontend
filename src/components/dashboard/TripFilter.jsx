import '../../styles/TripFilter.css';

const TABS = ['Todos', 'Facultades', 'Interurbanos'];

export default function TripFilters({ activeTab, onTabChange, onFilterOpen }) {
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
                <div className="trip-filters-tabs">
                    {TABS.map(tab => (
                        <button
                            key={tab}
                            className={`trip-filters-tab${activeTab === tab ? ' trip-filters-tab-active' : ''}`}
                            onClick={() => onTabChange(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <button className="trip-filters-dropdown-btn" onClick={onFilterOpen}>
                    <span className="material-symbols-outlined">filter_list</span>
                    Filtros
                    <span className="material-symbols-outlined">expand_more</span>
                </button>
            </div>
        </div>
    );
}