import { FaStar } from "react-icons/fa6";
import { GrMapLocation } from "react-icons/gr";

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

interface TravelCardProps {
  planet: PlanetProps;
  user: UserInfoProps;
  onUpdateFavorite: () => Promise<void>;
  onClick: () => void;
}

function TravelCard({
  planet,
  user,
  onUpdateFavorite,
  onClick,
}: TravelCardProps) {
  return (
    <article
      className="group relative cursor-pointer transition-all duration-700 hover:scale-[1.02]"
      onClick={() => {
        onClick();
      }}
    >
      {/* Ambient glow */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"></div>

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
        {/* Image container with liquid overlay */}
        <div className="relative overflow-hidden">
          <img
            src={planet.imageUrl || "../public/images/fallback.jpg"}
            alt="Space Travel"
            className="h-56 w-full object-cover transition-all duration-1000 group-hover:scale-105"
          />
          {/* Liquid glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-400/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100"></div>

          {/* Holographic reflection */}
          <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-20"></div>
        </div>

        {/* Floating favorite button */}
        <button
          className="group/fav absolute right-4 top-4 z-20 h-10 w-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onUpdateFavorite();
          }}
        >
          <div className="absolute inset-0 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl transition-all duration-300 group-hover/fav:scale-110"></div>
          <div className="relative flex h-full w-full items-center justify-center">
            <FaStar
              size={20}
              className={`${planet.isFavorite ? "text-yellow-400" : "text-white/60"} text-sm transition-all duration-300 hover:text-yellow-400 group-hover:scale-110`}
              title="Add to Favorites"
              aria-label="Add to Favorites"
            />
          </div>
        </button>

        <div className="space-y-4 p-6">
          <header className="space-y-4">
            <h6 className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-2xl font-extralight leading-tight text-transparent">
              {planet.title}
            </h6>

            <div className="flex items-center justify-between">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-400/20 blur"></div>
                <span className="relative rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-light text-cyan-300 backdrop-blur-md">
                  {user.fullName}
                </span>
              </div>
              <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-light text-white/70 backdrop-blur-md">
                {new Date(planet.visitedDate).toLocaleDateString()}
              </span>
            </div>
          </header>

          <div className="relative">
            <p className="line-clamp-2 text-sm font-light leading-relaxed text-white/70">
              {planet.story ||
                "A mesmerizing journey through the cosmic unknown, where reality bends and dimensions converge."}
            </p>
          </div>

          <div className="border-t border-white/10 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur"></div>
                  <div className="relative flex items-center space-x-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-md">
                    <GrMapLocation className="text-xs text-purple-400" />
                    <span className="text-xs font-light text-purple-300">
                      {planet.visitedPlanet}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TravelCard;
