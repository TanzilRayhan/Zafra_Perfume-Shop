import Link from "next/link";

export default function AuthForm({ type }: { type: "login" | "register" }) {
  return (
    <div className="w-1/4 min-h-[400px] bg-white border border-indigo-500 rounded-lg shadow-md p-8 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-indigo-800 mb-8">
        {type === "login" ? "Login" : "Register"}
      </h1>
      <form className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {type === "register" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {type === "register" && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200 font-medium"
        >
          {type === "login" ? "Login" : "Register"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          {type === "login" ? (
            <>
              Don't have an account?{" "}
              <Link href="/signup" className="text-indigo-600 hover:underline">
                Signup 
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
                <Link href="/login" className="text-indigo-600 hover:underline">
                Login 
              </Link>
            </>
          )}
        </p>
      </form>
    </div>
  );
}