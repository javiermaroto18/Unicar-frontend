import { apiService } from './apiService';

const getAllTrips = () => {
    return apiService.get('trips');
};

const getTripById = (id) => {
    return apiService.get(`trips/${id}`);
};

const createTrip = (tripData) => {
    return apiService.post('trips', tripData);
};

export const tripService = {
    getAllTrips,
    getTripById,
    createTrip,
};
