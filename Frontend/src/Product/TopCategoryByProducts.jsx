import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getCookie from '../../../Backend/src/utils/GetToken.js';
import { useDispatch, useSelector } from 'react-redux';
import { TopCategoryBy_Products } from '../redux/slices/productSlice.jsx';
import { Link } from 'react-router-dom';


const TopCategoryByProducts = () => {
  
 

  const dispatch = useDispatch()

 const isAuthenticated = useSelector((state)=>state.auth.isAuthenticated)

   const {TopCategoryProducts} = useSelector((state)=>state.product)

 console.log(TopCategoryProducts)

  useEffect(() => {
    const fetchTopCategoryByProducts = async () => {
      try { 

        
             const res =    await dispatch(TopCategoryBy_Products())
       
        console.log(res)

      
  
       
      } catch (error) {
        console.log("Error fetching Category Products", error);
      }
    };
    fetchTopCategoryByProducts();
  }, []);

  return (

    
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-2">
        Top Products by Category
      </h2>

      {TopCategoryProducts.map((category, idx) => (
        <div key={idx} className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            {category.category}
          </h3>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {category.products.map((product, index) => (
              <div
                key={`${idx}-${index}`}
                className="bg-white rounded-xl shadow hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
              >
                <div className="w-full h-64 bg-gray-100 flex justify-center items-center overflow-hidden">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="object-contain h-full p-4 transform hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                      {product.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {product.description}
                    </p>
                    <span className="text-blue-600 font-medium">{product.title}</span>

                    
                    {product.price && (
                      <div className="text-xl font-bold text-gray-800 mt-2">
                        ₹{product.price}
                      </div>
                    )}
                  </div>

                  {
                    isAuthenticated ? (
                      <div className="mt-4 flex gap-2">
                  
                    
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-100 transition">
                      Add to Cart
                    </button>
                      <Link to={`/product-details/${product._id}`}>
                    
                    </Link>

                  
                  </div>
                    ) :(
                         <button className="flex-1 bg-gradient-to-r from-violet-600 to-violet-500 text-white py-2 rounded-lg hover:from-violet-700 hover:to-violet-600 transition">
                      View
                    </button>

                    )
                  }

                  
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopCategoryByProducts;
