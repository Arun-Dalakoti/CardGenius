"use client";

import React, { useState } from "react";
import Image from "next/image";

// Types
interface SavingsCategory {
  id: string;
  icon: string;
  name: string;
  spent: number;
  saved: number;
  percentage: number;
}

interface SavingsBreakdownConfig {
  heading: string;
  categories: SavingsCategory[];
  totalSpent: number;
  totalSavings: number;
  averagePercentage: number;
  currency?: string;
}

// Icon path mapping
const iconMap = {
  travel: "/spends/airplane.svg",
  shopping: "/spends/bag.svg",
  fuel: "/spends/fuel.svg",
};

// Category Row Component
interface CategoryRowProps {
  category: SavingsCategory;
  currency: string;
}

const CategoryRow: React.FC<CategoryRowProps> = ({ category, currency }) => {
  const iconPath =
    iconMap[category.icon as keyof typeof iconMap] || iconMap.shopping;

  return (
    <div className="flex items-center justify-between py-4 border-b border-white/10 last:border-b-0">
      {/* Left Side - Icon and Name */}
      <div className="flex items-center gap-3 flex-1">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255, 255, 255, 0.08)" }}
        >
          <Image
            src={iconPath}
            alt={category.name}
            width={28}
            height={28}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3
            className="text-white mb-1"
            style={{
              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              fontSize: "17px",
              lineHeight: "24px",
              letterSpacing: "0%",
            }}
          >
            {category.name}
          </h3>
          <p
            style={{
              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "18px",
              letterSpacing: "0.01em",
              color: "#999999",
            }}
          >
            {currency}
            {category.spent.toLocaleString("en-IN")} spent
          </p>
        </div>
      </div>

      {/* Right Side - Savings */}
      <div className="text-right ml-4">
        <div
          className="text-white mb-1"
          style={{
            fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            fontSize: "17px",
            lineHeight: "24px",
            letterSpacing: "0%",
          }}
        >
          + {currency}
          {category.saved.toLocaleString("en-IN")}
        </div>
        <div
          style={{
            fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            fontSize: "13px",
            lineHeight: "18px",
            letterSpacing: "0.01em",
            textAlign: "right",
            color: "#999999",
          }}
        >
          {category.percentage}%
        </div>
      </div>
    </div>
  );
};

// Main Savings Breakdown Card Component
interface SavingsBreakdownCardProps {
  totalSpends: number;
  avgCashback: number;
  categorySpends?: { [key: string]: number };
  onExpand?: () => void;
}

const SavingsBreakdownCard: React.FC<SavingsBreakdownCardProps> = ({
  totalSpends,
  avgCashback,
  categorySpends = {},
  onExpand,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currency = "₹";

  // Calculate dynamic savings breakdown
  const categories: SavingsCategory[] = Object.entries(categorySpends)
    .filter(([_, amount]) => amount > 0)
    .map(([id, spent]) => {
      const categoryName = id.charAt(0).toUpperCase() + id.slice(1);
      const saved = Math.round((spent * avgCashback) / 100);
      return {
        id,
        icon: id,
        name: categoryName,
        spent,
        saved,
        percentage: Number(avgCashback.toFixed(2)),
      };
    });

  const totalSavings = Math.round((totalSpends * avgCashback) / 100);

  const data: SavingsBreakdownConfig = {
    heading: "Savings breakdown",
    categories,
    totalSpent: totalSpends,
    totalSavings,
    averagePercentage: Number(avgCashback.toFixed(2)),
    currency,
  };

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
    if (onExpand) onExpand();
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div
        className="relative rounded-2xl p-6"
        style={{
          background: "linear-gradient(169.98deg, #353F54 27.98%, #222834 81.2%)",
          border: "0.5px solid",
          borderImageSource: "linear-gradient(135.66deg, rgba(255, 255, 255, 0.18) -23.01%, rgba(16, 26, 45, 0.6) 40.85%, rgba(255, 255, 255, 0.18) 104.72%)",
          borderImageSlice: 1,
          boxShadow: "1px 8px 10px 0px #0000001F",
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-white"
            style={{
              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
              fontSize: "15px",
              lineHeight: "20px",
              letterSpacing: "-0.002em",
            }}
          >
            {data.heading}
          </h2>
          <button
            onClick={handleExpand}
            className="transition-colors"
            style={{
              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              fontSize: "11px",
              lineHeight: "14px",
              letterSpacing: "0.02em",
              textDecoration: "underline",
              textDecorationStyle: "dotted",
              color: "#999999",
            }}
          >
            Expand
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          {data.categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              currency={currency}
            />
          ))}
        </div>

        {/* Total Savings */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex-1">
            <h3
              className="text-white mb-1"
              style={{
                fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400,
                fontSize: "17px",
                lineHeight: "24px",
                letterSpacing: "0%",
              }}
            >
              Total savings
            </h3>
            <p
              style={{
                fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "18px",
                letterSpacing: "0.01em",
                color: "#999999",
              }}
            >
              {currency}
              {data.totalSpent.toLocaleString("en-IN")} spent
            </p>
          </div>
          <div className="text-right ml-4">
            <div
              className="mb-1"
              style={{
                fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 600,
                fontSize: "20px",
                lineHeight: "26px",
                letterSpacing: "-0.004em",
                color: "#11FF00",
              }}
            >
              {currency}
              {data.totalSavings.toLocaleString("en-IN")}
            </div>
            <div
              style={{
                fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 400,
                fontSize: "13px",
                lineHeight: "18px",
                letterSpacing: "0.01em",
                textAlign: "right",
                color: "#999999",
              }}
            >
              {data.averagePercentage}% avg
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavingsBreakdownCard;
