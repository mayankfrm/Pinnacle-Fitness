"use client";

import { 
  Play, 
  Dumbbell, 
  Flame, 
  TrendingUp, 
  Target,
  PlusCircle,
  Clock,
  ClipboardList
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import HeroScene from "@/components/HeroScene";

export default function Dashboard() {
  const [userName, setUserName] = useState("User");
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserName(session.user.email.split('@')[0]);
      }
    };
    getUser();
  }, [supabase]);

  const stats = [
    { label: "TOTAL WORKOUTS", value: "0", icon: Dumbbell, color: "#39ff14" },
    { label: "CALORIES LOGGED", value: "0", icon: Flame, color: "#facc15" },
    { label: "DAY STREAK", value: "0", icon: TrendingUp, color: "#00ffff" },
    { label: "WEEKLY GOAL", value: "0/5", icon: Target, color: "#ef4444" },
  ];

  return (
    <div className="relative">
      <HeroScene />
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10 pt-4">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight underline decoration-[#39ff14]/30 decoration-4 underline-offset-8">Dashboard</h1>
            <p className="text-[#8bba9b] mt-4 font-medium text-lg">Good Morning 🌅, {userName}.</p>
          </div>
          <div className="bg-[#0f2416]/80 backdrop-blur-md border border-[rgba(57,255,20,0.15)] px-4 py-2 rounded-xl text-sm text-[#5c856a] font-bold">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="card relative overflow-hidden group bg-[#0a1a10]/60 backdrop-blur-md">
              <div 
                className="absolute inset-0 opacity-[0.07] transition-opacity group-hover:opacity-10" 
                style={{ background: `linear-gradient(135deg, ${stat.color} 0%, transparent 60%)` }}
              />
              <stat.icon className="text-2xl mb-2" style={{ color: stat.color }} size={24} />
              <div className="text-3xl font-black">{stat.value}</div>
              <div className="text-[10px] font-bold text-[#5c856a] tracking-wider uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14]" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="card flex flex-col items-center justify-center gap-2 hover:-translate-y-1 transition-all bg-[#0a1a10]/60 backdrop-blur-md">
              <PlusCircle className="text-[#39ff14]" />
              <span className="text-sm font-semibold">Generate Routine</span>
            </button>
            <button className="card flex flex-col items-center justify-center gap-2 hover:-translate-y-1 transition-all bg-[#0a1a10]/60 backdrop-blur-md">
              <Dumbbell className="text-[#00ffff]" />
              <span className="text-sm font-semibold">Browse Exercises</span>
            </button>
            <button className="card flex flex-col items-center justify-center gap-2 hover:-translate-y-1 transition-all bg-[#0a1a10]/60 backdrop-blur-md">
              <Play className="text-[#facc15]" />
              <span className="text-sm font-semibold">Log Workout</span>
            </button>
            <button className="card flex flex-col items-center justify-center gap-2 hover:-translate-y-1 transition-all bg-[#0a1a10]/60 backdrop-blur-md">
              <Clock className="text-[#ef4444]" />
              <span className="text-sm font-semibold">Track Nutrition</span>
            </button>
          </div>
        </section>

        {/* Recent Activity */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ffff]" /> Recent Activity
          </h2>
          <div className="card flex flex-col items-center justify-center py-12 text-center bg-[#0a1a10]/60 backdrop-blur-md">
            <ClipboardList size={48} className="text-[#5c856a] mb-3 opacity-20" />
            <p className="text-[#8bba9b]">No activity yet. Start your first workout!</p>
          </div>
        </section>
      </div>
    </div>
  );
}
