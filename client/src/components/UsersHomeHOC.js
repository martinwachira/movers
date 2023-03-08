import React from "react";

const UsersHomeHOC = () => {
  return (
    <>
      <h2>Moving made easier with Movers App</h2>
      <div className="homeCard">
        <h5>Users</h5>
        <p>User creates account</p>
        <p>User logs in to the account</p>
        <p>User views all drivers</p>
        <p>User views personal profile</p>
        <p>User makes/views bookings</p>
      </div>
      <div className="homeCard">
        <h5>Staffs</h5>
        <p>Driver views personal profile</p>
        <p>Driver makes a booking</p>
        <p>Driver views bookings made (individually)</p>
      </div>
      <div className="homeCard">
        <h5>Admins</h5>
        <p>Admin manages user's accounts</p>
        <p>Admin verifies drivers</p>
        <p>Admin adds vehicles</p>
        <p>Admin updates accounts</p>
      </div>
    </>
  );
};

export default UsersHomeHOC;
