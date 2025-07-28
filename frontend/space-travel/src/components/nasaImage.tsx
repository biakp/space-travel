import { useNasaImage } from "../hooks/useNasaImage";

interface NasaImageProps {
  fallback?: string;
}

export function NasaImage({
  fallback = "../public/images/fallback.jpg",
}: NasaImageProps) {
  const { data, loading } = useNasaImage();

  if (loading) {
    return <div className={`animate-pulse bg-gray-800`} />;
  }

  // If data is null, show an error message
  if (!data) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-700 text-white`}
      >
        Failed to load image
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      {data.media_type === "image" ? (
        <img
          src={data.url}
          alt={data.title}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            if (!img.dataset.fallback) {
              console.warn("Image failed to load, switching to fallback");
              img.src = fallback;
              img.dataset.fallback = "true";
            }
          }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={fallback}
          alt={data.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute bottom-12 left-12 right-10 max-w-full text-white">
        <p className="text-sm font-light italic leading-tight">
          {data.explanation}
        </p>
        <p className="mt-4 text-sm">
          <strong>{data.title}</strong>
        </p>
      </div>
    </div>
  );
}
