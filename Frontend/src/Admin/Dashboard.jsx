import axios from "axios";
import React, { useEffect, useState } from "react";
import getCookie from "../../../Backend/src/utils/GetToken.js";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout.jsx";
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../redux/slices/admin.productSlice.jsx";

const Dashboard = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch()

  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {

    const res =     await dispatch(getProducts())

 
      
        setProducts(res.payload);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchAdminProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      
   const res =  await dispatch(deleteProduct({id}))
      
      if(res.payload.success){
        alert("Product deleted successfully")
        navigate(0)
      }
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <Link to={"/product-form"}>
          <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg shadow-md transition">
            Add Product
          </button>
        </Link>
      </div>

      {/* Product List */}
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Product List</h2>

        {products.length === 0 ? (
          <p className="text-gray-500 text-center py-6">
            No products added yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200 text-left">
                  <th className="p-3 border-b">Image</th>
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Title</th>
                  <th className="p-3 border-b">Category</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Stock</th>
                  <th className="p-3 border-b text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p._id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">
                      <img
                        src={p.image[0]}
                        alt={p.name}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="p-3 border-b">{p.name}</td>
                    <td className="p-3 border-b">{p.title}</td>
                    <td className="p-3 border-b">{p.category?.name}</td>
                    <td className="p-3 border-b">₹{p.price}</td>
                    <td className="p-3 border-b text-center">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-white text-sm font-semibold whitespace-nowrap ${p.stock > 0 ? "bg-green-500" : "bg-red-500"
                          }`}
                      >
                        {p.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </td>
                    <td className="p-3 border-b flex justify-center gap-2">
                      <Link
                        to={`/update-product/${p._id}`}
                        className="bg-blue-100 p-2 rounded-md hover:bg-blue-200 transition flex items-center justify-center"
                      >
                        <FiEdit size={18} className="text-blue-600" />
                      </Link>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-100 p-2 rounded-md hover:bg-red-200 transition flex items-center justify-center"
                      >
                        <FiTrash2 size={18} className="text-red-600" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
