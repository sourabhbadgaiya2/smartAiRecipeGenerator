import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "./env.config.js";

const genAI = new GoogleGenerativeAI(config.GEMINI_API_KEY);

const generateRecipe = async (ingredients, preferences, cuisine) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `Generate a recipe using the following ingredients: ${ingredients.join(
      ", "
    )}. 
      Consider these preferences: ${preferences.join(
        ", "
      )}. Cuisine type: ${cuisine}. 
      Provide the response as a JSON object with fields: 
      {
        "title": "Recipe Title",
        "ingredients": ["item1", "item2"],
        "instructions": ["Step 1", "Step 2"]
      }`;

    const result = await model.generateContent(prompt);

    // Response validation
    if (
      !result ||
      !result.response ||
      !result.response.candidates ||
      result.response.candidates.length === 0
    ) {
      console.error("Full API Response:", JSON.stringify(result, null, 2));
      throw new Error("No candidates in API response.");
    }

    const textResponse = result.response.candidates[0]?.content?.parts[0]?.text;

    if (!textResponse) {
      throw new Error("No text content found in AI response.");
    }

    // Clean any markdown or code block markers
    const cleanText = textResponse.replace(/```json|```/g, "").trim();

    const recipe = JSON.parse(cleanText);

    return recipe;
  } catch (error) {
    console.error("Gemini API Error:", error.message || error);
    return null;
  }
};

export default generateRecipe;
