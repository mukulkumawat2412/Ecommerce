import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getCookie from '../../../Backend/src/utils/GetToken.js';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { categoryByProducts } from '../redux/slices/productSlice.jsx';

const CategoryByProducts = () => {

  const { categoryId } = useParams();

  console.log(categoryId)

  const dispatch = useDispatch()
  const {products} = useSelector((state)=>state.product)


  useEffect(() => {
    const fetchCategoryByProducts = async () => {
      try {

        if(categoryId){
   await dispatch(categoryByProducts({categoryId}))
        }

     
      
      
      } catch (error) {
        console.log("Error fetching ProductsByCategory", error);
      }
    };

    fetchCategoryByProducts();
  }, [dispatch,categoryId]);

 return (
  <div className="max-w-7xl mx-auto px-4 py-8">
    <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
      Category Products
    </h1>

    {products.length === 0 ? (
      <p className="text-gray-500 text-lg md:text-xl">
        No products found in this category.
      </p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 group bg-white flex flex-col"
          >
            {/* Product Image */}
            <div className="w-full h-52 overflow-hidden flex justify-center items-center mb-4">
              <img
                src={product.image[0]}
                alt={product.title}
                className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Product Info */}
            <h2 className="font-semibold text-lg md:text-xl text-gray-800">
              {product.title}
            </h2>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              {product.description?.slice(0, 60)}...
            </p>

            {/* Price & Add to Cart */}
            <div className="mt-auto flex items-center justify-between pt-3">
              <p className="font-bold text-xl text-green-600">
                ${product.price}
              </p>
              <button className="bg-sky-500 text-white px-4 py-1 rounded-lg hover:bg-sky-700 transition-colors duration-300 text-sm md:text-base">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

};

export default CategoryByProducts;
