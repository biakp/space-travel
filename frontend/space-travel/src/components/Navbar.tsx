import Logo from "../assets/logo.png";
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
    <nav className="sticky top-0 z-10 flex items-center justify-between bg-white px-6 py-2 drop-shadow">
      <img src={Logo} alt="space-travel-logo" className="h-11" />

      {showProfileInfo && (
        <ProfileInfo userInfo={userInfo} onLogout={handleLogout} />
      )}
    </nav>
  );
}
