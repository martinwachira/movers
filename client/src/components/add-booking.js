import React, { useCallback, useRef, useState } from "react";

import BookingService from "../services/booking.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const AddBooking = () => {
  const [bookingDate, setBookingDate] = useState("");
  const [pickupTime, setPickUpTime] = useState("");
  const [pickupLocation, setPickUpLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleId, setDriver] = useState("");
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const form = useRef(null);
  const checkBtnRef = useRef(null);

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtnRef.current.context._errors.length === 0) {
      BookingService.register(
        bookingDate,
        pickupTime,
        pickupLocation,
        destination,
        vehicleId
      ).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMessage(resMessage);
          setSuccessful(false);
        }
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="bookingDate">Booking Date</label>
                <Input
                  type="text"
                  className="form-control"
                  name="bookingDate"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pickupTime">Pickup Time</label>
                <Input
                  type="text"
                  className="form-control"
                  name="pickupTime"
                  value={pickupTime}
                  onChange={(e) => setPickUpTime(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="pickupLocation">Pickup Location</label>
                <Input
                  type="pickupLocation"
                  className="form-control"
                  name="pickupLocation"
                  value={pickupLocation}
                  onChange={(e) => setPickUpLocation(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="destination">Destination</label>
                <Input
                  type="destination"
                  className="form-control"
                  name="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  validations={[required]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="driver">Driver</label>
                <Input
                  type="driver"
                  className="form-control"
                  name="driver"
                  value={vehicleId}
                  onChange={(e) => setDriver(e.target.value)}
                  validations={[required]}
                />
              </div>

              <br />
              <div className="form-group">
                <button className="btn btn-primary btn-block">
                  Make a Booking
                </button>
              </div>
            </div>
          )}

          {message && (
            <div className="form-group">
              <div
                className={
                  successful ? "alert alert-success" : "alert alert-danger"
                }
                role="alert"
              >
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtnRef} />
        </Form>
      </div>
    </div>
  );
};

export default AddBooking;
