"use client";

import Image from "next/image";
import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: "linear-gradient(180deg, #242C3B 0%, #3A3F49 100%)",
      }}
    >
      <div className="max-w-md w-full text-center">
        {/* Logo and Brand */}
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/card.svg"
            alt="CardGenius"
            width={32}
            height={32}
            className="mr-2"
          />
          <span className="text-brand-name text-white">CardGenius</span>
          <span className="text-caption-xs ml-1" style={{ color: "#FFFFFFCC" }}>
            by BankKaro
          </span>
        </div>

        {/* Error Icon */}
        <div className="mb-8">
          <div className="relative w-full max-w-sm mx-auto">
            <div
              className="w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-4"
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "2px solid rgba(239, 68, 68, 0.3)",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-white text-heading-lg mb-4">
          Something went wrong!
        </h1>
        <p className="text-white/60 text-body-sm mb-2">
          We&apos;re sorry, but something unexpected happened. Please try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-8">
          <Button fullWidth onClick={reset}>
            Try Again
          </Button>
          <button
            onClick={() => (window.location.href = "/")}
            className="w-full py-3 px-6 rounded-xl text-white text-body-sm"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            Go to Home
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-8">
          <p className="text-white/40 text-caption-xs">
            If the problem persists, please contact support
          </p>
        </div>
      </div>
    </div>
  );
}
