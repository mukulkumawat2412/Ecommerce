// AdminLayout.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiHome, FiBox, FiUsers, FiSettings } from "react-icons/fi";
import { RiCouponLine } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { IoMdContact } from "react-icons/io";

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

return (
  <div className="flex min-h-screen bg-gray-100">

    {/* Sidebar */}
    <div
      className={`bg-gray-800 text-white flex flex-col 
      transition-all duration-300
      ${isOpen ? "w-64" : "w-16"}
      hidden sm:flex`}   // ✅ Mobile par hide, tablet/laptop par show
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {isOpen && <h1 className="text-lg font-bold">Admin</h1>}
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={22} />
        </button>
      </div>

      <nav className="flex-1 mt-4">
        <Link to="/dashboard" className="flex items-center gap-4 p-4 hover:bg-gray-700">
          <FiHome size={20} />
          {isOpen && <span>Dashboard</span>}
        </Link>

        <Link to="/product-form" className="flex items-center gap-4 p-4 hover:bg-gray-700">
          <FiBox size={20} />
          {isOpen && <span>Products</span>}
        </Link>

        <Link to="/add-category" className="flex items-center gap-4 p-4 hover:bg-gray-700">
          <MdCategory size={20} />
          {isOpen && <span>Add Category</span>}
        </Link>

        <Link to="/admin-coupons" className="flex items-center gap-4 p-4 hover:bg-gray-700">
          <RiCouponLine size={20} />
          {isOpen && <span>Coupons</span>}
        </Link>

        <Link to="/contact-dashboard" className="flex items-center gap-4 p-4 hover:bg-gray-700">
          <IoMdContact size={20} />
          {isOpen && <span>Contact</span>}
        </Link>

        <Link to="/users" className="flex items-center gap-4 p-4 hover:bg-gray-700">
          <FiUsers size={20} />
          {isOpen && <span>Users</span>}
        </Link>

        <Link to="/settings" className="flex items-center gap-4 p-4 hover:bg-gray-700">
          <FiSettings size={20} />
          {isOpen && <span>Settings</span>}
        </Link>
      </nav>
    </div>

    {/* Mobile Sidebar Toggle Button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="sm:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
    >
      <FiMenu size={22} />
    </button>

    {/* Mobile Sidebar Drawer */}
    {isOpen && (
      <div className="sm:hidden fixed inset-0 z-40 bg-gray-800 text-white w-64">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-lg font-bold">Admin</h1>
          <button onClick={() => setIsOpen(false)}>
            <FiMenu size={22} />
          </button>
        </div>

        <nav className="mt-4">
          <Link to="/dashboard" className="block p-4 hover:bg-gray-700">Dashboard</Link>
          <Link to="/product-form" className="block p-4 hover:bg-gray-700">Products</Link>
          <Link to="/add-category" className="block p-4 hover:bg-gray-700">Add Category</Link>
          <Link to="/admin-coupons" className="block p-4 hover:bg-gray-700">Coupons</Link>
          <Link to="/contact-dashboard" className="block p-4 hover:bg-gray-700">Contact</Link>
          <Link to="/users" className="block p-4 hover:bg-gray-700">Users</Link>
          <Link to="/settings" className="block p-4 hover:bg-gray-700">Settings</Link>
        </nav>
      </div>
    )}

    {/* Main Content */}
    <div className="flex-1 p-4 sm:p-6 mt-0">
      {children}
    </div>

  </div>
);


};

export default AdminLayout;
