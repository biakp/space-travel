import { NasaImage } from "../../components/NasaImage";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { validateEmail, validatePassword } from "../../utils/helper";
import axios from "axios";
import { PasswordInput } from "../../components/Input/PasswordInput";

export const SignUp = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError("Please enter a valid password.");
      return;
    }

    setError("");

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
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-black via-slate-900 to-black">
      {/* Ambient background effects */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="bg-gradient-radial absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full from-cyan-400/10 via-transparent to-transparent blur-3xl"></div>
        <div
          className="bg-gradient-radial from-purple-400/8 absolute right-1/4 top-1/3 h-80 w-80 animate-pulse rounded-full via-transparent to-transparent blur-3xl"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="bg-gradient-radial from-pink-400/6 absolute bottom-1/4 left-1/3 h-72 w-72 animate-pulse rounded-full via-transparent to-transparent blur-3xl"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="relative z-10 grid h-screen md:grid-cols-2">
        {/* Left: Form */}
        <div className="custom-scrollbar flex h-full flex-col overflow-y-auto">
          <div className="flex min-h-full flex-1 flex-col justify-center px-8 py-8 md:px-16 lg:px-24">
            {/* Navigation */}
            <div className="mb-8 flex items-center justify-between text-sm">
              <div></div>
              <div className="flex items-center space-x-2">
                <span className="font-light text-white/60">
                  Already exploring?
                </span>
                <button
                  aria-label="Log In"
                  onClick={() => navigate("/login")}
                  className="group relative cursor-pointer px-4 py-2 font-light text-cyan-400 transition-all duration-300 hover:text-white"
                >
                  <div className="absolute inset-0 rounded-full border border-white/10 bg-white/5 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100"></div>
                  <span className="relative">Log In</span>
                </button>
              </div>
            </div>

            {/* Header */}
            <div className="mb-8 text-center">
              <h2 className="mb-2 bg-gradient-to-r from-cyan-400 via-white to-purple-400 bg-clip-text text-3xl font-extralight text-transparent">
                Initialize Explorer Profile
              </h2>
              <p className="font-light text-white/60">
                Set up your interstellar account to embark on cosmic journeys
                with us
              </p>
            </div>

            {/* Social Buttons */}
            <div className="mb-6 flex gap-4">
              <button className="group relative flex-1 py-3 text-sm font-light text-white/70 transition-all duration-300 hover:text-white">
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
              <button className="group relative flex-1 py-3 text-sm font-light text-white/70 transition-all duration-300 hover:text-white">
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

            <div className="mb-6 text-center">
              <div className="flex items-center">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/20 to-white/20"></div>
                <span className="px-4 text-xs font-light uppercase tracking-widest text-white/40">
                  Or Continue
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-white/20 via-white/20 to-transparent"></div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSignUp} className="space-y-6 text-sm">
              <div className="group relative">
                <label
                  className="mb-2 block text-xs font-light uppercase tracking-widest text-cyan-300/80"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-blue-400/10 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    className="relative w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-cyan-400/30 focus:bg-white/10 focus:outline-none"
                    placeholder="Your Name in the Cosmos"
                  />
                </div>
              </div>

              <div className="group relative">
                <label
                  className="mb-2 block text-xs font-light uppercase tracking-widest text-purple-300/80"
                  htmlFor="email"
                >
                  E-mail
                </label>
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    className="relative w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 backdrop-blur-md transition-all duration-300 focus:border-purple-400/30 focus:bg-white/10 focus:outline-none"
                    placeholder="quantum.explorer@nexus.void"
                  />
                </div>
              </div>

              <div className="group relative">
                <label
                  className="mb-2 block text-xs font-light uppercase tracking-widest text-pink-300/80"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/10 to-cyan-400/10 opacity-0 blur transition-opacity duration-500 group-focus-within:opacity-100"></div>
                  <div className="relative">
                    <PasswordInput
                      value={password}
                      onChange={({ target }) => setPassword(target.value)}
                    />
                  </div>
                </div>
                <p className="mt-2 text-xs font-light text-white/50">
                  Password requires: 1 uppercase, 1 number, minimum 8 characters
                </p>
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

              <div className="flex items-start space-x-3">
                <div className="relative mt-1">
                  <input
                    type="checkbox"
                    className="peer sr-only"
                    defaultChecked
                    id="terms"
                  />
                  <label
                    htmlFor="terms"
                    className="relative flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 peer-checked:border-cyan-400/30 peer-checked:bg-gradient-to-r peer-checked:from-cyan-400/20 peer-checked:to-purple-400/20"
                  >
                    <svg
                      className="h-3 w-3 text-cyan-400 opacity-0 transition-opacity duration-300 peer-checked:opacity-100"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </label>
                </div>
                <label
                  htmlFor="terms"
                  className="cursor-pointer text-sm font-light text-white/70"
                >
                  I acknowledge the{" "}
                  <a
                    href="#"
                    className="text-cyan-400 transition-colors duration-200 hover:text-cyan-300"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-purple-400 transition-colors duration-200 hover:text-purple-300"
                  >
                    Privacy Policy
                  </a>
                </label>
              </div>

              <button
                type="submit"
                aria-label="Sign Up"
                className="group relative w-full cursor-pointer py-4 font-light text-white transition-all duration-500 hover:scale-[1.02]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 opacity-80 transition-opacity duration-300 group-hover:opacity-100"></div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100"></div>
                <span className="relative font-light tracking-wider">
                  Initialize Explorer Matrix
                </span>
              </button>
            </form>
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
