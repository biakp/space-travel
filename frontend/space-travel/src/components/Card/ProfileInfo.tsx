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
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-pink-100 font-semibold text-indigo-700 shadow-md ring-2 ring-white/50">
        {getInitials(userInfo.fullName)}
      </div>

      <div className="flex flex-col">
        <p className="max-w-[120px] truncate text-sm font-semibold text-white">
          {userInfo.fullName || ""}
        </p>
        <button
          className="cursor-pointer text-left text-xs font-medium text-indigo-100 transition-colors duration-200 hover:text-white hover:underline"
          onClick={onLogout}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
