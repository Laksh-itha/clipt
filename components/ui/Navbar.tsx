"use client";
import ThemeToggle from "@/components/theme-toggle";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isRetrieve = pathname === "/retrieve" || pathname.startsWith("/clip/");

  return (
    <nav className="relative w-full border-b border-[#ddd3c7] dark:border-[#1c1c2e] bg-[#f7f3ee] dark:bg-[#09090f]">
      <div className="w-full h-12 sm:h-16 px-3 sm:px-8 flex items-center justify-between">

        {/* Logo — hard left */}
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 sm:gap-2 focus:outline-none shrink-0"
          aria-label="Go home"
        >
          <img
            src="/logo.png"
            alt="CLIPT Logo"
            className="w-6 h-6 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl object-cover"
          />
          <span className="text-sm sm:text-xl font-black tracking-[-1px] text-[#221914] dark:text-[#e8e8f4] leading-none">
            CLIPT
          </span>
        </button>

        {/* Tab pills — centred */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-[#f3ede6] dark:bg-[#13131e] border border-[#d8cec2] dark:border-[#1c1c2e] rounded-lg sm:rounded-xl p-0.5 sm:p-1">
          <button
            onClick={() => router.push("/")}
            className={`px-2 sm:px-5 h-7 sm:h-8 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-bold tracking-[0.5px] sm:tracking-[2px] uppercase transition-all cursor-pointer whitespace-nowrap ${
              !isRetrieve
                ? "bg-[#8aac62] text-white"
                : "text-[#7c6f63] dark:text-[#888888]"
            }`}
          >
            ↑ Create
          </button>
          <button
            onClick={() => router.push("/retrieve")}
            className={`px-2 sm:px-5 h-7 sm:h-8 rounded-md sm:rounded-lg text-[9px] sm:text-[11px] font-bold tracking-[0.5px] sm:tracking-[2px] uppercase transition-all cursor-pointer whitespace-nowrap ${
              isRetrieve
                ? "bg-[#8aac62] text-white"
                : "text-[#7c6f63] dark:text-[#888888]"
            }`}
          >
            ↓ Retrieve
          </button>
        </div>

        {/* Theme toggle — hard right */}
        <div className="shrink-0 scale-75 sm:scale-100 origin-right">
          <ThemeToggle />
        </div>

      </div>
    </nav>
  );
}