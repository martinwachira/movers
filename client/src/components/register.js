import React, { useCallback, useRef, useState } from "react";

import AuthService from "../services/auth.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email1 = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState({
    user: false,
    staff: false,
  });
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  const form = useRef(null);
  const checkBtnRef = useRef(null);

  const handleRoleCheckboxChange = useCallback((event) => {
    setRole((prev) => ({ ...prev, [event.target.id]: event.target.checked }));
  }, []);

  // const roles = Object.entries(role);
  const roles = Object.entries(role)
    .filter(([, value]) => value)
    .map(([key]) => key);

  // console.log("roles", roles);

  const handleRegister = (e) => {
    e.preventDefault();

    setMessage("");
    setSuccessful(false);

    form.current.validateAll();

    if (checkBtnRef.current.context._errors.length === 0) {
      AuthService.register(username, email, password, roles).then(
        (response) => {
          setMessage(response.data.message);
          setSuccessful(true);
          // console.log("response", response);
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
      );
    }
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  validations={[required, email1]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  className="form-control"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  validations={[required, vpassword]}
                />
              </div>
              <div className="form-group-row">
                <label htmlFor="Role">Role</label>
                {/* <div className="form-group"> */}
                <label>
                  <input
                    type="checkbox"
                    id="user"
                    checked={role.user}
                    onChange={handleRoleCheckboxChange}
                  />{" "}
                  &nbsp; User
                </label>

                <label>
                  <input
                    type="checkbox"
                    id="staff"
                    checked={role.staff}
                    onChange={handleRoleCheckboxChange}
                  />
                  &nbsp; Staff
                </label>
                {/* </div> */}
              </div>
              <br />
              <div className="form-group">
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

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
          <CheckButton style={{ display: "none" }} ref={checkBtnRef} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
