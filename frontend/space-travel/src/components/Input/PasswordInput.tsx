import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface PasswordInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <input
        value={value}
        onChange={onChange}
        type={isShowPassword ? "text" : "password"}
        placeholder="Enter your password"
        className="w-full rounded-lg border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {isShowPassword ? (
        <FaRegEye
          onClick={() => setIsShowPassword(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer"
        />
      ) : (
        <FaRegEyeSlash
          onClick={() => setIsShowPassword(true)}
          className="absolute right-2 top-1/2 -translate-y-1/2 transform cursor-pointer"
        />
      )}
    </div>
  );
};
