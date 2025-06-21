import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Meal from "@/models/Meal"; // Make sure this model exists

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { goal, diet, minCal, maxCal } = await req.json();

    // Convert calorie range to numbers
    const minCalories = minCal ? parseInt(minCal) : 0;
    const maxCalories = maxCal ? parseInt(maxCal) : 10000;

    // Build query based on inputs
    const query: any = {
      calories: { $gte: minCalories, $lte: maxCalories },
    };

    if (goal) {
      query.category = goal;
    }

    if (diet) {
      query.nutritionInfo = { $regex: diet, $options: "i" };
    }

    const recommendedMeals = await Meal.find(query).limit(10);

    return NextResponse.json({ meals: recommendedMeals });
  } catch (error: any) {
    console.error("❌ Error in recommend API:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
