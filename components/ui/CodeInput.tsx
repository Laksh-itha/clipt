"use client";
import { useEffect } from "react";

interface Props {
  code: string;
  setCode: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
}

export default function CodeInput({ code, setCode, status, setStatus }: Props) {
  useEffect(() => {
    if (!code.trim()) { setStatus(""); return; }
    if (code.length < 4 || code.length > 20) { setStatus("invalid"); return; }
    setStatus("checking");
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/check-code?code=${code}`);
        const data = await res.json();
        if (data.available) { setStatus("available"); } else { setStatus("taken"); }
      } catch (error) { console.log(error); }
    }, 300);
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="w-full p-4 border border-[#e5d9ce] dark:border-[#1c1c2e] bg-white/50 dark:bg-[#0f0f1a] rounded-lg">

      <div className="flex flex-wrap items-center gap-2 mb-2">
        <h6 className="text-sm font-semibold tracking-widest text-[#7a6a5e] dark:text-[#888888]">
          Your Unique Access Code
        </h6>

        {status === "invalid" && (
          <span className="bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded-md text-xs font-semibold">
            ✗ Too short (min 4 chars)
          </span>
        )}
        {status === "checking" && (
          <span className="bg-gray-500/20 text-gray-400 px-2 py-0.5 rounded-md text-xs font-semibold">
            ⏳ Checking...
          </span>
        )}
        {status === "available" && (
          <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded-md text-xs font-semibold">
            ✓ Available
          </span>
        )}
        {status === "taken" && (
          <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded-md text-xs font-semibold">
            ✗ Taken
          </span>
        )}
      </div>

      <input
        className="w-full h-12 px-4 border border-[#e5d9ce] dark:border-[#1c1c2e] rounded-lg text-[#3a3028] dark:text-[#e8e8f4] font-bold tracking-widest placeholder:text-[#d5ccc4] dark:placeholder:text-[#444444] placeholder:font-normal placeholder:normal-case focus:outline-none focus:border-[#5a7a4a] dark:focus:border-[#c8f542] transition-colors bg-transparent text-sm"
        placeholder="TYPE HERE"
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        minLength={4}
        maxLength={20}
      />

      <p className="text-xs font-semibold tracking-widest text-[#b0a090] dark:text-[#888888] mt-2">
        Letters & numbers only · 4–20 characters · must be unique across all users
      </p>
    </div>
  );
}
