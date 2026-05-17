import apiClient from './apiClient';

const createBooking = async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response;
};

export const bookingService = {
    createBooking,
};