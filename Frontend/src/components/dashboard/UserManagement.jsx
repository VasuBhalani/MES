import React, { useState } from 'react';
import { PlusIcon, PencilIcon } from '@heroicons/react/24/outline';
import Modal from '../ui/Modal';
import AddUserForm from '../forms/AddUserForm/AddUserForm.jsx';
import toast from 'react-hot-toast';
import { apiConnector } from '../../app/axios.js';
import {adminEndpoints} from '../../features/admin/adminEndpoints.js';
import { setLoading } from '../../features/auth/authSlice.js';
import { useDispatch} from 'react-redux';
const {CREATE_USER} = adminEndpoints;

const UserManagement = () => {
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const dispatch = useDispatch();
  // Mock roles data - replace with actual API call
  const roles = [
  {id:1, name:'Admin'},
  {id:2, name:'Purchase Staff'},
  {id:3, name:'QA Manager'},
  {id:4, name:'Recipe Expert'},
  {id:5, name:'Production Head'},
  {id:6, name:'Stock Manager'},
  {id:7, name:'Finance Officer'}
  ];

  const [users,setUsers]=useState([
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Production Manager',
      status: 'Active',
      email: 'sarah.johnson@company.com',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=3b82f6&color=fff'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Quality Inspector',
      status: 'Pending',
      email: 'mike.chen@company.com',
      avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=f59e0b&color=fff'
    },
    {
      id: 3,
      name: 'Robert Davis',
      role: 'Line Operator',
      status: 'Active',
      email: 'robert.davis@company.com',
      avatar: 'https://ui-avatars.com/api/?name=Robert+Davis&background=10b981&color=fff'
    }
  ]);

const handleAddUser = async (userData) => {
    dispatch(setLoading(true));
    
    try {
      const response = await apiConnector("POST", CREATE_USER, userData);
      console.log(response);
      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      toast.success("User created successfully!");
      
      // Close the modal
      setIsAddUserModalOpen(false);
      
      // Add the new user to the local state (or refetch users)
      if (response.data.user) {
        setUsers(prevUsers => [...prevUsers, {
          ...response.data.user,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(response.data.user.name)}&background=3b82f6&color=fff`
        }]);
      }
      
      // Alternative: Refresh the entire user list from API
      // await fetchUsers();
      
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Failed to create user");
      throw error; // Re-throw to let the form handle the error
    } finally {
      dispatch(setLoading(false));
    }
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">User Role Management</h3>
            <button 
              onClick={() => setIsAddUserModalOpen(true)}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        </div>
        
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div key={user.id} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.role}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  user.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {user.status}
                </span>
                {/* <button>
                  <PencilIcon className="h-5 w-5" />
                </button> */}
              </div>
            </div>
          ))}
        </div>
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
