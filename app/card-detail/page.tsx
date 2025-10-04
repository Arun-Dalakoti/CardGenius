"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Head from "next/head";
import SavingsCard from "@/components/card-details/SavingsCard";
import KeyFeaturesCard from "@/components/card-details/KeyFeaturesCard";
import EligibilityCriteriaCard from "@/components/card-details/EligibilityCriteriaCard";
import Button from "@/components/ui/Button";

export default function CardDetailPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Card Details - BankKaro</title>
      </Head>
      <div className="min-h-screen">
        {/* Fixed Header */}
        <header
          className="fixed top-0 left-0 right-0 z-50 flex items-center"
          style={{
            background: "rgba(34, 40, 52, 1)",
            padding: "12px",
          }}
        >
          {/* Back Arrow */}
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

          {/* Title */}
          <h1
            className="flex-1 text-center text-white text-page-title"
            style={{
              marginRight: "24px", // Balance the back arrow width
            }}
          >
            Card Details
          </h1>
        </header>

        {/* Content (with padding to account for fixed header) */}
        <div
          className="min-h-screen px-4"
          style={{
            paddingTop: "calc(26px + 24px + 20px)",
            paddingBottom: "40px",
            background: "linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)",
          }}
        >
          {/* Desktop Layout: Two Column */}
          <div className="max-w-7xl mx-auto lg:flex lg:gap-8">
            {/* Left Column: Main Content (60%) */}
            <div className="lg:flex-1 lg:w-3/5">
              {/* Card Image */}
              <div className="mb-6">
                <div
                  className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-6 h-48 flex flex-col justify-between"
                  style={{ boxShadow: "-7px 4px 4px 0px #00000040" }}
                >
                  <div>
                    <p className="text-white/80 text-sm">HDFC Bank</p>
                    <h3 className="text-white text-xl font-semibold mt-1">
                      HDFC Regalia Gold Credit Card
                    </h3>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-white/80 text-xs">Cashback</p>
                      <p className="text-white text-2xl font-bold">4%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/80 text-xs">Joining Bonus</p>
                      <p className="text-white text-lg font-semibold">₹5,000</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Title and Rating */}
              <div className="mb-6 text-center">
                <h2 className="text-white mb-3 text-card-title">
                  HDFC Regalia Gold Credit Card
                </h2>
                <div className="flex items-center justify-center gap-1">
                  <span
                    className="text-caption-xs"
                    style={{ color: "rgba(255, 255, 255, 0.8)" }}
                  >
                    4.5
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => {
                      const rating = 4.5;
                      const isFilled = i < Math.floor(rating);
                      const isHalfFilled =
                        i === Math.floor(rating) && rating % 1 !== 0;

                      return (
                        <svg
                          key={i}
                          width="12"
                          height="12"
                          viewBox="0 0 20 20"
                          fill={isFilled || isHalfFilled ? "#FFB800" : "none"}
                          stroke={
                            !isFilled && !isHalfFilled ? "#FFFFFF" : "none"
                          }
                          strokeWidth={!isFilled && !isHalfFilled ? "1.5" : "0"}
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
                    (2,847 reviews)
                  </span>
                </div>
              </div>

              {/* Card Stats */}
              <div
                className="relative rounded-2xl mb-6"
                style={{ boxShadow: "1px 8px 10px 0px #0000001F" }}
              >
                {/* Gradient border layer */}
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

                {/* Content with background */}
                <div
                  className="relative rounded-2xl py-6"
                  style={{
                    background:
                      "linear-gradient(169.98deg, #353F54 27.98%, #222834 81.2%)",
                  }}
                >
                  <div className="grid grid-cols-3 text-center">
                    {/* Annual Fee */}
                    <div className="relative">
                      <p
                        className="text-card-stat-label mb-2"
                        style={{ color: "#FFFFFF99" }}
                      >
                        Annual fee
                      </p>
                      <p className="text-card-stat-value text-white">₹1,500</p>
                      {/* Divider */}
                      <div
                        className="absolute top-0 bottom-0 right-0 w-px"
                        style={{ background: "#FFFFFF1A" }}
                      />
                    </div>

                    {/* Joining Bonus */}
                    <div className="relative">
                      <p
                        className="text-card-stat-label mb-2"
                        style={{ color: "#FFFFFF99" }}
                      >
                        Joining bonus
                      </p>
                      <p className="text-card-stat-value text-white">₹2,500</p>
                      {/* Divider */}
                      <div
                        className="absolute top-0 bottom-0 right-0 w-px"
                        style={{ background: "#FFFFFF1A" }}
                      />
                    </div>

                    {/* Reward Points */}
                    <div>
                      <p
                        className="text-card-stat-label mb-2"
                        style={{ color: "#FFFFFF99" }}
                      >
                        Reward points
                      </p>
                      <p className="text-card-stat-value text-white">4X</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Savings Card - Mobile Only */}
              <div className="mb-6 lg:hidden">
                <SavingsCard />
              </div>

              {/* Key Features Card */}
              <div className="mb-6">
                <KeyFeaturesCard />
              </div>

              {/* Eligibility Criteria Card */}
              <div className="mb-6">
                <EligibilityCriteriaCard />
              </div>

              {/* Apply Now Button - Mobile Only (Fixed at bottom) */}
              <div
                className="fixed bottom-0 left-0 right-0 p-4 lg:hidden"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, #1F2630 40%)",
                }}
              >
                <Button fullWidth>Apply Now</Button>
              </div>

              {/* Spacer for fixed button on mobile */}
              <div className="h-20 lg:hidden" />
            </div>

            {/* Right Column: Sticky Sidebar (40%) - Desktop Only */}
            <div className="hidden lg:block lg:w-2/5">
              <div className="sticky top-24">
                {/* Savings Card */}
                <div className="mb-6">
                  <SavingsCard />
                </div>

                {/* Apply Now Button */}
                <Button fullWidth>Apply Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
