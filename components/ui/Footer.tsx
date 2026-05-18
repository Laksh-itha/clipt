export default function Footer() {
  return (
    <footer className="w-full px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-[#e5d9ce] dark:border-[#1c1c2e] bg-[#faf6f1] dark:bg-[#09090f] mt-auto">
      <p className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-[#b0a090] dark:text-[#444444] text-center sm:text-left">
        CLIPT &copy; 2026 — Drop. Code. Access.
      </p>
      <div className="flex items-center gap-4">
        <a
          href="/docs"
          className="text-[10px] sm:text-[11px] font-semibold tracking-widest uppercase text-[#b0a090] dark:text-[#444444] hover:text-[#7a6a5e] dark:hover:text-[#888888] transition-colors"
        >
          Docs
        </a>
      </div>
    </footer>
  );
}
