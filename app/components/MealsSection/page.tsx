"use client";

import React from "react";
import MealCard from "../MealCard/page"; // Make sure the import path is correct

interface MealItem {
  image: string;
  title: string;
  calories: string;
  nutritionInfo: string;
}

const MealsSection: React.FC = () => {
  const meals: MealItem[] = [
    {
      image:
        "https://images.pexels.com/photos/17597408/pexels-photo-17597408.jpeg",
      title: "Quinoa Buddha Bowl",
      calories: "450",
      nutritionInfo: "High Protein",
    },
    {
      image:
        "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg",
      title: "Grilled Salmon Bowl",
      calories: "520",
      nutritionInfo: "Omega-3 Rich",
    },
  ];

  return (
    <section className="bg-green-50 px-5 py-20">
      <h2 className="mb-12 text-4xl font-bold text-center text-green-700 max-sm:text-3xl">
        Popular Healthy Meals
      </h2>
      <div className="flex gap-5 max-md:flex-col items-center justify-center">
        {meals.map((meal, index) => (
          <MealCard
            key={index}
            image={meal.image}
            title={meal.title}
            calories={meal.calories}
            nutritionInfo={meal.nutritionInfo}
            isSecond={index === 1}
          />
        ))}
      </div>
    </section>
  );
};

export default MealsSection;
