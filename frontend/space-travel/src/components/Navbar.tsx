import ProfileInfo from "../components/Card/ProfileInfo";
import { useNavigate } from "react-router-dom";

// Define the UserInfoProps interface to type the user information
interface UserInfoProps {
  created_at: string;
  email: string;
  fullName: string;
  id: string;
  password: string;
  updated_at: string;
}

interface NavbarProps {
  userInfo: UserInfoProps | null;
}

export function Navbar({ userInfo }: NavbarProps) {
  const navigate = useNavigate();
  const isToken = localStorage.getItem("token");
  const showProfileInfo = isToken && userInfo;

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-2 px-6 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <div className="hidden md:block">
          <h1 className="text-2xl font-bold tracking-wide text-white">
            Space Travel
          </h1>
          <p className="text-sm text-indigo-100">Explore the Universe</p>
        </div>
      </div>

      {showProfileInfo && (
        <div className="flex items-center space-x-4">
          <div className="hidden items-center space-x-6 text-white/90 lg:flex">
            {/* TO-DO: Navigation Links */}
            <button className="cursor-pointer font-medium transition-colors duration-200 hover:text-white">
              Dashboard
            </button>
            <button className="cursor-pointer font-medium transition-colors duration-200 hover:text-white">
              Favorites
            </button>
          </div>
          <div className="rounded-xl border border-white/20 bg-white/10 p-2 shadow-lg backdrop-blur-sm">
            <ProfileInfo userInfo={userInfo} onLogout={handleLogout} />
          </div>
        </div>
      )}
    </nav>
  );
}
