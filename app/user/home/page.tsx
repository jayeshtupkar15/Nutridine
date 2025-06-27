"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const year = new Date().getFullYear();

  const features = [
    {
      img: "https://images.pexels.com/photos/5386738/pexels-photo-5386738.jpeg",
      title: "Smart Meal Planning",
      desc: "Get meals tailored to your goals and lifestyle",
    },
    {
      img: "https://images.pexels.com/photos/17947739/pexels-photo-17947739.jpeg",
      title: "Nutrition Tracking",
      desc: "Track your intake and maintain a healthy balance",
    },
    {
      img: "https://images.pexels.com/photos/8709017/pexels-photo-8709017.jpeg",
      title: "Community Support",
      desc: "Connect with like-minded health enthusiasts",
    },
  ];

  const meals = [
    {
      image: "https://images.pexels.com/photos/17597408/pexels-photo-17597408.jpeg",
      title: "Quinoa Buddha Bowl",
      calories: "450",
      info: "High Protein",
    },
    {
      image: "https://images.pexels.com/photos/3763847/pexels-photo-3763847.jpeg",
      title: "Grilled Salmon Bowl",
      calories: "520",
      info: "Omega-3 Rich",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-green-900/90 backdrop-blur-md shadow-md" : "bg-green-700/70 backdrop-blur-sm"}`}>
        <nav className="max-w-screen-xl mx-auto flex items-center justify-between px-6 py-4 text-white">
          <div className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="Nutridine Logo" width={44} height={44} className="rounded-full" />
            <span className="text-xl font-bold tracking-wide">Nutridine</span>
          </div>
          <div className="hidden md:flex gap-6 font-medium">
            <Link href="#hero" className="hover:text-green-300">Home</Link>
            <Link href="/user/meals" className="hover:text-green-300">Meals</Link>
            <Link href="/user/nutrition-tracker" className="hover:text-green-300">Nutrition</Link>
            <Link href="/user/community" className="hover:text-green-300">Community</Link>
            <Link href="/logout" className="hover:text-red-400">Logout</Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center text-white text-center px-6">
        <Image
          src="https://images.pexels.com/photos/6327559/pexels-photo-6327559.jpeg"
          alt="Healthy lifestyle"
          fill
          className="object-cover brightness-[0.6] z-[-1]"
        />
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Journey to Healthy Living Starts Here</h1>
          <p className="text-lg md:text-xl mb-6">Personalized meal plans, smart nutrition & an inspiring community</p>
          <Link href="/user/meals" className="inline-block bg-green-500 hover:bg-green-600 transition px-6 py-3 text-white rounded-full font-semibold">
            Explore Meals
          </Link>
          <div className="mt-10 animate-bounce">
            <ArrowDownIcon className="h-7 w-7 text-white opacity-70" />
          </div>
        </div>
      </section>

      {/* Welcome Quote */}
      <section className="bg-green-100 py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">Welcome to Nutridine!</h2>
        <p className="text-xl text-green-700 italic">“Let food be thy medicine and medicine be thy food.” – Hippocrates</p>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-slate-50 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-900">Why Choose Nutridine?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((item, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition">
              <img src={item.img} alt={item.title} className="rounded-full h-24 w-24 object-cover mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-green-800 mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meals Section */}
      <section className="bg-green-50 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-green-700">Popular Healthy Meals</h2>
        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {meals.map((meal, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img src={meal.image} alt={meal.title} className="h-64 w-full object-cover" />
              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-800">{meal.title}</h3>
                <p className="text-gray-500">{meal.calories} kcal | {meal.info}</p>
                <Link href="/user/meals" className="mt-4 inline-block text-green-600 hover:underline">
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12 px-6 mt-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-2">Nutridine</h2>
            <p className="text-sm text-gray-300">Empowering healthy living through personalized nutrition and community support.</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li><Link href="/user/meals" className="hover:text-green-300">Meal Planner</Link></li>
              <li><Link href="/user/nutrition-tracker" className="hover:text-green-300">Nutrition Tracker</Link></li>
              <li><Link href="/user/community" className="hover:text-green-300">Community</Link></li>
              <li><a href="#features" className="hover:text-green-300">Features</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-sm text-gray-300">Jayesh Tupkar</p>
            <a href="mailto:jaytupkar15@gmail.com" className="underline text-sm hover:text-green-300">jaytupkar15@gmail.com</a>
            <p className="text-sm text-gray-300">India</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Social</h3>
            <a
              href="https://instagram.com/nutridine.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-gray-300 hover:text-green-300"
            >
              📷 @nutridine.in
            </a>
          </div>
        </div>
        <p className="mt-10 text-center text-xs text-gray-400">
          © {year} Nutridine. All rights reserved.
        </p>
      </footer>
    </>
  );
}
