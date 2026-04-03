import '../../styles/TripGrid.css';
import TripCard from './TripCard.jsx';

export default function TripGrid({ trips, onReserve }) {
    return (
        <div className="trip-grid">
            {trips.map(trip => (
                <TripCard key={trip.id} trip={trip} onReserve={onReserve} />
            ))}
        </div>
    );
}