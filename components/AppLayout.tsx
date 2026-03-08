"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {!isLoginPage && <Sidebar />}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isLoginPage ? "ml-0" : "ml-[250px] p-8 max-w-[1280px]"
      )}>
        {children}
      </main>
    </div>
  );
}
