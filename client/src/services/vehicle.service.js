import authHeader from "./auth-header";
import axios from "axios";

const API_URL = "http://localhost:8080/api/test/";

const VehicleService = () => {
  function getAllVehicles() {
    return axios.get(API_URL + "getVehicles", { headers: authHeader() });
  }

  return {
    getAllVehicles,
  };
};

export default VehicleService();
