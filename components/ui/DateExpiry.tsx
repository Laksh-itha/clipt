"use client";

interface Props {
  code: string;
  status: string;
  expiry: string;
  setExpiry: (val: string) => void;
  onSubmit: () => void;
  loading: boolean;
}

export default function DateExpiry({ code, status, expiry, setExpiry, onSubmit, loading }: Props) {
  const isValidCode = code.length >= 4 && status === "available";

  return (
    <div className="w-full space-y-4">

      <div className="w-full p-4 border border-[#e5d9ce] dark:border-[#1c1c2e] bg-white/50 dark:bg-[#0f0f1a] rounded-lg">
        <p className="text-sm font-semibold tracking-widest uppercase text-[#7a6a5e] dark:text-[#888888] mb-2">
          Expires After
        </p>
        <select
          className="text-sm px-2 font-semibold tracking-widest uppercase text-[#b0a090] dark:text-[#888888] bg-transparent dark:bg-[#0f0f1a] w-full rounded-lg h-9 border border-[#e5d9ce] dark:border-[#1c1c2e] cursor-pointer"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        >
          <option value="1h">1 Hour</option>
          <option value="1d">1 Day</option>
          <option value="1w">7 Days</option>
          <option value="never">Never</option>
        </select>
      </div>

      <div className="mb-10">
        <button
          onClick={onSubmit}
          disabled={!isValidCode || loading}
          className={`mt-2 w-full p-3 text-sm font-semibold tracking-widest uppercase rounded-lg transition ${
            isValidCode && !loading
              ? "bg-green-100 dark:bg-green-900/30 text-[#7a6a5e] dark:text-[#c8f542] cursor-pointer hover:bg-green-200"
              : "bg-[#f5eee6] dark:bg-[#13131e] text-[#b0a090] dark:text-[#888888] cursor-not-allowed"
          }`}
        >
          {loading
            ? "Uploading..."
            : status === "checking"
            ? "Checking availability..."
            : isValidCode
            ? "Create Clip →"
            : "Enter your code above →"}
        </button>
      </div>
    </div>
  );
}
