import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      // Store token in localStorage
      localStorage.setItem("token", response.data.token);

      // Redirect to Dashboard
      navigate("/Dashboard");
    } catch (err) {
      // Show error message as a toast notification
      toast.error(err.response?.data?.message || "Login failed! Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-gradient-to-r from-[#434570] to-[#232439] font-roboto width-full h-screen ">
      <h1 className="text-3xl font-bold text-white text-center py-8">
        Welcome to AI Fintech Finance Application
      </h1>
      <p className="text-1xl text-white text-center font-times">
        Please Login to The System
      </p>
      <div className="flex justify-center">
        <div className="w-full md:w-1/2 lg:w-1/3 mt-20 bg-gray-900 p-8 rounded-lg shadow-lg">
          <div className="text-center text-white text-2xl font-bold my-4">
            User Login
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-10">
              <label className="block text-xs font-bold text-gray-400 mb-2">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 bg-gray-900 border-b-2 border-blue-500 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-10">
              <label className="block text-xs font-bold text-gray-400 mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 bg-gray-900 border-b-2 border-blue-500 text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <button
                type="submit"
                className="px-6 py-2 bg-transparent border-2 border-blue-500 text-blue-500 font-bold rounded-md hover:bg-blue-500 hover:text-white transition duration-300 align-items-center w-full"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />
    </div>
  );
}
