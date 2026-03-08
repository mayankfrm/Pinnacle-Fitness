"use client";

import { useState } from "react";
import { 
  Dumbbell, 
  Target, 
  Flame, 
  Calendar, 
  Info,
  ChevronRight,
  Save,
  Play
} from "lucide-react";
import { EXERCISES, ROUTINE_TEMPLATES, getFallbackKey, type RoutineTemplate } from "@/data/fitness-data";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { supabase as legacySupabase } from "@/lib/supabase";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const goals = [
  { id: "weight_loss", label: "Weight Loss", icon: "🔥" },
  { id: "muscle_gain", label: "Muscle Gain", icon: "💪" },
  { id: "endurance", label: "Endurance", icon: "⚡" },
  { id: "flexibility", label: "Flexibility", icon: "🧘" },
];

const levels = [
  { id: "beginner", label: "Beginner", icon: "🌱" },
  { id: "intermediate", label: "Intermediate", icon: "⚡" },
  { id: "advanced", label: "Advanced", icon: "🔥" },
];

const daysOptions = [
  { id: 3, label: "3 Days" },
  { id: 4, label: "4 Days" },
  { id: 5, label: "5 Days" },
];

const equipmentOptions = [
  { id: "full_gym", label: "Full Gym", icon: "🏢" },
  { id: "dumbbells", label: "Dumbbells", icon: "🏋️" },
  { id: "bodyweight", label: "Bodyweight", icon: "🤸" },
];

