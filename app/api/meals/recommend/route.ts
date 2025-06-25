import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Meal from "@/models/Meal";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { goal, diet, minCal, maxCal } = await req.json();

    const query: any = {};

    if (goal) query.nutritionInfo = { $regex: new RegExp(goal, "i") };
    if (diet) query.nutritionInfo = { ...query.nutritionInfo, $regex: new RegExp(diet, "i") };
    if (minCal) query.calories = { ...query.calories, $gte: Number(minCal) };
    if (maxCal) query.calories = { ...query.calories, $lte: Number(maxCal) };

    const meals = await Meal.find(query);
    return NextResponse.json({ meals });
  } catch (err) {
    console.error("Recommendation Error:", err);
    return NextResponse.json({ error: "Failed to recommend meals" }, { status: 500 });
  }
}
