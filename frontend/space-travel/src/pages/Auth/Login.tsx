import { useState, type FormEvent } from "react";
import { NasaImage } from "../../components/NasaImage";
import { PasswordInput } from "../../components/Input/PasswordInput";
import { validateEmail, validatePassword } from "../../utils/helper";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Using useNavigate from react-router-dom for navigation
  // This allows us to programmatically navigate after successful login
  const navigate = useNavigate();

  // Function to handle login
  // It validates the email and password, then sends a POST request to the login endpoint
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Wrong Password. Please try again.");
      return;
    }

    setError("");
    // If validation passes, proceed with the login request
    // Sending login request to the backend
    // If successful, it stores the access token in localStorage and redirects to the home page
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home"); // Redirect to homepage
      } else {
        setError("Login failed. Please try again.");
        return;
      }
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
    // Clear the input fields after login attempt
    // This ensures that the fields are reset for the next login attempt
    setEmail("");
    setPassword("");
    setError("");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Ambient background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-gradient-radial absolute right-1/4 top-0 h-96 w-96 animate-pulse rounded-full from-purple-400/10 via-transparent to-transparent blur-3xl"></div>
        <div
          className="bg-gradient-radial from-cyan-400/8 absolute bottom-1/3 left-1/4 h-80 w-80 animate-pulse rounded-full via-transparent to-transparent blur-3xl"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="bg-gradient-radial from-pink-400/6 absolute right-1/3 top-1/2 h-72 w-72 animate-pulse rounded-full via-transparent to-transparent blur-3xl"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="relative z-10 grid h-screen md:grid-cols-2">
        {/* Left: Form */}
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24">
          {/* Navigation */}
          <div className="mb-8 flex items-center justify-between text-sm">
            <div></div>
            <div className="flex items-center space-x-2">
              <span className="font-light text-white/60">
                New to the cosmos?
              </span>
              <button
                onClick={() => navigate("/signup")}
                aria-label="Sign Up"
                className="group relative cursor-pointer px-4 py-2 font-light text-purple-400 transition-all duration-300 hover:text-white"
              >
                <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"></div>
                <span className="relative">Sign Up</span>
              </button>
            </div>
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <div className="relative mx-auto mb-6 h-16 w-16">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 opacity-60 blur"></div>
              <div className="relative flex h-full w-full items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-xl">
                <span className="text-2xl">🚀</span>
              </div>
            </div>
            <h2 className="mb-2 bg-gradient-to-r from-purple-400 via-white to-cyan-400 bg-clip-text text-3xl font-extralight text-transparent">
              Access Control Portal
            </h2>
            <p className="font-light text-white/60">
              Login to your interstellar account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="mb-6 space-y-6 text-sm">
            <div className="group relative">
              <label
                className="mb-2 block text-xs font-light uppercase tracking-widest text-purple-300/80"
                htmlFor="email"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-cyan-400/10 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  className="relative w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-purple-400/30 focus:bg-white/10 focus:outline-none"
                  placeholder="neural.explorer@gmail.com"
                />
              </div>
            </div>

            <div className="group relative">
              <label
                className="mb-2 block text-xs font-light uppercase tracking-widest text-cyan-300/80"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-400/10 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
                <div className="relative">
                  <PasswordInput
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                  />
                </div>
              </div>
              <div className="mt-2 text-right">
                <a
                  href="#"
                  className="text-xs font-light text-white/50 transition-colors duration-200 hover:text-cyan-400"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {error && (
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-red-500/10 blur"></div>
                <div className="relative rounded-2xl border border-red-400/20 bg-red-500/5 p-3 backdrop-blur-md">
                  <span className="text-sm font-light text-red-300">
                    {error}
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              aria-label="Log In"
              className="group relative w-full cursor-pointer py-4 font-light text-white transition-all duration-500 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-cyan-600 to-purple-500 opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/20 via-cyan-400/20 to-purple-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
              <span className="relative font-light tracking-wider">Log In</span>
            </button>
          </form>

          <div className="mb-6 text-center">
            <div className="flex items-center">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
              <span className="px-4 text-xs font-light uppercase tracking-widest text-white/40">
                Alternative Access
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent"></div>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button className="group relative flex-1 cursor-pointer py-3 text-sm font-light text-white/70 transition-all duration-300 hover:text-white">
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:border-cyan-400/20"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="h-4 w-4"
                />
                <span>Google</span>
              </div>
            </button>
            <button className="group relative flex-1 cursor-pointer py-3 text-sm font-light text-white/70 transition-all duration-300 hover:text-white">
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 group-hover:border-purple-400/20"></div>
              <div className="relative flex items-center justify-center space-x-2">
                <img
                  src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                  alt="Facebook"
                  className="h-4 w-4"
                />
                <span>Facebook</span>
              </div>
            </button>
          </div>
        </div>

        {/* Right: NASA Image */}
        <div className="relative hidden overflow-hidden md:block">
          <div className="absolute inset-0 z-10 bg-gradient-to-l from-transparent via-black/20 to-black/40"></div>
          <NasaImage />
        </div>
      </div>
    </div>
  );
};
