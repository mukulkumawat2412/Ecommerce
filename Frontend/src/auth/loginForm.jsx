import React, { useState,useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // ✅ framer-motion import
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../redux/slices/authSlice";
import { CircularProgress } from "@mui/material";


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const navigate = useNavigate()

  const {loading} = useSelector((state)=>state.auth)

  const dispatch  = useDispatch()

 const {user,isAuthenticated,authLoading} = useSelector((state)=>state.auth)


  const role = user?.role
  console.log(role)

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

   

    try {
     
      
     await dispatch(Login({email,password})).unwrap()

    
    
      setEmail("");
      setPassword("");


    } catch (err) {
      console.error("Login Error:", err);
     
    } 

    
  };


useEffect(() => {
  if (isAuthenticated && user?.role) {
    if (user.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }
}, [isAuthenticated, user, navigate]);
// ✅ dependency: user



 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-sm md:max-w-md bg-white p-6 md:p-8 rounded-xl shadow-lg"
    >
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center text-xl md:text-2xl font-semibold mb-6"
      >
        Login
      </motion.h2>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <label className="block text-sm md:text-base font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full mt-1 p-2.5 border rounded-md outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          />
        </motion.div>

        {/* Password */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <label className="block text-sm md:text-base font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full mt-1 p-2.5 border rounded-md outline-none focus:ring-2 focus:ring-green-500 text-sm md:text-base"
          />
        </motion.div>

        {/* Button */}
        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 py-2.5 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition text-sm md:text-base flex justify-center items-center"
        >
          {loading ? (
            <CircularProgress size={24} className="text-white" />
          ) : (
            "Login"
          )}
        </motion.button>
      </form>

      {/* Links */}
      <div className="text-center mt-4 text-sm md:text-base">
        <Link to="/signup" className="text-blue-600 hover:underline">
          Don’t have an account? Register here
        </Link>
        <br />
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forgot Password
        </Link>
      </div>
    </motion.div>
  </div>
);

};

export default LoginForm;
