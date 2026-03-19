// AdminCoupons.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AllCoupons, Delete_Coupons } from "../redux/slices/couponSlice";
import { Link, useNavigate } from "react-router-dom";

const AdminCoupons = () => {
  const dispatch = useDispatch();
  const { couponData, loading } = useSelector((state) => state.coupon);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(AllCoupons());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleUpdate = (id) => {
    navigate(`/update-coupon/${id}`);
  };

  const handleDelete = async (id) => {
    await dispatch(Delete_Coupons({ id }));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gray-50 min-h-screen mt-10 sm:mt-12">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-left">
          🎟️ Coupon Dashboard
        </h1>
        <Link to="/create-coupon" className="w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2 rounded-lg shadow transition text-sm sm:text-base">
            + Create Coupon
          </button>
        </Link>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center text-gray-500 italic py-6">Loading coupons...</p>
      )}

      {/* Empty */}
      {!loading && couponData.length === 0 && (
        <p className="text-center text-gray-500 italic py-6">No coupons found</p>
      )}

      {/* ===== DESKTOP TABLE ===== */}
      {!loading && couponData.length > 0 && (
        <>
          <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="min-w-full w-full border-collapse text-left text-sm">
              <thead className="bg-violet-100 text-violet-800 uppercase text-xs font-semibold">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">Code</th>
                  <th className="p-4">Description</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Valid From</th>
                  <th className="p-4">Valid To</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {couponData.map((c, i) => {
                  const isExpired = new Date(c.valid_to) < new Date();
                  const statusColor = isExpired
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-green-100 text-green-700 border border-green-300";

                  return (
                    <tr key={c._id || i} className="hover:bg-gray-50 border-b transition">
                      <td className="p-4 text-gray-600 font-medium">{i + 1}</td>
                      <td className="p-4 font-semibold text-gray-800 uppercase">{c.coupon_code}</td>
                      <td className="p-4 text-gray-700">{c.coupon_description}</td>
                      <td className="p-4 capitalize text-gray-700">
                        {c.discount_type === "fixedAmount" ? "Fixed Amount" : "Percentage"}
                      </td>
                      <td className="p-4 text-gray-800 font-semibold">₹{c.coupon_amount}</td>
                      <td className="p-4 text-gray-600">{new Date(c.valid_from).toLocaleDateString()}</td>
                      <td className="p-4 text-gray-600">{new Date(c.valid_to).toLocaleDateString()}</td>
                      <td className="p-4 text-center">
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                          {isExpired ? "Expired" : "Active"}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          <button onClick={() => handleUpdate(c._id)} className="bg-blue-100 hover:bg-blue-200 p-2 rounded-md transition">
                            <FiEdit className="text-blue-600" size={16} />
                          </button>
                          <button onClick={() => handleDelete(c._id)} className="bg-red-100 hover:bg-red-200 p-2 rounded-md transition">
                            <FiTrash2 className="text-red-600" size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ===== MOBILE CARDS ===== */}
          <div className="md:hidden flex flex-col gap-4">
            {couponData.map((c, i) => {
              const isExpired = new Date(c.valid_to) < new Date();
              const statusColor = isExpired
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300";

              return (
                <div key={c._id || i} className="bg-white rounded-xl shadow p-4 border border-gray-200">

                  {/* Top Row */}
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-bold text-gray-800 uppercase text-base">{c.coupon_code}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{c.coupon_description}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                      {isExpired ? "Expired" : "Active"}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-4">
                    <div>
                      <p className="text-xs text-gray-400">Type</p>
                      <p className="font-medium capitalize">
                        {c.discount_type === "fixedAmount" ? "Fixed Amount" : "Percentage"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Amount</p>
                      <p className="font-semibold text-gray-800">₹{c.coupon_amount}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Valid From</p>
                      <p>{new Date(c.valid_from).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Valid To</p>
                      <p>{new Date(c.valid_to).toLocaleDateString()}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button onClick={() => handleUpdate(c._id)} className="flex-1 flex items-center justify-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-600 py-2 rounded-lg text-sm transition">
                      <FiEdit size={15} /> Edit
                    </button>
                    <button onClick={() => handleDelete(c._id)} className="flex-1 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-lg text-sm transition">
                      <FiTrash2 size={15} /> Delete
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCoupons;