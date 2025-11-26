import React, { useEffect, useState, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import getCookie from '../../../../../Backend/src/utils/GetToken.js';
import { jwtDecode } from 'jwt-decode';
import SearchBar from '../SearchBar.jsx';
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../../redux/slices/authSlice.jsx';
import { getCartItems } from '../../../redux/slices/cartSlice.jsx';
import { wishlistProducts } from '../../../redux/slices/wishlistSlice.jsx'; // Add this
import { FaRegHeart } from "react-icons/fa6";


function Navbar() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [navbarStyle, setNavbarStyle] = useState("black");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { cartItems } = useSelector((state) => state.cart)
  const { wishlistItems } = useSelector((state) => state.wishlist)


  console.log(cartItems)

  
  

  // const token = getCookie("accessToken")

  // console.log(token)

  
  // let username = null
  // let role = null

  // try {
  //   const decoded = jwtDecode(token)
  //   console.log(decoded)
  //   username = decoded.username
  //   role = decoded.role
  // } catch (error) {
  //   username = null
  //   role = null
  // }

  // Fetch cart items

  const {user,accessToken,loading} = useSelector((state)=>state.auth)


  console.log(user)
  console.log(accessToken)


  if(loading && (user || accessToken)) return null


  const username = user?.username
  const token = accessToken
  const role = user?.role


  const fetchCart = async () => {
    try {
     
      
 await dispatch(getCartItems())
      
     
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };


  const fetchWishlist = async () => {
    try {
     
        await dispatch(wishlistProducts())
        
     



    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchCart();
    fetchWishlist(); // << Add this
  }, [dispatch]); // token change triggers wishlist fetch

  // Handle dropdown outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handlelogout = async () => {
    try {


      // Redux state clear
      await dispatch(Logout()).unwrap();


      navigate("/");
    } catch (error) {
      console.log("Error during logout:", error);
      // Fir bhi frontend logout
      await dispatch(Logout()).unwrap();
      document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/");
    }
  };


  return (
    <div className="relative w-full">
      <nav className={`fixed top-0 left-0 w-full z-20 px-4 md:px-10 py-6 flex items-center justify-between transition-all duration-500 ease-in-out
        ${navbarStyle === "black" ? "bg-black shadow-md text-white" : "bg-transparent text-white"}
        ${showNavbar ? "translate-y-0" : "-translate-y-full"}`}>

        <div className="w-[50px] md:w-[90px] flex-shrink-0">
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvUy6QJ_dbr3a08V_Tj_IcuC7ewqh5W0ezjQ&s' alt="Logo" className="w-[150px] h-[50px]" />
        </div>

        <SearchBar />

        <ul className="hidden md:flex md:space-x-6 items-center md:mr-20">
          {role === "admin" ? (
            <>
              <Link to={"/dashboard"}><li className='hover:text-purple-300 cursor-pointer'>Dashboard</li></Link>
              <Link to={"/add-category"}><li className='hover:text-purple-300 cursor-pointer'>AddCategory</li></Link>
              <Link to={"/product-form"}><li>ProductForm</li></Link>
              <Link to={"/create-coupon"}><li className='hover:text-purple-300 cursor-pointer'>Coupon</li></Link>
            </>
          ) : (
            <>
              <Link to="/"><li className="hover:text-purple-300 cursor-pointer">Home</li></Link>
             
              <Link to="/about-us"><li className="hover:text-purple-300 cursor-pointer">About Us</li></Link>
              <Link to="/contact-us"><li className="hover:text-purple-300 cursor-pointer">Contact</li></Link>
              <Link to="/faq"><li className='hover:text-purple-300 cursor-pointer'>FAQ</li></Link>

              {
                token && (
                  <>
                   <Link to={"/product-page"}><li className='hover:text-purple-300 cursor-pointer'>Products</li></Link>
                    <Link to={"/cart-page"}>
                      <li className="relative list-none mx-2">
                        <FaShoppingCart size={24} />
                        {cartItems.length > 0 && (
                          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {cartItems.length}
                          </span>
                        )}
                      </li>
                    </Link>

                    <Link to={"/wishlist-page"}>
                      <li className="relative list-none mx-2">
                        <FaRegHeart size={24} />
                        {wishlistItems.length > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 rounded-full">
                            {wishlistItems.length}
                          </span>
                        )}
                      </li>
                    </Link>
                  </>

                )
              }



            </>
          )}
        </ul>

        {/* User login/logout */}
        <div style={{ position: "relative" }}>
          {!token ? (
            <div style={{ display: "flex", gap: "15px" }}>
              <Link to="/login" className='text-green-500 font-semibold'>Login</Link>
              <Link to="/signup" className='text-red-500 font-semibold'>Register</Link>
            </div>
          ) : (
            <div ref={dropdownRef}>
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ background: "transparent", border: "none", color: "#fff", cursor: "pointer" }}>
                {username} ⬇
              </button>
              {isDropdownOpen && (
                <div style={{ width: "180px", position: "absolute", right: 0, left: "-80px", top: "40px", background: "#fff", color: "#000", borderRadius: "5px", border: "1px solid #ccc", overflow: "hidden", zIndex: 1000 }}>
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">View Profile</Link>
                  <Link to="/update/profile" className="block px-4 py-2 hover:bg-gray-200">Update Profile</Link>
                  <Link to="/changePassword/profile" className="block px-4 py-2 hover:bg-gray-200">Change Password</Link>
                  <button onClick={handlelogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 cursor-pointer">Logout</button>
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

        <div className={`fixed top-0 right-0 h-screen w-64 bg-white text-black transform transition-transform duration-300 z-20 ${isMenuOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex flex-col items-start p-6 space-y-6 text-lg mt-16">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to={"/portfolio-grid"}><li onClick={() => setIsMenuOpen(false)}>Portfolio</li></Link>
            <Link to="/industries" onClick={() => setIsMenuOpen(false)}>Industries</Link>
            <Link to="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/solutions" onClick={() => setIsMenuOpen(false)}>Solutions</Link>
            <Link to="/about-us" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            <Link to="/blogs" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
            <Link to="/contact-us" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <Link to={"/career"} onClick={() => setIsMenuOpen(false)}>Career</Link>
            <Link to="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</Link>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
