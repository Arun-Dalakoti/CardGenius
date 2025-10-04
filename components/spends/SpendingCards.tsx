"use client";

import React, { useState } from "react";
import Image from "next/image";

// Types
interface SpendingCategory {
  id: string;
  icon: string;
  name: string;
  currentAmount: number;
  maxAmount: number;
  currency?: string;
  quickIncrements: number[];
  savingsMessage?: {
    amount: number;
    increaseBy: number;
  };
}

interface SpendingCategoriesConfig {
  categories: SpendingCategory[];
}

// JSON Configuration
const spendingData: SpendingCategoriesConfig = {
  categories: [
    {
      id: "travel",
      icon: "travel",
      name: "Travel",
      currentAmount: 6000,
      maxAmount: 15000,
      currency: "₹",
      quickIncrements: [1000, 5000],
      savingsMessage: {
        amount: 5000,
        increaseBy: 1000,
      },
    },
    {
      id: "shopping",
      icon: "shopping",
      name: "Shopping",
      currentAmount: 8000,
      maxAmount: 20000,
      currency: "₹",
      quickIncrements: [1000, 5000],
      savingsMessage: {
        amount: 4500,
        increaseBy: 2000,
      },
    },
    {
      id: "fuel",
      icon: "fuel",
      name: "Fuel",
      currentAmount: 4000,
      maxAmount: 10000,
      currency: "₹",
      quickIncrements: [1000, 5000],
      savingsMessage: {
        amount: 3000,
        increaseBy: 1500,
      },
    },
  ],
};

// Icon path mapping
const iconMap = {
  travel: "/spends/airplane.svg",
  shopping: "/spends/bag.svg",
  fuel: "/spends/fuel.svg",
};

const ChevronDownIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      d="M12 3L14 10L21 12L14 14L12 21L10 14L3 12L10 10L12 3Z"
      fill="currentColor"
    />
  </svg>
);

// Spending Category Card Component
interface SpendingCategoryCardProps {
  category: SpendingCategory;
  onAmountChange?: (amount: number) => void;
}

