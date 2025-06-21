// /components/MealCard.tsx
import React from "react";

interface MealCardProps {
  image: string;
  title: string;
  calories: string;
  nutritionInfo: string;
  isSecond?: boolean;
}

const MealCard: React.FC<MealCardProps> = ({
  image,
  title,
  calories,
  nutritionInfo,
  isSecond = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <article
      className={`w-6/12 ${isSecond ? "ml-5" : ""} max-md:ml-0 max-md:w-full`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`overflow-hidden rounded-xl shadow-md transition-transform duration-[0.3s] ease-[ease] ${
          isHovered ? "transform scale-[1.02]" : ""
        }`}
      >
        <img
          src={image}
          alt={title}
          className="object-cover overflow-hidden w-full aspect-square h-[300px]"
        />
        <div className="p-6">
          <h3 className="mb-2 text-2xl font-semibold text-slate-900">{title}</h3>
          <p className="mb-4 text-slate-500">
            {calories} calories | {nutritionInfo}
          </p>
          <button className="px-6 py-3 text-base bg-green-500 rounded-md transition-all cursor-pointer duration-[0.3s] ease-[ease] text-[white] hover:bg-green-600">
            View Recipe
          </button>
        </div>
      </div>
    </article>
  );
};

export default MealCard;
