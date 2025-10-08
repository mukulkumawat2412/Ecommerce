// AdminLayout.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiHome, FiBox, FiUsers, FiSettings } from "react-icons/fi";
import { MdCategory } from "react-icons/md";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white flex flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <h1 className="text-lg font-bold">Admin</h1>}
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiMenu size={24} />
          </button>
        </div>

        <nav className="flex-1 mt-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-4 p-4 hover:bg-gray-700 transition"
          >
            <FiHome size={20} />
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link
            to="/product-form"
            className="flex items-center gap-4 p-4 hover:bg-gray-700 transition"
          >
            <FiBox size={20} />
            {isOpen && <span>Products</span>}
          </Link>
             <Link
            to="/add-category"
            className="flex items-center gap-4 p-4 hover:bg-gray-700 transition"
          >
            <MdCategory size={20} />
            {isOpen && <span>Add Category</span>}
          </Link>
          <Link
            to="/users"
            className="flex items-center gap-4 p-4 hover:bg-gray-700 transition"
          >
            <FiUsers size={20} />
            {isOpen && <span>Users</span>}
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-4 p-4 hover:bg-gray-700 transition"
          >
            <FiSettings size={20} />
            {isOpen && <span>Settings</span>}
          </Link>
          
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
