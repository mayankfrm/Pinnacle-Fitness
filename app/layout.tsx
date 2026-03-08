import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Pinnacle — Your Personal Fitness Companion",
  description: "Next-gen fitness tracking and routine generation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <div className="flex min-h-screen overflow-x-hidden">
          <Sidebar />
          <main className="flex-1 ml-[250px] p-8 max-w-[1280px]">
             {children}
          </main>
        </div>
      </body>
    </html>
  );
}
