const db = require("../models");
const Vehicle = db.vehicle;
const User = db.user;
const Booking = db.booking;

exports.createBooking = async (req, res) => {
  // Validate request
  if (!req.body.bookingDate || !req.body.pickupTime || !req.body.destination) {
    res.status(400).send({
      message: "Date, Pick Up Time and Destination are required!",
    });
    return;
  }

  // Create a Booking
  const booking = {
    bookingDate: req.body.bookingDate,
    pickupTime: req.body.pickupTime,
    pickupLocation: req.body.pickupLocation,
    destination: req.body.destination,
    userId: req.body.userId,
    vehicleId: req.body.vehicleId,
  };
  // Save booking in the database
  Booking.create(booking)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Booking.",
      });
    });
};
