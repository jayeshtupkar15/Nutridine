import React from "react";

interface FeatureCardProps {
  image: string;
  title: string;
  description: string;
  isMiddle?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  image,
  title,
  description,
  isMiddle = false,
}) => {
  return (
    <article
      className={`w-[33%] ${isMiddle ? "ml-5" : ""} max-md:ml-0 max-md:w-full`}
    >
      <div className="p-8 h-full text-center rounded-xl shadow-md">
        <img
          src={image}
          alt={title}
          className="object-cover overflow-hidden mx-auto mt-0 mb-6 aspect-square h-[120px] w-[120px] rounded-full"
        />
        <h3 className="mb-4 text-2xl font-semibold text-slate-900">{title}</h3>
        <p className="leading-relaxed text-slate-500">{description}</p>
      </div>
    </article>
  );
};

export default FeatureCard;
