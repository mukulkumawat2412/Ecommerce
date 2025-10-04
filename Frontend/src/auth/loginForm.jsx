import React, { useState } from "react";
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


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password!");
      return;
    }

   

    try {
     
      
    const res =   await dispatch(Login({email,password})).unwrap()

    
 
     
      console.log(res)

      setEmail("");
      setPassword("");


  const role = res.loggedIn.role

  if(role==="user"){
    navigate("/")
  }


      if(role==="admin"){
        navigate("/dashboard")
      }

        



    } catch (err) {
      console.error("Login Error:", err);
     
    } 
      
    
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{
    
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
       
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <motion.h2
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "20px" }}
      >
        Login
      </motion.h2>

      <form onSubmit={handleLogin}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          style={{ marginBottom: "15px" }}
        >
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: "15px" }}
        >
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
              marginTop: "5px",
            }}
          />
        </motion.div>

        <motion.button
        
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: "100%",
            padding: "10px",
            background: "#007BFF",
            color: "#fff",
            border: "none",
            backgroundColor:"#16a34a",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
         {loading ? <CircularProgress size={24} className="text-white font-bold" /> : "login"}
        </motion.button>
      </form>

          <div style={{ textAlign: "center", marginTop: "10px" }}>
  <Link to="/signup" style={{ color: "#007BFF", textDecoration: "none" }}>
    Don’t have an account? Register here
  </Link><br/>
  <Link to="/forgot-password" style={{ color: "#007BFF", textDecoration: "none" }}>
  ForgotPassword
  </Link>
</div>


    </motion.div>
  );
};

export default LoginForm;
