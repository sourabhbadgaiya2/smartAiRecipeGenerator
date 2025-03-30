import axios from "../config/axiosInstance";

export const getCurrentUser = async () => {
  const response = await axios.get("/api/users/current-user");
  return response.data;
};

export const updateUsers = async (data) => {
  const response = await axios.put("/api/users/update-user", data);
  return response.data;
};
