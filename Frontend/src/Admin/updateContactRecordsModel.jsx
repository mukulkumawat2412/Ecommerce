// import { useEffect, useState } from "react";
// import { Trash2, Edit3, Mail, Phone, User, X } from "lucide-react";
// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   ContactRecords,
//   DeleteContactRecords,
//   UpdateContactRecords, // 👈 ye tumhare slice me add hona chahiye
// } from "../redux/slices/contactUsSlice.jsx";

// export default function ContactDashboard() {
//   const [search, setSearch] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     message: "",
//     status: "",
//   });

//   const { contactRecords } = useSelector((state) => state.contact);
//   const dispatch = useDispatch();

//   const fetchContacts = async () => {
//     await dispatch(ContactRecords());
//   };

//   useEffect(() => {
//     fetchContacts();
//   }, []);

//   const filteredContacts = contactRecords.filter((c) =>
//     c.fullName?.toLowerCase().includes(search.toLowerCase())
//   );

//   const handleDelete = async (cId) => {
//     await dispatch(DeleteContactRecords({ cId }));
//     fetchContacts();
//   };

//   // 🟢 Handle Edit click
//   const handleEdit = (contact) => {
//     setSelectedContact(contact);
//     setFormData({
//       fullName: contact.fullName,
//       email: contact.email,
//       phone: contact.phone,
//       message: contact.message,
//       status: contact.status || "Pending",
//     });
//     setIsModalOpen(true);
//   };

//   // 🟢 Handle Form Input Change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // 🟢 Handle Update Submit
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     await dispatch(UpdateContactRecords({ cId: selectedContact._id, data: formData }));
//     setIsModalOpen(false);
//     fetchContacts();
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6 mt-20">
//         <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
//           📬 Contact Messages
//         </h2>
//         <input
//           type="text"
//           placeholder="Search by name..."
//           className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:ring-2 focus:ring-blue-500 outline-none transition"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//         <table className="w-full text-sm text-gray-700">
//           <thead className="bg-blue-600 text-white">
//             <tr>
//               <th className="p-4 text-left">Full Name</th>
//               <th className="p-4 text-left">Email</th>
//               <th className="p-4 text-left">Phone</th>
//               <th className="p-4 text-left">Message</th>
//               <th className="p-4 text-left">Status</th>
//               <th className="p-4 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredContacts.length > 0 ? (
//               filteredContacts.map((c) => (
//                 <tr
//                   key={c._id}
//                   className="border-t hover:bg-gray-50 transition-colors duration-150"
//                 >
//                   <td className="p-4 font-medium text-gray-900 flex items-center gap-2">
//                     <User className="text-blue-500" size={16} />
//                     {c.fullName || "—"}
//                   </td>
//                   <td className="p-4 flex items-center gap-2 text-gray-700">
//                     <Mail className="text-gray-500" size={16} />
//                     {c.email || "—"}
//                   </td>
//                   <td className="p-4 flex items-center gap-2 text-gray-700">
//                     <Phone className="text-green-600" size={16} />
//                     {c.phone || "—"}
//                   </td>
//                   <td className="p-4 max-w-xs truncate text-gray-600">
//                     {c.message || "No message"}
//                   </td>
//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         c.status === "Replied"
//                           ? "bg-green-100 text-green-700"
//                           : c.status === "Spam"
//                           ? "bg-red-100 text-red-700"
//                           : "bg-yellow-100 text-yellow-700"
//                       }`}
//                     >
//                       {c.status || "Pending"}
//                     </span>
//                   </td>
//                   <td className="p-4 flex justify-center gap-3">
//                     <button
//                       onClick={() => handleDelete(c._id)}
//                       className="text-red-600 hover:text-red-800 transition"
//                       title="Delete Message"
//                     >
//                       <Trash2 size={18} />
//                     </button>
//                     <button
//                       onClick={() => handleEdit(c)}
//                       className="text-blue-600 hover:text-blue-800 transition"
//                       title="Edit Message"
//                     >
//                       <Edit3 size={18} />
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6" className="text-center p-6 text-gray-500 font-medium">
//                   No contact messages found 😕
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* 🟢 Modal for Update Form */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
//           <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-lg p-6 relative animate-fadeIn">
//             <button
//               onClick={() => setIsModalOpen(false)}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
//             >
//               <X size={22} />
//             </button>

//             <h3 className="text-xl font-semibold text-gray-800 mb-4">
//               ✏️ Update Contact Record
//             </h3>

//             <form onSubmit={handleUpdate} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Full Name</label>
//                 <input
//                   type="text"
//                   name="fullName"
//                   value={formData.fullName}
//                   onChange={handleChange}
//                   className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Email</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Phone</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={formData.phone}
//                   onChange={handleChange}
//                   className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Message</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleChange}
//                   className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Status</label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="mt-1 w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
//                 >
//                   <option value="Pending">Pending</option>
//                   <option value="Replied">Replied</option>
//                   <option value="Spam">Spam</option>
//                 </select>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//               >
//                 Update Record
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
