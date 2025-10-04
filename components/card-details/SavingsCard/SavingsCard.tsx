"use client";

import React from "react";
import type {
  CategoryRowProps,
  SummaryRowProps,
  SavingsCardProps,
} from "./SavingsCard.types";
import { savingsConfig } from "./SavingsCard.data";

// Edit Icon Component
const EditIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M14.166 2.5009C14.3849 2.28203 14.6447 2.10842 14.9307 1.98996C15.2167 1.87151 15.5232 1.81055 15.8327 1.81055C16.1422 1.81055 16.4487 1.87151 16.7347 1.98996C17.0206 2.10842 17.2805 2.28203 17.4993 2.5009C17.7182 2.71977 17.8918 2.97961 18.0103 3.26558C18.1287 3.55154 18.1897 3.85804 18.1897 4.16757C18.1897 4.4771 18.1287 4.7836 18.0103 5.06956C17.8918 5.35553 17.7182 5.61537 17.4993 5.83424L6.24935 17.0842L1.66602 18.3342L2.91602 13.7509L14.166 2.5009Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Category Row Component
const CategoryRow: React.FC<CategoryRowProps> = ({
  category,
  currency = "₹",
}) => {
  return (
    <div className="py-4 border-b border-white/10 last:border-b-0">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-white text-lg sm:text-xl font-normal">
          {category.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-white/70 text-base sm:text-lg">+</span>
          <span className="text-white text-lg sm:text-xl font-medium">
            {currency}
            {category.saved.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-white/50 text-sm sm:text-base">
          {currency}
          {category.spent.toLocaleString("en-IN")} spent
        </span>
        <span className="text-white/50 text-sm sm:text-base">
          {category.percentage}%
        </span>
      </div>
    </div>
  );
};

// Summary Row Component
const SummaryRow: React.FC<SummaryRowProps> = ({
  label,
  amount,
  currency = "₹",
  isNegative = false,
  highlight = false,
}) => {
  return (
    <div className="flex items-center justify-between py-3">
      <span
        className={`text-base sm:text-lg ${
          highlight ? "text-white font-semibold" : "text-white/70"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-lg sm:text-xl ${
          highlight ? "text-[#4ADE80] font-bold" : "text-white font-medium"
        }`}
      >
        {isNegative ? "−" : ""} {currency}
        {amount.toLocaleString("en-IN")}
      </span>
    </div>
  );
};

// Main Savings Card Component
const SavingsCard: React.FC<SavingsCardProps> = ({
  data = savingsConfig,
  currency = "₹",
  onEditSpending,
}) => {
  const monthlySavings = data.categories.reduce(
    (sum, cat) => sum + cat.saved,
    0
  );
  const netSavings = monthlySavings - data.annualFee;

  return (
    <div
      className="w-full rounded-2xl p-6"
      style={{
        background:
          "linear-gradient(180deg, #3E6584 -0.08%, #2C5364 40.41%, #0F2027 80.9%)",
        border: "0.5px solid",
        borderImageSource:
          "linear-gradient(135.66deg, rgba(255, 255, 255, 0.18) -23.01%, rgba(16, 26, 45, 0.6) 40.85%, rgba(255, 255, 255, 0.18) 104.72%)",
        borderImageSlice: 1,
        fontFamily:
          "'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-8 sm:mb-10">
        <h2 className="text-white text-xl sm:text-2xl font-normal">
          Your monthly savings
        </h2>
        <button
          onClick={onEditSpending}
          className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group"
        >
          <EditIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="text-sm sm:text-base underline decoration-1 underline-offset-2">
            Edit spending
          </span>
        </button>
      </div>

      {/* Total Savings Display */}
      <div className="text-center mb-3 sm:mb-4">
        <div className="text-white text-5xl sm:text-6xl md:text-7xl font-light tracking-tight mb-2">
          {currency}
          {data.totalSavings.toLocaleString("en-IN")}
        </div>
        <div className="text-white/60 text-base sm:text-lg">
          Your monthly savings
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/20 my-6 sm:my-8" />

      {/* Categories */}
      <div className="mb-6 sm:mb-8">
        {data.categories.map((category) => (
          <CategoryRow
            key={category.id}
            category={category}
            currency={currency}
          />
        ))}
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-white/20 my-6 sm:my-8" />

      {/* Summary Section */}
      <div className="space-y-1">
        <SummaryRow
          label="Monthly savings"
          amount={monthlySavings}
          currency={currency}
        />
        <SummaryRow
          label="Annual fee"
          amount={data.annualFee}
          currency={currency}
          isNegative
        />

        {/* Divider */}
        <div className="w-full h-px bg-white/20 my-4" />

        <SummaryRow
          label="Net savings"
          amount={netSavings}
          currency={currency}
          highlight
        />
      </div>
    </div>
  );
};

export default SavingsCard;
