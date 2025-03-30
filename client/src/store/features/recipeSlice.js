import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
  name: "recipe",
  initialState: { generatedRecipe: null, savedRecipes: [] },
  reducers: {
    setGeneratedRecipe: (state, action) => {
      state.generatedRecipe = action.payload;
    },
    setSavedRecipes: (state, action) => {
      state.savedRecipes = action.payload;
    },
  },
});

export const { setGeneratedRecipe, setSavedRecipes } = recipeSlice.actions;
export default recipeSlice.reducer;
