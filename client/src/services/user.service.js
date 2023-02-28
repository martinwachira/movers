import authHeader from "./auth-header";
import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";

const UserService = () => {
  function getPublicContent() {
    return axios.get(API_URL + "all");
  }

  function getUserBoard() {
    return axios.get(API_URL + "user", { headers: authHeader() });
  }

  function getStaffBoard() {
    return axios.get(API_URL + "staff", { headers: authHeader() });
  }

  function getAdminBoard() {
    return axios.get(API_URL + "admin", { headers: authHeader() });
  }

  return {
    getPublicContent,
    getUserBoard,
    getStaffBoard,
    getAdminBoard,
  };
};

export default UserService();
