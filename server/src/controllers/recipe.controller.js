import { generateAndCacheRecipe } from "../service/recipe.service.js";
import Recipe from "../models/recipe.model.js";

export const generateNewRecipe = async (req, res, next) => {
  const { ingredients, preferences = [], cuisine = "" } = req.body;

  try {
    const recipe = await generateAndCacheRecipe(
      ingredients,
      preferences,
      cuisine
    );
    return res.status(200).json(recipe);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const saveRecipe = async (req, res, next) => {
  const { title, ingredients, instructions, preferences, cuisine } = req.body;
  const userId = req.user._id;
  console.log(title, ingredients, instructions, preferences, cuisine);

  try {
    const existingRecipe = await Recipe.findOne({ userId, title });
    if (existingRecipe)
      return res.status(400).json({ message: "Recipe already saved." });

    const newRecipe = new Recipe({
      userId,
      title,
      ingredients,
      instructions,
      preferences,
      cuisine,
    });
    await newRecipe.save();

    res.status(201).json({ message: "Recipe saved successfully!" });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

export const getSavedRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find({ userId: req.user._id });
    res.status(200).json(recipes);
  } catch (error) {
    console.log({ message: "Server error" });
    next(error);
  }
};

export const deleteRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });
    if (!recipe) return res.status(404).json({ message: "Recipe not found" });

    res.status(200).json({ message: "Recipe deleted successfully" });
  } catch (error) {
    console.log({ message: "Server error" });
    next(error);
  }
};
