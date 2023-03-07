import React, { useEffect, useState } from "react";

import AddBooking from "./add-booking";
import AuthService from "../services/auth.service";
import BookingService from "../services/booking.service";
// import UsersHomeHOC from "./UsersHomeHOC";
import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");
  const [bookings, setUserBookings] = useState("");

  useEffect(() => {
    const userId = AuthService.getCurrentUser().id;
    UserService.getUserBoard().then(
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

    BookingService.getAllUserBooking(userId)
      .then((response) => {
        setUserBookings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log("bookings", bookings);

  return (
    <div className="container">
      <header className="jumbotron">
        {/* <h3>{content}</h3> */}
        <div className="container" style={{ textAlign: "center" }}>
          {/* <UsersHomeHOC /> */}
          <AddBooking />
          <br />
          <p style={{ color: "#f09a53", fontWeight: "bolder" }}>
            Bookings Made
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
              {bookings.bookings > 0 ? (
                bookings?.bookings.map((booking, index) => (
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
      </header>
    </div>
  );
};

export default BoardUser;
