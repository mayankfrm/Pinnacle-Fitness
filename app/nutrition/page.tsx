"use client";

import { useState } from "react";
import { 
  PlusCircle, 
  Apple, 
  Flame, 
  Target, 
  ChevronRight,
  TrendingUp,
  Beef,
  Wheat,
  Droplet
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function NutritionPage() {
  const [showMealModal, setShowMealModal] = useState(false);
  const [isEditingTargets, setIsEditingTargets] = useState(false);

  const targets = {
    calories: 2200,
    protein: 160,
    carbs: 240,
    fat: 70
  };

  const current = {
    calories: 1450,
    protein: 95,
    carbs: 180,
    fat: 42
  };

  const macros = [
    { label: "Protein", icon: Beef, color: "#ef4444", current: current.protein, target: targets.protein, unit: "g" },
    { label: "Carbs", icon: Wheat, color: "#3b82f6", current: current.carbs, target: targets.carbs, unit: "g" },
    { label: "Fat", icon: Droplet, color: "#facc15", current: current.fat, target: targets.fat, unit: "g" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Nutrition Tracker</h1>
          <p className="text-[#8bba9b] mt-1">Monitor your daily macros and calorie intake</p>
        </div>
        <button 
          onClick={() => setShowMealModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <PlusCircle size={20} /> Add Meal
        </button>
      </header>

      {/* Daily Progress Card */}
      <div className="card bg-gradient-to-br from-[#0a1a10] to-[#0f2416] border-[#39ff14]/20">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-lg font-bold flex items-center gap-2">
             <Target size={20} className="text-[#39ff14]" /> Daily Progress
           </h2>
           <button 
             onClick={() => setIsEditingTargets(!isEditingTargets)}
             className="text-xs font-bold text-[#5c856a] hover:text-[#39ff14] transition-colors uppercase tracking-widest"
           >
             {isEditingTargets ? "Cancel" : "Edit Targets"}
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
           {/* Calorie Ring Visualization (Simplified) */}
           <div className="flex flex-col items-center justify-center relative py-4">
              <div className="relative w-48 h-48 flex items-center justify-center">
                 <svg className="w-full h-full transform -rotate-90">
                    <circle 
                      cx="96" cy="96" r="88" 
                      fill="transparent" 
                      stroke="rgba(57,255,20,0.05)" 
                      strokeWidth="12" 
                    />
                    <circle 
                      cx="96" cy="96" r="88" 
                      fill="transparent" 
                      stroke="#39ff14" 
                      strokeWidth="12" 
                      strokeDasharray={2 * Math.PI * 88}
                      strokeDashoffset={(2 * Math.PI * 88) * (1 - (current.calories / targets.calories))}
                      strokeLinecap="round"
                    />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-4xl font-black">{targets.calories - current.calories}</span>
                    <span className="text-[10px] font-bold text-[#5c856a] uppercase tracking-wider">kcal Left</span>
                 </div>
              </div>
           </div>

           {/* Macro Details */}
           <div className="space-y-6">
              {macros.map((m) => (
                <div key={m.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <m.icon size={16} style={{ color: m.color }} />
                       <span className="text-sm font-bold text-[#8bba9b]">{m.label}</span>
                    </div>
                    <span className="text-xs font-bold">
                       {m.current}{m.unit} <span className="text-[#5c856a]">/ {m.target}{m.unit}</span>
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#06110b] rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${(m.current / m.target) * 100}%`, backgroundColor: m.color }} 
                    />
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Today's Meals */}
        <section className="space-y-4">
           <h2 className="text-lg font-bold flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14]" /> Today's Meals
           </h2>
           <div className="card bg-[#0a1a10]/60 backdrop-blur-md flex flex-col items-center justify-center py-12 text-center">
              <Apple size={48} className="text-[#5c856a] mb-3 opacity-20" />
              <p className="text-[#8bba9b]">No meals logged today.</p>
              <button 
                onClick={() => setShowMealModal(true)}
                className="btn-outline mt-4 px-6 py-2 text-sm"
              >
                Log Breakfast
              </button>
           </div>
        </section>

        {/* Nutrition History */}
        <section className="space-y-4">
           <h2 className="text-lg font-bold flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-[#00ffff]" /> Nutrition History
           </h2>
           <div className="card bg-[#0a1a10]/60 backdrop-blur-md flex flex-col items-center justify-center py-12 text-center">
              <TrendingUp size={48} className="text-[#5c856a] mb-3 opacity-20" />
              <p className="text-[#8bba9b]">No history yet.</p>
           </div>
        </section>
      </div>

      {/* Meal Modal Placeholder */}
      {showMealModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowMealModal(false)} />
           <div className="card w-full max-w-lg relative z-10 bg-[#0a1a10] border-[#39ff14]/20">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <PlusCircle size={24} className="text-[#39ff14]" /> Log Your Meal
              </h2>
              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-[#5c856a] uppercase tracking-wider">Meal Name</label>
                    <input type="text" placeholder="Scrambled Eggs & Toast" className="w-full bg-[#06110b] border border-[rgba(255,255,255,0.05)] rounded-xl py-3 px-4 text-sm outline-none focus:border-[#39ff14]" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#5c856a] uppercase tracking-wider">Calories</label>
                        <input type="number" placeholder="450" className="w-full bg-[#06110b] border border-[rgba(255,255,255,0.05)] rounded-xl py-3 px-4 text-sm outline-none focus:border-[#39ff14]" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-[#5c856a] uppercase tracking-wider">Protein (g)</label>
                        <input type="number" placeholder="25" className="w-full bg-[#06110b] border border-[rgba(255,255,255,0.05)] rounded-xl py-3 px-4 text-sm outline-none focus:border-[#39ff14]" />
                    </div>
                 </div>
              </div>
              <div className="flex gap-3 mt-8">
                 <button onClick={() => setShowMealModal(false)} className="flex-1 btn-outline">Cancel</button>
                 <button className="flex-1 btn-primary">Add Meal</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
