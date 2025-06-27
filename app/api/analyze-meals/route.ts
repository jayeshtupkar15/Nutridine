import { NextResponse } from "next/server";

const NUTRITIONIX_APP_ID = process.env.NUTRITIONIX_APP_ID!;
const NUTRITIONIX_API_KEY = process.env.NUTRITIONIX_API_KEY!;


export async function POST(req: Request) {
  try {
    const { breakfast, lunch, dinner } = await req.json();

    const meals = { breakfast, lunch, dinner };

    const analyzedMeals: any = {};
    let totalCalories = 0;
    const unhealthyItems: string[] = [];

    for (const [mealName, items] of Object.entries(meals)) {
      const response = await fetch("https://trackapi.nutritionix.com/v2/natural/nutrients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-app-id": NUTRITIONIX_APP_ID,
          "x-app-key": NUTRITIONIX_API_KEY,
        },
        body: JSON.stringify({ query: items }),
      });

      if (!response.ok) {
        throw new Error(`Nutritionix API error: ${response.statusText}`);
      }

      const result = await response.json();
      const mealItems = result.foods.map((food: any) => ({
        name: food.food_name,
        quantity: `${food.serving_qty} ${food.serving_unit}`,
        calories: food.nf_calories,
        unhealthy: isUnhealthy(food.food_name),
      }));

      totalCalories += mealItems.reduce((sum: number, f: any) => sum + f.calories, 0);
      analyzedMeals[mealName] = mealItems;

      mealItems.forEach((item: any) => {
        if (item.unhealthy) unhealthyItems.push(item.name);
      });
    }

    return NextResponse.json({
      meals: analyzedMeals,
      totalCalories: Math.round(totalCalories),
      unhealthyItems,
    });
  } catch (err: any) {
    console.error("Nutrition API error:", err);
    return NextResponse.json({ error: "Failed to estimate nutrition." }, { status: 500 });
  }
}

function isUnhealthy(foodName: string): boolean {
  const junk = ["samosa", "french fries", "cold drink", "burger", "pizza", "chocolate", "fried"];
  return junk.some((j) => foodName.toLowerCase().includes(j));
}
