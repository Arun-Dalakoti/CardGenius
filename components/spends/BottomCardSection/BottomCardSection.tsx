"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SavingsBreakdownCard from "../SpendingBreakdown";
import Button from "@/components/ui/Button";
import type { BottomCardSectionProps } from "./BottomCardSection.types";
import { creditCards } from "./BottomCardSection.data";
import { useSpendingStore } from "@/store/spendingStore";

const BottomCardSection: React.FC<BottomCardSectionProps> = ({
  selectedCategories,
  totalSpends,
  categorySpends = {},
}) => {
  const router = useRouter();
  const [height, setHeight] = useState(195);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { setSelectedCard } = useSpendingStore();
  const lastSetCardIndexRef = useRef<number>(-1);

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

    // Snap to min or max - if swiped up, go to max
    if (height > minHeight + 50) {
      setHeight(maxHeight);
    } else {
      setHeight(minHeight);
    }
  };

  const handleClick = () => {
    if (height === minHeight) {
      setHeight(maxHeight);
    } else {
      setHeight(minHeight);
    }
  };

  // Update selected card whenever carousel index changes
  useEffect(() => {
    if (lastSetCardIndexRef.current !== currentCardIndex && recommendedCards.length > 0) {
      const currentCard = recommendedCards[currentCardIndex];
      if (currentCard) {
        setSelectedCard({
          name: currentCard.name,
          bank: currentCard.bank,
          cashback: currentCard.cashback,
          annualFee: currentCard.annualFee,
          joiningBonus: currentCard.joiningBonus,
          rating: currentCard.rating || 4.5,
          reviews: currentCard.reviews || 2847,
          rewardPoints: currentCard.rewardPoints || "4X",
        });
        lastSetCardIndexRef.current = currentCardIndex;
      }
    }
  }, [currentCardIndex]);

  const handleApplyCard = () => {
    router.push("/card-detail");
  };

  return (
    <div
      ref={containerRef}
      className="lg:static lg:h-auto lg:bg-transparent fixed bottom-0 left-0 right-0 z-40"
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
      {/* Total Spends Section */}
      <div
        className="lg:p-6 lg:rounded-2xl lg:mb-4"
        style={{
          background: "linear-gradient(180deg, #2A3441 0%, #1F2630 100%)",
        }}
      >
        <div
          className="flex flex-col py-3 cursor-pointer px-4 lg:cursor-default lg:p-0"
          onClick={handleClick}
        >
          <div className="flex justify-center mb-3 lg:hidden">
            <div
              className="w-12 h-1 rounded-full"
              style={{ background: "#FFFFFF40" }}
            />
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-white text-total-spends">Total spends</h3>
            <p className="text-white text-total-amount">
              ₹{totalSpends.toLocaleString("en-IN")}
            </p>
          </div>
        </div>
      </div>

      <div
        className="overflow-y-auto lg:overflow-y-visible lg:h-auto"
        style={{ height: "calc(100% - 160px)" }}
      >
        <div
          className="-mx-4 lg:mx-0 w-screen lg:w-auto pb-6 lg:pb-0 lg:rounded-2xl lg:p-4"
          style={{
            background: "rgba(62, 101, 132, 1)",
          }}
        >
          <div className="flex items-center justify-between px-4 lg:px-0 pt-2 lg:pt-0">
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
              className="lg:hidden transform rotate-90 cursor-pointer"
            />
          </div>
          <p className="text-white/60 px-4 lg:px-0 mb-3 text-body-sm">
            {recommendedCards.length} recommended cards
          </p>

          {recommendedCards.length > 0 && (
            <div className="hidden lg:block mb-4">
              <Button fullWidth onClick={handleApplyCard}>
                Apply for {recommendedCards[currentCardIndex]?.name || "Card"}
              </Button>
            </div>
          )}

          {recommendedCards.length > 0 ? (
            <div className="relative px-4 lg:px-0">
              <div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                onScroll={(e) => {
                  const scrollLeft = e.currentTarget.scrollLeft;
                  const cardWidth =
                    e.currentTarget.scrollWidth / recommendedCards.length;
                  const index = Math.round(scrollLeft / cardWidth);
                  setCurrentCardIndex(index);
                }}
              >
                {recommendedCards.map((card) => (
                  <div
                    key={card.id}
                    className="flex-shrink-0 snap-center"
                    style={{ width: "calc(100% - 32px)" }}
                  >
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

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-white mb-1 text-card-name">
                          {card.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <span className="text-white text-rating">{card.rating || 4.5}</span>
                          <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => {
                              const rating = card.rating || 4.5;
                              const isFilled = i < Math.floor(rating);
                              const isHalfFilled = i === Math.floor(rating) && rating % 1 !== 0;
                              const isEmpty = i >= Math.ceil(rating);

                              if (isHalfFilled) {
                                return (
                                  <svg
                                    key={i}
                                    width="16"
                                    height="16"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                  >
                                    <defs>
                                      <linearGradient id={`half-star-${i}`}>
                                        <stop offset="50%" stopColor="#FFB800" />
                                        <stop offset="50%" stopColor="transparent" />
                                      </linearGradient>
                                    </defs>
                                    <path
                                      d="M10 1.25L12.704 6.77L18.75 7.65L14.375 11.925L15.408 17.95L10 15.125L4.592 17.95L5.625 11.925L1.25 7.65L7.296 6.77L10 1.25Z"
                                      fill={`url(#half-star-${i})`}
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
                                  width="16"
                                  height="16"
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
                          <span
                            className="text-reviews"
                            style={{ color: "#999999" }}
                          >
                            ({(card.reviews || 2847).toLocaleString("en-IN")} reviews)
                          </span>
                        </div>
                      </div>
                      <div
                        className="text-link underline cursor-pointer"
                        style={{ color: "#4A90E2" }}
                      >
                        View Details
                      </div>
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

        {recommendedCards.length > 0 && (
          <div className="px-4 lg:px-0 lg:mt-4">
            <div
              className="lg:p-6 lg:rounded-2xl"
              style={{
                background: "linear-gradient(180deg, #2A3441 0%, #1F2630 100%)",
              }}
            >
              <SavingsBreakdownCard
                totalSpends={totalSpends}
                avgCashback={avgCashback}
                categorySpends={categorySpends}
              />
            </div>
          </div>
        )}
      </div>

      {recommendedCards.length > 0 && (
        <div
          className="absolute lg:hidden bottom-0 left-0 right-0 px-4 py-4"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #1F2630 40%)",
          }}
        >
          <Button fullWidth onClick={handleApplyCard}>
            Apply for {recommendedCards[currentCardIndex]?.name || "Card"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default BottomCardSection;
