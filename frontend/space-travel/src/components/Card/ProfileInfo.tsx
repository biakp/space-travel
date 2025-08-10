import { getInitials } from "../../utils/helper";

interface UserInfoProps {
  created_at: string;
  email: string;
  fullName: string;
  id: string;
  password: string;
  updated_at: string;
}

interface ProfileInfoProps {
  userInfo: UserInfoProps;
  onLogout: () => void;
}

function ProfileInfo({ userInfo, onLogout }: ProfileInfoProps) {
  return (
    <div className="flex items-center gap-3 sm:gap-4">
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-30 blur"></div>
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-xs font-bold text-white shadow-xl ring-2 ring-white/20 sm:h-14 sm:w-14 sm:text-base">
          {getInitials(userInfo.fullName)}
        </div>
      </div>

      <div className="flex flex-col">
        <p className="max-w-[100px] truncate text-xs font-bold text-white sm:max-w-[140px] sm:text-sm">
          {userInfo.fullName || "Space Explorer"}
        </p>
        <p className="text-xs text-blue-300/80">Commander</p>
        <button
          className="mt-1 cursor-pointer text-left text-xs font-medium text-purple-300 transition-all duration-200 hover:text-pink-300 hover:underline"
          aria-label="Sign out"
          onClick={onLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
