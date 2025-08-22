import React from "react";
import { useForm } from "react-hook-form";
import { AiOutlineUser, AiOutlineLock } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader"; // Adjust path
import { login } from "../services/operations/authAPI";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);

  const onSubmit = (data) => {
    dispatch(login(data.username, data.password, navigate));
    reset();
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center px-2">
      <div className="w-full sm:max-w-md bg-white rounded-xl shadow-2xl px-8 py-10">
        {/* Logo or App Name */}
        <div className="flex flex-col items-center mb-6">
          <img src="automation.png" alt="Logo" className="w-14 h-14 mb-2" />
          
        </div>

        <h2 className="text-center text-xl font-semibold text-gray-900 mb-6">
          Sign in to your account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Username */}
          <div>
            <div className="relative">
              <AiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                id="username"
                type="text"
                autoComplete="username"
                placeholder="Username"
                {...register("username", { required: "Username is required" })}
                className={`pl-10 pr-3 py-3 w-full rounded-lg border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-gray-50 transition`}
              />
            </div>
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>
          {/* Password */}
          <div>
            <div className="relative">
              <AiOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className={`pl-10 pr-3 py-3 w-full rounded-lg border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-gray-50 transition`}
              />
            </div>
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          {/* Forgot Password as link */}
          <div className="flex justify-end -mt-3">
            <a
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
            >
              Forgot password?
            </a>
          </div>
          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg tracking-wide shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            disabled={loading}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
