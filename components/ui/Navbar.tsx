"use client";
import ThemeToggle from "@/components/theme-toggle";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isRetrieve =
  pathname === "/retrieve" ||
  pathname.startsWith("/clip/");

  return (
    <nav className="w-full border-b border-[#ddd3c7] dark:border-[#1c1c2e] bg-[#f7f3ee] dark:bg-[#09090f]">
      <div className="max-w-400 mx-auto h-15 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="CLIPT Logo" className="w-10 h-10 rounded-xl object-cover" />
          <h1 className="text-[22px] font-black tracking-[-1px] text-[#221914] dark:text-[#e8e8f4] leading-none">
            CLIPT
          </h1>
        </div>
        <div className="flex items-center bg-[#f3ede6] dark:bg-[#13131e] border border-[#d8cec2] dark:border-[#1c1c2e] rounded-xl p-1">
          <button
            onClick={() => router.push("/")}
            className={`px-5 h-8.5 rounded-lg text-[11px] font-bold tracking-[2px] uppercase transition-all cursor-pointer ${
              !isRetrieve ? "bg-[#8aac62] text-white" : "text-[#7c6f63] dark:text-[#888888]"
            }`}
          >
            ↑ Create
          </button>
          <button
            onClick={() => router.push("/retrieve")}
            className={`px-5 h-8.5 rounded-lg text-[11px] font-bold tracking-[2px] uppercase transition-all cursor-pointer ${
              isRetrieve ? "bg-[#8aac62] text-white" : "text-[#7c6f63] dark:text-[#888888]"
            }`}
          >
            ↓ Retrieve
          </button>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
}