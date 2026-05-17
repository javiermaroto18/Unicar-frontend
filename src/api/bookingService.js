import { apiService } from './apiService';

const createBooking = (tripId) => {
    // The body is empty as the user is identified by the token
    return apiService.post(`trips/${tripId}/bookings`, {});
};

export const bookingService = {
    createBooking,
};
