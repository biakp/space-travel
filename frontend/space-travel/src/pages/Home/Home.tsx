import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import TravelCard from "../../components/Card/TravelCard";
import { ToastContainer, toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import Modal from "react-modal";
import AddEditTravelForm from "./AddEditTravelForm";

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
  imageUrl: string | null;
  isFavorite: boolean;
  story: string;
  title: string;
  userId: string;
  visitedDate: string;
  visitedPlanet: string;
}

interface ModalProps {
  isShow: boolean;
  type: "add" | "edit";
  data: PlanetProps | null;
}

export const Home = () => {
  // State to hold user information
  const [userInfo, setUserInfo] = useState<UserInfoProps | null>(null);
  const [userPlanets, setUserPlanets] = useState<PlanetProps[]>([]);
  const [openAddEditModal, setOpenAddEditModal] = useState<ModalProps>({
    isShow: false,
    type: "add",
    data: null,
  });

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

  // Function to update favorite status of a planet
  // This function toggles the favorite status of a planet and updates the UI accordingly
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
      notify(); // Show notification after successful update
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

  // Function to show a notification
  const notify = () => toast("Updated favorites!");

  // Call getUserInfo when the component mounts
  // This ensures that user information is fetched when the Home page is accessed
  // Using useEffect to handle side effects in functional components
  useEffect(() => {
    getUserInfo();
    getAllPlanets();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Ambient light effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-gradient-radial absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full from-cyan-400/20 via-transparent to-transparent blur-3xl"></div>
        <div
          className="bg-gradient-radial absolute right-1/4 top-1/3 h-80 w-80 animate-pulse rounded-full from-purple-400/15 via-transparent to-transparent blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="bg-gradient-radial absolute bottom-1/4 left-1/3 h-72 w-72 animate-pulse rounded-full from-pink-400/10 via-transparent to-transparent blur-3xl"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Floating iridescent particles */}
        <div className="animate-float absolute left-[10%] top-[10%] h-2 w-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-70"></div>
        <div
          className="animate-float absolute right-[15%] top-[20%] h-1 w-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 opacity-60"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="animate-float absolute left-[20%] top-[60%] h-1.5 w-1.5 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-500 opacity-50"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="animate-float absolute bottom-[30%] right-[25%] h-1 w-1 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 opacity-60"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10">
        <Navbar userInfo={userInfo} />

        <main className="container mx-auto px-6 py-12">
          <div className="flex gap-8">
            <section className="flex-1">
              {userPlanets.length === 0 || !userInfo ? (
                <div className="flex h-64 items-center justify-center">
                  <div className="relative text-center">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl"></div>
                    <div className="relative rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl">
                      <h3 className="mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-light text-transparent text-white/90">
                        Your Cosmic Journey Awaits
                      </h3>
                      <p className="text-sm font-light text-white/60">
                        Click the luminous button to begin exploring the
                        universe
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-8">
                  <div className="mb-12 text-center">
                    <h2 className="leading-16 mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-extralight text-transparent">
                      Your Space Voyages
                    </h2>
                    <div className="mx-auto mb-4 h-px w-32 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <p className="font-light text-white/60">
                      Navigate through memories of space and time
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
            {/* TO-DO: Create component for the aside profile */}
            <aside className="w-80 flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 via-purple-400/5 to-pink-400/10 blur-xl"></div>
                <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                  <h2 className="mb-8 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-xl font-extralight text-transparent">
                    Explorer Profile
                  </h2>
                  {userInfo ? (
                    <div className="space-y-6">
                      <div className="group relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                          <p className="mb-3 text-xs font-light uppercase tracking-widest text-cyan-300/80">
                            Full Name
                          </p>
                          <p className="text-lg font-light text-white/90">
                            {userInfo.fullName}
                          </p>
                        </div>
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                          <p className="mb-3 text-xs font-light uppercase tracking-widest text-purple-300/80">
                            E-mail
                          </p>
                          <p className="break-words font-mono text-sm font-light text-white/80">
                            {userInfo.email}
                          </p>
                        </div>
                      </div>

                      <div className="group relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-cyan-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
                          <p className="mb-3 text-xs font-light uppercase tracking-widest text-pink-300/80">
                            Created At
                          </p>
                          <p className="font-light text-white/90">
                            {new Date(userInfo.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      {/* Holographic Stats */}
                      <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="group relative">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20 opacity-50 blur"></div>
                          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
                            <div className="mb-1 text-3xl font-extralight text-cyan-400">
                              {userPlanets.length}
                            </div>
                            <div className="text-xs font-light uppercase tracking-wider text-white/60">
                              Voyages
                            </div>
                          </div>
                        </div>
                        <div className="group relative">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-50 blur"></div>
                          <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-xl">
                            <div className="mb-1 text-3xl font-extralight text-pink-400">
                              {userPlanets.filter((p) => p.isFavorite).length}
                            </div>
                            <div className="text-xs font-light uppercase tracking-wider text-white/60">
                              Starred
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-blue-400"></div>
                        <div
                          className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-pink-400 to-cyan-400"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </aside>
          </div>
        </main>

        <Modal
          isOpen={openAddEditModal.isShow}
          onRequestClose={() =>
            setOpenAddEditModal({ isShow: false, type: "add", data: null })
          }
          ariaHideApp={false}
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-md z-[9999]"
          style={{
            overlay: { zIndex: 9999 },
            content: { zIndex: 10000 },
          }}
        >
          <div className="relative z-[10001] w-full max-w-2xl">
            {/* Modal glow effect */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 blur-xl"></div>

            {/* Modal container */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
              {/* Header */}
              <div className="relative border-b border-white/10 px-8 py-6">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5"></div>
                <div className="relative flex items-center justify-between">
                  <div>
                    <h2 className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-2xl font-extralight text-transparent">
                      {openAddEditModal.type === "add"
                        ? "Create New Journey"
                        : "Edit Space Log"}
                    </h2>
                    <p className="mt-1 text-sm font-light text-white/60">
                      Document your cosmic exploration
                    </p>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={() =>
                      setOpenAddEditModal({
                        isShow: false,
                        type: "add",
                        data: null,
                      })
                    }
                    className="group relative z-[10002] h-10 w-10 transition-all duration-300 hover:scale-110"
                  >
                    <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative flex h-full w-full items-center justify-center text-white/60 transition-colors duration-200 hover:text-white">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>

              {/* Content - Scrollable */}
              <div className="custom-scrollbar max-h-[60vh] overflow-y-auto px-8 py-6">
                <AddEditTravelForm
                  type={openAddEditModal.type}
                  travelInfo={openAddEditModal.data}
                  getAllPlanets={() => getAllPlanets()}
                  onClose={() =>
                    setOpenAddEditModal({
                      isShow: false,
                      type: "add",
                      data: null,
                    })
                  }
                />
              </div>

              {/* Footer - Fixed buttons */}
              <div className="from-white/2 border-t border-white/10 bg-gradient-to-r to-white/5 px-8 py-6">
                <div className="flex items-center justify-end space-x-4">
                  <button
                    onClick={() =>
                      setOpenAddEditModal({
                        isShow: false,
                        type: "add",
                        data: null,
                      })
                    }
                    className="group relative px-6 py-3 font-light text-white/70 transition-all duration-300 hover:text-white"
                  >
                    <div className="absolute inset-0 rounded-xl border border-white/10 bg-white/5 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"></div>
                    <span className="relative">Cancel Mission</span>
                  </button>

                  <button
                    type="submit"
                    form="travel-form"
                    className="group relative cursor-pointer px-8 py-3 font-light text-white transition-all duration-500 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                    <span className="relative font-light tracking-wider">
                      {openAddEditModal.type === "add"
                        ? "Launch Journey"
                        : "Update Log"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <button
          className="group fixed bottom-8 right-8 h-16 w-16 cursor-pointer transition-all duration-500 hover:scale-110 focus:outline-none active:scale-95"
          onClick={() => {
            setOpenAddEditModal({ isShow: true, type: "add", data: null });
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-80 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <MdAdd className="relative z-10 text-2xl text-white transition-all duration-500 group-hover:rotate-180" />
          </div>
        </button>

        <ToastContainer
          theme="dark"
          toastStyle={{
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            color: "white",
            borderRadius: "16px",
          }}
        />
      </div>
    </div>
  );
};
