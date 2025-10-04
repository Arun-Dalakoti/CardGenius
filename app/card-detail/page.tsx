"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Head from "next/head";

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
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center"
            style={{
              width: "24px",
              height: "24px",
            }}
          >
            <Image src="/arrow-left.svg" alt="Back" width={24} height={24} />
          </button>

          {/* Title */}
          <h1
            className="flex-1 text-center text-white"
            style={{
              fontFamily:
                "SF Pro Text, -apple-system, BlinkMacSystemFont, sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "26px",
              letterSpacing: "-0.004em",
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
          {/* Card detail content will go here */}
        </div>
      </div>
    </>
  );
}
