// import React, { useState, useEffect, useRef } from "react";
// import { FaShoppingCart } from "react-icons/fa";
// import axios from "axios";
// import getCookie from "../../../../../Backend/src/utils/GetToken.js";
// import { useNavigate } from "react-router-dom";

// const CartDropdown = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef(null);
//   const token = getCookie("accessToken");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isOpen) {
//       const fetchCart = async () => {
//         try {
//           const { data } = await axios.get(
//             "http://localhost:8000/api/v1/cart/cartItem",
//             { headers: { Authorization: `Bearer ${token}` } }
//           );
//           setCartItems(data.data.data);
//         } catch (err) {
//           console.log(err.response?.data || err.message);
//         }
//       };
//       fetchCart();
//     }
//   }, [isOpen, token]);

//   // Click outside to close
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         className="relative p-2 rounded-full hover:bg-gray-700 transition"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <FaShoppingCart size={24} />
//         {cartItems.length > 0 && (
//           <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
//             {cartItems.length}
//           </span>
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute right-0 mt-2 w-80 bg-white shadow-lg rounded z-50 p-4">
//           <h2 className="font-bold text-lg mb-2">Your Cart</h2>
//           {cartItems.length === 0 ? (
//             <p className="text-gray-500">Cart is empty.</p>
//           ) : (
//             <div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
//               {cartItems.map((item) => (
//                 <div key={item._id} className="flex items-center gap-2 border-b pb-2">
//                   <img
//                     src={item.product.image[0]}
//                     alt={item.product.name}
//                     className="w-12 h-12 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <p className="font-semibold text-sm">{item.product.name}</p>
//                     <p className="text-gray-600 text-sm">₹{item.totalPrice}</p>
//                   </div>
//                   <p className="font-semibold">{item.quantity}x</p>
//                 </div>
//               ))}
              
//               <button
              
//                 className="mt-2 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
//               >
//                 Go to Cart
//               </button>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartDropdown;
