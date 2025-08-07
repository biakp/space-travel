import { useRef } from "react";

interface ImageSelectorProps {
  value: File | string | null;
  onChange: (image: File | null) => void;
}

// ImageSelector component allows users to upload an image or select an existing one
// It displays a preview of the selected image and handles file input changes
const ImageSelector = ({ value, onChange }: ImageSelectorProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Handle file input change event
  // If a file is selected, it calls the onChange prop with the file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      onChange(file);
    }
  };

  const getDisplayText = () => {
    if (!value) return "Upload cosmic imagery";
    if (typeof value === "string") return "Current image selected";
    if (value instanceof File) return value.name;
    return "Upload cosmic imagery";
  };

  const showImagePreview = () => {
    if (!value) return null;

    if (typeof value === "string") {
      // Existing image URL
      return (
        <div className="mb-4">
          <img
            src={value}
            alt="Current image"
            className="mx-auto h-20 w-20 rounded-lg object-cover"
          />
        </div>
      );
    }

    if (value instanceof File) {
      // New file upload
      const imageUrl = URL.createObjectURL(value);
      return (
        <div className="mb-4">
          <img
            src={imageUrl}
            alt="Selected image"
            className="mx-auto h-20 w-20 rounded-lg object-cover"
          />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="group relative mt-6">
      <label className="mb-2 block text-sm font-light uppercase tracking-widest text-emerald-300/80">
        Upload Image <span className="text-red-400">*</span>
      </label>
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-400/10 to-cyan-400/10 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
        <label
          className={`relative block cursor-pointer rounded-2xl border-2 border-dashed bg-white/5 p-8 text-center backdrop-blur-md transition-colors duration-300 hover:border-emerald-400/30`}
        >
          {value ? (
            showImagePreview()
          ) : (
            <div className="mb-4">
              <svg
                className="mx-auto h-12 w-12 text-white/40"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
          <p className="mb-2 font-light text-white/60">{getDisplayText()}</p>
          <p className="text-sm text-white/40">
            {value ? "Click to change image" : "PNG, JPG up to 10MB"}
          </p>
          <input
            type="file"
            ref={fileInputRef}
            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageSelector;
