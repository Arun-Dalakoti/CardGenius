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

interface CardDetails {
  name: string;
  rating: number;
  totalReviews: number;
  bestFor: string;
  categories: SavingsCategory[];
  totalSpent: number;
  totalSavings: number;
  averagePercentage: number;
  currency?: string;
}

// Icon path mapping (using actual SVG files from the project)
const iconMap = {
  travel: "/spends/airplane.svg",
  shopping: "/spends/bag.svg",
  food: "/fork.svg",
  fuel: "/spends/fuel.svg",
};

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      d="M10 2L11.5 8.5L18 10L11.5 11.5L10 18L8.5 11.5L2 10L8.5 8.5L10 2Z"
      fill="currentColor"
    />
  </svg>
);

// Star Rating Component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M10 2L12.245 7.905L18.5 8.745L14.25 12.855L15.245 19.09L10 16.105L4.755 19.09L5.75 12.855L1.5 8.745L7.755 7.905L10 2Z"
            fill={
              i < fullStars
                ? "#FCD34D"
                : i === fullStars && hasHalfStar
                ? "#FCD34D"
                : "#6B7280"
            }
            fillOpacity={
              i < fullStars ? 1 : i === fullStars && hasHalfStar ? 0.5 : 0.3
            }
          />
        </svg>
      ))}
    </div>
  );
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
      <div className="flex items-center gap-3 flex-1">
        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
          <Image src={iconPath} alt={category.name} width={20} height={20} />
        </div>
        <div className="flex-1">
          <h3 className="text-white text-base font-normal mb-1">
            {category.name}
          </h3>
          <p className="text-white/40 text-sm">
            {currency}
            {category.spent.toLocaleString("en-IN")} spent
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-white text-lg font-medium mb-1">
          + {currency}
          {category.saved.toLocaleString("en-IN")}
        </div>
        <div className="text-white/40 text-sm">{category.percentage}%</div>
      </div>
    </div>
  );
};

// Main Mobile Card Details Component
interface MobileCardDetailsProps {
  data: CardDetails;
  onViewDetails?: () => void;
}

const MobileCardDetails: React.FC<MobileCardDetailsProps> = ({
  data,
  onViewDetails,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const currency = data.currency || "₹";

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Gradient Header Background */}

      {/* Main Card Container */}
      <div
        className="relative -mt-12 rounded-3xl overflow-hidden"
        style={{
          background: "#1F2937",
          boxShadow: "0px -4px 2px 0px rgba(0, 0, 0, 0.16)",
        }}
      >
        {/* Card Header */}
        <div className="p-6 pb-4">
          <div className="flex items-start justify-between mb-3">
            <h1 className="text-white text-xl font-semibold leading-tight flex-1 pr-4">
              {data.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-white text-base font-medium">
              {data.rating}
            </span>
            <span className="text-white/60 text-sm">
              ({data.totalReviews.toLocaleString("en-IN")} reviews)
            </span>
            <StarRating rating={data.rating} />
            <button
              onClick={onViewDetails}
              className="ml-auto text-white/60 text-sm underline"
            >
              View Details
            </button>
          </div>

          {/* Best For Badge */}
          <div
            className="rounded-full px-4 py-3 flex items-center gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(234, 179, 8, 0.3)",
            }}
          >
            <SparkleIcon className="text-yellow-400 flex-shrink-0" />
            <span className="text-white text-sm">{data.bestFor}</span>
            <div className="ml-auto w-6 h-6 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Savings Breakdown */}
        <div
          className="mx-4 mb-4 rounded-2xl overflow-y-auto scrollbar-hide"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            maxHeight: "500px",
          }}
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-white text-lg font-medium">
                Savings breakdown
              </h2>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white/60 text-sm underline"
              >
                Expand
              </button>
            </div>

            {/* Divider */}
            <div
              className="w-full h-px mb-5"
              style={{ background: "#FFFFFF1A" }}
            />

            {/* Categories */}
            <div>
              {data.categories.map((category) => (
                <CategoryRow
                  key={category.id}
                  category={category}
                  currency={currency}
                />
              ))}
            </div>

            {/* Total Savings */}
            <div className="flex items-end justify-between mt-5 pt-5 border-t border-white/10">
              <div>
                <h3 className="text-white text-lg font-medium mb-1">
                  Total savings
                </h3>
                <p className="text-white/40 text-sm">
                  {currency}
                  {data.totalSpent.toLocaleString("en-IN")} spent
                </p>
              </div>
              <div className="text-right">
                <div className="text-[#10B981] text-2xl font-bold mb-1">
                  {currency}
                  {data.totalSavings.toLocaleString("en-IN")}
                </div>
                <div className="text-white/40 text-sm">
                  {data.averagePercentage}% avg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileCardDetails;
