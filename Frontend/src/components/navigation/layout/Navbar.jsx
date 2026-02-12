import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../SearchBar.jsx';
import { FaShoppingCart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { Logout, RefreshAccessToken } from '../../../redux/slices/authSlice.jsx';
import { getCartItems } from '../../../redux/slices/cartSlice.jsx';
import { wishlistProducts } from '../../../redux/slices/wishlistSlice.jsx';
import { CiLogout } from "react-icons/ci";


function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { user, authLoading,isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated,user)


  const username = user?.username;
  const role = user?.role;

 

  // ✅ Silent refresh on mount (optional if not done globally)
  useEffect(() => {
    if (!isAuthenticated) dispatch(RefreshAccessToken());
  }, [dispatch, isAuthenticated]);

  // ✅ Cart & Wishlist fetch
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartItems());
      dispatch(wishlistProducts());
    }
  }, [dispatch, isAuthenticated]);

  // ✅ Dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      

     await dispatch(Logout())
    navigate("/login")
    

      
    
      
    } catch (error) {
      console.log("Logout error:", error);
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    }
  };

  // ✅ Show spinner while authLoading OR initialLoading
  if (authLoading){
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
      </div>
    );
  }

return (
  <div className="relative w-full">
    <nav className="fixed top-0 left-0 w-full z-20 px-4 md:px-10 py-6 flex items-center justify-between bg-black text-white shadow-md">
      
      {/* Logo */}
      <div className="w-[50px] md:w-[90px] flex-shrink-0">
        <img
          src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvUy6QJ_dbr3a08V_Tj_IcuC7ewqh5W0ezjQ&s'
          alt="Logo"
          className="w-[150px] h-[60px]"
        />
      </div>

      <SearchBar />

      {/* Desktop Menu */}
      <ul className="hidden md:flex md:space-x-8 items-center md:mr-20">
        {role === "admin" ? (
          <>
            <Link to="/dashboard"><li className='hover:text-purple-300 cursor-pointer'>Dashboard</li></Link>
            <Link to="/add-category"><li className='hover:text-purple-300 cursor-pointer'>AddCategory</li></Link>
            <Link to="/product-form"><li className='hover:text-purple-300 cursor-pointer'>ProductForm</li></Link>
            <Link to="/create-coupon"><li className='hover:text-purple-300 cursor-pointer'>Coupon</li></Link>
          </>
        ) : (
          <>
            <Link to="/"><li className="hover:text-purple-300 cursor-pointer">Home</li></Link>
            <Link to="/about-us"><li className='hover:text-purple-300 cursor-pointer'>About Us</li></Link>
            <Link to="/contact-us"><li className='hover:text-purple-300 cursor-pointer'>Contact</li></Link>
            <Link to="/faq"><li className='hover:text-purple-300 cursor-pointer'>FAQ</li></Link>

            {isAuthenticated && (
              <div className="flex items-center gap-6">
                <Link to="/product-page">
                  <li className='hover:text-purple-300 cursor-pointer'>Products</li>
                </Link>

                <Link to="/cart-page">
                  <li className="relative">
                    <FaShoppingCart size={24} />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {cartItems.length}
                      </span>
                    )}
                  </li>
                </Link>

                <Link to="/wishlist-page">
                  <li className="relative">
                    <FaRegHeart size={24} />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                        {wishlistItems.length}
                      </span>
                    )}
                  </li>
                </Link>
              </div>
            )}
          </>
        )}
      </ul>

      {/* User login/logout */}
      <div ref={dropdownRef} className="relative">
        {!isAuthenticated ? (
          <div className="flex gap-6">
            <Link to="/login" className='text-green-500 font-semibold'>Login</Link>
            <Link to="/signup" className='text-red-500 font-semibold'>Register</Link>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-transparent border-none cursor-pointer"
            >
              {username} ⬇
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-12 w-44 bg-white text-black border rounded-md shadow-md z-50">
                <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">View Profile</Link>
                <Link to="/update/profile" className="block px-4 py-2 hover:bg-gray-200">Update Profile</Link>
                <Link to="/changePassword/profile" className="block px-4 py-2 hover:bg-gray-200">Change Password</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                >
                  <CiLogout />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile menu */}
      <div className="md:hidden z-30">
        {isMenuOpen ? (
          <HiX className="text-3xl text-red-500 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
        ) : (
          <HiMenu className="text-3xl cursor-pointer" onClick={() => setIsMenuOpen(true)} />
        )}
      </div>
    </nav>
  </div>
);


}

export default Navbar;
