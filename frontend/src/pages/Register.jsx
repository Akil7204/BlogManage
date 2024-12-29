import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();

  const { setUser,user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(URL + "/api/auth/register", data);
      toast.success("Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      toast.error("Registration failed. Please try again.");
      console.error(err);
    }
  };

  const trimInput = (fieldName, value) => {
    setValue(fieldName, value.trim());
  };

    useEffect(() => {
      if (user) {
        navigate("/"); 
      }
    }, [user, navigate]);

  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />

      <div className="w-full flex justify-center items-center h-[80vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%] bg-white p-6 rounded-lg shadow-lg"
        >
          <h1 className="text-xl font-bold text-left">Create an Account</h1>

          <input
            {...register("username", {
              required: "Username is required",
              minLength: {
                value: 4, 
                message: "Username must be at least 4 characters long",
              },
              validate: (value) =>
                value.trim() !== "" || "Username cannot be empty",
            })}
            onBlur={(e) => trimInput("username", e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded outline-none focus:border-indigo-500"
            type="text"
            placeholder="Enter your username"
          />
          {errors.username && (
            <p className="text-red-500 text-sm">{errors.username.message}</p>
          )}

          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded outline-none focus:border-indigo-500"
            type="email"
            placeholder="Enter your email"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters long",
              },
              validate: (value) =>
                value.trim() !== "" || "Password cannot be empty",
            })}
            onBlur={(e) => trimInput("password", e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded outline-none focus:border-indigo-500"
            type="password"
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full px-4 py-2 text-lg font-bold text-white ${
              isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            } rounded-lg transition duration-200 ease-in-out`}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          <div className="flex justify-center items-center space-x-2">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="text-indigo-500 hover:text-indigo-700 transition duration-200"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
