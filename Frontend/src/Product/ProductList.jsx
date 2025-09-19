import axios from "axios";
import React, { useEffect, useState } from "react";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCookie = (name) => {
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    if (match) return match[2];
    return null;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = getCookie("accessToken"); 
        if (!token) {
          alert("User not logged in! Token missing.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:8000/api/v1/product/products", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, 
        });

        setProducts(res.data.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center text-lg mt-10">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-lg rounded-xl p-4 hover:shadow-xl transition transform hover:-translate-y-1"
            >
              <div className="flex justify-center items-center h-48 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full object-contain rounded-md"
                />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-500 text-sm mt-1">{product.title}</p>
              <p className="text-gray-900 font-bold mt-2 text-lg">₹{product.price}</p>
              <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-4">No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
