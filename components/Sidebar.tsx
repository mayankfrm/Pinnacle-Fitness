"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Dumbbell, 
  History, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Apple,
  Activity,
  ClipboardList
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { supabase } from "@/lib/supabase";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Gym Routines", href: "/routines", icon: Dumbbell, badge: "New" },
  { name: "Exercise Plans", href: "/exercises", icon: ClipboardList },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "Nutrition", href: "/nutrition", icon: Apple },
];

export default function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[250px] bg-[#0a1a10] border-r border-[rgba(57,255,20,0.15)] flex flex-col p-3 z-50">
      <div className="flex items-center gap-3 p-6 mb-4 border-b border-[rgba(57,255,20,0.15)]">
          <div className="w-8 h-8 bg-gradient-to-br from-[#39ff14] to-[#00ffff] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.4)]">
             <Activity className="text-black" size={20} />
          </div>
          <span className="text-xl font-black tracking-tighter text-[#e2f8e8] group-hover:text-[#39ff14] transition-colors">Pinnacle</span>
        </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-[rgba(57,255,20,0.15)] text-[#39ff14] font-semibold" 
                  : "text-[#8bba9b] hover:bg-[rgba(255,255,255,0.03)] hover:text-[#e2f8e8]"
              )}
            >
              <Icon size={18} className={cn(isActive ? "text-[#39ff14]" : "text-[#5c856a] group-hover:text-[#8bba9b]")} />
              <span className="text-sm">{item.name}</span>
              {item.badge && (
                <span className="ml-auto text-[10px] bg-gradient-to-br from-[#39ff14] to-[#00ffff] text-black font-bold px-2 py-0.5 rounded-full">
                  {item.badge}
                </span>
              )}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/5 bg-[#39ff14] rounded-r-sm" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-4">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-[#5c856a] hover:text-[#ef4444] hover:bg-[rgba(239,68,68,0.05)] rounded-xl transition-all group"
        >
          <LogOut size={18} className="group-hover:rotate-12 transition-transform" />
          <span className="text-sm font-semibold">Logout</span>
        </button>

        <div className="p-4 flex items-center gap-3 border-t border-[rgba(57,255,20,0.15)] pt-6">
          <div className="w-9 h-9 rounded-full bg-[#39ff14] flex items-center justify-center text-black font-bold text-xs uppercase">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-semibold text-[#e2f8e8]">Pinnacle User</span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              <span className="text-[11px] text-[#22c55e]">Active Session</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
