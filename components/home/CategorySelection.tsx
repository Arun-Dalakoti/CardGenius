import React, { useState } from "react";

// Types
interface Category {
  id: string;
  name: string;
  emoji: string;
  gradient: string[];
  selected?: boolean;
}

interface CategorySelectionConfig {
  heading?: string;
  categories: Category[];
}

// JSON Configuration
const categoryData: CategorySelectionConfig = {
  heading: "Select categories where you spend the most",
  categories: [
    {
      id: "travel",
      name: "Travel",
      emoji: "✈️",
      gradient: ["#3D4A5C", "#2B3644"],
      selected: false,
    },
    {
      id: "shopping",
      name: "Shopping",
      emoji: "👜",
      gradient: ["#3D5366", "#2B3E4D"],
      selected: true,
    },
    {
      id: "food",
      name: "Food",
      emoji: "🍽️",
      gradient: ["#3D5366", "#2B3E4D"],
      selected: true,
    },
    {
      id: "fuel",
      name: "Fuel",
      emoji: "⛽",
      gradient: ["#3D4A5C", "#2B3644"],
      selected: false,
    },
  ],
};

// Checkmark Icon
const CheckmarkIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="11"
      fill="white"
      stroke="white"
      strokeWidth="2"
    />
    <path
      d="M7 12L10.5 15.5L17 9"
      stroke="#2B3644"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Category Card Component
interface CategoryCardProps {
  category: Category;
  onToggle: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onClick={() => onToggle(category.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full aspect-square rounded-3xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
      style={{
        background: `linear-gradient(135deg, ${category.gradient[0]} 0%, ${category.gradient[1]} 100%)`,
        border: category.selected
          ? "2px solid rgba(255, 255, 255, 0.3)"
          : "2px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)",
        }}
      />

      {category.selected && (
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 animate-scaleIn">
          <CheckmarkIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </div>
      )}

      <div className="relative h-full flex flex-col items-center justify-center p-4 sm:p-6">
        <div
          className="mb-3 sm:mb-4 md:mb-6 transition-all duration-300 transform"
          style={{
            fontSize: isHovered ? "4.5rem" : "4rem",
            transform: isHovered
              ? "scale(1.15) translateY(-5px)"
              : "scale(1) translateY(0)",
            textShadow: "0 10px 20px rgba(0,0,0,0.3)",
            filter: isHovered
              ? "drop-shadow(0 15px 25px rgba(0,0,0,0.4))"
              : "drop-shadow(0 10px 20px rgba(0,0,0,0.3))",
          }}
        >
          {category.emoji}
        </div>

        <h3 className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium">
          {category.name}
        </h3>
      </div>

      <div
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
      />
    </div>
  );
};

// Main Category Selection Component
interface CategorySelectionProps {
  data?: CategorySelectionConfig;
  onSelectionChange?: (selectedIds: string[]) => void;
  maxColumns?: number;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  data = categoryData,
  onSelectionChange,
  maxColumns = 2,
}) => {
  const [categories, setCategories] = useState(data.categories);

  const handleToggle = (id: string) => {
    const updatedCategories = categories.map((cat) =>
      cat.id === id ? { ...cat, selected: !cat.selected } : cat
    );
    setCategories(updatedCategories);

    if (onSelectionChange) {
      const selectedIds = updatedCategories
        .filter((cat) => cat.selected)
        .map((cat) => cat.id);
      onSelectionChange(selectedIds);
    }
  };

  const gridClass =
    maxColumns === 2
      ? "grid grid-cols-2 gap-4 sm:gap-6 md:gap-8"
      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8";

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      {data.heading && (
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-center mb-8 sm:mb-12 md:mb-16 leading-tight">
          {data.heading}
        </h2>
      )}

      <div className={gridClass}>
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onToggle={handleToggle}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
