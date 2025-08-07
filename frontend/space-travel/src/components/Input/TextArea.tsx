interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: string;
  required?: boolean;
}

const TextArea = ({
  label,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  error,
  required = false,
}: TextAreaProps) => {
  return (
    <div className="group relative mt-6">
      <label className="mb-2 block text-sm font-light uppercase tracking-widest text-pink-300/80">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-cyan-400/10 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`relative w-full rounded-2xl border ${error ? "border-red-400/50" : "border-white/10"} resize-none bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-pink-400/30 focus:bg-white/10 focus:outline-none`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm font-light text-red-300">{error}</p>
      )}
    </div>
  );
};

export default TextArea;
