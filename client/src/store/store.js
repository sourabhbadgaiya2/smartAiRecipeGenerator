import { configureStore } from "@reduxjs/toolkit";
import alertsSlice from "./features/alertSlice";
import usersSlice from "./features/userSlice";
import recipeSlice from "./features/recipeSlice";

export const store = configureStore({
  reducer: {
    alerts: alertsSlice,
    users: usersSlice,
    recipe: recipeSlice,
  },
});
