import React, { useEffect, useState } from "react";
import getCookie from "../../../../../Backend/src/utils/GetToken.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createCheckOut,
  DeleteCartItems,
  getCartItems,
  UpdateCart_Quantity,
} from "../../../redux/slices/cartSlice.jsx";
import { ApplyCoupon, removeCoupon } from "../../../redux/slices/couponSlice.jsx";

const CartPage = () => {
 
  const [MYCouponCode, setMYCouponCode] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [isApplying, setIsApplying] = useState(false);



  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux States
  const subTotal = useSelector((state) => state.cart.subTotal);
  const cartItems = useSelector((state)=>state.cart.cartItems)
  const { discount, message, totalAfterDiscount } = useSelector(
    (state) => state.coupon
  );
  console.log(cartItems)
    const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

  console.log(subTotal)
  // Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Fetch Cart Items
  useEffect(() => {
    const fetchCart = async () => {
      try {

         await dispatch(getCartItems());
      
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [isAuthenticated, dispatch]);

  // Update product quantity
 const updateQuantity = (cartId, increment) => {
  const item = cartItems.find(i => i._id === cartId);
  if (!item) return;

  const newQty = Math.max(1, item.quantity + increment);
  dispatch(UpdateCart_Quantity({ cartId, quantity: newQty }));
};


  // Remove item
  const removeItem = async (cartId) => {
    try {
      await dispatch(DeleteCartItems({ cartId }));
      
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Apply Coupon
  const handleApplyCoupon = async () => {
    if (!MYCouponCode.trim()) {
      setCouponMessage("Please enter a coupon code");
      return;
    }
    setCouponMessage("");
    setIsApplying(true);
    try {
      const res = await dispatch(
        ApplyCoupon({ coupon_code: MYCouponCode, subTotal })
      );
      console.log("Coupon Response:", res.payload);
    } catch (error) {
      console.error("Coupon error:", error);
    } finally {
      setIsApplying(false);
    }
  };

  // Checkout
  const handleCheckout = async () => {
    try {
      const response = await dispatch(
        createCheckOut({
          products: cartItems,
          amount: totalAfterDiscount > 0 ? totalAfterDiscount : subTotal,
        })
      ).unwrap();
      if (response?.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

 return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-6 mt-20">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
      Your Shopping Cart
    </h1>

    {cartItems.length === 0 ? (
      <p className="text-center text-gray-500 text-base sm:text-lg">
        Your cart is empty.
      </p>
    ) : (
      <div className="flex flex-col lg:flex-row gap-6">
        {/* ✅ Cart Items */}
        <div className="flex-1 space-y-4">
        {cartItems
  ?.filter(item => item?.product)
  ?.map((item) => (
    <div
      key={item._id}
      className="flex flex-col sm:flex-row sm:items-center border rounded-lg p-4 shadow-sm"
    >
      <img
        src={item?.product?.image?.[0] || "/placeholder.png"}
        alt={item?.product?.name || "product"}
        className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded mb-3 sm:mb-0 sm:mr-4"
      />

      <div className="flex-1">
        <h2 className="font-semibold text-base sm:text-lg">
          {item?.product?.name}
        </h2>

        <p className="text-gray-600 text-sm sm:text-base">
          Price: ₹{item?.product?.price}
        </p>

        <div className="flex flex-wrap items-center mt-3 gap-2">
          <span className="text-sm">Qty:</span>

          <button
            onClick={() => updateQuantity(item._id, -1)}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            -
          </button>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              const diff = value - item.quantity;
              updateQuantity(item._id, diff);
            }}
            className="border w-16 text-center rounded px-2 py-1"
          />

          <button
            onClick={() => updateQuantity(item._id, 1)}
            className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            +
          </button>

          <button
            onClick={() => removeItem(item._id)}
            className="bg-red-500 text-white px-4 py-1 rounded text-sm"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="mt-3 sm:mt-0 sm:ml-4 font-semibold text-base sm:text-lg">
        ₹{item?.product?.price * item?.quantity}
      </div>
    </div>
))}

        </div>

        {/* ✅ Order Summary */}
        <div className="w-full lg:w-1/3 border p-5 rounded-lg shadow-md h-fit">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span>Subtotal:</span>
            <span>₹{subTotal}</span>
          </div>

          <div className="flex justify-between mb-2 text-sm sm:text-base">
            <span>Shipping:</span>
            <span>₹50</span>
          </div>

          {/* ✅ Coupon Section */}
          <div className="mt-4">
            {couponMessage && (
              <span className="text-red-500 font-semibold text-sm">
                {couponMessage}
              </span>
            )}

            <input
              type="text"
              placeholder="Enter coupon code"
              value={MYCouponCode}
              onChange={(e) => setMYCouponCode(e.target.value)}
              className="border p-2 rounded w-full mb-2 text-sm"
            />

            <button
              onClick={handleApplyCoupon}
              disabled={isApplying}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-60 text-sm sm:text-base"
            >
              {isApplying ? "Applying..." : "Apply Coupon"}
            </button>

            {message && (
              <p
                className={`text-xs sm:text-sm mt-2 text-center ${
                  discount > 0 ? "text-green-600 font-medium" : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}
          </div>

          {/* ✅ Coupon Details */}
          {discount > 0 && (
            <div className="mt-4 border-t pt-3">
              <h3 className="text-base sm:text-lg font-semibold text-green-700 mb-2">
                Coupon Applied
              </h3>
              <div className="flex justify-between text-green-600 font-semibold text-sm sm:text-base">
                <span>You Saved:</span>
                <span>₹{discount}</span>
              </div>
            </div>
          )}

          {/* ✅ Final Total */}
          <div className="flex justify-between items-center font-bold text-base sm:text-lg border-t pt-3 mt-3">
            <span>Total:</span>
            <div className="flex items-center gap-2">
              <span>₹{discount > 0 ? totalAfterDiscount : subTotal}</span>
              {discount > 0 && (
                <button
                  onClick={() => dispatch(removeCoupon())}
                  className="text-red-500 hover:text-red-700 font-bold text-xl"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-green-600 text-white py-2 rounded mt-4 hover:bg-green-700 transition text-sm sm:text-base"
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
