"use client";
import { useDropzone } from "react-dropzone";

interface Props {
  mode: "image" | "text";
  setMode: (mode: "image" | "text") => void;
  file: File | null;
  setFile: (f: File | null) => void;
  preview: string;
  setPreview: (p: string) => void;
  textContent: string;
  setTextContent: (val: string) => void;
}

export default function ClipViewer({ mode, setMode, file, setFile, preview, setPreview, textContent, setTextContent }: Props) {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const f = acceptedFiles[0];
      if (!f) return;
      setFile(f);
      setPreview(URL.createObjectURL(f));
    },
    accept: { "image/*": [], "application/pdf": [] },
    multiple: false,
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div>
      <div className="text-left w-150 mb-6">
        <h1 className="text-7xl font-black tracking-tight text-[#3a3028] dark:text-[#e8e8f4] leading-tight">Drop anything.</h1>
        <h1 className="text-7xl font-black tracking-tight text-[#8aac62] leading-tight">Share everywhere.</h1>
        <p className="text-[#b0a090] dark:text-[#888888] text-lg mt-2 font-medium tracking-wide">
          Upload an image or paste text, set your own unique code, and access it on any device anywhere.
        </p>
      </div>

      <div className="flex gap-25 mb-5">
        <button onClick={() => setMode("image")} type="button"
          className={`w-62.5 py-3 text-xs font-semibold tracking-widest uppercase border rounded-lg transition ${
            mode === "image" ? "border-green-500 bg-green-100 dark:bg-green-900/30 text-[#5a7a4a]" : "border-[#e5d9ce] text-[#7a6a5e]"
          }`}>
          🖼️ Image
        </button>
        <button onClick={() => setMode("text")} type="button"
          className={`w-62.5 py-3 text-xs font-semibold tracking-widest uppercase border rounded-lg transition ${
            mode === "text" ? "border-green-500 bg-green-100 dark:bg-green-900/30 text-[#5a7a4a]" : "border-[#e5d9ce] text-[#7a6a5e]"
          }`}>
          ✏️ Text
        </button>
      </div>

      {mode === "image" ? (
        <div {...getRootProps()} className={`w-150 h-70 border rounded-lg cursor-pointer flex items-center justify-center bg-white/50 dark:bg-[#0f0f1a] transition relative overflow-hidden ${
          isDragActive ? "border-green-500 bg-green-50" : "border-[#e5d9ce]"
        }`}>
          <input {...getInputProps()} />
          {file && preview ? (
            <div className="relative w-full h-full">
              <img src={preview} alt="preview" className="w-full h-full object-cover rounded-lg" />
              <button type="button"
                onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(""); }}
                className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-medium">
                🗑 Delete
              </button>
              <span className="absolute top-3 right-3 bg-green-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                Click to change
              </span>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-4xl mb-4">🖼️</p>
              <p className="text-[#7a6a5e] font-semibold text-sm tracking-widest uppercase">Drag & drop or click to upload</p>
              <p className="text-[#b0a090] text-xs mt-2">PNG · JPG · GIF · WEBP · PDF — up to 20MB</p>
            </div>
          )}
        </div>
      ) : (
        <textarea
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-150 h-70 bg-white/50 dark:bg-[#0f0f1a] border border-[#e5d9ce] text-[#3a3028] dark:text-[#e8e8f4] placeholder:text-[#b0a090] rounded-xl p-4 resize-none outline-none focus:border-[#5a7a4a] transition-colors"
        />
      )}
    </div>
  );
}