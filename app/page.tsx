"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import CodeInput from "@/components/ui/CodeInput";
import DateExpiry from "@/components/ui/DateExpiry";
import ClipViewer from "@/components/ui/ClipViewer";

export default function Home() {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [mode, setMode] = useState<"image" | "text">("image");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [textContent, setTextContent] = useState("");
  const [expiry, setExpiry] = useState("1d");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (status !== "available") return;
    if (mode === "image" && !file) { setError("Please upload a file first."); return; }
    if (mode === "text" && !textContent.trim()) { setError("Please enter some text first."); return; }

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("code", code);
      formData.append("expiry", expiry);

      if (mode === "image" && file) {
        formData.append("type", file.type === "application/pdf" ? "pdf" : "image");
        formData.append("file", file);
      } else {
        formData.append("type", "text");
        formData.append("content", textContent);
      }

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) { setError(data.error || "Upload failed."); setLoading(false); return; }

      router.push(`/qrdisplay?code=${code}&expiry=${expiry}`);
    } catch {
      setError("Network error. Try again.");
      setLoading(false);
    }
  };

  return (
    <main className="p-10 flex flex-col items-center bg-[#faf6f1] dark:bg-[#09090f]">
      <ClipViewer
        mode={mode}
        setMode={setMode}
        file={file}
        setFile={setFile}
        preview={preview}
        setPreview={setPreview}
        textContent={textContent}
        setTextContent={setTextContent}
      />
      <br />
      <CodeInput code={code} setCode={setCode} status={status} setStatus={setStatus} />
      <br />
      <DateExpiry code={code} status={status} expiry={expiry} setExpiry={setExpiry} onSubmit={handleSubmit} loading={loading} />
      {error && <p className="text-red-400 text-xs font-semibold mt-3 tracking-wide">✗ {error}</p>}
    </main>
  );
}