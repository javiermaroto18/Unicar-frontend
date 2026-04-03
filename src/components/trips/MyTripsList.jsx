import '../../styles/MyTripsList.css';
import MyTripCard from './MyTripCard.jsx';

export default function MyTripsList({ trips, onLoadMore, onViewTicket, onViewDetails }) {
    return (
        <>
            <div className="my-trips-list">
                {trips.map(trip => (
                    <MyTripCard
                        key={trip.id}
                        trip={trip}
                        onViewTicket={onViewTicket}
                        onViewDetails={onViewDetails}
                    />
                ))}
            </div>

            <div className="my-trips-list-load-more">
                <button className="my-trips-list-load-more-btn" onClick={onLoadMore}>
                    Cargar viajes anteriores
                    <span className="material-symbols-outlined">expand_more</span>
                </button>
            </div>
        </>
    );
}
