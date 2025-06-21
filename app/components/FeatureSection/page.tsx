import React from "react";
import FeatureCard from "../../components/FeatureCard/page";

interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

const FeatureSection: React.FC = () => {
  const features: FeatureItem[] = [
    {
      image:
        "https://images.pexels.com/photos/5386738/pexels-photo-5386738.jpeg",
      title: "Smart Meal Planning",
      description:
        "Personalized meal suggestions based on your preferences and nutritional needs",
    },
    {
      image:
        "https://images.pexels.com/photos/17947739/pexels-photo-17947739.jpeg",
      title: "Nutrition Tracking",
      description:
        "Track your daily intake and maintain a balanced, healthy diet effortlessly",
    },
    {
      image:
        "https://images.pexels.com/photos/8709017/pexels-photo-8709017.jpeg",
      title: "Community Support",
      description:
        "Join a community of health enthusiasts and share your wellness journey",
    },
  ];

  return (
    <section className="px-5 py-20 bg-slate-50">
      <h2 className="mb-12 text-4xl font-bold text-center text-slate-900 max-sm:text-3xl">
        Why Choose Nutridine?
      </h2>
      <div className="flex gap-5 max-md:flex-col">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            image={feature.image}
            title={feature.title}
            description={feature.description}
            isMiddle={index === 1}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
