"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface Clip {
  type: string;
  file_url?: string;
  content?: string;
  language?: string;
  label?: string;
  expires_at?: string;
  code: string;
}

export default function ClipPage() {
  const { code } = useParams();
  const [clip, setClip] = useState<Clip | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchClip = async () => {
      const res = await fetch(`/api/retrieve?code=${code}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Clip not found");
        return;
      }
      setClip(data.clip);
    };
    fetchClip();
  }, [code]);

  const copyContent = () => {
    if (!clip) return;
    if (clip.type === "text" || clip.type === "code") {
      navigator.clipboard.writeText(clip.content || "");
    } else {
      navigator.clipboard.writeText(clip.file_url || "");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    if (!clip?.file_url) return;
    try {
      const response = await fetch(clip.file_url);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `clipt-${String(code)}.${clip.type === "pdf" ? "pdf" : "png"}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      alert("Download failed. Try again.");
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <p className="text-4xl mb-4">🔍</p>
        <h2 className="text-xl font-black text-[#3a3028] mb-2">Clip not found</h2>
        <p className="text-[#b0a090] text-sm">{error}</p>
      </div>
    );
  }

  if (!clip) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <p className="text-[#b0a090] text-sm tracking-widest uppercase animate-pulse">
          Loading clip...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-2xl space-y-4">

        <div className="flex items-center justify-between">
          <div>
            {clip.label && (
              <p className="text-xs font-semibold tracking-widest uppercase text-[#b0a090]">
                {clip.label}
              </p>
            )}
            <p className="text-xl font-black tracking-widest uppercase text-[#3a3028] dark:text-[#e8e8f4]">
              {String(code)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {clip.expires_at && (
              <span className="text-xs text-[#b0a090] tracking-wide">
                ⏱ Expires {new Date(clip.expires_at).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>

        <div className="border border-[#e5d9ce] rounded-xl overflow-hidden bg-white/50 dark:bg-[#0f0f1a]">
          {clip.type === "image" && clip.file_url && (
            <img
              src={clip.file_url}
              alt={clip.label || "clip"}
              className="w-full object-contain max-h-150"
            />
          )}
          {clip.type === "pdf" && clip.file_url && (
            <div className="w-full p-8 flex flex-col items-center gap-4">
              <div className="text-6xl">📄</div>
              <p className="text-sm font-semibold text-[#3a3028] dark:text-[#e8e8f4] text-center">
                PDF Document
              </p>
              <p className="text-xs text-[#b0a090]">
                Click download to save this PDF
              </p>
            </div>
          )}
          {clip.type === "text" && (
            <div className="p-6 whitespace-pre-wrap text-[#3a3028] dark:text-[#e8e8f4] text-sm leading-relaxed font-mono">
              {clip.content}
            </div>
          )}
          {clip.type === "code" && (
            <pre className="p-6 overflow-x-auto text-sm">
              <code className="text-green-700 dark:text-green-400">{clip.content}</code>
            </pre>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={copyContent}
            className="flex-1 h-11 border border-[#e5d9ce] dark:border-[#1c1c2e] rounded-xl text-xs font-bold tracking-widest uppercase text-[#7a6a5e] dark:text-[#888888] hover:bg-[#f0ebe4] dark:hover:bg-[#13131e] transition-colors"
          >
            {copied ? "✓ Copied!" : "📋 Copy"}
          </button>
          {(clip.type === "image" || clip.type === "pdf") && clip.file_url && (
            <button
              onClick={handleDownload}
              className="flex-1 h-11 border border-[#e5d9ce] dark:border-[#1c1c2e] rounded-xl text-xs font-bold tracking-widest uppercase text-[#7a6a5e] dark:text-[#888888] hover:bg-[#f0ebe4] dark:hover:bg-[#13131e] transition-colors flex items-center justify-center"
            >
              ⬇ Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
}