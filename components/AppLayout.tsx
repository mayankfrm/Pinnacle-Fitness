"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <div className="flex min-h-screen overflow-x-hidden">
      {!isLoginPage && <Sidebar />}
      <main className={`flex-1 ${isLoginPage ? "ml-0" : "ml-[250px]"} p-8 max-w-[1280px] transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
}
