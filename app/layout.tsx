import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CardGenius",
  description: "CardGenius: Get best Credit Card based on the expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
