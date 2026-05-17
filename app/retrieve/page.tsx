"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RetrievePage() {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRetrieve = async () => {
    if (code.trim().length < 4) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/retrieve?code=${code.trim()}`);
      const data = await res.json();
      if (res.status === 404) { setError("No clip found with that code."); setLoading(false); return; }
      if (res.status === 410) { setError("This clip has expired."); setLoading(false); return; }
      if (!res.ok) { setError("Something went wrong. Try again."); setLoading(false); return; }
      router.push(`/clip/${code.trim()}`);
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleRetrieve();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="w-full max-w-md">
        <div className="text-left mb-10">
          <h1 className="text-5xl font-black tracking-tight text-[#3a3028] dark:text-[#e8e8f4] leading-tight">Enter your</h1>
          <h1 className="text-5xl font-black tracking-tight text-[#8aac62] leading-tight">clip code.</h1>
          <p className="text-[#b0a090] dark:text-[#888888] text-sm mt-3 font-medium tracking-wide">
            Enter the unique code to access your file or text from any device.
          </p>
        </div>
      </div>
      <div className="w-full max-w-md space-y-3">
        <div className="border border-[#e5d9ce]  rounded-xl p-5 bg-white/50 dark:bg-[#0f0f1a]">
          <p className="text-xs font-semibold tracking-widest  text-[#7a6a5e] dark:text-[#888888] mb-3">
            Your Access Code
          </p>
          <input
            className="w-full h-12 px-4 border border-[#e5d9ce]  rounded-lg text-[#3a3028] dark:text-[#e8e8f4] font-bold tracking-widest  placeholder:text-[#d5ccc4] dark:placeholder:text-[#888888] placeholder:font-normal placeholder:normal-case focus:outline-none focus:border-[#5a7a4a] dark:focus:border-[#c8f542] transition-colors bg-transparent text-sm"
            placeholder="YOUR CODE"
            type="text"
            value={code}
            onChange={(e) => { setCode(e.target.value); setError(""); }}
            onKeyDown={handleKeyDown}
            maxLength={20}
            autoFocus
          />
          {error && <p className="text-red-400 text-xs font-semibold mt-2 tracking-wide">✗ {error}</p>}
        </div>
        <button
          onClick={handleRetrieve}
          disabled={code.trim().length < 4 || loading}
          className={`w-full h-12 rounded-xl text-xs font-bold tracking-widest  transition-all ${
            code.trim().length >= 4 && !loading
              ? "bg-[#5a7a4a] dark:bg-[#c8f542] text-white dark:text-[#09090f] hover:bg-[#4a6a3a]"
              : "bg-[#f0ebe4] dark:bg-[#13131e] text-[#b0a090] dark:text-[#888888] cursor-not-allowed"
          }`}
        >
          {loading ? "Looking up..." : code.trim().length >= 4 ? "Retrieve Clip →" : "Enter your code above →"}
        </button>
        <p className="text-center text-xs text-[#b0a090] dark:text-[#888888] tracking-wide pt-1">
          You can also scan a QR code or visit{" "}
          <span className="text-[#7a6a5e] dark:text-[#888888] font-semibold">clipt.io/YOURCODE</span>{" "}
          directly
        </p>
      </div>
    </div>
  );
}