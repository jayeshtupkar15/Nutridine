// scripts/seedMeals.ts
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../lib/mongodb";
import Meal from "../models/Meal";
import mealsData from "../utils/mealsData.json";

dotenv.config();

const seedMeals = async () => {
  try {
    await connectDB();
    await Meal.deleteMany(); // Optional: Clean existing data
    const inserted = await Meal.insertMany(mealsData);
    console.log(`✅ Successfully seeded ${inserted.length} meals.`);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedMeals();
