import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Link, Route, Routes } from "react-router-dom";
import React, { useEffect, useState } from "react";

import AuthService from "./services/auth.service";
import BoardAdmin from "./components/board-admin";
import BoardStaff from "./components/board-staff";
import BoardUser from "./components/board-user";
import Home from "./components/home";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";

function App() {
  const [showStaffBoard, setShowStaffBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowStaffBoard(user.roles.includes("STAFF"));
      setShowAdminBoard(user.roles.includes("ADMIN"));
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowStaffBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  const year = new Date().getFullYear();
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark app-head">
        <Link to={"/"} className="navbar-brand container">
          Movers App
        </Link>
        <div className="container">
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>

            {showStaffBoard && (
              <li className="nav-item">
                <Link to={"/staff"} className="nav-link">
                  Staff Board
                </Link>
              </li>
            )}

            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link profileBack">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </div>
      </nav>
      <br />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/user" element={<BoardUser />} />
          <Route path="/staff" element={<BoardStaff />} />
          <Route path="/admin" element={<BoardAdmin />} />
        </Routes>
      </div>
      <footer className="App-footer">
        <p>&copy;{year} Movers App</p>
      </footer>
    </div>
  );
}

export default App;
