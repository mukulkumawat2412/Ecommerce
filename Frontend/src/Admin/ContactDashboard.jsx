import { useEffect, useState } from "react";
import { Trash2, Edit3, Mail, Phone, User, Reply } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { adminReplyMessage, ContactRecords, DeleteContactRecords } from "../redux/slices/contactUsSlice.jsx";
import { useNavigate } from "react-router-dom";

export default function ContactDashboard() {

  const [search, setSearch] = useState("");
  const { contactRecords } = useSelector((state) => state.contact);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    await dispatch(DeleteContactRecords({ cId }));
  };

  const handleUpdate = async (cId) => {
    navigate(`/update-contactRecord/${cId}`);
  };

  const openReplyModal = (contact) => {
    setSelectedUser(contact);
    setShowModal(true);
  };

  const handleSendReply = async () => {
    if (!replyMessage.trim()) return alert("Reply cannot be empty!");
    await dispatch(adminReplyMessage({ contactId: selectedUser._id, message: replyMessage }));
    alert("Reply sent!");
    setShowModal(false);
    setReplyMessage("");
    fetchContacts();
  };

  const statusColor = (status) => {
    if (status === "Replied") return "bg-green-100 text-green-700";
    if (status === "Spam") return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 mt-16 sm:mt-20">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 tracking-tight">
          📬 Contact Messages
        </h2>
        <input
          type="text"
          placeholder="Search by name..."
          className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-64 focus:ring-2 focus:ring-blue-500 outline-none transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ===== DESKTOP TABLE ===== */}
      <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="min-w-full w-full text-sm text-gray-700">
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
                <tr key={c._id} className="border-t hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-medium text-gray-900">
                    <div className="flex items-center gap-2">
                      <User className="text-blue-500" size={16} />
                      {c.fullName || "—"}
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Mail className="text-gray-500" size={16} />
                      {c.email || "—"}
                    </div>
                  </td>
                  <td className="p-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <Phone className="text-green-600" size={16} />
                      {c.phone || "—"}
                    </div>
                  </td>
                  <td className="p-4 max-w-xs truncate text-gray-600">{c.message || "No message"}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(c.status)}`}>
                      {c.status || "Pending"}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => openReplyModal(c)} className="text-purple-600 hover:text-purple-800 transition">
                        <Reply size={18} />
                      </button>
                      <button onClick={() => handleDelete(c._id)} className="text-red-600 hover:text-red-800 transition">
                        <Trash2 size={18} />
                      </button>
                      <button onClick={() => handleUpdate(c._id)} className="text-blue-600 hover:text-blue-800 transition">
                        <Edit3 size={18} />
                      </button>
                    </div>
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

      {/* ===== MOBILE CARDS ===== */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((c) => (
            <div key={c._id} className="bg-white rounded-xl shadow p-4 border border-gray-200">

              {/* Top Row */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <User className="text-blue-500" size={16} />
                  <p className="font-semibold text-gray-800">{c.fullName || "—"}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(c.status)}`}>
                  {c.status || "Pending"}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-1.5 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-gray-400" />
                  <span>{c.email || "—"}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-green-500" />
                  <span>{c.phone || "—"}</span>
                </div>
                <p className="text-gray-500 text-xs line-clamp-2 mt-1">{c.message || "No message"}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <button onClick={() => openReplyModal(c)} className="flex-1 flex items-center justify-center gap-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 rounded-lg text-sm transition">
                  <Reply size={15} /> Reply
                </button>
                <button onClick={() => handleUpdate(c._id)} className="flex-1 flex items-center justify-center gap-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 rounded-lg text-sm transition">
                  <Edit3 size={15} /> Edit
                </button>
                <button onClick={() => handleDelete(c._id)} className="flex-1 flex items-center justify-center gap-1.5 bg-red-100 hover:bg-red-200 text-red-700 py-2 rounded-lg text-sm transition">
                  <Trash2 size={15} /> Delete
                </button>
              </div>

            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">No contact messages found 😕</p>
        )}
      </div>

      {/* ===== MODAL ===== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-5 sm:p-6 rounded-xl w-full max-w-md shadow-xl">
            <h2 className="text-lg font-semibold mb-3 text-gray-800">
              Reply to {selectedUser.fullName}
            </h2>
            <textarea
              rows="4"
              className="w-full border border-gray-300 p-2.5 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Write your reply..."
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
            />
            <div className="mt-4 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm transition"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
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