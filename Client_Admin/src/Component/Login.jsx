import React, { useState } from "react";
import { Toaster } from "sonner";
import loginLottie from "../assets/login.json";
import Lottie from "lottie-react";
import { IoMdPerson } from "react-icons/io";
import { IoLockClosedSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { loginFunction } from "../store/AdminThunk"; 
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminDetails, setAdminDetails] = useState({
    email: "",
    password: "",
  });

  const loginFunctionCall = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginFunction(adminDetails));
      console.log("Login result:", result);
      if (result.payload?.admin) {
        localStorage.setItem("adminToken", "true");
        setTimeout(() => {
          navigate("/new-product");
        }, 1000);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-cyan-50 to-blue-100 px-6 py-10">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center gap-10">
        
        {/* Left Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginLottie} loop={true} />
        </div>

        {/* Right Form */}
        <form
          onSubmit={loginFunctionCall}
          className="w-full md:w-1/2 bg-white shadow-xl rounded-2xl px-10 py-10 border border-cyan-200"
        >
          <p className="text-center mb-10 text-3xl font-bold text-cyan-700">
            Welcome Back
          </p>

          {/* Email */}
          <label className="text-sm mb-1 font-medium text-gray-600">
            Email Address
          </label>
          <div className="flex flex-row items-center gap-2 bg-gray-100 py-3 px-4 rounded-md mb-5 focus-within:ring-2 ring-cyan-400">
            <IoMdPerson className="text-gray-400 text-xl" />
            <input
              className="w-full bg-transparent outline-none"
              placeholder="Enter Email"
              value={adminDetails.email}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, email: e.target.value })
              }
              type="email"
              required
            />
          </div>

          {/* Password */}
          <label className="text-sm mb-1 font-medium text-gray-600">
            Password
          </label>
          <div className="flex flex-row items-center gap-2 bg-gray-100 py-3 px-4 rounded-md mb-4 focus-within:ring-2 ring-cyan-400">
            <IoLockClosedSharp className="text-gray-400 text-xl" />
            <input
              className="w-full bg-transparent outline-none"
              placeholder="Enter Password"
              value={adminDetails.password}
              onChange={(e) =>
                setAdminDetails({ ...adminDetails, password: e.target.value })
              }
              type="password"
              required
            />
          </div>

          {/* Options */}
          <div className="flex flex-row justify-between mb-8">
            <div className="flex flex-row gap-2 items-center">
              <input
                type="checkbox"
                className="accent-cyan-600 size-4"
              />
              <p className="text-sm text-gray-700">Remember Me</p>
            </div>

            <p className="text-sm text-cyan-600 underline cursor-pointer font-medium hover:text-cyan-800">
              Forgot Password?
            </p>
          </div>

          {/* Button */}
          <button
            className="bg-cyan-500 hover:bg-cyan-600 transition-all text-white w-full py-3 rounded-full font-semibold shadow-md"
            type="submit"
          >
            Login
          </button>
        </form>

        <Toaster />
      </div>
    </main>
  );
}

export default Login;
