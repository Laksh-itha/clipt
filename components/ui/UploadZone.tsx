"use client";
import { useDropzone } from "react-dropzone";
import { useState, useEffect } from "react";

interface Props {
  onFile: (file: File) => void;
}

export default function UploadZone({ onFile }: Props) {
  const [preview, setPreview] = useState("");
  const [textContent, setTextContent] = useState("");
  const [fileType, setFileType] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [sizeError, setSizeError] = useState("");

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    console.log("File received:", file.name, file.type);
    setSizeError("");
    setFiles(acceptedFiles);
    if (file.type.startsWith("image/")) {
      setFileType("image");
      setPreview(URL.createObjectURL(file));
    } else if (file.type === "application/pdf") {
      setFileType("pdf");
      setPreview(URL.createObjectURL(file));
    } else if (file.type.startsWith("text/")) {
      setFileType("text");
      const reader = new FileReader();
      reader.onload = (e) => setTextContent(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles([]);
    setPreview("");
    setTextContent("");
    setFileType("");
    setSizeError("");
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: (rejectedFiles) => {
      const error = rejectedFiles[0]?.errors[0];
      if (error?.code === "file-too-large") {
        setSizeError("File too large — max 20MB");
      } else {
        setSizeError("File type not supported");
      }
      setTimeout(() => setSizeError(""), 3000);
    },
    accept: {
      "image/*": [],
      "application/pdf": [],
      "text/*": [],
    },
    multiple: false,
    maxSize: 20 * 1024 * 1024,
  });

  return (
    <div >
      <div
        {...getRootProps()}
        className={`p-4 w-150 border border-[#e5d9ce] bg-white/50 dark:bg-[#0f0f1a] rounded-lg  cursor-pointer text-xs h-70 font-semibold tracking-widest uppercase text-gray-400 transition-colors ${
          isDragActive ? "border-green-500 bg-green-50" : "border border-[#e5d9ce]"
        }`}
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <div className="relative w-full h-full">
            {fileType === "image" && preview && (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-xl"
              />
            )}

            {fileType === "pdf" && preview && (
              <iframe
                src={preview}
                className="w-full h-full rounded-xl"
                title="PDF Preview"
              />
            )}

            {fileType === "text" && (
              <div className="w-full h-full overflow-auto rounded-xl bg-gray-50 p-3">
                <pre className="text-xs text-gray-700 font-mono normal-case whitespace-pre-wrap wrap-break-word">
                  {textContent}
                </pre>
              </div>
            )}

            <button
              type="button"
              className="absolute top-3 right-3 bg-green-200 px-3 py-1 rounded-md text-xs font-medium text-gray-700 shadow opacity-100"
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
          <div className="text-center">
            <div className="text-4xl mb-4 mt-12">🖼️</div>
            <p className="text-lg text-[#7a6a5e]">Drag & drop your image here</p>
            <p className="text-sm text-[#b0a090]">or click to browse files</p>
            <p className="text-xs mt-2 text-[#b0a090]">PNG · JPG · GIF · WEBP · PDF — up to 20MB</p>
          </div>
        )}
      </div>

      {sizeError && (
        <p className="text-[#7a6a5e] text-xs mt-2 text-center">{sizeError}</p>
      )}
    </div>
  );
}