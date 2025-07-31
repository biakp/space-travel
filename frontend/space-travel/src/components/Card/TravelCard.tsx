import { FaHeart } from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";

function TravelCard() {
  return (
    <article
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gray-100/50 bg-gradient-to-br from-white via-gray-50 to-indigo-50 p-6 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:border-indigo-200/60 hover:shadow-2xl"
      onClick={() => {
        // TO-DO: Implement navigation to detailed view
      }}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src="../public/images/fallback.jpg"
          alt="Space Travel"
          className="h-58 w-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>

      <button
        className="absolute right-4 top-4 z-10 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:shadow-xl active:scale-95"
        onClick={() => {
          // TO-DO: Implement favorite functionality
        }}
      >
        <FaHeart
          className="text-pink-500 transition-all duration-300 hover:text-pink-600 group-hover:scale-110"
          size={18}
          title="Add to Favorites"
          aria-label="Add to Favorites"
        />
      </button>
      {/* TO-DO: Get Card information */}
      <div className="mt-6 space-y-3">
        <header className="space-y-2">
          <h6 className="text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-indigo-700">
            Journey to Proxima Centauri
          </h6>
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600">
              by Bingus Klemen
            </span>
            <span className="text-xs font-medium text-gray-400">
              Dec 25, 2024
            </span>
          </div>
        </header>
        <div className="pt-2">
          <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
            Day 127: Finally reached the outer edge of our solar system. The
            view of Earth from here is breathtaking - just a pale blue dot.
          </p>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-100 to-purple-100 px-2.5 py-1 text-xs font-medium text-pink-700">
              <GrMapLocation className="mr-1" />
              <p className="sr-only">Location:</p> Proxima Centauri
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

export default TravelCard;
