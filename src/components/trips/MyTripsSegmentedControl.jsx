import '../../styles/MyTripsSegmentedControl.css';

const TABS = [
    { key: 'passenger', icon: 'person',         label: 'Como Pasajero' },
    { key: 'driver',    icon: 'directions_car',  label: 'Como Conductor' },
];

export default function MyTripsSegmentedControl({ activeTab, onTabChange }) {
    return (
        <div className="seg-control">
            {TABS.map(({ key, icon, label }) => (
                <button
                    key={key}
                    className={`seg-control-btn${activeTab === key ? ' seg-control-btn-active' : ''}`}
                    onClick={() => onTabChange(key)}
                >
                    <span className="material-symbols-outlined">{icon}</span>
                    {label}
                </button>
            ))}
        </div>
    );
}
