"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Dumbbell, 
  ClipboardList, 
  TrendingUp, 
  Apple, 
  Settings,
  Circle
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Gym Routines", href: "/routines", icon: Dumbbell, badge: "New" },
  { name: "Exercise Plans", href: "/exercises", icon: ClipboardList },
  { name: "Progress", href: "/progress", icon: TrendingUp },
  { name: "Nutrition", href: "/nutrition", icon: Apple },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[250px] bg-[#0a1a10] border-r border-[rgba(57,255,20,0.15)] flex flex-col p-3 z-50">
      <div className="flex items-center gap-3 p-6 mb-4 border-b border-[rgba(57,255,20,0.15)]">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#39ff14] to-[#00ffff] flex items-center justify-center text-black">
          <TrendingUp size={20} strokeWidth={3} />
        </div>
        <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-[#39ff14] to-[#00ffff] bg-clip-text text-transparent">
          VitalArc
        </span>
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

      <div className="mt-auto p-4 flex items-center gap-3 border-t border-[rgba(57,255,20,0.15)] pt-6">
        <div className="w-9 h-9 rounded-full bg-[#39ff14] flex items-center justify-center text-black font-bold text-xs">
          VU
        </div>
        <div className="flex flex-col">
          <span className="text-[13px] font-semibold">VitalArc User</span>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
            <span className="text-[11px] text-[#22c55e]">Online</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
