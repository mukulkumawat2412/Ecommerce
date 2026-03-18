import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import getCookie from '../../../../../Backend/src/utils/GetToken.js';
import { useDispatch, useSelector } from 'react-redux';
import { profileFetch, updateProfile } from '../../../redux/slices/authSlice.jsx';

const ProfileUpdate = () => {
    const [initialValues, setInitialValues] = useState({
        username: '',
        fullName: '',
        email: ''
    });

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);

    
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

   
    if (!isAuthenticated) {
        alert("User not logged in!");
        return null;
    }

    const fetchProfile = async () => {
        try {
       const res =     await dispatch(profileFetch())
      
            setInitialValues(res.payload);
        } catch (error) {
            console.log("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ useEffect at top-level
    useEffect(() => {
        fetchProfile();
    }, []);

    if (loading) return <p className="text-center mt-10">Loading...</p>;



  return (
  <div className="w-full min-h-screen flex justify-center pt-28 px-4 sm:px-6">
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={async (values, { resetForm, setSubmitting, setStatus }) => {
        try {
          const res = await dispatch(updateProfile(values));

          console.log(res);

          setStatus({
            success: res.payload.message || "Profile updated successfully!",
          });

          resetForm({
            values: {
              username: "",
              fullName: "",
              email: "",
            },
          });
        } catch (err) {
          console.error(err);
          setStatus({ error: "Error updating profile!" });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        values,
        handleChange,
        handleBlur,
        errors,
        touched,
        isSubmitting,
        status,
      }) => (
        <Form className="w-full max-w-lg p-5 sm:p-6 bg-white shadow rounded flex flex-col gap-4">
          
          <h2 className="text-xl sm:text-2xl font-bold mb-2 text-center sm:text-left">
            Update Profile
          </h2>

          {status?.success && (
            <p className="text-green-600 text-sm">{status.success}</p>
          )}
          {status?.error && (
            <p className="text-red-600 text-sm">{status.error}</p>
          )}

          <Field
            as={TextField}
            name="username"
            label="Name"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            fullWidth
          />

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

          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={isSubmitting}
            fullWidth
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

};

export default ProfileUpdate;
