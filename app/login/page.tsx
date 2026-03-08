"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Activity } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setMessage("Check your email for confirmation!");
    else setMessage("Success! You can now log in.");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#06110b] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#0a1a10] border border-[rgba(57,255,20,0.1)] rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
        {/* Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#39ff14] opacity-10 blur-[80px] group-hover:opacity-20 transition-opacity" />
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#39ff14] to-[#00ffff] rounded-2xl flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(57,255,20,0.3)]">
            <Activity className="text-black" size={32} />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-[#e2f8e8]">Pinnacle</h1>
          <p className="text-[#8bba9b] text-sm mt-2">Elevate your fitness journey</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#5c856a] uppercase mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#06110b] border border-[rgba(57,255,20,0.15)] rounded-xl py-3 px-4 text-[#e2f8e8] outline-none focus:border-[#39ff14] transition-colors"
              placeholder="name@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#5c856a] uppercase mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#06110b] border border-[rgba(57,255,20,0.15)] rounded-xl py-3 px-4 text-[#e2f8e8] outline-none focus:border-[#39ff14] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {message && <p className="text-xs text-center text-[#39ff14] bg-[rgba(57,255,20,0.05)] py-2 rounded-lg">{message}</p>}

          <div className="pt-4 flex gap-3">
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-[#39ff14] to-[#00ffff] text-black font-black py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)]"
            >
              {loading ? "..." : "Login"}
            </button>
            <button 
              onClick={handleSignUp}
              disabled={loading}
              className="flex-1 bg-[rgba(255,255,255,0.03)] text-[#e2f8e8] border border-[rgba(255,255,255,0.1)] font-bold py-3 rounded-xl hover:bg-[rgba(255,255,255,0.1)] transition-all"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
