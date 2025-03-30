import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    preferences: {
      type: [String],
      default: [],
    },
    cuisine: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;
