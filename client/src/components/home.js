import React, { useEffect, useState } from "react";

import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        setContent(
          (error.response && error.response.data) ||
            error.message ||
            error.toString()
        );
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <div className="container" style={{ textAlign: "center" }}>
          <h3>{content}</h3>
          <h2>Moving made easier with Movers App</h2>
          <div className="homeCard">
            <h5>Users</h5>
            <p>Users creates account</p>
            <p>Users logs in to the account</p>
            <p>Users views all staffs</p>
            <p>Users makes a booking</p>
            <p>Users makes payments</p>
          </div>
          <div className="homeCard">
            <h5>Staffs</h5>
            <p>Staffs manages their account</p>
            <p>Staffs views users</p>
          </div>
          <div className="homeCard">
            <h5>Admins</h5>
            <p>Admins manages user's accounts</p>
            <p>Admins adds vehicles</p>
            <p>Admins verifies staffs</p>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;
