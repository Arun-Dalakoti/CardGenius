"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function GlobalError({
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
    <html lang="en">
      <body>
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
              <span
                className="text-2xl font-semibold text-white"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                CardGenius
              </span>
              <span
                className="text-xs ml-1"
                style={{ color: "#FFFFFFCC", fontFamily: "system-ui, sans-serif" }}
              >
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
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Error Message */}
            <h1
              className="text-white text-4xl font-bold mb-4"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              Critical Error
            </h1>
            <p
              className="text-white/60 text-base mb-2"
              style={{ fontFamily: "system-ui, sans-serif" }}
            >
              A critical error occurred. The application needs to restart.
            </p>
            {error.digest && (
              <p
                className="text-white/40 text-xs mb-8 font-mono"
                style={{ fontFamily: "monospace" }}
              >
                Error ID: {error.digest}
              </p>
            )}

            {/* Action Buttons */}
            <div
              className="mt-8"
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <button
                onClick={reset}
                className="w-full py-3 px-6 rounded-xl text-white font-medium"
                style={{
                  background: "linear-gradient(90deg, #0263BE 0%, #0277BD 100%)",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Restart Application
              </button>
              <button
                onClick={() => (window.location.href = "/")}
                className="w-full py-3 px-6 rounded-xl text-white"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Go to Home
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-8">
              <p
                className="text-white/40 text-xs"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                This is a global application error. Please contact support if the issue
                persists.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
