import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../redux/slices/productSlice";
import getCookie from "../../../Backend/src/utils/GetToken.js";
import { AddToCart } from "../redux/slices/cartSlice.jsx";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // ✅ icons change
import { addWishlistProduct } from "../redux/slices/wishlistSlice.jsx";
import TopProducts from "./TopProducts.jsx";
import TopCategoryByProducts from "./TopCategoryByProducts.jsx";


const ProductList = ({ setCartCount }) => {
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [cartlist,setCartList] = useState([])

  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  const { cartItems } = useSelector((state) => state.cart);
  const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

 

  // const token = getCookie("accessToken");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await dispatch(getProducts()).unwrap();
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [dispatch,isAuthenticated]);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;

  const addToCart = async (productId) => {
    try {
      const alreadyInCart = cartItems.some(
        (item) => item?.product?._id.toString() === productId.toString()
      );

      const res = await dispatch(AddToCart({ productId, quantity:1 })).unwrap();
      console.log("AddToCart response:", res);

       setCartList((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );

      
      // if (!alreadyInCart) {
      //   setCartCount((prev) => prev + 1);
      //   console.log("✅ New product added, count increased");
      // } else {
      //   console.log("⚠️ Existing product, quantity updated, count unchanged");
      // }
    } catch (error) {
      console.log("Error adding to cart:", error);
    }
  };






  const toggleWishlist = async (productId) => {
    try {
      const res = await dispatch(addWishlistProduct({ productId }));
      console.log("Wishlist response:", res);

      // Toggle wishlist icon locally
      setWishlist((prev) =>
        prev.includes(productId)
          ? prev.filter((id) => id !== productId)
          : [...prev, productId]
      );
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
    {/* Top Category & Top Products Sections */}
    <TopCategoryByProducts />
    <TopProducts />

    <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">
      Our Products
    </h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.length > 0 ? (
        products.map((product) => (
          <Link key={product._id} to={`/product-details/${product._id}`}>
            <div className="relative bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col h-full">
              {/* Wishlist Icon */}
              {isAuthenticated && (
                <div
                  className="absolute top-3 right-3 cursor-pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleWishlist(product._id);
                  }}
                >
                  {wishlist.includes(product._id) ? (
                    <AiFillHeart className="text-red-500 text-2xl transition transform hover:scale-110" />
                  ) : (
                    <AiOutlineHeart className="text-gray-400 text-2xl transition transform hover:scale-110 hover:text-red-500" />
                  )}
                </div>
              )}

              {/* Product Image */}
              <div className="flex justify-center items-center h-48 mb-4">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="max-h-full object-contain rounded-md"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-500 text-sm md:text-base mt-1">
                  {product.title?.slice(0, 50)}...
                </p>
                <p className="text-gray-900 font-bold mt-2 text-lg md:text-xl">
                  ₹{product.price}
                </p>

                {/* Add to Cart / Login Button */}
                {isAuthenticated ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product._id);
                    }}
                    className="mt-auto w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-700 transition text-sm md:text-base"
                  >
                    Add to Cart
                  </button>
                ) : (
                  <Link
                    to="/login"
                    className="mt-auto w-full block text-center bg-green-500 text-black py-2 rounded-lg hover:bg-violet-500 transition text-sm md:text-base"
                  >
                    Login to Add
                  </Link>
                )}
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-4">
          No products available
        </p>
      )}
    </div>
  </div>
);

};

export default ProductList;
