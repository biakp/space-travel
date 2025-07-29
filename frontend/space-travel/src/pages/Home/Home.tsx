import { useEffect, useState } from "react";
import axiosInstance from "../../api/axiosInstance";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  // State to hold user information
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Fetch user information when the component mounts
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
        console.log(userInfo)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          localStorage.clear();
          navigate("/login"); // Redirect to login page if unauthorized
        }
      }
    }
  };

  // Call getUserInfo when the component mounts
  // This ensures that user information is fetched when the Home page is accessed
  // Using useEffect to handle side effects in functional components
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <main>
      <h1>Welcome to the Space Travel Hub</h1>
    </main>
  );
};
