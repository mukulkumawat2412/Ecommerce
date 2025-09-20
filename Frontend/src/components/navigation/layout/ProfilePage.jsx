import React, { useEffect, useState } from 'react';
import getCookie from '../../../../../Backend/src/utils/GetToken.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getCookie("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:8000/api/v1/users/profile", {
          headers: {  // corrected "header" to "headers"
            Authorization: `Bearer ${token}`
          },
          withCredentials: true
        });
        setProfileData(res.data.data);
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
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Profile</h2>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Profile Picture Placeholder */}
        <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xl font-semibold">
          {profileData.username ? profileData.username[0].toUpperCase() : 'A'}
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
