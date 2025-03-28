import React, { useState, useEffect } from 'react';
import axios from "./../../../api/axios";

const PermissionRightBar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3500/Users");
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const updatePermission = async (userId, permissionKey, value) => {
    try {
      // Send the new permission for this user.
      const response = await axios.put(`http://localhost:3500/Users/${userId}/permissions/${permissionKey}`, {
        [permissionKey]: value
      });
      // Update local state with updated user info from the backend.
      setUsers(users.map(user => 
        user.userId === userId 
        ? { ...user, [permissionKey]: response.data[permissionKey]} 
        : user
      ));
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  const handleCheckboxChange = (userId, permissionKey, event) => {
    const value = event.target.checked;
    updatePermission(userId, permissionKey, value);
  };

  return (
    <div className='flex-[4] ml-64 bg-[#FFFCF9] h-screen p-4 relative'>
      <strong className="text-xl font-bold ml-4">Manage Permissions</strong>
      <ul>
        {users.map(user => (
          <li key={user.userId} className='flex justify-between items-center p-2 border-b'>
            <span>{user.username}</span>
            { user.userRole == "user" && (<div className='flex items-center gap-4'>
              <label className='flex items-center gap-1'>
                <input
                  type="checkbox"
                  checked={user.lockTasks}
                  onChange={(e) => handleCheckboxChange(user.userId, 'lockTasks', e)}
                />
                Lock Tasks
              </label>
              <label className='flex items-center gap-1'>
                <input
                  type="checkbox"
                  checked={user.deleteTasks}
                  onChange={(e) => handleCheckboxChange(user.userId, 'deleteTasks', e)}
                />
                Delete Tasks
              </label>
              <label className='flex items-center gap-1'>
                <input
                  type="checkbox"
                  checked={user.assignedTasks}
                  onChange={(e) => handleCheckboxChange(user.userId, 'assignTasks', e)}
                />
                Assign Tasks
              </label>
            </div>)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermissionRightBar;
