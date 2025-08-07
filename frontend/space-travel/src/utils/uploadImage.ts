import axiosInstance from "../api/axiosInstance";

export const uploadImage = async (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post("upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const imageUrl = response.data?.uploadImage?.imageUrl || "";

    console.log("Image upload result:", imageUrl);
    return { imageUrl };
  } catch (error) {
    console.error("Error uploading the image", error);
  }
};
