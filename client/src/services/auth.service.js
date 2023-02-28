import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const AuthService = {
  login: (username, password) => {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        console.log("user", response.data);

        return response.data;
      });
  },

  register: (username, email, password, user, staff) => {
    return axios(API_URL + "signup", {
      username,
      email,
      password,
      user,
      staff,
    });
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  logout() {
    localStorage.removeItem("user");
  },
};

export default AuthService;
