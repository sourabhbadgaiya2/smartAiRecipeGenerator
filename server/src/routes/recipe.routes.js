import express from "express";

import { verifyToken } from "../middleware/auth.middleware.js";
import {
  deleteRecipe,
  generateNewRecipe,
  getSavedRecipes,
  saveRecipe,
} from "../controllers/recipe.controller.js";
import { validateRecipeRequest } from "../middleware/input-validation.js";

const router = express.Router();

router.post("/generate", verifyToken, validateRecipeRequest, generateNewRecipe);

router.post("/save", verifyToken, saveRecipe);

router.get("/saved", verifyToken, getSavedRecipes);

router.delete("/saved/:id", verifyToken, deleteRecipe);

export default router;
