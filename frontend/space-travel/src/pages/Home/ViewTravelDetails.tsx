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
      <div className="relative border-b border-white/10 px-8 py-6">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-transparent to-purple-400/5"></div>
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-2xl font-extralight text-transparent">
              Travel Details
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="group flex cursor-pointer items-center gap-2 rounded-xl border border-cyan-400/30 bg-gradient-to-r from-cyan-400/10 to-cyan-500/10 px-4 py-2 font-light text-cyan-300 transition-all duration-300 hover:scale-105 hover:border-cyan-400/50 hover:from-cyan-400/20 hover:to-cyan-500/20 hover:text-cyan-200 active:scale-95"
              onClick={onEdit}
            >
              <MdUpdate className="text-lg" />
              <span className="text-sm">UPDATE STORY</span>
            </button>

            <button
              className="group flex cursor-pointer items-center gap-2 rounded-xl border border-red-400/30 bg-gradient-to-r from-red-400/10 to-red-500/10 px-4 py-2 font-light text-red-300 transition-all duration-300 hover:scale-105 hover:border-red-400/50 hover:from-red-400/20 hover:to-red-500/20 hover:text-red-200 active:scale-95"
              onClick={onDelete}
            >
              <MdDelete className="text-lg" />
              <span className="text-sm">DELETE</span>
            </button>

            <button
              className="group flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/60 transition-all duration-300 hover:scale-110 hover:border-white/40 hover:bg-white/10 hover:text-white active:scale-95"
              onClick={onClose}
            >
              <MdClose className="text-xl" />
            </button>
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="custom-scrollbar max-h-[60vh] overflow-y-auto px-8 py-6">
        <section className="flex h-full flex-col space-y-6">
          <article className="space-y-6">
            {/* Title */}
            <h1 className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-3xl font-extralight text-transparent">
              {planet.title}
            </h1>

            {/* Image */}
            {planet.imageUrl && (
              <div className="relative overflow-hidden rounded-2xl border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-400/5 to-pink-400/10 blur-xl"></div>
                <img
                  src={planet.imageUrl}
                  alt={planet.title}
                  className="relative h-64 w-full rounded-2xl object-cover shadow-2xl"
                />
              </div>
            )}

            {/* Details */}
            <div className="space-y-4">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="mb-1 text-sm font-light text-cyan-300">
                  Visited Planet
                </p>
                <p className="text-lg font-light text-white">
                  {planet.visitedPlanet}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="mb-1 text-sm font-light text-purple-300">
                  Visited Date
                </p>
                <p className="text-lg font-light text-white">
                  {planet.visitedDate
                    ? new Date(planet.visitedDate).toLocaleDateString()
                    : "Unknown"}
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
                <p className="mb-3 text-sm font-light text-pink-300">Story</p>
                <p className="leading-relaxed text-white/80">{planet.story}</p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

export default ViewTravelDetails;
