// AdminCoupons.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { AllCoupons, Delete_Coupons } from "../redux/slices/couponSlice";
import { Link, useNavigate } from "react-router-dom";


const AdminCoupons = () => {
  const dispatch = useDispatch();
  const { couponData, loading } = useSelector((state) => state.coupon);

  const navigate = useNavigate()
  console.log(couponData)


  useEffect(() => {
    dispatch(AllCoupons());
  }, [dispatch]);



  const handleUpdate = (id)=>{
    
    navigate(`/update-coupon/${id}`)
    
  }




  const handleDelete = async(id) => {
    console.log("Delete coupon with ID:", id);
 const res =   await dispatch(Delete_Coupons({id}))
    
 console.log(res)

  };


  useEffect(()=>{
    window.scrollTo({top:0,behavior:"smooth"})
  },[])

  return (
  <div className="p-3 sm:p-6 md:p-8 bg-gray-50 min-h-screen mt-10 sm:mt-12 md:mt-15">
    
    {/* Header */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 text-center sm:text-left">
        🎟️ Coupon Dashboard
      </h1>

      <Link to={"/create-coupon"} className="w-full sm:w-auto">
        <button className="w-full sm:w-auto bg-violet-600 hover:bg-violet-700 text-white font-medium px-4 py-2 rounded-lg shadow transition text-sm sm:text-base">
          + Create Coupon
        </button>
      </Link>
    </div>

    {/* Table Scroll Wrapper */}
    <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
      <table className="min-w-[900px] w-full border-collapse text-left text-sm sm:text-base">
        
        <thead className="bg-violet-100 text-violet-800 uppercase text-xs sm:text-sm font-semibold">
          <tr>
            <th className="p-3 sm:p-4">#</th>
            <th className="p-3 sm:p-4">Code</th>
            <th className="p-3 sm:p-4">Description</th>
            <th className="p-3 sm:p-4">Type</th>
            <th className="p-3 sm:p-4">Amount</th>
            <th className="p-3 sm:p-4">Valid From</th>
            <th className="p-3 sm:p-4">Valid To</th>
            <th className="p-3 sm:p-4 text-center">Status</th>
            <th className="p-3 sm:p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                Loading coupons...
              </td>
            </tr>
          ) : couponData.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-6 text-gray-500 italic">
                No coupons found
              </td>
            </tr>
          ) : (
            couponData.map((c, i) => {
              const isExpired = new Date(c.valid_to) < new Date();
              const statusColor = isExpired
                ? "bg-red-100 text-red-700 border border-red-300"
                : "bg-green-100 text-green-700 border border-green-300";

              return (
                <tr
                  key={c._id || i}
                  className="hover:bg-gray-50 transition duration-200 border-b"
                >
                  <td className="p-3 sm:p-4 text-gray-600 font-medium">
                    {i + 1}
                  </td>

                  <td className="p-3 sm:p-4 font-semibold text-gray-800 uppercase">
                    {c.coupon_code}
                  </td>

                  <td className="p-3 sm:p-4 text-gray-700">
                    {c.coupon_description}
                  </td>

                  <td className="p-3 sm:p-4 capitalize text-gray-700">
                    {c.discount_type === "fixedAmount"
                      ? "Fixed Amount"
                      : "Percentage"}
                  </td>

                  <td className="p-3 sm:p-4 text-gray-800 font-semibold">
                    ₹{c.coupon_amount}
                  </td>

                  <td className="p-3 sm:p-4 text-gray-600">
                    {new Date(c.valid_from).toLocaleDateString()}
                  </td>

                  <td className="p-3 sm:p-4 text-gray-600">
                    {new Date(c.valid_to).toLocaleDateString()}
                  </td>

                  <td className="p-3 sm:p-4 text-center">
                    <span
                      className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded-full ${statusColor}`}
                    >
                      {isExpired ? "Expired" : "Active"}
                    </span>
                  </td>

                  <td className="p-3 sm:p-4 flex justify-center gap-2 sm:gap-3">
                    <button
                      onClick={() => handleUpdate(c._id)}
                      className="bg-blue-100 hover:bg-blue-200 p-2 rounded-md transition"
                    >
                      <FiEdit className="text-blue-600" size={16} />
                    </button>

                    <button
                      onClick={() => handleDelete(c._id)}
                      className="bg-red-100 hover:bg-red-200 p-2 rounded-md transition"
                    >
                      <FiTrash2 className="text-red-600" size={16} />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>

      </table>
    </div>
  </div>
);

};

export default AdminCoupons;
