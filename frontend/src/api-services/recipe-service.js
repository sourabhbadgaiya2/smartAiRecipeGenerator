import axios from "../config/axiosInstance";

export const generateRecipes = async (data) => {
  const response = await axios.post("/api/recipes/generate", data);
  return response.data;
};

export const saveGenerateRecipe = async (data) => {
  const response = await axios.post("/api/recipes/save", data);
  return response.data;
};

export const getSaveRecipe = async (data) => {
  const response = await axios.get("/api/recipes/saved", data);
  return response.data;
};

export const deleteRecipe = async (data) => {
  const response = await axios.delete("/api/recipes/saved/:id", data);
  return response.data;
};
