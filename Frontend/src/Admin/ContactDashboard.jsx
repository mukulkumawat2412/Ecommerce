import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Edit3, Mail, Phone, User, Reply } from "lucide-react";
import React from "react";
import api from "../utils/axiosInstance.js";
import { useDispatch, useSelector } from 'react-redux';
import { adminReplyMessage, ContactRecords, DeleteContactRecords } from "../redux/slices/contactUsSlice.jsx";
import { useNavigate } from "react-router-dom";

export default function ContactDashboard() {

  const [search, setSearch] = useState("");

  const { contactRecords } = useSelector((state) => state.contact)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");

  const fetchContacts = async () => {
    await dispatch(ContactRecords());
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contactRecords.filter((c) =>
    c.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (cId) => {
    await dispatch(DeleteContactRecords({ cId }))
  }

  const handleUpdate = async (cId) => {
    navigate(`/update-contactRecord/${cId}`)
  }

  // =======================
  // OPEN REPLY MODAL
  // =======================
  const openReplyModal = (contact) => {
    console.log(contact)
    setSelectedUser(contact);
    setShowModal(true);
  };

  // =======================
  // SEND REPLY EMAIL
  // =======================
  const handleSendReply = async () => {
    if (!replyMessage.trim()) return alert("Reply cannot be empty!");

  const res =   await dispatch(adminReplyMessage({contactId:selectedUser._id,message:replyMessage}))
    
  console.log(res)
 
     alert("Reply sent!");
  
   

    setShowModal(false);
    setReplyMessage("");
    fetchContacts();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      <div className="flex justify-between items-center mb-6 mt-20">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
          📬 Contact Messages
        </h2>
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Full Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Message</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <tr key={c._id} className="border-t hover:bg-gray-50 transition-colors duration-150">

                  {/* Full Name */}
                  <td className="p-4 font-medium text-gray-900  items-center gap-2">
                    <User className="text-blue-500" size={16} />
                    {c.fullName || "—"}
                  </td>

                  {/* Email */}
                  <td className="p-4  items-center gap-2 text-gray-700">
                    <Mail className="text-gray-500" size={16} />
                    {c.email || "—"}
                  </td>

                  {/* Phone */}
                  <td className="p-4 flex items-center gap-2 text-gray-700">
                    <Phone className="text-green-600" size={16} />
                    {c.phone || "—"}
                  </td>

                  {/* Message */}
                  <td className="p-4 max-w-xs truncate text-gray-600">
                    {c.message || "No message"}
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        c.status === "Replied"
                          ? "bg-green-100 text-green-700"
                          : c.status === "Spam"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {c.status || "Pending"}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="p-4 flex justify-center gap-3">

                    {/* Reply Button */}
                    <button
                      onClick={() => openReplyModal(c)}
                      className="text-purple-600 hover:text-purple-800 transition"
                    >
                      <Reply size={18} />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(c._id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => handleUpdate(c._id)}
                      className="text-blue-600 hover:text-blue-800 transition"
                    >
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500 font-medium">
                  No contact messages found 😕
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* =======================
          REPLY MODAL
      ======================= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-lg w-[400px] shadow-xl">
            <h2 className="text-lg font-semibold mb-3">
              Reply to {selectedUser.fullName}
            </h2>

            <textarea
              rows="4"
              className="w-full border p-2 rounded"
              placeholder="Write your reply..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            ></textarea>

            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={handleSendReply}
              >
                Send Reply
              </button>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
