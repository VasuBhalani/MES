import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_all_users } from "../../../../services/operations/uersAPI.js"; 
import { useNavigate } from "react-router-dom";

export default function UsersPreview() {
  const dispatch = useDispatch();
  const { users = [], loading } = useSelector((state) => state.users);
  const fetchedOnceRef = useRef(false); // guard for React 18 Strict Mode
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchedOnceRef.current) return; // prevent double fetch in StrictMode
    fetchedOnceRef.current = true;
    dispatch(fetch_all_users());
    console.log("Users fetched for preview:", users);
  }, [dispatch]);

  console.log("Users in preview:", users);

  const previewUsers = users.slice(0, 3);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h3 className="text-lg font-medium text-gray-900">Users Preview</h3>
        <button
          onClick={() => navigate("/admin/users")}
          className="text-blue-600 hover:underline text-sm"
        >
          See All
        </button>
      </div>

      {loading && <div className="px-6 py-4 text-gray-500">Loading users…</div>}

      {!loading && (
        <div>
          {previewUsers.map((user) => (
            <div
              key={user.id || user._id}
              className="px-6 py-4 flex items-center justify-between border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <img
                  className="w-10 h-10 rounded-full"
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name || user.fullName || "User"
                    )}&background=3b82f6&color=fff`
                  }
                  alt={user.name || "User"}
                />
                <div>
                  <p className="font-medium text-gray-900">{user.name || user.fullName}</p>
                  <p className="text-xs text-gray-500">{user.role_name || "—"}</p>
                </div>
              </div>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.is_active === true
                    ? "bg-green-50 text-green-700"
                    : "bg-yellow-50 text-yellow-800"
                }`}
              >
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
          {previewUsers.length === 0 && (
            <div className="px-6 py-4 text-gray-500">No users found.</div>
          )}
        </div>
      )}
    </div>
  );
}
