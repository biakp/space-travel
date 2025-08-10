import { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import TravelCard from "../../components/Card/TravelCard";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import AddEditTravelForm from "./AddEditTravelForm";
import ViewTravelDetails from "./ViewTravelDetails";
import { MdAdd } from "react-icons/md";
import { Aside } from "../../components/Aside";

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

interface viewModalProps {
  isShow: boolean;
  type: "view";
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
  const [openViewModal, setOpenViewModal] = useState<viewModalProps>({
    isShow: false,
    type: "view",
    data: null,
  });
  const [filteredPlanets, setFilteredPlanets] = useState<PlanetProps[]>([]);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);

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

  // Function to delete a planet
  const deletePlanet = async (planet: PlanetProps | null) => {
    const planetId = planet?.id;
    try {
      // Make API call to delete the planet
      const response = await axiosInstance.delete(`/delete-planet/${planetId}`);

      if (response.data) {
        toast.success("Planet Deleted Successfully");
        setOpenViewModal((prevState) => ({ ...prevState, isShow: false }));
        getAllPlanets();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          console.error("Bad request");
        } else {
          console.error("Error deleting planet", error.message);
        }
      }
    }
  };

  const handleFilteredPlanets = (planets: PlanetProps[]) => {
    setFilteredPlanets(planets);
    setIsFiltered(true);
  };

  const handleClearFilter = () => {
    setFilteredPlanets([]);
    setIsFiltered(false);
  };

  // Use filtered planets if available, otherwise use all planets
  const planetsToDisplay = useMemo(
    () => (isFiltered ? filteredPlanets : userPlanets),
    [isFiltered, filteredPlanets, userPlanets],
  );

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

        <main className="container mx-auto px-4 py-8 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <aside className="lg:order-2">
              <Aside
                userInfo={userInfo}
                userPlanets={userPlanets}
                onFilteredPlanets={handleFilteredPlanets}
                onClearFilter={handleClearFilter}
              />
            </aside>
            <section className="flex-1 lg:order-1">
              {userPlanets.length === 0 || !userInfo ? (
                <div className="flex h-48 items-center justify-center sm:h-64">
                  <div className="relative text-center">
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-400/20 to-purple-400/20 blur-xl"></div>
                    <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl sm:p-12">
                      <h3 className="mb-2 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-xl font-light text-transparent sm:text-2xl">
                        Your Cosmic Journey Awaits
                      </h3>
                      <p className="text-xs font-light text-white/60 sm:text-sm">
                        Click the luminous button to begin exploring the
                        universe
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6 sm:mb-8">
                  <div className="mb-8 text-center sm:mb-12">
                    <h2 className="mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-extralight leading-tight text-transparent sm:text-4xl lg:text-5xl">
                      Your Space Voyages
                    </h2>
                    <div className="mx-auto mb-3 h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent sm:mb-4 sm:w-32"></div>
                    <p className="text-sm font-light text-white/60 sm:text-base">
                      Navigate through memories of space and time
                    </p>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:gap-8 xl:grid-cols-3">
                    {planetsToDisplay.map((planet) => (
                      <TravelCard
                        key={planet.id}
                        planet={planet}
                        user={userInfo}
                        onUpdateFavorite={() => updateFavorite(planet)}
                        onClick={() =>
                          setOpenViewModal({
                            isShow: true,
                            type: "view",
                            data: planet,
                          })
                        }
                      />
                    ))}
                  </div>
                </div>
              )}
            </section>
          </div>
        </main>

        {/* Modal for adding/editing travel logs */}
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
                    aria-label="Close details"
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
                  travelInfo={openViewModal.data}
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
                    aria-label="Cancel Mission"
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
                    aria-label="Submit Travel Form"
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

        {/* Modal to show travel details */}
        <Modal
          isOpen={openViewModal.isShow}
          onRequestClose={() =>
            setOpenViewModal({ isShow: false, type: "view", data: null })
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

            {openViewModal.data && (
              <ViewTravelDetails
                planet={openViewModal.data}
                onClose={() =>
                  setOpenViewModal((prevState) => ({
                    ...prevState,
                    isShow: false,
                  }))
                }
                onEdit={() => {
                  setOpenViewModal((prevState) => ({
                    ...prevState,
                    isShow: false,
                  }));
                  setOpenAddEditModal((prevState) => ({
                    ...prevState,
                    isShow: true,
                    type: "edit",
                  }));
                }}
                onDelete={() => deletePlanet(openViewModal.data)}
              />
            )}
          </div>
        </Modal>

        <button
          className="group fixed bottom-6 right-6 h-12 w-12 cursor-pointer transition-all duration-500 hover:scale-110 focus:outline-none active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
          aria-label="Add New Travel"
          onClick={() => {
            setOpenAddEditModal({ isShow: true, type: "add", data: null });
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-80 blur-lg transition-opacity duration-500 group-hover:opacity-100"></div>
          <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
            <MdAdd className="relative z-10 text-xl text-white transition-all duration-500 group-hover:rotate-180 sm:text-2xl" />
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
