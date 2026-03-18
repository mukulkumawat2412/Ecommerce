import React, { useEffect, useState, useRef } from 'react';
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

  const username = user?.username;
  const role = user?.role;

  // Silent refresh
  useEffect(() => {
    if (!isAuthenticated) dispatch(RefreshAccessToken());
  }, [dispatch, isAuthenticated]);

  // Cart & Wishlist fetch
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCartItems());
      dispatch(wishlistProducts());
    }
  }, [dispatch, isAuthenticated]);

  // Close dropdown on outside click
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
      await dispatch(Logout());
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    }
  };

  if (authLoading){
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-30 px-4 md:px-10 py-4 flex items-center justify-between bg-black text-white shadow-md">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvUy6QJ_dbr3a08V_Tj_IcuC7ewqh5W0ezjQ&s'
            alt="Logo"
            className="w-[120px] md:w-[150px] h-[40px] md:h-[60px]"
          />
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 mx-4">
          <SearchBar />
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex md:space-x-8 items-center md:mr-20">
          <Link to="/"><li className="hover:text-purple-300 cursor-pointer">Home</li></Link>
          <Link to="/about-us"><li className='hover:text-purple-300 cursor-pointer'>About Us</li></Link>
          <Link to="/contact-us"><li className='hover:text-purple-300 cursor-pointer'>Contact</li></Link>
          <Link to="/faq"><li className='hover:text-purple-300 cursor-pointer'>FAQ</li></Link>
          {isAuthenticated && <Link to="/product-page"><li className='hover:text-purple-300 cursor-pointer'>Products</li></Link>}
          {role === "admin" && <>
            <Link to="/dashboard"><li className='hover:text-purple-300 cursor-pointer'>Dashboard</li></Link>
            <Link to="/add-category"><li className='hover:text-purple-300 cursor-pointer'>AddCategory</li></Link>
            <Link to="/product-form"><li className='hover:text-purple-300 cursor-pointer'>ProductForm</li></Link>
            <Link to="/create-coupon"><li className='hover:text-purple-300 cursor-pointer'>Coupon</li></Link>
          </>}
          {/* Cart & Wishlist desktop */}
          {isAuthenticated && (
            <>
              <Link to="/cart-page" className="relative">
                <li>
                  <FaShoppingCart size={24}/>
                  {cartItems.length > 0 && <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartItems.length}</span>}
                </li>
              </Link>
              <Link to="/wishlist-page" className="relative">
                <li>
                  <FaRegHeart size={24}/>
                  {wishlistItems.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">{wishlistItems.length}</span>}
                </li>
              </Link>
            </>
          )}
        </ul>

        {/* User dropdown */}
        <div ref={dropdownRef} className="relative">
          {!isAuthenticated ? (
            <div className="flex gap-6">
              <Link to="/login" className='text-green-500 font-semibold'>Login</Link>
              <Link to="/signup" className='text-red-500 font-semibold'>Register</Link>
            </div>
          ) : (
            <div>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="bg-transparent border-none cursor-pointer">
                {username} ⬇
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-white text-black border rounded-md shadow-md z-50">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">View Profile</Link>
                  <Link to="/update/profile" className="block px-4 py-2 hover:bg-gray-200">Update Profile</Link>
                  <Link to="/changePassword/profile" className="block px-4 py-2 hover:bg-gray-200">Change Password</Link>
                  <button onClick={handleLogout} className="flex items-center w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 gap-2">
                    <CiLogout className="text-black text-2xl"/> Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <div className="md:hidden z-40">
          {isMenuOpen ? (
            <HiX className="text-3xl text-red-500 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
          ) : (
            <HiMenu className="text-3xl cursor-pointer" onClick={() => setIsMenuOpen(true)} />
          )}
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-20">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute top-[64px] left-0 right-0 bg-[#0b0b0b] text-white p-4 border-t border-gray-800 overflow-y-auto max-h-[calc(100vh-64px)]">
            <div className="mb-4">
              <SearchBar />
            </div>
            <div className="flex flex-col gap-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-gray-800">Home</Link>
              <Link to="/about-us" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-gray-800">About Us</Link>
              <Link to="/contact-us" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-gray-800">Contact</Link>
              <Link to="/faq" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-gray-800">FAQ</Link>
              {isAuthenticated && <Link to="/product-page" onClick={() => setIsMenuOpen(false)} className="py-2 border-b border-gray-800">Products</Link>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;