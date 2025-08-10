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
    <nav className="relative border-b border-white/10 bg-white/5 px-4 py-3 backdrop-blur-2xl sm:px-6 sm:py-4">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-pink-400/5"></div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="block">
              <h1 className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-xl font-extralight text-transparent sm:text-2xl md:text-3xl">
                <span className="hidden sm:inline">Stellar Vault</span>
                <span className="sm:hidden">SV</span>
              </h1>
              <div className="h-px w-12 bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-transparent sm:w-16 md:w-24"></div>
            </div>
          </div>
        </div>

        {showProfileInfo && (
          <div className="flex items-center space-x-3 sm:space-x-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur sm:rounded-2xl"></div>
              <div className="relative rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-xl sm:rounded-2xl sm:p-3">
                <ProfileInfo userInfo={userInfo} onLogout={handleLogout} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
