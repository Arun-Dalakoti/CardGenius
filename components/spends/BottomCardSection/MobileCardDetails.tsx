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
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => {
        const isFilled = i < Math.floor(rating);
        const isHalfFilled = i === Math.floor(rating) && rating % 1 !== 0;
        const isEmpty = i >= Math.ceil(rating);

        if (isHalfFilled) {
          return (
            <svg key={i} width="12" height="12" viewBox="0 0 20 20" fill="none">
              <defs>
                <linearGradient id={`half-${i}`}>
                  <stop offset="50%" stopColor="#FFB800" />
                  <stop offset="50%" stopColor="transparent" />
                </linearGradient>
              </defs>
              <path
                d="M10 1.25L12.704 6.77L18.75 7.65L14.375 11.925L15.408 17.95L10 15.125L4.592 17.95L5.625 11.925L1.25 7.65L7.296 6.77L10 1.25Z"
                fill={`url(#half-${i})`}
              />
              <path
                d="M10 1.25L12.704 6.77L18.75 7.65L14.375 11.925L15.408 17.95L10 15.125L4.592 17.95L5.625 11.925L1.25 7.65L7.296 6.77L10 1.25Z"
                stroke="#FFB800"
                strokeWidth="1.5"
                fill="none"
              />
            </svg>
          );
        }

        return (
          <svg
            key={i}
            width="12"
            height="12"
            viewBox="0 0 20 20"
            fill={isFilled ? "#FFB800" : "none"}
            stroke={isEmpty ? "#FFFFFF" : "#FFB800"}
            strokeWidth="1.5"
          >
            <path d="M10 1.25L12.704 6.77L18.75 7.65L14.375 11.925L15.408 17.95L10 15.125L4.592 17.95L5.625 11.925L1.25 7.65L7.296 6.77L10 1.25Z" />
          </svg>
        );
      })}
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
    <div className="flex items-center justify-between py-4">
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
    <div className="w-full max-w-md mx-auto pb-20">
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
            <div className="flex items-center gap-1">
              <span className="text-white/80 text-sm">{data.rating}</span>
              <div className="flex items-center gap-0.5">
                <StarRating rating={data.rating} />
              </div>
              <span className="text-white/80 text-sm">
                ({data.totalReviews.toLocaleString("en-IN")} reviews)
              </span>
            </div>
            <button
              onClick={onViewDetails}
              className="ml-auto text-white/60 text-sm underline"
            >
              View Details
            </button>
          </div>

          {/* Best For Badge */}
          <div className="relative overflow-hidden">
            <div
              className="absolute inset-0 rounded-full pointer-events-none animate-border-slide"
              style={{
                background:
                  "linear-gradient(90deg, #39B6D8 0%, #F7D344 50%, #E38330 100%)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "2px",
                backgroundSize: "200% 100%",
                animation: "border-slide 3s linear infinite",
              }}
            />
            <div
              className="relative rounded-full px-2 py-3 flex items-center gap-2"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
              }}
            >
              <SparkleIcon className="text-yellow-400 flex-shrink-0" />
              <span className="text-white text-sm">{data.bestFor}</span>
            </div>
          </div>
          <style jsx>{`
            @keyframes border-slide {
              0% {
                background-position: 0% 0%;
              }
              100% {
                background-position: 200% 0%;
              }
            }
          `}</style>
        </div>

        {/* Savings Breakdown */}
        <div
          className="mx-4 mb-4 rounded-2xl overflow-y-auto scrollbar-hide"
          style={{
            background: "rgba(255, 255, 255, 0.05)",
            maxHeight: "500px",
          }}
        >
          <div className="p-4 pb-0">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white text-lg font-medium">
                Savings breakdown
              </h2>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white/60 text-sm underline"
              >
                {isExpanded ? "Collapse" : "Expand"}
              </button>
            </div>
          </div>

          {/* Divider - full width over padding */}
          <div className="w-full h-px" style={{ background: "#FFFFFF1A" }} />

          <div className="px-5">
            {/* Categories - Only shown when expanded */}
            {isExpanded && (
              <>
                <div>
                  {data.categories.map((category) => (
                    <CategoryRow
                      key={category.id}
                      category={category}
                      currency={currency}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Divider before total savings when expanded */}
          {isExpanded && (
            <div className="w-full h-px" style={{ background: "#FFFFFF1A" }} />
          )}

          {/* Total Savings - Always visible */}
          <div className={`px-6 ${isExpanded ? "pb-40" : "pb-4"}`}>
            <div className="flex items-end justify-between pt-4">
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
                <div
                  className="text-breakdown-total-savings mb-1"
                  style={{ color: "#11FF00" }}
                >
                  {currency}
                  {data.totalSavings.toLocaleString("en-IN")}
                </div>
                <div
                  className="text-breakdown-spent"
                  style={{ color: "#999999" }}
                >
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
