export default function DocsPage() {
  return (
    <div className="min-h-screen bg-[#faf6f1] dark:bg-[#09090f] px-6 py-16">
      
      <div className="max-w-4xl mx-auto">

        <div className="mb-14">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#8aac62] font-bold">
            Documentation
          </p>

          <h1 className="mt-4 text-5xl font-black tracking-tight text-[#2a1f16] dark:text-[#e8e8f4]">
            How CLIPT works.
          </h1>

          <p className="mt-5 text-[#7a6a5e] dark:text-[#888888] text-base leading-relaxed max-w-2xl">
            CLIPT lets you instantly share text, code, images, and files using
            short unique access codes. No accounts. No friction.
          </p>
        </div>

        <div className="space-y-6">

          <div className="rounded-3xl border border-[#e5d9ce] dark:border-[#1c1c2e] bg-white/50 dark:bg-[#0f0f1a] p-8">
            <h2 className="text-2xl font-bold text-[#2a1f16] dark:text-[#e8e8f4]">
              1. Create a clip
            </h2>

            <p className="mt-3 text-[#7a6a5e] dark:text-[#888888] leading-relaxed">
              Upload a file, paste code, or write text. Then choose a unique
              access code and an expiry duration.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e5d9ce] dark:border-[#1c1c2e] bg-white/50 dark:bg-[#0f0f1a] p-8">
            <h2 className="text-2xl font-bold text-[#2a1f16] dark:text-[#e8e8f4]">
              2. Share the code
            </h2>

            <p className="mt-3 text-[#7a6a5e] dark:text-[#888888] leading-relaxed">
              Anyone with the access code or QR link can instantly retrieve your
              clip from any device.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e5d9ce] dark:border-[#1c1c2e] bg-white/50 dark:bg-[#0f0f1a] p-8">
            <h2 className="text-2xl font-bold text-[#2a1f16] dark:text-[#e8e8f4]">
              3. Automatic expiry
            </h2>

            <p className="mt-3 text-[#7a6a5e] dark:text-[#888888] leading-relaxed">
              Clips can expire after 1 hour, 1 day, 1 week, or never — depending
              on what you choose while creating the clip.
            </p>
          </div>

          <div className="rounded-3xl border border-[#e5d9ce] dark:border-[#1c1c2e] bg-white/50 dark:bg-[#0f0f1a] p-8">
            <h2 className="text-2xl font-bold text-[#2a1f16] dark:text-[#e8e8f4]">
              Supported clip types
            </h2>

            <div className="mt-5 flex flex-wrap gap-3">
              {[
                "Text",
                "Code",
                "Images",
                "PDF",
                "Files",
                "QR Sharing",
              ].map((item) => (
                <div
                  key={item}
                  className="px-4 py-2 rounded-full bg-[#f5eee6] dark:bg-[#13131e] border border-[#e5d9ce] dark:border-[#1c1c2e] text-sm font-medium text-[#7a6a5e] dark:text-[#888888]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}