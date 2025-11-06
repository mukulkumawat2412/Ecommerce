import React, { useEffect, useState } from "react";
import axios from "axios";
import getCookie from "../../../../../Backend/src/utils/GetToken.js";
import { useNavigate } from "react-router-dom";
import { parseInt } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  createCheckOut,
  DeleteCartItems,
  getCartItems,
} from "../../../redux/slices/cartSlice.jsx";
import api from "../../../utils/axiosInstance.js";
import { ApplyCoupon } from "../../../redux/slices/couponSlice..jsx";






const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

 
  const [MYCouponCode, setCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");

  const [isApplying, setIsApplying] = useState(false);

  const token = getCookie("accessToken");
  const dispatch = useDispatch();
  const navigate = useNavigate();

 

console.log(cartItems)
  const {discount,message,couponCode,totalAfterDiscount} = useSelector((state)=>state.coupon)


  useEffect(() => {
 
}, [cartItems]);

  // 🔹 Scroll to top on load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // 🔹 Fetch cart items
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await dispatch(getCartItems());
        console.log(res)
        setCartItems(res.payload);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [token, dispatch]);

  // 🔹 Calculate subtotal & total (always correct)
  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setSubtotal(total);

    // Recalculate total when discount/subtotal changes
   
  }, [cartItems, discount]);

  // 🔹 Update product quantity
  const updateQuantity = async (cartId, newQty) => {
    if (newQty < 1) return;
    try {
      await axios.put(
        `http://localhost:8000/api/cart/${cartId}`,
        { quantity: newQty },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === cartId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // 🔹 Remove item from cart
  const removeItem = async (cartId) => {
    try {
      await dispatch(DeleteCartItems({ cartId }));
      navigate(0);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // 🔹 Apply Coupon
 // 🔹 Apply Coupon (Fixed)
const handleApplyCoupon = async () => {
  if (!MYCouponCode.trim()) {
    setCouponMessage("Please enter a coupon code");
    return;
  }
  
   setCouponCode("")
   setCouponMessage("")

  setIsApplying(true);
  try {
  const res =  await dispatch(ApplyCoupon({  coupon_code: MYCouponCode,
      cartTotal: subtotal}))

      console.log(res.payload)

    const data = res.payload; // ✅ actual response object
    console.log("Coupon Response:", data);
    
   
    
  
  } catch (error) {
    console.error("Coupon error:", error);
 
   
  } finally {
    setIsApplying(false);
  }
};







  // 🔹 Checkout
  const handleCheckout = async () => {
    try {
      const response = await dispatch(
        createCheckOut({ products: cartItems,amount:totalAfterDiscount })
      ).unwrap();

      if (response?.url) {
        window.location.href = response.url;
      } else {
        console.error("Stripe URL not found in response:", response);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* 🛒 Cart Items */}
          <div className="flex-1">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex flex-col sm:flex-row items-center border-b py-4"
              >
                <img
                  src={item.product.image?.[0] || "/placeholder.png"}
                  alt={item.product.name}
                  className="w-24 h-24 object-cover rounded mr-4"
                />
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-600">
                    Price: ₹{item.product.price}
                  </p>
                  <div className="flex items-center mt-2 gap-2">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item._id, parseInt(e.target.value))
                      }
                      className="border w-16 text-center rounded px-2 py-1"
                    />
                    <button
                      onClick={() => removeItem(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 sm:ml-4 font-semibold">
                  ₹{item.product.price * item.quantity}
                </div>
              </div>
            ))}
          </div>

          {/* 📦 Order Summary */}
          <div className="w-full lg:w-1/3 border p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>₹50</span>
            </div>

            

            {/* 🏷️ Coupon Section */}
            <div className="mt-4">
             {couponMessage ? <span className="text-red-500 font-semibold">{couponMessage}</span>:""}
              <input
                type="text"
                placeholder="Enter coupon code"
                value={MYCouponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border p-2 rounded w-full mb-2"
              />

             
              <button
                onClick={handleApplyCoupon}
                disabled={isApplying}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60"
              >
                {isApplying ? "Applying..." : "Apply Coupon"}
              </button>

              {/* 🔹 Coupon Message */}
              {message && (
                <p
                  className={`text-sm mt-2 text-center ${
                    discount > 0
                      ? "text-green-600 font-medium"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}

            </div>

            {/* 💰 Coupon Details */}
          
              <div className="mt-4 border-t pt-3">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  Coupon Applied
                </h3>
                <div className="flex justify-between">
                  <span>CouponCode:</span>
                  <span className="font-medium">{couponCode}</span>
                </div>
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>You Saved:</span>
                  <span>₹{discount}</span>
                </div>
              </div>
            

            {/* 💵 Final Total */}
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-3">
              <span>Total:</span>
              <span>₹{totalAfterDiscount}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
