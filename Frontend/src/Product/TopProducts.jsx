import axios from "axios";
import React, { useEffect, useState } from "react";
import getCookie from "../../../Backend/src/utils/GetToken.js";
import { Star } from "lucide-react"; // for rating icon
import { useDispatch, useSelector } from 'react-redux';
import { topProductsByPrice } from "../redux/slices/productSlice.jsx";

const TopProducts = () => {



  const dispatch = useDispatch()

 const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)



  const {TopProducts} = useSelector((state)=>state.product)
console.log(TopProducts)
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        if(isAuthenticated){
           const res =   await dispatch(topProductsByPrice())
    console.log(res)

        }
   
      
      } catch (error) {
        console.log("Error fetching top products", error);
      }
    };

    fetchTopProducts();
  }, [isAuthenticated]);

  return (
    <>
    {
      isAuthenticated && (
         <div className="px-6 py-10 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        💎 Top 5 Premium Products (Price &gt; ₹10,000)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {TopProducts.map((p, i) => (
          <div
            key={i}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:-translate-y-1"
          >
            <div className="relative">
              <img
                src={p.image?.[0]}
                alt={p.name}
                className="w-full h-56 object-contain bg-gray-100 p-4"
              />
              <span className="absolute top-3 right-3 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded-md">
                ₹{p.price}
              </span>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 truncate mb-2">
                {p.name}
              </h3>

              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    fill={index < Math.round(p.rating) ? "gold" : "lightgray"}
                    stroke="none"
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">
                  {p.rating?.toFixed(1) || 0}
                </span>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition-all duration-200">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {TopProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No products found above ₹10,000 😅
        </p>
      )}
    </div>
      )
      
    }
    </>
   
  );
};

export default TopProducts;