const SpendingCategoryCard: React.FC<SpendingCategoryCardProps> = ({
  category,
  onAmountChange,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [amount, setAmount] = useState(category.currentAmount);

  const iconPath =
    iconMap[category.icon as keyof typeof iconMap] || iconMap.shopping;
  const percentage = (amount / category.maxAmount) * 100;

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = Number(e.target.value);
    setAmount(newAmount);
    onAmountChange?.(newAmount);
  };

  const handleQuickIncrement = (increment: number) => {
    const newAmount = Math.min(amount + increment, category.maxAmount);
    setAmount(newAmount);
    onAmountChange?.(newAmount);
  };

  return (
    <div
      className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 transition-all duration-300"
      style={{
        background: "linear-gradient(169.98deg, #353F54 27.98%, #222834 81.2%)",
        border: "0.5px solid",
        borderImageSource:
          "linear-gradient(135.66deg, rgba(255, 255, 255, 0.18) -23.01%, rgba(16, 26, 45, 0.6) 40.85%, rgba(255, 255, 255, 0.18) 104.72%)",
        borderImageSlice: 1,
        boxShadow: "1px 8px 10px 0px #0000001F",
      }}
    >
      {/* Gradient Border - using mask technique for better browser support */}
      <div
        className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
        style={{
          background:
            "linear-gradient(135.66deg, rgba(255, 255, 255, 0.18) -23.01%, rgba(16, 26, 45, 0.6) 40.85%, rgba(255, 255, 255, 0.18) 104.72%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "0.5px",
        }}
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255, 255, 255, 0.08)" }}
          >
            <Image
              src={iconPath}
              alt={category.name}
              width={28}
              height={28}
              className="w-6 h-6 sm:w-7 sm:h-7"
            />
          </div>
          <h3 className="text-white text-category-md">{category.name}</h3>
        </div>
        <div className="text-white text-amount-md min-w-[120px] text-right tabular-nums">
          {category.currency}
          {amount.toLocaleString("en-IN")}
        </div>
      </div>

      {/* Slider */}
      <div className="mb-6 sm:mb-8 px-1">
        <div
          className="relative h-2 rounded-full"
          style={{
            background: "#222835",
            border: "0.5px solid #1C202A",
            boxShadow:
              "0px 2px 4px 2px #0000003D inset, 0px 0.3px 0px 0px #FFFFFF3D",
          }}
        >
          <div
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${percentage}%`,
              background: "linear-gradient(90deg, #0165C6 0%, #0060B8 100%)",
              boxShadow:
                "0px 2px 2.5px 0px #0000003D inset, 0px 0.3px 0px 0px #FFFFFF99",
            }}
          />
          <input
            type="range"
            min="0"
            max={category.maxAmount}
            value={amount}
            onChange={handleSliderChange}
            className="absolute inset-0 w-full h-full appearance-none cursor-pointer bg-transparent"
          />
          <style>{`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: #222835;
              border: 0.5px solid;
              border-image-source: linear-gradient(314.13deg, rgba(54, 63, 84, 0.2) 12.86%, #788CBA 87.81%);
              cursor: pointer;
              box-shadow:
                0.25px 1px 4px 1px #00000026,
                0px 4px 4px 0px #00000040,
                -4px -2px 4px 0px #00000040 inset,
                2px 2px 1.9px 0px #71717140 inset;
            }
            input[type="range"]::-moz-range-thumb {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              background: #222835;
              border: 0.5px solid;
              border-image-source: linear-gradient(314.13deg, rgba(54, 63, 84, 0.2) 12.86%, #788CBA 87.81%);
              cursor: pointer;
              box-shadow:
                0.25px 1px 4px 1px #00000026,
                0px 4px 4px 0px #00000040,
                -4px -2px 4px 0px #00000040 inset,
                2px 2px 1.9px 0px #71717140 inset;
            }
          `}</style>
        </div>
      </div>

      {/* Quick Increment Buttons and Expand */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-2 sm:gap-3">
          {category.quickIncrements.map((increment) => (
            <button
              key={increment}
              onClick={() => handleQuickIncrement(increment)}
              className="rounded-lg text-white text-increment-btn transition-all hover:opacity-80"
              style={{
                background: "#DDDDDD1A",
                border: "0.5px solid",
                borderImageSource:
                  "linear-gradient(113.84deg, rgba(153, 153, 153, 0.1) -39.29%, #2F384A 65.56%, rgba(204, 204, 204, 0.3) 166%)",
                borderImageSlice: 1,
                padding: "6px 8px",
              }}
            >
              + {category.currency}
              {(increment / 1000).toFixed(0)}k
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 transition-colors px-3 sm:px-4 py-2"
          style={{ color: "#999999" }}
        >
          <span className="text-expand-sm">Expand</span>
          <ChevronDownIcon
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Expanded Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? "max-h-40 opacity-100 mt-6" : "max-h-0 opacity-0"
        }`}
      >
        {category.savingsMessage && (
          <div
            className="rounded-xl sm:rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4"
            style={{ background: "rgba(255, 255, 255, 0.05)" }}
          >
            <Image
              src="/spends/star.svg"
              alt="Star"
              width={24}
              height={24}
              className="flex-shrink-0 mt-1"
              style={{ width: '24px', height: '24px' }}
            />
            <p className="text-white text-body-sm">
              Save{" "}
              <span className="font-semibold">
                {category.currency}
                {category.savingsMessage.amount.toLocaleString("en-IN")}
              </span>{" "}
              more by increasing {category.name.toLowerCase()} spends by{" "}
              <span className="font-semibold">
                {category.currency}
                {category.savingsMessage.increaseBy.toLocaleString("en-IN")}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Component
interface SpendingCategoriesProps {
  data?: SpendingCategoriesConfig;
  onCategoryChange?: (categories: string[]) => void;
  onTotalChange?: (total: number) => void;
  onCategorySpendsChange?: (categorySpends: { [key: string]: number }) => void;
}

const SpendingCards: React.FC<SpendingCategoriesProps> = ({
  data = spendingData,
  onCategoryChange,
  onTotalChange,
  onCategorySpendsChange,
}) => {
  const [amounts, setAmounts] = React.useState<{ [key: string]: number }>(
    data.categories.reduce((acc, cat) => ({ ...acc, [cat.id]: cat.currentAmount }), {})
  );

  React.useEffect(() => {
    // Calculate total and notify parent
    const total = Object.values(amounts).reduce((sum, val) => sum + val, 0);
    onTotalChange?.(total);

    // Get categories with amounts > 0
    const activeCategories = Object.entries(amounts)
      .filter(([_, amount]) => amount > 0)
      .map(([id]) => id);
    onCategoryChange?.(activeCategories);

    // Pass the full category spends object
    onCategorySpendsChange?.(amounts);
  }, [amounts, onCategoryChange, onTotalChange, onCategorySpendsChange]);

  const handleAmountChange = (categoryId: string, newAmount: number) => {
    setAmounts(prev => ({ ...prev, [categoryId]: newAmount }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4 sm:space-y-6">
      {data.categories.map((category) => (
        <SpendingCategoryCard
          key={category.id}
          category={category}
          onAmountChange={(amount) => handleAmountChange(category.id, amount)}
        />
      ))}
    </div>
  );
};

export default SpendingCards;
