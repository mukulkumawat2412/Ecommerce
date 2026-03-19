import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBox, FiPlusSquare } from "react-icons/fi";
import { MdCategory } from "react-icons/md";

const Sidebar = ({ isMobileOpen, onClose }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Products", icon: <FiBox />, path: "/dashboard/products" },
    { name: "Add Product", icon: <FiPlusSquare />, path: "/product-form" },
  ];

  return (
    <>
      {/* ===== DESKTOP SIDEBAR ===== */}
      <div className="hidden sm:flex w-64 min-h-screen bg-gray-800 text-white flex-col">
        <div className="text-xl sm:text-2xl font-bold text-center py-4 border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="flex-1 mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 text-sm sm:text-base hover:bg-gray-700 transition ${
                location.pathname === item.path ? "bg-gray-700" : ""
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* ===== MOBILE DRAWER ===== */}
      {isMobileOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />

          {/* Drawer */}
          <div className="relative w-64 bg-gray-800 text-white flex flex-col z-10">
            <div className="text-xl font-bold text-center py-4 border-b border-gray-700">
              Admin Panel
            </div>
            <nav className="flex-1 mt-4">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-4 py-3 text-base hover:bg-gray-700 transition ${
                    location.pathname === item.path ? "bg-gray-700" : ""
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;