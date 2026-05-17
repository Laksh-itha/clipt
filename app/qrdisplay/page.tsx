"use client";
import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";


function QRContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get("code") || "ERROR";
  const expiry = searchParams.get("expiry") || "Never";
  const codeArray = code.toUpperCase().split("");
  const [codeCopied, setCodeCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const clipLink = typeof window !== "undefined" ? `${window.location.origin}/clip/${code}` : "";

  const handleCopyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(clipLink);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector("canvas");
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `clipt-${code}-qr.png`;
    a.click();
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-15 bg-[#faf6f1] dark:bg-[#09090f]">
      <div className="border border-green-400 rounded-full w-15 h-15 flex items-center justify-center text-center bg-green-100 dark:bg-green-900/30">
        ✓
      </div>
      <p className="font-bold text-2xl mt-4 font-[Syne] text-[#1d2b36] dark:text-[#e8e8f4]">
        Your clip is live!
      </p>
      <p className="text-[#7a6a5e] dark:text-[#888888] text-sm mt-2 text-center">
        Share your code — anyone with it can access your clip instantly
      </p>

      <div className="w-full max-w-xl bg-white/50 dark:bg-[#0f0f1a] border border-[#e5d9ce]  rounded-3xl mt-10 p-10">
        <p className="text-center text-xs tracking-[0.4em] uppercase text-[#b0a090] dark:text-[#888888] font-semibold">
          Your Access Code
        </p>
        <div className="flex justify-center gap-4 mt-8">
          {codeArray.map((letter, index) => (
            <div key={index} className="w-16 h-20 rounded-2xl border border-[#e5d9ce]  dark:bg-[#13131e] flex items-center justify-center text-4xl font-black text-green-700 dark:text-[#c8f542]">
              {letter}
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <div className="px-5 py-2 rounded-full  dark:bg-[#13131e] text-[#7a6a5e] dark:text-[#888888] border border-[#e5d9ce] bg-white/50 text-sm font-medium">
            {expiry}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-3 w-full max-w-xl">
        <button onClick={handleCopyCode}
          className={`flex-1 h-12 rounded-lg cursor-pointer transition font-medium border ${
            codeCopied ? "bg-green-500 text-white border-green-500" : "bg-white/50 dark:bg-[#13131e] text-[#7a6a5e] dark:text-[#888888] border-[#e5d9ce] "
          }`}>
          {codeCopied ? "✓ Copied!" : "🗒️ Copy Code"}
        </button>
        <button onClick={handleCopyLink}
          className={`flex-1 h-12 rounded-lg cursor-pointer transition font-medium border ${
            linkCopied ? "bg-green-500 text-white border-green-500" : "bg-white/50 dark:bg-[#13131e] text-[#7a6a5e] dark:text-[#888888] border-[#e5d9ce] "
          }`}>
          {linkCopied ? "✓ Copied!" : "🖇️ Copy Link"}
        </button>
      </div>

      <div className="w-full max-w-xl bg-white/50 dark:bg-[#0f0f1a] border border-[#e5d9ce]  rounded-3xl mt-4 p-6 flex items-center gap-6">
        <QRCodeCanvas value={clipLink} size={160} bgColor="#fdf3eb" fgColor="#2a1f16" level="H" includeMargin className="rounded-xl shrink-0" />
        <div className="flex flex-col gap-2">
          <p className="text-[#2a1f16] dark:text-[#e8e8f4] font-semibold text-sm">QR Code</p>
          <p className="text-[#7a6a5e] dark:text-[#888888] text-xs leading-relaxed">
            Scan this with any phone camera to open your clip instantly — no typing needed.
          </p>
          <button onClick={handleDownloadQR}
            className="mt-2 px-4 py-2 rounded-lg border border-[#e5d9ce]  bg-white/50 dark:bg-[#13131e] text-[#7a6a5e] dark:text-[#888888] text-xs font-medium hover:bg-[#ede3d8] dark:hover:bg-[#1c1c2e] transition w-fit">
            ⬇ Download QR
          </button>
        </div>
      </div>
      <button
  onClick={() => router.push("/")}
  className="mt-6 px-8 h-12 mb-6 text-decoration-line: underline rounded-xl cursor-pointer text-[#7a6a5e] dark:text-[#888888]
  font-semibold tracking-wide
  hover:scale-[1.02]
  transition"
>
  Create Another Clip
</button>
    </div>
    
  );
}



export default function QRDisplay() {
 return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-[#b0a090] animate-pulse text-sm tracking-widest uppercase">Loading...</p>
      </div>
    }>
      <QRContent />
    </Suspense>
  );
}