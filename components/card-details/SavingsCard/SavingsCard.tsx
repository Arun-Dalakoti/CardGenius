"use client";

import React from "react";
import { useRouter } from "next/navigation";
import type {
  CategoryRowProps,
  SummaryRowProps,
  SavingsCardProps,
} from "./SavingsCard.types";
import { savingsConfig } from "./SavingsCard.data";
import { useSpendingStore } from "@/store/spendingStore";

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
    <div className="py-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-white text-savings-category">{category.name}</h3>
        <div className="flex items-center gap-2">
          <span className="text-white text-savings-saved">+</span>
          <span className="text-white text-savings-saved">
            {currency}
            {category.saved.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-savings-spent" style={{ color: "#999999" }}>
          {currency}
          {category.spent.toLocaleString("en-IN")} spent
        </span>
        <span className="text-savings-percentage" style={{ color: "#999999" }}>
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
  showDivider = false,
}) => {
  return (
    <div className="flex items-center justify-between pt-3 mb-2">
      <span
        className={
          highlight ? "text-white text-savings-net-label" : "text-savings-label"
        }
        style={!highlight ? { color: "#BBBBBB" } : undefined}
      >
        {label}
      </span>
      <div className="flex flex-col items-end">
        <span
          className={
            highlight
              ? "text-savings-net-value"
              : "text-white text-savings-value"
          }
          style={highlight ? { color: "#11FF00" } : undefined}
        >
          {isNegative ? "−" : ""} {currency}
          {amount.toLocaleString("en-IN")}
        </span>
        {showDivider && (
          <div
            className="h-px mt-2"
            style={{
              width: "120%",
              borderBottom: "1px dotted #FFFFFF1A",
            }}
          />
        )}
      </div>
    </div>
  );
};

// Main Savings Card Component
const SavingsCard: React.FC<SavingsCardProps> = ({
  data = savingsConfig,
  currency = "₹",
  onEditSpending,
}) => {
  const router = useRouter();
  const { categorySavings, totalSavings, selectedCard } = useSpendingStore();

  // Use the stored savings data from the spends page
  const displayCategories = categorySavings.length > 0 ? categorySavings : data.categories;
  const monthlySavings = totalSavings > 0 ? totalSavings : data.categories.reduce(
    (sum, cat) => sum + cat.saved,
    0
  );

  const annualFee = selectedCard?.annualFee || data.annualFee;
  const annualSavings = monthlySavings * 12;
  const netSavings = annualSavings - annualFee;

  const handleEditSpending = () => {
    if (onEditSpending) {
      onEditSpending();
    } else {
      router.push("/spends");
    }
  };

  return (
    <div className="w-full relative rounded-2xl">
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
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

      <div
        className="relative rounded-2xl"
        style={{
          background:
            "linear-gradient(180deg, #3E6584 -0.08%, #2C5364 40.41%, #0F2027 80.9%)",
        }}
      >
        <div className="flex items-start justify-between mb-4 sm:mb-6 px-6 pt-6">
          <h2 className="text-white text-savings-heading">
            Your monthly savings
          </h2>
          <div
            onClick={handleEditSpending}
            className="flex items-center gap-2 text-white hover:text-white/80 transition-colors group cursor-pointer"
          >
            <EditIcon className="w-3 h-3" />
            <span className="text-savings-edit">Edit spending</span>
          </div>
        </div>

        <div className="text-center mb-3 sm:mb-4 px-6">
          <div className="text-white text-savings-amount-large mb-2">
            {currency}
            {monthlySavings.toLocaleString("en-IN")}
          </div>
          <div className="text-savings-subtitle" style={{ color: "#BBBBBB" }}>
            Your monthly savings
          </div>
        </div>

        <div className="w-full h-px bg-white/20" />

        <div className="px-6">
          {displayCategories.map((category, index) => (
            <React.Fragment key={category.id}>
              <CategoryRow category={category} currency={currency} />

              {index === displayCategories.length - 1 && (
                <div
                  className="-mx-6 h-px"
                  style={{ borderBottom: "1px dotted #FFFFFF1A" }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="w-full h-px bg-white/20" />

        <div className="space-y-1 px-6 pb-2">
          <SummaryRow
            label="Monthly savings"
            amount={monthlySavings}
            currency={currency}
          />
          <SummaryRow
            label="Annual savings"
            amount={annualSavings}
            currency={currency}
          />
          <SummaryRow
            label="Annual fee"
            amount={annualFee}
            currency={currency}
            isNegative
            showDivider
          />

          <SummaryRow
            label="Net savings"
            amount={netSavings}
            currency={currency}
            highlight
          />
        </div>
      </div>
    </div>
  );
};

export default SavingsCard;
