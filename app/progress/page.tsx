"use client";

import { useState } from "react";
import { 
  PlusCircle, 
  Calendar, 
  TrendingUp, 
  Clock, 
  Flame, 
  Trophy,
  ClipboardList,
  ChevronRight
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function ProgressPage() {
  const [showLogModal, setShowLogModal] = useState(false);

  const stats = [
    { label: "This Week", value: "0", icon: Calendar, color: "#39ff14" },
    { label: "Total Sessions", value: "0", icon: Trophy, color: "#facc15" },
    { label: "Minutes Logged", value: "0", icon: Clock, color: "#00ffff" },
    { label: "Best Streak", value: "0", icon: Flame, color: "#22c55e" },
  ];

  const weeklyData = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 60 },
    { day: "Wed", value: 0 },
    { day: "Thu", value: 75 },
    { day: "Fri", value: 50 },
    { day: "Sat", value: 30 },
    { day: "Sun", value: 0 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Progress Tracker</h1>
          <p className="text-[#8bba9b] mt-1">Track your fitness journey over time</p>
        </div>
        <button 
          onClick={() => setShowLogModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusCircle size={20} /> Log Workout
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card group relative overflow-hidden bg-[#0a1a10]/60 backdrop-blur-md">
            <div 
              className="absolute inset-0 opacity-[0.05] transition-opacity group-hover:opacity-[0.08]" 
              style={{ background: `linear-gradient(135deg, ${stat.color} 0%, transparent 60%)` }}
            />
            <stat.icon size={24} style={{ color: stat.color }} className="mb-2" />
            <div className="text-3xl font-black">{stat.value}</div>
            <div className="text-[10px] font-bold text-[#5c856a] uppercase tracking-wider mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <div className="lg:col-span-2 card bg-[#0a1a10]/60 backdrop-blur-md">
          <h2 className="text-lg font-bold mb-8 flex items-center gap-2">
            <TrendingUp size={20} className="text-[#39ff14]" /> Weekly Activity (Minutes)
          </h2>
          <div className="flex items-end justify-between h-48 px-2">
            {weeklyData.map((d) => (
              <div key={d.day} className="flex flex-col items-center gap-3 w-full max-w-[40px]">
                <div 
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#39ff14]/20 to-[#39ff14] transition-all duration-500 hover:to-[#00ffff] relative group"
                  style={{ height: `${(d.value / 90) * 100}%` }}
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-[#39ff14] text-[10px] font-bold px-2 py-1 rounded border border-[#39ff14]/20 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.value}m
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#5c856a] uppercase">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Level/Badge display or similar info */}
        <div className="card bg-gradient-to-br from-[#0a1a10] to-[#0f2416] border-[#39ff14]/20 flex flex-col items-center justify-center py-8 text-center group">
          <div className="relative mb-6">
             <div className="absolute inset-0 bg-[#39ff14] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
             <div className="w-24 h-24 rounded-full border-4 border-[#39ff14]/20 border-t-[#39ff14] flex items-center justify-center relative z-10">
                <Trophy size={40} className="text-[#39ff14]" />
             </div>
          </div>
          <h3 className="text-xl font-black mb-1">Elite Challenger</h3>
          <p className="text-[#5c856a] text-sm">Level 12 • 450 XP until next rank</p>
          <div className="w-full h-1.5 bg-[#06110b] rounded-full mt-6 overflow-hidden max-w-[200px]">
             <div className="h-full bg-gradient-to-r from-[#39ff14] to-[#00ffff] w-3/4" />
          </div>
        </div>
      </div>

      {/* Workout History */}
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#facc15]" /> Workout History
        </h2>
        <div className="card flex flex-col items-center justify-center py-16 text-center bg-[#0a1a10]/60 backdrop-blur-md">
          <ClipboardList size={48} className="text-[#5c856a] mb-3 opacity-20" />
          <p className="text-[#8bba9b]">No workouts logged yet. Your journey is waiting!</p>
          <button 
            onClick={() => setShowLogModal(true)}
            className="btn-outline mt-6 flex items-center gap-2 py-2 px-6"
          >
            Log Your First Workout
          </button>
        </div>
      </section>

      {/* Log Modal Placeholder */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowLogModal(false)} />
           <div className="card w-full max-w-lg relative z-10 bg-[#0a1a10] border-[#39ff14]/20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PlusCircle size={24} className="text-[#39ff14]" /> Log Workout Session
              </h2>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5c856a] uppercase tracking-wider">Exercise Type</label>
                    <select className="w-full bg-[#06110b] border border-[rgba(255,255,255,0.05)] rounded-xl py-3 px-4 text-sm outline-none focus:border-[#39ff14]">
                       <option>Resistance Training</option>
                       <option>Cardio Session</option>
                       <option>Mobility / Yoga</option>
                    </select>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#5c856a] uppercase tracking-wider">Duration (min)</label>
                        <input type="number" placeholder="45" className="w-full bg-[#06110b] border border-[rgba(255,255,255,0.05)] rounded-xl py-3 px-4 text-sm outline-none focus:border-[#39ff14]" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#5c856a] uppercase tracking-wider">Intensity (1-10)</label>
                        <input type="number" placeholder="7" className="w-full bg-[#06110b] border border-[rgba(255,255,255,0.05)] rounded-xl py-3 px-4 text-sm outline-none focus:border-[#39ff14]" />
                    </div>
                 </div>
              </div>
              <div className="flex gap-3 mt-8">
                 <button onClick={() => setShowLogModal(false)} className="flex-1 btn-outline">Cancel</button>
                 <button className="flex-1 btn-primary">Save Session</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
