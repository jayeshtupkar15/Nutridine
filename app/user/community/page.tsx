"use client";

import Image from "next/image";
import React from "react";


export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Background Hero Section */}
      <section
  className="w-full h-[500px] flex items-center justify-center text-white text-center px-4"
  style={{
    backgroundImage:
      "url('https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  }}
>
  <div className="bg-green-200 bg-opacity-80 p-8 rounded-xl shadow-xl max-w-2xl animate-fade-in">
    <h1 className="text-5xl font-extrabold text-green-800 mb-4 animate-typing">
      Welcome to Nutridine Community 💚
    </h1>
    <p className="text-lg text-green-900 font-medium tracking-wide">
      🍽️ Eat better • 💪 Stay strong • 🌿 Live healthy • 🤝 Together!
    </p>
  </div>
</section>


      {/* Featured Video */}
      <section className="py-16 px-6">
        <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">
          Healthy Living Spotlight
        </h2>
        <div className="flex justify-center">
          <iframe
            className="w-full max-w-3xl h-64 rounded-lg shadow-lg"
            src="https://www.youtube.com/embed/kMg7-y7zDo8"
            title="Weight Loss Journey Vlog"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </section>

      {/* Image Grid */}
      <section className="mb-16 px-6">
        <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Nutrition Choices</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            "https://thumbs.dreamstime.com/z/fat-man-choosing-junk-healthy-food-obesity-prevention-conscious-eating-nutrition-choices-mindfulness-lifestyle-sweet-171165679.jpg?ct=jpeg",
            "https://thumbs.dreamstime.com/z/healthy-snacking-balanced-nutrition-dietary-lifestyle-weight-losing-concept-overweight-woman-choosing-vegetables-junk-204330999.jpg?ct=jpeg",
            "https://thumbs.dreamstime.com/z/diet-woman-choosing-fruits-sweets-26733819.jpg?ct=jpeg",
          ].map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`Nutrition image ${index + 1}`}
              className="rounded-lg object-cover w-full h-60 shadow-md"
            />
          ))}
        </div>
      </section>

      {/* Motivation Quote */}
      <section className="text-center my-16 bg-green-100 py-12 px-6 rounded-xl shadow-inner mx-4">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Quote of the Day</h2>
        <blockquote className="italic text-lg text-gray-700">
          “The groundwork for all happiness is good health.” – Leigh Hunt
        </blockquote>
      </section>

      {/* Testimonials */}
      <section className="mb-16 px-6">
        <h2 className="text-2xl font-bold text-green-700 text-center mb-8">Community Voices</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              name: "Aarav",
              text: "I lost 10kg in 3 months thanks to Nutridine’s meal planner!",
              avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Sneha",
              text: "The community kept me going! I’ve never felt healthier.",
              avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            },
          ].map((user, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 flex items-center gap-4">
              <Image
                src={user.avatar}
                alt={user.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <p className="text-green-800 font-semibold">{user.name}</p>
                <p className="text-gray-700">{user.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center mt-16 mb-10 px-6">
        <h3 className="text-xl font-bold text-green-700 mb-4">Be part of the movement 💪</h3>
        <button className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition">
          Join the Community
        </button>
      </section>
      {/* Footer */}
      <footer className="bg-green-900 text-white py-10 px-6 mt-20">
  <div className="max-w-6xl mx-auto grid md:grid-cols-4 sm:grid-cols-2 gap-8">
    {/* Brand Info */}
    <div>
      <h2 className="text-2xl font-bold mb-2">Nutridine</h2>
      <p className="text-sm text-gray-300">
        Empowering healthy living through personalized nutrition and community support.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><a href="/user/meals" className="hover:text-green-300">Meal Planner</a></li>
        <li><a href="/user/nutrition-tracker" className="hover:text-green-300">Nutrition Tracker</a></li>
        <li><a href="/user/community" className="hover:text-green-300">Community</a></li>
        <li><a href="#features" className="hover:text-green-300">Why Nutridine?</a></li>
      </ul>
    </div>

    {/* Contact Info */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
      <p className="text-sm text-gray-300">Jayesh Tupkar</p>
      <p className="text-sm text-gray-300">📧 <a href="mailto:jaytupkar15@gmail.com" className="underline hover:text-green-300">jaytupkar15@gmail.com</a></p>
      <p className="text-sm text-gray-300">📍 India</p>
    </div>

    {/* Social Media */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
      <a
        href="https://instagram.com/nutridine.in"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-green-300"
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5ZM12 7.25a4.75 4.75 0 1 1 0 9.5a4.75 4.75 0 0 1 0-9.5Zm0 1.5a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5Zm4.75-.88a.88.88 0 1 1-1.75 0a.88.88 0 0 1 1.75 0Z" />
        </svg>
        @nutridine.in
      </a>
    </div>
  </div>

  <div className="mt-8 text-center text-sm text-gray-400">
    © {new Date().getFullYear()} Nutridine. All rights reserved.
  </div>
</footer>

    </main>
  );
}
