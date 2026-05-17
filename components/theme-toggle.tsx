"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; 
  const isDark = theme === "dark";

  return (
    <div
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2 border border-[#ddd3c7] bg-[#f3ede6] rounded-full px-2.5 py-1.5 cursor-pointer transition"
    >
      <div
        className={`w-10 h-5.5 rounded-full px-1 flex items-center transition ${
          isDark ? "bg-[#444]" : "bg-[#dbe6c7]"
        }`}
      >
        <div
          className={`w-3.5 h-3.5 rounded-full transition ${
            isDark ? "bg-white" : "bg-[#7ea857]"
          } ${isDark ? "" : "ml-auto"}`}
        ></div>
      </div>

      <div className="flex items-center gap-1.5">
        <div
          className={`w-3 h-3 rounded-full ${
            isDark ? "bg-[#6b7cff]" : "bg-[#e4a53a]"
          }`}
        ></div>
        <span className="text-[12px] text-[#75685d] tracking-[1px]">
          {isDark ? "Dark" : "Light"}
        </span>
      </div>
    </div>
  );
}