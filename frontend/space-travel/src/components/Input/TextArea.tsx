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
    <div className="group relative mt-6">
      <div className="mb-2 flex items-center justify-between">
        <label className="block text-sm font-light uppercase tracking-widest text-pink-300/80">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
        
        {enableAI && (
          <button
            type="button"
            aria-label="Improve text with AI"
            onClick={handleImproveText}
            disabled={isImproving || !value.trim()}
            className="group/ai flex items-center gap-2 rounded-xl border border-purple-400/30 bg-gradient-to-r from-purple-400/10 to-pink-400/10 px-3 py-1.5 text-xs font-light text-purple-300 transition-all duration-300 hover:scale-105 hover:border-purple-400/50 hover:from-purple-400/20 hover:to-pink-400/20 hover:text-purple-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isImproving ? (
              <>
                <MdRefresh className="animate-spin text-sm" />
                <span>IMPROVING...</span>
              </>
            ) : (
              <>
                <MdAutoAwesome className="text-sm" />
                <span>IMPROVE WITH AI</span>
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
          className={`relative w-full rounded-2xl border ${error || error ? "border-red-400/50" : "border-white/10"} resize-none bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-pink-400/30 focus:bg-white/10 focus:outline-none`}
          placeholder={placeholder}
        />
      </div>

      {/* Error Messages */}
      {error && (
        <p className="mt-1.5 text-sm font-light text-red-300" aria-live="polite">{error}</p>
      )}
    </div>
  );
};

export default TextArea;