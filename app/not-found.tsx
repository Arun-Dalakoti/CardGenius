"use client";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";

export default function NotFound() {
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

        {/* Error Message */}
        <h1 className="text-white text-heading-lg mb-4">Page Not Found</h1>
        <p className="text-white/60 text-body-sm mb-8">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been
          moved or deleted.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <Link href="/">
            <Button fullWidth>Go to Home</Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 px-6 rounded-xl text-white text-body-sm"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            Go Back
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-12">
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  animation: `pulse ${1 + i * 0.2}s infinite`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
