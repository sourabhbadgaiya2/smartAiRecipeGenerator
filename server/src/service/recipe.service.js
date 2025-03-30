import redisClient from "../config/redis.config.js";
import generateRecipe from "../config/generateRecipe.js";
import ErrorHandlers from "../helpers/ErrorHandler.js";

export const generateAndCacheRecipe = async (
  ingredients,
  preferences = [],
  cuisine = ""
) => {
  try {
    const cacheKey = `recipe:${ingredients.sort().join(",")}:${preferences.join(
      ","
    )}:${cuisine}`;

    const cachedRecipe = await redisClient.get(cacheKey);
    if (cachedRecipe) {
      //   console.log("cachedRecipe Recipe:", JSON.parse(cachedRecipe));
      return JSON.parse(cachedRecipe);
    }

    // Generate Recipe using Gemini API
    const recipe = await generateRecipe(ingredients, preferences, cuisine);
    if (!recipe) throw new ErrorHandlers("AI failed to generate recipe.");

    // console.log("Generated Recipe:", recipe);

    await redisClient.set(cacheKey, JSON.stringify(recipe), "EX", 43200); // Save to Redis Cache (12 Hours)

    return recipe;
  } catch (error) {
    console.error("Error in Recipe Generation:", error.message);
    throw error;
  }
};
