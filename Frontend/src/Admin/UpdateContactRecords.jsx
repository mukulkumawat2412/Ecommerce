import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactRecordBy_Id,
  UpdateContact_Record,
  
} from "../redux/slices/contactUsSlice.jsx";

export default function UpdateContactRecord() {
  const { cId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedContactRecord, loading } = useSelector((state) => state.contact);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    department: "",
    message: "",
    status: "Pending",
  });

  const [updating, setUpdating] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // 🟢 Fetch contact record by ID
  useEffect(() => {
    if (cId) {
      dispatch(getContactRecordBy_Id({ cId }));
    }
  }, [cId, dispatch]);

  // 🟢 Populate form after data loads
  useEffect(() => {
    if (selectedContactRecord && Object.keys(selectedContactRecord).length > 0) {
      setFormData({
        fullName: selectedContactRecord.fullName || "",
        email: selectedContactRecord.email || "",
        phone: selectedContactRecord.phone || "",
        subject: selectedContactRecord.subject || "",
        department: selectedContactRecord.department || "",
        message: selectedContactRecord.message || "",
        status: selectedContactRecord.status || "Pending",
      });
    }
  }, [selectedContactRecord]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setStatusMsg("");
    try {
    
        await dispatch(UpdateContact_Record({cId,formData}))
      
      setStatusMsg("✅ Contact record updated successfully!");
      setTimeout(() => navigate(-1), 1000);
    } catch (err) {
      console.error(err);
      setStatusMsg("❌ Failed to update contact record");
    } finally {
      setUpdating(false);
    }
  };

  if (loading)
    return <div className="text-center mt-40 text-gray-600">Loading contact record...</div>;

 return (
  <div className="min-h-screen bg-gray-50 flex items-start sm:items-center justify-center px-3 sm:px-6 py-10">
    <div className="bg-white shadow-xl rounded-xl w-full max-w-md sm:max-w-xl md:max-w-2xl p-4 sm:p-6 md:p-8 mt-20">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          ✏️ Update Contact Record
        </h2>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm sm:text-base text-gray-600 hover:text-blue-600"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Grid for inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            />
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              required
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="">Select department</option>
              <option value="support">Support</option>
              <option value="sales">Sales</option>
              <option value="partnerships">Partnerships</option>
              <option value="media">Media & PR</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
            >
              <option value="Pending">Pending</option>
              <option value="Replied">Replied</option>
              <option value="Spam">Spam</option>
            </select>
          </div>
        </div>

        {/* Message Full Width */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full mt-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={updating}
            className={`w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-semibold transition ${
              updating ? "opacity-80 cursor-not-allowed" : "hover:bg-indigo-700"
            }`}
          >
            {updating ? (
              <>
                <Loader2 className="animate-spin" size={16} /> Updating...
              </>
            ) : (
              "Update Record"
            )}
          </button>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <p
            className={`text-center mt-3 text-sm ${
              statusMsg.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {statusMsg}
          </p>
        )}

      </form>
    </div>
  </div>
);

}
