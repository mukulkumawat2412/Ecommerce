// AdminLayout.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiHome, FiBox, FiUsers, FiSettings, FiX } from "react-icons/fi";
import { RiCouponLine } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { IoMdContact } from "react-icons/io";

const navLinks = [
  { to: "/dashboard", icon: <FiHome size={20} />, label: "Dashboard" },
  { to: "/product-form", icon: <FiBox size={20} />, label: "Products" },
  { to: "/add-category", icon: <MdCategory size={20} />, label: "Add Category" },
  { to: "/admin-coupons", icon: <RiCouponLine size={20} />, label: "Coupons" },
  { to: "/contact-dashboard", icon: <IoMdContact size={20} />, label: "Contact" },
  { to: "/users", icon: <FiUsers size={20} />, label: "Users" },
  { to: "/settings", icon: <FiSettings size={20} />, label: "Settings" },
];

const AdminLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* ===== DESKTOP SIDEBAR ===== */}
      <div
        className={`hidden sm:flex bg-gray-800 text-white flex-col transition-all duration-300 ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          {isOpen && <h1 className="text-lg font-bold">Admin</h1>}
          <button onClick={() => setIsOpen(!isOpen)}>
            <FiMenu size={22} />
          </button>
        </div>

        <nav className="flex-1 mt-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="flex items-center gap-4 p-4 hover:bg-gray-700"
            >
              {link.icon}
              {isOpen && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* ===== MOBILE TOPBAR ===== */}
      <div className="sm:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-bold">Admin</h1>
        <button onClick={() => setIsMobileOpen(true)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* ===== MOBILE DRAWER OVERLAY ===== */}
      {isMobileOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="relative w-64 bg-gray-800 text-white flex flex-col z-10">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h1 className="text-lg font-bold">Admin</h1>
              <button onClick={() => setIsMobileOpen(false)}>
                <FiX size={22} />
              </button>
            </div>

            <nav className="mt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileOpen(false)}
                  className="flex items-center gap-4 p-4 hover:bg-gray-700"
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 p-4 sm:p-6 mt-14 sm:mt-0 overflow-x-hidden">
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;