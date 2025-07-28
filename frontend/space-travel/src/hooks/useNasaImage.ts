// src/hooks/useNasaImage.ts
import { useEffect, useState } from "react";
import axios from "axios";

interface NasaImage {
  media_type: string;
  title: string;
  url: string;
  explanation: string;
  date: string;
}

export function useNasaImage() {
  const [data, setData] = useState<NasaImage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${baseURL}/nasa-image`);

        // Check if the response data has the expected structure
        const imageData = response.data?.image || response.data;

        if (imageData && imageData.media_type) {
          setData(imageData);
        } else {
          console.warn("Unexpected API response:", response.data);
          setError("Invalid image data received");
        }
      } catch (err) {
        console.error("Failed to fetch NASA image:", err);
        setError("Could not load image");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [baseURL]);

  return { data, loading, error };
}
