import { MdClose, MdDelete, MdUpdate } from "react-icons/md";

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

interface ViewTravelProps {
  planet: PlanetProps;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ViewTravelDetails = ({
  planet,
  onClose,
  onEdit,
  onDelete,
}: ViewTravelProps) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">
      {/* Header */}
      <div className="relative border-b border-white/10 px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5"></div>
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-xl font-extralight text-transparent sm:text-2xl">
              Travel Details
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              className="group flex cursor-pointer items-center gap-1.5 rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-cyan-500/10 px-3 py-2 font-light text-cyan-300 transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:from-cyan-400/20 hover:to-cyan-500/20 hover:text-cyan-200 active:scale-95 sm:gap-2 sm:px-4"
              aria-label="Update Travel Story"
              onClick={onEdit}
            >
              <MdUpdate className="text-base sm:text-lg" />
              <span className="text-xs sm:text-sm">UPDATE STORY</span>
            </button>

            <button
              className="group flex cursor-pointer items-center gap-1.5 rounded-xl border border-red-400/30 bg-gradient-to-r from-red-400/10 to-red-500/10 px-3 py-2 font-light text-red-300 transition-all duration-300 hover:scale-105 hover:border-red-400/50 hover:from-red-400/20 hover:to-red-500/20 hover:text-red-200 active:scale-95 sm:gap-2 sm:px-4"
              aria-label="Delete Travel Story"
              onClick={onDelete}
            >
              <MdDelete className="text-base sm:text-lg" />
              <span className="text-xs sm:text-sm">DELETE</span>
            </button>

            <button
              className="group flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95 sm:h-10 sm:w-10"
              aria-label="Close details"
              onClick={onClose}
            >
              <MdClose className="text-lg sm:text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="custom-scrollbar max-h-[60vh] overflow-y-auto px-4 py-4 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
        <section className="flex h-full flex-col space-y-4 sm:space-y-6">
          <article className="space-y-4 sm:space-y-6">
            {/* Title */}
            <h1 className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-extralight text-transparent sm:text-3xl">
              {planet.title}
            </h1>

            {/* Image */}
            {planet.imageUrl && (
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-400/5 to-pink-400/10 blur-xl"></div>
                <img
                  src={planet.imageUrl}
                  alt={planet.title}
                  className="relative h-48 w-full rounded-2xl object-cover shadow-2xl sm:h-56 lg:h-64"
                />
              </div>
            )}

            {/* Details */}
            <div className="space-y-3 sm:space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl sm:p-4">
                <p className="mb-1 text-xs font-light text-cyan-300 sm:mb-2 sm:text-sm">
                  Visited Planet
                </p>
                <p className="text-base font-light text-white sm:text-lg">
                  {planet.visitedPlanet}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl sm:p-4">
                <p className="mb-1 text-xs font-light text-purple-300 sm:mb-2 sm:text-sm">
                  Visited Date
                </p>
                <p className="text-base font-light text-white sm:text-lg">
                  {planet.visitedDate
                    ? new Date(planet.visitedDate).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-xl sm:p-4">
                <p className="mb-2 text-xs font-light text-pink-300 sm:mb-3 sm:text-sm">Story</p>
                <p className="text-sm leading-relaxed text-white/80 sm:text-base">{planet.story}</p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default ViewTravelDetails;
