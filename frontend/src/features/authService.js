import axios from "axios";

const API_URL = "http://localhost:3001/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "patient/register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const loginPatient = async (userData) => {
  const response = await axios.post(API_URL + "patient/login", userData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};
const loginMedecin = async (userData) => {
  const response = await axios.post(API_URL + "medecin/login", userData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};
const loginAdmin = async (userData) => {
  const response = await axios.post(API_URL + "admin/login", userData);
  localStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

const logout = async () => {
  await new Promise((resolve) => {
    localStorage.removeItem("user");
    resolve();
  });
};

const authService = {
  register,
  logout,
  loginPatient,
  loginMedecin,
  loginAdmin,
};

export default authService;
