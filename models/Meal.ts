import mongoose from "mongoose";

const MealSchema = new mongoose.Schema({
  title: { type: String, required: true },
  calories: { type: Number, required: true },
  nutritionInfo: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  ingredients: [{ type: String }],
  instructions: [{ type: String }]
});

export default mongoose.models.Meal || mongoose.model("Meal", MealSchema);
