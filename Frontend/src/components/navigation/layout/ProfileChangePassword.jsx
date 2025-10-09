import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import getCookie from '../../../../../Backend/src/utils/GetToken.js';
import axios from 'axios';

const ProfileChangePassword = () => {
  const token = getCookie("accessToken");

  if (!token) {
    alert("User not logged in");
    return null;
  }

  // Validation using Yup
  const validationSchema = Yup.object({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string().required("New password is required"),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], "Passwords must match")
      .required("Confirm password is required")
  });

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/api/v1/users/profile-change-password",
        {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true
        }
      );

      setStatus({ success: res.data.message || "Profile password changed successfully!" });
      resetForm();
    } catch (error) {
      console.error(error);
      setStatus({ error: error.response?.data?.message || "Error changing password" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-25 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting, status }) => (
          <Form className="flex flex-col gap-4">
            {/* Status Messages */}
            {status?.success && <p className="text-green-600">{status.success}</p>}
            {status?.error && <p className="text-red-600">{status.error}</p>}

            <Field
              as={TextField}
              type="password"
              name="oldPassword"
              label="Old Password"
              value={values.oldPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.oldPassword && Boolean(errors.oldPassword)}
              helperText={touched.oldPassword && errors.oldPassword}
              fullWidth
            />

            <Field
              as={TextField}
              type="password"
              name="newPassword"
              label="New Password"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.newPassword && Boolean(errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
              fullWidth
            />

            <Field
              as={TextField}
              type="password"
              name="confirmNewPassword"
              label="Confirm New Password"
              value={values.confirmNewPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmNewPassword && Boolean(errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
              fullWidth
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? "Updating..." : "Change Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileChangePassword;
