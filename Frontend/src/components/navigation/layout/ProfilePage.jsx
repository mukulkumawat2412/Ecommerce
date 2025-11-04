import React, { useEffect, useState } from 'react';
import getCookie from '../../../../../Backend/src/utils/GetToken.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { profileFetch } from '../../../redux/slices/authSlice.jsx';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
 

  const dispatch = useDispatch()
  const {profileData} = useSelector((state)=>state.auth)


  console.log(profileData)

  useEffect(() => {
    const fetchProfile = async () => {
    

      try {

      const res =   await dispatch(profileFetch())

      console.log(res)
    
      } catch (error) {
        console.log("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  if (!profileData) return <p className="text-center mt-10 text-red-500">No profile data found.</p>;

  return (
    <div className="max-w-4xl mx-auto my-35 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Picture Placeholder */}
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl font-semibold">
          {profileData.username ? profileData.username[0].toUpperCase():""}
        </div>

        {/* Profile Details */}
        <div className="flex-1">
          <p className="mb-2"><span className="font-semibold">Name:</span> {profileData.username}</p>
          <p className="mb-2"><span className="font-semibold">Full Name:</span> {profileData.fullName}</p>
          <p className="mb-2"><span className="font-semibold">Email:</span> {profileData.email}</p>
          <p className="mb-2"><span className="font-semibold">Role:</span> {profileData.role}</p>
          {/* Add more ecommerce-style info if needed, like orders, wishlist, etc */}
        </div>
      </div>

      {/* Optional Action Buttons */}
      <div className="mt-6 flex gap-4">
      <Link to={"/update/profile"}>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
          Edit Profile
        </button>
        </Link>
      <Link to={"/changePassword/profile"}>
        <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition cursor-pointer">
          Change Password
        </button>
        </Link>
      </div>
    </div>
  );
}

export default ProfilePage;
