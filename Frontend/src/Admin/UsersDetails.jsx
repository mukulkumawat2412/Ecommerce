import React, { useEffect, useState } from "react";
import {
  Users,
  ShieldCheck,
  ShieldOff,
  Mail,
  UserCircle2,
  RefreshCw,
  Lock,
  Unlock,
  AlertTriangle,
  Search,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { GetAllusers } from "../redux/slices/authSlice";




const UsersDetails = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [unlocking, setUnlocking] = useState(null);


  const dispatch = useDispatch()

  const fetchUsers = async () => {
    try {
      setLoading(true);

     const res =    await dispatch(GetAllusers())
        setUsers(res.payload)

  
    } catch (err) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = async (userId) => {
    try {
      setUnlocking(userId);
      await axios.patch(
        `${BASE_URL}/api/v1/admin/unlock-user/${userId}`,
        {},
        { withCredentials: true }
      );
      toast.success("User unlocked successfully");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to unlock user");
    } finally {
      setUnlocking(null);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filtered = users.filter(
    (u) =>
      u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-600 text-white p-2 rounded-xl">
            <Users size={22} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <p className="text-sm text-gray-500">{users.length} total users registered</p>
          </div>
        </div>

        <button
          onClick={fetchUsers}
          className="flex items-center gap-2 text-sm bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-100 transition text-gray-600"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-400">No users found.</div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 uppercase text-xs tracking-wide">
                  <th className="text-left px-5 py-4">User</th>
                  <th className="text-left px-5 py-4">Email</th>
                  <th className="text-left px-5 py-4">Role</th>
                  <th className="text-left px-5 py-4">Login Attempts</th>
                  <th className="text-left px-5 py-4">Status</th>
                  <th className="text-left px-5 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    {/* Name */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold uppercase text-sm">
                          {user.fullName?.charAt(0) || "U"}
                        </div>
                        <span className="font-medium text-gray-800">{user.fullName}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="px-5 py-4 text-gray-500">
                      <div className="flex items-center gap-1.5">
                        <Mail size={13} className="text-gray-400" />
                        {user.email}
                      </div>
                    </td>

                    {/* Role */}
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {user.role === "admin" ? (
                          <ShieldCheck size={11} />
                        ) : (
                          <UserCircle2 size={11} />
                        )}
                        {user.role}
                      </span>
                    </td>

                    {/* Login Attempts */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        {user.loginAttempts >= 3 ? (
                          <AlertTriangle size={14} className="text-orange-400" />
                        ) : null}
                        <span
                          className={`font-semibold ${
                            user.loginAttempts >= 5
                              ? "text-red-500"
                              : user.loginAttempts >= 3
                              ? "text-orange-500"
                              : "text-gray-700"
                          }`}
                        >
                          {user.loginAttempts ?? 0}
                        </span>
                        <span className="text-gray-400">/ 5</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      {user.isLocked ? (
                        <span className="inline-flex items-center gap-1 bg-red-50 text-red-600 px-2.5 py-1 rounded-full text-xs font-medium">
                          <Lock size={11} />
                          Locked
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-medium">
                          <ShieldOff size={11} />
                          Active
                        </span>
                      )}
                    </td>

                    {/* Action */}
                    <td className="px-5 py-4">
                      {user.isLocked ? (
                        <button
                          onClick={() => handleUnlock(user._id)}
                          disabled={unlocking === user._id}
                          className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1.5 rounded-lg transition disabled:opacity-60"
                        >
                          {unlocking === user._id ? (
                            <RefreshCw size={12} className="animate-spin" />
                          ) : (
                            <Unlock size={12} />
                          )}
                          Unlock
                        </button>
                      ) : (
                        <span className="text-gray-300 text-xs">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersDetails;
