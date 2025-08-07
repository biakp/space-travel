interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const TextInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  error,
  required = false,
}: TextInputProps) => {
  return (
    <div className="group relative mt-6">
      <label className="mb-2 block text-sm font-light uppercase tracking-widest text-cyan-300/80">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`relative w-full rounded-2xl border ${error ? "border-red-400/50" : "border-white/10"} bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-cyan-400/30 focus:bg-white/10 focus:outline-none`}
          placeholder={placeholder}
        />
      </div>
      {error && (
        <p className="mt-1.5 text-sm font-light text-red-300">{error}</p>
      )}
    </div>
  );
};

export default TextInput;
