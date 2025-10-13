import React, { useEffect, useState } from "react";
import axios from "axios";
import getCookie from "../../../../../Backend/src/utils/GetToken.js";
import { Link, useNavigate } from "react-router-dom";
import { parseInt } from "lodash";
import { useDispatch } from "react-redux";
import { createCheckOut, DeleteCartItems, getCartItems } from "../../../redux/slices/cartSlice.jsx";
// import {loadStripe}from "@stripe/stripe-js"





const CartPage = () => {




  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const token = getCookie("accessToken");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(cartItems)

  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
  },[])





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

  useEffect(() => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setSubtotal(total);
  }, [cartItems]);

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

  const removeItem = async (cartId) => {
    console.log(cartId)
    try {
   const res =    await dispatch(DeleteCartItems({cartId}))
   console.log(res)
   navigate(0)
     
    
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };



  // const stripePromise = loadStripe(process.env.STRIPE_PUBLISHABLE_KEY)

  
  const handleCheckout = async () => {

    try {


   const response =  await dispatch(createCheckOut({products:cartItems})).unwrap()

  

      if (response?.url) {
        window.location.href = response.url
      } else if (response.url) {
        window.location.href = response.url
      } else {
        console.error("Stripe URL not found in response:", response);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };


  
  // const handleCheckout = async () => {
  //   try {
  //     // 1. Call thunk to create checkout session on backend
  //     const response = await dispatch(createCheckOut({ products: cartItems })).unwrap();

  //     // 2. Load Stripe frontend with publishable key
  //     const stripe = await stripePromise;

  //     if (!stripe) {
  //       console.error("Stripe failed to load");
  //       return;
  //     }

  //     // 3. Redirect to Stripe Checkout using sessionId
  //     const result = await stripe.redirectToCheckout({
  //       sessionId: response.sessionId, // backend should return { sessionId: "..." }
  //     });

  //     if (result.error) {
  //       console.error("Stripe redirect error:", result.error.message);
  //     }
  //   } catch (error) {
  //     console.error("Checkout error:", error);
  //   }
  // };




  return (
    <div className="max-w-6xl mx-auto p-4 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
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
                  <h2 className="font-semibold text-lg">{item.product.name}</h2>
                  <p className="text-gray-600">Price: ₹{item.product.price}</p>
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

          {/* Summary */}
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
            <div className="flex justify-between font-bold text-lg border-t pt-2">
              <span>Total:</span>
              <span>₹{subtotal + 50}</span>
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
