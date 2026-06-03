import apiClient from './apiClient';

const createBooking = async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response;
};

const cancelBooking = async (bookingId) => {
    const response = await apiClient.patch(`/bookings/${bookingId}/cancel`);
    return response;
};
export const bookingService = {
    createBooking,
    cancelBooking,
};