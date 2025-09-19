import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";

import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [navbarStyle, setNavbarStyle] = useState("black");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const lastScrollY = useRef(0);
//   const [scrollCount, setScrollCount] = useState(0);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);

  const dropdownRef = useRef(null);

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

 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpenDropdown(false);
      }
    };

    if (isOpenDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenDropdown]);

  return (
    <div className="relative w-full">
      <nav
  className={`fixed top-0 left-0 w-full z-20 px-4 md:px-10 py-6 flex items-center justify-between transition-all duration-500 ease-in-out
  ${navbarStyle === "black" ? "bg-black shadow-md text-white" : "bg-transparent text-white"}
  ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}
>

        <div className="w-[50px] md:w-[120px] flex-shrink-0">
          <img  alt="Logo" className="w-full h-auto" />
        </div>

        <ul className="hidden md:flex md:space-x-6 items-center md:mr-20">
          <Link to="/"><li className="hover:text-purple-300 cursor-pointer">Home</li></Link>

          

         
          <li
            ref={dropdownRef}
            className="hover:text-purple-300 cursor-pointer relative"
            onClick={() => setIsOpenDropdown(!isOpenDropdown)}
          >
            Services <IoIosArrowDown className="ml-1 inline-block" />
            {/* {isOpenDropdown && (
              <div className="absolute top-full mt-2 bg-white shadow-lg rounded-sm w-56 p-2 z-50">
                <ul className="space-y-2 text-left font-semibold text-black">
                  <Link to={"/digital-transformation"}>
                    <li className="hover:bg-gray-100 hover:text-red-400 px-4 py-2 rounded cursor-pointer">Digital Transformation</li>
                  </Link>
                   <Link to={"web-application"}>
                    <li className="hover:bg-gray-100 hover:text-red-400 px-4 py-2 rounded cursor-pointer">Web Application Development</li>
                  </Link>
                   <Link to={"/mobile-application"}>
                    <li className="hover:bg-gray-100 hover:text-red-400 px-4 py-2 rounded cursor-pointer">Mobile Application Development</li>
                  </Link>
                  <Link to={"/ui-ux"}>
                    <li className="hover:bg-gray-100 hover:text-red-400 px-4 py-2 rounded cursor-pointer">UI/UX</li>
                  </Link>
                  <Link to={"/artificial-intelligence"}>
                    <li className="hover:bg-gray-100 hover:text-red-400 px-4 py-2 rounded cursor-pointer">Artificial Intelligence</li>
                  </Link>
                    <Link to={"/devops"}>
                    <li className="hover:bg-gray-100 hover:text-red-400 px-4 py-2 rounded cursor-pointer">Devops</li>
                  </Link>
                   <Link to={"/cms-development"}>
                    <li className="hover:bg-gray-100 hover:text-red-400 px-4 py-2 rounded cursor-pointer">Cms Development</li>
                  </Link>
                 
                </ul>
              </div>
            )} */}
          </li>

        
          <Link to="/about-us"><li className="hover:text-purple-300 cursor-pointer">About Us</li></Link>
          <Link to="/contact-us"><li className="hover:text-purple-300 cursor-pointer">Contact</li></Link>
          <Link to={"/career"}><li className='hover:text-purple-300 cursor-pointer'>Career</li></Link>
          <Link to="/faq"><li className='hover:text-purple-300 cursor-pointer'>FAQ</li></Link>
        </ul>

      
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
