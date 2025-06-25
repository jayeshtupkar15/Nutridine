"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      image: "https://images.pexels.com/photos/5386738/pexels-photo-5386738.jpeg",
      title: "Smart Meal Planning",
      description: "Get meals tailored to your goals and lifestyle",
    },
    {
      image: "https://images.pexels.com/photos/17947739/pexels-photo-17947739.jpeg",
      title: "Nutrition Tracking",
      description: "Track your intake and maintain a healthy balance",
    },
    {
      image: "https://images.pexels.com/photos/8709017/pexels-photo-8709017.jpeg",
      title: "Community Support",
      description: "Connect with like-minded health enthusiasts",
    },
  ];

  const meals = [
    {
      image: "https://images.pexels.com/photos/17597408/pexels-photo-17597408.jpeg",
      title: "Quinoa Buddha Bowl",
      calories: "450",
      nutritionInfo: "High Protein",
    },
    {
      image: "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg",
      title: "Grilled Salmon Bowl",
      calories: "520",
      nutritionInfo: "Omega-3 Rich",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-green-900/90 backdrop-blur-lg shadow-md" : "bg-green-600/60 backdrop-blur-sm"
        }`}
      >
        <nav className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-12 py-3 text-white">
          <div className="flex items-center space-x-3">
            <Image
              src="/images/logo.png"
              alt="Nutridine Logo"
              width={52}
              height={52}
              className="rounded-full object-contain"
            />
          </div>
          <div className="hidden md:flex space-x-10 text-lg font-medium">
            <a href="#home" className="hover:underline underline-offset-4 transition">Home</a>
            <Link href="/user/meals" className="hover:underline underline-offset-4 transition">Meals</Link>
            <a href="#features" className="hover:underline underline-offset-4 transition">Features</a>
            <button onClick={() => setShowModal(true)} className="hover:text-green-300 transition">Join Now</button>
            <Link href="/logout" className="hover:text-red-300 transition">Logout</Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="pt-24" id="home">
        {/* Hero */}
        <section className="flex relative items-center px-6 py-0 h-[90vh] max-sm:h-[70vh] text-white">
          <img
            src="https://images.pexels.com/photos/6327559/pexels-photo-6327559.jpeg"
            alt="Healthy lifestyle background"
            className="absolute top-0 left-0 w-full h-full object-cover brightness-[0.65] z-[-1]"
          />
          <div className="max-w-[650px]">
            <h1 className="mb-6 text-5xl md:text-6xl font-bold">Your Journey to Healthy Living Starts Here</h1>
            <p className="mb-8 text-lg md:text-xl leading-relaxed">
              Discover personalized meal plans, track your nutrition, and achieve your wellness goals with Nutridine.
            </p>
            <div className="flex gap-4 flex-wrap">
              <a href="#features" className="px-6 py-3 bg-green-500 rounded-lg hover:bg-green-600 transition font-semibold text-white">
                Explore Features
              </a>
              <button
                className="px-6 py-3 bg-white text-green-700 border border-green-500 rounded-lg hover:bg-green-100 transition font-semibold"
                onClick={() => setShowModal(true)}
              >
                Join Now
              </button>
            </div>
          </div>
        </section>

        {/* Welcome Quote */}
        <section className="bg-green-100 px-6 py-16 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-4">Welcome to Nutridine!</h2>
          <p className="text-xl text-green-700 italic">
            “Let food be thy medicine and medicine be thy food.” – Hippocrates
          </p>
        </section>

        {/* Features */}
        <section className="px-6 py-20 bg-slate-50" id="features">
          <h2 className="mb-12 text-4xl font-bold text-center text-slate-900 max-sm:text-3xl">Why Choose Nutridine?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition-all">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="mx-auto mb-6 w-24 h-24 rounded-full object-cover"
                />
                <h3 className="text-xl font-semibold mb-2 text-green-800">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Meals */}
        <section className="bg-green-50 px-6 py-20" id="meals">
          <h2 className="mb-12 text-4xl font-bold text-center text-green-700 max-sm:text-3xl">Popular Healthy Meals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {meals.map((meal, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
                <img src={meal.image} alt={meal.title} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-slate-800">{meal.title}</h3>
                  <p className="text-slate-500 my-2">{meal.calories} calories | {meal.nutritionInfo}</p>
                  <Link
                    href="/user/meals"
                    className="inline-block mt-4 px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    View Recipes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Join Now Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-4 text-slate-500 hover:text-red-500 text-2xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h3 className="text-2xl font-bold text-green-800 mb-4">Join Nutridine Now</h3>
            <p className="mb-6 text-slate-600">Start your journey to a healthier life.</p>
            <form className="flex flex-col gap-4">
              <input type="text" placeholder="Full Name" className="border rounded px-4 py-2" />
              <input type="email" placeholder="Email Address" className="border rounded px-4 py-2" />
              <input type="password" placeholder="Password" className="border rounded px-4 py-2" />
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                Create Account
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
