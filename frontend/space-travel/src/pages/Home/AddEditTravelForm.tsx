import { useEffect, useState, type FormEvent } from "react";
import DateSelector from "../../components/Input/DateSelector";
import ImageSelector from "../../components/Input/ImageSelector";
import TextInput from "../../components/Input/TextInput";
import TextArea from "../../components/Input/TextArea";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { uploadImage } from "../../utils/uploadImage";

interface PlanetProps {
  id: string;
  imageUrl: File | string | null; // Assuming imageUrl can be a string or null
  isFavorite: boolean;
  story: string;
  title: string;
  userId: string;
  visitedDate: string;
  visitedPlanet: string;
}

interface AddEditTravelFormProps {
  type: "add" | "edit";
  travelInfo: PlanetProps | null;
  onClose: () => void; // Function to close the modal
  getAllPlanets: () => void; // Function to refresh the planet list after adding or editing
}

const AddEditTravelForm = ({
  type,
  onClose,
  getAllPlanets,
  travelInfo,
}: AddEditTravelFormProps) => {
  const [title, setTitle] = useState<string>("");
  const [visitedPlanet, setVisitedPlanet] = useState<string>("");
  const [story, setstory] = useState<string>("");
  const [visitedDate, setVisitedDate] = useState<Date>(new Date());
  const [image, setImage] = useState<File | string | null>(null);
  const [error, setError] = useState<string>("");

    // Use useEffect to populate form when travelInfo changes
  useEffect(() => {
    if (travelInfo && type === "edit") {
      setTitle(travelInfo.title || "");
      setVisitedPlanet(travelInfo.visitedPlanet || "");
      setstory(travelInfo.story || "");
      setVisitedDate(travelInfo.visitedDate ? new Date(travelInfo.visitedDate) : new Date());
      setImage(travelInfo.imageUrl || null); // Set existing image URL
    }
  }, [travelInfo, type]);

const updatePlanet = async () => {
  try {
    let imageUrl = "";

    // Handle image upload only if it's a new file
    if (image && typeof image !== "string") {
      const imageUploadResponse = await uploadImage(image);
      imageUrl = imageUploadResponse?.imageUrl || "";
      console.log("Image uploaded successfully:", imageUrl);
    } else if (typeof image === "string") {
      // Keep existing image URL
      imageUrl = image;
    } else if (travelInfo?.imageUrl && typeof travelInfo.imageUrl === "string") {
      // Fallback to original image URL if image state is null
      imageUrl = travelInfo.imageUrl;
    }

    const response = await axiosInstance.put(`update-planet/${travelInfo?.id}`, {
      title,
      visitedPlanet,
      story: story,
      visitedDate: visitedDate.toISOString().split("T")[0],
      imageUrl: imageUrl, // Remove the || "" which was causing empty strings
    });
    console.log("Planet updated successfully:", response.data);
    getAllPlanets(); // Refresh the planet list after updating
    onClose(); // Close the modal after successful update
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }
};


  const addPlanet = async () => {
    try {
      let imageUrl = "";

      if (image && typeof image !== "string") {
        const imageUploadResponse = await uploadImage(image);

        imageUrl = imageUploadResponse?.imageUrl || "";
        console.log("Image uploaded successfully:", imageUrl);
      }

      const response = await axiosInstance.post("add-registered-planet", {
        title,
        visitedPlanet,
        story: story,
        visitedDate: visitedDate.toISOString().split("T")[0],
        imageUrl: imageUrl || "",
      });
      console.log("Planet added successfully:", response.data);
      getAllPlanets(); // Refresh the planet list after adding
      onClose(); // Close the modal after successful addition
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred. Please try again.");
        }
      }
    }
  };

  // Handle form submission
  // This function will handle both adding and editing travels based on the type prop
  // It will send the data to the backend using axiosInstance
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("Current image state:", image);
    // Basic validation
    if (!title.trim()) {
      setError("Please enter a travel title.");
      return;
    }

    if (!visitedPlanet.trim()) {
      setError("Please enter the visited planet.");
      return;
    }

    if (!story.trim()) {
      setError("Please enter your travel story.");
      return;
    }

    setError("");

    if (type === "edit") {
      updatePlanet();
    } else {
      addPlanet();
    }
  };

  return (
    <form id="travel-form" onSubmit={handleSubmit}>
      <TextInput
        label="Title"
        value={title}
        onChange={setTitle}
        placeholder="Enter travel title"
        required
      />
      <TextInput
        label="Visited Planet"
        value={visitedPlanet}
        onChange={setVisitedPlanet}
        placeholder="Enter visited planet"
        required
      />
      <TextArea
        label="story"
        value={story}
        onChange={setstory}
        placeholder="Enter travel story"
        required
      />
      <DateSelector value={visitedDate} onChange={setVisitedDate} />
      <ImageSelector value={image} onChange={setImage} />

      {/* Add error display */}
      {error && (
        <div className="relative mt-4">
          <div className="absolute inset-0 rounded-2xl bg-red-500/10 blur"></div>
          <div className="relative rounded-2xl border border-red-400/20 bg-red-500/5 p-3 backdrop-blur-md">
            <span className="text-sm font-light text-red-300">{error}</span>
          </div>
        </div>
      )}
    </form>
  );
};

export default AddEditTravelForm;
