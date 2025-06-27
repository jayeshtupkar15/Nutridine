"use client";

import React, { useEffect, useState } from "react";

interface Meal {
  _id?: string;
  title: string;
  calories: number;
  nutritionInfo: string;
  image: string;
  category?: string;
  description?: string;
  ingredients?: string[];
  instructions?: string[];
}

const categories = ["All", "High Protein", "Low Carb", "Vegan", "Weight Loss", "Muscle Gain"];

export default function MealsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [viewImageUrl, setViewImageUrl] = useState<string | null>(null);

  const [goal, setGoal] = useState("");
  const [diet, setDiet] = useState("");
  const [minCal, setMinCal] = useState("");
  const [maxCal, setMaxCal] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 6;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("/api/meals");
        const data = await res.json();
        setMeals(data.meals || []);
        setFilteredMeals(data.meals || []);
      } catch (err) {
        console.error("Failed to fetch meals", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
    const stored = localStorage.getItem("favorites");
    if (stored) setFavorites(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    let filtered = meals;

    if (showFavorites) {
      filtered = meals.filter((meal) => meal._id && favorites.includes(meal._id));
    } else {
      if (selectedCategory !== "All") {
        filtered = filtered.filter((meal) => meal.category === selectedCategory);
      }
      if (search.trim()) {
        filtered = filtered.filter((meal) =>
          meal.title.toLowerCase().includes(search.toLowerCase())
        );
      }
    }

    setFilteredMeals(filtered);
    setCurrentPage(1);
  }, [search, selectedCategory, meals, showFavorites, favorites]);

  const paginatedMeals = filteredMeals.slice(
    (currentPage - 1) * mealsPerPage,
    currentPage * mealsPerPage
  );

  return (
    <main className="min-h-screen px-6 py-10 bg-green-50 text-black">
      <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
        Discover Healthy & Delicious Meals 🍽️
      </h1>

      {/* AI Recommendations */}
      <section className="bg-white p-6 rounded-xl shadow-lg mb-10">
        <h2 className="text-2xl font-bold mb-4 text-green-700">🔍 AI Meal Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select className="px-4 py-2 border rounded-md" value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="">Select Goal</option>
            <option value="Weight Loss">Weight Loss</option>
            <option value="Muscle Gain">Muscle Gain</option>
          </select>
          <select className="px-4 py-2 border rounded-md" value={diet} onChange={(e) => setDiet(e.target.value)}>
            <option value="">Select Diet Type</option>
            <option value="Vegan">Vegan</option>
            <option value="Low Carb">Low Carb</option>
          </select>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min Cal"
              className="w-1/2 px-4 py-2 border rounded-md"
              value={minCal}
              onChange={(e) => setMinCal(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Cal"
              className="w-1/2 px-4 py-2 border rounded-md"
              value={maxCal}
              onChange={(e) => setMaxCal(e.target.value)}
            />
          </div>
        </div>
        <button
          className="mt-2 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={async () => {
            try {
              const res = await fetch("/api/meals/recommend", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ goal, diet, minCal, maxCal }),
              });

              if (!res.ok) throw new Error("Recommendation failed");

              const data = await res.json();
              setFilteredMeals(data.meals || []);
              setShowFavorites(false);
              setCurrentPage(1);
            } catch (err) {
              alert("Failed to fetch recommendations.");
              console.error("Recommendation Error:", err);
            }
          }}
        >
          🔮 Recommend Meals
        </button>
      </section>

      {/* Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <select
          className="px-4 py-2 rounded-md border border-slate-300 shadow-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          className="px-4 py-2 rounded-md border border-slate-300 shadow-sm"
          onChange={(e) => {
            const goal = e.target.value;
            setSearch(goal === "All" ? "" : goal);
          }}
        >
          <option value="All">All Goals</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Vegan">Vegan</option>
          <option value="Low Carb">Low Carb</option>
        </select>
        <input
          type="text"
          placeholder="Search by name..."
          className="px-4 py-2 rounded-md border border-slate-300 shadow-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Toggle Favorites */}
      <div className="flex justify-end mb-6">
        <button
          className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          {showFavorites ? "Show All Meals" : "💚 Show Favorites"}
        </button>
      </div>

      {/* Meals Grid */}
      {loading ? (
        <p className="text-center text-lg text-slate-600">Loading meals...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedMeals.map((meal) => (
              <div
                key={meal._id}
                className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
              >
                <img
                  src={meal.image || "/images/default-meal.jpg"}
                  alt={meal.title}
                  onClick={() => setViewImageUrl(meal.image)}
                  className="cursor-zoom-in w-full h-56 object-cover"
                />
                <button
                  onClick={() =>
                    setFavorites((prev) =>
                      prev.includes(meal._id!) ? prev.filter((id) => id !== meal._id) : [...prev, meal._id!]
                    )
                  }
                  className="absolute top-3 right-3 text-xl bg-white/80 text-green-600 rounded-full p-2 hover:bg-white transition"
                >
                  {favorites.includes(meal._id!) ? "💚" : "🤍"}
                </button>
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-slate-800">{meal.title}</h3>
                  <p className="text-slate-600 mt-2">{meal.calories} kcal • {meal.nutritionInfo}</p>
                  <p className="text-sm mt-1 text-green-600 font-medium">{meal.category}</p>
                  <button
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full"
                    onClick={() => setSelectedMeal(meal)}
                  >
                    🍽️ View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {filteredMeals.length > mealsPerPage && (
            <div className="flex justify-center mt-10 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
              >
                Prev
              </button>
              {Array.from({ length: Math.ceil(filteredMeals.length / mealsPerPage) }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded ${
                      page === currentPage
                        ? "bg-green-700 text-white"
                        : "bg-white text-green-700 border border-green-400"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(filteredMeals.length / mealsPerPage)))
                }
                disabled={currentPage === Math.ceil(filteredMeals.length / mealsPerPage)}
                className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}

      {/* Meal Detail Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white w-[90%] max-w-xl rounded-lg shadow-lg p-6 text-black relative overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-xl"
              onClick={() => setSelectedMeal(null)}
            >
              ✖
            </button>
            <img src={selectedMeal.image} alt={selectedMeal.title} className="w-full h-60 object-cover rounded-md mb-4" />
            <h2 className="text-2xl font-bold mb-2">{selectedMeal.title}</h2>
            <p className="text-gray-700 mb-1"><strong>Calories:</strong> {selectedMeal.calories}</p>
            <p className="text-gray-700 mb-1"><strong>Nutrition:</strong> {selectedMeal.nutritionInfo}</p>
            {selectedMeal.category && <p className="text-green-600 font-medium mb-3">{selectedMeal.category}</p>}
            <p className="text-gray-600 mb-4">{selectedMeal.description}</p>
          </div>
        </div>
      )}

      {/* Fullscreen Image Viewer */}
      {viewImageUrl && (
        <div className="fixed inset-0 z-[100] bg-black bg-opacity-90 flex items-center justify-center">
          <button
            className="absolute top-5 right-5 text-white text-3xl hover:text-red-400"
            onClick={() => setViewImageUrl(null)}
          >
            ✖
          </button>
          <img src={viewImageUrl} alt="Full Meal View" className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-lg" />
        </div>
      )}
    </main>
  );
}
