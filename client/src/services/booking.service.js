import authHeader from "./auth-header";
import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";

const BookingService = {
  register: (
    bookingDate,
    pickupTime,
    pickupLocation,
    destination,
    userId,
    vehicleId
  ) => {
    return axios.post(
      API_URL + "createBooking",
      {
        bookingDate,
        pickupTime,
        pickupLocation,
        destination,
        userId,
        vehicleId,
      },
      {
        headers: authHeader(),
      }
    );
  },

  getAllBookings: () => {
    return axios.get(API_URL + "getBookings", { headers: authHeader() });
  },

  findAllBookingsByVehicle: (userId) => {
    return axios.get(API_URL + `getBookingsByVehicle/${userId}`, {
      headers: authHeader(),
    });
  },

  getAllUserBooking: (userId) => {
    return axios.get(API_URL + `getBookings/${userId}`, {
      headers: authHeader(),
    });
  },
};

export default BookingService;
