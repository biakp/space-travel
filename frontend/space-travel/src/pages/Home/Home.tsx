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

interface PlanetProps {
  id: string;
  imageUrl: string;
  isFavorite: boolean;
  story: string;
  title: string;
  userId: string;
  visitedDate: string;
  visitedPlanet: string[];
}

export const Home = () => {
  // State to hold user information
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);
  const [userPlanets, setUserPlanets] = useState<PlanetProps[]>([]);
  const navigate = useNavigate();

  // Fetch user information when the component mounts
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
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

  // Fetch all planets for the user
  const getAllPlanets = async () => {
    try {
      const response = await axiosInstance.get("/get-all-planets");

      setUserPlanets(response.data || []);
    } catch (error) {
      console.error("Error in getAllPlanets:", error);
      setUserPlanets([]);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.error("Bad request - please check your input");
        } else {
          console.error("Error fetching planets:", error.message);
        }
      }
    }
  };

  const updateFavorite = async (planet: PlanetProps) => {
    const planetId = planet.id;
    try {
      // Make API call to update favorite status
      await axiosInstance.put(`/update-favorite/${planetId}`, {
        isFavorite: !planet.isFavorite,
      });

      // Update local state
      setUserPlanets((prevPlanets) =>
        prevPlanets.map((p) =>
          p.id === planetId ? { ...p, isFavorite: !p.isFavorite } : p,
        ),
      );

      // Reload all planets to get updated order (favorites at top)
      await getAllPlanets();
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.error("Bad request");
        } else {
          console.error("Error updating favorite", error.message);
        }
      }
    }
  };

  // Call getUserInfo when the component mounts
  // This ensures that user information is fetched when the Home page is accessed
  // Using useEffect to handle side effects in functional components
  useEffect(() => {
    getUserInfo();
    getAllPlanets();
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />
      <main className="container mx-auto px-6 py-12">
        <div className="flex gap-8">
          <section className="flex-1">
            {userPlanets.length === 0 || !userInfo ? (
              <div className="flex h-64 items-center justify-center">
                <p className="text-gray-500">
                  No planets found. Start your journey!
                </p>
              </div>
            ) : (
              <div className="mb-8">
                <h2 className="mb-6 text-2xl font-semibold text-gray-800">
                  Your Space Journeys
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {userPlanets.map((planet) => (
                    <TravelCard
                      key={planet.id}
                      planet={planet}
                      user={userInfo}
                      onUpdateFavorite={() => updateFavorite(planet)}
                    />
                  ))}
                </div>
              </div>
            )}
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
