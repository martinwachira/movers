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
    return axios.post(API_URL + "createBooking", {
      bookingDate,
      pickupTime,
      pickupLocation,
      destination,
      userId,
      vehicleId,
    });
  },
};

export default BookingService;
