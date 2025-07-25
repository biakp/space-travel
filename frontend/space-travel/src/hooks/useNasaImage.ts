// src/hooks/useNasaImage.ts
import { useEffect, useState } from "react";
import axios from "axios";

interface NasaImage {
  title: string;
  url: string;
  explanation: string;
  date: string;
}

export function useNasaImage() {
  const [data, setData] = useState<NasaImage | null>(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(`${baseURL}/nasa-image`);
        setData(response.data.image);
      } catch (err) {
        console.error("Failed to fetch NASA image:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [baseURL]);

  return { data, loading };
}
