import { useState } from "react";
import { MdDateRange, MdFilterAlt, MdExpandMore } from "react-icons/md";
import axiosInstance from "../api/axiosInstance";
import axios from "axios";

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

interface AsideProps {
  userInfo: UserInfoProps | null;
  userPlanets: PlanetProps[];
  onFilteredPlanets: (planets: PlanetProps[]) => void; // Callback to update filtered planets
  onClearFilter: () => void; // Callback to clear filter
}

export function Aside({
  userInfo,
  userPlanets,
  onFilteredPlanets,
  onClearFilter,
}: AsideProps) {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isProfileExpanded, setIsProfileExpanded] = useState<boolean>(false);
  const [isDateFilterExpanded, setIsDateFilterExpanded] = useState<boolean>(false);

  const handleDateFilter = async () => {
    if (!startDate || !endDate) {
      setError("Both start and end dates are required");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError("Start date cannot be after end date");
      return;
    }

    setError("");
    setIsFiltering(true);

    try {
      const response = await axiosInstance.get("/registered-planet/filter", {
        params: {
          startDate,
          endDate,
        },
      });

      if (response.data?.planets) {
        onFilteredPlanets(response.data.planets);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    } finally {
      setIsFiltering(false);
    }
  };

  const handleClearFilter = () => {
    setStartDate("");
    setEndDate("");
    setError("");
    setIsFiltering(false);
    onClearFilter();
  };

  return (
    <aside className="w-full lg:w-80 lg:flex-shrink-0">
      <div className="relative space-y-4 sm:space-y-6">
        {/* Profile Section */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-400/10 via-purple-400/5 to-pink-400/10 blur-xl"></div>
          <div className="relative rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            {/* Accordion Header for Mobile */}
            <button
              type="button"
              onClick={() => setIsProfileExpanded(!isProfileExpanded)}
              className="flex w-full items-center cursor-pointer justify-between p-6 sm:p-8 lg:pointer-events-none lg:cursor-default"
              aria-label="Toggle Explorer Profile"
            >
              <h2 className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-lg font-extralight text-transparent sm:text-xl">
                Explorer Profile
              </h2>
              <MdExpandMore 
                className={`text-xl text-cyan-400 transition-transform duration-300 lg:hidden ${
                  isProfileExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Content */}
            <div className={`overflow-hidden transition-all duration-300 lg:block ${
              isProfileExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'
            }`}>
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 lg:pt-0">
                {userInfo ? (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="group relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
                        <p className="mb-2 text-xs font-light uppercase tracking-widest text-cyan-300/80 sm:mb-3">
                          Full Name
                        </p>
                        <p className="text-base font-light text-white/90 sm:text-lg">
                          {userInfo.fullName}
                        </p>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 to-pink-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
                        <p className="mb-2 text-xs font-light uppercase tracking-widest text-purple-300/80 sm:mb-3">
                          E-mail
                        </p>
                        <p className="break-words font-mono text-xs font-light text-white/80 sm:text-sm">
                          {userInfo.email}
                        </p>
                      </div>
                    </div>

                    <div className="group relative">
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-cyan-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                      <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md sm:p-5">
                        <p className="mb-2 text-xs font-light uppercase tracking-widest text-pink-300/80 sm:mb-3">
                          Created At
                        </p>
                        <p className="text-base font-light text-white/90 sm:text-lg">
                          {new Date(userInfo.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {/* Holographic Stats */}
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:mt-8 sm:gap-4">
                      <div className="group relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-400/20 opacity-50 blur"></div>
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-xl sm:p-4">
                          <div className="mb-1 text-2xl font-extralight text-cyan-400 sm:text-3xl">
                            {userPlanets.length}
                          </div>
                          <div className="text-xs font-light uppercase tracking-wider text-white/60">
                            Voyages
                          </div>
                        </div>
                      </div>
                      <div className="group relative">
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-50 blur"></div>
                        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-xl sm:p-4">
                          <div className="mb-1 text-2xl font-extralight text-pink-400 sm:text-3xl">
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
          </div>
        </div>

        {/* Date Filter Section */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/10 via-yellow-400/5 to-red-400/10 blur-xl"></div>
          <div className="relative rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">
            {/* Accordion Header for Mobile */}
            <button
              type="button"
              onClick={() => setIsDateFilterExpanded(!isDateFilterExpanded)}
              className="flex w-full items-center cursor-pointer justify-between p-6 sm:p-8 lg:pointer-events-none lg:cursor-default"
              aria-label="Toggle Date Filter"
            >
              <div className="flex items-center gap-3">
                <MdDateRange className="text-xl text-orange-400 sm:text-2xl" />
                <h2 className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-lg font-extralight text-transparent sm:text-xl">
                  Date Filter
                </h2>
              </div>
              <MdExpandMore 
                className={`text-xl text-orange-400 transition-transform duration-300 lg:hidden ${
                  isDateFilterExpanded ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Date Filter Content */}
            <div className={`overflow-hidden transition-all duration-300 lg:block ${
              isDateFilterExpanded ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0 lg:max-h-none lg:opacity-100'
            }`}>
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 lg:pt-0">
                <div className="space-y-3 sm:space-y-4">
                  {/* Start Date */}
                  <div className="group relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
                    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:p-4">
                      <label className="mb-1.5 block text-xs font-light uppercase tracking-widest text-orange-300/80 sm:mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        max={endDate || undefined}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full bg-transparent text-sm text-white/90 focus:outline-none sm:text-base"
                      />
                    </div>
                  </div>

                  {/* End Date */}
                  <div className="group relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-red-400/20 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
                    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-md sm:p-4">
                      <label className="mb-1.5 block text-xs font-light uppercase tracking-widest text-yellow-300/80 sm:mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        min={startDate || undefined}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="w-full bg-transparent text-sm text-white/90 focus:outline-none sm:text-base"
                      />
                    </div>
                  </div>

                  {/* Error Display */}
                  {error && (
                    <div className="relative">
                      <div className="absolute inset-0 rounded-2xl bg-red-500/10 blur"></div>
                      <div className="relative rounded-2xl border border-red-400/20 bg-red-500/5 p-3 backdrop-blur-md">
                        <span className="text-sm font-light text-red-300">
                          {error}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
                    <button
                      type="button"
                      onClick={handleDateFilter}
                      disabled={isFiltering}
                      aria-label="Filter by date"
                      className="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 px-3 py-2.5 font-light text-orange-300 transition-all duration-300 hover:scale-105 hover:border-orange-400/50 hover:from-orange-400/20 hover:to-yellow-400/20 hover:text-orange-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:px-4 sm:py-3"
                    >
                      <MdFilterAlt className="text-base sm:text-lg" />
                      <span className="text-xs sm:text-sm">
                        {isFiltering ? "FILTERING..." : "FILTER"}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={handleClearFilter}
                      aria-label="Clear date filter"
                      className="group flex cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 text-white/60 transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95 sm:px-4 sm:py-3"
                    >
                      <span className="text-xs sm:text-sm">CLEAR</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
