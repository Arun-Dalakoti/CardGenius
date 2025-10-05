"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import SavingsBreakdownCard from "../SpendingBreakdown";
import Button from "@/components/ui/Button";
import type { BottomCardSectionProps } from "./BottomCardSection.types";
import { creditCards } from "./BottomCardSection.data";
import { useSpendingStore } from "@/store/spendingStore";
import BottomSheet from "./BottomSheet";
import MobileCardDetails from "./MobileCardDetails";

const BottomCardSection: React.FC<BottomCardSectionProps> = ({
  selectedCategories,
  totalSpends,
  categorySpends = {},
}) => {
  const router = useRouter();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const { setSelectedCard } = useSpendingStore();
  const lastSetCardIndexRef = useRef<number>(-1);

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

  // Prepare data for MobileCardDetails
  const currentCard = recommendedCards[currentCardIndex];
  const cardCashback = currentCard?.cashback || avgCashback;

  const mobileCardData = currentCard
    ? {
        name: currentCard.name,
        rating: currentCard.rating || 4.5,
        totalReviews: currentCard.reviews || 2847,
        bestFor: `Best for your ${selectedCategories.join(", ")} spends`,
        categories: Object.entries(categorySpends)
          .filter(([, amount]) => amount > 0)
          .map(([id, spent]) => ({
            id,
            icon: id,
            name: id.charAt(0).toUpperCase() + id.slice(1),
            spent,
            saved: Math.round((spent * cardCashback) / 100),
            percentage: Number(cardCashback.toFixed(2)),
          })),
        totalSpent: totalSpends,
        totalSavings: Math.round((totalSpends * cardCashback) / 100),
        averagePercentage: Number(cardCashback.toFixed(2)),
        currency: "₹",
      }
    : null;

  // Update selected card whenever carousel index changes
  useEffect(() => {
    if (
      lastSetCardIndexRef.current !== currentCardIndex &&
      recommendedCards.length > 0
    ) {
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

  const cardContent = (isExpanded = false) => (
    <div
      className="lg:mx-0 w-screen lg:w-auto pb-6 lg:pb-0 lg:rounded-2xl lg:p-4"
      style={{
        background: "rgba(62, 101, 132, 1)",
      }}
    >
      <>
        {!isExpanded && (
          <div className="flex items-center justify-between px-4 lg:px-0 pt-2 lg:pt-0">
            <Image
              src="/arrow-left.svg"
              alt="Arrow"
              width={24}
              height={24}
              className="lg:hidden transform rotate-90 cursor-pointer"
            />
          </div>
        )}

        <div className="flex items-center justify-between px-4 lg:px-0 mb-3">
          <p className="text-white/60 text-body-sm">
            {recommendedCards.length} recommended cards
          </p>
          <div className="flex items-center gap-1">
            {recommendedCards.map((_, index) => (
              <div
                key={index}
                className="w-1.5 h-1.5 rounded-full transition-all"
                style={{
                  background:
                    index === currentCardIndex ? "#FFFFFF" : "#FFFFFF40",
                }}
              />
            ))}
          </div>
        </div>
      </>

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
                style={{ width: "calc(100% - 80px)" }}
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
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-4 pb-5">
          <div className="bg-white/10 rounded-2xl p-6 h-48 flex items-center justify-center">
            <p className="text-white/60 text-center">
              Select categories to see recommended cards
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Bottom Sheet */}
      <div className="lg:hidden">
        <BottomSheet
          totalSpends={totalSpends}
          monthlySavings={monthlySavings}
          recommendedCardsCount={recommendedCards.length}
        >
          {(isExpanded) => (
            <>
              {cardContent(isExpanded)}

              {isExpanded && mobileCardData && (
                <div className="lg:hidden">
                  <MobileCardDetails
                    data={mobileCardData}
                    onViewDetails={handleApplyCard}
                  />
                </div>
              )}

              {recommendedCards.length > 0 && (
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-4"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 0%, #1F2630 40%)",
                  }}
                >
                  <Button fullWidth onClick={handleApplyCard}>
                    Apply for{" "}
                    {recommendedCards[currentCardIndex]?.name || "Card"}
                  </Button>
                </div>
              )}
            </>
          )}
        </BottomSheet>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block">
        <div
          className="p-6 rounded-2xl mb-4"
          style={{
            background: "linear-gradient(180deg, #2A3441 0%, #1F2630 100%)",
          }}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-white text-total-spends">Total spends</h3>
            <p className="text-white text-total-amount">
              ₹{totalSpends.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {cardContent(false)}

        {recommendedCards.length > 0 && (
          <div className="mt-4">
            <div
              className="p-6 rounded-2xl"
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
    </>
  );
};

export default BottomCardSection;
