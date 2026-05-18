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

export default function ClipViewer({
  mode, setMode, file, setFile, preview, setPreview, textContent, setTextContent,
}: Props) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const f = acceptedFiles[0];
      if (!f) return;
      setFile(f);
      if (f.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(f));
      } else {
        setPreview("");
      }
    },
    accept: { "image/*": [], "application/pdf": [] },
    multiple: false,
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div className="w-full">

      <div className="text-left w-full mb-6">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-[#3a3028] dark:text-[#e8e8f4] leading-tight">
          Drop anything.
        </h1>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight text-[#8aac62] leading-tight">
          Share everywhere.
        </h1>
        <p className="text-[#b0a090] dark:text-[#888888] text-sm sm:text-lg mt-2 font-medium tracking-wide">
          Upload an image or paste text, set your own unique code, and access it on any device anywhere.
        </p>
      </div>

      <div className="flex gap-3 sm:gap-4 mb-5">
        <button
          onClick={() => setMode("image")}
          type="button"
          className={`flex-1 py-3 text-xs font-semibold tracking-widest uppercase border rounded-lg transition ${
            mode === "image"
              ? "border-green-500 bg-green-100 dark:bg-green-900/30 text-[#5a7a4a]"
              : "border-[#e5d9ce] dark:border-[#1c1c2e] text-[#7a6a5e] dark:text-[#888888]"
          }`}
        >
          🖼️ Image
        </button>
        <button
          onClick={() => setMode("text")}
          type="button"
          className={`flex-1 py-3 text-xs font-semibold tracking-widest uppercase border rounded-lg transition ${
            mode === "text"
              ? "border-green-500 bg-green-100 dark:bg-green-900/30 text-[#5a7a4a]"
              : "border-[#e5d9ce] dark:border-[#1c1c2e] text-[#7a6a5e] dark:text-[#888888]"
          }`}
        >
          ✏️ Text
        </button>
      </div>

      {mode === "image" ? (
        <div
          {...getRootProps()}
          className={`w-full h-56 sm:h-70 border rounded-lg cursor-pointer flex items-center justify-center bg-white/50 dark:bg-[#0f0f1a] transition relative overflow-hidden ${
            isDragActive
              ? "border-green-500 bg-green-50"
              : "border-[#e5d9ce] dark:border-[#1c1c2e]"
          }`}
        >
          <input {...getInputProps()} />

          {file ? (
            <div className="relative w-full h-full">

              {file.type.startsWith("image/") && preview && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover rounded-lg"
                />
              )}

              {file.type === "application/pdf" && (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 dark:bg-[#13131e] rounded-lg gap-3">
                  <div className="text-6xl">📄</div>
                  <p className="text-sm font-semibold text-[#3a3028] dark:text-[#e8e8f4] normal-case tracking-normal px-4 text-center">
                    {file.name}
                  </p>
                  <p className="text-xs text-[#b0a090] dark:text-[#888888] normal-case">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 text-xs font-semibold tracking-wide uppercase">
                    PDF ready to upload
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setFile(null); setPreview(""); }}
                className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-md text-xs font-medium"
              >
                🗑 Delete
              </button>
              <span className="absolute top-3 right-3 bg-green-200 text-gray-700 px-3 py-1 rounded-md text-xs font-medium">
                Click to change
              </span>
            </div>
          ) : (
            <div className="text-center px-4">
              <p className="text-4xl mb-4">🖼️</p>
              <p className="text-[#7a6a5e] dark:text-[#888888] font-semibold text-sm tracking-widest uppercase">
                Drag & drop or click to upload
              </p>
              <p className="text-[#b0a090] dark:text-[#888888] text-xs mt-2">
                PNG · JPG · GIF · WEBP · PDF — up to 20MB
              </p>
            </div>
          )}
        </div>
      ) : (
        <textarea
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          placeholder="Paste or type your text here..."
          className="w-full h-56 sm:h-70 bg-white/50 dark:bg-[#0f0f1a] border border-[#e5d9ce] dark:border-[#1c1c2e] text-[#3a3028] dark:text-[#e8e8f4] placeholder:text-[#b0a090] rounded-xl p-4 resize-none outline-none focus:border-[#5a7a4a] transition-colors"
        />
      )}
    </div>
  );
}