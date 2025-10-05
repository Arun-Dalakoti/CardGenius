"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSpendingStore } from "@/store/spendingStore";
import type {
  SavingsCategory,
  SavingsBreakdownConfig,
  CategoryRowProps,
  SavingsBreakdownCardProps,
} from "./SpendingBreakdown.types";

// Icon path mapping
const iconMap = {
  travel: "/spends/airplane.svg",
  shopping: "/spends/bag.svg",
  food: "/fork.svg",
  fuel: "/spends/fuel.svg",
};

// Category Row Component
const CategoryRow: React.FC<CategoryRowProps> = ({ category, currency }) => {
  const iconPath =
    iconMap[category.icon as keyof typeof iconMap] || iconMap.shopping;

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center gap-3 flex-1">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(255, 255, 255, 0.08)" }}
        >
          <Image src={iconPath} alt={category.name} width={28} height={28} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white mb-1 text-breakdown-category">
            {category.name}
          </h3>
          <p className="text-breakdown-spent" style={{ color: "#999999" }}>
            {currency}
            {category.spent.toLocaleString("en-IN")} spent
          </p>
        </div>
      </div>

      <div className="text-right ml-4">
        <div className="text-white mb-1 text-breakdown-saved">
          + {currency}
          {category.saved.toLocaleString("en-IN")}
        </div>
        <div className="text-breakdown-percentage" style={{ color: "#999999" }}>
          {category.percentage}%
        </div>
      </div>
    </div>
  );
};

// Main Savings Breakdown Card Component
const SavingsBreakdownCard: React.FC<SavingsBreakdownCardProps> = ({
  totalSpends,
  avgCashback,
  categorySpends = {},
  onExpand,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currency = "₹";
  const { selectedCard, setCategorySavings, setTotalSavings } =
    useSpendingStore();

  // Use selected card's cashback rate, fallback to avgCashback
  const cashbackRate = selectedCard?.cashback || avgCashback;

  // Calculate dynamic savings breakdown
  const categories: SavingsCategory[] = React.useMemo(
    () =>
      Object.entries(categorySpends)
        .filter(([, amount]) => amount > 0)
        .map(([id, spent]) => {
          const categoryName = id.charAt(0).toUpperCase() + id.slice(1);
          const saved = Math.round((spent * cashbackRate) / 100);
          return {
            id,
            icon: id,
            name: categoryName,
            spent,
            saved,
            percentage: Number(cashbackRate.toFixed(2)),
          };
        }),
    [categorySpends, cashbackRate]
  );

  const totalSavings = React.useMemo(
    () => Math.round((totalSpends * cashbackRate) / 100),
    [totalSpends, cashbackRate]
  );

  // Store the calculated savings in the store
  React.useEffect(() => {
    setCategorySavings(categories);
    setTotalSavings(totalSavings);
  }, [categories, totalSavings]);

  const data: SavingsBreakdownConfig = {
    heading: "Savings breakdown",
    categories,
    totalSpent: totalSpends,
    totalSavings,
    averagePercentage: Number(cashbackRate.toFixed(2)),
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
          background:
            "linear-gradient(169.98deg, #353F54 27.98%, #222834 81.2%)",
          borderImageSource:
            "linear-gradient(135.66deg, rgba(255, 255, 255, 0.18) -23.01%, rgba(16, 26, 45, 0.6) 40.85%, rgba(255, 255, 255, 0.18) 104.72%)",
          borderImageSlice: 1,
          boxShadow: "1px 8px 10px 0px #0000001F",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white text-breakdown-heading">{data.heading}</h2>
          <div
            onClick={handleExpand}
            className="transition-colors text-expand-link underline cursor-pointer"
            style={{
              textDecorationStyle: "dotted",
              color: "#999999",
            }}
          >
            Expand
          </div>
        </div>

        <div className="space-y-2">
          {data.categories.map((category, index) => (
            <React.Fragment key={category.id}>
              <CategoryRow category={category} currency={currency} />
              {index < data.categories.length - 1 && (
                <div className="h-px bg-white/10" />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/10">
          <div className="flex-1">
            <h3 className="text-white mb-1 text-breakdown-category">
              Total savings
            </h3>
            <p className="text-breakdown-spent" style={{ color: "#999999" }}>
              {currency}
              {data.totalSpent.toLocaleString("en-IN")} spent
            </p>
          </div>
          <div className="text-right ml-4">
            <div
              className="mb-1 text-breakdown-total-savings"
              style={{ color: "#11FF00" }}
            >
              {currency}
              {data.totalSavings.toLocaleString("en-IN")}
            </div>
            <div
              className="text-breakdown-percentage"
              style={{ color: "#999999" }}
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
