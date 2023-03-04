import React, { useEffect, useState } from "react";

import BookingService from "../services/booking.service";
// import { Navigate } from "react-router-dom";
import UserService from "../services/user.service";
import VehicleService from "../services/vehicle.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState("");
  const [vehicles, setVehicles] = useState("");
  const [bookings, setBookings] = useState("");
  // const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    UserService.getAdminBoard().then(
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
    UserService.getAllUsers().then(
      (response) => {
        setUsers(response.data);
      },
      (error) => {
        setUsers(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );
    // UserService.getRoles().then((response) => {
    // });

    VehicleService.getAllVehicles().then(
      (response) => {
        setVehicles(response.data);
      },
      (error) => {
        setVehicles(
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
            error.message ||
            error.toString()
        );
      }
    );

    BookingService.getAllBookings().then(
      (response) => {
        setBookings(response.data);
      },
      (error) => {
        setVehicles(
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

  // if (redirect) {
  //   return <Navigate to={redirect} />;
  // }

  console.log("users", users);
  console.log("vehicles", vehicles);

  return (
    <div className="container App">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <p style={{ color: "#f09a53", fontWeight: "bolder" }}>Users</p>
      <div style={{ marginBottom: "2rem" }}>
        <table className="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Date Created</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users?.map((user, index) => (
                <tr key={user.id}>
                  <th>{index + 1}</th>
                  <td>
                    {user.username.charAt(0).toUpperCase() +
                      user.username.slice(1)}
                  </td>
                  <td>{user.email}</td>
                  <td>
                    {" "}
                    {user.roles &&
                      user.roles.map((role, index) => (
                        <span key={index}>
                          <i>{role} | </i>
                        </span>
                      ))}
                  </td>
                  <td>{new Date(user.createdAt).toDateString()}</td>
                  <td>
                    <i class="bi bi-pencil-square"></i>
                    &nbsp; &nbsp;
                    <i class="bi bi-trash-fill"></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <p style={{ color: "#f09a53", fontWeight: "bolder" }}>Vehicles</p>
        <table className="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Type</th>
              <th scope="col">Make</th>
              <th scope="col">Mileage</th>
              <th scope="col">Location</th>
              <th scope="col">Capacity</th>
              <th scope="col">Driver</th>
              <th scope="col">Date Created</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {vehicles &&
              vehicles?.map((vehicle, index) => (
                <tr key={vehicle.id}>
                  <th>{index + 1}</th>
                  <td>
                    {vehicle.vtype.charAt(0).toUpperCase() +
                      vehicle.vtype.slice(1)}
                  </td>
                  <td>
                    {" "}
                    {vehicle.vmake.charAt(0).toUpperCase() +
                      vehicle.vmake.slice(1)}
                  </td>
                  <td>{vehicle.vmileage}</td>
                  <td>
                    {vehicle.vlocation.charAt(0).toUpperCase() +
                      vehicle.vlocation.slice(1)}
                  </td>
                  <td>{vehicle.vcapacity}</td>
                  <td>
                    {vehicle.user.username.charAt(0).toUpperCase() +
                      vehicle.user.username.slice(1)}
                  </td>
                  <td>{new Date(vehicle.createdAt).toDateString()}</td>
                  <td>
                    <i class="bi bi-pencil-square"></i>
                    &nbsp; &nbsp;
                    <i class="bi bi-trash-fill"></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <p style={{ color: "#f09a53", fontWeight: "bolder" }}>Bookings</p>
      </div>
    </div>
  );
};

export default BoardAdmin;
