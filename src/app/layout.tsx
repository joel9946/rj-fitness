import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "RJ Fitness | Kuttanad's Premier Gym",
  description: "Join RJ Fitness, the first premium A/C gym in Kuttanad, Kerala. Offering CrossFit, Aerobics, Zumba, Yoga, and Certified Personal Training.",
  icons: {
    icon: "/images/WhatsApp Image 2026-06-20 at 1.17.33 PM.jpeg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        {children}
      </body>
    </html>
  );
}
