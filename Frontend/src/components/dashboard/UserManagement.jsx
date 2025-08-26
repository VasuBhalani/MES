import { useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetch_all_users, create_user } from "../../services/operations/uersAPI";
// import Modal, AddUserForm ... (apne paths sahi rakho)
import Modal from '../ui/Modal';
import AddUserForm from '../forms/AddUserForm/AddUserForm.jsx';


const roles = [
  { id: 1, name: "Admin" },
  { id: 2, name: "Purchase Staff" },
  { id: 3, name: "QA Manager" },
  { id: 4, name: "Recipe Expert" },
  { id: 5, name: "Production Head" },
  { id: 6, name: "Stock Manager" },
  { id: 7, name: "Finance Officer" },
];

const UserManagement = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  // React 18 StrictMode me effect double-run guard
  const fetchedOnceRef = useRef(false);

  useEffect(() => {
    if (fetchedOnceRef.current) return; // guard repeat
    fetchedOnceRef.current = true;

    dispatch(fetch_all_users());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // <-- IMPORTANT: empty deps (no users here)

  const handleAddUser = useCallback(
    async (userData) => {
      // create + (optional) refetch = true if you want server truth
      await dispatch(create_user(userData, { refetch: true }));
      setIsAddUserModalOpen(false);
    },
    [dispatch]
  );

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              User Role Management
            </h3>
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              <svg
                className="h-4 w-4 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 5v14M5 12h14" strokeWidth="2" strokeLinecap="round" />
              </svg>
              Add User
            </button>
          </div>
        </div>

        {loading && (
          <div className="px-6 py-4 text-gray-500">Loading users…</div>
        )}

        {!loading && (
          <div className="divide-y divide-gray-200">
            {users && users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user.id || user._id}
                  className="px-6 py-4 flex items-center justify-between"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        user.avatar ||
                        `https://ui-avatars.com/api/?name=${encodeURIComponent(
                          user.name || user.fullName || "User"
                        )}&background=3b82f6&color=fff`
                      }
                      alt={user.name || "User"}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {user.name || user.fullName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.role_name || "—"}
                      </p>
                      <p className="text-xs text-gray-400">
                        {user.email || "—"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (user.status || "Active") === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {user.status || "Active"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-4 text-gray-500">No users found.</div>
            )}
          </div>
        )}
      </div>

      {/* Add User Modal */}
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
    </>
  );
};

export default UserManagement;
