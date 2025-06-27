"use client";

import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

type MealData = {
  name: string;
  quantity: string;
  calories: number;
  unhealthy: boolean;
};

interface NutritionResponse {
  meals: {
    breakfast: MealData[];
    lunch: MealData[];
    dinner: MealData[];
  };
  totalCalories: number;
  unhealthyItems: string[];
}

export default function NutritionPage() {
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [dinner, setDinner] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<NutritionResponse | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!breakfast || !lunch || !dinner) {
      setError("Please fill in all three sections following the format.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch("/api/analyze-meals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ breakfast, lunch, dinner }),
      });

      const result = await res.json();
      if (result.error) throw new Error(result.error);
      setData(result);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const chartData = data && {
    labels: ["Breakfast", "Lunch", "Dinner"],
    datasets: [
      {
        label: "Calories",
        data: [
          data.meals.breakfast.reduce((sum, i) => sum + i.calories, 0),
          data.meals.lunch.reduce((sum, i) => sum + i.calories, 0),
          data.meals.dinner.reduce((sum, i) => sum + i.calories, 0),
        ],
        backgroundColor: ["#4ade80", "#facc15", "#f87171"],
      },
    ],
  };

  return (
    <main
      className="p-8 min-h-screen bg-green-50 relative text-green-900"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="bg-white/90 p-6 md:p-10 rounded-xl shadow-lg max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-green-700 text-center">
          Nutridine: AI Nutrition Estimator 🍽️
        </h1>

        {/* Instruction Section */}
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded mb-6 text-sm">
          <strong>How to input your meals:</strong>
          <ul className="list-disc pl-5 mt-2">
            <li>Include quantity and food name (e.g., "2 idlis, 1 cup tea")</li>
            <li>Separate items with commas</li>
            <li>Avoid just saying "lunch" or "dinner" — be specific!</li>
          </ul>
        </div>

        {/* Input Area */}
        <div className="space-y-6 mb-6">
          {error && <p className="text-red-600 font-medium">{error}</p>}

          <div>
            <label className="block text-lg font-semibold mb-2 text-green-800">Breakfast</label>
            <textarea
              value={breakfast}
              onChange={(e) => setBreakfast(e.target.value)}
              className="w-full p-3 border rounded-md text-black"
              placeholder="e.g. 2 idlis, 1 boiled egg, 1 cup tea"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-green-800">Lunch</label>
            <textarea
              value={lunch}
              onChange={(e) => setLunch(e.target.value)}
              className="w-full p-3 border rounded-md text-black"
              placeholder="e.g. 1 bowl rice, chicken curry, 1 roti"
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2 text-green-800">Dinner</label>
            <textarea
              value={dinner}
              onChange={(e) => setDinner(e.target.value)}
              className="w-full p-3 border rounded-md text-black"
              placeholder="e.g. 2 chapatis, paneer bhurji, salad"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 transition px-6 py-3 rounded text-white font-semibold"
          >
            {loading ? "Estimating..." : "Estimate Calories"}
          </button>
        </div>

        {/* Results */}
        {data && (
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-green-800">Results:</h2>
            <p className="text-lg font-medium text-green-900">
              Total Calories: <span className="font-bold">{data.totalCalories}</span> kcal
            </p>

            {/* Unhealthy Items */}
            <div>
              <h3 className="font-semibold text-red-600 text-lg">Unhealthy Items:</h3>
              {data.unhealthyItems.length === 0 ? (
                <p className="text-green-700">✅ No unhealthy items detected</p>
              ) : (
                <ul className="list-disc pl-5 text-red-500">
                  {data.unhealthyItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded shadow">
                <h4 className="text-lg font-semibold mb-2">Bar Chart</h4>
                <Bar data={chartData!} />
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h4 className="text-lg font-semibold mb-2">Pie Chart</h4>
                <Pie data={chartData!} />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
