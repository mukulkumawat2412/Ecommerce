import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import getCookie from '../../../../../Backend/src/utils/GetToken.js';
import { useDispatch } from 'react-redux';
import { profileFetch, updateProfile } from '../../../redux/slices/authSlice.jsx';

const ProfileUpdate = () => {
    const [initialValues, setInitialValues] = useState({
        username: '',
        fullName: '',
        email: ''
    });

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true);

  

    const token = getCookie("accessToken");
    if (!token) {
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
        <div>
            <Formik
                enableReinitialize
                initialValues={initialValues}
               
                onSubmit={async (values, {resetForm, setSubmitting, setStatus }) => {
                    try {
                       
             const res =    await dispatch(updateProfile(values))

             console.log(res)
                            
                    
                        setStatus({ success: res.payload.message || "Profile updated successfully!" });

                        resetForm({
                            values:{
                                username:'',
                                fullName:'',
                                email:''
                            }
                        })

                    } catch (err) {
                        console.error(err);
                        setStatus({ error: "Error updating profile!" });
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ values, handleChange, handleBlur, errors, touched, isSubmitting, status }) => (
                    <Form className="max-w-lg mx-auto mt-25 p-6 bg-white shadow rounded flex flex-col gap-4">
                        <h2 className="text-2xl font-bold mb-4">Update Profile</h2>

                        {status && status.success && <p className="text-green-600">{status.success}</p>}
                        {status && status.error && <p className="text-red-600">{status.error}</p>}

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
