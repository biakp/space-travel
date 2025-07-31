import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import TravelCard from "../../components/Card/TravelCard";

interface UserInfoProps {
  created_at: string;
  email: string;
  fullName: string;
  id: string;
  password: string;
  updated_at: string;
}

export const Home = () => {
  // State to hold user information
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);
  const navigate = useNavigate();

  // Fetch user information when the component mounts
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        console.log(userInfo);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login"); // Redirect to login page if unauthorized
        }
      }
    }
  };

  // Call getUserInfo when the component mounts
  // This ensures that user information is fetched when the Home page is accessed
  // Using useEffect to handle side effects in functional components
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <main className="container mx-auto px-6 py-12">
        <div className="flex gap-8">
          <section className="flex-1">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TravelCard />
              <TravelCard />
              <TravelCard />
              <TravelCard />
            </div>
          </section>

          <aside className="w-80 flex-shrink-0">
            <div className="rounded-xl border border-gray-100 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg">
              <h2 className="mb-6 text-lg font-semibold text-gray-800">
                User Information
              </h2>
              {userInfo ? (
                <div className="space-y-4">
                  <div className="border-b border-gray-200 pb-3">
                    <p className="mb-1 text-sm text-gray-600">Full Name</p>
                    <p className="font-medium text-gray-900">
                      {userInfo.fullName}
                    </p>
                  </div>
                  <div className="border-b border-gray-200 pb-3">
                    <p className="mb-1 text-sm text-gray-600">Email</p>
                    <p className="break-words font-medium text-gray-900">
                      {userInfo.email}
                    </p>
                  </div>
                  <div className="pb-2">
                    <p className="mb-1 text-sm text-gray-600">Member Since</p>
                    <p className="font-medium text-gray-900">
                      {new Date(userInfo.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <div className="flex animate-pulse space-x-2">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="h-2 w-2 animate-bounce rounded-full bg-indigo-400"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                  <p className="ml-3 text-gray-600">
                    Loading user information...
                  </p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
    </>
  );
};
