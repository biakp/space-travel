import { useState } from "react";
import { MdDateRange, MdFilterAlt } from "react-icons/md";
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
    <aside className="w-80 flex-shrink-0">
      <div className="relative space-y-6">
        {/* Profile Section */}
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

        {/* Date Filter Section */}
        <div className="relative">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-400/10 via-yellow-400/5 to-red-400/10 blur-xl"></div>
          <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
            <div className="mb-6 flex items-center gap-3">
              <MdDateRange className="text-2xl text-orange-400" />
              <h2 className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-xl font-extralight text-transparent">
                Date Filter
              </h2>
            </div>

            <div className="space-y-4">
              {/* Start Date */}
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-400/20 to-yellow-400/20 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                  <label className="mb-2 block text-xs font-light uppercase tracking-widest text-orange-300/80">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    max={endDate || undefined}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-transparent text-white/90 focus:outline-none"
                  />
                </div>
              </div>

              {/* End Date */}
              <div className="group relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-yellow-400/20 to-red-400/20 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                  <label className="mb-2 block text-xs font-light uppercase tracking-widest text-yellow-300/80">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={endDate}
                    min={startDate || undefined}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-transparent text-white/90 focus:outline-none"
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
              <div className="flex gap-3">
                <button
                  onClick={handleDateFilter}
                  disabled={isFiltering}
                  aria-label="Filter by date"
                  className="group flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-orange-400/30 bg-gradient-to-r from-orange-400/10 to-yellow-400/10 px-4 py-3 font-light text-orange-300 transition-all duration-300 hover:scale-105 hover:border-orange-400/50 hover:from-orange-400/20 hover:to-yellow-400/20 hover:text-orange-200 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <MdFilterAlt className="text-lg" />
                  <span className="text-sm">
                    {isFiltering ? "FILTERING..." : "FILTER"}
                  </span>
                </button>

                <button
                  onClick={handleClearFilter}
                  aria-label="Clear date filter"
                  className="group flex cursor-pointer items-center justify-center rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-white/60 transition-all duration-300 hover:scale-105 hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
                >
                  <span className="text-sm">CLEAR</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
