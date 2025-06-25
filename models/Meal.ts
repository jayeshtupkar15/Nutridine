import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  title: String,
  calories: Number,
  nutritionInfo: String,
  image: String,
  description: String,
  ingredients: [String],
  instructions: [String],
});

export default mongoose.models.Meal || mongoose.model("Meal", mealSchema);
