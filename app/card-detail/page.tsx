"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Head from "next/head";
import SavingsCard from "@/components/card-details/SavingsCard";
import KeyFeaturesCard from "@/components/card-details/KeyFeaturesCard";
import EligibilityCriteriaCard from "@/components/card-details/EligibilityCriteriaCard";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import { useSpendingStore } from "@/store/spendingStore";

export default function CardDetailPage() {
  const router = useRouter();
  const { selectedCard } = useSpendingStore();
  const [showToast, setShowToast] = useState(false);

  // Default card data if no card is selected
  const cardData = {
    bank: selectedCard?.bank || "HDFC Bank",
    name: selectedCard?.name || "HDFC Regalia Gold Credit Card",
    cashback: selectedCard?.cashback || 4,
    joiningBonus: selectedCard?.joiningBonus || 5000,
    annualFee: selectedCard?.annualFee || 1500,
    rating: selectedCard?.rating || 4.5,
    reviews: selectedCard?.reviews || 2847,
    rewardPoints: selectedCard?.rewardPoints || "4X",
  };

  const handleApplyNow = () => {
    setShowToast(true);
  };

  return (
    <>
      <Head>
        <title>{cardData.name} - BankKaro</title>
      </Head>
      <div className="min-h-screen">
        <header
          className="fixed top-0 left-0 right-0 z-50 flex items-center"
          style={{
            background: "rgba(34, 40, 52, 1)",
            padding: "12px",
          }}
        >
          <div
            onClick={() => router.back()}
            className="flex items-center justify-center cursor-pointer"
            style={{
              width: "24px",
              height: "24px",
            }}
          >
            <Image src="/arrow-left.svg" alt="Back" width={24} height={24} />
          </div>

          <h1
            className="flex-1 text-center text-white text-page-title"
            style={{
              marginRight: "24px", // Balance the back arrow width
            }}
          >
            Card Details
          </h1>
        </header>

        <div
          className="min-h-screen px-4"
          style={{
            paddingTop: "calc(26px + 24px + 20px)",
            paddingBottom: "40px",
            background: "linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto lg:flex lg:gap-8">
            <div className="lg:flex-1 lg:w-3/5">
              <div className="mb-6">
                <div
                  className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 h-48 flex flex-col justify-between"
                  style={{ boxShadow: "-7px 4px 4px 0px #00000040" }}
                >
                  <div>
                    <p className="text-white/80 text-sm">{cardData.bank}</p>
                    <h3 className="text-white text-xl font-semibold mt-1">
                      {cardData.name}
                    </h3>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-xs">Cashback</p>
                      <p className="text-white text-2xl font-bold">
                        {cardData.cashback}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-xs">Joining Bonus</p>
                      <p className="text-white text-lg font-semibold">
                        ₹{cardData.joiningBonus.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 text-center">
                <h2 className="text-white mb-3 text-card-title">
                  {cardData.name}
                </h2>
                <div className="flex items-center justify-center gap-1">
                  <span
                    className="text-caption-xs"
                    style={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    {cardData.rating}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => {
                      const rating = cardData.rating;
                      const isFilled = i < Math.floor(rating);
                      const isHalfFilled =
                        i === Math.floor(rating) && rating % 1 !== 0;
                      const isEmpty = i >= Math.ceil(rating);

                      if (isHalfFilled) {
                        return (
                          <svg
                            key={i}
                            width="12"
                            height="12"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
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
                  <span
                    className="text-caption-xs"
                    style={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    ({cardData.reviews.toLocaleString("en-IN")} reviews)
                  </span>
                </div>
              </div>

              <div
                className="relative rounded-2xl mb-6"
                style={{ boxShadow: "1px 8px 10px 0px #0000001F" }}
              >
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
                  className="relative rounded-2xl py-6"
                  style={{
                    background:
                      "linear-gradient(169.98deg, #353F54 27.98%, #222834 81.2%)",
                  }}
                >
                  <div className="grid grid-cols-3 text-center">
                    <div className="relative">
                      <p
                        className="text-card-stat-label mb-2"
                        style={{ color: "#FFFFFF99" }}
                      >
                        Annual fee
                      </p>
                      <p className="text-card-stat-value text-white">
                        ₹{cardData.annualFee.toLocaleString("en-IN")}
                      </p>
                      <div
                        className="absolute top-0 bottom-0 right-0 w-px"
                        style={{ background: "#FFFFFF1A" }}
                      />
                    </div>

                    <div className="relative">
                      <p
                        className="text-card-stat-label mb-2"
                        style={{ color: "#FFFFFF99" }}
                      >
                        Joining bonus
                      </p>
                      <p className="text-card-stat-value text-white">
                        ₹{cardData.joiningBonus.toLocaleString("en-IN")}
                      </p>
                      <div
                        className="absolute top-0 bottom-0 right-0 w-px"
                        style={{ background: "#FFFFFF1A" }}
                      />
                    </div>

                    <div>
                      <p
                        className="text-card-stat-label mb-2"
                        style={{ color: "#FFFFFF99" }}
                      >
                        Reward points
                      </p>
                      <p className="text-card-stat-value text-white">
                        {cardData.rewardPoints}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 lg:hidden">
                <SavingsCard />
              </div>

              <div className="mb-6">
                <KeyFeaturesCard />
              </div>

              <div className="mb-6">
                <EligibilityCriteriaCard />
              </div>

              <div
                className="fixed bottom-0 left-0 right-0 p-4 lg:hidden"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, #1F2630 40%)",
                }}
              >
                <Button fullWidth onClick={handleApplyNow}>
                  Apply Now
                </Button>
              </div>

              <div className="h-20 lg:hidden" />
            </div>

            <div className="hidden lg:block lg:w-2/5">
              <div className="sticky top-24">
                <div className="mb-6">
                  <SavingsCard />
                </div>

                <Button fullWidth onClick={handleApplyNow}>
                  Apply Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Toast
          message="Application submitted! We'll contact you soon."
          isVisible={showToast}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      </div>
    </>
  );
}
