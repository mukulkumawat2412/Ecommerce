import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Link } from "@mui/material";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const validationSchema = Yup.object({
    username: Yup.string()
      .required("⚠️ Username is required")
      .min(3, "At least 3 characters"),
    fullName: Yup.string()
      .required("⚠️ Full Name is required")
      .min(3, "At least 3 characters"),
    email: Yup.string()
      .email("⚠️ Invalid email format")
      .required("⚠️ Email is required"),
    password: Yup.string()
      .required("⚠️ Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Formik
        initialValues={{
          username: "",
          fullName: "",
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setSubmitting }) => {
          try {
            const response = await axios.post(
              "http://localhost:8000/api/v1/users/register",
              values,
              { withCredentials: true }
            );

            console.log("Register Response:", response.data);
            alert("✅ Registration successful! Please login.");
            resetForm();
          } catch (error) {
            console.error("Register Error:", error);
            alert("❌ Registration failed!");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting }) => (
          <Form
            style={{
              maxWidth: "400px",
              margin: "auto",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {/* Heading */}
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ textAlign: "center", marginBottom: "20px" }}
            >
              Register
            </motion.h2>

            {/* Username */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginBottom: "15px" }}
            >
              <Field
                as={TextField}
                name="username"
                label="Username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                fullWidth
              />
            </motion.div>

            {/* Full Name */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              style={{ marginBottom: "15px" }}
            >
              <Field
                as={TextField}
                name="fullName"
                label="Full Name"
                value={values.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.fullName && Boolean(errors.fullName)}
                helperText={touched.fullName && errors.fullName}
                fullWidth
              />
            </motion.div>

            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              style={{ marginBottom: "15px" }}
            >
              <Field
                as={TextField}
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                fullWidth
              />
            </motion.div>

            {/* Password */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              style={{ marginBottom: "15px" }}
            >
              <Field
                as={TextField}
                name="password"
                label="Password"
                type="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                fullWidth
              />
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              style={{ marginTop: "20px" }}
            >
              <Button
                type="submit"
                variant="contained"
                color="error"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Register"}
              </Button>
            </motion.div>

            {/* Already have account link */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{ textAlign: "center", marginTop: "15px" }}
            >
              <Link component={RouterLink} to="/login" underline="hover">
                Already have an account? Login here
              </Link>
            </motion.div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default SignUp;
