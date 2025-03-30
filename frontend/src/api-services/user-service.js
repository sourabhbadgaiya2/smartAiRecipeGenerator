import axios from "../config/axiosInstance";

export const getCurrentUser = async () => {
  const response = await axios.get("/api/users/current-user");
  return response.data;
};

export const getAllUsers = async () => {
  const response = await axios.get("/api/users/get-all-users");
  return response.data;
};
