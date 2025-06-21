import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Meal from "@/models/Meal";
import mealsData from "@/utils/mealsData.json";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // Optional: Delete existing data
    await Meal.deleteMany({});

    // Insert meals
    const inserted = await Meal.insertMany(mealsData);

    return NextResponse.json({ message: "Meals seeded", count: inserted.length });
  } catch (error) {
    console.error("Seeding Error:", error);
    return NextResponse.json({ error: "Failed to seed meals" }, { status: 500 });
  }
}
