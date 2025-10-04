"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SavingsBreakdownCard from "./SpendingBreakdown";
import Button from "@/components/ui/Button";

// Credit Card Interface
interface CreditCard {
  id: string;
  name: string;
  bank: string;
  image: string;
  categories: string[];
  cashback: number;
  annualFee: number;
  joiningBonus: number;
}

// Dummy Credit Card Data
const creditCards: CreditCard[] = [
  // HDFC Bank Cards
  {
    id: "hdfc1",
    name: "HDFC Regalia",
    bank: "HDFC Bank",
    image: "/cards/hdfc-regalia.png",
    categories: ["travel", "shopping"],
    cashback: 4,
    annualFee: 2500,
    joiningBonus: 5000,
  },
  {
    id: "hdfc2",
    name: "HDFC Millennia",
    bank: "HDFC Bank",
    image: "/cards/hdfc-millennia.png",
    categories: ["shopping", "food"],
    cashback: 5,
    annualFee: 1000,
    joiningBonus: 1000,
  },
  {
    id: "hdfc3",
    name: "HDFC Diners Club",
    bank: "HDFC Bank",
    image: "/cards/hdfc-diners.png",
    categories: ["travel", "fuel"],
    cashback: 3.3,
    annualFee: 10000,
    joiningBonus: 10000,
  },
  {
    id: "hdfc4",
    name: "HDFC MoneyBack",
    bank: "HDFC Bank",
    image: "/cards/hdfc-moneyback.png",
    categories: ["fuel", "shopping"],
    cashback: 2,
    annualFee: 500,
    joiningBonus: 500,
  },
  {
    id: "hdfc5",
    name: "HDFC Infinia",
    bank: "HDFC Bank",
    image: "/cards/hdfc-infinia.png",
    categories: ["travel", "shopping", "food"],
    cashback: 3.3,
    annualFee: 12500,
    joiningBonus: 12500,
  },

  // SBI Cards
  {
    id: "sbi1",
    name: "SBI Cashback",
    bank: "SBI Card",
    image: "/cards/sbi-cashback.png",
    categories: ["shopping", "fuel"],
    cashback: 5,
    annualFee: 999,
    joiningBonus: 2000,
  },
  {
    id: "sbi2",
    name: "SBI SimplyCLICK",
    bank: "SBI Card",
    image: "/cards/sbi-click.png",
    categories: ["shopping", "food"],
    cashback: 10,
    annualFee: 499,
    joiningBonus: 500,
  },
  {
    id: "sbi3",
    name: "SBI Vistara",
    bank: "SBI Card",
    image: "/cards/sbi-vistara.png",
    categories: ["travel"],
    cashback: 4,
    annualFee: 3000,
    joiningBonus: 3000,
  },
  {
    id: "sbi4",
    name: "SBI Elite",
    bank: "SBI Card",
    image: "/cards/sbi-elite.png",
    categories: ["travel", "shopping"],
    cashback: 3,
    annualFee: 4999,
    joiningBonus: 5000,
  },
  {
    id: "sbi5",
    name: "SBI BPCL",
    bank: "SBI Card",
    image: "/cards/sbi-bpcl.png",
    categories: ["fuel"],
    cashback: 7,
    annualFee: 0,
    joiningBonus: 0,
  },

  // ICICI Bank Cards
  {
    id: "icici1",
    name: "ICICI Amazon Pay",
    bank: "ICICI Bank",
    image: "/cards/icici-amazon.png",
    categories: ["shopping"],
    cashback: 5,
    annualFee: 500,
    joiningBonus: 1000,
  },
  {
    id: "icici2",
    name: "ICICI Sapphiro",
    bank: "ICICI Bank",
    image: "/cards/icici-sapphiro.png",
    categories: ["travel", "shopping", "food"],
    cashback: 3.3,
    annualFee: 3500,
    joiningBonus: 3500,
  },
  {
    id: "icici3",
    name: "ICICI HPCL",
    bank: "ICICI Bank",
    image: "/cards/icici-hpcl.png",
    categories: ["fuel"],
    cashback: 5,
    annualFee: 500,
    joiningBonus: 500,
  },
  {
    id: "icici4",
    name: "ICICI Coral",
    bank: "ICICI Bank",
    image: "/cards/icici-coral.png",
    categories: ["shopping", "food"],
    cashback: 2,
    annualFee: 500,
    joiningBonus: 2000,
  },
  {
    id: "icici5",
    name: "ICICI Emeralde",
    bank: "ICICI Bank",
    image: "/cards/icici-emeralde.png",
    categories: ["travel", "shopping"],
    cashback: 4,
    annualFee: 12000,
    joiningBonus: 12000,
  },

  // Axis Bank Cards
  {
    id: "axis1",
    name: "Axis Flipkart",
    bank: "Axis Bank",
    image: "/cards/axis-flipkart.png",
    categories: ["shopping"],
    cashback: 4,
    annualFee: 500,
    joiningBonus: 500,
  },
  {
    id: "axis2",
    name: "Axis Magnus",
    bank: "Axis Bank",
    image: "/cards/axis-magnus.png",
    categories: ["travel", "shopping", "food"],
    cashback: 4.8,
    annualFee: 12500,
    joiningBonus: 25000,
  },
  {
    id: "axis3",
    name: "Axis Vistara",
    bank: "Axis Bank",
    image: "/cards/axis-vistara.png",
    categories: ["travel"],
    cashback: 4,
    annualFee: 1500,
    joiningBonus: 1500,
  },
  {
    id: "axis4",
    name: "Axis ACE",
    bank: "Axis Bank",
    image: "/cards/axis-ace.png",
    categories: ["shopping", "food", "fuel"],
    cashback: 2,
    annualFee: 0,
    joiningBonus: 0,
  },
  {
    id: "axis5",
    name: "Axis Select",
    bank: "Axis Bank",
    image: "/cards/axis-select.png",
    categories: ["shopping", "travel"],
    cashback: 2,
    annualFee: 3000,
    joiningBonus: 3000,
  },
];

