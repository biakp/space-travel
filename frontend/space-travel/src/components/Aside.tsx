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

export function Aside({
  userInfo,
  userPlanets,
}: {
  userInfo: UserInfoProps | null;
  userPlanets: PlanetProps[];
}) {
  return (
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
  );
}
