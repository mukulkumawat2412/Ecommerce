import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCoupon_ById, updateCoupon } from "../redux/slices/couponSlice";

const UpdateCouponForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { selectedCoupon, loading } = useSelector((state) => state.coupon);

  const [couponData, setCouponData] = useState({
    coupon_code: "",
    coupon_description: "",
    discount_type: "fixedAmount",
    coupon_amount: "",
    valid_from: "",
    valid_to: "",
    status: "Active",
  });

  // ✅ Step 1: Fetch coupon by ID
  useEffect(() => {
    if (id) {
      dispatch(getCoupon_ById({ id }));
    }
  }, [id, dispatch]);

  // ✅ Step 2: Jab selectedCoupon Redux se update ho jaye, form prefill karo
  useEffect(() => {
    if (selectedCoupon) {
      setCouponData({
        coupon_code: selectedCoupon.coupon_code || "",
        coupon_description: selectedCoupon.coupon_description || "",
        discount_type: selectedCoupon.discount_type || "fixedAmount",
        coupon_amount: selectedCoupon.coupon_amount || "",
        valid_from: selectedCoupon.valid_from?.substring(0, 10) || "",
        valid_to: selectedCoupon.valid_to?.substring(0, 10) || "",
        status: selectedCoupon.status || "Active",
      });
    }
  }, [selectedCoupon]);

  // ✅ Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
    const res =     await dispatch(updateCoupon({id,couponData}))

    console.log(res)

    navigate("/admin-coupons")

    
        
      alert("✅ Coupon updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update coupon!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-100"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-5 px-8 mt-20">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            ✏️ Update Coupon
          </h2>
          <p className="text-green-100 text-sm mt-1">
            Modify the coupon details below and save the changes.
          </p>
        </div>

        {/* Loader (optional) */}
        {loading && (
          <p className="text-center text-gray-500 mt-5">Loading coupon...</p>
        )}

        {/* Form */}
        {!loading && (
          <div className="p-8">
            <form onSubmit={handleSubmit}  className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Coupon Code */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Coupon Code
                </label>
                <input
                  type="text"
                  name="coupon_code"
                  value={couponData.coupon_code}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              {/* Discount Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Discount Type
                </label>
                <select
                  name="discount_type"
                  value={couponData.discount_type}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 outline-none"
                >
                  <option value="fixedAmount">Fixed Amount</option>
                  <option value="percentageDiscount">Percentage Discount</option>
                </select>
              </div>

              {/* Coupon Amount */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Coupon Amount
                </label>
                <input
                  type="number"
                  name="coupon_amount"
                  value={couponData.coupon_amount}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              {/* Status */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={couponData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 outline-none"
                >
                  <option value="Active">Active</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>

              {/* Valid From */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Valid From
                </label>
                <input
                  type="date"
                  name="valid_from"
                  value={couponData.valid_from}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              {/* Valid To */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Valid To
                </label>
                <input
                  type="date"
                  name="valid_to"
                  value={couponData.valid_to}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="coupon_description"
                  value={couponData.coupon_description}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-green-400 outline-none min-h-[100px]"
                ></textarea>
              </div>

              {/* Submit Button */}
              <div className="md:col-span-2 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                >
                  Update Coupon
                </motion.button>
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UpdateCouponForm;
