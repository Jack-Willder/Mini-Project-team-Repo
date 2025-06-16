import { useState } from "react";

export default function LoginModal({ closeModal }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 relative">
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
        >
          &times;
        </button>

        <div className="flex justify-center mb-6">
          <button
            className={`px-4 py-2 text-sm font-medium ${isLogin ? "text-green-800 border-b-2 border-green-800" : "text-gray-500"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ml-4 ${!isLogin ? "text-green-800 border-b-2 border-green-800" : "text-gray-500"}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {isLogin ? (
          // Login Form
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Example : xyz@gmail.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-green-800 hover:underline">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-800 text-white rounded-md hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>
        ) : (
          // Register Form
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="Example : Sid"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Example : xyz@gmail.com"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="Create a password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                placeholder="Repeat password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-800" />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-800 text-white rounded-md hover:bg-green-800 transition"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
