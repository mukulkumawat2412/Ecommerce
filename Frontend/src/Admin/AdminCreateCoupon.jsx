import React, { useState } from "react";
import api from "../utils/axiosInstance.js";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { CreateCoupon } from "../redux/slices/couponSlice.jsx";

const AdminCreateCoupon = () => {
  const [couponData, setCouponData] = useState({
    coupon_code: "",
    coupon_description: "",
    discount_type: "fixedAmount",
    coupon_amount: "",
    valid_from: "",
    valid_to: "",
    status: "Active",
  });



  const dispatch = useDispatch()



  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     
   const res =      await dispatch(CreateCoupon(couponData))
      console.log(res)
      alert("🎉 Coupon created successfully!");
      console.log(res.data);
      setCouponData({
        coupon_code: "",
        coupon_description: "",
        discount_type: "fixedAmount",
        coupon_amount: "",
        valid_from: "",
        valid_to: "",
        status: "Active",
      });
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create coupon!");
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
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 py-5 px-8 mt-20">
          <h2 className="text-2xl font-semibold text-white tracking-wide">
            🏷️ Create New Coupon
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Fill in the details below to add a new discount coupon.
          </p>
        </div>

        {/* Form Section */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                placeholder="e.g. SAVE20"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
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
                required
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
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
                placeholder="Enter amount or %"
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
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
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
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
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Description - full width */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                Description
              </label>
              <textarea
                name="coupon_description"
                value={couponData.coupon_description}
                onChange={handleChange}
                required
                placeholder="Describe the purpose of this coupon..."
                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-400 outline-none min-h-[100px]"
              ></textarea>
            </div>

            {/* Button */}
            <div className="md:col-span-2 flex justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
              >
                Create Coupon
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminCreateCoupon;
