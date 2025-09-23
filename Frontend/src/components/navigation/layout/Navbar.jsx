import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";

import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import getCookie from '../../../../../Backend/src/utils/GetToken.js';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import SearchBar from '../SearchBar.jsx';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [navbarStyle, setNavbarStyle] = useState("black");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const lastScrollY = useRef(0);
//   const [scrollCount, setScrollCount] = useState(0);

     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const navigate = useNavigate()

//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;

//       if (currentScrollY === 0) {
//         setNavbarStyle("transparent");
//         setScrollCount(0);
//         setShowNavbar(true);
//       } else if (
//         currentScrollY > lastScrollY.current &&
//         scrollCount === 0 &&
//         currentScrollY > 50
//       ) {
//         setShowNavbar(false);
//         setScrollCount(1);
//       } else if (
//         currentScrollY > lastScrollY.current &&
//         scrollCount === 1 &&
//         currentScrollY > 80
//       ) {
//         setShowNavbar(true);
//         setNavbarStyle("white");
//         setScrollCount(2);
//       }

//       lastScrollY.current = currentScrollY;
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [scrollCount]);

let username = null

const token = getCookie("accessToken")

try {
const decoded =   jwtDecode(token)
  username = decoded.username
} catch (error) {
  console.log("invalid token",error)
  username = null
  
}
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);





  const handlelogout = async()=>{

    try {
      await axios.post("http://localhost:8000/api/v1/users/logout",{},
        {withCredentials:true}
      )

      navigate("/")

    } catch (error) {
      console.log("error logout",error)
      
    }
  }



  return (
    <div className="relative w-full">
      <nav
  className={`fixed top-0 left-0 w-full z-20 px-4 md:px-10 py-6 flex items-center justify-between transition-all duration-500 ease-in-out
  ${navbarStyle === "black" ? "bg-black shadow-md text-white" : "bg-transparent text-white"}
  ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
>

        <div className="w-[50px] md:w-[90px] flex-shrink-0">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvUy6QJ_dbr3a08V_Tj_IcuC7ewqh5W0ezjQ&s' alt="Logo" className="w-[150px] h-[50px]" />
        </div>
    <SearchBar/>
        <ul className="hidden md:flex md:space-x-6 items-center md:mr-20">
          <Link to="/"><li className="hover:text-purple-300 cursor-pointer">Home</li></Link>
          <Link to={"/products"}><li className='hover:text-purple-300 cursor-pointer'>Products</li></Link>
          <Link to="/about-us"><li className="hover:text-purple-300 cursor-pointer">About Us</li></Link>
          <Link to="/contact-us"><li className="hover:text-purple-300 cursor-pointer">Contact</li></Link>
          <Link to={"/career"}><li className='hover:text-purple-300 cursor-pointer'>Career</li></Link>
          <Link to="/faq"><li className='hover:text-purple-300 cursor-pointer'>FAQ</li></Link>
        </ul>


        <div style={{ position: "relative" }}>
        {!token ? (
         
          <div style={{ display: "flex", gap: "15px" }}>
            <Link to="/login" style={{ textDecoration: "none" }} className='text-green-500'>
              Login
            </Link>
            <Link
              to="/signup"
              style={{  textDecoration: "none" }} className='text-red-500'
            >
              Register
            </Link>
          </div>
        ) : (
          // If logged in → Profile dropdown
          <div ref={dropdownRef}>
  <button
    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    style={{
      background: "transparent",
      border: "none",
      color: "#fff",
      cursor: "pointer",
    }}
  >
    {username} ⬇
  </button>

 

  {isDropdownOpen && (
    <div
      style={{
        width:"180px",
        position: "absolute",
        right: 0,
        left:"-80px",
        top: "40px",
        background: "#fff",
        color: "#000",
        borderRadius: "5px",
        border: "1px solid #ccc",
        overflow: "hidden",
        zIndex: 1000,
      }}
    >
      <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
        View Profile
      </Link>
      <Link to="/update/profile" className="block px-4 py-2 hover:bg-gray-200">
        Update Profile
      </Link>
      <Link
        to="/changePassword/profile"
        className="block px-4 py-2 hover:bg-gray-200"
      >
        Change Password
      </Link>
      <button
        onClick={handlelogout}
        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 cursor-pointer"
      >
        Logout
      </button>
    </div>
  )}
</div>

        )}
      </div>

      
        <div className="md:hidden z-30">
          {isMenuOpen ? (
            <HiX
              className="text-3xl text-red-500 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            />
          ) : (
            <HiMenu
              className="text-3xl cursor-pointer"
              onClick={() => setIsMenuOpen(true)}
            />
          )}
        </div>

        <div
          className={`fixed top-0 right-0 h-screen w-64 bg-white text-black transform transition-transform duration-300 z-20 ${isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex flex-col items-start p-6 space-y-6 text-lg mt-16">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to={"/portfolio-grid"}><li onClick={()=>{setIsMenuOpen(false)}}>Portfolio</li></Link>
            <Link to="/industries" onClick={() => setIsMenuOpen(false)}>Industries</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/solutions" onClick={() => setIsMenuOpen(false)}>Solutions</Link>
            <Link to="/about-us" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/blogs" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
            <Link to="/contact-us" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to={"/career"} onClick={()=>{setIsMenuOpen(false)}}>Career</Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
