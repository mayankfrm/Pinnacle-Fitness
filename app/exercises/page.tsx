"use client";

import { useState } from "react";
import { 
  Search, 
  Filter, 
  Dumbbell, 
  ChevronRight,
  ChevronDown,
  Info,
  Flame
} from "lucide-react";
import { EXERCISES, type Exercise } from "@/data/fitness-data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const muscleGroups = ["all", "chest", "back", "legs", "shoulders", "arms", "core", "cardio"];

export default function ExercisesPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = EXERCISES.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || ex.muscle === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Exercise Library</h1>
        <p className="text-[#8bba9b] mt-1">Master every movement with expert instructions</p>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#5c856a]" size={18} />
          <input 
            type="text" 
            placeholder="Search exercises..."
            className="w-full bg-[#0a1a10] border border-[rgba(57,255,20,0.15)] rounded-xl py-3 pl-10 pr-4 text-sm focus:border-[#39ff14] transition-all outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {muscleGroups.map(m => (
            <button
              key={m}
              onClick={() => setFilter(m)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap",
                filter === m 
                  ? "bg-[#39ff14] text-black" 
                  : "bg-[#0a1a10] border border-[rgba(57,255,20,0.15)] text-[#5c856a] hover:border-[#39ff14]/50"
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map((ex) => (
          <div 
            key={ex.id} 
            onClick={() => setSelectedExercise(ex)}
            className="card group cursor-pointer hover:border-[#39ff14]/30"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{ex.emoji}</span>
              <span className={cn(
                "text-[10px] font-black uppercase px-2 py-1 rounded bg-[rgba(255,255,255,0.05)]",
                ex.difficulty === 'beginner' && "text-[#22c55e]",
                ex.difficulty === 'intermediate' && "text-[#facc15]",
                ex.difficulty === 'advanced' && "text-[#ef4444]"
              )}>
                {ex.difficulty}
              </span>
            </div>
            <h3 className="font-bold text-lg group-hover:text-[#39ff14] transition-colors">{ex.name}</h3>
            <div className="text-[11px] text-[#5c856a] uppercase tracking-widest mt-1">
              {ex.muscle} • {ex.equipment}
            </div>
            <div className="mt-4 flex items-center justify-between text-[#5c856a] group-hover:text-[#8bba9b]">
              <span className="text-xs">{ex.sets} Sets / {ex.reps} Reps</span>
              <ChevronRight size={16} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal Overlay */}
      {selectedExercise && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedExercise(null)} />
          <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto relative z-10 bg-[#0a1a10] border-[#39ff14]/20 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <button 
              className="absolute top-4 right-4 text-[#5c856a] hover:text-[#e2f8e8]"
              onClick={() => setSelectedExercise(null)}
            >
              Close
            </button>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-6xl">{selectedExercise.emoji}</span>
              <div>
                <h2 className="text-3xl font-black text-[#e2f8e8]">{selectedExercise.name}</h2>
                <div className="flex gap-2 mt-2">
                   <span className="text-[10px] font-bold text-[#39ff14] bg-[#39ff14]/10 px-2 py-0.5 rounded-full border border-[#39ff14]/20 uppercase">
                    {selectedExercise.muscle}
                  </span>
                  <span className="text-[10px] font-bold text-[#00ffff] bg-[#00ffff]/10 px-2 py-0.5 rounded-full border border-[#00ffff]/20 uppercase">
                    {selectedExercise.equipment}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-[#06110b] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
                <div className="text-[10px] text-[#5c856a] uppercase font-bold mb-1">Target Sets</div>
                <div className="text-xl font-bold text-[#39ff14]">{selectedExercise.sets}</div>
              </div>
              <div className="bg-[#06110b] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
                <div className="text-[10px] text-[#5c856a] uppercase font-bold mb-1">Target Reps</div>
                <div className="text-xl font-bold text-[#00ffff]">{selectedExercise.reps}</div>
              </div>
              <div className="bg-[#06110b] p-4 rounded-xl border border-[rgba(255,255,255,0.05)]">
                <div className="text-[10px] text-[#5c856a] uppercase font-bold mb-1">Rest Period</div>
                <div className="text-xl font-bold text-[#facc15]">{selectedExercise.rest}</div>
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h4 className="text-sm font-bold text-[#8bba9b] mb-2 flex items-center gap-2">
                  <Info size={16} /> Description
                </h4>
                <p className="text-sm leading-relaxed text-[#8bba9b] bg-[#06110b] p-4 rounded-xl border border-[rgba(255,255,255,0.03)]">
                  {selectedExercise.desc}
                </p>
              </section>

              <section>
                <h4 className="text-sm font-bold text-[#8bba9b] mb-2 flex items-center gap-2">
                  <Flame size={16} className="text-[#39ff14]" /> Pro Tips
                </h4>
                <ul className="space-y-2">
                  {selectedExercise.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#8bba9b]">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#39ff14] shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            
            <button 
              className="btn-primary w-full mt-10"
              onClick={() => setSelectedExercise(null)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
