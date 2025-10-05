"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface BottomSheetProps {
  totalSpends: number;
  monthlySavings: number;
  recommendedCardsCount: number;
  children: (isExpanded: boolean) => React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  totalSpends,
  monthlySavings,
  recommendedCardsCount,
  children,
}) => {
  const [height, setHeight] = useState(230);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);

  const maxHeight = windowHeight * 0.98;
  const minHeight = 230;

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

  return (
    <motion.div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        damping: 30,
        stiffness: 300,
        duration: 0.5,
      }}
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
      {/* Drag Handle and Total Spends */}
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

        <div className="flex items-center justify-between">
          <h3 className="text-white text-total-spends">Total spends</h3>
          <p className="text-white text-total-amount">
            ₹{totalSpends.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div
        className="overflow-hidden"
        style={{ height: height === minHeight ? "auto" : "calc(100% - 160px)" }}
      >
        {/* Collapsed state preview */}
        {height === minHeight && (
          <div
            style={{
              background: "#3E6584",
            }}
            onClick={handleClick}
          >
            <div className="relative z-10 px-4 pt-2 mb-1">
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
            </div>

            <div className="relative w-full" style={{ height: "120px" }}>
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/spends/bottom-card.png"
                  alt="Card preview"
                  width={800}
                  height={480}
                  quality={100}
                  className="w-full"
                  style={{
                    objectFit: "cover",
                    objectPosition: "bottom",
                    position: "absolute",
                    bottom: 0,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Expanded state */}
        {height !== minHeight && children(true)}
      </div>
    </motion.div>
  );
};

export default BottomSheet;
