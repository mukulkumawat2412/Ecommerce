import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button } from '@mui/material';
import getCookie from '../../../../../Backend/src/utils/GetToken.js';
import axios from 'axios';
import { useDispatch ,useSelector} from 'react-redux';
import { profileChangePassword } from '../../../redux/slices/authSlice.jsx';

const ProfileChangePassword = () => {


  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

  const dispatch = useDispatch()

  if (!isAuthenticated) {
    alert("User not logged In")
   
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
    
    const res =   await dispatch(profileChangePassword({
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
          confirmNewPassword: values.confirmNewPassword
        }))

    
       setStatus({ success: res.payload.message || "Profile password changed successfully!" });
      resetForm();
    } catch (error) {
      console.error(error);
      setStatus({ error: error.res?.payload?.message || "Error changing password" });
    } finally {
      setSubmitting(false);
    }
  };

 return (
  <div className="w-full min-h-screen flex items-start justify-center pt-28 px-4 sm:px-6 lg:px-0">
    <div className="w-full max-w-md p-5 sm:p-6 bg-white shadow rounded">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
        Change Password
      </h2>

      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, errors, touched, isSubmitting, status }) => (
          <Form className="flex flex-col gap-4">
            
            {/* Status Messages */}
            {status?.success && (
              <p className="text-green-600 text-sm text-center">
                {status.success}
              </p>
            )}
            {status?.error && (
              <p className="text-red-600 text-sm text-center">
                {status.error}
              </p>
            )}

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
              className="py-2"
            >
              {isSubmitting ? "Updating..." : "Change Password"}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  </div>
);

};

export default ProfileChangePassword;
