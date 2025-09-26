import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_all_users, create_user,update_user } from "../../../../services/operations/uersAPI.js";
import Modal from '../../../ui/Modal.jsx';
import AddUserForm from '../../../forms/AddUserForm/AddUserForm.jsx';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const roles = [
  "Admin",
  "Purchase Staff",
  "QA Manager",
  "Recipe Expert",
  "Production Head",
  "Stock Manager",
  "Finance Officer",
];

export default function UserManagement() {
  const dispatch = useDispatch();
  const { users = [], loading } = useSelector((state) => state.users);
  const fetchedOnceRef = useRef(false);

  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    if (fetchedOnceRef.current) return;
    fetchedOnceRef.current = true;
    dispatch(fetch_all_users());
  }, [dispatch]);

  const startEdit = (user) => {
    setEditingUserId(user.id || user._id);
    setEditData({ ...user });
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setEditData({});
  };

  const handleEditChange = (field, value) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const saveEdit = async () => {
    try {
       
      const role_id = roles.indexOf(editData.role_name)+1;
      console.log('Saving role and status:', editData.role_name, editData.is_active,editData);
       
      const payload = {
          userId: editingUserId,
          role_id,
          is_active: editData.is_active, // 👈 match your schema field name
      };

      await dispatch(update_user(payload));

      setEditingUserId(null);
      setEditData({});
    } catch (error) {
      console.error("Failed to update user:", error);
    }
  };

  const handleAddUser = async (userData) => {
    await dispatch(create_user(userData, { refetch: true }));
    setIsAddUserModalOpen(false);
  };

  return (
    <div className="p-8 bg-white rounded shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
        <button
          onClick={() => setIsAddUserModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add User
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading users...</p>}
      {!loading && users.length === 0 && <p className="text-gray-500">No users found.</p>}

      {!loading && users.length > 0 && (
        <table className="min-w-full divide-y divide-gray-200 border">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">User</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Email</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Role</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">Status</th>
              <th className="px-6 py-3 text-right" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => {
              const isEditing = editingUserId === (user.id || user._id);
              return (
                <tr key={user.id || user._id} className="hover:bg-blue-50">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <img
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name || user.fullName || "User"
                        )}&background=3b82f6&color=fff`
                      }
                      alt={user.name || "User"}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{user.name || user.fullName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email || "—"}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {isEditing ? (
                      <select
                        value={editData.role_name || ""}
                        onChange={(e) => handleEditChange("role_name", e.target.value)}
                        className="rounded bg-slate-50 border-gray-300 text-gray-800 py-1 px-2 shadow focus:ring focus:ring-blue-300"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span>{user.role_name || user.role || "—"}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {isEditing ? (
                      <select
                        value={editData.is_active ? "true" : "false"}
                        onChange={(e) => handleEditChange("is_active", e.target.value === "true")}
                        className="rounded bg-slate-50 border-gray-300 text-gray-800 py-1 px-2 shadow focus:ring focus:ring-blue-300"
                      >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                      </select>
                    ) : (
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold shadow ${
                          user?.is_active
                            ? "bg-green-50 text-green-700"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {user.is_active ? "Active":"Inactive"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {isEditing ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={saveEdit}
                          className="bg-green-100 hover:bg-green-200 text-green-700 p-2 rounded"
                          title="Save"
                        >
                          <AiOutlineCheck size={18} />
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded"
                          title="Cancel"
                        >
                          <AiOutlineClose size={18} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => startEdit(user)}
                        className="bg-gray-100 hover:bg-blue-100 text-blue-600 p-2 rounded"
                        title="Edit"
                      >
                        <AiOutlineEdit size={18} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <Modal
        isOpen={isAddUserModalOpen}
        onClose={() => setIsAddUserModalOpen(false)}
        title="Add New User"
        size="lg"
      >
        <AddUserForm
          onSubmit={handleAddUser}
          onCancel={() => setIsAddUserModalOpen(false)}
          roles={roles}
        />
      </Modal>
    </div>
  );
}