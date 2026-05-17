import apiClient from './apiClient';

const getAllTrips = async (page = 1, filter = 'Todos') => {    
    const response = await apiClient.get('/trips');
    return response;
};

const getTripById = async (id) => {
    const response = await apiClient.get(`/trips/${id}`);
    return response;
};

const createTrip = async (tripData) => {
    const response = await apiClient.post('/trips', tripData);
    return response;
};

const getMyPublishedTrips = async () => {
    const response = await apiClient.get('/trips/me');
    return response;
};

// Para el historial como PASAJERO (Reservas)
const getMyBookings = async () => {
    const response = await apiClient.get('/bookings/me');
    return response;
};

export const tripService = {
    getAllTrips,
    getTripById,
    createTrip,
    getMyPublishedTrips,
    getMyBookings,
};