export default function RoutinesPage() {
  const [goal, setGoal] = useState("weight_loss");
  const [level, setLevel] = useState("beginner");
  const [days, setDays] = useState(4);
  const [equipment, setEquipment] = useState("full_gym");
  
  const [generatedRoutine, setGeneratedRoutine] = useState<null | { key: string; isFallback: boolean; data: RoutineTemplate }>(null);
  const [showForm, setShowForm] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const supabase = createClientComponentClient();

  const handleGenerate = () => {
    const key = `${goal}_${level}_${days}`;
    let isFallback = false;
    let finalKey = key;

    if (!ROUTINE_TEMPLATES[key]) {
      finalKey = getFallbackKey(goal, level, days);
      isFallback = true;
    }

    setGeneratedRoutine({
      key: finalKey,
      isFallback,
      data: ROUTINE_TEMPLATES[finalKey]
    });
    setShowForm(false);
  };

  const handleSaveRoutine = async () => {
    if (!generatedRoutine) return;
    setSaveLoading(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        alert("Please log in to save routines!");
        return;
      }

      // 1. Create Workout
      const { data: workout, error: wError } = await supabase
        .from('workouts')
        .insert({
          user_id: session.user.id,
          workout_name: generatedRoutine.data.name,
        })
        .select()
        .single();

      if (wError) throw wError;

      // 2. Log Exercises (We'll just log the first day's exercises as a starting point)
      const logs = generatedRoutine.data.days[0].exercises.map(exRef => {
        const ex = EXERCISES.find(e => e.id === exRef.id);
        return {
          workout_id: workout.id,
          exercise_name: ex?.name || "Unknown",
          sets: ex?.sets || 3,
          reps: parseInt(ex?.reps || "10"),
        };
      });

      const { error: lError } = await supabase.from('exercise_logs').insert(logs);
      if (lError) throw lError;

      alert("Routine saved successfully!");
    } catch (err: any) {
      alert("Error saving routine: " + err.message);
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <header>
        <h1 className="text-3xl font-extrabold tracking-tight">Gym Routines</h1>
        <p className="text-[#8bba9b] mt-1">Get a personalized, data-driven workout plan</p>
      </header>

      {showForm ? (
        <div className="card space-y-8 bg-gradient-to-br from-[rgba(57,255,20,0.05)] to-[rgba(0,255,255,0.05)] border-[rgba(57,255,20,0.2)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-[#39ff14] to-[#00ffff] bg-clip-text text-transparent">Configure Your Routine</h2>
              <p className="text-sm text-[#8bba9b] mt-1">Set your parameters and let the system build your plan.</p>
            </div>
            <Target className="text-[#5c856a]" size={32} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Goal */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-[#5c856a] uppercase tracking-wider">Fitness Goal</label>
              <div className="flex flex-wrap gap-2">
                {goals.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setGoal(g.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all",
                      goal === g.id 
                        ? "bg-[#39ff14] text-black font-bold border-[#39ff14]" 
                        : "bg-[#06110b] border border-[rgba(57,255,20,0.15)] text-[#8bba9b] hover:border-[#39ff14] hover:text-[#39ff14]"
                    )}
                  >
                    <span>{g.icon}</span> {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-[#5c856a] uppercase tracking-wider">Experience Level</label>
              <div className="flex flex-wrap gap-2">
                {levels.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLevel(l.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all",
                      level === l.id 
                        ? "bg-[#39ff14] text-black font-bold border-[#39ff14]" 
                        : "bg-[#06110b] border border-[rgba(57,255,20,0.15)] text-[#8bba9b] hover:border-[#39ff14] hover:text-[#39ff14]"
                    )}
                  >
                    <span>{l.icon}</span> {l.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Days */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-[#5c856a] uppercase tracking-wider">Days Per Week</label>
              <div className="flex flex-wrap gap-2">
                {daysOptions.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setDays(d.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all",
                      days === d.id 
                        ? "bg-[#39ff14] text-black font-bold border-[#39ff14]" 
                        : "bg-[#06110b] border border-[rgba(57,255,20,0.15)] text-[#8bba9b] hover:border-[#39ff14] hover:text-[#39ff14]"
                    )}
                  >
                    <Calendar size={14} /> {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Equipment */}
            <div className="space-y-3">
              <label className="text-[11px] font-bold text-[#5c856a] uppercase tracking-wider">Available Equipment</label>
              <div className="flex flex-wrap gap-2">
                {equipmentOptions.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEquipment(e.id)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all",
                      equipment === e.id 
                        ? "bg-[#39ff14] text-black font-bold border-[#39ff14]" 
                        : "bg-[#06110b] border border-[rgba(57,255,20,0.15)] text-[#8bba9b] hover:border-[#39ff14] hover:text-[#39ff14]"
                    )}
                  >
                    <span>{e.icon}</span> {e.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button onClick={handleGenerate} className="btn-primary w-full flex items-center justify-center gap-2 mt-4">
            ✨ Generate Routine
          </button>
        </div>
      ) : generatedRoutine && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
          <button onClick={() => setShowForm(true)} className="btn-outline flex items-center gap-2 py-2 px-4">
            ✏️ Modify Preferences
          </button>

          {generatedRoutine.isFallback && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-[rgba(57,255,20,0.1)] border border-[rgba(57,255,20,0.2)]">
              <Info className="text-[#39ff14] mt-0.5" size={20} />
              <div>
                <strong className="block text-[#39ff14]">Adjusted Plan</strong>
                <p className="text-sm text-[#8bba9b] mt-0.5">
                   For your chosen experience level, it is highly advised to follow the below plan instead of a {days} day plan.
                </p>
              </div>
            </div>
          )}

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h2 className="text-2xl font-black bg-gradient-to-r from-[#39ff14] to-[#00ffff] bg-clip-text text-transparent underline decoration-[#39ff14]/30 decoration-4 underline-offset-8">
                {generatedRoutine.data.name}
              </h2>
              <p className="text-[#8bba9b] mt-4">{generatedRoutine.data.desc}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleSaveRoutine}
                disabled={saveLoading}
                className="btn-outline flex items-center gap-2 text-sm py-2 disabled:opacity-50"
              >
                <Save size={16} /> {saveLoading ? "Saving..." : "Save Routine"}
              </button>
              <button className="btn-primary flex items-center gap-2 text-sm py-2">
                <Play size={16} /> Start Workout
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {generatedRoutine.data.days.map((day, idx) => (
              <div key={idx} className="card bg-[#0a1a10] border-[rgba(57,255,20,0.1)]">
                <h3 className="text-lg font-bold flex items-center gap-3 mb-6">
                  <span className="w-8 h-8 rounded-lg bg-[rgba(57,255,20,0.15)] text-[#39ff14] flex items-center justify-center text-sm font-black">
                    {idx + 1}
                  </span>
                  {day.focus}
                </h3>
                <div className="space-y-3">
                  {day.exercises.map((exRef, eIdx) => {
                    const exercise = EXERCISES.find(e => e.id === exRef.id);
                    if (!exercise) return null;
                    return (
                      <div key={eIdx} className="flex items-center justify-between p-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.04)] transition-colors group cursor-pointer">
                        <div className="flex items-center gap-4">
                          <span className="text-xl">{exercise.emoji}</span>
                          <div>
                            <div className="font-semibold text-sm">{exercise.name}</div>
                            <div className="text-[10px] text-[#5c856a] uppercase tracking-widest mt-0.5">
                              {exercise.muscle} • {exercise.equipment}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 text-right">
                          <div>
                            <div className="text-xs font-bold text-[#39ff14]">{exercise.sets} Sets</div>
                            <div className="text-[10px] text-[#5c856a] uppercase">Target</div>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-[#00ffff]">{exercise.reps}</div>
                            <div className="text-[10px] text-[#5c856a] uppercase">Reps</div>
                          </div>
                          <ChevronRight className="text-[#5c856a] group-hover:text-[#39ff14] transition-colors" size={16} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