interface BottomCardSectionProps {
  selectedCategories: string[];
  totalSpends: number;
  categorySpends?: { [key: string]: number };
}

export default function BottomCardSection({
  selectedCategories,
  totalSpends,
  categorySpends = {},
}: BottomCardSectionProps) {
  const router = useRouter();
  const [height, setHeight] = useState(195);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const maxHeight = windowHeight * 0.95;
  const minHeight = 195;

  // Calculate recommended cards based on selected categories
  const recommendedCards = creditCards
    .filter((card) =>
      card.categories.some((category) => selectedCategories.includes(category))
    )
    .sort((a, b) => {
      const aMatches = a.categories.filter((cat) =>
        selectedCategories.includes(cat)
      ).length;
      const bMatches = b.categories.filter((cat) =>
        selectedCategories.includes(cat)
      ).length;
      return bMatches - aMatches || b.cashback - a.cashback;
    })
    .slice(0, Math.min(Math.max(Math.floor(totalSpends / 2000), 3), 20));

  // Calculate potential savings
  const avgCashback =
    recommendedCards.length > 0
      ? recommendedCards.reduce((sum, card) => sum + card.cashback, 0) /
        recommendedCards.length
      : 0;
  const monthlySavings = Math.round((totalSpends * avgCashback) / 100);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const deltaY = startY - e.touches[0].clientY;
    const newHeight = Math.min(Math.max(height + deltaY, minHeight), maxHeight);
    setHeight(newHeight);
    setStartY(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Snap to min or max based on position
    if (height < maxHeight * 0.3) {
      setHeight(minHeight);
    } else if (height > maxHeight * 0.7) {
      setHeight(maxHeight);
    }
  };

  const handleClick = () => {
    if (height === minHeight) {
      setHeight(maxHeight);
    } else {
      setHeight(minHeight);
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        height: `${height}px`,
        background: "linear-gradient(180deg, #2A3441 0%, #1F2630 100%)",
        borderTopLeftRadius: "20px",
        borderTopRightRadius: "20px",
        transition: isDragging ? "none" : "height 0.3s ease",
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Swipe Bar with Total Spends */}
      <div
        className="flex flex-col py-3 cursor-pointer px-4"
        onClick={handleClick}
      >
        <div className="flex justify-center mb-3">
          <div
            className="w-12 h-1 rounded-full"
            style={{ background: "#FFFFFF40" }}
          />
        </div>

        {/* Total Spends */}
        <div className="flex items-center justify-between">
          <h3 className="text-white text-total-spends">Total spends</h3>
          <p className="text-white text-total-amount">
            ₹{totalSpends.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="overflow-y-auto" style={{ height: "calc(100% - 160px)" }}>
        {/* Save Section with Card Carousel */}
        <div
          className="-mx-4 w-screen pb-6"
          style={{
            background: "rgba(62, 101, 132, 1)",
          }}
        >
          <div className="flex items-center justify-between px-4 pt-2">
            <p className="text-white text-save-monthly">
              Save monthly upto{" "}
              <span
                className="text-save-amount"
                style={{
                  color: "rgba(0, 255, 64, 1)",
                }}
              >
                ₹{monthlySavings.toLocaleString("en-IN")}
              </span>
            </p>
            <Image
              src="/arrow-left.svg"
              alt="Arrow"
              width={24}
              height={24}
              className="transform rotate-90"
            />
          </div>
          <p
            className="text-white/60 px-4 mb-3"
            style={{
              fontFamily:
                "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 400,
              fontSize: "13px",
              lineHeight: "18px",
              letterSpacing: "0.01em",
            }}
          >
            {recommendedCards.length} recommended cards
          </p>

          {/* Card Carousel */}
          {recommendedCards.length > 0 ? (
            <div className="relative px-4">
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  const cardWidth = e.currentTarget.scrollWidth / recommendedCards.length;
                  const index = Math.round(scrollLeft / cardWidth);
                  setCurrentCardIndex(index);
                }}
              >
                {recommendedCards.map((card, index) => (
                  <div
                    key={card.id}
                    className="flex-shrink-0 snap-center"
                    style={{ width: "calc(100% - 32px)" }}
                  >
                    {/* Card Image */}
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 h-48 flex flex-col justify-between mb-3">
                      <div>
                        <p className="text-white/80 text-sm">{card.bank}</p>
                        <h3 className="text-white text-xl font-semibold mt-1">
                          {card.name}
                        </h3>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-white/80 text-xs">Cashback</p>
                          <p className="text-white text-2xl font-bold">
                            {card.cashback}%
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white/80 text-xs">Joining Bonus</p>
                          <p className="text-white text-lg font-semibold">
                            ₹{card.joiningBonus.toLocaleString("en-IN")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4
                          className="text-white mb-1"
                          style={{
                            fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                            fontWeight: 400,
                            fontSize: "18px",
                            lineHeight: "22px",
                          }}
                        >
                          {card.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span
                            className="text-white"
                            style={{
                              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                              fontWeight: 600,
                              fontSize: "14px",
                              lineHeight: "18px",
                            }}
                          >
                            4.5
                          </span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="#FFB800"
                              >
                                <path d="M8 1L10.163 5.38L15 6.12L11.5 9.54L12.326 14.36L8 12.1L3.674 14.36L4.5 9.54L1 6.12L5.837 5.38L8 1Z" />
                              </svg>
                            ))}
                          </div>
                          <span
                            style={{
                              fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                              fontWeight: 400,
                              fontSize: "12px",
                              lineHeight: "16px",
                              color: "#999999",
                            }}
                          >
                            (2,847 reviews)
                          </span>
                        </div>
                      </div>
                      <button
                        style={{
                          fontFamily: "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
                          fontWeight: 400,
                          fontSize: "14px",
                          lineHeight: "18px",
                          color: "#4A90E2",
                          textDecoration: "underline",
                        }}
                      >
                        View Details
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="px-4">
              <div className="bg-white/10 rounded-2xl p-6 h-48 flex items-center justify-center">
                <p className="text-white/60 text-center">
                  Select categories to see recommended cards
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Savings Breakdown Card */}
        {recommendedCards.length > 0 && (
          <div className="px-4">
            <SavingsBreakdownCard
              totalSpends={totalSpends}
              avgCashback={avgCashback}
              categorySpends={categorySpends}
            />
          </div>
        )}
      </div>

      {/* Apply Button - Fixed at Bottom */}
      {recommendedCards.length > 0 && (
        <div
          className="absolute bottom-0 left-0 right-0 px-4 py-4"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #1F2630 40%)",
          }}
        >
          <Button fullWidth onClick={() => router.push("/card-detail")}>
            Apply for {recommendedCards[currentCardIndex]?.name || "Card"}
          </Button>
        </div>
      )}
    </div>
  );
}
