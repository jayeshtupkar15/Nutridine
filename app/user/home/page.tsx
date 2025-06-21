"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection/page";
import WelcomeQuote from "../../components/WelcomeQuote/page";
import FeatureSection from "../../components/FeatureSection/page";
import MealSection from "../../components/MealsSection/page";

export default function HomePage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll-responsive Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-green-900/80 backdrop-blur-md shadow-md"
            : "bg-green-600/60 backdrop-blur-sm"
        } text-white`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/user/home" className="flex items-center space-x-3">
            <img
              src="/images/logo2.png"
              alt="Nutridine Logo"
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-10 text-lg font-semibold">
            <Link href="/user/home" className="hover:underline underline-offset-4 transition">
              Home
            </Link>
            <Link href="/user/meals" className="hover:underline underline-offset-4 transition">
              Meals
            </Link>
            <Link href="/user/features" className="hover:underline underline-offset-4 transition">
              Features
            </Link>
            <Link href="/logout" className="hover:text-red-300 transition">
              Logout
            </Link>
          </nav>
        </div>
      </header>

      {/* Padding for fixed navbar */}
      <div className="pt-24">
        <HeroSection />
        <WelcomeQuote />
        <FeatureSection />
        <MealSection />
      </div>
    </>
  );
}
