"use client";

import Image from "next/image";
import { useState } from "react";
import Head from "next/head";
import Button from "@/components/ui/Button";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: "travel", name: "Travel", icon: "/airplane.png" },
  { id: "shopping", name: "Shopping", icon: "/bag.png" },
  { id: "food", name: "Food", icon: "/food.png" },
  { id: "fuel", name: "Fuel", icon: "/fuel.png" },
];

function CategoryCard({
  category,
  isSelected,
  onToggle,
}: {
  category: Category;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className="relative cursor-pointer p-2"
      style={{
        background: isSelected
          ? "#0263BE33"
          : "linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)",
        backgroundClip: "padding-box",
        border: "2px solid transparent",
        position: "relative",
        borderRadius: "20px",
      }}
    >
      {/* Gradient border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          padding: "2px",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(0, 0, 0, 0) 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: -1,
          borderRadius: "20px",
        }}
      />
      {/* Checkbox - half in, half out at top right */}
      <div className="absolute -top-3 -right-3 z-10">
        <Image
          src="/checkbox.svg"
          alt="Checkbox"
          width={24}
          height={24}
          style={{
            opacity: isSelected ? 1 : 0.3,
          }}
        />
      </div>

      {/* Icon */}
      <div
        className="flex justify-center transition-transform duration-300 mb-1"
        style={{
          position: "relative",
          top: "-24.64px",
          left: "7.51px",
          transform: isSelected ? "scale(1.05)" : "scale(1)",
        }}
      >
        <Image
          src={category.icon}
          alt={category.name}
          width={105.98}
          height={105.98}
        />
      </div>

      {/* Category Name */}
      <p
        className="text-white text-center text-label-md"
        style={{ marginTop: "-30px" }}
      >
        {category.name}
      </p>
    </div>
  );
}

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <>
      <Head>
        <title>BankKaro - Find Your Best Credit Card</title>
      </Head>
      <div
        className="min-h-screen pt-16 px-8 pb-40"
        style={{
          background: "linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)",
        }}
      >
        <h1 className="text-white text-center mb-8 text-heading-lg">
          Find your best Credit card
        </h1>

        <div className="flex justify-center">
          <Image
            src="/card.png"
            alt="Credit card"
            width={400}
            height={250}
            priority
          />
        </div>

        <p className="text-white text-center mt-6 mb-8 text-body-sm">
          Choose one or more categories where you spend the most
        </p>

        {/* Category Cards */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              isSelected={selectedCategories.includes(category.id)}
              onToggle={() => toggleCategory(category.id)}
            />
          ))}
        </div>

        {/* Add Spends Button - Fixed at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 py-4" style={{ background: "linear-gradient(180deg, transparent 0%, #3A3F49 40%)" }}>
          <Button fullWidth>
            Add Spends
          </Button>

          <p
            className="text-center mt-4 text-caption-xs"
            style={{
              background: "rgba(255, 255, 255, 0.6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Select at least one category to continue
          </p>
        </div>
      </div>
    </>
  );
}
