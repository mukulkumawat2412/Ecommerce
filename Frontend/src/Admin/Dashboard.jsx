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
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAdminProducts = async () => {
      try {
        const res = await dispatch(getProducts());
        setProducts(res.payload);
      } catch (error) {
        console.log("Error fetching products", error);
      }
    };
    fetchAdminProducts();
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct({ id })).unwrap();
      setProducts((prev) => prev.filter((p) => p._id !== id));
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
          <>
            {/* ===== DESKTOP TABLE ===== */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full w-full border-collapse text-sm">
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
                      <td className="p-3 border-b font-medium">{p.name}</td>
                      <td className="p-3 border-b">{p.title}</td>
                      <td className="p-3 border-b">{p.category?.name}</td>
                      <td className="p-3 border-b">₹{p.price}</td>
                      <td className="p-3 border-b text-center">
                        <span
                          className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-white text-xs font-semibold ${
                            p.stock > 0 ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {p.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>
                      <td className="p-3 border-b">
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={() => handleUpdate(p._id)}
                            className="bg-blue-100 p-2 rounded-md hover:bg-blue-200 transition"
                          >
                            <FiEdit size={18} className="text-blue-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(p._id)}
                            className="bg-red-100 p-2 rounded-md hover:bg-red-200 transition"
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

            {/* ===== MOBILE CARDS ===== */}
            <div className="md:hidden flex flex-col gap-4">
              {products.map((p) => (
                <div
                  key={p._id}
                  className="border border-gray-200 rounded-xl p-4 flex gap-4 shadow-sm"
                >
                  {/* Image */}
                  <img
                    src={p.image[0]}
                    alt={p.name}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                    <p className="text-gray-500 text-xs truncate">{p.title}</p>
                    <p className="text-gray-400 text-xs">{p.category?.name}</p>
                    <p className="text-violet-600 font-bold mt-1">₹{p.price}</p>
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-white text-xs font-semibold mt-1 ${
                        p.stock > 0 ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {p.stock > 0 ? "In Stock" : "Out of Stock"}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 justify-center">
                    <button
                      onClick={() => handleUpdate(p._id)}
                      className="bg-blue-100 p-2 rounded-md hover:bg-blue-200 transition"
                    >
                      <FiEdit size={16} className="text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-100 p-2 rounded-md hover:bg-red-200 transition"
                    >
                      <FiTrash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;