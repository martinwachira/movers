import React, { useEffect, useState } from "react";

import AuthService from "../services/auth.service";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState({ username: "" });
  const [userReady, setUserReady] = useState(false);
  const [redirect, setRedirect] = useState(null);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      setRedirect("/home");
    } else {
      setCurrentUser(currentUser);
      setUserReady(true);
    }
  }, []);

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  console.log("users", currentUser);

  return (
    <div className="container">
      {userReady ? (
        <div>
          <header className="jumbotron">
            <h3>
              <strong>
                {currentUser.username.charAt(0).toUpperCase() +
                  currentUser.username.slice(1)}
              </strong>{" "}
              Profile
            </h3>
          </header>
          <p>
            <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)}{" "}
            ...{" "}
            {currentUser.accessToken.substr(
              currentUser.accessToken.length - 20
            )}
          </p>
          <p>
            <strong>Id:</strong> &nbsp;{currentUser.id}
          </p>
          <p>
            <strong>Email:</strong> &nbsp;{currentUser.email}
          </p>
          <strong>Role:</strong>
          <ul>
            {currentUser.roles &&
              currentUser.roles.map((role, index) => (
                <li key={index}>{role}</li>
              ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Profile;
