"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-green-900/90 backdrop-blur-lg shadow-md"
          : "bg-green-600/60 backdrop-blur-sm"
      }`}
    >
      <nav className="max-w-screen-2xl mx-auto flex items-center justify-between px-6 md:px-12 py-3 text-white">
        {/* Logo Left */}
        <div className="flex items-center space-x-3">
          <Image
            src="/images/logo.png"
            alt="Nutridine Logo"
            width={52}
            height={52}
            className="rounded-full object-contain"
          />
        </div>

        {/* Navigation Right */}
        <div className="hidden md:flex space-x-10 text-lg font-medium">
          <a href="#home" className="hover:underline underline-offset-4 transition">
            Home
          </a>
          <a href="#meals" className="hover:underline underline-offset-4 transition">
            Meals
          </a>
          <a href="#features" className="hover:underline underline-offset-4 transition">
            Features
          </a>
          <Link href="/logout" className="hover:text-red-300 transition">
            Logout
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
