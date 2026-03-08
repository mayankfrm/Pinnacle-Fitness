"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Activity } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const supabase = createClientComponentClient();

  // Auto-redirect if already logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) window.location.href = "/";
    };
    checkUser();
  }, [supabase]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });
      if (error) {
        setMessage(error.message);
      } else {
        setMessage("Success! Check your email for confirmation.");
      }
    } else {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setMessage(error.message);
      } else if (data.session) {
        window.location.href = "/";
      }
    }
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

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-xs font-bold text-[#5c856a] uppercase mb-1.5 ml-1">Full Name</label>
              <input 
                type="text" 
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#06110b] border border-[rgba(57,255,20,0.15)] rounded-xl py-3 px-4 text-[#e2f8e8] outline-none focus:border-[#39ff14] transition-colors"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-bold text-[#5c856a] uppercase mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              required
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#06110b] border border-[rgba(57,255,20,0.15)] rounded-xl py-3 px-4 text-[#e2f8e8] outline-none focus:border-[#39ff14] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {message && <p className="text-xs text-center text-[#39ff14] bg-[rgba(57,255,20,0.05)] py-2 rounded-lg">{message}</p>}

          <div className="pt-4 flex flex-col gap-3">
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#39ff14] to-[#00ffff] text-black font-black py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(57,255,20,0.2)]"
            >
              {loading ? "..." : (isSignUp ? "Create Account" : "Login")}
            </button>
            <button 
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-[#5c856a] text-xs font-bold hover:text-[#39ff14] transition-colors mt-2"
            >
              {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
