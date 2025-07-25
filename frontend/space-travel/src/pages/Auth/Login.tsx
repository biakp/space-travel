import { NasaImage } from "../../components/nasaImage";

export const Login = () => {
  return (
    <div className="grid h-screen text-gray-900 md:grid-cols-2">
      {/* Left: Form */}
      <div className="flex flex-col justify-center px-8 md:px-16 lg:px-24">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
            <svg
              className="h-6 w-6 text-gray-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.667 0-8 1.333-8 4v2h16v-2c0-2.667-5.333-4-8-4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">Log in to your account</h2>
          <p className="mt-1 text-gray-500">
            Please enter your details to start your journey with us.
          </p>
        </div>

        <form className="mb-4 space-y-4 text-sm">
          <div>
            <label className="mb-1 block font-medium" htmlFor="email">
              Email address *
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-lg border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="youremail@website.com"
            />
          </div>
          <div>
            <label className="mb-1 block font-medium" htmlFor="password">
              Password *
            </label>
            <input
              type="password"
              id="password"
              className="w-full rounded-lg border border-gray-600 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
            <div className="mt-1 text-right">
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-indigo-500 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-lg bg-indigo-500 py-2 text-white transition hover:bg-indigo-600"
          >
            Log In
          </button>
        </form>

        <div className="mb-4 text-center text-sm text-gray-400">OR</div>

        <div className="mb-4 flex gap-4">
          <button className="flex-1 cursor-pointer rounded-lg border py-2 text-sm text-gray-600 hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="mr-2 inline w-4"
            />
            Google
          </button>
          <button className="flex-1 cursor-pointer rounded-lg border py-2 text-sm text-gray-600 hover:bg-gray-50">
            <img
              src="https://www.svgrepo.com/show/475647/facebook-color.svg"
              alt="Facebook"
              className="mr-2 inline w-4"
            />
            Facebook
          </button>
        </div>
      </div>

      {/* Right: NASA Image */}
      <div className="relative hidden overflow-hidden md:block p-6">
        <NasaImage fallback="/fallback.jpg" />
      </div>
    </div>
  );
};
