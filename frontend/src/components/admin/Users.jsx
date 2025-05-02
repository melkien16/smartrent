import React from 'react';
import { toast } from 'react-hot-toast';
import { deleteUser } from '../../Fetchers/deleteUser';
import { getAllUsers } from '../../Fetchers/getAllUsers';

const Users = ({ users, loading, error, searchQuery, setSearchQuery, setUsers }) => {
  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(userId);
        toast.success('User deleted successfully');
        const updatedUsers = await getAllUsers();
        setUsers(updatedUsers);
      } catch (error) {
        toast.error('Failed to delete user');
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Management</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <input 
              type="text" 
              placeholder="Search users..." 
              className="input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <select className="select">
              <option>All Status</option>
              <option>Active</option>
              <option>Deactivated</option>
            </select>
          </div>
          <button className="btn bg-primary-600 text-white">Add Admin User</button>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">
            {error}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {users
                  .filter(user => 
                    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((user) => (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={user.avatar}
                              alt={user.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isAdmin 
                            ? 'bg-purple-100 text-purple-800' 
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {user.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                        <button 
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Users); 