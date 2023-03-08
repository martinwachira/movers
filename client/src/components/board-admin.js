import React, { useEffect, useState } from "react";

import AuthService from "../services/auth.service";
import BookingService from "../services/booking.service";
import Modal from "react-bootstrap/Modal";
import UserService from "../services/user.service";
import VehicleService from "../services/vehicle.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState("");
  const [vehicles, setVehicles] = useState("");
  const [bookings, setBookings] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  // const handleUpdateUser = (data) => {
  //   const userId = AuthService.getCurrentUser().id;
  //   UserService.updateUser(userId, data)
  //     .then((response) => {
  //       console.log(response.data);
  //       // Handle success
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       // Handle error
  //     });
  // };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setCurrentUser((prevUser) => ({
      ...prevUser,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessage("");
    setSuccessful(false);
    UserService.updateUser(currentUser.id, currentUser)
      .then(
        (response) => {
          console.log("updated", response.data, "current user", currentUser);
          setCurrentUser(response);
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
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const handleEditUser = (user) => {
    setCurrentUser(user);
    handleShow(true);
  };

  console.log("user", currentUser);

  // console.log("bookings", bookings);
  // console.log("users", users);
  // console.log("vehicles", vehicles);

  return (
    <div className="container App">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <div className="card card-container">
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
          {currentUser && (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username:</label>
                <input
                  className="form-control"
                  type="text"
                  name="username"
                  value={currentUser.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Roles:</label>
                <select
                  className="form-control"
                  name="roles"
                  value={currentUser.roles}
                  onChange={handleChange}
                >
                  <option value="User">User</option>
                  <option value="Staff">Staff</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Verified:</label>
                <input
                  type="checkbox"
                  name="verified"
                  checked={currentUser.verified}
                  onChange={handleChange}
                />
              </div>
              <br />

              <button
                style={{
                  padding: ".5rem",
                  backgroundColor: "green",
                  color: "white",
                }}
                type="submit"
              >
                Save Changes
              </button>
            </form>
          )}
        </div>
      </Modal>

      <header className="jumbotron">{/* <h3>{content}</h3> */}</header>
      <p style={{ color: "#f09a53", fontWeight: "bolder" }}>Users</p>
      <div style={{ marginBottom: "2rem" }}>
        <table className="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Status</th>
              <th scope="col">Date Created</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
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
                  <td>
                    <span
                      style={{
                        color: user.roles.includes("User")
                          ? "orange"
                          : user.verified
                          ? "green"
                          : "red",
                      }}
                    >
                      {user.roles.includes("User")
                        ? "N/A"
                        : user.verified
                        ? "Verified"
                        : "Not Verified"}
                    </span>
                  </td>
                  <td>{new Date(user.createdAt).toDateString()}</td>
                  <td>
                    <i
                      class="bi bi-pencil-square"
                      onClick={() => handleEditUser(user)}
                    ></i>
                    &nbsp; &nbsp;
                    {/* <i class="bi bi-trash-fill"></i> */}
                  </td>
                </tr>
              ))
            ) : (
              <p>No Users Found</p>
            )}
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
              {/* <th scope="col">Action</th> */}
            </tr>
          </thead>
          <tbody>
            {vehicles.length > 0 ? (
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
                    {vehicle.user?.username.charAt(0).toUpperCase() +
                      vehicle.user?.username.slice(1)}
                  </td>
                  <td>{new Date(vehicle.createdAt).toDateString()}</td>
                  {/* <td>
                    <i class="bi bi-pencil-square"></i>
                    &nbsp; &nbsp;
                    <i class="bi bi-trash-fill"></i>
                  </td> */}
                </tr>
              ))
            ) : (
              <p>No Vehicles Found</p>
            )}
          </tbody>
        </table>
        <br />
        <p style={{ color: "#f09a53", fontWeight: "bolder" }}>Bookings</p>
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
              {/* <th scope="col">Action</th> */}
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
                  {/* <td>
                    <i class="bi bi-pencil-square"></i>
                    &nbsp; &nbsp;
                    <i class="bi bi-trash-fill"></i>
                  </td> */}
                </tr>
              ))
            ) : (
              <p>No Bookings Found</p>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BoardAdmin;
