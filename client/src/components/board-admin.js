import React, { useEffect, useState } from "react";

import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";
import UserService from "../services/user.service";
import userService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [currentUser, setCurrentUser] = useState({ username: "" });
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      setRedirect("/home");
    } else {
      setCurrentUser(currentUser);
    }
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
    userService.getAllUsers().then(
      (response) => {
        setContent(response.data);
        console.log("response data", response.data);
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
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Access Token</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{currentUser.username}</td>
              <td>{currentUser.email}</td>
              <td>{currentUser.role}</td>
              <td>
                *******************
                {/* {currentUser.accessToken.substring(0, 10)} ...
                {currentUser.accessToken.substr(
                  currentUser.accessToken.length - 10
                )} */}
              </td>
              <td>Edit</td>
            </tr>
          </tbody>
        </table>
      </header>
    </div>
  );
};

export default BoardAdmin;
