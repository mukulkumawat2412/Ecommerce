import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../redux/slices/productSlice";
import getCookie from "../../../Backend/src/utils/GetToken.js";
import { AddToCart } from "../redux/slices/cartSlice.jsx";


const ProductList = ({ setCartCount }) => {





  const [loading, setLoading] = useState(true);


  const dispatch = useDispatch()
  const { products } = useSelector((state) => state.product)

const { cartItems } = useSelector((state) => state.cart);
  
console.log(cartItems)


  useEffect(() => {
    const fetchProducts = async () => {
      try {

        await dispatch(getProducts()).unwrap()


      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;




const addToCart = async (productId) => {
  try {
    // Check karo ki product already cartItems me hai ya nahi
    const alreadyInCart = cartItems.some(
      (item) => item.product.toString() === productId.toString()
    );

    const res = await dispatch(AddToCart({ productId, quantity: 1 })).unwrap();
    console.log("AddToCart response:", res);

    // Agar product pehli baar add ho raha hai tabhi count increase karo
    if (!alreadyInCart) {
      setCartCount((prev) => prev + 1);
      console.log("✅ New product added, count increased");
    } else {
      console.log("⚠️ Existing product, quantity updated, count unchanged");
    }
  } catch (error) {
    console.log("Error adding to cart:", error);
  }
};











  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Our Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <Link key={product._id} to={`/product-details/${product._id}`}>
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition transform hover:-translate-y-1 flex flex-col h-full"
              >
                <div className="flex justify-center items-center h-48 mb-4">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="max-h-full object-contain rounded-md"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 flex flex-col">
                  <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-gray-500 text-sm mt-1">{product.title}</p>
                  <p className="text-gray-900 font-bold mt-2 text-lg">₹{product.price}</p>

                  {/* Add to Cart Button at Bottom */}
                  <div className="mt-auto">

                    <button
                      onClick={(e) => {
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        addToCart(product._id);
                      }}
                      className="w-full bg-slate-500 text-white py-2 rounded-lg hover:bg-slate-700 transition"
                    >
                      Add to Cart
                    </button>

                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
