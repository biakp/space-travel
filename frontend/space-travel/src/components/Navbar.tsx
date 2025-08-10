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
    <nav className="relative border-b border-white/10 bg-white/5 px-6 py-4 backdrop-blur-2xl">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-pink-400/5"></div>

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <h1 className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-3xl font-extralight text-transparent">
                Stellar Vault
              </h1>
              <div className="h-px w-24 bg-gradient-to-r from-cyan-400/50 via-purple-400/50 to-transparent"></div>
            </div>
          </div>
        </div>

        {showProfileInfo && (
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 blur"></div>
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl">
                <ProfileInfo userInfo={userInfo} onLogout={handleLogout} />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
