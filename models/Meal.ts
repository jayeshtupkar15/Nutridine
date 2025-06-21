import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  title: String,
  calories: Number,
  nutritionInfo: String,
  image: String,
  category: String, // 👈 New
});

export default mongoose.models.Meal || mongoose.model("Meal", MealSchema);
