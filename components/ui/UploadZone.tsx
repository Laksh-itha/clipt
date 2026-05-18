"use client";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

interface Props {
  onFile: (file: File) => void;
}

export default function UploadZone({ onFile }: Props) {
  const [preview, setPreview] = useState("");
  const [fileType, setFileType] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [sizeError, setSizeError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setSizeError("");
    setUploadedFile(file);
    onFile(file);

    if (file.type.startsWith("image/")) {
      setFileType("image");
      setPreview(URL.createObjectURL(file));
    } else if (file.type === "application/pdf") {
      setFileType("pdf");
      setPreview("");
    } else if (file.type.startsWith("text/")) {
      setFileType("text");
      setPreview("");
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadedFile(null);
    setPreview("");
    setFileType("");
    setSizeError("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    useFsAccessApi: false,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
      "application/pdf": [".pdf"],
      "text/*": [".txt", ".csv", ".md"],
    },
    multiple: false,
    maxSize: 20 * 1024 * 1024,
    onDropRejected: (rejectedFiles) => {
      const error = rejectedFiles[0]?.errors[0];
      setSizeError(
        error?.code === "file-too-large"
          ? "File too large — max 20MB"
          : "File type not supported"
      );
      setTimeout(() => setSizeError(""), 3000);
    },
  });

  return (
    <div className="w-full">
      <div
        {...getRootProps()}
        className={`w-full border bg-white/50 dark:bg-[#0f0f1a] rounded-lg cursor-pointer text-xs font-semibold tracking-widest uppercase text-gray-400 transition-colors h-64 sm:h-70 ${
          isDragActive
            ? "border-green-500 bg-green-50"
            : "border-[#e5d9ce] dark:border-[#1c1c2e]"
        }`}
      >
        <input {...getInputProps()} />

        {uploadedFile ? (
          <div className="relative w-full h-full">

            {fileType === "image" && preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            )}

            {fileType === "pdf" && (
              <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-gray-50 dark:bg-[#13131e] gap-3">
                <div className="text-6xl">📄</div>
                <p className="text-sm font-semibold text-[#3a3028] dark:text-[#e8e8f4] normal-case tracking-normal px-4 text-center">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-[#b0a090] dark:text-[#888888] normal-case tracking-normal">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
                <span className="px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 text-xs font-semibold tracking-wide uppercase">
                  PDF
                </span>
              </div>
            )}

            {fileType === "text" && (
              <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-gray-50 dark:bg-[#13131e] gap-3">
                <div className="text-6xl">📝</div>
                <p className="text-sm font-semibold text-[#3a3028] dark:text-[#e8e8f4] normal-case tracking-normal px-4 text-center">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-[#b0a090] dark:text-[#888888] normal-case tracking-normal">
                  {(uploadedFile.size / 1024).toFixed(1)} KB
                </p>
                <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-500 text-xs font-semibold tracking-wide uppercase">
                  Text File
                </span>
              </div>
            )}

            <button
              type="button"
              className="absolute top-3 right-3 bg-green-200 px-3 py-1 rounded-md text-xs font-medium text-gray-700 shadow"
            >
              Click to change
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs font-medium shadow transition-colors"
            >
              🗑 Delete
            </button>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center justify-center h-full px-4">
            <div className="text-4xl mb-4">🖼️</div>
            <p className="text-sm sm:text-lg text-[#7a6a5e] dark:text-[#888888]">
              Drag & drop your file here
            </p>
            <p className="text-xs sm:text-sm text-[#b0a090] dark:text-[#888888]">
              or click to browse files
            </p>
            <p className="text-xs mt-2 text-[#b0a090] dark:text-[#888888]">
              PNG · JPG · GIF · WEBP · PDF — up to 20MB
            </p>
          </div>
        )}
      </div>

      {sizeError && (
        <p className="text-red-400 text-xs mt-2 text-center">{sizeError}</p>
      )}
    </div>
  );
}