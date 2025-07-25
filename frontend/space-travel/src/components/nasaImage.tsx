import { useNasaImage } from "../hooks/UseNasaImage";

interface NasaImageProps {
  fallback?: string;
}

export function NasaImage({ fallback = "/fallback.jpg" }: NasaImageProps) {
  const { data, loading } = useNasaImage();

  if (loading) {
    return <div className={`animate-pulse bg-gray-800`} />;
  }

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
      <img
        src={data.url}
        alt={data.title}
        onError={(e) => {
          (e.target as HTMLImageElement).src = fallback;
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>
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
