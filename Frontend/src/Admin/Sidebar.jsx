import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiHome, FiBox, FiPlusSquare } from "react-icons/fi";
import { MdCategory } from "react-icons/md";


const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <FiHome />, path: "/dashboard" },
    { name: "Products", icon: <FiBox />, path: "/dashboard/products" },
    { name: "Add Product", icon: <FiPlusSquare />, path: "/product-form" },
    
 
  ];

  return (
  <div
    className="
      w-64 min-h-screen bg-gray-800 text-white flex flex-col
      fixed sm:static z-40
      -translate-x-full sm:translate-x-0
      transition-transform duration-300
    "
  >
    {/* Header */}
    <div className="text-xl sm:text-2xl font-bold text-center py-4 border-b border-gray-700">
      Admin Panel
    </div>

    {/* Menu */}
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
          <span className="hidden sm:inline">{item.name}</span>
        </Link>
      ))}
    </nav>
  </div>
);

};

export default Sidebar;
