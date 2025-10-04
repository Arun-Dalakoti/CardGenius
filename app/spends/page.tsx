"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import SpendingCards from "@/components/spends/SpendingCards";
import BottomCardSection from "@/components/spends/BottomCardSection";

export default function SpendsPage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [totalSpends, setTotalSpends] = useState(18000); // Default total from spending cards
  const [categorySpends, setCategorySpends] = useState<{
    [key: string]: number;
  }>({});

  return (
    <>
      <Head>
        <title>Add Spends - BankKaro</title>
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
            Add Spends
          </h1>
        </header>

        {/* Content (with padding to account for fixed header) */}
        <div
          className="min-h-screen px-4"
          style={{
            paddingTop: "calc(26px + 24px + 20px)",
            paddingBottom: "220px",
            background: "linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)",
          }}
        >
          <SpendingCards
            onCategoryChange={setSelectedCategories}
            onTotalChange={setTotalSpends}
            onCategorySpendsChange={setCategorySpends}
          />
        </div>

        {/* Bottom Card Section with Animation */}
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          <BottomCardSection
            selectedCategories={selectedCategories}
            totalSpends={totalSpends}
            categorySpends={categorySpends}
          />
        </motion.div>
      </div>
    </>
  );
}
