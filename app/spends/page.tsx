"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
import SpendingCards from "@/components/spends/SpendingCards";
import BottomCardSection from "@/components/spends/BottomCardSection";
import { useSpendingStore } from "@/store/spendingStore";

export default function SpendsPage() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [totalSpends, setTotalSpends] = useState(0);
  const [categorySpends, setCategorySpends] = useState<{
    [key: string]: number;
  }>({});

  const {
    selectedCategories: storeCategories,
    categorySpends: storeCategorySpends,
    setCategorySpends: setStoreCategorySpends,
    setTotalSpends: setStoreTotalSpends,
  } = useSpendingStore();

  // Initialize from store on mount
  useEffect(() => {
    if (storeCategorySpends && Object.keys(storeCategorySpends).length > 0) {
      setCategorySpends(storeCategorySpends);
      const total = Object.values(storeCategorySpends).reduce(
        (sum, val) => sum + val,
        0
      );
      setTotalSpends(total);
    }
  }, []);

  // Sync local state to store
  useEffect(() => {
    setStoreCategorySpends(categorySpends);
    setStoreTotalSpends(totalSpends);
  }, [
    categorySpends,
    totalSpends,
    setStoreCategorySpends,
    setStoreTotalSpends,
  ]);

  return (
    <>
      <Head>
        <title>Add Spends - BankKaro</title>
      </Head>
      <div>
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
            Add Spends
          </h1>
        </header>

        <div
          className="px-4 lg:px-8 pb-[250px] lg:pb-16 min-h-screen lg:min-h-[1300px]"
          style={{
            paddingTop: "calc(26px + 24px + 20px)",
            background: "linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto lg:flex lg:gap-8 lg:items-start">
            <div className="lg:w-1/2 lg:flex-shrink-0">
              <SpendingCards
                onCategoryChange={setSelectedCategories}
                onTotalChange={setTotalSpends}
                onCategorySpendsChange={setCategorySpends}
                filterCategories={storeCategories}
              />
            </div>

            <div className="hidden lg:block lg:w-1/2 lg:flex-shrink-0">
              <BottomCardSection
                selectedCategories={selectedCategories}
                totalSpends={totalSpends}
                categorySpends={categorySpends}
              />
            </div>
          </div>
        </div>

        <motion.div
          className="lg:hidden"
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
