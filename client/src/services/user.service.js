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

  function getAllUsers() {
    return axios.get(API_URL + "getUsers", { headers: authHeader() });
  }

  function updateUser(userId, currentUser) {
    return axios.put(API_URL + `updateUser/${userId}`, currentUser, {
      headers: authHeader(),
    });
  }

  // function getRoles() {
  //   return axios.get(API_URL + "getRoles", { headers: authHeader() });
  // }

  return {
    getPublicContent,
    getUserBoard,
    getStaffBoard,
    getAdminBoard,
    getAllUsers,
    updateUser,
    // getRoles,
  };
};

export default UserService();
