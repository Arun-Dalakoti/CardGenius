"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import Button from "@/components/ui/Button";
import Toast from "@/components/ui/Toast";
import { useSpendingStore } from "@/store/spendingStore";

interface Category {
  id: string;
  name: string;
  icon: string;
}

const categories: Category[] = [
  { id: "travel", name: "Travel", icon: "/airplane.png" },
  { id: "shopping", name: "Shopping", icon: "/bag.png" },
  { id: "food", name: "Food", icon: "/food.png" },
  { id: "fuel", name: "Fuel", icon: "/fuel.png" },
];

function CategoryCard({
  category,
  isSelected,
  onToggle,
}: {
  category: Category;
  isSelected: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className="relative cursor-pointer p-2 lg:p-4"
      style={{
        backgroundImage: isSelected
          ? "none"
          : "linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)",
        backgroundColor: isSelected ? "#0263BE33" : "transparent",
        backgroundClip: "padding-box",
        border: "2px solid transparent",
        position: "relative",
        borderRadius: "20px",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          padding: "2px",
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(0, 0, 0, 0) 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: -1,
          borderRadius: "20px",
        }}
      />
      <div className="absolute -top-3 -right-3 z-10">
        <Image
          src="/checkbox.svg"
          alt="Checkbox"
          width={24}
          height={24}
          className="lg:w-8 lg:h-8"
          style={{
            opacity: isSelected ? 1 : 0.3,
          }}
        />
      </div>

      <div
        className="flex justify-center transition-transform duration-300 mb-1"
        style={{
          position: "relative",
          top: "-24.64px",
          left: "7.51px",
          transform: isSelected ? "scale(1.15) rotate(10deg)" : "scale(1)",
        }}
      >
        <Image
          src={category.icon}
          alt={category.name}
          width={105.98}
          height={105.98}
          className="lg:w-[140px] lg:h-[140px]"
        />
      </div>

      <p
        className="text-white text-center text-label-md lg:text-lg"
        style={{
          marginTop:
            category.name?.toLowerCase() === "fuel" ? "-10px" : "-25px",
        }}
      >
        {category.name}
      </p>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showToast, setShowToast] = useState(false);
  const { setSelectedCategories: setStoreCategories } = useSpendingStore();

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handleAddSpends = () => {
    if (selectedCategories.length === 0) {
      setShowToast(true);
      return;
    }
    setStoreCategories(selectedCategories);
    router.push("/spends");
  };

  return (
    <>
      <Head>
        <title>BankKaro - Find Your Best Credit Card</title>
      </Head>
      <div
        className="min-h-screen pt-16 px-8 pb-40 lg:pb-16"
        style={{
          background: "linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto lg:flex lg:gap-30 lg:items-center lg:justify-center">
          <div className="lg:max-w-2xl lg:flex lg:flex-col lg:justify-center">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center lg:justify-start mb-4">
              <Image
                src="/card.svg"
                alt="CardGenius"
                width={24}
                height={24}
                className="mr-2"
              />
              <span className="text-brand-name text-white">CardGenius</span>
              <span
                className="text-caption-xs ml-1"
                style={{ color: "#FFFFFFCC" }}
              >
                by BankKaro
              </span>
            </div>

            <h1 className="text-white text-center mb-8 text-heading-lg lg:text-left">
              Find your best Credit card
            </h1>

            <div className="flex justify-center lg:justify-start lg:-ml-32">
              <Image
                src="/card.png"
                alt="Credit card"
                width={400}
                height={250}
                className="lg:w-[550px] lg:h-[344px]"
                priority
              />
            </div>

            <p className="text-white text-center mt-6 mb-8 text-body-sm lg:hidden">
              Choose one or more categories where you spend the most
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 lg:hidden">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategories.includes(category.id)}
                  onToggle={() => toggleCategory(category.id)}
                />
              ))}
            </div>
          </div>

          <div className="hidden lg:flex lg:flex-col lg:w-96 lg:items-center lg:justify-center">
            <p className="text-white text-center mb-6 text-body-sm">
              Choose one or more categories where you spend the most
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8 w-full">
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategories.includes(category.id)}
                  onToggle={() => toggleCategory(category.id)}
                />
              ))}
            </div>

            <Button fullWidth onClick={handleAddSpends}>
              Add Spends
            </Button>

            <p
              className="text-center mt-4 text-caption-xs"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Select at least one category to continue
            </p>
          </div>
        </div>

        <div
          className="lg:hidden fixed bottom-0 left-0 right-0 px-4 py-4 z-50"
          style={{
            background: "linear-gradient(180deg, transparent 0%, #3A3F49 40%)",
          }}
        >
          <Button fullWidth onClick={handleAddSpends}>
            Add Spends
          </Button>

          <p
            className="text-center mt-4 text-caption-xs"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Select at least one category to continue
          </p>
        </div>

        <Toast
          message="Please select at least one to proceed"
          isVisible={showToast}
          onClose={() => setShowToast(false)}
        />
      </div>
    </>
  );
}
