"use client";

import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="flex relative items-center px-5 py-0 h-[85vh] max-sm:px-5 max-sm:py-0 max-sm:text-center max-sm:h-[70vh]">
      <img
        src="https://images.pexels.com/photos/6327559/pexels-photo-6327559.jpeg"
        alt="Healthy lifestyle background"
        className="object-cover overflow-hidden absolute top-0 left-0 aspect-square brightness-[0.65] size-full z-[-1]"
      />
      <div className="max-w-[600px] text-[white]">
        <h1 className="mb-6 text-6xl font-bold max-sm:text-4xl">
          Your Journey to Healthy Living Starts Here
        </h1>
        <p className="mb-8 text-xl leading-relaxed">
          Discover personalized meal plans, track your nutrition, and achieve
          your wellness goals with Nutridine.
        </p>
        <button className="px-8 py-4 text-lg font-semibold bg-green-500 rounded-lg transition-all cursor-pointer duration-[0.3s] ease-[ease] text-[white] hover:bg-green-600">
          Get Started Free
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
