import React, { useEffect, useRef, useState } from "react";

import AuthService from "../services/auth.service";
import BookingService from "../services/booking.service";
import Button from "react-bootstrap/Button";
import CheckButton from "react-validation/build/button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import Modal from "react-bootstrap/Modal";
import VehicleService from "../services/vehicle.service";

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
  const [userId, setUserId] = useState("");
  const [message, setMessage] = useState("");
  const [drivers, setDrivers] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const form = useRef(null);
  const checkBtnRef = useRef(null);

  useEffect(() => {
    const userId = AuthService.getCurrentUser();

    setUserId(userId.id);

    VehicleService.getAllVehicles().then(
      (response) => {
        setDrivers(response.data);
      },
      (error) => {
        setDrivers(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );
  }, []);

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
        userId,
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

  console.log("drivers", drivers);

  return (
    <div className="col-md-12">
      <Button variant="primary" onClick={handleShow}>
        Book a Move
      </Button>
      <Modal show={show} onHide={handleClose}>
        <div className="card card-container">
          <Modal.Header closeButton>
            <Modal.Title>Create a Booking</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleRegister} ref={form}>
            {!successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="bookingDate">Booking Date</label>
                  <Input
                    type="date"
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
                    type="time"
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

                {/* <div className="form-group">
                  <label htmlFor="driver">Driver</label>
                  <Input
                    type="driver"
                    className="form-control"
                    name="driver"
                    value={vehicleId}
                    onChange={(e) => setDriver(e.target.value)}
                    validations={[required]}
                  />
                </div> */}
                <br />
                <Dropdown>
                  <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-basic"
                    className="form-control"
                  >
                    Drivers
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {drivers &&
                      drivers?.map((driver) => (
                        <Dropdown.Item
                          key={driver.id}
                          onClick={() => setDriver(driver.id)}
                        >
                          <strong>{driver.user?.username}</strong> --{" "}
                          {driver.vmake} -- {driver.vlocation}
                        </Dropdown.Item>
                      ))}
                  </Dropdown.Menu>
                </Dropdown>

                <br />
                <div className="form-group">
                  {/* <button className="btn btn-primary btn-block">
                    Make a Booking
                  </button> */}
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
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleRegister}>
              Make a Booking
            </Button>
          </Modal.Footer>
        </div>
      </Modal>
    </div>
  );
};

export default AddBooking;
