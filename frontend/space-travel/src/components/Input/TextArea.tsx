import { useState } from "react";
import { MdAutoAwesome, MdRefresh } from "react-icons/md";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
  enableAI?: boolean; // New prop to enable AI improvement
}

const TextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
  enableAI = false,
}: TextAreaProps) => {
  const [isImproving, setIsImproving] = useState(false);
  const [error, setError] = useState("");

  const handleImproveText = async () => {
    if (!value.trim()) {
      setError("Please enter some text to improve");
      return;
    }

    setIsImproving(true);
    setError("");

    try {
      const response = await axiosInstance.post("/ai", {
        text: value,
      });

      if (response.data?.response) {
        onChange(response.data.response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    } finally {
      setIsImproving(false);
    }
  };

  return (
    <div className="group relative mt-4 sm:mt-6">
      <div className="mb-1.5 flex flex-col gap-2 sm:mb-2 sm:flex-row sm:items-center sm:justify-between">
        <label className="block text-xs font-light uppercase tracking-widest text-pink-300/80 sm:text-sm">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        
        {enableAI && (
          <button
            type="button"
            aria-label="Improve text with AI"
            onClick={handleImproveText}
            disabled={isImproving || !value.trim()}
            className="group/ai flex items-center gap-1.5 rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-400/10 to-pink-400/10 px-2.5 py-1.5 text-xs font-light text-purple-300 transition-all duration-300 hover:scale-105 hover:border-purple-400/50 hover:from-purple-400/20 hover:to-pink-400/20 hover:text-purple-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-3"
          >
            {isImproving ? (
              <>
                <MdRefresh className="animate-spin text-xs sm:text-sm" />
                <span className="hidden sm:inline">IMPROVING...</span>
                <span className="sm:hidden">...</span>
              </>
            ) : (
              <>
                <MdAutoAwesome className="text-xs sm:text-sm" />
                <span className="cursor-pointer">IMPROVE WITH AI</span>
              </>
            )}
          </button>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-cyan-400/10 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`relative w-full rounded-2xl border ${error || error ? "border-red-400/50" : "border-white/10"} resize-none bg-white/5 px-3 py-2.5 text-sm text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-pink-400/30 focus:bg-white/10 focus:outline-none sm:px-4 sm:py-3 sm:text-base`}
          placeholder={placeholder}
        />
      </div>

      {/* Error Messages */}
      {error && (
        <p className="mt-1 text-xs font-light text-red-300 sm:mt-1.5 sm:text-sm" aria-live="polite">{error}</p>
      )}
    </div>
  );
};

export default TextArea;