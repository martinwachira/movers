import React, { useEffect, useState } from "react";

import AuthService from "../services/auth.service";
import BookingService from "../services/booking.service";
import UserService from "../services/user.service";

const BoardStaff = () => {
  const [content, setContent] = useState("");
  const [bookings, setBookings] = useState("");

  useEffect(() => {
    const userId = AuthService.getCurrentUser().id;

    UserService.getStaffBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );

    BookingService.findAllBookingsByVehicle(userId).then(
      (response) => {
        setBookings(response.data);
      },
      (error) => {
        setBookings(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );
  }, []);
  console.log("bookings", bookings);

  return (
    <div className="container">
      <header className="jumbotron">{/* <h3>{content}</h3> */}</header>
      <p style={{ color: "#f09a53", fontWeight: "bolder" }}>
        Bookings Assigned to You
      </p>
      <table className="table">
        <thead class="thead-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Done By</th>
            <th scope="col">Date</th>
            <th scope="col">PickupTime</th>
            <th scope="col">Pickup Location</th>
            <th scope="col">Destination</th>
            <th scope="col">Vehicle</th>
            <th scope="col">Created At</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings?.map((booking, index) => (
              <tr key={booking.id}>
                <th>{index + 1}</th>
                <td>
                  {booking.user?.username.charAt(0).toUpperCase() +
                    booking.user?.username.slice(1)}
                </td>
                <td> {booking?.bookingDate}</td>
                <td>{booking?.pickupTime}</td>
                <td>
                  {booking?.pickupLocation.charAt(0).toUpperCase() +
                    booking?.pickupLocation.slice(1)}
                </td>
                <td>
                  {booking?.destination.charAt(0).toUpperCase() +
                    booking?.destination.slice(1)}
                </td>
                <td> {booking.vehicle?.vname.toUpperCase()}</td>
                <td>{new Date(booking?.createdAt).toDateString()}</td>
                <td>
                  <i class="bi bi-pencil-square"></i>
                  &nbsp; &nbsp;
                  <i class="bi bi-trash-fill"></i>
                </td>
              </tr>
            ))
          ) : (
            <p>No Bookings Found</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BoardStaff;
