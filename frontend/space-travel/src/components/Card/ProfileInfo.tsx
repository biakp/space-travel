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
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-medium text-indigo-950">
        {getInitials(userInfo.fullName)}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo.fullName || ""}</p>
        <button
          className="cursor-pointer text-sm text-indigo-700 underline"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
