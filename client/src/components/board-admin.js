import React, { useEffect, useState } from "react";

// import { Navigate } from "react-router-dom";
import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");
  const [users, setUsers] = useState("");
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
    //   console.log("response roles", response);
    // });
  }, []);

  // if (redirect) {
  //   return <Navigate to={redirect} />;
  // }

  console.log("users", users);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <p style={{ color: "#f09a53" }}>Users</p>
        <table className="table">
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
            {users &&
              users?.map((user) => (
                <tr key={user.id}>
                  <th>{user.id}</th>
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
                    *******************
                    {/* {user.accessToken.slice(0, 10) + user.accessToken(0, -10)} */}
                    {/* {user.accessToken.substring(0, 10)} ...
                    {user.accessToken.substr(user.accessToken.length - 10)} */}
                  </td>
                  <td>Edit</td>
                </tr>
              ))}
          </tbody>
        </table>
        <br />
        <p style={{ color: "#f09a53" }}>Vehicles</p>
      </header>
    </div>
  );
};

export default BoardAdmin;
