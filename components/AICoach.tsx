"use client";

import { useState } from "react";
import { Sparkles, MessageSquare, Send, Bot } from "lucide-react";

const LOCAL_TIPS = [
  "Consistency is the key to progress. Don't skip your scheduled sessions!",
  "Hydration is vital for muscle recovery. Drink at least 3-4 liters of water today.",
  "Focus on form over weight to prevent injuries and ensure long-term gains.",
  "Rest is where the muscle grows. Ensure you're getting 7-8 hours of sleep.",
  "Protein timing matters. Aim for a high-protein meal within 1-2 hours of your workout.",
  "Progressive overload: try to add a small amount of weight or one extra rep each week.",
];

export default function AICoach() {
  const [insight, setInsight] = useState("Your AI Coach is ready. Ask for a tip or check your progress insights!");
  const [loading, setLoading] = useState(false);

  const getCoachTip = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: "Give me a quick fitness tip based on my goal of muscle gain.",
          userContext: { goal: "muscle_gain" }
        })
      });
      const data = await res.json();
      
      // If the API returns an error or placeholder, use a local tip
      if (data.error || data.response.includes("Placeholder")) {
        throw new Error("Use fallback");
      }
      
      setInsight(data.response);
    } catch (err) {
      const randomTip = LOCAL_TIPS[Math.floor(Math.random() * LOCAL_TIPS.length)];
      setInsight(randomTip);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="card p-6 border-l-4 border-l-[#39ff14]/50 bg-[#0a1a10]/40 backdrop-blur-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Sparkles size={100} className="text-[#39ff14]" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#39ff14]/10 rounded-full flex items-center justify-center border border-[#39ff14]/20 shadow-[0_0_15px_rgba(57,255,20,0.1)]">
            <Bot size={20} className="text-[#39ff14]" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight text-[#e2f8e8]">Pinnacle AI Coach</h2>
            <p className="text-[10px] uppercase tracking-widest font-bold text-[#39ff14]/60">Neural Fitness Intelligence</p>
          </div>
        </div>

        <div className="bg-[#06110b]/60 border border-[rgba(57,255,20,0.1)] rounded-2xl p-4 mb-6 min-h-[100px] flex items-center justify-center text-center">
          <p className="text-[#8bba9b] italic text-sm leading-relaxed">
            "{loading ? "Analyzing your performance data..." : insight}"
          </p>
        </div>

        <button 
          onClick={getCoachTip}
          disabled={loading}
          className="w-full bg-gradient-to-r from-[#39ff14]/80 to-[#00ffff]/80 hover:from-[#39ff14] hover:to-[#00ffff] text-black font-black py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 group/btn shadow-[0_5px_15px_rgba(57,255,20,0.1)] disabled:opacity-50"
        >
          {loading ? (
             <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles size={18} className="group-hover/btn:animate-pulse" />
              Get AI Insight
            </>
          )}
        </button>
      </div>
    </section>
  );
}
