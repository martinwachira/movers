import React, { useEffect, useState } from "react";

import UserService from "../services/user.service";
import UsersHomeHOC from "./UsersHomeHOC";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
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
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
        <div className="container" style={{ textAlign: "center" }}>
          <UsersHomeHOC />
        </div>
      </header>
    </div>
  );
};

export default BoardUser;
