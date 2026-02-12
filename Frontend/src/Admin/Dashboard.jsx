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


  const handleUpdate = (id)=>{
    navigate(`/update-product/${id}`)
  }




  const handleDelete = async (id) => {
    try {
      
   const res =  await dispatch(deleteProduct({id}))
      
      // if(res.payload.success){
      //   alert("Product deleted successfully")
       
      // }
    } catch (error) {
      console.log("Error deleting product", error);
    }
  };

  return (
  <AdminLayout>
    {/* ===== HEADER ===== */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>

      <Link to={"/product-form"}>
        <button className="bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg shadow-md transition w-full sm:w-auto">
          Add Product
        </button>
      </Link>
    </div>

    {/* ===== PRODUCT LIST ===== */}
    <div className="bg-white shadow-lg rounded-xl p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">
        Product List
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-500 text-center py-6">
          No products added yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-3 border-b">Image</th>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b hidden sm:table-cell">Title</th>
                <th className="p-3 border-b hidden md:table-cell">Category</th>
                <th className="p-3 border-b">Price</th>
                <th className="p-3 border-b">Stock</th>
                <th className="p-3 border-b text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="hover:bg-gray-50">
                  {/* Image */}
                  <td className="p-3 border-b">
                    <img
                      src={p.image[0]}
                      alt={p.name}
                      className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-md"
                    />
                  </td>

                  {/* Name */}
                  <td className="p-3 border-b font-medium">{p.name}</td>

                  {/* Title */}
                  <td className="p-3 border-b hidden sm:table-cell">
                    {p.title}
                  </td>

                  {/* Category */}
                  <td className="p-3 border-b hidden md:table-cell">
                    {p.category?.name}
                  </td>

                  {/* Price */}
                  <td className="p-3 border-b">₹{p.price}</td>

                  {/* Stock */}
                  <td className="p-3 border-b text-center">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-white text-xs sm:text-sm font-semibold whitespace-nowrap ${
                        p.stock > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {p.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-3 border-b">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleUpdate(p._id)}
                        className="bg-blue-100 p-2 rounded-md hover:bg-blue-200 transition flex items-center justify-center"
                      >
                        <FiEdit size={18} className="text-blue-600" />
                      </button>

                      <button
                        onClick={() => handleDelete(p._id)}
                        className="bg-red-100 p-2 rounded-md hover:bg-red-200 transition flex items-center justify-center"
                      >
                        <FiTrash2 size={18} className="text-red-600" />
                      </button>
                    </div>
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
