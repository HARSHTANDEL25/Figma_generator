"use client";
import React, { useState } from "react";
import { ArrowUp, Loader } from "lucide-react";
import { quickSelectData } from "@/lib/data";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

const Hero = () => {
  const [suggestion, setSuggestion] = useState<string>("");
  const [type, setType] = useState<string>("Website");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useUser();
  const router = useRouter();

  const handleProjectSubmit = async () => {
    setIsLoading(true);
    if (!user) {
      router.push("/sign-in");
      setIsLoading(false);
      return;
    }
    const projectId = crypto.randomUUID();
    try {
      const response = await axios.post("/api/project", {
        projectId: projectId,
        userInput: suggestion,
        deviceInput: type,
      });
      console.log(response.data);
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create project");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="relative flex flex-col items-center justify-center pt-10 pb-10 px-4 text-center bg-[#0F172A] bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-[#1E293B] via-[#0F172A] to-[#0F172A]">
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#1D91D0] opacity-10 blur-[120px]"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-[#8F37D7] opacity-15 blur-[120px]"></div>
      </div>
      {/* 1. Top Badge */}
      <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 text-slate-300 text-sm mb-8 animate-fade-in cursor-pointer hover:bg-white/10 transition-colors">
        <span className="text-yellow-400">✨</span>
        <span>Introducing UIUX Mockup</span>
        <span className="text-slate-500">→</span>
      </div>

      {/* 2. Headline */}
      <h1 className="text-4xl md:text-6xl font-bold text-white max-w-4xl leading-tight tracking-tight mb-4">
        Design High Quality{" "}
        <span className="text-[#8F37D7]">Website and Mobile App Designs</span>
      </h1>

      <p className="text-slate-400 text-lg mb-12">
        Imagine your idea and turn it into reality
      </p>

      {/* 3. Central Prompt Card */}
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl p-4 shadow-2xl shadow-purple-500/10 mb-10">
        <textarea
          placeholder="Interactive learning app for kids with rewards..."
          className="w-full h-24 resize-none border-none focus:ring-0 text-slate-800 placeholder:text-slate-400 text-lg"
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
        />

        <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-100">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <option value="Website">Website</option>
            <option value="Mobile App">Mobile</option>
          </select>

          {isLoading ? (
            <Loader className="animate-spin" size={20} />
          ) : (
            <button
              onClick={handleProjectSubmit}
              type="button"
              aria-label="Submit"
              className="p-3 rounded-xl bg-[linear-gradient(90deg,#1D91D0,#8F37D7)] text-white hover:scale-105 transition-transform shadow-lg shadow-purple-500/20"
            >
              <ArrowUp size={20} />
            </button>
          )}
        </div>
      </div>

      {/* 4. Quick Select Icons (Bottom Row) */}
      <div className="flex flex-wrap justify-center gap-4 max-w-5xl">
        {quickSelectData.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSuggestion(item?.description)}
            className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl w-28 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="text-xs text-slate-400 font-medium text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
