import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Meal from "@/models/Meal";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const meals = await Meal.find({});
    return NextResponse.json({ meals });
  } catch (error) {
    console.error("Fetch Meals Error:", error);
    return NextResponse.json({ error: "Failed to fetch meals" }, { status: 500 });
  }
}
