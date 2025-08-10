import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export const PasswordInput = ({
  value,
  onChange,
  placeholder = "Enter your password...",
}: PasswordInputProps) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="relative">
      <input
        type={isShowPassword ? "text" : "password"}
        value={value}
        onChange={onChange}
        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 pr-12 text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-pink-400/30 focus:bg-white/10 focus:outline-none"
        placeholder={placeholder}
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 -translate-y-1/2 transform text-white/60 transition-colors duration-200 hover:text-white"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
        onClick={toggleShowPassword}
      >
        {isShowPassword ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
      </button>
    </div>
  );
};
