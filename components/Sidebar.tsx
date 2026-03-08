"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Dumbbell,
  ClipboardList,
  TrendingUp,
  Apple,
  LogOut,
  Activity,
  Smile
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

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
  const supabase = createClientComponentClient();
  const [fullName, setFullName] = useState("Pinnacle User"); // Added fullName state

  useEffect(() => {
    const getUserProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.id) {
        // First check session metadata
        if (session.user.user_metadata?.full_name) {
          setFullName(session.user.user_metadata.full_name);
        } else {
          // Then check profiles table
          const { data } = await supabase
            .from('profiles')
            .select('full_name')
            .eq('id', session.user.id)
            .maybeSingle();
          
          if (data?.full_name) {
            setFullName(data.full_name);
          } else if (session.user.email) {
            // Last resort: use email snippet
            setFullName(session.user.email.split('@')[0]);
          }
        }
      }
    };
    getUserProfile();
  }, [supabase]); // Added useEffect to fetch user profile

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[250px] bg-[#0a1a10] border-r border-[rgba(57,255,20,0.15)] flex flex-col p-3 z-50">
      <div className="flex items-center gap-3 p-6 mb-4 border-b border-[rgba(57,255,20,0.15)]">
          <div className="w-8 h-8 bg-gradient-to-br from-[#39ff14] to-[#00ffff] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(57,255,20,0.4)]">
             <Activity className="text-black" size={18} /> {/* Changed size to 18 */}
          </div>
          <span className="text-xl font-black tracking-tighter text-[#e2f8e8] group-hover:text-[#39ff14] transition-colors">Pinnacle</span>
        </div>

      <nav className="flex-1 px-2 space-y-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all group duration-300",
                isActive 
                  ? "bg-[#39ff14]/10 text-[#39ff14] border border-[#39ff14]/20 shadow-[0_0_15px_rgba(57,255,20,0.1)]" 
                  : "text-[#5c856a] hover:bg-[#39ff14]/5 hover:text-[#e2f8e8]"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} className={cn("transition-transform group-hover:scale-110 duration-300", isActive ? "text-[#39ff14]" : "")} />
                <span className="text-sm font-bold tracking-tight">{item.name}</span>
              </div>
              {item.badge && (
                <span className="text-[10px] font-black bg-[#39ff14] text-black px-1.5 py-0.5 rounded uppercase tracking-tighter">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 mt-auto"> {/* Updated parent div for profile */}
        <div className="bg-[#0f2416] rounded-2xl p-4 border border-[rgba(57,255,20,0.1)] group/profile relative overflow-hidden"> {/* New profile div */}
          <div className="flex items-center gap-3 relative z-10">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#39ff14] to-[#00ffff] p-[2px]">
              <div className="w-full h-full rounded-full bg-[#0a1a10] flex items-center justify-center">
                <Smile className="text-[#39ff14]" size={20} /> {/* Used Smile icon */}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-semibold">{fullName}</span> {/* Used fullName state */}
              <span className="text-[10px] text-[#5c856a] font-bold uppercase tracking-wider">Premium Member</span> {/* Added Premium Member */}
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full mt-4 flex items-center justify-center gap-2 py-2 bg-[rgba(255,69,58,0.1)] text-[#ff453a] rounded-xl text-xs font-bold hover:bg-[#ff453a] hover:text-white transition-all border border-transparent hover:border-[#ff453a]/50"
          >
            <LogOut size={14} /> {/* Updated LogOut icon size */}
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}
