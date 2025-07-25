import axios from "axios";

class NasaImageService {
    async fetchImage() {
        const apiKey = process.env.NASA_API_KEY;

        if (!apiKey) {
            throw new Error("NASA API key not configured");
        }

        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

        const response = await axios.get(url);

        return {
            title: response.data.title,
            url: response.data.url,
            explanation: response.data.explanation,
            date: response.data.date,
        };
    }
}

export { NasaImageService };
